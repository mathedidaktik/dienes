// get and set Url values
let minValue = 0;
let maxValue = 0;
const queryString = window.location.search;
const urlSearchParams = new URLSearchParams(queryString);
for (const [key, value] of urlSearchParams) {
  minValue = urlSearchParams.get("min");
  maxValue = urlSearchParams.get("max");
}
//check for negative numbers in URL  / min should always be smaller than max
if (parseInt(minValue) < 0 || parseInt(minValue) > parseInt(maxValue)) {
  alert(
    "URL Min-wert darf nicht Null oder ein negative Zahl sein\nMin-wert darf nicht größer als Max-wert sein"
  );
  refreshPage();
}

// Header part Welcome text and show random number
const firstLine = $("#first-line"),
  secondLine = $("#second-line"),
  random_number = $("#randomNumber");

firstLine.html(`<span class="headerText">Herzlich Willkommen!</span>`);
random_number.html("");
secondLine.html(
  `<span class="headerText">Drücke <span style="color:yellowgreen" class="headerText"> Start</span> , um zu beginnen.`
);
// only start button is enable all other buttons are disabled
$("#checkbtn").prop("disabled", true);
$("#undobtn").prop("disabled", true);

// main field
let show_start_text = false;
let random;
let counter = 0;

let counterEiner = 0;
let counterZehner = 0;
let counterHunderter = 0;
let counterTausender = 0;
var img_1_id = "#imgEiner";
var img_10_id = "#imgZehner";
var img_100_id = "#imgHunderter";
var img_1000_id = "#imgTausender";
var dropID = "#dropbox";

var dropBox = $("#dropbox");
var positionLeft = dropBox.position().left;
var positionTop = dropBox.position().top;
var dropBoxWidth = dropBox.width();
var dropBoxHeight = dropBox.height();

var down = $("#down");
var down_height = down.height();
var down_width = down.width();
var down_pos_left = down.position().left;
var down_pos_top = down.position().top;

var up = $("#up");
var up_height = up.height();

var el1_height = $("#imgEiner").height();
var el1_width = $("#imgEiner").width();
var el10_height = $("#imgZehner").height();
var el10_width = $("#imgZehner").width();
var el1000_height = $("#imgTausender").height();
var el1000_width = $("#imgTausender").width();
var el100_height = $("#imgHunderter").height();
var el100_width = $("#imgHunderter").width();

var down_ids = [
  "cloneElement-1-down",
  "cloneElement-10-down",
  "cloneElement-100-down",
  "cloneElement-1000-down",
];
var merge_ids = [
  "cloneElement-1-dropbox-merge",
  "cloneElement-10-dropbox-merge",
  "cloneElement-100-dropbox-merge",
  "cloneElement-1000-dropbox-merge",
];
var delete_ids = [
  "cloneElement-1-dropBox-delete",
  "cloneElement-10-dropBox-delete",
  "cloneElement-100-dropBox-delete",
  "cloneElement-1000-dropBox-delete",
];

var TausenderId = document.querySelector("#imgTausender");
var HunderterId = document.querySelector("#imgHunderter");
if (maxValue < 100) {
  HunderterId.style.display = "none";
  TausenderId.style.display = "none";
} else if (maxValue < 1000) {
  TausenderId.style.display = "none";
}

