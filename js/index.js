// DOM elements
const elements = {
    pageTitle: document.title,
    header: document.getElementById('header'),
    payloads: document.getElementById('availablePayloads'),
    payloadsGrid: document.getElementById('payloadGrid'),
    GoldHEN: document.getElementById('GoldHEN'),
    VTXHEN: document.getElementById('VTXHEN'),
    exploitStatus: document.getElementById('exploitStatus'),
    statusMessage: document.getElementById('statusMessage'),
    exploitRunBTN: document.getElementById('exploitRun'),
};

const messages = {
    payloadSelected: 'Payload is ready',
    payloadNotSelected: 'No payload selected.',
    payloadsLoaded: 'Payloads loaded.',
    payloadsEmpty: 'No payloads available.',
    payloadsUnavailable: 'No payloads available.',
}

function payloadSelection(cardId){
    // Deselect all cards first
    document.querySelectorAll('.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select the clicked card
    let card = document.getElementById(cardId);
    if (!card) return;
    card.classList.add('selected');
    localStorage.setItem('selectedPayload', cardId);
    updateStatus(cardId);
}

function updateStatus(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    elements.statusMessage.textContent = messages.payloadSelected;
    elements.statusMessage.classList.add('status-success');
    elements.exploitRunBTN.classList.remove('disabled:opacity-50');
}

// on website load
window.addEventListener('load', () => {
    const selectedPayloadId = localStorage.getItem('selectedPayload');
    if (selectedPayloadId) {
        payloadSelection(selectedPayloadId);

    }
});
// Find id of element inside a container
function GetElementInsideContainer(containerID, childID) {
    var elm = document.getElementById(childID);
    var parent = elm ? elm.parentNode : {};
    return (parent.id && parent.id === containerID) ? elm : {};
}