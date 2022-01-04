// Load in function and input library
import { addClassDeadlines, printClassDeadlines } from "./addClassDeadlines.js";
import prompt from "prompt-sync";

const promp = prompt();


// --- EDIT BELOW --- // --- EDIT BELOW --- // --- EDIT BELOW --- //

let firstDate = new Date("January 13, 2022 00:00:00");
let eventType = "Colab "	// Format will be "{eventType}{number}"
let interval = 7;			// Number of days between assignments
let howMany = 9;			// Number of assignments total
let skipWeek = [];			// Which weeks to skip (e.g., [1, 2] skips the first and third weeks)
let myClass = "CS 246";		// Class name

// --- EDIT ABOVE --- //  --- EDIT ABOVE --- // --- EDIT ABOVE --- //


printClassDeadlines(firstDate, eventType, interval, howMany, skipWeek, myClass);
const input = promp("\nConfirm schedule? y/[n]: ");
if(input == "y") {
	addClassDeadlines(firstDate, eventType, interval, howMany, skipWeek, myClass);
	console.log("\nFinished scheduling %i events!\n", howMany);
}