//hide the merge area, show the merge area only if the users answer is correct but not optimal
let start_counting_in_merge_area = false;
$(".dropBox-merge").css({
  "background-color": "#f0ede5",
});
$(".merge-img").css({
  visibility: "hidden",
});
// select the dropable area  and add a drop function on it
// each time a draggable image drops in the field  increment the counter accordingly
// If an element is droped in "down" area change its ID to "down id" this is to identify and differentiate between items in merge area and down area
$("#down").droppable({
  tolerance: "fit",
  drop: function (event, ui) {
    var $canvas = $(this);

    if (!ui.draggable.hasClass("canvas-element")) {
      //ui is the draggable object
      if (ui.draggable.hasClass("img1")) {
        var $canvasElement = ui.draggable.clone();
        $canvasElement.attr("id", "cloneElement-1-down");
      } else if (ui.draggable.hasClass("img2")) {
        var $canvasElement = ui.draggable.clone();
        $canvasElement.attr("id", "cloneElement-10-down");
      } else if (ui.draggable.hasClass("img3")) {
        var $canvasElement = ui.draggable.clone();
        $canvasElement.attr("id", "cloneElement-100-down");
      } else if (ui.draggable.hasClass("img4")) {
        var $canvasElement = ui.draggable.clone();
        $canvasElement.attr("id", "cloneElement-1000-down");
      }
      $canvasElement.addClass("canvas-element");
      $canvasElement.draggable({
        containment: "#dropbox",
        stack: ".img1, .img2, .img3, .img4",
      });
      $canvas.append($canvasElement);
      $canvasElement.css({
        left: ui.position.left,
        top: ui.position.top,
        position: "absolute",
      });

      //if the user already clicked on check button once and want to correct answer show the random number only just like beginning
      if (show_start_text) {
        firstLine.html(
          `<span class="headerText"> Stelle die Zahl <span style="color:yellowgreen" class="headerText">${random} </span> mit den Materialien dar! </span>`
        );
        random_number.html(``);
        secondLine.html(``);
        show_start_text = false;
      }
    }
    if (ui.draggable.attr("id") === merge_ids[0]) {
      ui.draggable.attr("id", down_ids[0]);
      counterEiner--;
      //console.log(counterEiner);
    } else if (ui.draggable.attr("id") === merge_ids[1]) {
      ui.draggable.attr("id", down_ids[1]);
      counterZehner--;
      //console.log(counterZehner);
    } else if (ui.draggable.attr("id") === merge_ids[2]) {
      ui.draggable.attr("id", down_ids[2]);
      counterHunderter--;
    } else if (ui.draggable.attr("id") === merge_ids[3]) {
      ui.draggable.attr("id", down_ids[3]);
    }
  },
});

