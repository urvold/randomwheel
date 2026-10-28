import {test} from 'node:test';
import assert from 'node:assert/strict';
import {randomInteger,landingRotation,sectorAtPointer} from '../src/random.ts';
test('pointer matches all sectors after repeated rotations',()=>{for(let count=2;count<=100;count++){let rotation=0;for(let round=0;round<4;round++)for(let index=0;index<count;index++){const next=landingRotation(rotation,index,count);assert.equal(sectorAtPointer(next,count),index);assert.ok(next-rotation>=2160);rotation=next;}}});
test('inclusive boundaries and negative ranges',()=>{const fill=(a:Uint32Array)=>{a[1]=9;return a;};assert.equal(randomInteger(1,10,fill),10);assert.equal(randomInteger(-5,4,fill),4);assert.equal(randomInteger(-8,-8,fill),-8);assert.equal(randomInteger(Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,a=>a.fill(0)),Number.MIN_SAFE_INTEGER);});
test('reject biased tail',()=>{let calls=0;assert.equal(randomInteger(1,10,a=>{calls++;return a.fill(calls===1?0xffffffff:0);}),1);assert.equal(calls,2);});
test('equal residue counts for complete accepted groups',()=>{const counts=Array(7).fill(0);for(let i=0;i<700;i++)counts[randomInteger(0,6,a=>{a[1]=i;return a;})]++;assert.deepEqual(counts,Array(7).fill(100));});
test('invalid ranges fail',()=>{for(const [a,b] of [[5,1],[1.2,3],[NaN,2],[0,Infinity],[0,Number.MAX_SAFE_INTEGER+1]])assert.throws(()=>randomInteger(a,b));});
