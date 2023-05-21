console.log("run script")
class Item {
	itemNum;
	serialNum;
	itemName;
	brand;
	modelNum;
	itemStatus;
	dateAcq;
	location;
	remarks;
	checkedBy;
	dateIssued;

	Issue() {
		dateIssued = new Date();
	}

	Print() {
		console.log("Item Number: " + itemNum)
		console.log("Serial Number: " + serialNum)
		console.log("Item Name: " + itemName)
		console.log("Brand: " + brand)
		console.log("Model Number: " + modelNum)
		console.log("Status: " + itemStatus)
		console.log("Date Acquisition: " + dateAcq)
		console.log("Location: " + location)
		console.log("Remarks: " + Remarks)
		console.log("Checked By: " + CheckedBy)
		console.log("Is functional: " + isFunctional)
		console.log("Date issued: " + dateIssued)
		console.log("Model name: " + GetModelName())
	}

	GetModel() {
		models.forEach(model => {
			if (models.modelNum == modelNum)
				return model
		});
	}

	GetModelName() {
		models.forEach(model => {
			if (model.modelNum == modelNum)
				return model.name
		});
	}
}

class Model {
	modelNum;
	isConsumable;
	count;
}

// model num ex:
// 1231 = monitor
// 2412 = mouse
// 3112 = keyboard
// 4114 = sensor
// 5666 = some consumable

let models = []
let items = []
var counter = 0

function GetDefaultObjectAt(array, index)
{
	return array[index] = array[index] || {};
}

/**
 * Initializes the page
 */
function Init()
{
	console.log("init")

	models = GetDefaultObjectAt(models, 0)
	items = GetDefaultObjectAt(items, 0)

	models = JSON.parse(sessionStorage.getItem('models') || '[]')
	items = JSON.parse(sessionStorage.getItem('items') || '[]')
	counter = sessionStorage.getItem('counter')

	if (models == null)
	{
		console.log("models is null")
		models = []
	}
	if (items == null)
	{
		console.log("items is null")
		items = []
	}
	if (counter == null)
	{
		console.log("counter is null")
		counter = 0
	}

	console.log("models: " + models)
	console.log("items: " + items)
	console.log("counter: " + counter)


	InitItemTable()
}

Init()

/**
 * Saves variables in a session storage
 */
function Save()
{
	sessionStorage.setItem('models', JSON.stringify(models))
	sessionStorage.setItem('items', JSON.stringify(items))
	sessionStorage.setItem('counter', counter)
}
/**
 * Add a new item
 * @param {Item} item - item
 * @return {boolean}
 */
function Create(item) {
	console.log("create")
	// var itemNumInput = prompt("Item Number: ")
	// var serialNumInput = prompt("Serial Number: ")
	// var itemNameInput = prompt("Item Name: ")
	// var brandInput = prompt("Brand: ")
	// var modelNumInput = prompt("Model Number: ")
	// var itemStatusInput = prompt("Status: ")
	// var dateAcqInput = prompt("Date Acquistion: ")
	// var locationInput = prompt("Location: ")
	// var remarksInput = prompt("Remarks: ")
	// var checkedByInput = prompt("Checked By: ")

	// increase in model
	let flag = false
	var i
	for (i = 0; i < models.length; i++)
	{
		if (models[i].modelNum == item.modelNum)
		{
			models[i].count++
			flag = true
			break
		}
	}

	// check duplicates
	for (let j = 0; j < items.length; j++)
	{
		if (items[j].serialNum == item.serialNum)
			return false
		if (items[j].itemNum == item.itemNum)
			return false
	}

	var isConsumableInput
	if (!flag) {
		alert("New model detected please input details for new model")
		isConsumableInput = confirm("Is this consumable?")
		let model = CreateModel(item.modelNum, isConsumableInput)
		model.count++
	}

	if (!isConsumableInput)
		models[i].isConsumable = isConsumableInput

	// let item = {
	// 	itemNum: itemNumInput,
	// 	serialNum: serialNumInput,
	// 	ItemName: itemNameInput,
	// 	brand: brandInput,
	// 	modelNum: modelNumInput,
	// 	itemStatus: itemStatusInput,
	// 	dateAcq: dateAcqInput,
	// 	location: locationInput,
	// 	Remarks: remarksInput,
	// 	CheckedBy: checkedByInput,
	// 	functional: isFunctionalInput
	// }


	items[counter] = item;
	counter++;
	return true
}
/**
 * Get an item
 * @param {int} serialNum - serial number
 * @return {Item} - item object
 */
