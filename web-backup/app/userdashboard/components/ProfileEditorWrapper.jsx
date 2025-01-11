import dynamic from 'next/dynamic';

// Dynamically import JoditEditor with SSR disabled
const Avatar= dynamic(() => import('react-avatar-edit'), {
    ssr: false
});

const ProfileEditorWrapper = (props) => {
    return (
        <div>
            <Avatar {...props} />
        </div>
    );
};

export default ProfileEditorWrapper;