// If a element is droped in "dropbox merge" area, its ID will changed to "merge id"
$("#dropbox-merge").droppable({
  tolerance: "fit",
  drop: function (event, ui) {
    var $canvas = $(this);
    if (start_counting_in_merge_area) {
      if (!ui.draggable.hasClass("canvas-element")) {
        if (ui.draggable.hasClass("img1")) {
          var $canvasElement = ui.draggable.clone();
          $canvasElement.attr("id", "cloneElement-1-dropbox-merge");
          counterEiner++;
        } else if (ui.draggable.hasClass("img2")) {
          var $canvasElement = ui.draggable.clone();
          $canvasElement.attr("id", "cloneElement-10-dropbox-merge");
          counterZehner++;
          //console.log(counterZehner);
        } else if (ui.draggable.hasClass("img3")) {
          var $canvasElement = ui.draggable.clone();
          $canvasElement.attr("id", "cloneElement-100-dropbox-merge");
          counterHunderter++;
        } else if (ui.draggable.hasClass("img4")) {
          var $canvasElement = ui.draggable.clone();
          $canvasElement.attr("id", "cloneElement-1000-dropbox-merge");
          counterTausender++;
        }
        $canvasElement.addClass("canvas-element");
        $canvasElement.draggable({
          containment: "#dropbox",
          stack: ".img1, .img2, .img3, .img4",
        });
        $canvas.append($canvasElement);
        $canvasElement.css({
          left: ui.position.left,
          top: ui.position.top,
          position: "absolute",
        });

        //if the user already clicked on check button once and needs to correct the answer or try to represent with lesser boxes, show the random number only (on header) just like at the beginning
        if (show_start_text) {
          firstLine.html(
            `<span class="headerText"> Stelle die Zahl <span style="color:yellowgreen" class="headerText">${random} </span> mit den Materialien dar! </span>`
          );
          random_number.html(``);
          secondLine.html(``);
          show_start_text = false;
        }
      }
      if (ui.draggable.attr("id") === down_ids[0]) {
        ui.draggable.attr("id", merge_ids[0]);
        counterEiner++;
      } else if (ui.draggable.attr("id") === down_ids[1]) {
        ui.draggable.attr("id", merge_ids[1]);
        counterZehner++;
      } else if (ui.draggable.attr("id") === down_ids[2]) {
        ui.draggable.attr("id", merge_ids[2]);
        counterHunderter++;
      } else if (ui.draggable.attr("id") === down_ids[3]) {
        ui.draggable.attr("id", merge_ids[3]);
      }

      if (counterEiner == 10) {
        createElement(img_10_id);
        var boxes = $("[id=cloneElement-1-dropbox-merge]");
        var boxes_length = boxes.length;
        merge(boxes, boxes_length, el1_width - 3, 0);
        boxes.hide("slow", function () {
          boxes.remove();
        });
        counterEiner = 0;
        counterZehner++;
        // show the randomly generated number on header part
        firstLine.html(
          `<span class="headerText"> Stelle die Zahl <span style="color:yellowgreen" class="headerText">${random} </span> mit den Materialien dar! </span>`
        );
        $("#randomNumber").html("");
        secondLine.html("");
      }
      if (counterZehner == 10) {
        createElement(img_100_id);
        var boxes = $("[id=cloneElement-10-dropbox-merge]");
        var boxes_length = boxes.length;
        merge(boxes, boxes_length, 0, el10_height - 6);
        boxes.hide("slow", function () {
          boxes.remove();
        });
        counterZehner = 0;
        counterHunderter++;
        // show the randomly generated number on header part
        firstLine.html(
          `<span class="headerText"> Stelle die Zahl <span style="color:yellowgreen" class="headerText">${random} </span> mit den Materialien dar! </span>`
        );
        $("#randomNumber").html("");
        secondLine.html("");
      }
      if (counterHunderter == 10) {
        createElement(img_1000_id);
        var boxes = $("[id=cloneElement-100-dropbox-merge]");
        var boxes_length = boxes.length;
        merge(boxes, boxes_length, 3, 3);
        boxes.hide("slow", function () {
          boxes.remove();
        });
        counterHunderter = 0;
        // show the randomly generated number on header part
        firstLine.html(
          `<span class="headerText"> Stelle die Zahl <span style="color:yellowgreen" class="headerText">${random} </span> mit den Materialien dar! </span>`
        );
        $("#randomNumber").html("");
        secondLine.html("");
      }
    }
    if (!start_counting_in_merge_area) {
      // if merge area is hidden

      if (!ui.draggable.hasClass("canvas-element")) {
        //ui is the draggable object
        if (ui.draggable.hasClass("img1")) {
          var $canvasElement = ui.draggable.clone();
          $canvasElement.attr("id", "cloneElement-1-down");
        } else if (ui.draggable.hasClass("img2")) {
          var $canvasElement = ui.draggable.clone();
          $canvasElement.attr("id", "cloneElement-10-down");
        } else if (ui.draggable.hasClass("img3")) {
          var $canvasElement = ui.draggable.clone();
          $canvasElement.attr("id", "cloneElement-100-down");
        } else if (ui.draggable.hasClass("img4")) {
          var $canvasElement = ui.draggable.clone();
          $canvasElement.attr("id", "cloneElement-1000-down");
        }
        $canvasElement.addClass("canvas-element");
        $canvasElement.draggable({
          containment: "#dropbox",
          stack: ".img1, .img2, .img3, .img4",
        });
        $canvas.append($canvasElement);
        $canvasElement.css({
          left: ui.position.left,
          top: ui.position.top,
          position: "absolute",
        });

        //if the user already clicked on check button once and want to correct answer show the random number only just like beginning
        if (show_start_text) {
          firstLine.html(
            `<span class="headerText"> Stelle die Zahl <span style="color:yellowgreen" class="headerText">${random} </span> mit den Materialien dar! </span>`
          );
          random_number.html(``);
          secondLine.html(``);
          show_start_text = false;
        }
      }
      if (ui.draggable.attr("id") === merge_ids[0]) {
        ui.draggable.attr("id", down_ids[0]);
        counterEiner--;
        //console.log(counterEiner);
      } else if (ui.draggable.attr("id") === merge_ids[1]) {
        ui.draggable.attr("id", down_ids[1]);
        counterZehner--;
        //console.log(counterZehner);
      } else if (ui.draggable.attr("id") === merge_ids[2]) {
        ui.draggable.attr("id", down_ids[2]);
        counterHunderter--;
      } else if (ui.draggable.attr("id") === merge_ids[3]) {
        ui.draggable.attr("id", down_ids[3]);
      }
    }
  },
});

