let storedNotes = JSON.parse(localStorage.getItem("notes"));

let notes = storedNotes ? storedNotes : [];
let list = document.getElementById("list");
let upd = 0,
  targ = "";

document.getElementById("add-btn").addEventListener("click", function () {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  //console.log(description, "des");

  if (title.trim() === "") {
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
    listItem.setAttribute("id", "li" + i);

    let divTitle = document.createElement("DIV");
    divTitle.textContent = note.title;
    divTitle.setAttribute("id", "div1" + i);

    let divDescription = document.createElement("DIV");
    divDescription.textContent = note.description;
    divDescription.setAttribute("id", "div2" + i);

    let deletebut = document.createElement("button");
    let deltetext = document.createTextNode("delete");
    deletebut.setAttribute("id", "deletebu" + i);
    deletebut.appendChild(deltetext);
    let updatebut = document.createElement("button");
    let updatetext = document.createTextNode("update");
    updatebut.appendChild(updatetext);
    updatebut.setAttribute("id", "updatebu" + i);

    deletebut.addEventListener("click", function () {
      let conf = confirm("are you sure you want to delete the note ?");
      if (conf) {
        notes.splice(i, 1);
        showNotes();
      }
    });

    updatebut.addEventListener("click", function (e) {
      if (e.target.id != targ) {
        upd = 0;
      }

      if (upd == 1) {
        notes[i].title = document.getElementById("inp1").value;
        notes[i].description = document.getElementById("inp2").value;
        upd = 0;
        showNotes();
        return;
      } else {
        showNotes();

        let hid = document.querySelectorAll("#div1" + i + ",#div2" + i);

        for (let i = 0; i < hid.length; i++) {
          hid[i].style.display = "none";
        }
        let inpTitle = document.createElement("input");
        inpTitle.setAttribute("type", "text");
        inpTitle.setAttribute("id", "inp1");
        inpTitle.value = note.title;

        let inpDescription = document.createElement("textarea");
        inpDescription.setAttribute("cols", "60");
        inpDescription.setAttribute("rows", "8");
        inpDescription.setAttribute("id", "inp2");
        inpDescription.value = note.description;
        let listIt = document.getElementById("li" + i);
        //console.log(i);
        let br1 = document.createElement("br");
        let br2 = document.createElement("br");
        listIt.prepend(br1);
        listIt.prepend(inpDescription);
        listIt.prepend(br2);
        listIt.prepend(inpTitle);
        upd = 1;
        targ = e.target.id;
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

document.getElementById("sortB").addEventListener("click", function () {
  notes.sort(function (a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  showNotes();
});