function Read(serialNum) {
	for (let i = 0; i < items.length; i++)
		if (serialNum == items[i].serialNum)
			return items[i];
}
/** 
 * Update an item
 * @param {Item} item - updated item
 * @param {int} serialNum - serial number
 */
function Update(item, serialNum) {
	for (let i = 0; i < items.length; i++)
		if (serialNum == items[i].serialNum)
			items[i] = item
}
/**
 * Delete an item
 * @param {int} serialNum - serial number
 */
function Delete(serialNum) {
	for (let i = 0; i < items.length; i++) {
		if (serialNum == items[i].serialNum) {
			// decrease in model
			for (let j = 0; j < models.length; j++)
				if (models[j].modelNum == items[i].modelNum)
					models[j].count--

			for (let j = i; j < items.length; j++)
				items[j] = items[j + 1]
			break
		}
	}
	counter--
}
/**
 * Handles adding a new item.
 */
function HandleCreate() {
	console.log("handle create")

	var itemNumInput = document.getElementById("itemno").value
	var serialNumInput = document.getElementById("serialno").value
	var itemNameInput = document.getElementById("description").value
	var brandInput = document.getElementById("brand").value
	var modelNumInput = document.getElementById("modelno").value
	var itemStatusInput = document.querySelector('input[name="status"]:checked').value
	var dateAcqInput = document.getElementById("dateacq").value
	var locationInput = document.getElementById("location").value
	var remarksInput = document.getElementById("remarks").value
	var checkedByInput = document.getElementById("checked").value

	let item = {
		itemNum: itemNumInput,
		serialNum: serialNumInput,
		itemName: itemNameInput,
		brand: brandInput,
		modelNum: modelNumInput,
		itemStatus: itemStatusInput,
		dateAcq: dateAcqInput,
		location: locationInput,
		remarks: remarksInput,
		checkedBy: checkedByInput,
	}

	if (Create(item))
	{
		console.log("item created")
		document.getElementById("item-table").innerHTML += "<tr><td>" + item.itemNum + "</td>" +
			"<td>" + item.serialNum + "</td>" +
			"<td>" + item.itemName + "</td>" +
			"<td>" + item.brand + "</td>" +
			"<td>" + item.modelNum + "</td>" +
			"<td>" + item.itemStatus + "</td>" +
			"<td>" + item.dateAcq + "</td>" +
			"<td>" + item.location + "</td>" +
			"<td>" + item.remarks + "</td>" +
			"<td>" + item.checkedBy + "</td></tr>"
		console.log("added new row")

		Save()
	}
	else
	{
		console.alert("An item with the same serial number or item number already exist.")
	}
}
/**
 * Handles reading an item
 */
function HandleRead() {

	var serialNum = document.getElementById("to be inserted").value

	// output to HTML
	var item = Read(serialNum)
	console.log(item)
}
/**
 * Handles updating an item.
 */
function HandleUpdate() {
	var serialNum = document.getElementById("to be inserted").value
	Update(updatedItem, serialNum)
}
/**
 * Handles deleting an item.
 */
function HandleDelete() {

	var serialNum = document.getElementById("to be inserted").value

	Delete(serialNum)
	// TODO: update HTML accordingly
}
/**
 * Print details of all items.
 */
function PrintAll() {
	for (let i = 0; i < items.length; i++)
		items[i].Print()
}
/**
 * Increase the number of item count if it's consumable.
 * @param {int} modelNum - model number
 */
function Decrease(modelNum) {
	// check if consumable
	flag = false
	for (let i = 0; i < counter; i++) {
		if (modelNum == models[i].modelNum) {
			flag = true
			break
		}
	}

	if (!flag)
		return


	// search in items for modelNum
	for (let i = 0; i < counter; i++) {
		// search for first modelNum
		// shift items
		// call `Delete` function
		if (items[i].modelNum == modelNum)
			Delete(items[i].serialNum)
	}
}
/**
 * Increase the number of item count if it's consumable.
 * @param {int} modelNum - model number
 */
function Increase(modelNum) {
	// check if consumable
	flag = false
	for (let i = 0; i < counter; i++) {
		if (modelNum == models[i].modelNum) {
			flag = true
			break
		}
	}

	if (!flag)
		return

	// search in items for modelNum
	for (let i = 0; i < counter; i++) {
		// search for first modelNum
		// shift items
		// call `Delete` function
		if (items[i].modelNum == modelNum)
		{
			Create(items[i].serialNum)
		}
	}
}
/**
 * Submit details
 */
var submitButton = document.getElementById("submit-id")
if (submitButton != null)
{
	submitButton.addEventListener("click", function (event) {
		console.log("submit event")
		event.preventDefault()
		
		HandleCreate()
	})
}