// If a element is droped into "delete" area, remove them and set the counters back to zero
$("#dropBox-delete").droppable({
  tolerance: "intersect",
  drop: function (event, ui) {
    var $canvas = $(this);
    if (!ui.draggable.hasClass("canvas-element")) {
      if (ui.draggable.hasClass("img1")) {
        var $canvasElement = ui.draggable.clone();
        $canvasElement.attr("id", "cloneElement-1-delete");
      } else if (ui.draggable.hasClass("img2")) {
        var $canvasElement = ui.draggable.clone();
        $canvasElement.attr("id", "cloneElement-10-delete");
      } else if (ui.draggable.hasClass("img3")) {
        var $canvasElement = ui.draggable.clone();
        $canvasElement.attr("id", "cloneElement-100-delete");
      } else if (ui.draggable.hasClass("img4")) {
        var $canvasElement = ui.draggable.clone();
        $canvasElement.attr("id", "cloneElement-1000-delete");
      }
      $canvasElement.addClass("canvas-element");
      // $canvasElement.draggable({
      //   containment: "#dropbox",
      // });
      $canvas.append($canvasElement);
      $canvasElement.css({
        left: ui.position.left,
        top: ui.position.top,
        position: "absolute",
      });
      delete_slowly($canvasElement, $canvasElement.width());
      $canvasElement.hide("slow", function () {
        $canvasElement.remove();
      });
    }
    if (ui.draggable.attr("id") === merge_ids[0]) {
      ui.draggable.attr("id", delete_ids[0]);
      delete_slowly(ui.draggable, ui.draggable.width());
      ui.draggable.hide("slow", function () {
        ui.draggable.remove();
      });
      counterEiner--;
    } else if (ui.draggable.attr("id") === merge_ids[1]) {
      ui.draggable.attr("id", delete_ids[1]);
      delete_slowly(ui.draggable, ui.draggable.width());
      ui.draggable.hide("slow", function () {
        ui.draggable.remove();
      });
      counterZehner--;
      //console.log(counterZehner);
    } else if (ui.draggable.attr("id") === merge_ids[2]) {
      ui.draggable.attr("id", delete_ids[2]);
      delete_slowly(ui.draggable, ui.draggable.width());
      ui.draggable.hide("slow", function () {
        ui.draggable.remove();
      });
      counterHunderter--;
    } else if (ui.draggable.attr("id") === merge_ids[3]) {
      ui.draggable.attr("id", delete_ids[3]);
      delete_slowly(ui.draggable, ui.draggable.width());
      ui.draggable.hide("slow", function () {
        ui.draggable.remove();
      });
    }

    if (ui.draggable.attr("id") === down_ids[0]) {
      ui.draggable.attr("id", delete_ids[0]);
      delete_slowly(ui.draggable, ui.draggable.width());
      ui.draggable.hide("slow", function () {
        ui.draggable.remove();
      });
    } else if (ui.draggable.attr("id") === down_ids[1]) {
      ui.draggable.attr("id", delete_ids[1]);
      delete_slowly(ui.draggable, ui.draggable.width());
      ui.draggable.hide("slow", function () {
        ui.draggable.remove();
      });
    } else if (ui.draggable.attr("id") === down_ids[2]) {
      ui.draggable.attr("id", delete_ids[2]);
      delete_slowly(ui.draggable, ui.draggable.width());
      ui.draggable.hide("slow", function () {
        ui.draggable.remove();
      });
    } else if (ui.draggable.attr("id") === down_ids[3]) {
      ui.draggable.attr("id", delete_ids[3]);
      delete_slowly(ui.draggable, ui.draggable.width());
      ui.draggable.hide("slow", function () {
        ui.draggable.remove();
      });
    }
  },
});

