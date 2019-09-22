export default class Hlor {

    getAuth() {
        const formData = new FormData();
        formData.append('username', '');
        formData.append('key', '');
        formData.append('unit', '');
        formData.append('version', '');

        fetch('https://hlor.io/userpost/', {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response);
        })
    }

    getPool() {

    }

    getCoin() {
        const formData = new FormData();
        formData.append('pool', '');

        fetch('https://hlor.io/get_coin/', {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response);
        });
    }

    sendToHlorIO() {
        const formData = new FormData();
        formData.append('user', '');
        formData.append('key', '');
        formData.append('wname', '');
        formData.append('coin', '');
        formData.append('hash', '');

        fetch('https://hlor.io/hlorpost/', {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response);
        });
    }
}
