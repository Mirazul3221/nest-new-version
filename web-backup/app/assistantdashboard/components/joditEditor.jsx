import dynamic from 'next/dynamic';

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false
});

const JoditEditorWrapper = (props) => {
    return (
        <div>
            <JoditEditor {...props} />
        </div>
    );
};

export default JoditEditorWrapper;
