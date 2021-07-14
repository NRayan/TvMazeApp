export default class TvMazeService {

    static GetAll() {
        return new Promise((resolve, reject) => {

            fetch('https://api.tvmaze.com/schedule/full', {
                method: 'GET',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            })
                .then((response) =>
                    response.json())
                .then((json) => {
                    resolve(json.map(item => item._embedded.show));
                }).catch((error) => {
                    reject(error);
                });
        })
    }

    static SearchItems(text) {
        return new Promise((resolve, reject) => {

            const url = 'https://api.tvmaze.com/search/shows?q=' + text;

            fetch(url, {
                method: 'GET',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            })
                .then((response) =>
                    response.json())
                .then((json) => {
                    resolve(json.map(item => item.show));
                }).catch((error) => {
                    reject(error);
                });
        })
    }

    static GetEpisodes(SerieID) {
        return new Promise((resolve, reject) => {

            const url = 'https://api.tvmaze.com/shows/' + SerieID + '/episodes';

            fetch(url, {
                method: 'GET',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            })
                .then((response) =>
                    response.json())
                .then((json) => {
                    resolve(json);
                }).catch((error) => {
                    reject(error);
                });
        })
    }
}