/**
 * Reset inventory app.
 */
function Reset() {
	response = confirm("Are you sure you want to reset?")
	if (response) {
		DeleteAll()
		alert("All items have been deleted")
	}
	else {
		alert("Reset aborted")
	}
}
/**
 * Generate summary of the total count of functional and defective items.
 */
function Summary() {
	let functional = 0
	let defective = 0
	items.forEach(e => {
		if (e.itemStatus == "working")
			functional++
		else
			defective++;
	});
	document.getElementById("summary-id").innerHTML = "Functional: " + functional + "<br>Defective: " + defective
}
/**
 * Deletes all item in the inventory.
 */
function DeleteAll() {
	items.length = 0
	models.forEach(e => {
		e.count = 0
	});
}
/**
 * Add a new model.
 * @param {int} modelNum - model number
 * @param {boolean} isConsumable - item type (consumable or not)
 */
function CreateModel(modelNum, isConsumable) {
	models[models.length] = {
		count: 0,
		modelNum: modelNum,
		isConsumable: isConsumable
	}
	return models[models.length - 1]
}
/**
 * Remove an existing model.
 * @param {int} modelNum - model number
 */
function DeleteModel(modelNum) {
	DeleteAllModelItems(modelNum)
	models = models.filter(function (model) {
		return model.modelNum != modelNum
	})
}
/**
 * Handles model deletion.
 */
function HandleDeleteModel() {
	DeleteModel(modelNum)
}
/**
 * Delete all items of a specific model.
 * @param {int} modelNum - model number
 */
function DeleteAllModelItems(modelNum) {
	for (let i = 0; i < items.length; i++) {
		if (modelNum == items[i].modelNum) {
			Delete(items[i].serialNum)
			i--;
		}
	}
}
/**
 * Initializes the item table
 * 	@see itemNum;
 *	@see serialNum;
 *	@see itemName;
 *	@see brand;
 *	@see modelNum;
 *	@see itemStatus;
 *	@see dateAcq;
 *	@see location;
 *	@see remarks;
 *	@see checkedBy;
 */
function InitItemTable() {
	console.log("Init item table")
	var element = document.getElementById("item-table")

	for (let i = 0; i < items.length; i++)
	{
		element.innerHTML += "<tr><td>" + items[i].itemNum + "</td>" +
			"<td>" + items[i].serialNum + "</td>" +
			"<td>" + items[i].itemName + "</td>" +
			"<td>" + items[i].brand + "</td>" +
			"<td>" + items[i].modelNum + "</td>" +
			"<td>" + items[i].itemStatus + "</td>" +
			"<td>" + items[i].dateAcq + "</td>" +
			"<td>" + items[i].location + "</td>" +
			"<td>" + items[i].remarks + "</td>" +
			"<td>" + items[i].checkedBy + "</td></tr>"
	}

}
/**
 * Check if model exist
 * @param {int} modelNum - model number
 * @param {boolean}
 */
function CheckModel(modelNum) {
	for (var i = 0; i < models.length; i++)
		if (modelNum == models[i].modelNum)
			return true
	return false
}

var resetButton = document.getElementById("reset-button")
if (resetButton != null)
{
	resetButton.addEventListener("click", function () {
		console.log("event reset")
		Reset()
	})
}

var summaryButton = document.getElementById("summary-button")
if (summaryButton != null)
{
	summaryButton.addEventListener("click", function () {
		console.log("event summary")
		Summary()
	})
}

var modelInputPointer = function () {

	if (event.key != "Enter") {
		console.log("not enter");
		return
	}

	console.log("check enter")

	var element = document.getElementById("delete-id")
	var modelNum = document.getElementById("delete-input").value

	if (CheckModel(modelNum)) {
		DeleteAllModelItems(modelNum)
		element.innerHTML = "All items of model: " + modelNum + " deleted."
	}
	else {
		element.innerHTML = "No model with model number of " + modelNum + " found."
	}
}

var deleteButton = document.getElementById("delete-button")
if (deleteButton != null)
{
	deleteButton.addEventListener("click", function () {
		console.log("event delete")	

		document.getElementById("delete-id").innerHTML = '<input type="text" id="delete-input"></input>'
		document.getElementById("delete-input").addEventListener("keypress", modelInputPointer)
	})
}

var deleteInput = document.getElementById("delete-input")
if (deleteInput != null)
{
	deleteInput.addEventListener("keypress", modelInputPointer)
}

var deleteId = document.getElementById("delete-id")
if (deleteId != null)
{
	console.log("delete-id")
	// deleteId.innerHTML = "<input type='text' id='delete-input'></input>"
}