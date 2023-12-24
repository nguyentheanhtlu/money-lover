import AvatarEdit from 'react-avatar-edit'

function MyAvatarEdit(props) {

    const handleCrop = (view) => {
        props.onCrop(view)
    }

    const handleCLose = () => {
        props.onClose()
    }

    return <AvatarEdit width={400} height={300} onClose={handleCLose} onCrop={handleCrop} />
}

export default MyAvatarEdit