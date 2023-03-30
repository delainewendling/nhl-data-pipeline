import axios, {AxiosResponse, AxiosError} from 'axios';

export class Listener {
  prevData = null;

  // I first attempted to use the If-Modifed-Since header but wasn't getting back a Last-Modifed from the server so that strategy didn't work. I haven't continuously polled an API like this before so I'm sure there is a better way to do this. 
  listenForChanges = (url: string, callback: (data: AxiosResponse) => void) => {
      axios.get(url)
        .then((response: AxiosResponse) => {
          if (this.prevData !== null && JSON.stringify(response.data) !== JSON.stringify(this.prevData)) {
            const data = response.data;
            // If I had more time, I would find the difference in the prevData and current data so the callback function
            // could be more efficient in its updates
            callback(data);
            this.prevData = data;
          } 
          this.listenForChanges(url, callback);
        })
        .catch((err: AxiosError) => {
          console.error(`Error: ${err}`);
          setTimeout(this.listenForChanges, 5000);
        });
    }
}
