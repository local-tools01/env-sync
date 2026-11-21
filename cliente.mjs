// Cliente interativo: lista os PCs conectados e abre um shell no escolhido.
//
// Uso:  node cliente.mjs <URL_SERVIDOR> <TOKEN_API> [--agente <id|host>]
// Ex.:  node cliente.mjs http://localhost:8090 <TOKEN_API>
//       node cliente.mjs https://x.up.railway.app <TOKEN_API> --agente mac-1a2b3c

import WebSocket from 'ws';
import readline from 'node:readline';
import { createWriteStream, existsSync } from 'node:fs';
import path from 'node:path';

const argumentos = process.argv.slice(2);
let agenteAutomatico = null;
const posicionais = [];
for (let i = 0; i < argumentos.length; i++) {
  if (argumentos[i] === '--agente') agenteAutomatico = argumentos[++i] ?? null;
  else posicionais.push(argumentos[i]);
}

const url = posicionais[0] ?? process.env.URL_SERVIDOR ?? '';
const token = posicionais[1] ?? process.env.TOKEN_API ?? '';

if (!url || !token) {
  console.error('Uso: node cliente.mjs <URL_SERVIDOR> <TOKEN_API> [--agente <id|host>]');
  process.exit(1);
}

const wsUrl = new URL(url.replace(/^http/, 'ws'));
wsUrl.pathname = `${wsUrl.pathname.replace(/\/$/, '')}/shell`;

const ws = new WebSocket(wsUrl.toString(), {
  headers: { Authorization: `Bearer ${token}` },
  maxPayload: 1024 * 1024,
});

let lista = [];
let selecionado = false;
let comandos = [];
let recebendo = null;
let recebidos = 0;
const pendentes = [];

function completar(linha) {
  if (!selecionado || linha.includes(' ')) return [[], linha];
  const prefixo = linha;
  const opcoes = [...comandos.map((c) => c.nome), '/ajuda', '/agentes', '/baixar'];
  return [opcoes.filter((o) => o.startsWith(prefixo)), prefixo];
}

function mostrarAjuda() {
  if (process.env.DEBUG_CLIENTE) process.stderr.write(`[dbg ${Date.now()%100000}] ajuda com ${comandos.length}\n`);
  process.stderr.write('\ncomandos:\n');
  for (const { nome, descricao } of comandos) {
    process.stderr.write(`  ${nome.padEnd(18)} ${descricao}\n`);
  }
  process.stderr.write('  /baixar <caminho>  baixa um arquivo do PC para cá\n');
  process.stderr.write('  /agentes           troca de PC\n  /ajuda             esta lista\n');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: Boolean(process.stdout.isTTY),
  completer: completar,
});

function enviar(msg) {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
}

function mostrarMenu() {
  if (!lista.length) {
    process.stderr.write('nenhum PC conectado. aguardando... (/agentes re-lista)\n');
    return;
  }
  process.stderr.write('\nPCs conectados:\n');
  lista.forEach((a, i) => {
    process.stderr.write(`  ${i + 1}) ${a.host}  [${a.usuario || '?'}@${a.plataforma || '?'}]\n`);
  });
  process.stderr.write('escolha o número ou o id (Enter = 1): ');
}

function escolher(valor) {
  const texto = (valor ?? '').trim();
  if (texto === '' ) return lista[0]?.id ?? null;
  const numero = Number.parseInt(texto, 10);
  if (Number.isFinite(numero) && lista[numero - 1]) return lista[numero - 1].id;
  const porId = lista.find((a) => a.id === texto);
  if (porId) return porId.id;
  const porHost = lista.find((a) => a.host.startsWith(texto));
  return porHost?.id ?? null;
}

function tentarSelecao(valor) {
  const id = escolher(valor);
  if (!id) {
    process.stderr.write('escolha inválida.\n');
    mostrarMenu();
    return;
  }
  enviar({ tipo: 'selecionar', agente: id });
}

ws.on('open', () => process.stderr.write('conectado. carregando PCs...\n'));

