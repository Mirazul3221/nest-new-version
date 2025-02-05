"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSocketServerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_socket_server_dto_1 = require("./create-socket-server.dto");
class UpdateSocketServerDto extends (0, mapped_types_1.PartialType)(create_socket_server_dto_1.CreateSocketServerDto) {
}
exports.UpdateSocketServerDto = UpdateSocketServerDto;
//# sourceMappingURL=update-socket-server.dto.js.map