// if there is "10" of the same elements in "merge" area , merge them into one higher element  e.g  ten  of  Box "1" --> one Box"10"
function merge(element, element_length, element_width, element_height) {
  var temp_x = 5;
  var temp_y = 5;
  if (element_length == 10) {
    element.each(function (index, el) {
      $(this).animate(
        {
          top: positionTop + temp_y,
          left: positionLeft + temp_x,
        },
        "slow"
      );
      temp_x += element_width;
      temp_y += element_height;
    });
  }
}
// create a clone element
// used to replace the merge elements , if there are 1o of the same kind change it to a higher element (only in merge area)
function createElement(elID) {
  // temp variables used to specify the place of the new created element in "merge area"
  var temp_x = 5;
  var temp_y = 5;
  var newElement = $(elID).clone();
  var $canvas = $("#dropbox-merge");
  newElement.addClass("hide");

  if (elID == "#imgZehner") {
    newElement.attr("id", "cloneElement-10-dropbox-merge");
  } else if (elID == "#imgHunderter") {
    newElement.attr("id", "cloneElement-100-dropbox-merge");
  } else if (elID == "#imgTausender") {
    newElement.attr("id", "cloneElement-1000-dropbox-merge");
  }
  newElement.draggable({
    containment: "#dropbox",
    stack: ".img1, .img2, .img3, .img4",
  });
  $canvas.append(newElement);
  newElement.css({
    left: $canvas.position().left + temp_x,
    top: $canvas.position().top + temp_y,
    position: "absolute",
  });
  newElement.removeClass("hide");
  newElement.addClass("unhide");
  newElement.addClass("canvas-element");
}

