import {Service} from "typedi"
import {observable} from "mobx";

@Service()
export class LayoutService {
    @observable
    public sidebarOpened: boolean = false;
}