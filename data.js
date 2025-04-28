// data.js
"use strict";

// LocalStorage data
export let assetsList = JSON.parse(localStorage.getItem("assetsList")) || [];

export let deleteIndex = null;

export function setDeleteIndex(i) {
  deleteIndex = i;
}

//=========================================================================Add modal elements
export const assetName = document.querySelector("#assetName");
export const category = document.querySelector("#category");
export const otherCategory = document.querySelector("#otherCategory");
export const assetStatus = document.querySelector("#assetStatus");
export const nextMaintenanceDate = document.querySelector(
  "#nextMaintenanceDate"
);

////=========================================================================Edit modal element
export const editAssetName = document.querySelector("#editAssetName");
export const editCategory = document.querySelector("#editCategory");
export const editOtherCategory = document.querySelector("#editOtherCategory");
export const editAssetStatus = document.querySelector("#editStatus");
export const editNextMaintenanceDate = document.querySelector("#editDate");

//=========================================================================input and buttons
export const addForm = document.getElementById("addForm");
export const editForm = document.getElementById("editForm");
export const maintenanceForm = document.getElementById("maintenanceForm");
export const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
export const searchInput = document.getElementById("searchInput");
export const maintenanceNote = document.getElementById("maintenanceNote");
export const newMaintenanceDate = document.getElementById("newMaintenanceDate");
export const addMainDateBtn = document.querySelector("#addMantenanceDate");
export const rowIndexOfEditModal = document.getElementById("editIndex");
export const maintenanceIndex = document.getElementById("maintenanceIndex");
export const addAssetBtn = document.querySelector("#addAssetbtnModal1");
export const updateAsset = document.querySelector("#updateAsset");
export let indexOfMaintanceModal = maintenanceIndex;
