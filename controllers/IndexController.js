const ContainerModel = require('../models/ContainerModel')
const DockerModel = require('../models/DockerModel')

class IndexController {
    constructor() {
        this.cm = new ContainerModel();
        this.dm = new DockerModel();
    }

    getMain = async(req,res) => {
            if (req.session.user) {

                //현재 유저의 컨테이너 불러오기
                var container_list = await this.cm.getMyContainerList(req.session.user.id);

                container_list = await this.dm.getDockerList(container_list)

                for(var i=0; i < container_list.length; i++) {
                    await this.cm.updateContainerStatus(container_list[i]['id'], container_list[i]['status_code'])
                }


                res.render('index', { loggedIn: true, user_id : req.session.user.id, email: req.session.user.email, nickname : req.session.user.nickname, container_list : container_list });
            } else {
                // 로그인하지 않은 경우
                res.render('index', { loggedIn: false, container_list : [] });
            }
    }

    getOpenModels = async(req,res) => {
        if (req.session.user) {
            //현재 유저의 컨테이너 불러오기
            var container_list = await this.cm.getOpenModels(req.session.user.id);

            container_list = await this.dm.getDockerList(container_list)

            for(var i=0; i < container_list.length; i++) {
                await this.cm.updateContainerStatus(container_list[i]['id'], container_list[i]['status_code'])
            }

            res.render('openmodel', { loggedIn: true, user_id : req.session.user.id,  email: req.session.user.email, nickname : req.session.user.nickname, container_list : container_list });
        }
        else {
            res.render('openmodel', { loggedIn: false, container_list : [] });
        }
    }
}

module.exports = IndexController;