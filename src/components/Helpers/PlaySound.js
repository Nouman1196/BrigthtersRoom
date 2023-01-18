import { baseURL } from '../../utilies/api/instance';

export const PlaySound = async (music, data) => {

    for (let index = 0; index < data.length; index++) {

        if (data[index] && data[index]._filename == baseURL + music) {

            if (data[index].isPlaying() == true)
                data[index].stop()

            data[index].play(success => {
                if (!success) {
                    data[index].reset();
                }

            });

            break;

        }

    }

}