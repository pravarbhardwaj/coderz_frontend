import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";
import "blockly/javascript";

export default function ScratchIDE() {
  const blocklyDiv = useRef(null);
  const toolbox = useRef(null);

  useEffect(() => {
    if (blocklyDiv.current && toolbox.current) {
      Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current,
        trashcan: true,
      });
    }
  }, []);

  const generateCode = () => {
    const code = Blockly.JavaScript.workspaceToCode(
      Blockly.getMainWorkspace()
    );
    console.log(code);
    alert(code);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        {/* Blockly Editor Area */}
        <div
          ref={blocklyDiv}
          style={{ height: "600px", width: "70%", border: "1px solid #ccc" }}
        />

        {/* Toolbox (Scratch-like Blocks) */}
        <xml
          xmlns="https://developers.google.com/blockly/xml"
          style={{ display: "none" }}
          ref={toolbox}
        >
          <category name="Logic" colour="#5C81A6">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
          </category>
          <category name="Loops" colour="#5CA65C">
            <block type="controls_repeat_ext"></block>
          </category>
          <category name="Math" colour="#5C68A6">
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
          </category>
          <category name="Text" colour="#5CA68D">
            <block type="text"></block>
            <block type="text_print"></block>
          </category>
        </xml>
      </div>

      <button
        onClick={generateCode}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Generate Code
      </button>
    </div>
  );
}
