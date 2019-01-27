const MODULE_KEY = "user:assets";

const initialState = () => {
  return {
    user: {
      assets: {
        current: false,
        data: []
      }
    }
  };
};

const observers = {
  [MODULE_KEY]: ({ select, commit, db, changesReduce }, uid) => {
    if (!uid) return;
    return db
      .collection("assets")
      .where("owner", "==", uid)
      .onSnapshot(snapshot => {
        const prev = select(MODULE_KEY);
        const assets = changesReduce(prev, snapshot.docChanges());
        commit(`${MODULE_KEY}:set`, assets);
      });
  }
};

const actions = {
  [`${MODULE_KEY}:add`]: ({ db }, item) => {
    const ref = db.collection(`assets`);
    ref.add(item);
  },
  [`${MODULE_KEY}:clear`]: async ({ db, select }, item) => {
    const assets = select(MODULE_KEY);
    const targets = [...assets];
    const ref = db.collection(`assets`);
    // todo: check owner
    while (targets.length > 0) {
      const t = targets.splice(-500);
      const batch = db.batch();
      t.forEach(({ id }) => {
        batch.delete(ref.doc(id));
      });
      await batch.commit();
    }
  },
  [`${MODULE_KEY}:set`]: ({ db }, id, item) => {
    if (!id) return;
    const ref = db.collection(`assets`).doc(id);
    ref.set(item, { merge: true });
  },
  [`${MODULE_KEY}:items:delete`]: ({ db, select }, id, key) => {
    if (!id) return;
    const current = select(`${MODULE_KEY}:find`, id);
    if (current) {
      delete current.items[key];
      const ref = db.collection(`assets`).doc(id);
      ref.set(current);
    }
  }
};

const mutations = {
  [`${MODULE_KEY}:set`]: (state, data) => {
    state.user.assets.data = data;
  }
};

const getters = {
  [MODULE_KEY]: state => {
    return state.user.assets.data;
  },
  [`${MODULE_KEY}:find`]: (state, id) => {
    return state.user.assets.data.find(asset => asset.id === id);
  }
};

export default {
  initialState,
  observers,
  actions,
  mutations,
  getters
};
