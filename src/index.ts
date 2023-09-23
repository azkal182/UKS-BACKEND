import {web} from "./application/web";
import {logger} from "./application/logging";

web.listen(8000, () => {
    logger.info("App start");
});
