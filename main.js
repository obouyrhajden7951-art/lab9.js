// Partie 1 — Arrays

// 1.1 Création et accès
const fruits = ["pomme", "banane", "poire"];
console.log("Premier fruit:", fruits[0]);
console.log("Dernier fruit:", fruits[fruits.length - 1]);
fruits[1] = "kiwi";
console.log("Longueur fruits:", fruits.length);

// 1.2 Ajout, retrait, découpe
fruits.push("mangue");
const last = fruits.pop();
fruits.unshift("fraise");
const first = fruits.shift();
const quelquesFruits = fruits.slice(0, 2);
fruits.splice(1, 1, "abricot");
console.log({ last, first, fruits, quelquesFruits });

// 1.3 Itérations
for (let i = 0; i < fruits.length; i++) {
  console.log(`Fruit: ${fruits[i]}`);
}
for (const fruit of fruits) {
  console.log(`Fruit: ${fruit}`);
}
fruits.forEach(fruit => console.log(`Fruit: ${fruit}`));

// 1.4 Transformations
const notes = [12, 8, 17, 5, 14, 19, 10];
const bonifiees = notes.map(n => Math.min(n + 1, 20));
const admissibles = notes.filter(n => n >= 10);
const moyenne = notes.reduce((a, n) => a + n, 0) / notes.length;
const premiereFaible = notes.find(n => n < 10);
const aMentionTB = notes.some(n => n >= 18);
const toutesAdmissibles = notes.every(n => n >= 10);
console.log({ bonifiees, admissibles, moyenne, premiereFaible, aMentionTB, toutesAdmissibles });

// 1.5 Tri
const asc = [...notes].sort((a, b) => a - b);
const desc = [...notes].sort((a, b) => b - a);
console.log({ asc, desc });

// Partie 2 — Objects
const etudiant = {
  prenom: "Lina",
  nom: "Durand",
  age: 21,
  notes: [14, 16, 12],
  moyenne() { return this.notes.reduce((a, n) => a + n, 0) / this.notes.length; }
};
console.log(etudiant.prenom, etudiant["nom"], etudiant.moyenne());

// 2.2 Mise à jour
etudiant.age = 22;
etudiant.filiere = "Informatique";
delete etudiant.filiere;
console.log(Object.keys(etudiant));

// 2.3 Destructuration
const { prenom, nom, ville = "(inconnue)" } = etudiant;
console.log(`${prenom} ${nom} — ${ville}`);

// 2.4 Spread & Rest
const base = { a: 1, b: 2 };
const extension = { b: 3, c: 4 };
const fusion = { ...base, ...extension };
function pickAB({ a, b, ...reste }) { return { a, b, reste }; }
console.log(fusion, pickAB({ a: 1, b: 2, c: 3, d: 4 }));

// 2.5 Méthodes utiles
const o = { x: 10, y: 20 };
console.log(Object.keys(o), Object.values(o), Object.entries(o));
const cop = Object.assign({}, o, { y: 30 });
console.log(cop, o.hasOwnProperty("x"));

// Partie 3 — Tableaux d’objets
const livres = [
  { id: 1, titre: "Clean Code", auteur: "Robert C. Martin", annee: 2008, stock: 3, prix: 35.5 },
  { id: 2, titre: "You Don’t Know JS", auteur: "Kyle Simpson", annee: 2015, stock: 0, prix: 28.0 },
  { id: 3, titre: "Eloquent JavaScript", auteur: "Marijn Haverbeke", annee: 2018, stock: 5, prix: 32.9 },
  { id: 4, titre: "JavaScript: The Good Parts", auteur: "Douglas Crockford", annee: 2008, stock: 2, prix: 22.0 }
];

// 3.1 Transformations
const titres = livres.map(l => l.titre);
const enStock = livres.filter(l => l.stock > 0);
const valeurStock = livres.reduce((acc, l) => acc + l.prix * l.stock, 0);
const plusAncien = livres.reduce((min, l) => (l.annee < min.annee ? l : min));
const plusRecent = livres.reduce((max, l) => (l.annee > max.annee ? l : max));
console.log({ titres, enStock, valeurStock, plusAncien, plusRecent });

// 3.2 Recherche et mise à jour immuable
const livre3 = livres.find(l => l.id === 3);
const livresMaj = livres.map(l => (l.id === 2 ? { ...l, stock: l.stock + 1 } : l));
console.log(livre3, livresMaj);

// 3.3 Regroupement par année
const parAnnee = livres.reduce((acc, l) => { (acc[l.annee] ||= []).push(l); return acc; }, {});
console.log(parAnnee);

// Partie 4 — Mini-projet CRUD
function lister(ls) { return [...ls].sort((a, b) => a.titre.localeCompare(b.titre)); }
function genererId(ls) { return ls.length ? Math.max(...ls.map(l => l.id ?? 0)) + 1 : 1; }
function ajouter(ls, livre) { const id = livre.id ?? genererId(ls); return [...ls, { ...livre, id }]; }
function maj(ls, id, patch) { return ls.map(l => (l.id === id ? { ...l, ...patch } : l)); }
function supprimer(ls, id) { return ls.filter(l => l.id !== id); }
function rechercher(ls, q) { const s = q.trim().toLowerCase(); if (!s) return []; return ls.filter(l => l.titre.toLowerCase().includes(s) || l.auteur.toLowerCase().includes(s)); }

// Démonstration CRUD
let etat = [...livres];
etat = ajouter(etat, { titre: "Refactoring", auteur: "Martin Fowler", annee: 1999, stock: 4, prix: 40 });
etat = maj(etat, 2, { stock: 3 });
etat = supprimer(etat, 4);
console.log("Liste triée:", lister(etat));
console.log("Recherche 'martin':", rechercher(etat, "martin"));