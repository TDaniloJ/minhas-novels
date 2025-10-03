import { useState } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, 
  AlignRight, List, ListOrdered 
} from 'lucide-react';

const NovelEditor = ({ value, onChange }) => {
  const [selection, setSelection] = useState(null);

  const applyFormat = (format) => {
    document.execCommand(format, false, null);
  };

  const applyAlign = (align) => {
    document.execCommand('justify' + align, false, null);
  };

  const handleInput = (e) => {
    onChange(e.target.innerHTML);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => applyFormat('bold')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Negrito"
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('italic')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Itálico"
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('underline')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Sublinhado"
        >
          <Underline className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => applyAlign('Left')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Alinhar à esquerda"
        >
          <AlignLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => applyAlign('Center')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Centralizar"
        >
          <AlignCenter className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => applyAlign('Right')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Alinhar à direita"
        >
          <AlignRight className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => applyFormat('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Lista"
        >
          <List className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Lista numerada"
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <select
          onChange={(e) => document.execCommand('fontSize', false, e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
          defaultValue="3"
        >
          <option value="1">Muito Pequeno</option>
          <option value="2">Pequeno</option>
          <option value="3">Normal</option>
          <option value="4">Grande</option>
          <option value="5">Muito Grande</option>
        </select>
      </div>

      {/* Editor Area */}
      <div
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 focus:outline-none prose max-w-none"
        style={{
          lineHeight: '1.8',
          fontSize: '16px',
        }}
      />
    </div>
  );
};

export default NovelEditor;