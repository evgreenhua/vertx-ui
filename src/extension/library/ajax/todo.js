import Ux from 'ux';

export default {
    todo: (params = {}, confirmed = true) => {
        const request = {key: params.key};
        if (confirmed) {
            return Ux.ajaxPut('/api/todo/confirm/:key', request);
        } else {
            return Ux.ajaxPut('/api/todo/reject/:key', request);
        }
    }
}