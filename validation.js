// validations.js
"use strict";

import {
  assetName,
  editAssetName,
  category,
  editCategory,
  otherCategory,
  editOtherCategory,
  assetStatus,
  editAssetStatus,
  nextMaintenanceDate,
  editNextMaintenanceDate,
  newMaintenanceDate,
  maintenanceNote,
} from "./data.js";

export let isValid = false;
function setRequiredFields() {
  assetName.required = true;
  category.required = true;
  otherCategory.required = true;
  assetStatus.required = true;
  editAssetName.required = true;
  editCategory.required = true;
  editOtherCategory.required = true;
  editAssetStatus.required = true;
  editNextMaintenanceDate.required = true;
}
setRequiredFields();
//////////////////////////////////////////////////////////////////////////////////
// ==========================================================================validation
//////////////////////////////////////////////////////////////////////////////////
export function showErr(inputField, message) {
  const errorSpan = inputField.nextElementSibling;
  errorSpan.textContent = message;
  isValid = false;
}

export function clearError(inputField) {
  const errorSpan = inputField.nextElementSibling;
  errorSpan.textContent = "";
  isValid = true;
}

// All your event listeners (assetName, category click, etc.) go here
function setupValidations() {
  // assetName keydown event
  assetName.addEventListener("keydown", function () {
    const value = assetName.value.trim();
    if (value === "") {
      showErr(assetName, "Asset Name is required!");
    } else if (!/^[a-zA-Z0-9\s'-]{5,25}$/.test(value)) {
      showErr(
        assetName,
        "Asset Name must be 5-25 characters, letters and numbers only!"
      );
    } else {
      clearError(assetName);
    }
  });

  // similarly add other validations here
  editAssetName.addEventListener("keydown", function () {
    const value = editAssetName.value.trim();

    if (value === "") {
      showErr(editAssetName, "Asset Name is required!");
    } else if (!/^[a-zA-Z0-9\s'-]{5,25}$/.test(value)) {
      showErr(
        editAssetName,
        "Asset Name must be 5-25 characters, letters and numbers only!"
      );
    } else {
      clearError(editAssetName);
    }
  });

  //  ==================================================category

  category.addEventListener("click", function () {
    const value = category.value.trim();

    if (value === "") {
      showErr(category, "Category is required!");
      otherCategory.style.display = "none";
      otherCategory.value = "";
      clearError(otherCategory);
    } else {
      clearError(category);

      if (value === "Others") {
        otherCategory.style.display = "block";
      } else {
        otherCategory.style.display = "none";
        otherCategory.value = "";
        clearError(otherCategory);
      }
    }
  });

  editCategory.addEventListener("click", function () {
    const value = editCategory.value.trim();

    if (value === "") {
      showErr(editCategory, "Category is required!");
      editOtherCategory.style.display = "none";
      editOtherCategory.value = "";
      clearError(editOtherCategory);
    } else {
      clearError(editCategory);

      if (value === "Others") {
        editOtherCategory.style.display = "block";
      } else {
        editOtherCategory.style.display = "none";
        editOtherCategory.value = "";
        clearError(editOtherCategory);
      }
    }
  });
  // =================================================other category
  otherCategory.addEventListener("blur", function () {
    const value = otherCategory.value.trim();

    if (category.value === "Others" && value === "") {
      showErr(otherCategory, "Please specify the other category.");
    } else {
      clearError(otherCategory);
    }
  });
  editOtherCategory.addEventListener("blur", function () {
    const value = editOtherCategory.value.trim();

    if (editCategory.value === "Others" && value === "") {
      showErr(editOtherCategory, "Please specify the other category.");
    } else {
      clearError(editOtherCategory);
    }
  });

  // =================================================Status Validation

  assetStatus.addEventListener("blur", function () {
    const value = assetStatus.value.trim();

    if (value === "") {
      showErr(assetStatus, "Status is required!");
    } else {
      clearError(assetStatus);
    }
  });

  editAssetStatus.addEventListener("blur", function () {
    const value = editAssetStatus.value.trim();

    if (value === "") {
      showErr(editAssetStatus, "Status is required!");
    } else {
      clearError(editAssetStatus);
    }
  });

  // ==============================================Next Maintenance Date Validation

  nextMaintenanceDate.addEventListener("blur", function () {
    const value = nextMaintenanceDate.value.trim();

    if (value === "") {
      showErr(nextMaintenanceDate, "Next Maintenance Date is required!");
      return;
    }
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    if (selectedDate <= today) {
      showErr(nextMaintenanceDate, "Date must be of upcomping days.");
    } else {
      clearError(nextMaintenanceDate);
    }
  });

  editNextMaintenanceDate.addEventListener("blur", function () {
    const value = editNextMaintenanceDate.value.trim();

    if (value === "") {
      showErr(editNextMaintenanceDate, "Next Maintenance Date is required!");
      return;
    }
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    if (selectedDate <= today) {
      showErr(editNextMaintenanceDate, "Date must be of upcomping days.");
    } else {
      clearError(editNextMaintenanceDate);
    }
  });
  newMaintenanceDate.addEventListener("blur", function () {
    const value = newMaintenanceDate.value.trim();

    if (value === "") {
      showErr(newMaintenanceDate, "Next Maintenance Date is required!");
      return;
    }
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    if (selectedDate <= today) {
      showErr(newMaintenanceDate, "Date must be of upcomping days.");
    } else {
      clearError(newMaintenanceDate);
    }
  });

  // ============================== validation discription Maintenance Date update

  maintenanceNote.addEventListener("keydown", function () {
    const value = maintenanceNote.value.trim();

    if (value === "") {
      showErr(maintenanceNote, "Description is required!");
    } else if (value.length < 10 || value.length > 250) {
      showErr(
        maintenanceNote,
        "Description must be between 10 and 250 characters!"
      );
    } else {
      clearError(maintenanceNote);
    }
  });
}

// Immediately run validations setup
setupValidations();
