
type ModalProps = {
    isOpen: boolean;
    isFooter?: boolean;
    title?: React.ReactNode;
    width?: number | string;
    onToggle?: Function;
    onSubmit?: Function;
    children?: React.ReactNode;
    submitText?: string;
    disabled?: boolean
};
const Modal = ({
    isOpen = false,
    isFooter = true,
    title = "Modal 1",
    width = 500,
    onToggle = () => { },
    onSubmit = () => { },
    children = <div></div>,
    submitText = "Okay",
    disabled = false
}: ModalProps) => {


    return (

        <div className={`modal fade ${isOpen ? "show" : "hide"} `}>
            <div className="modal-dialog " style={{ minWidth: width }}  >
                <div className="modal-content"   >
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <i className="fa fa-close cursor" onClick={() => onToggle()} />
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    {
                        isFooter && (
                            <div className="modal-footer">
                                <button disabled={disabled} type="button" onClick={() => onSubmit()} className="btn btn-primary">{submitText}</button>
                                <button type="button" onClick={() => onToggle()} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;
