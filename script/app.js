/**
 * WEB222 – Assignment 5
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name: Supachai Ruknuy
 *      Student ID:  121707228
 *      Date:03-Aug-2023
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// Select if to display the cards
const displayRowCards = document.querySelector(".row-cards");

// Create the aritst menubar for id=menu
const menu = document.querySelector("#menu");

// Create var for Post's music cards ////
const postySongs = songs.filter(function (song) {
  return song.artistId.includes("POSTY");
});

///////////// Main entry /////////

// Display static menu
artistMenu();

// Display the defalut page
displayDefault();

// Call to display Post Malone
createSongCard(postySongs);

// Display dynamic menu and display artist's cards
displayButton();

///////////////////////////////////

// Function to Display the menu
function artistMenu() {
  for (let i = 0; i < artists.length; i++) {
    let artistMenu = document.createElement("button");

    // add id and text
    artistMenu.id = artists[i].name;
    artistMenu.textContent = artists[i].name;

    menu.appendChild(artistMenu);
  }
}

// Function to Display a the default page
function displayDefault() {
  ////////////////// Display Post Malone's songs as default/////
  window.addEventListener("DOMContentLoaded", function () {
    //////////////// Default Post malone info by default //////////////////
    const artistInfo = document.querySelector("#selected-artist");

    // Get artist object
    const getArtist = artists[0];

    // Display Artist as a header
    artistInfo.textContent = getArtist.name;

    // Open parenthesis
    const openParent = document.createTextNode(" (");
    artistInfo.appendChild(openParent);

    // Display artists link
    const spanTag = document.createElement("span");

    // Create an anchor element and add info
    for (let j = 0; j < getArtist.link.length; j++) {
      const linkArr = getArtist.link[j];

      const anchor = document.createElement("a");
      anchor.href = linkArr.url;
      anchor.textContent = linkArr.name;

      // append to the span tag
      spanTag.appendChild(anchor);

      if (j < getArtist.link.length - 1) {
        const addComma = document.createTextNode(", ");
        spanTag.appendChild(addComma);
      }
    }

    // Append the link
    artistInfo.appendChild(spanTag);

    // close parenthesis
    const closeParent = document.createTextNode(")");
    artistInfo.appendChild(closeParent);

    const getSongDetail = getAttributes(songs);

    displayRowCards.appendChild(getSongDetail);
  });
}

// Function to display cards
function createSongCard(song) {
  const getAllSongInfo = song
    .map(function (songObj) {
      return getAttributes(songObj);
    })
    .join("");

  displayRowCards.innerHTML = getAllSongInfo;
}

// Get attributes from songs objct
function getAttributes(songObj) {
  // Convert the duration to min:sec format
  const minutes = Math.floor(songObj.duration / 60);
  const seconds = songObj.duration % 60;
  const minFormatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return `<div class="song-card">
  <img src="${songObj.urlImage}" alt="album-cover" width=200px, height=400px>
    <div class='song-detail'>
      <h2>${songObj.title}</h2>
      <time>${songObj.year}</time>
      <span id="min">${minFormatted} min</span>
    </div>
  </div>`; // convert duration to minute later
}

// Function to display changing button
function displayButton() {
  const artistInfo = document.querySelector("#selected-artist");
  // select all button elements
  const artistButton = document.querySelectorAll("button");

  // loop through element
  for (let i = 0; i < artistButton.length; i++) {
    // create an on-click event for the artist's button
    artistButton[i].addEventListener("click", function () {
      // Get artist object
      const getArtist = artists[i];

      // Display artist's name
      artistInfo.textContent = getArtist.name;

      // open parenthesis
      const openParent = document.createTextNode(" (");
      artistInfo.appendChild(openParent);

      // Display artists link
      const spanTag = document.createElement("span");

      // Create an anchor element and add info
      for (let j = 0; j < getArtist.link.length; j++) {
        const linkArr = getArtist.link[j];

        const anchor = document.createElement("a");
        anchor.href = linkArr.url;
        anchor.textContent = linkArr.name;

        // append to the span tag
        spanTag.appendChild(anchor);

        if (j < getArtist.link.length - 1) {
          const addComma = document.createTextNode(", ");
          spanTag.appendChild(addComma);
        }
      }
      // Append the link
      artistInfo.appendChild(spanTag);

      // close parenthesis
      const closeParent = document.createTextNode(")");
      artistInfo.appendChild(closeParent);

      /// Display dynamic cards basd on artist name

      // Get the Artist code
      let getArtistId = getArtist.name;

      // validate artistID
      if (getArtistId === "Post Malone") {
        getArtistId = "POSTY";
      } else if (getArtistId === "Drake") {
        getArtistId = "DK";
      } else if (getArtistId === "Eminem") {
        getArtistId = "EM";
      }

      // Create var for Post's music cards ////
      const artistCards = songs.filter(function (song) {
        return song.artistId.includes(getArtistId);
      });

      // Call the function to display artist's cards
      createSongCard(artistCards);
    });
  }
}
