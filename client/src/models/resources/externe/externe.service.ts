import axios from 'axios';

export class ExterneService {
  static async getPlayersConnected(): Promise<{ online: number; max: number }> {
    const res = await axios.request({
      url: 'https://api.mcsrvstat.us/2/play.poudlardrp.fr',
      method: 'GET',
    });

    return res.data?.players;
  }
}
