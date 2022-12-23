import validateEmail from 'ultils/validateEmail';
import { toast } from 'react-toastify';

export interface IinviteInfo {
    SenderName: string;
    Email: string;
    ToName: string;
    LinkInvite: string;
}
const doInvite = (postData: IinviteInfo) => {
    return new Promise(resolve => {
        if (!validateEmail(postData?.Email)) resolve({ status: 'error', message: 'invalid email' });

        fetch('/api/sendmail', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then(resData => {

            toast("Invite has been sent, let wait your friend come")
            resolve({
                status: 'success',
                message: resData,
            });
        });
    });
};

export default doInvite;
