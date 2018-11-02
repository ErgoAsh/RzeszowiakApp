import { Singleton, AutoWired } from 'typescript-ioc';
import { SearchOptions } from './LinkProviderService';

@Singleton 
@AutoWired 
export default class ConfigEventDisptcherService {

    private callback: Function;

    subscribe(callback: Function) {
        this.callback = callback;
    }

    dispatch(options: SearchOptions) {
        if (options.page = 1) 
            this.callback.call(options, true);
        else 
            this.callback.call(options, false);

        console.warn("lool");
    }
}