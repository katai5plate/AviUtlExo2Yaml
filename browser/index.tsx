import { h, app, ActionsType } from 'hyperapp';

import { decode, encode } from '../src/converter';

interface State {
  exoText: string;
  yamlText: string;
}
const state: State = {
  exoText: '',
  yamlText: ''
};
interface Actions {
  decode(exo: string): State;
  encode(yaml: string): State;
}
const actions: ActionsType<State, Actions> = {
  decode: exo => () => ({
    exoText: exo,
    yamlText: decode(exo, false)
  }),
  encode: yaml => () => ({
    exoText: encode(yaml, false),
    yamlText: yaml
  })
};
const view = (state: State, actions: Actions) => {
  console.log({ state });
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>exo</h2>
          <textarea
            id="exo"
            value={state.exoText}
            onkeyup={(e: any) => {
              actions.decode(e.target.value);
            }}
            rows="20"
            class="form-control"
            wrap="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </div>
        <div class="col-md-6">
          <h2>yaml</h2>
          <textarea
            id="yaml"
            value={state.yamlText}
            onkeyup={(e: any) => {
              actions.encode(e.target.value);
            }}
            rows="20"
            class="form-control"
            wrap="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </div>
      </div>
    </div>
  );
};
app(state, actions, view, document.body);

// import { decode, encode } from "../src/converter";
// const exo = document.getElementById("exo")
// const yaml = document.getElementById("yaml")
// exo && exo.addEventListener("keyup", (e: Event) => {
//   e.target.value
// })
