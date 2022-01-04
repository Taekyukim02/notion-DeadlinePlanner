import dotenv from "dotenv";
import { Client } from "@notionhq/client";

dotenv.config();
const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID


// Get database information
const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: databaseId });
//  console.log(response);

  const responseResults = response.results.map((page) => {
    return {
		page_info: page.properties.Name.title[0]
		/*
      id: page.id,
	  name: page.properties.Name.title[0]?.plain_text,
	  properties: page.properties,
//	  Class: page.properties.Class.select,
//	  Status: page.properties.Status.select,
//	  Deadline: page.properties.Deadline.date,
	  Name1: page.properties.Name,
	  Name2: page.properties.Name.title[0],
	  Name3: page.properties.Name.title[0].text,
	  Name4: page.properties.Name.title[0].text.content,
	  */
    };
  });

  // this console.log is just so you can see what we're getting here
  console.log(responseResults);
  return responseResults;
};
//getDatabase();






// Add pages (new items) to database
const addEvent = async (eventType, eventNum, myStatus, myDeadline, myClass) => {
  const response = await notion.pages.create({ 
	  parent: {
		  database_id: databaseId,
	  },
	  properties: {
		Name: {
			title: [
			{
				text: {
					content: eventType + eventNum,
				},
			},
			],
		},
		Status: {
			select:
			{
				name: myStatus,
			},
		},
		Deadline: {
			date:
			{
				start: myDeadline,
			},
		},
		Class: {
			select:
			{
				name: myClass,
			},
		},
	  }
  });

  //console.log(response);
  return response;
};

// Helper function to add days to a Date
const addDays = (originalDate, days) => {
  let cloneDate = new Date(originalDate.valueOf());
  cloneDate.setDate(cloneDate.getDate() + days);
  return cloneDate;
}

// Prints class deadlines at regular intervals
export const printClassDeadlines = (firstDate, eventType, interval, howMany, skipWeek, myClass) => {
  let week = 1;
  let eventNum = 1;
  let date = new Date(firstDate);
  console.log("For class \"%s\"", myClass);
  while(eventNum <= howMany) {
	if(!skipWeek.includes(week)) {
	  let formattedDate = date.toISOString().split('T')[0];
	  console.log("-> Schedule \"%s\" on %s", eventType + eventNum, formattedDate);
      eventNum++;
	}

	week++;
	date = addDays(date, interval);
  }
} 

// Adds class deadlines at regular intervals
export const addClassDeadlines = (firstDate, eventType, interval, howMany, skipWeek, myClass) => {
  let week = 1;
  let eventNum = 1;
  let date = new Date(firstDate);
  while(eventNum <= howMany) {
	if(!skipWeek.includes(week)) {
	  let formattedDate = date.toISOString().split('T')[0];
	  addEvent(eventType, eventNum, "Not started", formattedDate, myClass);
      eventNum++;
	}

	week++;
	date = addDays(date, interval);
  }
} 
