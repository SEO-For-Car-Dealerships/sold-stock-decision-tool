import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('irrelevant destinations and missing evidence block approval',()=>{const r=analyse(data);assert.equal(r.records[4].approved,false);assert.equal(r.records[4].outcome,'Gather more evidence');assert.ok(r.issues.some(i=>i.source==='E'));});
test('reviewed useful content and retirement can remain distinct decisions',()=>{const r=analyse(data);assert.equal(r.records[0].outcome,'Keep with honest sold label');assert.equal(r.records[2].outcome,'Retire after human approval');});
test('conflicting stock status never creates a live redirect decision',()=>{const r=analyse(data);assert.equal(r.records[3].approved,false);assert.doesNotMatch(JSON.stringify(r),/redirects\s*:/);});
