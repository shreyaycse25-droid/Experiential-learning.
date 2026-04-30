let draggedItemId = "";

let droppedChemicals = [];


document.querySelectorAll("li").forEach(item => {
    item.addEventListener("dragstart", function(e) {
        draggedItemId = this.id;
        e.dataTransfer.setData("text", this.id);
    });
});

const equipmentZone = document.getElementById("equipment-drop-zone");
const chemicalZone = document.getElementById("chemical-drop-zone");
const reactionArea = document.getElementById("reaction-area");

[equipmentZone, chemicalZone, reactionArea].forEach(zone => {
    zone.addEventListener("dragover", function(e) {
        e.preventDefault();     });

    zone.addEventListener("drop", function(e) {
        e.preventDefault();

        const id = e.dataTransfer.getData("text");
        const original = document.getElementById(id);

        if (!original) return;

                const clone = original.cloneNode(true);
        clone.setAttribute("draggable", "true");

                clone.addEventListener("dragstart", function(e) {
            e.dataTransfer.setData("text", this.id);
        });

        this.appendChild(clone);

        
        if (this.id === "reaction-area") {
            droppedChemicals.push(id);

            if (droppedChemicals.length === 2) {
                checkReaction();
            }
        }
    });
});

const reactions = {
    "hcl+naoh": "HCl + NaOH → NaCl + H₂O (Neutralization)",
    "naoh+hcl": "HCl + NaOH → NaCl + H₂O (Neutralization)",

    "agno3+nacl": "AgNO₃ + NaCl → AgCl↓ + NaNO₃ (White precipitate)",
    "nacl+agno3": "AgNO₃ + NaCl → AgCl↓ + NaNO₃ (White precipitate)",

    "cuso4+naoh": "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄ (Blue precipitate)",
    "naoh+cuso4": "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄ (Blue precipitate)",

    "hcl+koh": "HCl + KOH → KCl + H₂O (Neutralization)",
    "koh+hcl": "HCl + KOH → KCl + H₂O (Neutralization)"
};

function checkReaction() {
    const combo = droppedChemicals.join("+");
    let result = reactions[combo];

    if (result) {
        reactionArea.innerHTML += `<p style="color:green;"><b>${result}</b></p>`;
    } else {
        reactionArea.innerHTML += `<p style="color:red;"><b>No Reaction ❌</b></p>`;
    }
    droppedChemicals = [];
}