// start Button display the random number  between two values, which is set in URL
function start() {
  //get the min and max values set by user
  let min = minValue;
  let max = maxValue;
  let cmin = Math.ceil(min);
  let cmax = Math.floor(max);
  random = Math.floor(Math.random() * (cmax - cmin) + cmin);
  let randomnumberString = random.toString();

  // show the randomly generated number on header part
  firstLine.html(
    `<span class="headerText"> Stelle die Zahl <span style="color:yellowgreen" class="headerText">${random} </span> mit den Materialien dar! </span>`
  );
  $("#randomNumber").html("");
  secondLine.html("");

  // reset the values of all counters clear the field
  reset();
  start_counting_in_merge_area = false; // stop merge area counting
  //hide the merge area, show the merge area only if the users answer is correct but not optimal
  $(".dropBox-merge").css({
    "background-color": "#f0ede5",
  });
  $(".merge-img").css({
    visibility: "hidden",
  });
  // select the  images ( boxes representing the place Value) and make them draggable

  $("#imgEiner").draggable({
    helper: "clone",
    cursor: "move",
    scroll: false,
  });
  $("#imgZehner").draggable({
    helper: "clone",
    cursor: "move",
    scroll: false,
  });
  $("#imgHunderter").draggable({
    helper: "clone",
    cursor: "move",
    scroll: false,
  });
  $("#imgTausender").draggable({
    helper: "clone",
    cursor: "pointer",
    scroll: false,
  });

  // disable the start button once clicked and enable the other buttons
  $("#checkbtn").prop("disabled", false);
  $("#undobtn").prop("disabled", false);
  $("#valuebtn").prop("disabled", true);
  $(".header-mid").css({
    "background-image": "none",
  });
  $("#freez").remove();
}
// check button function for "Überprüfen"  on click, if the value of the boxes are same as the generated random number on header turn the start button for the next round
function check() {
  sortElements();
  let counter_1 = $("[id=cloneElement-1-down]").length;
  let counter_10 = $("[id=cloneElement-10-down]").length;
  let counter_100 = $("[id=cloneElement-100-down]").length;
  let counter_1000 = $("[id=cloneElement-1000-down]").length;
  let counter_1_merge = $("[id=cloneElement-1-dropbox-merge]").length;
  let counter_10_merge = $("[id=cloneElement-10-dropbox-merge]").length;
  let counter_100_merge = $("[id=cloneElement-100-dropbox-merge]").length;
  let counter_1000_merge = $("[id=cloneElement-1000-dropbox-merge]").length;

  let counter_1_total = counter_1 + counter_1_merge;
  let counter_10_total = counter_10 + counter_10_merge;
  let counter_100_total = counter_100 + counter_100_merge;
  let counter_1000_total = counter_1000 + counter_1000_merge;

  // check if the answer is optimal or not
  //(an Answer is optimal , when the user represent a number with the least possible objects  e.g  10 can be represent with 10 "einer" objects but optimaly user can take one single "Zehner" object to represent 10)
  let counter_array = [
    counter_1_total,
    counter_10_total,
    counter_100_total,
    counter_1000_total,
  ];
  let temp_random = random.toString();
  let optimal_result = true;
  let temp_random_lenght = temp_random.length;

  if (temp_random_lenght == 1) {
    if (temp_random.charAt(0) != counter_array[0]) {
      optimal_result = false;
    }
  }
  if (temp_random_lenght == 2) {
    if (temp_random.charAt(0) != counter_array[1]) {
      optimal_result = false;
    }
    if (temp_random.charAt(1) != counter_array[0]) {
      optimal_result = false;
    }
  }
  if (temp_random_lenght == 3) {
    if (temp_random.charAt(0) != counter_array[2]) {
      optimal_result = false;
    }
    if (temp_random.charAt(1) != counter_array[1]) {
      optimal_result = false;
    }
    if (temp_random.charAt(2) != counter_array[0]) {
      optimal_result = false;
    }
  }
  if (temp_random_lenght == 4) {
    if (temp_random.charAt(0) != counter_array[3]) {
      optimal_result = false;
    }
    if (temp_random.charAt(1) != counter_array[2]) {
      optimal_result = false;
    }
    if (temp_random.charAt(2) != counter_array[1]) {
      optimal_result = false;
    }
    if (temp_random.charAt(3) != counter_array[0]) {
      optimal_result = false;
    }
  }

  let result =
    counter_1_total +
    counter_10_total * 10 +
    counter_100_total * 100 +
    counter_1000_total * 1000;

  // if the answer is correct and optimal enable start button, disable other buttons, freez the screen, show winner gif
  if (random == result && optimal_result) {
    $("#checkbtn").prop("disabled", true);
    $("#undobtn").prop("disabled", true);
    $("#valuebtn").prop("disabled", false);
    $(".header-mid").css({
      "background-image": "url(./imgs/winner.gif)",
    });
    freez_screen();
    firstLine.html(
      `<span class="headerText"> Sehr gut! Du hast die richtige Zahl dargestellt.</span>`
    );
    random_number.html(`<span style="color:#73787d" class="headerText">Die Zahl <span style="color:yellowgreen" class="headerText"> ${random}</span> besteht aus <span style="color:yellowgreen" class="headerText"> ${counter_1000_total}</span> Tausender
    <span style="color:yellowgreen" class="headerText"> ${counter_100_total}</span> Hunderter
    <span style="color:yellowgreen" class="headerText">${counter_10_total}</span> Zehner
    <span style="color:yellowgreen" class="headerText">${counter_1_total}</span>Einer</span>`);
    secondLine.html(
      `<span class="headerText"> Klicke auf <span style="color:yellowgreen" class="headerText"> Start</span>, um eine neue Zahl zu bekommen.</span>`
    );
  } else if (random == result && !optimal_result) {
    //if the answer is correct but not optimal let the user know it. and ask to find the optimal answer.
    show_start_text = true;
    //show the merge area to user and start merge area counting
    start_counting_in_merge_area = true;
    $(".dropBox-merge").css({
      "background-color": "#eeeadd",
    });
    $(".merge-img").css({
      visibility: "visible",
    });
    firstLine.html(
      `<span class="headerText"> Du hast die richtige Zahl <span style="color:yellowgreen" class="headerText"> ${random}</span> dargestellt.</span>`
    );
    random_number.html(`<span style="color:#73787d" class="headerText">Dafür hast du <span style="color:yellowgreen" class="headerText">${counter_1000_total}</span> Tausender
    <span style="color:yellowgreen" class="headerText">${counter_100_total}</span> Hunderter
    <span style="color:yellowgreen" class="headerText">${counter_10_total}</span> Zehner 
    <span style="color:yellowgreen" class="headerText">${counter_1_total}</span> Einer verwendet.</span>`);
    secondLine.html(
      yellowgreen`<span class="headerText">Bündel und lege die Zahl <span style="color:yellowgreen" class="headerText"> ${random}</span>  mit weniger Teilen.</span>`
    );
  } else {
    // if the answer is not correct give the user a feedback and the user to try again
    show_start_text = true;
    firstLine.html(
      `<span class="headerText"> Du hast die Zahl <span style="color:yellowgreen" class="headerText"> ${result}</span> dargestellt.</span>`
    );
    random_number.html(`<span style="color:#73787d" class="headerText">Dafür hast du <span style="color:yellowgreen" class="headerText">${counter_1000_total}</span> Tausender
    <span style="color:yellowgreen" class="headerText">${counter_100_total}</span> Hunderter
    <span style="color:yellowgreen" class="headerText">${counter_10_total}</span> Zehner
    <span style="color:yellowgreen" class="headerText">${counter_1_total}</span> Einer verwendet.</span>`);
    secondLine.html(
      `<span class="headerText">Du solltest aber die Zahl <span style="color:yellowgreen" class="headerText"> ${random}</span> darstellen. Versuche es noch einmal.</span>`
    );
  }

  // only show the place values which is more than 0 (eg. if there is no "1000er" box avoid writing it on screen)
  counter_array.forEach((element, index) => {
    if (element === 0) {
      let temp = index + 1;
      $(`[id=span${temp}]`).hide();
    }
  });
}
// Reset buton "Alles löschen "
// reset values and remove elements
function reset() {
  $("[id=cloneElement-1-down]").remove();
  $("[id=cloneElement-10-down]").remove();
  $("[id=cloneElement-100-down]").remove();
  $("[id=cloneElement-1000-down]").remove();
  $("[id=cloneElement-1-dropbox-merge]").remove();
  $("[id=cloneElement-10-dropbox-merge]").remove();
  $("[id=cloneElement-100-dropbox-merge]").remove();
  $("[id=cloneElement-1000-dropbox-merge]").remove();
  counter = 0;
  counterEiner = 0;
  counterZehner = 0;
  counterHunderter = 0;
  counterTausender = 0;
}

