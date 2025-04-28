// main.js
"use strict";

import {
  assetsList,
  assetName,
  category,
  otherCategory,
  assetStatus,
  nextMaintenanceDate,
  editAssetName,
  editCategory,
  editOtherCategory,
  editAssetStatus,
  editNextMaintenanceDate,
  maintenanceForm,
  newMaintenanceDate,
  maintenanceNote,
  deleteIndex,
  addAssetBtn,
  confirmDeleteBtn,
  updateAsset,
  addMainDateBtn,
  searchInput,
  rowIndexOfEditModal,
  indexOfMaintanceModal,
} from "./data.js";

import { fetchAssets, resetForm, showToast } from "./utilities.js";
import { isValid, showErr, clearError } from "./validation.js";
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
// =================================fetching data from localstorage at inital
//////////////////////////////////////////////////////////////////////////////////
fetchAssets();
// there is problem in the load maintance and the delte button function so check that give the updated file just  fix the error and tell me what it was  just give the update whole file which required any updatiion
//////////////////////////////////////////////////////////////////////////////////
// ====================add the asset to localstorage call function to show data in table
//////////////////////////////////////////////////////////////////////////////////
addAssetBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!isValid) {
    showToast("Fill the asset details First", "danger");
    return;
  }

  if (!isValid) return;

  const name = assetName.value.trim();
  const finalCategory =
    category.value === "Others" ? otherCategory.value.trim() : category.value;
  console.log(finalCategory);
  // if()
  const AssetCategory = finalCategory;
  const status = assetStatus.value;
  let date = new Date(nextMaintenanceDate.value);
  const currentDate = new Date();

  if (date < currentDate) {
    showToast("Date must be in the future", "danger");
    return;
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  date = `${day}-${month}-${year}`;

  if (
    assetsList.some(
      (a) =>
        a.name.toLowerCase() === name.toLowerCase() &&
        a.AssetCategory.toLowerCase() === finalCategory.toLowerCase()
    )
  ) {
    showErr(assetName, "Asset name must be unique within the category");
    return;
  }

  if (isValid) {
    if (!AssetCategory || !name || !status || !date) {
      showToast("Please fill all the required fields", "danger");
      return;
    }
  }

  assetsList.push({ name, AssetCategory, status, date });
  localStorage.setItem("assetsList", JSON.stringify(assetsList));
  fetchAssets(assetsList);

  resetForm("addAssetForm");
  showToast("Asset added successfully", "success");

  bootstrap.Modal.getInstance(document.getElementById("addAssets")).hide();
});

//////////////////////////////////////////////////////////////////////////////////
// ===========================================Fecthdetail of asset form localstorage
//////////////////////////////////////////////////////////////////////////////////
confirmDeleteBtn.addEventListener("click", function () {
  if (assetsList[deleteIndex].status !== "Needs Maintenance") {
    assetsList.splice(deleteIndex, 1);
    localStorage.setItem("assetsList", JSON.stringify(assetsList));
    fetchAssets(assetsList);
    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
    showToast("Asset deleted successfully", "success");
  } else {
    showToast(
      "Cannot delete asset which is in under 'Maintenance' status.",
      "danger"
    );
  }
});
//////////////////////////////////////////////////////////////////////////////////
// ===========================================update assets
//////////////////////////////////////////////////////////////////////////////////
updateAsset.addEventListener("click", function () {
  const index = rowIndexOfEditModal.value;
  const name = editAssetName.value;
  const category =
    editCategory.value === "Others"
      ? editOtherCategory.value
      : editCategory.value;
  const status = editAssetStatus.value;

  let date = new Date(editNextMaintenanceDate.value); // Convert input string to Date
  const currentDate = new Date(); // Current date and time

  if (date <= currentDate) {
    showToast("Date must be in the future", "danger");
    return;
  }
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  date = `${day}-${month}-${year}`;

  if (isValid) {
    if (!category || !name || !status || !date) {
      showToast("Please fill all the required fields", "danger");
      return;
    }
  }

  assetsList[index] = {
    name,
    AssetCategory: category,
    status,
    date,
  };

  localStorage.setItem("assetsList", JSON.stringify(assetsList));
  fetchAssets();
  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  showToast("Asset updated successfully", "success");
});

//////////////////////////////////////////////////////////////////////////////////
// =============================================================Add maintaince date
//////////////////////////////////////////////////////////////////////////////////
addMainDateBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (newMaintenanceDate.value == "" || maintenanceNote.value == "") {
    showToast("Fill the inputs first", "danger");
    return;
  }

  const rowindex = maintenanceIndex.value;
  console.log("Row index for maintenance:", rowindex);

  if (rowindex === "" || assetsList[rowindex] === undefined) {
    showToast("Invalid asset selected", "danger");
    return;
  }

  let updatedDate = new Date(newMaintenanceDate.value);
  const currentDate = new Date();
  console.log(updatedDate);

  if (updatedDate <= currentDate) {
    showToast("Date must be in the future", "danger");
    return;
  }

  const day = `${updatedDate.getDate()}`.padStart(2, "0");
  const month = `${updatedDate.getMonth() + 1}`.padStart(2, "0");
  const year = updatedDate.getFullYear();
  updatedDate = `${day}-${month}-${year}`;
  console.log("Formatted Updated Date:", updatedDate);

  assetsList[rowindex].date = updatedDate;
  assetsList[rowindex].status = "Needs Maintenance";

  localStorage.setItem("assetsList", JSON.stringify(assetsList));
  fetchAssets(assetsList);

  // Close modal
  bootstrap.Modal.getInstance(
    document.getElementById("maintenanceModal")
  ).hide();

  // Reset form
  showToast("Maintenance updated and status set successfully", "success");
  maintenanceForm.reset();
});

//////////////////////////////////////////////////////////////////////////////////
// ===============================================searchbar
//////////////////////////////////////////////////////////////////////////////////
searchInput.addEventListener("input", function (e) {
  e.preventDefault();
  const val = searchInput.value.toLowerCase();
  const filtered = assetsList.filter(
    (a) =>
      a.name.toLowerCase().includes(val) ||
      a.AssetCategory.toLowerCase().includes(val) ||
      a.status.toLowerCase().includes(val)
  );
  fetchAssets(filtered);
});
