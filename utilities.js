// utilities.js
"use strict";

import {
  assetsList,
  editAssetName,
  editCategory,
  editOtherCategory,
  editAssetStatus,
  editNextMaintenanceDate,
  setDeleteIndex,
  rowIndexOfEditModal,
  maintenanceIndex,
} from "./data.js";
//////////////////////////////////////////////////////////////////////////////////
// ===========================================Fecthdetail of asset form localstorage
//////////////////////////////////////////////////////////////////////////////////
export function fetchAssets(list = assetsList) {
  // Your fetchAssets function here
  const tbody = document.querySelector("#assetList");
  tbody.innerHTML = "";
  list.forEach((asset, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${asset.name}</td>
      <td>${asset.AssetCategory}</td>
       <td>
        <span class="${
          asset.status === "Needs Maintenance"
            ? "text-danger  danger px-3 py-1 border rounded-pill"
            : asset.status === "In Use"
            ? "text-success success px-3 py-1 border rounded-pill"
            : asset.status === "In Storage"
            ? "text-info info px-3 py-1 border rounded-pill"
            : ""
        }">
          ${
            asset.status === "Needs Maintenance"
              ? '<span class="warning-icon">⚠️</span>'
              : ""
          }
          ${asset.status}
        </span>
      </td>
      <td>${asset.date}</td>
      <td>
        <button class="btn me-1 edit-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editModal">
          <!-- Edit Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 0, 0);" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
        </button>

        <button class="btn me-1 delete-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#deleteModal">
          <!-- Delete Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" style="color: rgb(201, 24, 24);" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
        </button>

        <button class="btn maintenance-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#maintenanceModal">
          <!-- Maintenance Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" style="color: rgb(230, 203, 52);" width="25" height="25" fill="currentColor" class="bi bi-vector-pen" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
            <path fill-rule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086z"/>
          </svg>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });

  bindTableEvents();
}

export function bindTableEvents() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => loadEdit(btn.dataset.index));
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => prepDelete(btn.dataset.index));
  });
  document.querySelectorAll(".maintenance-btn").forEach((btn) => {
    btn.addEventListener("click", () => loadMaintenance(btn.dataset.index));
  });
}

export function loadEdit(index) {
  rowIndexOfEditModal.value = index;
  const asset = assetsList[index];
  editAssetName.value = asset.name;
  const knownCategories = ["Electronics", "Furniture", "Machinery", "Vehicles"];
  if (knownCategories.includes(asset.AssetCategory)) {
    editCategory.value = asset.AssetCategory;
    editOtherCategory.style.display = "none";
  } else {
    editCategory.value = "Others";
    editOtherCategory.style.display = "block";
    editOtherCategory.value = asset.AssetCategory;
  }
  editAssetStatus.value = asset.status;
  const [day, month, year] = asset.date.split("-").map(Number);
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  editNextMaintenanceDate.value = formattedDate;
}

export function prepDelete(index) {
  setDeleteIndex(index);
  const warning = document.getElementById("deleteWarning");
  warning.innerHTML = "";
}

export function loadMaintenance(index) {
  maintenanceIndex.value = index;
}
//////////////////////////////////////////////////////////////////////////////////
// ==============================================================modal form reset
//////////////////////////////////////////////////////////////////////////////////
export function resetForm(formId) {
  document.getElementById(formId).reset();
}
//////////////////////////////////////////////////////////////////////////////////
// ==============================================================Toast implimentation
//////////////////////////////////////////////////////////////////////////////////
export function showToast(message, type = "success") {
  const toastContainer =
    document.getElementById("toastContainer") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${type} border-0 mb-2`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  toastContainer.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  toast.addEventListener("hidden.bs.toast", () => toast.remove());
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toastContainer";
  container.className = "toast-container position-fixed bottom-0 end-0 p-3";
  document.body.appendChild(container);
  return container;
}
