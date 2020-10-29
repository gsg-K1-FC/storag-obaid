let storedNotes = JSON.parse(localStorage.getItem("notes"));

let notes = storedNotes ? storedNotes : [];
let list = document.getElementById("list");

document.getElementById("add-btn").addEventListener("click", function () {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  console.log(description, "des");

  if (title === "") {
    alert("pleas enter the title of the note");
  } else {
    notes.push({ title: title, description: description });
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    console.log(notes, "notes");
    showNotes();
  }
});

showNotes();

function showNotes() {
  list.innerHTML = "";

  notes.map(function (note, i) {
    let listItem = document.createElement("LI");

    let divTitle = document.createElement("DIV");
    divTitle.textContent = note.title;

    let divDescription = document.createElement("DIV");
    divDescription.textContent = note.description;

    let deletebut = document.createElement("button");
    let deltetext = document.createTextNode("delete");
    deletebut.appendChild(deltetext);
    let updatebut = document.createElement("button");
    let updatetext = document.createTextNode("update");
    updatebut.appendChild(updatetext);

    deletebut.addEventListener("click", function () {
      let conf = confirm("are you sure you want to delete the note ?");
      if (conf) {
        notes.splice(i, 1);
        showNotes();
      }
    });

    listItem.appendChild(divTitle);
    listItem.appendChild(divDescription);
    listItem.appendChild(deletebut);
    listItem.appendChild(updatebut);
    list.appendChild(listItem);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
