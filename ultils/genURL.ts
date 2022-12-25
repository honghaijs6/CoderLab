import { IUserInfo } from 'interfaces/IUserInfo';

const genURL = (userInfo: any, strPlugin = 'note'): string | undefined => {
    if (!userInfo) return;
    return String(userInfo?.email).split('@')[0].replace(/\./g, '') + '/' + strPlugin;
};

export default genURL;