ws.on('message', (dados) => {
  let m;
  try {
    m = JSON.parse(String(dados));
  } catch {
    return;
  }

  if (m.tipo === 'agentes') {
    lista = m.lista ?? [];
    if (!selecionado && agenteAutomatico) {
      const id = escolher(agenteAutomatico);
      if (id) {
        agenteAutomatico = null;
        enviar({ tipo: 'selecionar', agente: id });
      } else if (!lista.length) {
        mostrarMenu();
      } else {
        process.stderr.write(`agente "${agenteAutomatico}" não encontrado.\n`);
        agenteAutomatico = null;
        mostrarMenu();
      }
      return;
    }
    if (!selecionado) mostrarMenu();
  } else if (m.tipo === 'selecionado') {
    selecionado = true;
    if (process.env.DEBUG_CLIENTE) process.stderr.write(`[dbg ${Date.now()%100000}] selecionado\n`);
    process.stderr.write(`--- conectado a ${m.host} (${m.agente}). Tab completa; /ajuda lista os comandos; Ctrl-D encerra ---\n`);
    enviar({ tipo: 'abrir', id: 1 });
  } else if (m.tipo === 'comandos') {
    comandos = m.lista ?? [];
    if (process.env.DEBUG_CLIENTE) process.stderr.write(`[dbg ${Date.now()%100000}] comandos=${comandos.length}\n`);
  } else if (m.tipo === 'aberto') {
    for (const linha of pendentes.splice(0)) processarLinha(linha);
  } else if (m.tipo === 'agente-caiu') {
    selecionado = false;
    process.stderr.write('\n[agente desconectou] escolha outro:\n');
    enviar({ tipo: 'listar' });
  } else if (m.tipo === 'arquivo-inicio') {
    const base = path.basename(m.nome || 'arquivo');
    let destino = path.resolve(process.cwd(), base);
    let contador = 1;
    while (existsSync(destino)) destino = path.resolve(process.cwd(), `${base}.${contador++}`);
    recebendo = createWriteStream(destino);
    recebidos = 0;
    process.stderr.write(`\n[baixando] ${m.nome} -> ${destino}\n`);
  } else if (m.tipo === 'arquivo-parte' && recebendo) {
    recebendo.write(Buffer.from(m.dados, 'base64'));
    recebidos += Math.floor((m.dados.length * 3) / 4);
    if (recebidos % (256 * 1024) < 96 * 1024) process.stderr.write('.');
  } else if (m.tipo === 'arquivo-fim') {
    if (recebendo) recebendo.end();
    process.stderr.write(`\n[baixado] ${recebidos} bytes\n`);
    recebendo = null;
  } else if (m.tipo === 'arquivo-erro') {
    if (recebendo) recebendo.end();
    recebendo = null;
    process.stderr.write(`\n[erro no download] ${m.mensagem}\n`);
  } else if (m.tipo === 'saida') {
    process.stdout.write(Buffer.from(m.dados, 'base64').toString('utf8'));
  } else if (m.tipo === 'erro') {
    process.stderr.write(`\n[erro] ${m.mensagem}\n`);
    if (selecionado) ws.close();
    else mostrarMenu();
  } else if (m.tipo === 'terminou') {
    process.stderr.write(`\n[sessão terminou: código ${m.codigo ?? '?'}]\n`);
    ws.close();
  }
});

ws.on('close', () => {
  process.stderr.write('desconectado.\n');
  rl.close();
  process.exit(0);
});
ws.on('error', (erro) => {
  process.stderr.write(`[erro de conexão] ${erro.message}\n`);
  process.exit(1);
});

function processarLinha(linha) {
  if (!selecionado) {
    if (linha.trim() === '/agentes') enviar({ tipo: 'listar' });
    else tentarSelecao(linha);
    return;
  }
  if (linha.trim().startsWith('/baixar ')) {
    const caminho = linha.trim().slice(8).trim();
    if (caminho) enviar({ tipo: 'baixar', caminho });
    return;
  }
  if (linha.trim() === '/ajuda') {
    mostrarAjuda();
    return;
  }
  if (linha.trim() === '/agentes') {
    enviar({ tipo: 'fechar', id: 1 });
    selecionado = false;
    enviar({ tipo: 'listar' });
    return;
  }
  enviar({ tipo: 'entrada', id: 1, dados: Buffer.from(linha + '\n').toString('base64') });
}

rl.on('line', (linha) => {
  if (!selecionado && !lista.length) {
    pendentes.push(linha);
    return;
  }
  processarLinha(linha);
});

rl.on('close', () => {
  if (selecionado && ws.readyState === WebSocket.OPEN) enviar({ tipo: 'fechar', id: 1 });
  ws.close();
});
