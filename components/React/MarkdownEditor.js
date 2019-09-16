import React, { Component } from 'react';
import marked from 'marked';
import styled from 'styled-components';

marked.setOptions({
    breaks: true,
});

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => {
    return `<a target="_blank" href="${href}">${text}</a>`;
};


const placeholder = `# Code editor running ACE

## Output parsed by marked.js

### Feel free to try yourself.

Code parsing:
\`<div></div>\`

Multi-line code parsing:
\`\`\`

// This function is useless

function fooBar(foo, bar) {
  return foo + bar;
}

\`\`\`



Text formatting works too:

**bold**

_italic_

**_bold and italic_**

~~crossed out~~


Links:

[ACE](https://ace.c9.io/)

[Marked.js](https://github.com/markedjs/marked)


> Block
> Quotes

Tables:

  Header     |  Header       |  Header
------------ | ------------- | -------------
Things don't | need to line  | up.
but | it does look | neater

- Bulleted lists.
  - Indented
     - Several
        - Levels


1. Or numbered lists
1. You can just repeat
1. one number, dashes or asterisks
- It will still
* count properly

Embedded images:
![React Logo w/ Text](https://goo.gl/Umyytc)
`;


const StyledInterface = styled.div`
  display: flex;
  flex-direction: column;
  width:  100vw;
  height: 100vh;

  background: #131313;

  //grid-gap: 0 3px;
  //grid-template-columns: 1fr 1fr;
  //grid-template-rows: min-content 1fr;
  //grid-template-area: 'controls' 'panels';
  //grid-template-rows: ${props => props.view ? 'min-content 1fr 1fr' : 'min-content'};
  //grid-template-areas: ${props => props.view ? '"controls controls" "editor editor" "output output"' : '"controls controls" "editor output"'};
`;


const StyledEditor = styled.div`
  //grid-area: editor;
  height: 100%;
`;


const StyledOutput = styled.div`
  //grid-area: output;
  overflow: auto;

  background: white;
  margin: 20px;

  img {
    max-width: 50px;
  }
`;


const StyledControls = styled.div`
  grid-area: controls;
  display: flex;
  flex-flow: row-reverse;

  height: 40px;
  background: #131313;
`;


const StyledSelect = styled.select`
  text-transform: capitalize;
  option[selected] {
    font-weight: bold;
  }

  &:focus{
    outline: none;
  }
`;


const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;

  font-size: 20px;
  text-align: center;
  background: #131313;
  color: white;
  border: none;

  &:focus {
    outline: none;
  }
`;


/**
 *
 *  Main Component handling state between editor and
 *  preview.
 */
export default class Interface extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: 'monokai',
            content: placeholder
        };

        this.updateState = this.updateState.bind(this);
    }

    updateState(newState) {
        this.setState(newState);
    }

    render() {
        return (
            <StyledInterface>
                <Controls theme={this.state.theme} updateState={this.updateState}/>
                <Panels view={this.state.view}>
                    <Panel title='Editor'>
                        <Editor updateState={this.updateState} theme={this.state.theme}/>
                    </Panel>
                    <Panel title='Preview'>
                        <Output content={this.state.content}/>
                    </Panel>
                </Panels>
            </StyledInterface>
        );
    }
}

const Output = (props) => {
    return (
        <StyledOutput dangerouslySetInnerHTML={{ __html: marked(props.content, { renderer: renderer }) }}/>
    )
};

class Controls extends Component {
    constructor(props) {
        super(props);

        this.themes = ['ambiance', 'chaos', 'chrome', 'clouds', 'clouds_midnight', 'cobalt', 'crimson_editor', 'dawn', 'dracula', 'dreamweaver', 'eclipse', 'github', 'gob', 'gruvbox', 'idle_fingers', 'iplastic', 'katzenmilch', 'kr_theme', 'kuroir', 'merbivore', 'merbivore_soft', 'mono_industrial', 'monokai', 'pastel_on_dark', 'solarized_dark', 'solarized_light', 'sqlserver', 'terminal', 'textmate', 'tomorrow', 'tomorrow_night', 'tomorrow_night_blue', 'tomorrow_night_bright', 'tomorrow_night_eighties', 'twilight', 'vibrant_ink', 'xcode'];
        this.view = false;

        this.toggleView = this.toggleView.bind(this);
    }

    toggleView() {
        console.log('test', this.view)
        this.view = !this.view;
        this.props.updateState({ view: this.view })
    }

    render() {
        return (
            <StyledControls>
                <StyledButton onClick={this.toggleView}><i class="fas fa-columns"
                                                           style={this.view ? { transform: 'rotate(-90deg)' } : {}}></i>
                </StyledButton>
                <StyledSelect onChange={(ev) => this.props.updateState({ theme: ev.target.value })}>
                    {this.themes.map(x => {
                        return (
                            <option selected={this.props.theme === x ? 'selected' : ''}
                                    value={x}>{x.replace(/_/g, ' ')}
                            </option>
                        )
                    })
                    }
                </StyledSelect>
            </StyledControls>
        )
    }
}

const Panels = (props) => {
    return (
        <StyledPanels view={props.view}>
            {props.children}
        </StyledPanels>
    )
};

const StyledPanels = styled.div`
  display: flex;
  flex-direction: ${props => props.view ? 'column' : 'row'}
  background: white;
  width: 100%;
  height: 100%;
`;


const Panel = (props) => {
    return (
        <StyledPanel>
            {props.title && <StyledTitle>{props.title}</StyledTitle>}
            {props.children}
        </StyledPanel>
    )
};

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  width: 100%;
  background: lightgrey;
  border: 1px solid black;
`;

class Editor extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.editor = ace.edit(this.editorRef);
        this.editor.setTheme('ace/theme/' + this.props.theme);
        this.editor.session.setMode('ace/mode/' + this.props.language);
        this.editor.session.on('change', () => this.props.updateState({ content: this.editor.getValue() }));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.theme !== this.props.theme) {
            this.editor.setTheme('ace/theme/' + this.props.theme);
        }
    }

    render() {
        return (
            <StyledEditor innerRef={x => {
                this.editorRef = x
            }}>
                {placeholder}
            </StyledEditor>
        )
    }
}

Editor.defaultProps = {
    language: 'markdown',
    theme: 'monokai'
};
