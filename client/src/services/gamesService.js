export function initList() {
    console.log("init OK")
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/games`, {
            method: 'get',
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then(response => response.json())
            .then(result => {
                resolve(result);
            }).catch(reject);
    });
}