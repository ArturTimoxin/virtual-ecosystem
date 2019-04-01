The project is the construction of a virtual ecosystem,
a small world inhabited by creatures that move and fight for survival.
The world will be a two-dimensional grid, where each entity occupies one cell.
On each turn, creatures will be able to perform some action.

Symbols:

"#" - wall, does not move, acts as an obstacle

" "(space) - empty space to become

"o" - herbivorous creature, can walk in any direction, eat grass, multiply

"\*" grass - serves as food for herbivores, can multiply

@ - predatory creature, eat herbivores does not eat grass, can multiply.

With a given delay, the move is performed, every living creature moves in a random direction, eating its food, if it is in sight. The field of view of any entity is 1 cell around the creature.
Each entity has a supply of energy that is replenished with food. The amount of energy of the creature that eats is replenished by the amount of energy of the creature that it eats, and the amount of energy of the second being becomes 0, i.e. the creature is dying.
Each turn, the amount of energy of the creature that made the step decreases by 1. If the amount of energy is 0, the creature dies. If the amount of energy reaches a given value, then a creature of the same type appears in a random neighboring cell, and the energy of the “parent” is divided into 2 and the “daughter” creature receives this half of the energy from the parent.

![img1](https://i.ibb.co/QQ64170/Screenshot-179.png)

![img2](https://i.ibb.co/CQVvdq1/Screenshot-181.png)
