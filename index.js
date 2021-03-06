var billInput = document.querySelector(".bill");
var cashInput = document.querySelector(".cash");
var checkBtn = document.querySelector("#check-btn");
var nextBtn = document.querySelector("#next-btn");
var resetBtn = document.querySelector("#reset-btn");
var messageText = document.querySelector(".message")
var notes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];

billInput.oninput = (event) => {
    if (event.target.validity.valid) {
        event.target.previousValidInput = event.target.value;
        ((billInput.value!="") ? nextBtn.removeAttribute("disabled"):nextBtn.setAttribute("disabled", ""));

        if ((cashInput.value) != "" & (event.target.value != "")) {
            checkBtn.removeAttribute("disabled");
        } else { checkBtn.setAttribute("disabled", ""); }
        messageText.style.display = "none";

    } else {
        event.target.value = event.target.previousValidInput;
        // nextBtn.setAttribute("disabled", "");
        // checkBtn.setAttribute("disabled", "");

    }

}

cashInput.oninput = (event) => {
    if (event.target.validity.valid) {
        event.target.previousValidInput = event.target.value;
        if ((billInput.value != "") & (event.target.value != "")) {
            checkBtn.removeAttribute("disabled");
        } else { checkBtn.setAttribute("disabled", ""); }
        messageText.style.display = "none";

    } else {
        event.target.value = event.target.previousValidInput;
        // checkBtn.setAttribute("disabled", "");
    }

}

function showCashInput() {

    messageText.style.display = "none";
    nextBtn.style.display = "none";
    document.querySelectorAll(".after-bill").forEach((element) => element.style.display = "block");
    cashInput.focus();

}

function amountValid(bill, cash) {
    return (cash > bill);
}

function calculateNotes(change) {
    var requiredNotes = []
    var remainingChange = change
    notes.map((note) => {
        requiredNotes.push(Math.floor(remainingChange / note));
        remainingChange = remainingChange % note;
    })
    return requiredNotes;
}

function showTable(notesToDisplay) {
    document.querySelector("table").style.display = "inline-table";

    document.querySelectorAll(".notes").forEach((element, index) => {
        (notesToDisplay[index] != 0 ? element.innerText = notesToDisplay[index]:NaN )
        // element.innerText = notesToDisplay[index];
    })
}

function clickHandler() {
    billAmount = parseInt(billInput.value);
    cashAmount = parseInt(cashInput.value);
    if (amountValid(billAmount, cashAmount)) {
        messageText.style.display = "block";
        // messageText.innerText = "Return Change";
        cashInput.setAttribute("disabled", "");
        billInput.setAttribute("disabled", "");
        checkBtn.style.display = "none";
        var changeAmount = cashAmount - billAmount
        messageText.innerText = `Return Change = ${changeAmount}`;
        var requiredNotes = calculateNotes(changeAmount);
        showTable(requiredNotes)
        resetBtn.style.display = "block"
    } else if (billAmount === cashAmount) {
        messageText.style.display = "block";
        messageText.innerText = "The cash given is equal to the bill amount, No change required"
    } else {
        messageText.style.display = "block";
        messageText.innerText = "The cash given is less than the Bill amount, Enter the Correct Amount Again"
    }

}

function resetRegister() {
    nextBtn.setAttribute("disabled", "");
    checkBtn.setAttribute("disabled", "");
    billInput.value = "";
    cashInput.value = "";
    billInput.previousValidInput = "";
    cashInput.previousValidInput = "";
    billInput.removeAttribute("disabled");
    cashInput.removeAttribute("disabled");
    nextBtn.style.display = "block";
    checkBtn.style.display = "none";
    resetBtn.style.display = "none";
    messageText.style.display = "none"
    document.querySelector("table").style.display = "none"
    document.querySelectorAll(".notes").forEach((note)=>note.innerText="");
    document.querySelectorAll(".after-bill").forEach((element) => element.style.display = "none");
    billInput.focus();

}


billInput.focus();
nextBtn.addEventListener("click", showCashInput);
checkBtn.addEventListener("click", clickHandler);
resetBtn.addEventListener("click", resetRegister);