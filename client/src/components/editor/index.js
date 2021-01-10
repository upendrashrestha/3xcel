import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Editr = (props) => {
    return (
        <CKEditor
        editor={ ClassicEditor }
        placeholeder="Write something!"
        data={props.value}
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            const target = {name:props.name, value:data};
            event.target =target;
            props.onChange(event);
        } }
    />
    );
};

export default Editr;