//sort functions
// used for sorting elements
function sort_row(
  element,
  element_width,
  element_height,
  space_x,
  space_y,
  arr_length,
  gap_x,
  box_width,
  box_height,
  pos_left,
  pos_top
) {
  spaceX = space_x;
  var temp = (box_width / element_width) >> 0;
  element.each(function (index, el) {
    if (arr_length <= temp) {
      $(this).animate(
        {
          left: pos_left + spaceX,
          top: pos_top + box_height - space_y,
          position: "absolute",
        },
        "slow"
      );
      spaceX += element_width;
    } else if (arr_length > temp && arr_length < temp * 2) {
      $(this).animate(
        {
          left: pos_left + spaceX,
          top: pos_top + (box_height - space_y),
          position: "absolute",
        },
        "slow"
      );
      spaceX += element_width / gap_x;
    } else {
      $(this).animate(
        {
          left: pos_left + spaceX,
          top: pos_top + (box_height - space_y),
          position: "absolute",
        },
        "slow"
      );
      spaceX += 5;
    }
  });
}
// changes ID of the draggable element according to area. eg. if an element is in "merge area" change its id to "merge id"
function change_id(element, id_new) {
  element.each(function () {
    element.attr("id", id_new);
  });
}
//sorting logic
function sortElements() {
  // sorting happens inside "down area" so everytime we sort elements make sure all the elements have "down id"
  // this is useful for merging elements , we dont want to merge elements which are inside "down area"
  // after sorting elements , thoes elements which have still "merge id" needs to be change to "down id"
  var el1_merge = $("[id=cloneElement-1-dropbox-merge]");
  var el10_merge = $("[id=cloneElement-10-dropbox-merge]");
  var el100_merge = $("[id=cloneElement-100-dropbox-merge]");
  var el1000_merge = $("[id=cloneElement-1000-dropbox-merge]");
  counterEiner -= el1_merge.length;
  counterZehner -= el10_merge.length;
  counterHunderter -= el100_merge.length;
  counterTausender -= el1000_merge.length;
  change_id(el1_merge, down_ids[0]);
  change_id(el10_merge, down_ids[1]);
  change_id(el100_merge, down_ids[2]);
  change_id(el1000_merge, down_ids[3]);

  var el1 = $("[id=cloneElement-1-down],[id=cloneElement-1-dropbox-merge]");
  var el10 = $("[id=cloneElement-10-down],[id=cloneElement-10-dropbox-merge]");
  var el100 = $(
    "[id=cloneElement-100-down],[id=cloneElement-100-dropbox-merge]"
  );
  var el1000 = $(
    "[id=cloneElement-1000-down],[id=cloneElement-1000-dropbox-merge]"
  );

  var height1 = el1000_height;
  var height2 = el1000_height * 2;
  var height3 = height2 + el10_height + 3;
  var height4 = height3 + el1_height + 3;

  var spaceX = 5;
  var gapeX = 4;

  //  starting from bottom (row1) sort boxes
  // as long as it fits to one row at the bottom sort them beside each others.
  // when there are more boxes, which doesnt fit in a row, stack them on top of each other

  let el1000length = el1000.length;
  let el100length = el100.length;
  let el10length = el10.length;
  let el1length = el1.length;

  sort_row(
    el1000,
    el1000_width,
    el1000_height,
    spaceX,
    height1,
    el1000length,
    gapeX,
    dropBoxWidth,
    dropBoxHeight,
    positionLeft,
    positionTop
  );
  sort_row(
    el100,
    el100_width,
    el100_height,
    spaceX,
    height2,
    el100length,
    gapeX,
    dropBoxWidth,
    dropBoxHeight,
    positionLeft,
    positionTop
  );
  sort_row(
    el10,
    el10_width,
    el10_height,
    spaceX,
    height3,
    el10length,
    gapeX,
    dropBoxWidth,
    dropBoxHeight,
    positionLeft,
    positionTop
  );
  sort_row(
    el1,
    el1_width,
    el1_height,
    spaceX,
    height4,
    el1length,
    gapeX,
    dropBoxWidth,
    dropBoxHeight,
    positionLeft,
    positionTop
  );
}
// read the random generated Number
function read_text() {
  text =
    $("#first-line").text() +
    " " +
    $("#randomNumber").text() +
    " " +
    $("#second-line").text();
  // initialize web speech API
  const speaker = new SpeechSynthesisUtterance(text);
  speaker.lang = "de-DE";
  speechSynthesis.speak(speaker);
}

//used for delete area animation
//prevent outside the delete area animation
function delete_slowly(element, element_width) {
  element.animate(
    {
      top: positionTop + up_height / 4,
      left: positionLeft + dropBoxWidth - element_width,
    },
    "slowly"
  );
}

// reload the page
function refreshPage() {
  window.location.reload();
}
// used to freez the screen when the user finds the correct answer
function freez_screen() {
  let freez_filter = document.createElement("div");
  freez_filter.setAttribute("id", "freez");
  freez_filter.classList.add("freez");
  $(".main").append(freez_filter);
  $("#freez").css({
    left: $(".main").position().left,
    top: $(".main").position().top,
  });
}
