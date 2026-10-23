import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Sold Vehicle Page Planner",
  "short": "The car has sold. What happens to its page?",
  "audience": "For dealership owners and stock teams",
  "summary": "Work through a sold-stock page and prepare a sensible next-step brief for your website supplier.",
  "button": "Prepare my sold-page plan",
  "filename": "sold-vehicle-page-plan",
  "eyebrow": "A clear next step for sold stock.",
  "time": "About 4 minutes",
  "outcome": "A page decision to review, with plain instructions for your website provider.",
  "layout": "decision",
  "intro": "Answer for one vehicle page at a time. The right choice depends on what remains useful, not simply whether the car has sold.",
  "note": "This creates a recommendation for human review. It does not inspect traffic, change pages or implement redirects.",
  "fields": [
    {
      "id": "vehicle",
      "label": "Vehicle or stock reference",
      "help": "Avoid customer details.",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "url",
      "label": "Vehicle page address",
      "help": "Optional. It will not be scanned.",
      "required": false,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "state",
      "label": "Has the vehicle actually sold?",
      "options": [
        [
          "sold",
          "Yes, the sale is confirmed"
        ],
        [
          "reserved",
          "It is reserved"
        ],
        [
          "available",
          "It is still available"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "content",
      "label": "Would this page still help someone after the sale?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "For example: useful original model information or a detailed project story, rather than a bare sold advert.",
      "required": true,
      "type": "select"
    },
    {
      "id": "visits",
      "label": "Do your records show useful visits or links to this page?",
      "options": [
        [
          "yes",
          "Yes, we have checked"
        ],
        [
          "no",
          "No, we have checked"
        ],
        [
          "unknown",
          "We have not checked"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "replacement",
      "label": "Is there a genuinely equivalent, useful replacement page?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "Not just the homepage or an unrelated car.",
      "required": true,
      "type": "select"
    },
    {
      "id": "control",
      "label": "Can your website supplier review and change this page?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "unsure",
          "I need to check"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    }
  ],
  "example": {
    "vehicle": "Example Hatchback, stock 104",
    "url": "https://example.com/stock/example-hatchback",
    "state": "sold",
    "content": "no",
    "visits": "unknown",
    "replacement": "unsure",
    "control": "yes"
  },
  "sources": [
    [
      "Google guidance on moved and removed pages",
      "https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors"
    ]
  ]
};
export function evaluate(v){enumValue(v.state,['sold','reserved','available'],'the stock status');enumValue(v.content,['yes','no','unsure'],'whether content remains useful');enumValue(v.visits,['yes','no','unknown'],'whether visits or links were checked');enumValue(v.replacement,['yes','no','unsure'],'whether a relevant replacement exists');enumValue(v.control,['yes','unsure'],'whether the supplier can review it');const url=webAddress(v.url);let decision,actions;if(v.state!=='sold'){decision=v.state==='reserved'?'Keep the page and label it Reserved.':'Keep the page accurate and available.';actions=['Do not treat a reservation as a confirmed sale.','Confirm availability before inviting a viewing.'];}else if(v.content==='yes'){decision='Consider retaining a useful page, clearly marked Sold.';actions=['Remove availability claims and make the sold status obvious.','Keep the useful original information and offer an honest route to current stock.','Agree a review date rather than leaving an obsolete advert indefinitely.'];}else if(v.content==='unsure'||v.visits==='unknown'||v.replacement==='unsure'){decision='Review the page before changing its address.';actions=['Ask the supplier to check existing visits, links and whether any content remains useful.','Check whether a proposed destination actually satisfies the same visitor need.'];}else if(v.replacement==='yes'){decision='Ask the supplier to review a relevant replacement.';actions=['Confirm that the replacement genuinely meets the same visitor need.','If a permanent redirect is appropriate, have the supplier implement and test it.'];}else if(v.visits==='yes'){decision='Review useful information before retiring this page.';actions=['Visits or links are a reason to examine the page, not a reason for an unrelated redirect.','Preserve genuinely useful content where appropriate, or retire the page deliberately after review.'];}else{decision='Consider retiring the sold advert after review.';actions=['If there is no useful content and no relevant replacement, ask the supplier about an appropriate removed-page response.','Remove it from live stock listings and update internal links.'];}return report(requireText(v.vehicle,'the vehicle or stock reference')+': page plan',decision,[section('Page under review',url?[url]:['Add the exact page address before sharing with your supplier.']),section('Recommended next steps',actions),section('Supplier handover',[v.control==='yes'?'Send this plan to the person responsible for the website.':'Find who controls stock pages and can review the proposed change.','Avoid sending all sold-stock addresses to the homepage or unrelated vehicles.','Review the proposed action before making a live change.'])]);}
