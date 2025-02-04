# Explaining Left, Right, and Depth

This structure is inspired by awesome_nested_set: <https://github.com/collectiveidea/awesome_nested_set>

Think of a tree like **a big family**. Each taxon (category) is like a person in a family, and they can have children.

We use **three numbers** to describe where a taxon belongs in the tree:

1. **Left** (📍) – Where the category starts.
2. **Right** (🏁) – Where the category ends.
3. **Depth** (📏) – How deep it is in the tree (like how many generations down it is).

Now, let’s see how we **calculate** these numbers.

---

## How `setTreeAttributes()` Works

### 📌 **Step 1: If the taxon is a root (has no parent)**

- We find the biggest **right** number in the whole tree.
- If there are no other categories, we start at **1**.
- The new taxon gets:
  - `left = maxRight + 1`
  - `right = maxRight + 2`
  - `depth = 0` (it's at the top!)

**Example:**

```plaintext
Root Taxon (📂)
L: 1  R: 2  Depth: 0
```

---

### 📌 **Step 2: If the taxon has a parent**

- We find the parent.
- We push everything **to the right** by **2** places.
- The new taxon is **inside** the parent:
  - `left = parent.right`
  - `right = parent.right + 1`
  - `depth = parent.depth + 1`

**Example:**

```plaintext
Root Taxon (📂)
L: 1  R: 4  Depth: 0
   ├── Child Taxon (📄)
       L: 2  R: 3  Depth: 1
```

- The parent **expands** (`right = 4` instead of `2`).
- The child fits inside it.

---

## 🛠 **Example**

Your test checks:

```ts
it("should set left, right, and depth for a child taxon", async () => {
  await Taxon.destroy({ where: {} });

  const taxonomy = await taxonomyFactory.create({}, Taxonomy);
  const rootTaxon = await Taxon.create({ name: "Root", taxonomyId: taxonomy.id });

  const rootLeft = rootTaxon.left;
  const rootRight = rootTaxon.right

  // console.log("rootTaxon", `left: ${rootTaxon.left}, right: ${rootTaxon.right}, depth: ${rootTaxon.depth}`);
  const childTaxon = Taxon.build({ name: "Child", taxonomyId: taxonomy.id, parentId: rootTaxon.id });

  await childTaxon.save();
  // console.log("childTaxon", `left: ${childTaxon.left}, right: ${childTaxon.right}, depth: ${childTaxon.depth}`);

  await rootTaxon.reload();
  // console.log("rootTaxon", `left: ${rootTaxon.left}, right: ${rootTaxon.right}, depth: ${rootTaxon.depth}`);

  expect(childTaxon.left).toEqual(rootRight);
  expect(childTaxon.right).toEqual(rootRight + 1);
  expect(rootTaxon.left).toEqual(rootLeft);
  expect(rootTaxon.right).toEqual(rootRight + 2);
});

```
