import {array,text,unique,date,https,escape,issue,table,issuesHTML} from './util.js';
export const guide='Supply dealer and records: stock_id, url, stock_status, sold_on, remaining_content, proposed_destination, destination_relevance (relevant/irrelevant/unknown), evidence_note, reviewer and decision (gather/keep/replace/retire). No live edits or generated redirect configuration.';
export function analyse(input){
 text(input.dealer,'dealer');const issues=[];
 const records=unique(array(input.records,'records'),'stock_id').map(r=>{
  if(!https(r.url))throw Error('Stock URL must use HTTPS');if(r.proposed_destination&&!https(r.proposed_destination))throw Error('Unsafe proposed destination');
  if(!['sold','available','reserved','unknown'].includes(r.stock_status))throw Error('Unknown stock status');
  if(!['gather','keep','replace','retire'].includes(r.decision))throw Error('Unknown review decision');
  if(!['relevant','irrelevant','unknown'].includes(r.destination_relevance))throw Error('Unknown destination relevance');
  if(r.sold_on)date(r.sold_on,'sold_on');
  const blockers=[];
  if(r.stock_status!=='sold')blockers.push('Confirm actual sold state');
  if(!r.evidence_note)blockers.push('Record evidence and rationale');
  if(r.decision!=='gather'&&!r.reviewer)blockers.push('A reviewer must approve the decision');
  if(r.decision==='replace'&&(!r.proposed_destination||r.destination_relevance!=='relevant'))blockers.push('A replacement requires an explicitly relevant destination');
  if(r.decision==='keep'&&!r.remaining_content)blockers.push('Describe useful remaining content');
  if(r.stock_status!=='sold'&&r.sold_on)blockers.push('Stock status contradicts a sold date');
  for(const message of blockers)issues.push(issue('review',message,r.stock_id));
  return {...r,outcome:blockers.length?'Gather more evidence':({gather:'Gather more evidence',keep:'Keep with honest sold label',replace:'Review relevant replacement',retire:'Retire after human approval'})[r.decision],approved:!blockers.length&&r.decision!=='gather'};
 });
 return {title:input.dealer+' sold-stock review',summary:'Human decision register only. No redirect is deployed and no ranking or link-value outcome is promised.',records,issues,markdown:records.map(r=>'- '+r.stock_id+': '+r.outcome+'; reviewer '+(r.reviewer||'Unassigned')+'; evidence '+(r.evidence_note||'Missing')).join('\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p>'+table(['Stock','Actual state','Decision','Reviewer','Rationale'],r.records.map(x=>[x.stock_id,x.stock_status,x.outcome,x.reviewer||'Unassigned',x.evidence_note||'Missing']))+issuesHTML(r.issues);
