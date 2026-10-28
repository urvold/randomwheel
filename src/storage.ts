import { useEffect, useState } from 'react';
export function useStored<T>(key: string, initial: T, valid: (v: unknown) => v is T) {
 const [value,setValue]=useState<T>(()=>{try{const v:unknown=JSON.parse(localStorage.getItem(key)??'null');return valid(v)?v:initial;}catch{return initial;}});
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{/* Storage is optional. */}},[key,value]);return [value,setValue] as const;
}
