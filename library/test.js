"use strict";
/*!
 * pixi.js - v4.0.0
 * Compiled Wed Aug 24 2016 13:19:01 GMT+0100 (BST)
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
!function (t) { if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = t();
else if ("function" == typeof define && define.amd)
    define([], t);
else {
    var e;
    e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.PIXI = t();
} }(function () {
    var t;
    return function t(e, r, i) { function n(o, a) { if (!r[o]) {
        if (!e[o]) {
            var h = "function" == typeof require && require;
            if (!a && h)
                return h(o, !0);
            if (s)
                return s(o, !0);
            var u = new Error("Cannot find module '" + o + "'");
            throw u.code = "MODULE_NOT_FOUND", u;
        }
        var l = r[o] = { exports: {} };
        e[o][0].call(l.exports, function (t) { var r = e[o][1][t]; return n(r ? r : t); }, l, l.exports, t, e, r, i);
    } return r[o].exports; } for (var s = "function" == typeof require && require, o = 0; o < i.length; o++)
        n(i[o]); return n; }({ 1: [function (t, e, r) { var i = new ArrayBuffer(0), n = function (t, e, r, n) { this.gl = t, this.buffer = t.createBuffer(), this.type = e || t.ARRAY_BUFFER, this.drawType = n || t.STATIC_DRAW, this.data = i, r && this.upload(r); }; n.prototype.upload = function (t, e, r) { r || this.bind(); var i = this.gl; t = t || this.data, e = e || 0, this.data.byteLength >= t.byteLength ? i.bufferSubData(this.type, e, t) : i.bufferData(this.type, t, this.drawType), this.data = t; }, n.prototype.bind = function () { var t = this.gl; t.bindBuffer(this.type, this.buffer); }, n.createVertexBuffer = function (t, e, r) { return new n(t, t.ARRAY_BUFFER, e, r); }, n.createIndexBuffer = function (t, e, r) { return new n(t, t.ELEMENT_ARRAY_BUFFER, e, r); }, n.create = function (t, e, r, i) { return new n(t, e, r, i); }, n.prototype.destroy = function () { this.gl.deleteBuffer(this.buffer); }, e.exports = n; }, {}], 2: [function (t, e, r) { var i = t("./GLTexture"), n = function (t, e, r) { this.gl = t, this.framebuffer = t.createFramebuffer(), this.stencil = null, this.texture = null, this.width = e || 100, this.height = r || 100; }; n.prototype.enableTexture = function (t) { var e = this.gl; this.texture = t || new i(e), this.texture.bind(), this.bind(), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture.texture, 0); }, n.prototype.enableStencil = function () { if (!this.stencil) {
                var t = this.gl;
                this.stencil = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.stencil), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.stencil), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, this.width, this.height);
            } }, n.prototype.clear = function (t, e, r, i) { this.bind(); var n = this.gl; n.clearColor(t, e, r, i), n.clear(n.COLOR_BUFFER_BIT); }, n.prototype.bind = function () { var t = this.gl; this.texture && this.texture.unbind(), t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer); }, n.prototype.unbind = function () { var t = this.gl; t.bindFramebuffer(t.FRAMEBUFFER, null); }, n.prototype.resize = function (t, e) { var r = this.gl; this.width = t, this.height = e, this.texture && this.texture.uploadData(null, t, e), this.stencil && (r.bindRenderbuffer(r.RENDERBUFFER, this.stencil), r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t, e)); }, n.prototype.destroy = function () { var t = this.gl; this.texture && this.texture.destroy(), t.deleteFramebuffer(this.framebuffer), this.gl = null, this.stencil = null, this.texture = null; }, n.createRGBA = function (t, e, r, s) { var o = i.fromData(t, null, e, r); o.enableNearestScaling(), o.enableWrapClamp(); var a = new n(t, e, r); return a.enableTexture(o), a.unbind(), a; }, n.createFloat32 = function (t, e, r, s) { var o = new i.fromData(t, s, e, r); o.enableNearestScaling(), o.enableWrapClamp(); var a = new n(t, e, r); return a.enableTexture(o), a.unbind(), a; }, e.exports = n; }, { "./GLTexture": 4 }], 3: [function (t, e, r) { var i = t("./shader/compileProgram"), n = t("./shader/extractAttributes"), s = t("./shader/extractUniforms"), o = t("./shader/generateUniformAccessObject"), a = function (t, e, r) { this.gl = t, this.program = i(t, e, r), this.attributes = n(t, this.program); var a = s(t, this.program); this.uniforms = o(t, a); }; a.prototype.bind = function () { this.gl.useProgram(this.program); }, a.prototype.destroy = function () { }, e.exports = a; }, { "./shader/compileProgram": 9, "./shader/extractAttributes": 11, "./shader/extractUniforms": 12, "./shader/generateUniformAccessObject": 13 }], 4: [function (t, e, r) { var i = function (t, e, r, i, n) { this.gl = t, this.texture = t.createTexture(), this.mipmap = !1, this.premultiplyAlpha = !1, this.width = e || -1, this.height = r || -1, this.format = i || t.RGBA, this.type = n || t.UNSIGNED_BYTE; }; i.prototype.upload = function (t) { this.bind(); var e = this.gl; e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha); var r = t.videoWidth || t.width, i = t.videoHeight || t.height; i !== this.height || r !== this.width ? e.texImage2D(e.TEXTURE_2D, 0, this.format, this.format, this.type, t) : e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, this.format, this.type, t), this.width = r, this.height = i; }; var n = !1; i.prototype.uploadData = function (t, e, r) { this.bind(); var i = this.gl; if (t instanceof Float32Array) {
                if (!n) {
                    var s = i.getExtension("OES_texture_float");
                    if (!s)
                        throw new Error("floating point textures not available");
                    n = !0;
                }
                this.type = i.FLOAT;
            }
            else
                this.type = i.UNSIGNED_BYTE; i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), e !== this.width || r !== this.height ? i.texImage2D(i.TEXTURE_2D, 0, this.format, e, r, 0, this.format, this.type, t || null) : i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, e, r, this.format, this.type, t || null), this.width = e, this.height = r; }, i.prototype.bind = function (t) { var e = this.gl; void 0 !== t && e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, this.texture); }, i.prototype.unbind = function () { var t = this.gl; t.bindTexture(t.TEXTURE_2D, null); }, i.prototype.minFilter = function (t) { var e = this.gl; this.bind(), this.mipmap ? e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t ? e.LINEAR_MIPMAP_LINEAR : e.NEAREST_MIPMAP_NEAREST) : e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t ? e.LINEAR : e.NEAREST); }, i.prototype.magFilter = function (t) { var e = this.gl; this.bind(), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t ? e.LINEAR : e.NEAREST); }, i.prototype.enableMipmap = function () { var t = this.gl; this.bind(), this.mipmap = !0, t.generateMipmap(t.TEXTURE_2D); }, i.prototype.enableLinearScaling = function () { this.minFilter(!0), this.magFilter(!0); }, i.prototype.enableNearestScaling = function () { this.minFilter(!1), this.magFilter(!1); }, i.prototype.enableWrapClamp = function () { var t = this.gl; this.bind(), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE); }, i.prototype.enableWrapRepeat = function () { var t = this.gl; this.bind(), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT); }, i.prototype.enableWrapMirrorRepeat = function () { var t = this.gl; this.bind(), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.MIRRORED_REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.MIRRORED_REPEAT); }, i.prototype.destroy = function () { var t = this.gl; t.deleteTexture(this.texture); }, i.fromSource = function (t, e, r) { var n = new i(t); return n.premultiplyAlpha = r || !1, n.upload(e), n; }, i.fromData = function (t, e, r, n) { var s = new i(t); return s.uploadData(e, r, n), s; }, e.exports = i; }, {}], 5: [function (t, e, r) { function i(t, e) { if (this.nativeVaoExtension = null, i.FORCE_NATIVE || (this.nativeVaoExtension = t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object")), this.nativeState = e, this.nativeVaoExtension) {
                this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
                var r = t.getParameter(t.MAX_VERTEX_ATTRIBS);
                this.nativeState = { tempAttribState: new Array(r), attribState: new Array(r) };
            } this.gl = t, this.attributes = [], this.indexBuffer = null, this.dirty = !1; } var n = t("./setVertexAttribArrays"); i.prototype.constructor = i, e.exports = i, i.FORCE_NATIVE = !1, i.prototype.bind = function () { return this.nativeVao ? (this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.dirty && (this.dirty = !1, this.activate())) : this.activate(), this; }, i.prototype.unbind = function () { return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(null), this; }, i.prototype.activate = function () { for (var t = this.gl, e = null, r = 0; r < this.attributes.length; r++) {
                var i = this.attributes[r];
                e !== i.buffer && (i.buffer.bind(), e = i.buffer), t.vertexAttribPointer(i.attribute.location, i.attribute.size, i.type || t.FLOAT, i.normalized || !1, i.stride || 0, i.start || 0);
            } return n(t, this.attributes, this.nativeState), this.indexBuffer.bind(), this; }, i.prototype.addAttribute = function (t, e, r, i, n, s) { return this.attributes.push({ buffer: t, attribute: e, location: e.location, type: r || this.gl.FLOAT, normalized: i || !1, stride: n || 0, start: s || 0 }), this.dirty = !0, this; }, i.prototype.addIndex = function (t) { return this.indexBuffer = t, this.dirty = !0, this; }, i.prototype.clear = function () { return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.attributes.length = 0, this.indexBuffer = null, this; }, i.prototype.draw = function (t, e, r) { var i = this.gl; return i.drawElements(t, e, i.UNSIGNED_SHORT, r || 0), this; }, i.prototype.destroy = function () { this.gl = null, this.indexBuffer = null, this.attributes = null, this.nativeState = null, this.nativeVao && this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao), this.nativeVaoExtension = null, this.nativeVao = null; }; }, { "./setVertexAttribArrays": 8 }], 6: [function (t, e, r) { var i = function (t, e) { var r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e); if (!r)
                throw new Error("This browser does not support webGL. Try using the canvas renderer"); return r; }; e.exports = i; }, {}], 7: [function (t, e, r) { var i = { createContext: t("./createContext"), setVertexAttribArrays: t("./setVertexAttribArrays"), GLBuffer: t("./GLBuffer"), GLFramebuffer: t("./GLFramebuffer"), GLShader: t("./GLShader"), GLTexture: t("./GLTexture"), VertexArrayObject: t("./VertexArrayObject"), shader: t("./shader") }; "undefined" != typeof e && e.exports && (e.exports = i), "undefined" != typeof window && (window.PIXI = window.PIXI || {}, window.PIXI.glCore = i); }, { "./GLBuffer": 1, "./GLFramebuffer": 2, "./GLShader": 3, "./GLTexture": 4, "./VertexArrayObject": 5, "./createContext": 6, "./setVertexAttribArrays": 8, "./shader": 14 }], 8: [function (t, e, r) { var i = function (t, e, r) { var i; if (r) {
                var n = r.tempAttribState, s = r.attribState;
                for (i = 0; i < n.length; i++)
                    n[i] = !1;
                for (i = 0; i < e.length; i++)
                    n[e[i].attribute.location] = !0;
                for (i = 0; i < s.length; i++)
                    s[i] !== n[i] && (s[i] = n[i], r.attribState[i] ? t.enableVertexAttribArray(i) : t.disableVertexAttribArray(i));
            }
            else
                for (i = 0; i < e.length; i++) {
                    var o = e[i];
                    t.enableVertexAttribArray(o.attribute.location);
                } }; e.exports = i; }, {}], 9: [function (t, e, r) { var i = function (t, e, r) { var i = n(t, t.VERTEX_SHADER, e), s = n(t, t.FRAGMENT_SHADER, r), o = t.createProgram(); return t.attachShader(o, i), t.attachShader(o, s), t.linkProgram(o), t.getProgramParameter(o, t.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", t.getProgramParameter(o, t.VALIDATE_STATUS)), console.error("gl.getError()", t.getError()), "" !== t.getProgramInfoLog(o) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(o)), t.deleteProgram(o), o = null), t.deleteShader(i), t.deleteShader(s), o; }, n = function (t, e, r) { var i = t.createShader(e); return t.shaderSource(i, r), t.compileShader(i), t.getShaderParameter(i, t.COMPILE_STATUS) ? i : (console.log(t.getShaderInfoLog(i)), null); }; e.exports = i; }, {}], 10: [function (t, e, r) { var i = function (t, e) { switch (t) {
                case "float": return 0;
                case "vec2": return new Float32Array(2 * e);
                case "vec3": return new Float32Array(3 * e);
                case "vec4": return new Float32Array(4 * e);
                case "int":
                case "sampler2D": return 0;
                case "ivec2": return new Int32Array(2 * e);
                case "ivec3": return new Int32Array(3 * e);
                case "ivec4": return new Int32Array(4 * e);
                case "bool": return !1;
                case "bvec2": return n(2 * e);
                case "bvec3": return n(3 * e);
                case "bvec4": return n(4 * e);
                case "mat2": return new Float32Array([1, 0, 0, 1]);
                case "mat3": return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
                case "mat4": return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            } }, n = function (t) { for (var e = new Array(t), r = 0; r < e.length; r++)
                e[r] = !1; return e; }; e.exports = i; }, {}], 11: [function (t, e, r) { var i = t("./mapType"), n = t("./mapSize"), s = function (t, e) { for (var r = {}, s = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), a = 0; a < s; a++) {
                var h = t.getActiveAttrib(e, a), u = i(t, h.type);
                r[h.name] = { type: u, size: n(u), location: t.getAttribLocation(e, h.name), pointer: o };
            } return r; }, o = function (t, e, r, i) { gl.vertexAttribPointer(this.location, this.size, t || gl.FLOAT, e || !1, r || 0, i || 0); }; e.exports = s; }, { "./mapSize": 15, "./mapType": 16 }], 12: [function (t, e, r) { var i = t("./mapType"), n = t("./defaultValue"), s = function (t, e) { for (var r = {}, s = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), o = 0; o < s; o++) {
                var a = t.getActiveUniform(e, o), h = a.name.replace(/\[.*?\]/, ""), u = i(t, a.type);
                r[h] = { type: u, size: a.size, location: t.getUniformLocation(e, h), value: n(u, a.size) };
            } return r; }; e.exports = s; }, { "./defaultValue": 10, "./mapType": 16 }], 13: [function (t, e, r) { var i = function (t, e) { var r = { data: {} }; r.gl = t; for (var i = Object.keys(e), a = 0; a < i.length; a++) {
                var h = i[a], u = h.split("."), l = u[u.length - 1], c = o(u, r), d = e[h];
                c.data[l] = d, c.gl = t, Object.defineProperty(c, l, { get: n(l), set: s(l, d) });
            } return r; }, n = function (t) { var e = a.replace("%%", t); return new Function(e); }, s = function (t, e) { var r, i = h.replace(/%%/g, t); return r = 1 === e.size ? u[e.type] : l[e.type], r && (i += "\nthis.gl." + r + ";"), new Function("value", i); }, o = function (t, e) { for (var r = e, i = 0; i < t.length - 1; i++) {
                var n = r[t[i]] || { data: {} };
                r[t[i]] = n, r = n;
            } return r; }, a = ["return this.data.%%.value;"].join("\n"), h = ["this.data.%%.value = value;", "var location = this.data.%%.location;"].join("\n"), u = { float: "uniform1f(location, value)", vec2: "uniform2f(location, value[0], value[1])", vec3: "uniform3f(location, value[0], value[1], value[2])", vec4: "uniform4f(location, value[0], value[1], value[2], value[3])", int: "uniform1i(location, value)", ivec2: "uniform2i(location, value[0], value[1])", ivec3: "uniform3i(location, value[0], value[1], value[2])", ivec4: "uniform4i(location, value[0], value[1], value[2], value[3])", bool: "uniform1i(location, value)", bvec2: "uniform2i(location, value[0], value[1])", bvec3: "uniform3i(location, value[0], value[1], value[2])", bvec4: "uniform4i(location, value[0], value[1], value[2], value[3])", mat2: "uniformMatrix2fv(location, false, value)", mat3: "uniformMatrix3fv(location, false, value)", mat4: "uniformMatrix4fv(location, false, value)", sampler2D: "uniform1i(location, value)" }, l = { float: "uniform1fv(location, value)", vec2: "uniform2fv(location, value)", vec3: "uniform3fv(location, value)", vec4: "uniform4fv(location, value)", int: "uniform1iv(location, value)", ivec2: "uniform2iv(location, value)", ivec3: "uniform3iv(location, value)", ivec4: "uniform4iv(location, value)", bool: "uniform1iv(location, value)", bvec2: "uniform2iv(location, value)", bvec3: "uniform3iv(location, value)", bvec4: "uniform4iv(location, value)", sampler2D: "uniform1iv(location, value)" }; e.exports = i; }, {}], 14: [function (t, e, r) { e.exports = { compileProgram: t("./compileProgram"), defaultValue: t("./defaultValue"), extractAttributes: t("./extractAttributes"), extractUniforms: t("./extractUniforms"), generateUniformAccessObject: t("./generateUniformAccessObject"), mapSize: t("./mapSize"), mapType: t("./mapType") }; }, { "./compileProgram": 9, "./defaultValue": 10, "./extractAttributes": 11, "./extractUniforms": 12, "./generateUniformAccessObject": 13, "./mapSize": 15, "./mapType": 16 }], 15: [function (t, e, r) { var i = function (t) { return n[t]; }, n = { float: 1, vec2: 2, vec3: 3, vec4: 4, int: 1, ivec2: 2, ivec3: 3, ivec4: 4, bool: 1, bvec2: 2, bvec3: 3, bvec4: 4, mat2: 4, mat3: 9, mat4: 16, sampler2D: 1 }; e.exports = i; }, {}], 16: [function (t, e, r) { var i = function (t, e) { if (!n) {
                var r = Object.keys(s);
                n = {};
                for (var i = 0; i < r.length; ++i) {
                    var o = r[i];
                    n[t[o]] = s[o];
                }
            } return n[e]; }, n = null, s = { FLOAT: "float", FLOAT_VEC2: "vec2", FLOAT_VEC3: "vec3", FLOAT_VEC4: "vec4", INT: "int", INT_VEC2: "ivec2", INT_VEC3: "ivec3", INT_VEC4: "ivec4", BOOL: "bool", BOOL_VEC2: "bvec2", BOOL_VEC3: "bvec3", BOOL_VEC4: "bvec4", FLOAT_MAT2: "mat2", FLOAT_MAT3: "mat3", FLOAT_MAT4: "mat4", SAMPLER_2D: "sampler2D" }; e.exports = i; }, {}], 17: [function (t, e, r) {
                "use strict";
                function i(t) { return t && t.__esModule ? t : { default: t }; }
                function n(t, e, r, i) { (0, o.default)(e)(t, (0, h.default)(r), i); }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = n;
                var s = t("./internal/eachOfLimit"), o = i(s), a = t("./internal/withoutIndex"), h = i(a);
                e.exports = r.default;
            }, { "./internal/eachOfLimit": 21, "./internal/withoutIndex": 28 }], 18: [function (t, e, r) {
                "use strict";
                function i(t) { return t && t.__esModule ? t : { default: t }; }
                Object.defineProperty(r, "__esModule", { value: !0 });
                var n = t("./eachLimit"), s = i(n), o = t("./internal/doLimit"), a = i(o);
                r.default = (0, a.default)(s.default, 1), e.exports = r.default;
            }, { "./eachLimit": 17, "./internal/doLimit": 20 }], 19: [function (t, e, r) {
                "use strict";
                function i() { this.head = this.tail = null, this.length = 0; }
                function n(t, e) { t.length = 1, t.head = t.tail = e; }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = i, i.prototype.removeLink = function (t) { return t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev, t.prev = t.next = null, this.length -= 1, t; }, i.prototype.empty = i, i.prototype.insertAfter = function (t, e) { e.prev = t, e.next = t.next, t.next ? t.next.prev = e : this.tail = e, t.next = e, this.length += 1; }, i.prototype.insertBefore = function (t, e) { e.prev = t.prev, e.next = t, t.prev ? t.prev.next = e : this.head = e, t.prev = e, this.length += 1; }, i.prototype.unshift = function (t) { this.head ? this.insertBefore(this.head, t) : n(this, t); }, i.prototype.push = function (t) { this.tail ? this.insertAfter(this.tail, t) : n(this, t); }, i.prototype.shift = function () { return this.head && this.removeLink(this.head); }, i.prototype.pop = function () { return this.tail && this.removeLink(this.tail); }, e.exports = r.default;
            }, {}], 20: [function (t, e, r) {
                "use strict";
                function i(t, e) { return function (r, i, n) { return t(r, e, i, n); }; }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = i, e.exports = r.default;
            }, {}], 21: [function (t, e, r) {
                "use strict";
                function i(t) { return t && t.__esModule ? t : { default: t }; }
                function n(t) { return function (e, r, i) { function n(t) { if (c -= 1, t)
                    u = !0, i(t);
                else {
                    if (u && c <= 0)
                        return i(null);
                    s();
                } } function s() { for (; c < t && !u;) {
                    var e = a();
                    if (null === e)
                        return u = !0, void (c <= 0 && i(null));
                    c += 1, r(e.value, e.key, (0, d.default)(n));
                } } if (i = (0, h.default)(i || o.default), t <= 0 || !e)
                    return i(null); var a = (0, l.default)(e), u = !1, c = 0; s(); }; }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = n;
                var s = t("lodash/noop"), o = i(s), a = t("./once"), h = i(a), u = t("./iterator"), l = i(u), c = t("./onlyOnce"), d = i(c);
                e.exports = r.default;
            }, { "./iterator": 23, "./once": 24, "./onlyOnce": 25, "lodash/noop": 54 }], 22: [function (t, e, r) {
                "use strict";
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = function (t) { return i && t[i] && t[i](); };
                var i = "function" == typeof Symbol && Symbol.iterator;
                e.exports = r.default;
            }, {}], 23: [function (t, e, r) {
                "use strict";
                function i(t) { return t && t.__esModule ? t : { default: t }; }
                function n(t) { var e = -1, r = t.length; return function () { return ++e < r ? { value: t[e], key: e } : null; }; }
                function s(t) { var e = -1; return function () { var r = t.next(); return r.done ? null : (e++, { value: r.value, key: e }); }; }
                function o(t) { var e = (0, p.default)(t), r = -1, i = e.length; return function () { var n = e[++r]; return r < i ? { value: t[n], key: n } : null; }; }
                function a(t) { if ((0, u.default)(t))
                    return n(t); var e = (0, c.default)(t); return e ? s(e) : o(t); }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = a;
                var h = t("lodash/isArrayLike"), u = i(h), l = t("./getIterator"), c = i(l), d = t("lodash/keys"), p = i(d);
                e.exports = r.default;
            }, { "./getIterator": 22, "lodash/isArrayLike": 46, "lodash/keys": 53 }], 24: [function (t, e, r) {
                "use strict";
                function i(t) { return function () { if (null !== t) {
                    var e = t;
                    t = null, e.apply(this, arguments);
                } }; }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = i, e.exports = r.default;
            }, {}], 25: [function (t, e, r) {
                "use strict";
                function i(t) { return function () { if (null === t)
                    throw new Error("Callback was already called."); var e = t; t = null, e.apply(this, arguments); }; }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = i, e.exports = r.default;
            }, {}], 26: [function (t, e, r) {
                "use strict";
                function i(t) { return t && t.__esModule ? t : { default: t }; }
                function n(t, e, r) { function i(t, e, r) { if (null != r && "function" != typeof r)
                    throw new Error("task callback must be a function"); return u.started = !0, (0, h.default)(t) || (t = [t]), 0 === t.length && u.idle() ? (0, g.default)(function () { u.drain(); }) : ((0, o.default)(t, function (t) { var i = { data: t, callback: r || l.default }; e ? u._tasks.unshift(i) : u._tasks.push(i); }), void (0, g.default)(u.process)); } function n(t) { return (0, d.default)(function (e) { s -= 1, (0, o.default)(t, function (t) { (0, o.default)(a, function (e, r) { if (e === t)
                    return a.splice(r, 1), !1; }), t.callback.apply(t, e), null != e[0] && u.error(e[0], t.data); }), s <= u.concurrency - u.buffer && u.unsaturated(), u.idle() && u.drain(), u.process(); }); } if (null == e)
                    e = 1;
                else if (0 === e)
                    throw new Error("Concurrency must not be zero"); var s = 0, a = [], u = { _tasks: new x.default, concurrency: e, payload: r, saturated: l.default, unsaturated: l.default, buffer: e / 4, empty: l.default, drain: l.default, error: l.default, started: !1, paused: !1, push: function (t, e) { i(t, !1, e); }, kill: function () { u.drain = l.default, u._tasks.empty(); }, unshift: function (t, e) { i(t, !0, e); }, process: function () { for (; !u.paused && s < u.concurrency && u._tasks.length;) {
                        var e = [], r = [], i = u._tasks.length;
                        u.payload && (i = Math.min(i, u.payload));
                        for (var o = 0; o < i; o++) {
                            var h = u._tasks.shift();
                            e.push(h), r.push(h.data);
                        }
                        0 === u._tasks.length && u.empty(), s += 1, a.push(e[0]), s === u.concurrency && u.saturated();
                        var l = (0, f.default)(n(e));
                        t(r, l);
                    } }, length: function () { return u._tasks.length; }, running: function () { return s; }, workersList: function () { return a; }, idle: function () { return u._tasks.length + s === 0; }, pause: function () { u.paused = !0; }, resume: function () { if (u.paused !== !1) {
                        u.paused = !1;
                        for (var t = Math.min(u.concurrency, u._tasks.length), e = 1; e <= t; e++)
                            (0, g.default)(u.process);
                    } } }; return u; }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = n;
                var s = t("lodash/_arrayEach"), o = i(s), a = t("lodash/isArray"), h = i(a), u = t("lodash/noop"), l = i(u), c = t("lodash/rest"), d = i(c), p = t("./onlyOnce"), f = i(p), v = t("./setImmediate"), g = i(v), y = t("./DoublyLinkedList"), x = i(y);
                e.exports = r.default;
            }, { "./DoublyLinkedList": 19, "./onlyOnce": 25, "./setImmediate": 27, "lodash/_arrayEach": 35, "lodash/isArray": 45, "lodash/noop": 54, "lodash/rest": 55 }], 27: [function (t, e, r) { (function (e) {
                "use strict";
                function i(t) { return t && t.__esModule ? t : { default: t }; }
                function n(t) { setTimeout(t, 0); }
                function s(t) { return (0, h.default)(function (e, r) { t(function () { e.apply(null, r); }); }); }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.hasNextTick = r.hasSetImmediate = void 0, r.fallback = n, r.wrap = s;
                var o, a = t("lodash/rest"), h = i(a), u = r.hasSetImmediate = "function" == typeof setImmediate && setImmediate, l = r.hasNextTick = "object" == typeof e && "function" == typeof e.nextTick;
                o = u ? setImmediate : l ? e.nextTick : n, r.default = s(o);
            }).call(this, t("_process")); }, { _process: 61, "lodash/rest": 55 }], 28: [function (t, e, r) {
                "use strict";
                function i(t) { return function (e, r, i) { return t(e, i); }; }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = i, e.exports = r.default;
            }, {}], 29: [function (t, e, r) {
                "use strict";
                function i(t) { return t && t.__esModule ? t : { default: t }; }
                Object.defineProperty(r, "__esModule", { value: !0 }), r.default = function (t, e) { return (0, s.default)(function (e, r) { t(e[0], r); }, e, 1); };
                var n = t("./internal/queue"), s = i(n);
                e.exports = r.default;
            }, { "./internal/queue": 26 }], 30: [function (t, e, r) {
                "use strict";
                "use restrict";
                function i(t) { var e = 32; return t &= -t, t && e--, 65535 & t && (e -= 16), 16711935 & t && (e -= 8), 252645135 & t && (e -= 4), 858993459 & t && (e -= 2), 1431655765 & t && (e -= 1), e; }
                var n = 32;
                r.INT_BITS = n, r.INT_MAX = 2147483647, r.INT_MIN = -1 << n - 1, r.sign = function (t) { return (t > 0) - (t < 0); }, r.abs = function (t) { var e = t >> n - 1; return (t ^ e) - e; }, r.min = function (t, e) { return e ^ (t ^ e) & -(t < e); }, r.max = function (t, e) { return t ^ (t ^ e) & -(t < e); }, r.isPow2 = function (t) { return !(t & t - 1 || !t); }, r.log2 = function (t) { var e, r; return e = (t > 65535) << 4, t >>>= e, r = (t > 255) << 3, t >>>= r, e |= r, r = (t > 15) << 2, t >>>= r, e |= r, r = (t > 3) << 1, t >>>= r, e |= r, e | t >> 1; }, r.log10 = function (t) { return t >= 1e9 ? 9 : t >= 1e8 ? 8 : t >= 1e7 ? 7 : t >= 1e6 ? 6 : t >= 1e5 ? 5 : t >= 1e4 ? 4 : t >= 1e3 ? 3 : t >= 100 ? 2 : t >= 10 ? 1 : 0; }, r.popCount = function (t) { return t -= t >>> 1 & 1431655765, t = (858993459 & t) + (t >>> 2 & 858993459), 16843009 * (t + (t >>> 4) & 252645135) >>> 24; }, r.countTrailingZeros = i, r.nextPow2 = function (t) { return t += 0 === t, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t + 1; }, r.prevPow2 = function (t) { return t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t - (t >>> 1); }, r.parity = function (t) { return t ^= t >>> 16, t ^= t >>> 8, t ^= t >>> 4, t &= 15, 27030 >>> t & 1; };
                var s = new Array(256);
                !function (t) { for (var e = 0; e < 256; ++e) {
                    var r = e, i = e, n = 7;
                    for (r >>>= 1; r; r >>>= 1)
                        i <<= 1, i |= 1 & r, --n;
                    t[e] = i << n & 255;
                } }(s), r.reverse = function (t) { return s[255 & t] << 24 | s[t >>> 8 & 255] << 16 | s[t >>> 16 & 255] << 8 | s[t >>> 24 & 255]; }, r.interleave2 = function (t, e) { return t &= 65535, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), e &= 65535, e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), e = 1431655765 & (e | e << 1), t | e << 1; }, r.deinterleave2 = function (t, e) { return t = t >>> e & 1431655765, t = 858993459 & (t | t >>> 1), t = 252645135 & (t | t >>> 2), t = 16711935 & (t | t >>> 4), t = 65535 & (t | t >>> 16), t << 16 >> 16; }, r.interleave3 = function (t, e, r) { return t &= 1023, t = 4278190335 & (t | t << 16), t = 251719695 & (t | t << 8), t = 3272356035 & (t | t << 4), t = 1227133513 & (t | t << 2), e &= 1023, e = 4278190335 & (e | e << 16), e = 251719695 & (e | e << 8), e = 3272356035 & (e | e << 4), e = 1227133513 & (e | e << 2), t |= e << 1, r &= 1023, r = 4278190335 & (r | r << 16), r = 251719695 & (r | r << 8), r = 3272356035 & (r | r << 4), r = 1227133513 & (r | r << 2), t | r << 2; }, r.deinterleave3 = function (t, e) { return t = t >>> e & 1227133513, t = 3272356035 & (t | t >>> 2), t = 251719695 & (t | t >>> 4), t = 4278190335 & (t | t >>> 8), t = 1023 & (t | t >>> 16), t << 22 >> 22; }, r.nextCombination = function (t) { var e = t | t - 1; return e + 1 | (~e & -~e) - 1 >>> i(t) + 1; };
            }, {}], 31: [function (t, e, r) {
                "use strict";
                function i(t, e, r) { r = r || 2; var i = e && e.length, s = i ? e[0] * r : t.length, a = n(t, 0, s, r, !0), h = []; if (!a)
                    return h; var u, l, d, p, f, v, g; if (i && (a = c(t, e, a, r)), t.length > 80 * r) {
                    u = d = t[0], l = p = t[1];
                    for (var y = r; y < s; y += r)
                        f = t[y], v = t[y + 1], f < u && (u = f), v < l && (l = v), f > d && (d = f), v > p && (p = v);
                    g = Math.max(d - u, p - l);
                } return o(a, h, r, u, l, g), h; }
                function n(t, e, r, i, n) { var s, o; if (n === D(t, e, r, i) > 0)
                    for (s = e; s < r; s += i)
                        o = R(s, t[s], t[s + 1], o);
                else
                    for (s = r - i; s >= e; s -= i)
                        o = R(s, t[s], t[s + 1], o); return o && T(o, o.next) && (C(o), o = o.next), o; }
                function s(t, e) { if (!t)
                    return t; e || (e = t); var r, i = t; do
                    if (r = !1, i.steiner || !T(i, i.next) && 0 !== b(i.prev, i, i.next))
                        i = i.next;
                    else {
                        if (C(i), i = e = i.prev, i === i.next)
                            return null;
                        r = !0;
                    }
                while (r || i !== e); return e; }
                function o(t, e, r, i, n, c, d) { if (t) {
                    !d && c && v(t, i, n, c);
                    for (var p, f, g = t; t.prev !== t.next;)
                        if (p = t.prev, f = t.next, c ? h(t, i, n, c) : a(t))
                            e.push(p.i / r), e.push(t.i / r), e.push(f.i / r), C(t), t = f.next, g = f.next;
                        else if (t = f, t === g) {
                            d ? 1 === d ? (t = u(t, e, r), o(t, e, r, i, n, c, 2)) : 2 === d && l(t, e, r, i, n, c) : o(s(t), e, r, i, n, c, 1);
                            break;
                        }
                } }
                function a(t) { var e = t.prev, r = t, i = t.next; if (b(e, r, i) >= 0)
                    return !1; for (var n = t.next.next; n !== t.prev;) {
                    if (m(e.x, e.y, r.x, r.y, i.x, i.y, n.x, n.y) && b(n.prev, n, n.next) >= 0)
                        return !1;
                    n = n.next;
                } return !0; }
                function h(t, e, r, i) { var n = t.prev, s = t, o = t.next; if (b(n, s, o) >= 0)
                    return !1; for (var a = n.x < s.x ? n.x < o.x ? n.x : o.x : s.x < o.x ? s.x : o.x, h = n.y < s.y ? n.y < o.y ? n.y : o.y : s.y < o.y ? s.y : o.y, u = n.x > s.x ? n.x > o.x ? n.x : o.x : s.x > o.x ? s.x : o.x, l = n.y > s.y ? n.y > o.y ? n.y : o.y : s.y > o.y ? s.y : o.y, c = y(a, h, e, r, i), d = y(u, l, e, r, i), p = t.nextZ; p && p.z <= d;) {
                    if (p !== t.prev && p !== t.next && m(n.x, n.y, s.x, s.y, o.x, o.y, p.x, p.y) && b(p.prev, p, p.next) >= 0)
                        return !1;
                    p = p.nextZ;
                } for (p = t.prevZ; p && p.z >= c;) {
                    if (p !== t.prev && p !== t.next && m(n.x, n.y, s.x, s.y, o.x, o.y, p.x, p.y) && b(p.prev, p, p.next) >= 0)
                        return !1;
                    p = p.prevZ;
                } return !0; }
                function u(t, e, r) { var i = t; do {
                    var n = i.prev, s = i.next.next;
                    !T(n, s) && E(n, i, i.next, s) && S(n, s) && S(s, n) && (e.push(n.i / r), e.push(i.i / r), e.push(s.i / r), C(i), C(i.next), i = t = s), i = i.next;
                } while (i !== t); return i; }
                function l(t, e, r, i, n, a) { var h = t; do {
                    for (var u = h.next.next; u !== h.prev;) {
                        if (h.i !== u.i && _(h, u)) {
                            var l = M(h, u);
                            return h = s(h, h.next), l = s(l, l.next), o(h, e, r, i, n, a), void o(l, e, r, i, n, a);
                        }
                        u = u.next;
                    }
                    h = h.next;
                } while (h !== t); }
                function c(t, e, r, i) { var o, a, h, u, l, c = []; for (o = 0, a = e.length; o < a; o++)
                    h = e[o] * i, u = o < a - 1 ? e[o + 1] * i : t.length, l = n(t, h, u, i, !1), l === l.next && (l.steiner = !0), c.push(x(l)); for (c.sort(d), o = 0; o < c.length; o++)
                    p(c[o], r), r = s(r, r.next); return r; }
                function d(t, e) { return t.x - e.x; }
                function p(t, e) { if (e = f(t, e)) {
                    var r = M(e, t);
                    s(r, r.next);
                } }
                function f(t, e) { var r, i = e, n = t.x, s = t.y, o = -(1 / 0); do {
                    if (s <= i.y && s >= i.next.y) {
                        var a = i.x + (s - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
                        if (a <= n && a > o) {
                            if (o = a, a === n) {
                                if (s === i.y)
                                    return i;
                                if (s === i.next.y)
                                    return i.next;
                            }
                            r = i.x < i.next.x ? i : i.next;
                        }
                    }
                    i = i.next;
                } while (i !== e); if (!r)
                    return null; if (n === o)
                    return r.prev; var h, u = r, l = r.x, c = r.y, d = 1 / 0; for (i = r.next; i !== u;)
                    n >= i.x && i.x >= l && m(s < c ? n : o, s, l, c, s < c ? o : n, s, i.x, i.y) && (h = Math.abs(s - i.y) / (n - i.x), (h < d || h === d && i.x > r.x) && S(i, t) && (r = i, d = h)), i = i.next; return r; }
                function v(t, e, r, i) { var n = t; do
                    null === n.z && (n.z = y(n.x, n.y, e, r, i)), n.prevZ = n.prev, n.nextZ = n.next, n = n.next;
                while (n !== t); n.prevZ.nextZ = null, n.prevZ = null, g(n); }
                function g(t) { var e, r, i, n, s, o, a, h, u = 1; do {
                    for (r = t, t = null, s = null, o = 0; r;) {
                        for (o++, i = r, a = 0, e = 0; e < u && (a++, i = i.nextZ, i); e++)
                            ;
                        for (h = u; a > 0 || h > 0 && i;)
                            0 === a ? (n = i, i = i.nextZ, h--) : 0 !== h && i ? r.z <= i.z ? (n = r, r = r.nextZ, a--) : (n = i, i = i.nextZ, h--) : (n = r, r = r.nextZ, a--), s ? s.nextZ = n : t = n, n.prevZ = s, s = n;
                        r = i;
                    }
                    s.nextZ = null, u *= 2;
                } while (o > 1); return t; }
                function y(t, e, r, i, n) { return t = 32767 * (t - r) / n, e = 32767 * (e - i) / n, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), e = 1431655765 & (e | e << 1), t | e << 1; }
                function x(t) { var e = t, r = t; do
                    e.x < r.x && (r = e), e = e.next;
                while (e !== t); return r; }
                function m(t, e, r, i, n, s, o, a) { return (n - o) * (e - a) - (t - o) * (s - a) >= 0 && (t - o) * (i - a) - (r - o) * (e - a) >= 0 && (r - o) * (s - a) - (n - o) * (i - a) >= 0; }
                function _(t, e) { return t.next.i !== e.i && t.prev.i !== e.i && !w(t, e) && S(t, e) && S(e, t) && A(t, e); }
                function b(t, e, r) { return (e.y - t.y) * (r.x - e.x) - (e.x - t.x) * (r.y - e.y); }
                function T(t, e) { return t.x === e.x && t.y === e.y; }
                function E(t, e, r, i) { return !!(T(t, e) && T(r, i) || T(t, i) && T(r, e)) || b(t, e, r) > 0 != b(t, e, i) > 0 && b(r, i, t) > 0 != b(r, i, e) > 0; }
                function w(t, e) { var r = t; do {
                    if (r.i !== t.i && r.next.i !== t.i && r.i !== e.i && r.next.i !== e.i && E(r, r.next, t, e))
                        return !0;
                    r = r.next;
                } while (r !== t); return !1; }
                function S(t, e) { return b(t.prev, t, t.next) < 0 ? b(t, e, t.next) >= 0 && b(t, t.prev, e) >= 0 : b(t, e, t.prev) < 0 || b(t, t.next, e) < 0; }
                function A(t, e) { var r = t, i = !1, n = (t.x + e.x) / 2, s = (t.y + e.y) / 2; do
                    r.y > s != r.next.y > s && n < (r.next.x - r.x) * (s - r.y) / (r.next.y - r.y) + r.x && (i = !i), r = r.next;
                while (r !== t); return i; }
                function M(t, e) { var r = new O(t.i, t.x, t.y), i = new O(e.i, e.x, e.y), n = t.next, s = e.prev; return t.next = e, e.prev = t, r.next = n, n.prev = r, i.next = r, r.prev = i, s.next = i, i.prev = s, i; }
                function R(t, e, r, i) { var n = new O(t, e, r); return i ? (n.next = i.next, n.prev = i, i.next.prev = n, i.next = n) : (n.prev = n, n.next = n), n; }
                function C(t) { t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ); }
                function O(t, e, r) { this.i = t, this.x = e, this.y = r, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1; }
                function D(t, e, r, i) { for (var n = 0, s = e, o = r - i; s < r; s += i)
                    n += (t[o] - t[s]) * (t[s + 1] + t[o + 1]), o = s; return n; }
                e.exports = i, i.deviation = function (t, e, r, i) { var n = e && e.length, s = n ? e[0] * r : t.length, o = Math.abs(D(t, 0, s, r)); if (n)
                    for (var a = 0, h = e.length; a < h; a++) {
                        var u = e[a] * r, l = a < h - 1 ? e[a + 1] * r : t.length;
                        o -= Math.abs(D(t, u, l, r));
                    } var c = 0; for (a = 0; a < i.length; a += 3) {
                    var d = i[a] * r, p = i[a + 1] * r, f = i[a + 2] * r;
                    c += Math.abs((t[d] - t[f]) * (t[p + 1] - t[d + 1]) - (t[d] - t[p]) * (t[f + 1] - t[d + 1]));
                } return 0 === o && 0 === c ? 0 : Math.abs((c - o) / o); }, i.flatten = function (t) { for (var e = t[0][0].length, r = { vertices: [], holes: [], dimensions: e }, i = 0, n = 0; n < t.length; n++) {
                    for (var s = 0; s < t[n].length; s++)
                        for (var o = 0; o < e; o++)
                            r.vertices.push(t[n][s][o]);
                    n > 0 && (i += t[n - 1].length, r.holes.push(i));
                } return r; };
            }, {}], 32: [function (t, e, r) {
                "use strict";
                function i(t, e, r) { this.fn = t, this.context = e, this.once = r || !1; }
                function n() { }
                var s = Object.prototype.hasOwnProperty, o = "function" != typeof Object.create && "~";
                n.prototype._events = void 0, n.prototype.eventNames = function () { var t, e = this._events, r = []; if (!e)
                    return r; for (t in e)
                    s.call(e, t) && r.push(o ? t.slice(1) : t); return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r; }, n.prototype.listeners = function (t, e) { var r = o ? o + t : t, i = this._events && this._events[r]; if (e)
                    return !!i; if (!i)
                    return []; if (i.fn)
                    return [i.fn]; for (var n = 0, s = i.length, a = new Array(s); n < s; n++)
                    a[n] = i[n].fn; return a; }, n.prototype.emit = function (t, e, r, i, n, s) { var a = o ? o + t : t; if (!this._events || !this._events[a])
                    return !1; var h, u, l = this._events[a], c = arguments.length; if ("function" == typeof l.fn) {
                    switch (l.once && this.removeListener(t, l.fn, void 0, !0), c) {
                        case 1: return l.fn.call(l.context), !0;
                        case 2: return l.fn.call(l.context, e), !0;
                        case 3: return l.fn.call(l.context, e, r), !0;
                        case 4: return l.fn.call(l.context, e, r, i), !0;
                        case 5: return l.fn.call(l.context, e, r, i, n), !0;
                        case 6: return l.fn.call(l.context, e, r, i, n, s), !0;
                    }
                    for (u = 1, h = new Array(c - 1); u < c; u++)
                        h[u - 1] = arguments[u];
                    l.fn.apply(l.context, h);
                }
                else {
                    var d, p = l.length;
                    for (u = 0; u < p; u++)
                        switch (l[u].once && this.removeListener(t, l[u].fn, void 0, !0), c) {
                            case 1:
                                l[u].fn.call(l[u].context);
                                break;
                            case 2:
                                l[u].fn.call(l[u].context, e);
                                break;
                            case 3:
                                l[u].fn.call(l[u].context, e, r);
                                break;
                            default:
                                if (!h)
                                    for (d = 1, h = new Array(c - 1); d < c; d++)
                                        h[d - 1] = arguments[d];
                                l[u].fn.apply(l[u].context, h);
                        }
                } return !0; }, n.prototype.on = function (t, e, r) {
                    var n = new i(e, r || this), s = o ? o + t : t;
                    return this._events || (this._events = o ? {} : Object.create(null)),
                        this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], n] : this._events[s].push(n) : this._events[s] = n, this;
                }, n.prototype.once = function (t, e, r) { var n = new i(e, r || this, (!0)), s = o ? o + t : t; return this._events || (this._events = o ? {} : Object.create(null)), this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], n] : this._events[s].push(n) : this._events[s] = n, this; }, n.prototype.removeListener = function (t, e, r, i) { var n = o ? o + t : t; if (!this._events || !this._events[n])
                    return this; var s = this._events[n], a = []; if (e)
                    if (s.fn)
                        (s.fn !== e || i && !s.once || r && s.context !== r) && a.push(s);
                    else
                        for (var h = 0, u = s.length; h < u; h++)
                            (s[h].fn !== e || i && !s[h].once || r && s[h].context !== r) && a.push(s[h]); return a.length ? this._events[n] = 1 === a.length ? a[0] : a : delete this._events[n], this; }, n.prototype.removeAllListeners = function (t) { return this._events ? (t ? delete this._events[o ? o + t : t] : this._events = o ? {} : Object.create(null), this) : this; }, n.prototype.off = n.prototype.removeListener, n.prototype.addListener = n.prototype.on, n.prototype.setMaxListeners = function () { return this; }, n.prefixed = o, "undefined" != typeof e && (e.exports = n);
            }, {}], 33: [function (e, r, i) { !function (e) { var i = /iPhone/i, n = /iPod/i, s = /iPad/i, o = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, a = /Android/i, h = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i, u = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i, l = /IEMobile/i, c = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, d = /BlackBerry/i, p = /BB10/i, f = /Opera Mini/i, v = /(CriOS|Chrome)(?=.*\bMobile\b)/i, g = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, y = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), x = function (t, e) { return t.test(e); }, m = function (t) { var e = t || navigator.userAgent, r = e.split("[FBAN"); if ("undefined" != typeof r[1] && (e = r[0]), r = e.split("Twitter"), "undefined" != typeof r[1] && (e = r[0]), this.apple = { phone: x(i, e), ipod: x(n, e), tablet: !x(i, e) && x(s, e), device: x(i, e) || x(n, e) || x(s, e) }, this.amazon = { phone: x(h, e), tablet: !x(h, e) && x(u, e), device: x(h, e) || x(u, e) }, this.android = { phone: x(h, e) || x(o, e), tablet: !x(h, e) && !x(o, e) && (x(u, e) || x(a, e)), device: x(h, e) || x(u, e) || x(o, e) || x(a, e) }, this.windows = { phone: x(l, e), tablet: x(c, e), device: x(l, e) || x(c, e) }, this.other = { blackberry: x(d, e), blackberry10: x(p, e), opera: x(f, e), firefox: x(g, e), chrome: x(v, e), device: x(d, e) || x(p, e) || x(f, e) || x(g, e) || x(v, e) }, this.seven_inch = x(y, e), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window)
                return this; }, _ = function () { var t = new m; return t.Class = m, t; }; "undefined" != typeof r && r.exports && "undefined" == typeof window ? r.exports = m : "undefined" != typeof r && r.exports && "undefined" != typeof window ? r.exports = _() : "function" == typeof t && t.amd ? t("isMobile", [], e.isMobile = _()) : e.isMobile = _(); }(this); }, {}], 34: [function (t, e, r) { function i(t, e, r) { switch (r.length) {
                case 0: return t.call(e);
                case 1: return t.call(e, r[0]);
                case 2: return t.call(e, r[0], r[1]);
                case 3: return t.call(e, r[0], r[1], r[2]);
            } return t.apply(e, r); } e.exports = i; }, {}], 35: [function (t, e, r) { function i(t, e) { for (var r = -1, i = t ? t.length : 0; ++r < i && e(t[r], r, t) !== !1;)
                ; return t; } e.exports = i; }, {}], 36: [function (t, e, r) { function i(t, e) { var r = o(t) || s(t) ? n(t.length, String) : [], i = r.length, h = !!i; for (var l in t)
                !e && !u.call(t, l) || h && ("length" == l || a(l, i)) || r.push(l); return r; } var n = t("./_baseTimes"), s = t("./isArguments"), o = t("./isArray"), a = t("./_isIndex"), h = Object.prototype, u = h.hasOwnProperty; e.exports = i; }, { "./_baseTimes": 39, "./_isIndex": 40, "./isArguments": 44, "./isArray": 45 }], 37: [function (t, e, r) { function i(t) { if (!n(t))
                return s(t); var e = []; for (var r in Object(t))
                a.call(t, r) && "constructor" != r && e.push(r); return e; } var n = t("./_isPrototype"), s = t("./_nativeKeys"), o = Object.prototype, a = o.hasOwnProperty; e.exports = i; }, { "./_isPrototype": 41, "./_nativeKeys": 42 }], 38: [function (t, e, r) { function i(t, e) { return e = s(void 0 === e ? t.length - 1 : e, 0), function () { for (var r = arguments, i = -1, o = s(r.length - e, 0), a = Array(o); ++i < o;)
                a[i] = r[e + i]; i = -1; for (var h = Array(e + 1); ++i < e;)
                h[i] = r[i]; return h[e] = a, n(t, this, h); }; } var n = t("./_apply"), s = Math.max; e.exports = i; }, { "./_apply": 34 }], 39: [function (t, e, r) { function i(t, e) { for (var r = -1, i = Array(t); ++r < t;)
                i[r] = e(r); return i; } e.exports = i; }, {}], 40: [function (t, e, r) { function i(t, e) { return e = null == e ? n : e, !!e && ("number" == typeof t || s.test(t)) && t > -1 && t % 1 == 0 && t < e; } var n = 9007199254740991, s = /^(?:0|[1-9]\d*)$/; e.exports = i; }, {}], 41: [function (t, e, r) { function i(t) { var e = t && t.constructor, r = "function" == typeof e && e.prototype || n; return t === r; } var n = Object.prototype; e.exports = i; }, {}], 42: [function (t, e, r) { var i = t("./_overArg"), n = i(Object.keys, Object); e.exports = n; }, { "./_overArg": 43 }], 43: [function (t, e, r) { function i(t, e) { return function (r) { return t(e(r)); }; } e.exports = i; }, {}], 44: [function (t, e, r) { function i(t) { return n(t) && a.call(t, "callee") && (!u.call(t, "callee") || h.call(t) == s); } var n = t("./isArrayLikeObject"), s = "[object Arguments]", o = Object.prototype, a = o.hasOwnProperty, h = o.toString, u = o.propertyIsEnumerable; e.exports = i; }, { "./isArrayLikeObject": 47 }], 45: [function (t, e, r) { var i = Array.isArray; e.exports = i; }, {}], 46: [function (t, e, r) { function i(t) { return null != t && s(t.length) && !n(t); } var n = t("./isFunction"), s = t("./isLength"); e.exports = i; }, { "./isFunction": 48, "./isLength": 49 }], 47: [function (t, e, r) { function i(t) { return s(t) && n(t); } var n = t("./isArrayLike"), s = t("./isObjectLike"); e.exports = i; }, { "./isArrayLike": 46, "./isObjectLike": 51 }], 48: [function (t, e, r) { function i(t) { var e = n(t) ? h.call(t) : ""; return e == s || e == o; } var n = t("./isObject"), s = "[object Function]", o = "[object GeneratorFunction]", a = Object.prototype, h = a.toString; e.exports = i; }, { "./isObject": 50 }], 49: [function (t, e, r) { function i(t) { return "number" == typeof t && t > -1 && t % 1 == 0 && t <= n; } var n = 9007199254740991; e.exports = i; }, {}], 50: [function (t, e, r) { function i(t) { var e = typeof t; return !!t && ("object" == e || "function" == e); } e.exports = i; }, {}], 51: [function (t, e, r) { function i(t) { return !!t && "object" == typeof t; } e.exports = i; }, {}], 52: [function (t, e, r) { function i(t) { return "symbol" == typeof t || n(t) && a.call(t) == s; } var n = t("./isObjectLike"), s = "[object Symbol]", o = Object.prototype, a = o.toString; e.exports = i; }, { "./isObjectLike": 51 }], 53: [function (t, e, r) { function i(t) { return o(t) ? n(t) : s(t); } var n = t("./_arrayLikeKeys"), s = t("./_baseKeys"), o = t("./isArrayLike"); e.exports = i; }, { "./_arrayLikeKeys": 36, "./_baseKeys": 37, "./isArrayLike": 46 }], 54: [function (t, e, r) { function i() { } e.exports = i; }, {}], 55: [function (t, e, r) { function i(t, e) { if ("function" != typeof t)
                throw new TypeError(o); return e = void 0 === e ? e : s(e), n(t, e); } var n = t("./_baseRest"), s = t("./toInteger"), o = "Expected a function"; e.exports = i; }, { "./_baseRest": 38, "./toInteger": 57 }], 56: [function (t, e, r) { function i(t) { if (!t)
                return 0 === t ? t : 0; if (t = n(t), t === s || t === -s) {
                var e = t < 0 ? -1 : 1;
                return e * o;
            } return t === t ? t : 0; } var n = t("./toNumber"), s = 1 / 0, o = 1.7976931348623157e308; e.exports = i; }, { "./toNumber": 58 }], 57: [function (t, e, r) { function i(t) { var e = n(t), r = e % 1; return e === e ? r ? e - r : e : 0; } var n = t("./toFinite"); e.exports = i; }, { "./toFinite": 56 }], 58: [function (t, e, r) { function i(t) { if ("number" == typeof t)
                return t; if (s(t))
                return o; if (n(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = n(e) ? e + "" : e;
            } if ("string" != typeof t)
                return 0 === t ? t : +t; t = t.replace(a, ""); var r = u.test(t); return r || l.test(t) ? c(t.slice(2), r ? 2 : 8) : h.test(t) ? o : +t; } var n = t("./isObject"), s = t("./isSymbol"), o = NaN, a = /^\s+|\s+$/g, h = /^[-+]0x[0-9a-f]+$/i, u = /^0b[01]+$/i, l = /^0o[0-7]+$/i, c = parseInt; e.exports = i; }, { "./isObject": 50, "./isSymbol": 52 }], 59: [function (t, e, r) {
                "use strict";
                function i(t) { if (null === t || void 0 === t)
                    throw new TypeError("Object.assign cannot be called with null or undefined"); return Object(t); }
                function n() { try {
                    if (!Object.assign)
                        return !1;
                    var t = new String("abc");
                    if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0])
                        return !1;
                    for (var e = {}, r = 0; r < 10; r++)
                        e["_" + String.fromCharCode(r)] = r;
                    var i = Object.getOwnPropertyNames(e).map(function (t) { return e[t]; });
                    if ("0123456789" !== i.join(""))
                        return !1;
                    var n = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function (t) { n[t] = t; }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("");
                }
                catch (t) {
                    return !1;
                } }
                var s = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
                e.exports = n() ? Object.assign : function (t, e) { for (var r, n, a = i(t), h = 1; h < arguments.length; h++) {
                    r = Object(arguments[h]);
                    for (var u in r)
                        s.call(r, u) && (a[u] = r[u]);
                    if (Object.getOwnPropertySymbols) {
                        n = Object.getOwnPropertySymbols(r);
                        for (var l = 0; l < n.length; l++)
                            o.call(r, n[l]) && (a[n[l]] = r[n[l]]);
                    }
                } return a; };
            }, {}], 60: [function (t, e, r) { (function (t) { function e(t, e) { for (var r = 0, i = t.length - 1; i >= 0; i--) {
                var n = t[i];
                "." === n ? t.splice(i, 1) : ".." === n ? (t.splice(i, 1), r++) : r && (t.splice(i, 1), r--);
            } if (e)
                for (; r--; r)
                    t.unshift(".."); return t; } function i(t, e) { if (t.filter)
                return t.filter(e); for (var r = [], i = 0; i < t.length; i++)
                e(t[i], i, t) && r.push(t[i]); return r; } var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, s = function (t) { return n.exec(t).slice(1); }; r.resolve = function () { for (var r = "", n = !1, s = arguments.length - 1; s >= -1 && !n; s--) {
                var o = s >= 0 ? arguments[s] : t.cwd();
                if ("string" != typeof o)
                    throw new TypeError("Arguments to path.resolve must be strings");
                o && (r = o + "/" + r, n = "/" === o.charAt(0));
            } return r = e(i(r.split("/"), function (t) { return !!t; }), !n).join("/"), (n ? "/" : "") + r || "."; }, r.normalize = function (t) { var n = r.isAbsolute(t), s = "/" === o(t, -1); return t = e(i(t.split("/"), function (t) { return !!t; }), !n).join("/"), t || n || (t = "."), t && s && (t += "/"), (n ? "/" : "") + t; }, r.isAbsolute = function (t) { return "/" === t.charAt(0); }, r.join = function () { var t = Array.prototype.slice.call(arguments, 0); return r.normalize(i(t, function (t, e) { if ("string" != typeof t)
                throw new TypeError("Arguments to path.join must be strings"); return t; }).join("/")); }, r.relative = function (t, e) { function i(t) { for (var e = 0; e < t.length && "" === t[e]; e++)
                ; for (var r = t.length - 1; r >= 0 && "" === t[r]; r--)
                ; return e > r ? [] : t.slice(e, r - e + 1); } t = r.resolve(t).substr(1), e = r.resolve(e).substr(1); for (var n = i(t.split("/")), s = i(e.split("/")), o = Math.min(n.length, s.length), a = o, h = 0; h < o; h++)
                if (n[h] !== s[h]) {
                    a = h;
                    break;
                } for (var u = [], h = a; h < n.length; h++)
                u.push(".."); return u = u.concat(s.slice(a)), u.join("/"); }, r.sep = "/", r.delimiter = ":", r.dirname = function (t) { var e = s(t), r = e[0], i = e[1]; return r || i ? (i && (i = i.substr(0, i.length - 1)), r + i) : "."; }, r.basename = function (t, e) { var r = s(t)[2]; return e && r.substr(-1 * e.length) === e && (r = r.substr(0, r.length - e.length)), r; }, r.extname = function (t) { return s(t)[3]; }; var o = "b" === "ab".substr(-1) ? function (t, e, r) { return t.substr(e, r); } : function (t, e, r) { return e < 0 && (e = t.length + e), t.substr(e, r); }; }).call(this, t("_process")); }, { _process: 61 }], 61: [function (t, e, r) { function i(t) { if (u === setTimeout)
                return setTimeout(t, 0); try {
                return u(t, 0);
            }
            catch (e) {
                try {
                    return u.call(null, t, 0);
                }
                catch (e) {
                    return u.call(this, t, 0);
                }
            } } function n(t) { if (l === clearTimeout)
                return clearTimeout(t); try {
                return l(t);
            }
            catch (e) {
                try {
                    return l.call(null, t);
                }
                catch (e) {
                    return l.call(this, t);
                }
            } } function s() { f && d && (f = !1, d.length ? p = d.concat(p) : v = -1, p.length && o()); } function o() { if (!f) {
                var t = i(s);
                f = !0;
                for (var e = p.length; e;) {
                    for (d = p, p = []; ++v < e;)
                        d && d[v].run();
                    v = -1, e = p.length;
                }
                d = null, f = !1, n(t);
            } } function a(t, e) { this.fun = t, this.array = e; } function h() { } var u, l, c = e.exports = {}; !function () { try {
                u = setTimeout;
            }
            catch (t) {
                u = function () { throw new Error("setTimeout is not defined"); };
            } try {
                l = clearTimeout;
            }
            catch (t) {
                l = function () { throw new Error("clearTimeout is not defined"); };
            } }(); var d, p = [], f = !1, v = -1; c.nextTick = function (t) { var e = new Array(arguments.length - 1); if (arguments.length > 1)
                for (var r = 1; r < arguments.length; r++)
                    e[r - 1] = arguments[r]; p.push(new a(t, e)), 1 !== p.length || f || i(o); }, a.prototype.run = function () { this.fun.apply(null, this.array); }, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = h, c.addListener = h, c.once = h, c.off = h, c.removeListener = h, c.removeAllListeners = h, c.emit = h, c.binding = function (t) { throw new Error("process.binding is not supported"); }, c.cwd = function () { return "/"; }, c.chdir = function (t) { throw new Error("process.chdir is not supported"); }, c.umask = function () { return 0; }; }, {}], 62: [function (e, r, i) { (function (e) { !function (n) { function s(t) { throw new RangeError(L[t]); } function o(t, e) { for (var r = t.length, i = []; r--;)
                i[r] = e(t[r]); return i; } function a(t, e) { var r = t.split("@"), i = ""; r.length > 1 && (i = r[0] + "@", t = r[1]), t = t.replace(I, "."); var n = t.split("."), s = o(n, e).join("."); return i + s; } function h(t) { for (var e, r, i = [], n = 0, s = t.length; n < s;)
                e = t.charCodeAt(n++), e >= 55296 && e <= 56319 && n < s ? (r = t.charCodeAt(n++), 56320 == (64512 & r) ? i.push(((1023 & e) << 10) + (1023 & r) + 65536) : (i.push(e), n--)) : i.push(e); return i; } function u(t) { return o(t, function (t) { var e = ""; return t > 65535 && (t -= 65536, e += B(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += B(t); }).join(""); } function l(t) { return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : E; } function c(t, e) { return t + 22 + 75 * (t < 26) - ((0 != e) << 5); } function d(t, e, r) { var i = 0; for (t = r ? N(t / M) : t >> 1, t += N(t / e); t > F * S >> 1; i += E)
                t = N(t / F); return N(i + (F + 1) * t / (t + A)); } function p(t) { var e, r, i, n, o, a, h, c, p, f, v = [], g = t.length, y = 0, x = C, m = R; for (r = t.lastIndexOf(O), r < 0 && (r = 0), i = 0; i < r; ++i)
                t.charCodeAt(i) >= 128 && s("not-basic"), v.push(t.charCodeAt(i)); for (n = r > 0 ? r + 1 : 0; n < g;) {
                for (o = y, a = 1, h = E; n >= g && s("invalid-input"), c = l(t.charCodeAt(n++)), (c >= E || c > N((T - y) / a)) && s("overflow"), y += c * a, p = h <= m ? w : h >= m + S ? S : h - m, !(c < p); h += E)
                    f = E - p, a > N(T / f) && s("overflow"), a *= f;
                e = v.length + 1, m = d(y - o, e, 0 == o), N(y / e) > T - x && s("overflow"), x += N(y / e), y %= e, v.splice(y++, 0, x);
            } return u(v); } function f(t) { var e, r, i, n, o, a, u, l, p, f, v, g, y, x, m, _ = []; for (t = h(t), g = t.length, e = C, r = 0, o = R, a = 0; a < g; ++a)
                v = t[a], v < 128 && _.push(B(v)); for (i = n = _.length, n && _.push(O); i < g;) {
                for (u = T, a = 0; a < g; ++a)
                    v = t[a], v >= e && v < u && (u = v);
                for (y = i + 1, u - e > N((T - r) / y) && s("overflow"), r += (u - e) * y, e = u, a = 0; a < g; ++a)
                    if (v = t[a], v < e && ++r > T && s("overflow"), v == e) {
                        for (l = r, p = E; f = p <= o ? w : p >= o + S ? S : p - o, !(l < f); p += E)
                            m = l - f, x = E - f, _.push(B(c(f + m % x, 0))), l = N(m / x);
                        _.push(B(c(l, 0))), o = d(r, y, i == n), r = 0, ++i;
                    }
                ++r, ++e;
            } return _.join(""); } function v(t) { return a(t, function (t) { return D.test(t) ? p(t.slice(4).toLowerCase()) : t; }); } function g(t) { return a(t, function (t) { return P.test(t) ? "xn--" + f(t) : t; }); } var y = "object" == typeof i && i && !i.nodeType && i, x = "object" == typeof r && r && !r.nodeType && r, m = "object" == typeof e && e; m.global !== m && m.window !== m && m.self !== m || (n = m); var _, b, T = 2147483647, E = 36, w = 1, S = 26, A = 38, M = 700, R = 72, C = 128, O = "-", D = /^xn--/, P = /[^\x20-\x7E]/, I = /[\x2E\u3002\uFF0E\uFF61]/g, L = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, F = E - w, N = Math.floor, B = String.fromCharCode; if (_ = { version: "1.4.1", ucs2: { decode: h, encode: u }, decode: p, encode: f, toASCII: g, toUnicode: v }, "function" == typeof t && "object" == typeof t.amd && t.amd)
                t("punycode", function () { return _; });
            else if (y && x)
                if (r.exports == y)
                    x.exports = _;
                else
                    for (b in _)
                        _.hasOwnProperty(b) && (y[b] = _[b]);
            else
                n.punycode = _; }(this); }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}); }, {}], 63: [function (t, e, r) {
                "use strict";
                function i(t, e) { return Object.prototype.hasOwnProperty.call(t, e); }
                e.exports = function (t, e, r, s) { e = e || "&", r = r || "="; var o = {}; if ("string" != typeof t || 0 === t.length)
                    return o; var a = /\+/g; t = t.split(e); var h = 1e3; s && "number" == typeof s.maxKeys && (h = s.maxKeys); var u = t.length; h > 0 && u > h && (u = h); for (var l = 0; l < u; ++l) {
                    var c, d, p, f, v = t[l].replace(a, "%20"), g = v.indexOf(r);
                    g >= 0 ? (c = v.substr(0, g), d = v.substr(g + 1)) : (c = v, d = ""), p = decodeURIComponent(c), f = decodeURIComponent(d), i(o, p) ? n(o[p]) ? o[p].push(f) : o[p] = [o[p], f] : o[p] = f;
                } return o; };
                var n = Array.isArray || function (t) { return "[object Array]" === Object.prototype.toString.call(t); };
            }, {}], 64: [function (t, e, r) {
                "use strict";
                function i(t, e) { if (t.map)
                    return t.map(e); for (var r = [], i = 0; i < t.length; i++)
                    r.push(e(t[i], i)); return r; }
                var n = function (t) { switch (typeof t) {
                    case "string": return t;
                    case "boolean": return t ? "true" : "false";
                    case "number": return isFinite(t) ? t : "";
                    default: return "";
                } };
                e.exports = function (t, e, r, a) { return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == typeof t ? i(o(t), function (o) { var a = encodeURIComponent(n(o)) + r; return s(t[o]) ? i(t[o], function (t) { return a + encodeURIComponent(n(t)); }).join(e) : a + encodeURIComponent(n(t[o])); }).join(e) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t)) : ""; };
                var s = Array.isArray || function (t) { return "[object Array]" === Object.prototype.toString.call(t); }, o = Object.keys || function (t) { var e = []; for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && e.push(r); return e; };
            }, {}], 65: [function (t, e, r) {
                "use strict";
                r.decode = r.parse = t("./decode"), r.encode = r.stringify = t("./encode");
            }, { "./decode": 63, "./encode": 64 }], 66: [function (t, e, r) {
                "use strict";
                function i(t, e) { h.call(this), e = e || u, this.baseUrl = t || "", this.progress = 0, this.loading = !1, this._progressChunk = 0, this._beforeMiddleware = [], this._afterMiddleware = [], this._boundLoadResource = this._loadResource.bind(this), this._buffer = [], this._numToLoad = 0, this._queue = n(this._boundLoadResource, e), this.resources = {}; }
                var n = t("async/queue"), s = t("async/eachSeries"), o = t("url"), a = t("./Resource"), h = t("eventemitter3"), u = 10, l = 100;
                i.prototype = Object.create(h.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.add = i.prototype.enqueue = function (t, e, r, i) { if (Array.isArray(t)) {
                    for (var n = 0; n < t.length; ++n)
                        this.add(t[n]);
                    return this;
                } if ("object" == typeof t && (i = e || t.callback || t.onComplete, r = t, e = t.url, t = t.name || t.key || t.url), "string" != typeof e && (i = r, r = e, e = t), "string" != typeof e)
                    throw new Error("No url passed to add resource to loader."); if ("function" == typeof r && (i = r, r = null), this.resources[t])
                    throw new Error('Resource with name "' + t + '" already exists.'); return e = this._prepareUrl(e), this.resources[t] = new a(t, e, r), "function" == typeof i && this.resources[t].once("afterMiddleware", i), this._numToLoad++, this._queue.started ? (this._queue.push(this.resources[t]), this._progressChunk = (l - this.progress) / (this._queue.length() + this._queue.running())) : (this._buffer.push(this.resources[t]), this._progressChunk = l / this._buffer.length), this; }, i.prototype.before = i.prototype.pre = function (t) { return this._beforeMiddleware.push(t), this; }, i.prototype.after = i.prototype.use = function (t) { return this._afterMiddleware.push(t), this; }, i.prototype.reset = function () { this.progress = 0, this.loading = !1, this._progressChunk = 0, this._buffer.length = 0, this._numToLoad = 0, this._queue.kill(), this._queue.started = !1; for (var t in this.resources) {
                    var e = this.resources[t];
                    e.off("complete", this._onLoad, this), e.isLoading && e.abort();
                } return this.resources = {}, this; }, i.prototype.load = function (t) { if ("function" == typeof t && this.once("complete", t), this._queue.started)
                    return this; this.emit("start", this), this.loading = !0; for (var e = 0; e < this._buffer.length; ++e)
                    this._queue.push(this._buffer[e]); return this._buffer.length = 0, this; }, i.prototype._prepareUrl = function (t) { var e = o.parse(t); return e.protocol || !e.pathname || 0 === e.pathname.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t; }, i.prototype._loadResource = function (t, e) { var r = this; t._dequeue = e, s(this._beforeMiddleware, function (e, i) { e.call(r, t, function () { i(t.isComplete ? {} : null); }); }, function () { t.isComplete ? r._onLoad(t) : (t.once("complete", r._onLoad, r), t.load()); }); }, i.prototype._onComplete = function () { this.loading = !1, this.emit("complete", this, this.resources); }, i.prototype._onLoad = function (t) { var e = this; s(this._afterMiddleware, function (r, i) { r.call(e, t, i); }, function () { t.emit("afterMiddleware", t), e._numToLoad--, e.progress += e._progressChunk, e.emit("progress", e, t), t.error ? e.emit("error", t.error, e, t) : e.emit("load", e, t), 0 === e._numToLoad && (e.progress = 100, e._onComplete()); }), t._dequeue(); }, i.LOAD_TYPE = a.LOAD_TYPE, i.XHR_RESPONSE_TYPE = a.XHR_RESPONSE_TYPE;
            }, { "./Resource": 67, "async/eachSeries": 18, "async/queue": 29, eventemitter3: 32, url: 72 }], 67: [function (t, e, r) {
                "use strict";
                function i(t, e, r) { if (o.call(this), r = r || {}, "string" != typeof t || "string" != typeof e)
                    throw new Error("Both name and url are required for constructing a resource."); this.name = t, this.url = e, this.isDataUrl = 0 === this.url.indexOf("data:"), this.data = null, this.crossOrigin = r.crossOrigin === !0 ? "anonymous" : r.crossOrigin, this.loadType = r.loadType || this._determineLoadType(), this.xhrType = r.xhrType, this.metadata = r.metadata || {}, this.error = null, this.xhr = null, this.isJson = !1, this.isXml = !1, this.isImage = !1, this.isAudio = !1, this.isVideo = !1, this.isComplete = !1, this.isLoading = !1, this._dequeue = null, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this); }
                function n(t) { return t.toString().replace("object ", ""); }
                function s(t, e, r) { e && 0 === e.indexOf(".") && (e = e.substring(1)), e && (t[e] = r); }
                var o = t("eventemitter3"), a = t("url"), h = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest), u = null, l = 0, c = 200, d = 204;
                i.prototype = Object.create(o.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.complete = function () { if (this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), this.isComplete)
                    throw new Error("Complete called again for an already completed resource."); this.isComplete = !0, this.isLoading = !1, this.emit("complete", this); }, i.prototype.abort = function (t) { if (!this.error) {
                    if (this.error = new Error(t), this.xhr)
                        this.xhr.abort();
                    else if (this.xdr)
                        this.xdr.abort();
                    else if (this.data)
                        if ("undefined" != typeof this.data.src)
                            this.data.src = "";
                        else
                            for (; this.data.firstChild;)
                                this.data.removeChild(this.data.firstChild);
                    this.complete();
                } }, i.prototype.load = function (t) { if (!this.isLoading)
                    if (this.isComplete) {
                        if (t) {
                            var e = this;
                            setTimeout(function () { t(e); }, 1);
                        }
                    }
                    else
                        switch (t && this.once("complete", t), this.isLoading = !0, this.emit("start", this), this.crossOrigin !== !1 && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
                            case i.LOAD_TYPE.IMAGE:
                                this._loadElement("image");
                                break;
                            case i.LOAD_TYPE.AUDIO:
                                this._loadSourceElement("audio");
                                break;
                            case i.LOAD_TYPE.VIDEO:
                                this._loadSourceElement("video");
                                break;
                            case i.LOAD_TYPE.XHR:
                            default: h && this.crossOrigin ? this._loadXdr() : this._loadXhr();
                        } }, i.prototype._loadElement = function (t) { this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === t && "undefined" != typeof window.Image ? this.data = new Image : this.data = document.createElement(t), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url); var e = "is" + t[0].toUpperCase() + t.substring(1); this[e] === !1 && (this[e] = !0), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1); }, i.prototype._loadSourceElement = function (t) { if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === t && "undefined" != typeof window.Audio ? this.data = new Audio : this.data = document.createElement(t), null === this.data)
                    return void this.abort("Unsupported element " + t); if (!this.metadata.skipSource)
                    if (navigator.isCocoonJS)
                        this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
                    else if (Array.isArray(this.url))
                        for (var e = 0; e < this.url.length; ++e)
                            this.data.appendChild(this._createSource(t, this.url[e]));
                    else
                        this.data.appendChild(this._createSource(t, this.url)); this["is" + t[0].toUpperCase() + t.substring(1)] = !0, this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(); }, i.prototype._loadXhr = function () { "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType()); var t = this.xhr = new XMLHttpRequest; t.open("GET", this.url, !0), this.xhrType === i.XHR_RESPONSE_TYPE.JSON || this.xhrType === i.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = i.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType, t.addEventListener("error", this._boundXhrOnError, !1), t.addEventListener("abort", this._boundXhrOnAbort, !1), t.addEventListener("progress", this._boundOnProgress, !1), t.addEventListener("load", this._boundXhrOnLoad, !1), t.send(); }, i.prototype._loadXdr = function () { "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType()); var t = this.xhr = new XDomainRequest; t.timeout = 5e3, t.onerror = this._boundXhrOnError, t.ontimeout = this._boundXdrOnTimeout, t.onprogress = this._boundOnProgress, t.onload = this._boundXhrOnLoad, t.open("GET", this.url, !0), setTimeout(function () { t.send(); }, 0); }, i.prototype._createSource = function (t, e, r) { r || (r = t + "/" + e.substr(e.lastIndexOf(".") + 1)); var i = document.createElement("source"); return i.src = e, i.type = r, i; }, i.prototype._onError = function (t) { this.abort("Failed to load element using " + t.target.nodeName); }, i.prototype._onProgress = function (t) { t && t.lengthComputable && this.emit("progress", this, t.loaded / t.total); }, i.prototype._xhrOnError = function () { var t = this.xhr; this.abort(n(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"'); }, i.prototype._xhrOnAbort = function () { this.abort(n(this.xhr) + " Request was aborted by the user."); }, i.prototype._xdrOnTimeout = function () { this.abort(n(this.xhr) + " Request timed out."); }, i.prototype._xhrOnLoad = function () { var t = this.xhr, e = "undefined" == typeof t.status ? t.status : c; if (!(e === c || e === d || e === l && t.responseText.length > 0))
                    return void this.abort("[" + t.status + "]" + t.statusText + ":" + t.responseURL); if (this.xhrType === i.XHR_RESPONSE_TYPE.TEXT)
                    this.data = t.responseText;
                else if (this.xhrType === i.XHR_RESPONSE_TYPE.JSON)
                    try {
                        this.data = JSON.parse(t.responseText), this.isJson = !0;
                    }
                    catch (t) {
                        return void this.abort("Error trying to parse loaded json:", t);
                    }
                else if (this.xhrType === i.XHR_RESPONSE_TYPE.DOCUMENT)
                    try {
                        if (window.DOMParser) {
                            var r = new DOMParser;
                            this.data = r.parseFromString(t.responseText, "text/xml");
                        }
                        else {
                            var n = document.createElement("div");
                            n.innerHTML = t.responseText, this.data = n;
                        }
                        this.isXml = !0;
                    }
                    catch (t) {
                        return void this.abort("Error trying to parse loaded xml:", t);
                    }
                else
                    this.data = t.response || t.responseText; this.complete(); }, i.prototype._determineCrossOrigin = function (t, e) { if (0 === t.indexOf("data:"))
                    return ""; e = e || window.location, u || (u = document.createElement("a")), u.href = t, t = a.parse(u.href); var r = !t.port && "" === e.port || t.port === e.port; return t.hostname === e.hostname && r && t.protocol === e.protocol ? "" : "anonymous"; }, i.prototype._determineXhrType = function () { return i._xhrTypeMap[this._getExtension()] || i.XHR_RESPONSE_TYPE.TEXT; }, i.prototype._determineLoadType = function () { return i._loadTypeMap[this._getExtension()] || i.LOAD_TYPE.XHR; }, i.prototype._getExtension = function () { var t = this.url, e = ""; if (this.isDataUrl) {
                    var r = t.indexOf("/");
                    e = t.substring(r + 1, t.indexOf(";", r));
                }
                else {
                    var i = t.indexOf("?");
                    i !== -1 && (t = t.substring(0, i)), e = t.substring(t.lastIndexOf(".") + 1);
                } return e.toLowerCase(); }, i.prototype._getMimeFromXhrType = function (t) { switch (t) {
                    case i.XHR_RESPONSE_TYPE.BUFFER: return "application/octet-binary";
                    case i.XHR_RESPONSE_TYPE.BLOB: return "application/blob";
                    case i.XHR_RESPONSE_TYPE.DOCUMENT: return "application/xml";
                    case i.XHR_RESPONSE_TYPE.JSON: return "application/json";
                    case i.XHR_RESPONSE_TYPE.DEFAULT:
                    case i.XHR_RESPONSE_TYPE.TEXT:
                    default: return "text/plain";
                } }, i.LOAD_TYPE = { XHR: 1, IMAGE: 2, AUDIO: 3, VIDEO: 4 }, i.XHR_RESPONSE_TYPE = { DEFAULT: "text", BUFFER: "arraybuffer", BLOB: "blob", DOCUMENT: "document", JSON: "json", TEXT: "text" }, i._loadTypeMap = { gif: i.LOAD_TYPE.IMAGE, png: i.LOAD_TYPE.IMAGE, bmp: i.LOAD_TYPE.IMAGE, jpg: i.LOAD_TYPE.IMAGE, jpeg: i.LOAD_TYPE.IMAGE, tif: i.LOAD_TYPE.IMAGE, tiff: i.LOAD_TYPE.IMAGE, webp: i.LOAD_TYPE.IMAGE, tga: i.LOAD_TYPE.IMAGE, "svg+xml": i.LOAD_TYPE.IMAGE }, i._xhrTypeMap = { xhtml: i.XHR_RESPONSE_TYPE.DOCUMENT, html: i.XHR_RESPONSE_TYPE.DOCUMENT, htm: i.XHR_RESPONSE_TYPE.DOCUMENT, xml: i.XHR_RESPONSE_TYPE.DOCUMENT, tmx: i.XHR_RESPONSE_TYPE.DOCUMENT, tsx: i.XHR_RESPONSE_TYPE.DOCUMENT, svg: i.XHR_RESPONSE_TYPE.DOCUMENT, gif: i.XHR_RESPONSE_TYPE.BLOB, png: i.XHR_RESPONSE_TYPE.BLOB, bmp: i.XHR_RESPONSE_TYPE.BLOB, jpg: i.XHR_RESPONSE_TYPE.BLOB, jpeg: i.XHR_RESPONSE_TYPE.BLOB, tif: i.XHR_RESPONSE_TYPE.BLOB, tiff: i.XHR_RESPONSE_TYPE.BLOB, webp: i.XHR_RESPONSE_TYPE.BLOB, tga: i.XHR_RESPONSE_TYPE.BLOB, json: i.XHR_RESPONSE_TYPE.JSON, text: i.XHR_RESPONSE_TYPE.TEXT, txt: i.XHR_RESPONSE_TYPE.TEXT }, i.setExtensionLoadType = function (t, e) { s(i._loadTypeMap, t, e); }, i.setExtensionXhrType = function (t, e) { s(i._xhrTypeMap, t, e); };
            }, { eventemitter3: 32, url: 72 }], 68: [function (t, e, r) {
                "use strict";
                e.exports = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encodeBinary: function (t) { for (var e, r = "", i = new Array(4), n = 0, s = 0, o = 0; n < t.length;) {
                        for (e = new Array(3), s = 0; s < e.length; s++)
                            n < t.length ? e[s] = 255 & t.charCodeAt(n++) : e[s] = 0;
                        switch (i[0] = e[0] >> 2, i[1] = (3 & e[0]) << 4 | e[1] >> 4, i[2] = (15 & e[1]) << 2 | e[2] >> 6, i[3] = 63 & e[2], o = n - (t.length - 1)) {
                            case 2:
                                i[3] = 64, i[2] = 64;
                                break;
                            case 1: i[3] = 64;
                        }
                        for (s = 0; s < i.length; s++)
                            r += this._keyStr.charAt(i[s]);
                    } return r; } };
            }, {}], 69: [function (t, e, r) {
                "use strict";
                e.exports = t("./Loader"), e.exports.Resource = t("./Resource"), e.exports.middleware = { caching: { memory: t("./middlewares/caching/memory") }, parsing: { blob: t("./middlewares/parsing/blob") } };
            }, { "./Loader": 66, "./Resource": 67, "./middlewares/caching/memory": 70, "./middlewares/parsing/blob": 71 }], 70: [function (t, e, r) {
                "use strict";
                var i = {};
                e.exports = function () { return function (t, e) { i[t.url] ? (t.data = i[t.url], t.complete()) : t.once("complete", function () { i[this.url] = this.data; }), e(); }; };
            }, {}], 71: [function (t, e, r) {
                "use strict";
                var i = t("../../Resource"), n = t("../../b64"), s = window.URL || window.webkitURL;
                e.exports = function () { return function (t, e) { if (!t.data)
                    return void e(); if (t.xhr && t.xhrType === i.XHR_RESPONSE_TYPE.BLOB)
                    if (window.Blob && "string" != typeof t.data) {
                        if (0 === t.data.type.indexOf("image")) {
                            var r = s.createObjectURL(t.data);
                            return t.blob = t.data, t.data = new Image, t.data.src = r, t.isImage = !0, void (t.data.onload = function () { s.revokeObjectURL(r), t.data.onload = null, e(); });
                        }
                    }
                    else {
                        var o = t.xhr.getResponseHeader("content-type");
                        if (o && 0 === o.indexOf("image"))
                            return t.data = new Image, t.data.src = "data:" + o + ";base64," + n.encodeBinary(t.xhr.responseText), t.isImage = !0, void (t.data.onload = function () { t.data.onload = null, e(); });
                    } e(); }; };
            }, { "../../Resource": 67, "../../b64": 68 }], 72: [function (t, e, r) {
                "use strict";
                function i() { this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null; }
                function n(t, e, r) { if (t && u.isObject(t) && t instanceof i)
                    return t; var n = new i; return n.parse(t, e, r), n; }
                function s(t) { return u.isString(t) && (t = n(t)), t instanceof i ? t.format() : i.prototype.format.call(t); }
                function o(t, e) { return n(t, !1, !0).resolve(e); }
                function a(t, e) { return t ? n(t, !1, !0).resolveObject(e) : e; }
                var h = t("punycode"), u = t("./util");
                r.parse = n, r.resolve = o, r.resolveObject = a, r.format = s, r.Url = i;
                var l = /^([a-z0-9.+-]+:)/i, c = /:[0-9]*$/, d = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, p = ["<", ">", '"', "`", " ", "\r", "\n", "\t"], f = ["{", "}", "|", "\\", "^", "`"].concat(p), v = ["'"].concat(f), g = ["%", "/", "?", ";", "#"].concat(v), y = ["/", "?", "#"], x = 255, m = /^[+a-z0-9A-Z_-]{0,63}$/, _ = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, b = { javascript: !0, "javascript:": !0 }, T = { javascript: !0, "javascript:": !0 }, E = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 }, w = t("querystring");
                i.prototype.parse = function (t, e, r) {
                    if (!u.isString(t))
                        throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                    var i = t.indexOf("?"), n = i !== -1 && i < t.indexOf("#") ? "?" : "#", s = t.split(n), o = /\\/g;
                    s[0] = s[0].replace(o, "/"), t = s.join(n);
                    var a = t;
                    if (a = a.trim(), !r && 1 === t.split("#").length) {
                        var c = d.exec(a);
                        if (c)
                            return this.path = a, this.href = a, this.pathname = c[1], c[2] ? (this.search = c[2], e ? this.query = w.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : e && (this.search = "", this.query = {}), this;
                    }
                    var p = l.exec(a);
                    if (p) {
                        p = p[0];
                        var f = p.toLowerCase();
                        this.protocol = f, a = a.substr(p.length);
                    }
                    if (r || p || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                        var S = "//" === a.substr(0, 2);
                        !S || p && T[p] || (a = a.substr(2), this.slashes = !0);
                    }
                    if (!T[p] && (S || p && !E[p])) {
                        for (var A = -1, M = 0; M < y.length; M++) {
                            var R = a.indexOf(y[M]);
                            R !== -1 && (A === -1 || R < A) && (A = R);
                        }
                        var C, O;
                        O = A === -1 ? a.lastIndexOf("@") : a.lastIndexOf("@", A), O !== -1 && (C = a.slice(0, O), a = a.slice(O + 1), this.auth = decodeURIComponent(C)), A = -1;
                        for (var M = 0; M < g.length; M++) {
                            var R = a.indexOf(g[M]);
                            R !== -1 && (A === -1 || R < A) && (A = R);
                        }
                        A === -1 && (A = a.length), this.host = a.slice(0, A), a = a.slice(A), this.parseHost(), this.hostname = this.hostname || "";
                        var D = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                        if (!D)
                            for (var P = this.hostname.split(/\./), M = 0, I = P.length; M < I; M++) {
                                var L = P[M];
                                if (L && !L.match(m)) {
                                    for (var F = "", N = 0, B = L.length; N < B; N++)
                                        F += L.charCodeAt(N) > 127 ? "x" : L[N];
                                    if (!F.match(m)) {
                                        var k = P.slice(0, M), U = P.slice(M + 1), j = L.match(_);
                                        j && (k.push(j[1]), U.unshift(j[2])), U.length && (a = "/" + U.join(".") + a), this.hostname = k.join(".");
                                        break;
                                    }
                                }
                            }
                        this.hostname.length > x ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), D || (this.hostname = h.toASCII(this.hostname));
                        var W = this.port ? ":" + this.port : "", X = this.hostname || "";
                        this.host = X + W, this.href += this.host, D && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== a[0] && (a = "/" + a));
                    }
                    if (!b[f])
                        for (var M = 0, I = v.length; M < I; M++) {
                            var G = v[M];
                            if (a.indexOf(G) !== -1) {
                                var H = encodeURIComponent(G);
                                H === G && (H = escape(G)), a = a.split(G).join(H);
                            }
                        }
                    var z = a.indexOf("#");
                    z !== -1 && (this.hash = a.substr(z), a = a.slice(0, z));
                    var V = a.indexOf("?");
                    if (V !== -1 ? (this.search = a.substr(V), this.query = a.substr(V + 1), e && (this.query = w.parse(this.query)), a = a.slice(0, V)) : e && (this.search = "", this.query = {}), a && (this.pathname = a), E[f] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                        var W = this.pathname || "", Y = this.search || "";
                        this.path = W + Y;
                    }
                    return this.href = this.format(), this;
                }, i.prototype.format = function () { var t = this.auth || ""; t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@"); var e = this.protocol || "", r = this.pathname || "", i = this.hash || "", n = !1, s = ""; this.host ? n = t + this.host : this.hostname && (n = t + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && u.isObject(this.query) && Object.keys(this.query).length && (s = w.stringify(this.query)); var o = this.search || s && "?" + s || ""; return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || E[e]) && n !== !1 ? (n = "//" + (n || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : n || (n = ""), i && "#" !== i.charAt(0) && (i = "#" + i), o && "?" !== o.charAt(0) && (o = "?" + o), r = r.replace(/[?#]/g, function (t) { return encodeURIComponent(t); }), o = o.replace("#", "%23"), e + n + r + o + i; }, i.prototype.resolve = function (t) { return this.resolveObject(n(t, !1, !0)).format(); }, i.prototype.resolveObject = function (t) { if (u.isString(t)) {
                    var e = new i;
                    e.parse(t, !1, !0), t = e;
                } for (var r = new i, n = Object.keys(this), s = 0; s < n.length; s++) {
                    var o = n[s];
                    r[o] = this[o];
                } if (r.hash = t.hash, "" === t.href)
                    return r.href = r.format(), r; if (t.slashes && !t.protocol) {
                    for (var a = Object.keys(t), h = 0; h < a.length; h++) {
                        var l = a[h];
                        "protocol" !== l && (r[l] = t[l]);
                    }
                    return E[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
                } if (t.protocol && t.protocol !== r.protocol) {
                    if (!E[t.protocol]) {
                        for (var c = Object.keys(t), d = 0; d < c.length; d++) {
                            var p = c[d];
                            r[p] = t[p];
                        }
                        return r.href = r.format(), r;
                    }
                    if (r.protocol = t.protocol, t.host || T[t.protocol])
                        r.pathname = t.pathname;
                    else {
                        for (var f = (t.pathname || "").split("/"); f.length && !(t.host = f.shift());)
                            ;
                        t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== f[0] && f.unshift(""), f.length < 2 && f.unshift(""), r.pathname = f.join("/");
                    }
                    if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
                        var v = r.pathname || "", g = r.search || "";
                        r.path = v + g;
                    }
                    return r.slashes = r.slashes || t.slashes, r.href = r.format(), r;
                } var y = r.pathname && "/" === r.pathname.charAt(0), x = t.host || t.pathname && "/" === t.pathname.charAt(0), m = x || y || r.host && t.pathname, _ = m, b = r.pathname && r.pathname.split("/") || [], f = t.pathname && t.pathname.split("/") || [], w = r.protocol && !E[r.protocol]; if (w && (r.hostname = "", r.port = null, r.host && ("" === b[0] ? b[0] = r.host : b.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === f[0] ? f[0] = t.host : f.unshift(t.host)), t.host = null), m = m && ("" === f[0] || "" === b[0])), x)
                    r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, b = f;
                else if (f.length)
                    b || (b = []), b.pop(), b = b.concat(f), r.search = t.search, r.query = t.query;
                else if (!u.isNullOrUndefined(t.search)) {
                    if (w) {
                        r.hostname = r.host = b.shift();
                        var S = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
                        S && (r.auth = S.shift(), r.host = r.hostname = S.shift());
                    }
                    return r.search = t.search, r.query = t.query, u.isNull(r.pathname) && u.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
                } if (!b.length)
                    return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r; for (var A = b.slice(-1)[0], M = (r.host || t.host || b.length > 1) && ("." === A || ".." === A) || "" === A, R = 0, C = b.length; C >= 0; C--)
                    A = b[C], "." === A ? b.splice(C, 1) : ".." === A ? (b.splice(C, 1), R++) : R && (b.splice(C, 1), R--); if (!m && !_)
                    for (; R--; R)
                        b.unshift(".."); !m || "" === b[0] || b[0] && "/" === b[0].charAt(0) || b.unshift(""), M && "/" !== b.join("/").substr(-1) && b.push(""); var O = "" === b[0] || b[0] && "/" === b[0].charAt(0); if (w) {
                    r.hostname = r.host = O ? "" : b.length ? b.shift() : "";
                    var S = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
                    S && (r.auth = S.shift(), r.host = r.hostname = S.shift());
                } return m = m || r.host && b.length, m && !O && b.unshift(""), b.length ? r.pathname = b.join("/") : (r.pathname = null, r.path = null), u.isNull(r.pathname) && u.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r; }, i.prototype.parseHost = function () { var t = this.host, e = c.exec(t); e && (e = e[0], ":" !== e && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t); };
            }, { "./util": 73, punycode: 62, querystring: 65 }], 73: [function (t, e, r) {
                "use strict";
                e.exports = { isString: function (t) { return "string" == typeof t; }, isObject: function (t) { return "object" == typeof t && null !== t; }, isNull: function (t) { return null === t; }, isNullOrUndefined: function (t) { return null == t; } };
            }, {}], 74: [function (t, e, r) { function i(t) { (s.tablet || s.phone) && this.createTouchHook(); var e = document.createElement("div"); e.style.width = "100px", e.style.height = "100px", e.style.position = "absolute", e.style.top = 0, e.style.left = 0, e.style.zIndex = 2, this.div = e, this.pool = [], this.renderId = 0, this.debug = !1, this.renderer = t, this.children = [], this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this.isActive = !1, this.isMobileAccessabillity = !1, window.addEventListener("keydown", this._onKeyDown, !1); } var n = t("../core"), s = t("ismobilejs"); Object.assign(n.DisplayObject.prototype, t("./accessibleTarget")), i.prototype.constructor = i, e.exports = i, i.prototype.createTouchHook = function () { var t = document.createElement("button"); t.style.width = "1px", t.style.height = "1px", t.style.position = "absolute", t.style.top = "-1000px", t.style.left = "-1000px", t.style.zIndex = 2, t.style.backgroundColor = "#FF0000", t.title = "HOOK DIV", t.addEventListener("focus", function () { this.isMobileAccessabillity = !0, this.activate(), document.body.removeChild(t); }.bind(this)), document.body.appendChild(t); }, i.prototype.activate = function () { this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode && this.renderer.view.parentNode.appendChild(this.div)); }, i.prototype.deactivate = function () { this.isActive && !this.isMobileAccessabillity && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), this.div.parentNode && this.div.parentNode.removeChild(this.div)); }, i.prototype.updateAccessibleObjects = function (t) { if (t.visible) {
                t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId);
                for (var e = t.children, r = e.length - 1; r >= 0; r--)
                    this.updateAccessibleObjects(e[r]);
            } }, i.prototype.update = function () { if (this.renderer.renderingToScreen) {
                this.updateAccessibleObjects(this.renderer._lastObjectRendered);
                var t = this.renderer.view.getBoundingClientRect(), e = t.width / this.renderer.width, r = t.height / this.renderer.height, i = this.div;
                i.style.left = t.left + "px", i.style.top = t.top + "px", i.style.width = this.renderer.width + "px", i.style.height = this.renderer.height + "px";
                for (var s = 0; s < this.children.length; s++) {
                    var o = this.children[s];
                    if (o.renderId !== this.renderId)
                        o._accessibleActive = !1, n.utils.removeItems(this.children, s, 1), this.div.removeChild(o._accessibleDiv), this.pool.push(o._accessibleDiv), o._accessibleDiv = null, s--, 0 === this.children.length && this.deactivate();
                    else {
                        i = o._accessibleDiv;
                        var a = o.hitArea, h = o.worldTransform;
                        o.hitArea ? (i.style.left = (h.tx + a.x * h.a) * e + "px", i.style.top = (h.ty + a.y * h.d) * r + "px", i.style.width = a.width * h.a * e + "px", i.style.height = a.height * h.d * r + "px") : (a = o.getBounds(), this.capHitArea(a), i.style.left = a.x * e + "px", i.style.top = a.y * r + "px", i.style.width = a.width * e + "px", i.style.height = a.height * r + "px");
                    }
                }
                this.renderId++;
            } }, i.prototype.capHitArea = function (t) { t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0), t.x + t.width > this.renderer.width && (t.width = this.renderer.width - t.x), t.y + t.height > this.renderer.height && (t.height = this.renderer.height - t.y); }, i.prototype.addChild = function (t) { var e = this.pool.pop(); e || (e = document.createElement("button"), e.style.width = "100px", e.style.height = "100px", e.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = 2, e.style.borderStyle = "none", e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), t.accessibleTitle ? e.title = t.accessibleTitle : t.accessibleTitle || t.accessibleHint || (e.title = "displayObject " + this.tabIndex), t.accessibleHint && e.setAttribute("aria-label", t.accessibleHint), t._accessibleActive = !0, t._accessibleDiv = e, e.displayObject = t, this.children.push(t), this.div.appendChild(t._accessibleDiv), t._accessibleDiv.tabIndex = t.tabIndex; }, i.prototype._onClick = function (t) { var e = this.renderer.plugins.interaction; e.dispatchEvent(t.target.displayObject, "click", e.eventData); }, i.prototype._onFocus = function (t) { var e = this.renderer.plugins.interaction; e.dispatchEvent(t.target.displayObject, "mouseover", e.eventData); }, i.prototype._onFocusOut = function (t) { var e = this.renderer.plugins.interaction; e.dispatchEvent(t.target.displayObject, "mouseout", e.eventData); }, i.prototype._onKeyDown = function (t) { 9 === t.keyCode && this.activate(); }, i.prototype._onMouseMove = function () { this.deactivate(); }, i.prototype.destroy = function () { this.div = null; for (var t = 0; t < this.children.length; t++)
                this.children[t].div = null; window.document.removeEventListener("mousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null; }, n.WebGLRenderer.registerPlugin("accessibility", i), n.CanvasRenderer.registerPlugin("accessibility", i); }, { "../core": 97, "./accessibleTarget": 75, ismobilejs: 33 }], 75: [function (t, e, r) { var i = { accessible: !1, accessibleTitle: null, accessibleHint: null, tabIndex: 0, _accessibleActive: !1, _accessibleDiv: !1 }; e.exports = i; }, {}], 76: [function (t, e, r) { e.exports = { accessibleTarget: t("./accessibleTarget"), AccessibilityManager: t("./AccessibilityManager") }; }, { "./AccessibilityManager": 74, "./accessibleTarget": 75 }], 77: [function (t, e, r) { function i(t) { if (t instanceof Array) {
                if ("precision" !== t[0].substring(0, 9)) {
                    var e = t.slice(0);
                    return e.unshift("precision " + s.PRECISION.DEFAULT + " float;"), e;
                }
            }
            else if ("precision" !== t.substring(0, 9))
                return "precision " + s.PRECISION.DEFAULT + " float;\n" + t; return t; } var n = t("pixi-gl-core").GLShader, s = t("./const"), o = function (t, e, r) { n.call(this, t, i(e), i(r)); }; o.prototype = Object.create(n.prototype), o.prototype.constructor = o, e.exports = o; }, { "./const": 78, "pixi-gl-core": 7 }], 78: [function (t, e, r) { var i = { VERSION: "4.0.0", PI_2: 2 * Math.PI, RAD_TO_DEG: 180 / Math.PI, DEG_TO_RAD: Math.PI / 180, TARGET_FPMS: .06, RENDERER_TYPE: { UNKNOWN: 0, WEBGL: 1, CANVAS: 2 }, BLEND_MODES: { NORMAL: 0, ADD: 1, MULTIPLY: 2, SCREEN: 3, OVERLAY: 4, DARKEN: 5, LIGHTEN: 6, COLOR_DODGE: 7, COLOR_BURN: 8, HARD_LIGHT: 9, SOFT_LIGHT: 10, DIFFERENCE: 11, EXCLUSION: 12, HUE: 13, SATURATION: 14, COLOR: 15, LUMINOSITY: 16 }, DRAW_MODES: { POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6 }, SCALE_MODES: { DEFAULT: 0, LINEAR: 0, NEAREST: 1 }, WRAP_MODES: { DEFAULT: 0, CLAMP: 0, REPEAT: 1, MIRRORED_REPEAT: 2 }, GC_MODES: { DEFAULT: 1, AUTO: 0, MANUAL: 1 }, MIPMAP_TEXTURES: !0, RETINA_PREFIX: /@(.+)x/, RESOLUTION: 1, FILTER_RESOLUTION: 1, DEFAULT_RENDER_OPTIONS: { view: null, resolution: 1, antialias: !1, forceFXAA: !1, autoResize: !1, transparent: !1, backgroundColor: 0, clearBeforeRender: !0, preserveDrawingBuffer: !1, roundPixels: !1 }, SHAPES: { POLY: 0, RECT: 1, CIRC: 2, ELIP: 3, RREC: 4 }, PRECISION: { DEFAULT: "mediump", LOW: "lowp", MEDIUM: "mediump", HIGH: "highp" }, TRANSFORM_MODE: { DEFAULT: 0, STATIC: 0, DYNAMIC: 1 }, TEXT_GRADIENT: { LINEAR_VERTICAL: 0, LINEAR_HORIZONTAL: 1 }, SPRITE_BATCH_SIZE: 4096, SPRITE_MAX_TEXTURES: t("./utils/maxRecommendedTextures")(32) }; e.exports = i; }, { "./utils/maxRecommendedTextures": 152 }], 79: [function (t, e, r) { function i() { this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0), this.rect = null; } var n = t("../math"), s = n.Rectangle; i.prototype.constructor = i, e.exports = i, i.prototype.isEmpty = function () { return this.minX > this.maxX || this.minY > this.maxY; }, i.prototype.clear = function () { this.updateID++, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0); }, i.prototype.getRectangle = function (t) { return this.minX > this.maxX || this.minY > this.maxY ? s.EMPTY : (t = t || new s(0, 0, 1, 1), t.x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t); }, i.prototype.addPoint = function (t) { this.minX = Math.min(this.minX, t.x), this.maxX = Math.max(this.maxX, t.x), this.minY = Math.min(this.minY, t.y), this.maxY = Math.max(this.maxY, t.y); }, i.prototype.addQuad = function (t) { var e = this.minX, r = this.minY, i = this.maxX, n = this.maxY, s = t[0], o = t[1]; e = s < e ? s : e, r = o < r ? o : r, i = s > i ? s : i, n = o > n ? o : n, s = t[2], o = t[3], e = s < e ? s : e, r = o < r ? o : r, i = s > i ? s : i, n = o > n ? o : n, s = t[4], o = t[5], e = s < e ? s : e, r = o < r ? o : r, i = s > i ? s : i, n = o > n ? o : n, s = t[6], o = t[7], e = s < e ? s : e, r = o < r ? o : r, i = s > i ? s : i, n = o > n ? o : n, this.minX = e, this.minY = r, this.maxX = i, this.maxY = n; }, i.prototype.addFrame = function (t, e, r, i, n) { var s = t.worldTransform, o = s.a, a = s.b, h = s.c, u = s.d, l = s.tx, c = s.ty, d = this.minX, p = this.minY, f = this.maxX, v = this.maxY, g = o * e + h * r + l, y = a * e + u * r + c; d = g < d ? g : d, p = y < p ? y : p, f = g > f ? g : f, v = y > v ? y : v, g = o * i + h * r + l, y = a * i + u * r + c, d = g < d ? g : d, p = y < p ? y : p, f = g > f ? g : f, v = y > v ? y : v, g = o * e + h * n + l, y = a * e + u * n + c, d = g < d ? g : d, p = y < p ? y : p, f = g > f ? g : f, v = y > v ? y : v, g = o * i + h * n + l, y = a * i + u * n + c, d = g < d ? g : d, p = y < p ? y : p, f = g > f ? g : f, v = y > v ? y : v, this.minX = d, this.minY = p, this.maxX = f, this.maxY = v; }, i.prototype.addVertices = function (t, e, r, i) { for (var n = t.worldTransform, s = n.a, o = n.b, a = n.c, h = n.d, u = n.tx, l = n.ty, c = this.minX, d = this.minY, p = this.maxX, f = this.maxY, v = r; v < i; v += 2) {
                var g = e[v], y = e[v + 1], x = s * g + a * y + u, m = h * y + o * g + l;
                c = x < c ? x : c, d = m < d ? m : d, p = x > p ? x : p, f = m > f ? m : f;
            } this.minX = c, this.minY = d, this.maxX = p, this.maxY = f; }, i.prototype.addBounds = function (t) { var e = this.minX, r = this.minY, i = this.maxX, n = this.maxY; this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < r ? t.minY : r, this.maxX = t.maxX > i ? t.maxX : i, this.maxY = t.maxY > n ? t.maxY : n; }; }, { "../math": 102 }], 80: [function (t, e, r) { function i() { s.call(this), this.children = []; } var n = t("../utils"), s = t("./DisplayObject"); i.prototype = Object.create(s.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { width: { get: function () { return this.scale.x * this.getLocalBounds().width; }, set: function (t) { var e = this.getLocalBounds().width; 0 !== e ? this.scale.x = t / e : this.scale.x = 1, this._width = t; } }, height: { get: function () { return this.scale.y * this.getLocalBounds().height; }, set: function (t) { var e = this.getLocalBounds().height; 0 !== e ? this.scale.y = t / e : this.scale.y = 1, this._height = t; } } }), i.prototype.onChildrenChange = function () { }, i.prototype.addChild = function (t) { var e = arguments.length; if (e > 1)
                for (var r = 0; r < e; r++)
                    this.addChild(arguments[r]);
            else
                t.parent && t.parent.removeChild(t), t.parent = this, this.transform._parentID = -1, this.children.push(t), this.onChildrenChange(this.children.length - 1), t.emit("added", this); return t; }, i.prototype.addChildAt = function (t, e) { if (e >= 0 && e <= this.children.length)
                return t.parent && t.parent.removeChild(t), t.parent = this, this.children.splice(e, 0, t), this.onChildrenChange(e), t.emit("added", this), t; throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length); }, i.prototype.swapChildren = function (t, e) { if (t !== e) {
                var r = this.getChildIndex(t), i = this.getChildIndex(e);
                if (r < 0 || i < 0)
                    throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.");
                this.children[r] = e, this.children[i] = t, this.onChildrenChange(r < i ? r : i);
            } }, i.prototype.getChildIndex = function (t) { var e = this.children.indexOf(t); if (e === -1)
                throw new Error("The supplied DisplayObject must be a child of the caller"); return e; }, i.prototype.setChildIndex = function (t, e) { if (e < 0 || e >= this.children.length)
                throw new Error("The supplied index is out of bounds"); var r = this.getChildIndex(t); n.removeItems(this.children, r, 1), this.children.splice(e, 0, t), this.onChildrenChange(e); }, i.prototype.getChildAt = function (t) { if (t < 0 || t >= this.children.length)
                throw new Error("getChildAt: Supplied index " + t + " does not exist in the child list, or the supplied DisplayObject is not a child of the caller"); return this.children[t]; }, i.prototype.removeChild = function (t) { var e = arguments.length; if (e > 1)
                for (var r = 0; r < e; r++)
                    this.removeChild(arguments[r]);
            else {
                var i = this.children.indexOf(t);
                if (i === -1)
                    return;
                t.parent = null, n.removeItems(this.children, i, 1), this.onChildrenChange(i), t.emit("removed", this);
            } return t; }, i.prototype.removeChildAt = function (t) { var e = this.getChildAt(t); return e.parent = null, n.removeItems(this.children, t, 1), this.onChildrenChange(t), e.emit("removed", this), e; }, i.prototype.removeChildren = function (t, e) { var r, i, n = t || 0, s = "number" == typeof e ? e : this.children.length, o = s - n; if (o > 0 && o <= s) {
                for (r = this.children.splice(n, o), i = 0; i < r.length; ++i)
                    r[i].parent = null;
                for (this.onChildrenChange(t), i = 0; i < r.length; ++i)
                    r[i].emit("removed", this);
                return r;
            } if (0 === o && 0 === this.children.length)
                return []; throw new RangeError("removeChildren: numeric values are outside the acceptable range."); }, i.prototype.updateTransform = function () { if (this._boundsID++, this.visible) {
                this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
                for (var t = 0, e = this.children.length; t < e; ++t)
                    this.children[t].updateTransform();
            } }, i.prototype.containerUpdateTransform = i.prototype.updateTransform, i.prototype.calculateBounds = function () { if (this._bounds.clear(), this.visible) {
                this._calculateBounds();
                for (var t = 0; t < this.children.length; t++) {
                    var e = this.children[t];
                    e.calculateBounds(), this._bounds.addBounds(e._bounds);
                }
                this._boundsID = this._lastBoundsID;
            } }, i.prototype._calculateBounds = function () { }, i.prototype.renderWebGL = function (t) { if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
                if (this._mask || this._filters)
                    this.renderAdvancedWebGL(t);
                else {
                    this._renderWebGL(t);
                    for (var e = 0, r = this.children.length; e < r; ++e)
                        this.children[e].renderWebGL(t);
                } }, i.prototype.renderAdvancedWebGL = function (t) { t.currentRenderer.flush(); var e, r, i = this._filters, n = this._mask; if (i) {
                for (this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0, e = 0; e < i.length; e++)
                    i[e].enabled && this._enabledFilters.push(i[e]);
                this._enabledFilters.length && t.filterManager.pushFilter(this, this._enabledFilters);
            } for (n && t.maskManager.pushMask(this, this._mask), t.currentRenderer.start(), this._renderWebGL(t), e = 0, r = this.children.length; e < r; e++)
                this.children[e].renderWebGL(t); t.currentRenderer.flush(), n && t.maskManager.popMask(this, this._mask), i && this._enabledFilters && this._enabledFilters.length && t.filterManager.popFilter(), t.currentRenderer.start(); }, i.prototype._renderWebGL = function (t) { }, i.prototype._renderCanvas = function (t) { }, i.prototype.renderCanvas = function (t) { if (this.visible && !(this.alpha <= 0) && this.renderable) {
                this._mask && t.maskManager.pushMask(this._mask), this._renderCanvas(t);
                for (var e = 0, r = this.children.length; e < r; ++e)
                    this.children[e].renderCanvas(t);
                this._mask && t.maskManager.popMask(t);
            } }, i.prototype.destroy = function (t) { s.prototype.destroy.call(this); var e = "boolean" == typeof t ? t : t && t.children, r = this.children; if (this.children = null, e)
                for (var i = r.length - 1; i >= 0; i--) {
                    var n = r[i];
                    n.parent = null, n.destroy(t);
                } }; }, { "../utils": 151, "./DisplayObject": 81 }], 81: [function (t, e, r) { function i() { n.call(this); var t = s.TRANSFORM_MODE.DEFAULT === s.TRANSFORM_MODE.STATIC ? o : a; this.transform = new t, this.alpha = 1, this.visible = !0, this.renderable = !0, this.parent = null, this.worldAlpha = 1, this.filterArea = null, this._filters = null, this._enabledFilters = null, this._bounds = new h, this._boundsID = 0, this._lastBoundsID = -1, this._boundsRect = null, this._localBoundsRect = null, this._mask = null; } var n = t("eventemitter3"), s = t("../const"), o = t("./TransformStatic"), a = t("./Transform"), h = t("./Bounds"), u = t("../math"), l = new i; i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { x: { get: function () { return this.position.x; }, set: function (t) { this.transform.position.x = t; } }, y: { get: function () { return this.position.y; }, set: function (t) { this.transform.position.y = t; } }, worldTransform: { get: function () { return this.transform.worldTransform; } }, localTransform: { get: function () { return this.transform.localTransform; } }, position: { get: function () { return this.transform.position; }, set: function (t) { this.transform.position.copy(t); } }, scale: { get: function () { return this.transform.scale; }, set: function (t) { this.transform.scale.copy(t); } }, pivot: { get: function () { return this.transform.pivot; }, set: function (t) { this.transform.pivot.copy(t); } }, skew: { get: function () { return this.transform.skew; }, set: function (t) { this.transform.skew.copy(t); } }, rotation: { get: function () { return this.transform.rotation; }, set: function (t) { this.transform.rotation = t; } }, worldVisible: { get: function () { var t = this; do {
                        if (!t.visible)
                            return !1;
                        t = t.parent;
                    } while (t); return !0; } }, mask: { get: function () { return this._mask; }, set: function (t) { this._mask && (this._mask.renderable = !0), this._mask = t, this._mask && (this._mask.renderable = !1); } }, filters: { get: function () { return this._filters && this._filters.slice(); }, set: function (t) { this._filters = t && t.slice(); } } }), i.prototype.updateTransform = function () { this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha, this._bounds.updateID++; }, i.prototype.displayObjectUpdateTransform = i.prototype.updateTransform, i.prototype._recursivePostUpdateTransform = function () { this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(l.transform); }, i.prototype.getBounds = function (t, e) { return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = l, this.parent.transform._worldID++, this.updateTransform(), this.parent = null)), this._boundsID !== this._lastBoundsID && this.calculateBounds(), e || (this._boundsRect || (this._boundsRect = new u.Rectangle), e = this._boundsRect), this._bounds.getRectangle(e); }, i.prototype.getLocalBounds = function (t) { var e = this.transform, r = this.parent; this.parent = null, this.transform = l.transform, t || (this._localBoundsRect || (this._localBoundsRect = new u.Rectangle), t = this._localBoundsRect); var i = this.getBounds(!1, t); return this.parent = r, this.transform = e, i; }, i.prototype.toGlobal = function (t, e, r) { return r || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = l, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, e); }, i.prototype.toLocal = function (t, e, r, i) { return e && (t = e.toGlobal(t, r, i)), i || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = l, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, r); }, i.prototype.renderWebGL = function (t) { }, i.prototype.renderCanvas = function (t) { }, i.prototype.setParent = function (t) { if (!t || !t.addChild)
                throw new Error("setParent: Argument must be a Container"); return t.addChild(this), t; }, i.prototype.setTransform = function (t, e, r, i, n, s, o, a, h) { return this.position.x = t || 0, this.position.y = e || 0, this.scale.x = r ? r : 1, this.scale.y = i ? i : 1, this.rotation = n || 0, this.skew.x = s || 0, this.skew.y = o || 0, this.pivot.x = a || 0, this.pivot.y = h || 0, this; }, i.prototype.destroy = function () { this.removeAllListeners(), this.parent && this.parent.removeChild(this), this.transform = null, this.parent = null, this._bounds = null, this._currentBounds = null, this._mask = null, this.filterArea = null; }; }, { "../const": 78, "../math": 102, "./Bounds": 79, "./Transform": 82, "./TransformStatic": 84, eventemitter3: 32 }], 82: [function (t, e, r) { function i() { s.call(this), this.position = new n.Point(0, 0), this.scale = new n.Point(1, 1), this.skew = new n.ObservablePoint(this.updateSkew, this, 0, 0), this.pivot = new n.Point(0, 0), this._rotation = 0, this._sr = Math.sin(0), this._cr = Math.cos(0), this._cy = Math.cos(0), this._sy = Math.sin(0), this._nsx = Math.sin(0), this._cx = Math.cos(0); } var n = t("../math"), s = t("./TransformBase"); i.prototype = Object.create(s.prototype), i.prototype.constructor = i, i.prototype.updateSkew = function () { this._cy = Math.cos(this.skew.y), this._sy = Math.sin(this.skew.y), this._nsx = Math.sin(this.skew.x), this._cx = Math.cos(this.skew.x); }, i.prototype.updateLocalTransform = function () { var t, e, r, i, n = this.localTransform; t = this._cr * this.scale.x, e = this._sr * this.scale.x, r = -this._sr * this.scale.y, i = this._cr * this.scale.y, n.a = this._cy * t + this._sy * r, n.b = this._cy * e + this._sy * i, n.c = this._nsx * t + this._cx * r, n.d = this._nsx * e + this._cx * i; }, i.prototype.updateTransform = function (t) { var e, r, i, n, s = t.worldTransform, o = this.worldTransform, a = this.localTransform; e = this._cr * this.scale.x, r = this._sr * this.scale.x, i = -this._sr * this.scale.y, n = this._cr * this.scale.y, a.a = this._cy * e + this._sy * i, a.b = this._cy * r + this._sy * n, a.c = this._nsx * e + this._cx * i, a.d = this._nsx * r + this._cx * n, a.tx = this.position.x - (this.pivot.x * a.a + this.pivot.y * a.c), a.ty = this.position.y - (this.pivot.x * a.b + this.pivot.y * a.d), o.a = a.a * s.a + a.b * s.c, o.b = a.a * s.b + a.b * s.d, o.c = a.c * s.a + a.d * s.c, o.d = a.c * s.b + a.d * s.d, o.tx = a.tx * s.a + a.ty * s.c + s.tx, o.ty = a.tx * s.b + a.ty * s.d + s.ty, this._worldID++; }, i.prototype.setFromMatrix = function (t) { t.decompose(this); }, Object.defineProperties(i.prototype, { rotation: { get: function () { return this._rotation; }, set: function (t) { this._rotation = t, this._sr = Math.sin(t), this._cr = Math.cos(t); } } }), e.exports = i; }, { "../math": 102, "./TransformBase": 83 }], 83: [function (t, e, r) { function i() { this.worldTransform = new n.Matrix, this.localTransform = new n.Matrix, this._worldID = 0; } var n = t("../math"); i.prototype.constructor = i, i.prototype.updateLocalTransform = function () { }, i.prototype.updateTransform = function (t) { var e = t.worldTransform, r = this.worldTransform, i = this.localTransform; r.a = i.a * e.a + i.b * e.c, r.b = i.a * e.b + i.b * e.d, r.c = i.c * e.a + i.d * e.c, r.d = i.c * e.b + i.d * e.d, r.tx = i.tx * e.a + i.ty * e.c + e.tx, r.ty = i.tx * e.b + i.ty * e.d + e.ty, this._worldID++; }, i.prototype.updateWorldTransform = i.prototype.updateTransform, i.IDENTITY = new i, e.exports = i; }, { "../math": 102 }], 84: [function (t, e, r) { function i() { s.call(this), this.position = new n.ObservablePoint(this.onChange, this, 0, 0), this.scale = new n.ObservablePoint(this.onChange, this, 1, 1), this.pivot = new n.ObservablePoint(this.onChange, this, 0, 0), this.skew = new n.ObservablePoint(this.updateSkew, this, 0, 0), this._rotation = 0, this._sr = Math.sin(0), this._cr = Math.cos(0), this._cy = Math.cos(0), this._sy = Math.sin(0), this._nsx = Math.sin(0), this._cx = Math.cos(0), this._localID = 0, this._currentLocalID = 0; } var n = t("../math"), s = t("./TransformBase"); i.prototype = Object.create(s.prototype), i.prototype.constructor = i, i.prototype.onChange = function () { this._localID++; }, i.prototype.updateSkew = function () { this._cy = Math.cos(this.skew._y), this._sy = Math.sin(this.skew._y), this._nsx = Math.sin(this.skew._x), this._cx = Math.cos(this.skew._x), this._localID++; }, i.prototype.updateLocalTransform = function () { var t = this.localTransform; if (this._localID !== this._currentLocalID) {
                var e, r, i, n;
                e = this._cr * this.scale._x, r = this._sr * this.scale._x, i = -this._sr * this.scale._y, n = this._cr * this.scale._y, t.a = this._cy * e + this._sy * i, t.b = this._cy * r + this._sy * n, t.c = this._nsx * e + this._cx * i, t.d = this._nsx * r + this._cx * n, t.tx = this.position._x - (this.pivot._x * t.a + this.pivot._y * t.c), t.ty = this.position._y - (this.pivot._x * t.b + this.pivot._y * t.d), this._currentLocalID = this._localID, this._parentID = -1;
            } }, i.prototype.updateTransform = function (t) { var e = t.worldTransform, r = this.worldTransform, i = this.localTransform; if (this._localID !== this._currentLocalID) {
                var n, s, o, a;
                n = this._cr * this.scale._x, s = this._sr * this.scale._x, o = -this._sr * this.scale._y, a = this._cr * this.scale._y, i.a = this._cy * n + this._sy * o, i.b = this._cy * s + this._sy * a, i.c = this._nsx * n + this._cx * o, i.d = this._nsx * s + this._cx * a, i.tx = this.position._x - (this.pivot._x * i.a + this.pivot._y * i.c), i.ty = this.position._y - (this.pivot._x * i.b + this.pivot._y * i.d), this._currentLocalID = this._localID, this._parentID = -1;
            } this._parentID !== t._worldID && (r.a = i.a * e.a + i.b * e.c, r.b = i.a * e.b + i.b * e.d, r.c = i.c * e.a + i.d * e.c, r.d = i.c * e.b + i.d * e.d, r.tx = i.tx * e.a + i.ty * e.c + e.tx, r.ty = i.tx * e.b + i.ty * e.d + e.ty, this._parentID = t._worldID, this._worldID++); }, i.prototype.setFromMatrix = function (t) { t.decompose(this), this._localID++; }, Object.defineProperties(i.prototype, { rotation: { get: function () { return this._rotation; }, set: function (t) { this._rotation = t, this._sr = Math.sin(t), this._cr = Math.cos(t), this._localID++; } } }), e.exports = i; }, { "../math": 102, "./TransformBase": 83 }], 85: [function (t, e, r) {
                function i() { s.call(this), this.fillAlpha = 1, this.lineWidth = 0, this.lineColor = 0, this.graphicsData = [], this.tint = 16777215, this._prevTint = 16777215, this.blendMode = c.BLEND_MODES.NORMAL, this.currentPath = null, this._webGL = {}, this.isMask = !1, this.boundsPadding = 0, this._localBounds = new d, this.dirty = 0, this.fastRectDirty = -1, this.clearDirty = 0, this.boundsDirty = -1, this.cachedSpriteDirty = !1, this._spriteRect = null, this._fastRect = !1; }
                var n, s = t("../display/Container"), o = t("../textures/RenderTexture"), a = t("../textures/Texture"), h = t("./GraphicsData"), u = t("../sprites/Sprite"), l = t("../math"), c = t("../const"), d = t("../display/Bounds"), p = t("./utils/bezierCurveTo"), f = t("../renderers/canvas/CanvasRenderer"), v = new l.Matrix, g = new l.Point;
                i._SPRITE_TEXTURE = null, i.prototype = Object.create(s.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () { var t = new i; t.renderable = this.renderable, t.fillAlpha = this.fillAlpha, t.lineWidth = this.lineWidth, t.lineColor = this.lineColor, t.tint = this.tint, t.blendMode = this.blendMode, t.isMask = this.isMask, t.boundsPadding = this.boundsPadding, t.dirty = 0, t.cachedSpriteDirty = this.cachedSpriteDirty; for (var e = 0; e < this.graphicsData.length; ++e)
                    t.graphicsData.push(this.graphicsData[e].clone()); return t.currentPath = t.graphicsData[t.graphicsData.length - 1], t.updateLocalBounds(), t; }, i.prototype.lineStyle = function (t, e, r) { if (this.lineWidth = t || 0, this.lineColor = e || 0, this.lineAlpha = void 0 === r ? 1 : r, this.currentPath)
                    if (this.currentPath.shape.points.length) {
                        var i = new l.Polygon(this.currentPath.shape.points.slice(-2));
                        i.closed = !1, this.drawShape(i);
                    }
                    else
                        this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, this.currentPath.lineAlpha = this.lineAlpha; return this; }, i.prototype.moveTo = function (t, e) { var r = new l.Polygon([t, e]); return r.closed = !1, this.drawShape(r), this; }, i.prototype.lineTo = function (t, e) { return this.currentPath.shape.points.push(t, e), this.dirty++, this; }, i.prototype.quadraticCurveTo = function (t, e, r, i) { this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0); var n, s, o = 20, a = this.currentPath.shape.points; 0 === a.length && this.moveTo(0, 0); for (var h = a[a.length - 2], u = a[a.length - 1], l = 0, c = 1; c <= o; ++c)
                    l = c / o, n = h + (t - h) * l, s = u + (e - u) * l, a.push(n + (t + (r - t) * l - n) * l, s + (e + (i - e) * l - s) * l); return this.dirty++, this; }, i.prototype.bezierCurveTo = function (t, e, r, i, n, s) { this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0); var o = this.currentPath.shape.points, a = o[o.length - 2], h = o[o.length - 1]; return o.length -= 2, p(a, h, t, e, r, i, n, s, o), this.dirty++, this; }, i.prototype.arcTo = function (t, e, r, i, n) {
                    this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(t, e) : this.moveTo(t, e);
                    var s = this.currentPath.shape.points, o = s[s.length - 2], a = s[s.length - 1], h = a - e, u = o - t, l = i - e, c = r - t, d = Math.abs(h * c - u * l);
                    if (d < 1e-8 || 0 === n)
                        s[s.length - 2] === t && s[s.length - 1] === e || s.push(t, e);
                    else {
                        var p = h * h + u * u, f = l * l + c * c, v = h * l + u * c, g = n * Math.sqrt(p) / d, y = n * Math.sqrt(f) / d, x = g * v / p, m = y * v / f, _ = g * c + y * u, b = g * l + y * h, T = u * (y + x), E = h * (y + x), w = c * (g + m), S = l * (g + m), A = Math.atan2(E - b, T - _), M = Math.atan2(S - b, w - _);
                        this.arc(_ + t, b + e, n, A, M, u * l > c * h);
                    }
                    return this.dirty++, this;
                }, i.prototype.arc = function (t, e, r, i, n, s) { if (s = s || !1, i === n)
                    return this; !s && n <= i ? n += 2 * Math.PI : s && i <= n && (i += 2 * Math.PI); var o = s ? (i - n) * -1 : n - i, a = 40 * Math.ceil(Math.abs(o) / (2 * Math.PI)); if (0 === o)
                    return this; var h = t + Math.cos(i) * r, u = e + Math.sin(i) * r; this.currentPath ? this.currentPath.shape.points.push(h, u) : this.moveTo(h, u); for (var l = this.currentPath.shape.points, c = o / (2 * a), d = 2 * c, p = Math.cos(c), f = Math.sin(c), v = a - 1, g = v % 1 / v, y = 0; y <= v; y++) {
                    var x = y + g * y, m = c + i + d * x, _ = Math.cos(m), b = -Math.sin(m);
                    l.push((p * _ + f * b) * r + t, (p * -b + f * _) * r + e);
                } return this.dirty++, this; }, i.prototype.beginFill = function (t, e) { return this.filling = !0, this.fillColor = t || 0, this.fillAlpha = void 0 === e ? 1 : e, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this; }, i.prototype.endFill = function () { return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this; }, i.prototype.drawRect = function (t, e, r, i) { return this.drawShape(new l.Rectangle(t, e, r, i)), this; }, i.prototype.drawRoundedRect = function (t, e, r, i, n) { return this.drawShape(new l.RoundedRectangle(t, e, r, i, n)), this; }, i.prototype.drawCircle = function (t, e, r) { return this.drawShape(new l.Circle(t, e, r)), this; }, i.prototype.drawEllipse = function (t, e, r, i) { return this.drawShape(new l.Ellipse(t, e, r, i)), this; }, i.prototype.drawPolygon = function (t) { var e = t, r = !0; if (e instanceof l.Polygon && (r = e.closed, e = e.points), !Array.isArray(e)) {
                    e = new Array(arguments.length);
                    for (var i = 0; i < e.length; ++i)
                        e[i] = arguments[i];
                } var n = new l.Polygon(e); return n.closed = r, this.drawShape(n), this; }, i.prototype.clear = function () { return this.lineWidth = 0, this.filling = !1, this.dirty++, this.clearDirty++, this.graphicsData = [], this; }, i.prototype.isFastRect = function () { return 1 === this.graphicsData.length && this.graphicsData[0].shape.type === c.SHAPES.RECT && !this.graphicsData[0].lineWidth; }, i.prototype._renderWebGL = function (t) { this.dirty !== this.fastRectDirty && (this.fastRectDirty = this.dirty, this._fastRect = this.isFastRect()), this._fastRect ? this._renderSpriteRect(t) : (t.setObjectRenderer(t.plugins.graphics), t.plugins.graphics.render(this)); }, i.prototype._renderSpriteRect = function (t) { var e = this.graphicsData[0].shape; if (!this._spriteRect) {
                    if (!i._SPRITE_TEXTURE) {
                        i._SPRITE_TEXTURE = o.create(10, 10);
                        var r = t._activeRenderTarget;
                        t.bindRenderTexture(i._SPRITE_TEXTURE), t.clear([1, 1, 1, 1]), t.bindRenderTarget(r);
                    }
                    this._spriteRect = new u(i._SPRITE_TEXTURE);
                } this._spriteRect.tint = this.graphicsData[0].fillColor, this._spriteRect.alpha = this.graphicsData[0].fillAlpha, this._spriteRect.worldAlpha = this.worldAlpha * this._spriteRect.alpha, i._SPRITE_TEXTURE._frame.width = e.width, i._SPRITE_TEXTURE._frame.height = e.height, this._spriteRect.transform.worldTransform = this.transform.worldTransform, this._spriteRect.anchor.set(-e.x / e.width, -e.y / e.height), this._spriteRect.onAnchorUpdate(), this._spriteRect._renderWebGL(t); }, i.prototype._renderCanvas = function (t) { this.isMask !== !0 && t.plugins.graphics.render(this); }, i.prototype._calculateBounds = function () { if (this.renderable) {
                    this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.updateLocalBounds(), this.dirty++, this.cachedSpriteDirty = !0);
                    var t = this._localBounds;
                    this._bounds.addFrame(this.transform, t.minX, t.minY, t.maxX, t.maxY);
                } }, i.prototype.containsPoint = function (t) { this.worldTransform.applyInverse(t, g); for (var e = this.graphicsData, r = 0; r < e.length; r++) {
                    var i = e[r];
                    if (i.fill && i.shape && i.shape.contains(g.x, g.y))
                        return !0;
                } return !1; }, i.prototype.updateLocalBounds = function () { var t = 1 / 0, e = -(1 / 0), r = 1 / 0, i = -(1 / 0); if (this.graphicsData.length)
                    for (var n, s, o, a, h, u, l = 0; l < this.graphicsData.length; l++) {
                        var d = this.graphicsData[l], p = d.type, f = d.lineWidth;
                        if (n = d.shape, p === c.SHAPES.RECT || p === c.SHAPES.RREC)
                            o = n.x - f / 2, a = n.y - f / 2, h = n.width + f, u = n.height + f, t = o < t ? o : t, e = o + h > e ? o + h : e, r = a < r ? a : r, i = a + u > i ? a + u : i;
                        else if (p === c.SHAPES.CIRC)
                            o = n.x, a = n.y, h = n.radius + f / 2, u = n.radius + f / 2, t = o - h < t ? o - h : t, e = o + h > e ? o + h : e, r = a - u < r ? a - u : r, i = a + u > i ? a + u : i;
                        else if (p === c.SHAPES.ELIP)
                            o = n.x, a = n.y, h = n.width + f / 2, u = n.height + f / 2, t = o - h < t ? o - h : t, e = o + h > e ? o + h : e, r = a - u < r ? a - u : r, i = a + u > i ? a + u : i;
                        else {
                            s = n.points;
                            for (var v = 0; v < s.length; v += 2)
                                o = s[v], a = s[v + 1], t = o - f < t ? o - f : t, e = o + f > e ? o + f : e, r = a - f < r ? a - f : r, i = a + f > i ? a + f : i;
                        }
                    }
                else
                    t = 0, e = 0, r = 0, i = 0; var g = this.boundsPadding; this._localBounds.minX = t - g, this._localBounds.maxX = e + 2 * g, this._localBounds.minY = r - g, this._localBounds.maxY = i + 2 * g; }, i.prototype.drawShape = function (t) { this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), this.currentPath = null; var e = new h(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, t); return this.graphicsData.push(e), e.type === c.SHAPES.POLY && (e.shape.closed = e.shape.closed || this.filling, this.currentPath = e), this.dirty++, e; }, i.prototype.generateCanvasTexture = function (t, e) { e = e || 1; var r = this.getLocalBounds(), i = new o.create(r.width * e, r.height * e); n || (n = new f), v.tx = -r.x, v.ty = -r.y, n.render(this, i, !1, v); var s = a.fromCanvas(i.baseTexture._canvasRenderTarget.canvas, t); return s.baseTexture.resolution = e, s; }, i.prototype.closePath = function () { var t = this.currentPath; return t && t.shape && t.shape.close(), this; }, i.prototype.addHole = function () { var t = this.graphicsData.pop(); return this.currentPath = this.graphicsData[this.graphicsData.length - 1], this.currentPath.addHole(t.shape), this.currentPath = null, this; }, i.prototype.destroy = function () { s.prototype.destroy.apply(this, arguments); for (var t = 0; t < this.graphicsData.length; ++t)
                    this.graphicsData[t].destroy(); for (var e in this._webgl)
                    for (var r = 0; r < this._webgl[e].data.length; ++r)
                        this._webgl[e].data[r].destroy(); this._spriteRect && this._spriteRect.destroy(), this.graphicsData = null, this.currentPath = null, this._webgl = null, this._localBounds = null; };
            }, { "../const": 78, "../display/Bounds": 79, "../display/Container": 80, "../math": 102, "../renderers/canvas/CanvasRenderer": 109, "../sprites/Sprite": 133, "../textures/RenderTexture": 143, "../textures/Texture": 144, "./GraphicsData": 86, "./utils/bezierCurveTo": 88 }], 86: [function (t, e, r) { function i(t, e, r, i, n, s, o) { this.lineWidth = t, this.lineColor = e, this.lineAlpha = r, this._lineTint = e, this.fillColor = i, this.fillAlpha = n, this._fillTint = i, this.fill = s, this.holes = [], this.shape = o, this.type = o.type; } i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () { return new i(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.shape); }, i.prototype.addHole = function (t) { this.holes.push(t); }, i.prototype.destroy = function () { this.shape = null, this.holes = null; }; }, {}], 87: [function (t, e, r) { function i(t) { this.renderer = t; } var n = t("../../renderers/canvas/CanvasRenderer"), s = t("../../const"); i.prototype.constructor = i, e.exports = i, n.registerPlugin("graphics", i), i.prototype.render = function (t) { var e = this.renderer, r = e.context, i = t.worldAlpha, n = t.transform.worldTransform, o = e.resolution; this._prevTint !== this.tint && (this.dirty = !0), r.setTransform(n.a * o, n.b * o, n.c * o, n.d * o, n.tx * o, n.ty * o), t.dirty && (this.updateGraphicsTint(t), t.dirty = !1), e.setBlendMode(t.blendMode); for (var a = 0; a < t.graphicsData.length; a++) {
                var h = t.graphicsData[a], u = h.shape, l = h._fillTint, c = h._lineTint;
                if (r.lineWidth = h.lineWidth, h.type === s.SHAPES.POLY) {
                    r.beginPath(), this.renderPolygon(u.points, u.closed, r);
                    for (var d = 0; d < h.holes.length; d++) {
                        var p = h.holes[d];
                        this.renderPolygon(p.points, !0, r);
                    }
                    h.fill && (r.globalAlpha = h.fillAlpha * i, r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), r.fill()), h.lineWidth && (r.globalAlpha = h.lineAlpha * i, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.stroke());
                }
                else if (h.type === s.SHAPES.RECT)
                    (h.fillColor || 0 === h.fillColor) && (r.globalAlpha = h.fillAlpha * i, r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), r.fillRect(u.x, u.y, u.width, u.height)), h.lineWidth && (r.globalAlpha = h.lineAlpha * i, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.strokeRect(u.x, u.y, u.width, u.height));
                else if (h.type === s.SHAPES.CIRC)
                    r.beginPath(), r.arc(u.x, u.y, u.radius, 0, 2 * Math.PI), r.closePath(), h.fill && (r.globalAlpha = h.fillAlpha * i, r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), r.fill()), h.lineWidth && (r.globalAlpha = h.lineAlpha * i, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.stroke());
                else if (h.type === s.SHAPES.ELIP) {
                    var f = 2 * u.width, v = 2 * u.height, g = u.x - f / 2, y = u.y - v / 2;
                    r.beginPath();
                    var x = .5522848, m = f / 2 * x, _ = v / 2 * x, b = g + f, T = y + v, E = g + f / 2, w = y + v / 2;
                    r.moveTo(g, w), r.bezierCurveTo(g, w - _, E - m, y, E, y), r.bezierCurveTo(E + m, y, b, w - _, b, w), r.bezierCurveTo(b, w + _, E + m, T, E, T), r.bezierCurveTo(E - m, T, g, w + _, g, w), r.closePath(), h.fill && (r.globalAlpha = h.fillAlpha * i, r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), r.fill()), h.lineWidth && (r.globalAlpha = h.lineAlpha * i, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.stroke());
                }
                else if (h.type === s.SHAPES.RREC) {
                    var S = u.x, A = u.y, M = u.width, R = u.height, C = u.radius, O = Math.min(M, R) / 2 | 0;
                    C = C > O ? O : C, r.beginPath(), r.moveTo(S, A + C), r.lineTo(S, A + R - C), r.quadraticCurveTo(S, A + R, S + C, A + R), r.lineTo(S + M - C, A + R), r.quadraticCurveTo(S + M, A + R, S + M, A + R - C), r.lineTo(S + M, A + C), r.quadraticCurveTo(S + M, A, S + M - C, A), r.lineTo(S + C, A), r.quadraticCurveTo(S, A, S, A + C), r.closePath(), (h.fillColor || 0 === h.fillColor) && (r.globalAlpha = h.fillAlpha * i, r.fillStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), r.fill()), h.lineWidth && (r.globalAlpha = h.lineAlpha * i, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.stroke());
                }
            } }, i.prototype.updateGraphicsTint = function (t) { t._prevTint = t.tint; for (var e = (t.tint >> 16 & 255) / 255, r = (t.tint >> 8 & 255) / 255, i = (255 & t.tint) / 255, n = 0; n < t.graphicsData.length; n++) {
                var s = t.graphicsData[n], o = 0 | s.fillColor, a = 0 | s.lineColor;
                s._fillTint = ((o >> 16 & 255) / 255 * e * 255 << 16) + ((o >> 8 & 255) / 255 * r * 255 << 8) + (255 & o) / 255 * i * 255, s._lineTint = ((a >> 16 & 255) / 255 * e * 255 << 16) + ((a >> 8 & 255) / 255 * r * 255 << 8) + (255 & a) / 255 * i * 255;
            } }, i.prototype.renderPolygon = function (t, e, r) { r.moveTo(t[0], t[1]); for (var i = 1; i < t.length / 2; i++)
                r.lineTo(t[2 * i], t[2 * i + 1]); e && r.closePath(); }, i.prototype.destroy = function () { this.renderer = null; }; }, { "../../const": 78, "../../renderers/canvas/CanvasRenderer": 109 }], 88: [function (t, e, r) { var i = function (t, e, r, i, n, s, o, a, h) { h = h || []; var u, l, c, d, p, f = 20; h.push(t, e); for (var v = 0, g = 1; g <= f; ++g)
                v = g / f, u = 1 - v, l = u * u, c = l * u, d = v * v, p = d * v, h.push(c * t + 3 * l * v * r + 3 * u * d * n + p * o, c * e + 3 * l * v * i + 3 * u * d * s + p * a); return h; }; e.exports = i; }, {}], 89: [function (t, e, r) { function i(t) { o.call(this, t), this.graphicsDataPool = [], this.primitiveShader = null, this.gl = t.gl, this.CONTEXT_UID = 0; } var n = t("../../utils"), s = t("../../const"), o = t("../../renderers/webgl/utils/ObjectRenderer"), a = t("../../renderers/webgl/WebGLRenderer"), h = t("./WebGLGraphicsData"), u = t("./shaders/PrimitiveShader"), l = t("./utils/buildPoly"), c = t("./utils/buildRectangle"), d = t("./utils/buildRoundedRectangle"), p = t("./utils/buildCircle"); i.prototype = Object.create(o.prototype), i.prototype.constructor = i, e.exports = i, a.registerPlugin("graphics", i), i.prototype.onContextChange = function () { this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.primitiveShader = new u(this.gl); }, i.prototype.destroy = function () { o.prototype.destroy.call(this); for (var t = 0; t < this.graphicsDataPool.length; ++t)
                this.graphicsDataPool[t].destroy(); this.graphicsDataPool = null; }, i.prototype.render = function (t) { var e, r = this.renderer, i = r.gl, s = t._webGL[this.CONTEXT_UID]; s && t.dirty === s.dirty || (this.updateGraphics(t), s = t._webGL[this.CONTEXT_UID]); var o = this.primitiveShader; r.bindShader(o), r.state.setBlendMode(t.blendMode); for (var a = 0, h = s.data.length; a < h; a++) {
                e = s.data[a];
                var u = e.shader;
                r.bindShader(u), u.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0), u.uniforms.tint = n.hex2rgb(t.tint), u.uniforms.alpha = t.worldAlpha, e.vao.bind().draw(i.TRIANGLE_STRIP, e.indices.length).unbind();
            } }, i.prototype.updateGraphics = function (t) { var e = this.renderer.gl, r = t._webGL[this.CONTEXT_UID]; r || (r = t._webGL[this.CONTEXT_UID] = { lastIndex: 0, data: [], gl: e, clearDirty: -1, dirty: -1 }), r.dirty = t.dirty; var i; if (t.clearDirty !== r.clearDirty) {
                for (r.clearDirty = t.clearDirty, i = 0; i < r.data.length; i++) {
                    var n = r.data[i];
                    this.graphicsDataPool.push(n);
                }
                r.data = [], r.lastIndex = 0;
            } var o; for (i = r.lastIndex; i < t.graphicsData.length; i++) {
                var a = t.graphicsData[i];
                o = this.getWebGLData(r, 0), a.type === s.SHAPES.POLY && l(a, o), a.type === s.SHAPES.RECT ? c(a, o) : a.type === s.SHAPES.CIRC || a.type === s.SHAPES.ELIP ? p(a, o) : a.type === s.SHAPES.RREC && d(a, o), r.lastIndex++;
            } for (i = 0; i < r.data.length; i++)
                o = r.data[i], o.dirty && o.upload(); }, i.prototype.getWebGLData = function (t, e) { var r = t.data[t.data.length - 1]; return (!r || r.points.length > 32e4) && (r = this.graphicsDataPool.pop() || new h(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState), r.reset(e), t.data.push(r)), r.dirty = !0, r; }; }, { "../../const": 78, "../../renderers/webgl/WebGLRenderer": 116, "../../renderers/webgl/utils/ObjectRenderer": 126, "../../utils": 151, "./WebGLGraphicsData": 90, "./shaders/PrimitiveShader": 91, "./utils/buildCircle": 92, "./utils/buildPoly": 94, "./utils/buildRectangle": 95, "./utils/buildRoundedRectangle": 96 }], 90: [function (t, e, r) { function i(t, e, r) { this.gl = t, this.color = [0, 0, 0], this.points = [], this.indices = [], this.buffer = n.GLBuffer.createVertexBuffer(t), this.indexBuffer = n.GLBuffer.createIndexBuffer(t), this.dirty = !0, this.glPoints = null, this.glIndices = null, this.shader = e, this.vao = new n.VertexArrayObject(t, r).addIndex(this.indexBuffer).addAttribute(this.buffer, e.attributes.aVertexPosition, t.FLOAT, !1, 24, 0).addAttribute(this.buffer, e.attributes.aColor, t.FLOAT, !1, 24, 8); } var n = t("pixi-gl-core"); i.prototype.constructor = i, e.exports = i, i.prototype.reset = function () { this.points.length = 0, this.indices.length = 0; }, i.prototype.upload = function () { this.glPoints = new Float32Array(this.points), this.buffer.upload(this.glPoints), this.glIndices = new Uint16Array(this.indices), this.indexBuffer.upload(this.glIndices), this.dirty = !1; }, i.prototype.destroy = function () { this.color = null, this.points = null, this.indices = null, this.vao.destroy(), this.buffer.destroy(), this.indexBuffer.destroy(), this.gl = null, this.buffer = null, this.indexBuffer = null, this.glPoints = null, this.glIndices = null; }; }, { "pixi-gl-core": 7 }], 91: [function (t, e, r) { function i(t) { n.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n")); } var n = t("../../../Shader"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i; }, { "../../../Shader": 77 }], 92: [function (t, e, r) { var i = t("./buildLine"), n = t("../../../const"), s = t("../../../utils"), o = function (t, e) { var r, o, a = t.shape, h = a.x, u = a.y; t.type === n.SHAPES.CIRC ? (r = a.radius, o = a.radius) : (r = a.width, o = a.height); var l = Math.floor(30 * Math.sqrt(a.radius)) || Math.floor(15 * Math.sqrt(a.width + a.height)), c = 2 * Math.PI / l, d = 0; if (t.fill) {
                var p = s.hex2rgb(t.fillColor), f = t.fillAlpha, v = p[0] * f, g = p[1] * f, y = p[2] * f, x = e.points, m = e.indices, _ = x.length / 6;
                for (m.push(_), d = 0; d < l + 1; d++)
                    x.push(h, u, v, g, y, f), x.push(h + Math.sin(c * d) * r, u + Math.cos(c * d) * o, v, g, y, f), m.push(_++, _++);
                m.push(_ - 1);
            } if (t.lineWidth) {
                var b = t.points;
                for (t.points = [], d = 0; d < l + 1; d++)
                    t.points.push(h + Math.sin(c * d) * r, u + Math.cos(c * d) * o);
                i(t, e), t.points = b;
            } }; e.exports = o; }, { "../../../const": 78, "../../../utils": 151, "./buildLine": 93 }], 93: [function (t, e, r) { var i = t("../../../math"), n = t("../../../utils"), s = function (t, e) { var r = 0, s = t.points; if (0 !== s.length) {
                var o = new i.Point(s[0], s[1]), a = new i.Point(s[s.length - 2], s[s.length - 1]);
                if (o.x === a.x && o.y === a.y) {
                    s = s.slice(), s.pop(), s.pop(), a = new i.Point(s[s.length - 2], s[s.length - 1]);
                    var h = a.x + .5 * (o.x - a.x), u = a.y + .5 * (o.y - a.y);
                    s.unshift(h, u), s.push(h, u);
                }
                var l, c, d, p, f, v, g, y, x, m, _, b, T, E, w, S, A, M, R, C, O, D, P, I = e.points, L = e.indices, F = s.length / 2, N = s.length, B = I.length / 6, k = t.lineWidth / 2, U = n.hex2rgb(t.lineColor), j = t.lineAlpha, W = U[0] * j, X = U[1] * j, G = U[2] * j;
                for (d = s[0], p = s[1], f = s[2], v = s[3], x = -(p - v), m = d - f, P = Math.sqrt(x * x + m * m), x /= P, m /= P, x *= k, m *= k, I.push(d - x, p - m, W, X, G, j), I.push(d + x, p + m, W, X, G, j), r = 1; r < F - 1; r++)
                    d = s[2 * (r - 1)], p = s[2 * (r - 1) + 1], f = s[2 * r], v = s[2 * r + 1], g = s[2 * (r + 1)], y = s[2 * (r + 1) + 1], x = -(p - v), m = d - f, P = Math.sqrt(x * x + m * m), x /= P, m /= P, x *= k, m *= k, _ = -(v - y), b = f - g, P = Math.sqrt(_ * _ + b * b), _ /= P, b /= P, _ *= k, b *= k, w = -m + p - (-m + v), S = -x + f - (-x + d), A = (-x + d) * (-m + v) - (-x + f) * (-m + p), M = -b + y - (-b + v), R = -_ + f - (-_ + g), C = (-_ + g) * (-b + v) - (-_ + f) * (-b + y), O = w * R - M * S, Math.abs(O) < .1 ? (O += 10.1, I.push(f - x, v - m, W, X, G, j), I.push(f + x, v + m, W, X, G, j)) : (l = (S * C - R * A) / O, c = (M * A - w * C) / O, D = (l - f) * (l - f) + (c - v) * (c - v), D > 19600 ? (T = x - _, E = m - b, P = Math.sqrt(T * T + E * E), T /= P, E /= P, T *= k, E *= k, I.push(f - T, v - E), I.push(W, X, G, j), I.push(f + T, v + E), I.push(W, X, G, j), I.push(f - T, v - E), I.push(W, X, G, j), N++) : (I.push(l, c), I.push(W, X, G, j), I.push(f - (l - f), v - (c - v)), I.push(W, X, G, j)));
                for (d = s[2 * (F - 2)], p = s[2 * (F - 2) + 1], f = s[2 * (F - 1)], v = s[2 * (F - 1) + 1], x = -(p - v), m = d - f, P = Math.sqrt(x * x + m * m), x /= P, m /= P, x *= k, m *= k, I.push(f - x, v - m), I.push(W, X, G, j), I.push(f + x, v + m), I.push(W, X, G, j), L.push(B), r = 0; r < N; r++)
                    L.push(B++);
                L.push(B - 1);
            } }; e.exports = s; }, { "../../../math": 102, "../../../utils": 151 }], 94: [function (t, e, r) { var i = t("./buildLine"), n = t("../../../utils"), s = t("earcut"), o = function (t, e) { t.points = t.shape.points.slice(); var r = t.points; if (t.fill && r.length > 6) {
                for (var o = [], a = t.holes, h = 0; h < a.length; h++) {
                    var u = a[h];
                    o.push(r.length / 2), r = r.concat(u.points);
                }
                var l = e.points, c = e.indices, d = r.length / 2, p = n.hex2rgb(t.fillColor), f = t.fillAlpha, v = p[0] * f, g = p[1] * f, y = p[2] * f, x = s(r, o, 2);
                if (!x)
                    return;
                var m = l.length / 6;
                for (h = 0; h < x.length; h += 3)
                    c.push(x[h] + m), c.push(x[h] + m), c.push(x[h + 1] + m), c.push(x[h + 2] + m), c.push(x[h + 2] + m);
                for (h = 0; h < d; h++)
                    l.push(r[2 * h], r[2 * h + 1], v, g, y, f);
            } t.lineWidth > 0 && i(t, e); }; e.exports = o; }, { "../../../utils": 151, "./buildLine": 93, earcut: 31 }], 95: [function (t, e, r) { var i = t("./buildLine"), n = t("../../../utils"), s = function (t, e) { var r = t.shape, s = r.x, o = r.y, a = r.width, h = r.height; if (t.fill) {
                var u = n.hex2rgb(t.fillColor), l = t.fillAlpha, c = u[0] * l, d = u[1] * l, p = u[2] * l, f = e.points, v = e.indices, g = f.length / 6;
                f.push(s, o), f.push(c, d, p, l), f.push(s + a, o), f.push(c, d, p, l), f.push(s, o + h), f.push(c, d, p, l), f.push(s + a, o + h), f.push(c, d, p, l), v.push(g, g, g + 1, g + 2, g + 3, g + 3);
            } if (t.lineWidth) {
                var y = t.points;
                t.points = [s, o, s + a, o, s + a, o + h, s, o + h, s, o], i(t, e), t.points = y;
            } }; e.exports = s; }, { "../../../utils": 151, "./buildLine": 93 }], 96: [function (t, e, r) { var i = t("earcut"), n = t("./buildLine"), s = t("../../../utils"), o = function (t, e) { var r = t.shape, o = r.x, h = r.y, u = r.width, l = r.height, c = r.radius, d = []; if (d.push(o, h + c), a(o, h + l - c, o, h + l, o + c, h + l, d), a(o + u - c, h + l, o + u, h + l, o + u, h + l - c, d), a(o + u, h + c, o + u, h, o + u - c, h, d), a(o + c, h, o, h, o, h + c + 1e-10, d), t.fill) {
                var p = s.hex2rgb(t.fillColor), f = t.fillAlpha, v = p[0] * f, g = p[1] * f, y = p[2] * f, x = e.points, m = e.indices, _ = x.length / 6, b = i(d, null, 2), T = 0;
                for (T = 0; T < b.length; T += 3)
                    m.push(b[T] + _), m.push(b[T] + _), m.push(b[T + 1] + _), m.push(b[T + 2] + _), m.push(b[T + 2] + _);
                for (T = 0; T < d.length; T++)
                    x.push(d[T], d[++T], v, g, y, f);
            } if (t.lineWidth) {
                var E = t.points;
                t.points = d, n(t, e), t.points = E;
            } }, a = function (t, e, r, i, n, s, o) { function a(t, e, r) { var i = e - t; return t + i * r; } for (var h, u, l, c, d, p, f = 20, v = o || [], g = 0, y = 0; y <= f; y++)
                g = y / f, h = a(t, r, g), u = a(e, i, g), l = a(r, n, g), c = a(i, s, g), d = a(h, l, g), p = a(u, c, g), v.push(d, p); return v; }; e.exports = o; }, { "../../../utils": 151, "./buildLine": 93, earcut: 31 }], 97: [function (t, e, r) { var i = e.exports = Object.assign(t("./const"), t("./math"), { utils: t("./utils"), ticker: t("./ticker"), DisplayObject: t("./display/DisplayObject"), Container: t("./display/Container"), Transform: t("./display/Transform"), TransformStatic: t("./display/TransformStatic"), TransformBase: t("./display/TransformBase"), Sprite: t("./sprites/Sprite"), CanvasSpriteRenderer: t("./sprites/canvas/CanvasSpriteRenderer"), CanvasTinter: t("./sprites/canvas/CanvasTinter"), SpriteRenderer: t("./sprites/webgl/SpriteRenderer"), Text: t("./text/Text"), TextStyle: t("./text/TextStyle"), Graphics: t("./graphics/Graphics"), GraphicsData: t("./graphics/GraphicsData"), GraphicsRenderer: t("./graphics/webgl/GraphicsRenderer"), CanvasGraphicsRenderer: t("./graphics/canvas/CanvasGraphicsRenderer"), Texture: t("./textures/Texture"), BaseTexture: t("./textures/BaseTexture"), RenderTexture: t("./textures/RenderTexture"), BaseRenderTexture: t("./textures/BaseRenderTexture"), VideoBaseTexture: t("./textures/VideoBaseTexture"), TextureUvs: t("./textures/TextureUvs"), CanvasRenderer: t("./renderers/canvas/CanvasRenderer"), CanvasRenderTarget: t("./renderers/canvas/utils/CanvasRenderTarget"), Shader: t("./Shader"), WebGLRenderer: t("./renderers/webgl/WebGLRenderer"), WebGLManager: t("./renderers/webgl/managers/WebGLManager"), ObjectRenderer: t("./renderers/webgl/utils/ObjectRenderer"), RenderTarget: t("./renderers/webgl/utils/RenderTarget"), Quad: t("./renderers/webgl/utils/Quad"), SpriteMaskFilter: t("./renderers/webgl/filters/spriteMask/SpriteMaskFilter"), Filter: t("./renderers/webgl/filters/Filter"), glCore: t("pixi-gl-core"), autoDetectRenderer: function (t, e, r, n) { return t = t || 800, e = e || 600, !n && i.utils.isWebGLSupported() ? new i.WebGLRenderer(t, e, r) : new i.CanvasRenderer(t, e, r); } }); }, { "./Shader": 77, "./const": 78, "./display/Container": 80, "./display/DisplayObject": 81, "./display/Transform": 82, "./display/TransformBase": 83, "./display/TransformStatic": 84, "./graphics/Graphics": 85, "./graphics/GraphicsData": 86, "./graphics/canvas/CanvasGraphicsRenderer": 87, "./graphics/webgl/GraphicsRenderer": 89, "./math": 102, "./renderers/canvas/CanvasRenderer": 109, "./renderers/canvas/utils/CanvasRenderTarget": 111, "./renderers/webgl/WebGLRenderer": 116, "./renderers/webgl/filters/Filter": 118, "./renderers/webgl/filters/spriteMask/SpriteMaskFilter": 121, "./renderers/webgl/managers/WebGLManager": 125, "./renderers/webgl/utils/ObjectRenderer": 126, "./renderers/webgl/utils/Quad": 127, "./renderers/webgl/utils/RenderTarget": 128, "./sprites/Sprite": 133, "./sprites/canvas/CanvasSpriteRenderer": 134, "./sprites/canvas/CanvasTinter": 135, "./sprites/webgl/SpriteRenderer": 137, "./text/Text": 139, "./text/TextStyle": 140, "./textures/BaseRenderTexture": 141, "./textures/BaseTexture": 142, "./textures/RenderTexture": 143, "./textures/Texture": 144, "./textures/TextureUvs": 145, "./textures/VideoBaseTexture": 146, "./ticker": 148, "./utils": 151, "pixi-gl-core": 7 }], 98: [function (t, e, r) { function i(t) { return t < 0 ? -1 : t > 0 ? 1 : 0; } function n() { for (var t = 0; t < 16; t++) {
                var e = [];
                c.push(e);
                for (var r = 0; r < 16; r++)
                    for (var n = i(s[t] * s[r] + a[t] * o[r]), d = i(o[t] * s[r] + h[t] * o[r]), p = i(s[t] * a[r] + a[t] * h[r]), f = i(o[t] * a[r] + h[t] * h[r]), v = 0; v < 16; v++)
                        if (s[v] === n && o[v] === d && a[v] === p && h[v] === f) {
                            e.push(v);
                            break;
                        }
            } for (t = 0; t < 16; t++) {
                var g = new l;
                g.set(s[t], o[t], a[t], h[t], 0, 0), u.push(g);
            } } var s = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], o = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], a = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], h = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], u = [], l = t("./Matrix"), c = []; n(); var d = { E: 0, SE: 1, S: 2, SW: 3, W: 4, NW: 5, N: 6, NE: 7, MIRROR_VERTICAL: 8, MIRROR_HORIZONTAL: 12, uX: function (t) { return s[t]; }, uY: function (t) { return o[t]; }, vX: function (t) { return a[t]; }, vY: function (t) { return h[t]; }, inv: function (t) { return 8 & t ? 15 & t : 7 & -t; }, add: function (t, e) { return c[t][e]; }, sub: function (t, e) { return c[t][d.inv(e)]; }, rotate180: function (t) { return 4 ^ t; }, isSwapWidthHeight: function (t) { return 2 === (3 & t); }, byDirection: function (t, e) { return 2 * Math.abs(t) <= Math.abs(e) ? e >= 0 ? d.S : d.N : 2 * Math.abs(e) <= Math.abs(t) ? t > 0 ? d.E : d.W : e > 0 ? t > 0 ? d.SE : d.SW : t > 0 ? d.NE : d.NW; }, matrixAppendRotationInv: function (t, e, r, i) { var n = u[d.inv(e)]; r = r || 0, i = i || 0, n.tx = r, n.ty = i, t.append(n); } }; e.exports = d; }, { "./Matrix": 99 }], 99: [function (t, e, r) { function i() { this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this.array = null; } var n = t("./Point"); i.prototype.constructor = i, e.exports = i, i.prototype.fromArray = function (t) { this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5]; }, i.prototype.set = function (t, e, r, i, n, s) { return this.a = t, this.b = e, this.c = r, this.d = i, this.tx = n, this.ty = s, this; }, i.prototype.toArray = function (t, e) { this.array || (this.array = new Float32Array(9)); var r = e || this.array; return t ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r; }, i.prototype.apply = function (t, e) { e = e || new n; var r = t.x, i = t.y; return e.x = this.a * r + this.c * i + this.tx, e.y = this.b * r + this.d * i + this.ty, e; }, i.prototype.applyInverse = function (t, e) { e = e || new n; var r = 1 / (this.a * this.d + this.c * -this.b), i = t.x, s = t.y; return e.x = this.d * r * i + -this.c * r * s + (this.ty * this.c - this.tx * this.d) * r, e.y = this.a * r * s + -this.b * r * i + (-this.ty * this.a + this.tx * this.b) * r, e; }, i.prototype.translate = function (t, e) { return this.tx += t, this.ty += e, this; }, i.prototype.scale = function (t, e) { return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this; }, i.prototype.rotate = function (t) { var e = Math.cos(t), r = Math.sin(t), i = this.a, n = this.c, s = this.tx; return this.a = i * e - this.b * r, this.b = i * r + this.b * e, this.c = n * e - this.d * r, this.d = n * r + this.d * e, this.tx = s * e - this.ty * r, this.ty = s * r + this.ty * e, this; }, i.prototype.append = function (t) { var e = this.a, r = this.b, i = this.c, n = this.d; return this.a = t.a * e + t.b * i, this.b = t.a * r + t.b * n, this.c = t.c * e + t.d * i, this.d = t.c * r + t.d * n, this.tx = t.tx * e + t.ty * i + this.tx, this.ty = t.tx * r + t.ty * n + this.ty, this; }, i.prototype.setTransform = function (t, e, r, i, n, s, o, a, h) { var u, l, c, d, p, f, v, g, y, x; return p = Math.sin(o), f = Math.cos(o), v = Math.cos(h), g = Math.sin(h), y = -Math.sin(a), x = Math.cos(a), u = f * n, l = p * n, c = -p * s, d = f * s, this.a = v * u + g * c, this.b = v * l + g * d, this.c = y * u + x * c, this.d = y * l + x * d, this.tx = t + (r * u + i * c), this.ty = e + (r * l + i * d), this; }, i.prototype.prepend = function (t) { var e = this.tx; if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                var r = this.a, i = this.c;
                this.a = r * t.a + this.b * t.c, this.b = r * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, this.d = i * t.b + this.d * t.d;
            } return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this; }, i.prototype.decompose = function (t) { var e = this.a, r = this.b, i = this.c, n = this.d, s = Math.atan2(-i, n), o = Math.atan2(r, e), a = Math.abs(1 - s / o); return a < 1e-5 ? (t.rotation = o, e < 0 && n >= 0 && (t.rotation += t.rotation <= 0 ? Math.PI : -Math.PI), t.skew.x = t.skew.y = 0) : (t.skew.x = s, t.skew.y = o), t.scale.x = Math.sqrt(e * e + r * r), t.scale.y = Math.sqrt(i * i + n * n), t.position.x = this.tx, t.position.y = this.ty, t; }, i.prototype.invert = function () { var t = this.a, e = this.b, r = this.c, i = this.d, n = this.tx, s = t * i - e * r; return this.a = i / s, this.b = -e / s, this.c = -r / s, this.d = t / s, this.tx = (r * this.ty - i * n) / s, this.ty = -(t * this.ty - e * n) / s, this; }, i.prototype.identity = function () { return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this; }, i.prototype.clone = function () { var t = new i; return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t; }, i.prototype.copy = function (t) { return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t; }, i.IDENTITY = new i, i.TEMP_MATRIX = new i; }, { "./Point": 101 }], 100: [function (t, e, r) { function i(t, e, r, i) { this._x = r || 0, this._y = i || 0, this.cb = t, this.scope = e; } i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { x: { get: function () { return this._x; }, set: function (t) { this._x !== t && (this._x = t, this.cb.call(this.scope)); } }, y: { get: function () { return this._y; }, set: function (t) { this._y !== t && (this._y = t, this.cb.call(this.scope)); } } }), i.prototype.set = function (t, e) { var r = t || 0, i = e || (0 !== e ? r : 0); this._x === r && this._y === i || (this._x = r, this._y = i, this.cb.call(this.scope)); }, i.prototype.copy = function (t) { this._x === t.x && this._y === t.y || (this._x = t.x, this._y = t.y, this.cb.call(this.scope)); }; }, {}], 101: [function (t, e, r) { function i(t, e) { this.x = t || 0, this.y = e || 0; } i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () { return new i(this.x, this.y); }, i.prototype.copy = function (t) { this.set(t.x, t.y); }, i.prototype.equals = function (t) { return t.x === this.x && t.y === this.y; }, i.prototype.set = function (t, e) { this.x = t || 0, this.y = e || (0 !== e ? this.x : 0); }; }, {}], 102: [function (t, e, r) { e.exports = { Point: t("./Point"), ObservablePoint: t("./ObservablePoint"), Matrix: t("./Matrix"), GroupD8: t("./GroupD8"), Circle: t("./shapes/Circle"), Ellipse: t("./shapes/Ellipse"), Polygon: t("./shapes/Polygon"), Rectangle: t("./shapes/Rectangle"), RoundedRectangle: t("./shapes/RoundedRectangle") }; }, { "./GroupD8": 98, "./Matrix": 99, "./ObservablePoint": 100, "./Point": 101, "./shapes/Circle": 103, "./shapes/Ellipse": 104, "./shapes/Polygon": 105, "./shapes/Rectangle": 106, "./shapes/RoundedRectangle": 107 }], 103: [function (t, e, r) { function i(t, e, r) { this.x = t || 0, this.y = e || 0, this.radius = r || 0, this.type = s.SHAPES.CIRC; } var n = t("./Rectangle"), s = t("../../const"); i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () { return new i(this.x, this.y, this.radius); }, i.prototype.contains = function (t, e) { if (this.radius <= 0)
                return !1; var r = this.x - t, i = this.y - e, n = this.radius * this.radius; return r *= r, i *= i, r + i <= n; }, i.prototype.getBounds = function () { return new n(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius); }; }, { "../../const": 78, "./Rectangle": 106 }], 104: [function (t, e, r) { function i(t, e, r, i) { this.x = t || 0, this.y = e || 0, this.width = r || 0, this.height = i || 0, this.type = s.SHAPES.ELIP; } var n = t("./Rectangle"), s = t("../../const"); i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () { return new i(this.x, this.y, this.width, this.height); }, i.prototype.contains = function (t, e) { if (this.width <= 0 || this.height <= 0)
                return !1; var r = (t - this.x) / this.width, i = (e - this.y) / this.height; return r *= r, i *= i, r + i <= 1; }, i.prototype.getBounds = function () { return new n(this.x - this.width, this.y - this.height, this.width, this.height); }; }, { "../../const": 78, "./Rectangle": 106 }], 105: [function (t, e, r) { function i(t) { var e = t; if (!Array.isArray(e)) {
                e = new Array(arguments.length);
                for (var r = 0; r < e.length; ++r)
                    e[r] = arguments[r];
            } if (e[0] instanceof n) {
                for (var i = [], o = 0, a = e.length; o < a; o++)
                    i.push(e[o].x, e[o].y);
                e = i;
            } this.closed = !0, this.points = e, this.type = s.SHAPES.POLY; } var n = t("../Point"), s = t("../../const"); i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () { return new i(this.points.slice()); }, i.prototype.close = function () { var t = this.points; t[0] === t[t.length - 2] && t[1] === t[t.length - 1] || t.push(t[0], t[1]); }, i.prototype.contains = function (t, e) { for (var r = !1, i = this.points.length / 2, n = 0, s = i - 1; n < i; s = n++) {
                var o = this.points[2 * n], a = this.points[2 * n + 1], h = this.points[2 * s], u = this.points[2 * s + 1], l = a > e != u > e && t < (h - o) * (e - a) / (u - a) + o;
                l && (r = !r);
            } return r; }; }, { "../../const": 78, "../Point": 101 }], 106: [function (t, e, r) { function i(t, e, r, i) { this.x = t || 0, this.y = e || 0, this.width = r || 0, this.height = i || 0, this.type = n.SHAPES.RECT; } var n = t("../../const"); i.prototype.constructor = i, e.exports = i, i.EMPTY = new i(0, 0, 0, 0), i.prototype.clone = function () { return new i(this.x, this.y, this.width, this.height); }, i.prototype.copy = function (t) { return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this; }, i.prototype.contains = function (t, e) { return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height); }, i.prototype.pad = function (t, e) { t = t || 0, e = e || (0 !== e ? t : 0), this.x -= t, this.y -= e, this.width += 2 * t, this.height += 2 * e; }, i.prototype.fit = function (t) { this.x < t.x && (this.width += this.x, this.width < 0 && (this.width = 0), this.x = t.x), this.y < t.y && (this.height += this.y, this.height < 0 && (this.height = 0), this.y = t.y), this.x + this.width > t.x + t.width && (this.width = t.width - this.x, this.width < 0 && (this.width = 0)), this.y + this.height > t.y + t.height && (this.height = t.height - this.y, this.height < 0 && (this.height = 0)); }, i.prototype.enlarge = function (t) { if (t !== i.EMPTY) {
                var e = Math.min(this.x, t.x), r = Math.max(this.x + this.width, t.x + t.width), n = Math.min(this.y, t.y), s = Math.max(this.y + this.height, t.y + t.height);
                this.x = e, this.width = r - e, this.y = n, this.height = s - n;
            } }; }, { "../../const": 78 }], 107: [function (t, e, r) { function i(t, e, r, i, s) { this.x = t || 0, this.y = e || 0, this.width = r || 0, this.height = i || 0, this.radius = s || 20, this.type = n.SHAPES.RREC; } var n = t("../../const"); i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () { return new i(this.x, this.y, this.width, this.height, this.radius); }, i.prototype.contains = function (t, e) { return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height); }; }, { "../../const": 78 }], 108: [function (t, e, r) {
                function i(t, e, r, i) {
                    if (u.call(this), n.sayHello(t), i)
                        for (var s in o.DEFAULT_RENDER_OPTIONS)
                            "undefined" == typeof i[s] && (i[s] = o.DEFAULT_RENDER_OPTIONS[s]);
                    else
                        i = o.DEFAULT_RENDER_OPTIONS;
                    this.type = o.RENDERER_TYPE.UNKNOWN, this.width = e || 800, this.height = r || 600, this.view = i.view || document.createElement("canvas"), this.resolution = i.resolution, this.transparent = i.transparent, this.autoResize = i.autoResize || !1,
                        this.blendModes = null, this.preserveDrawingBuffer = i.preserveDrawingBuffer, this.clearBeforeRender = i.clearBeforeRender, this.roundPixels = i.roundPixels, this._backgroundColor = 0, this._backgroundColorRgba = [0, 0, 0, 0], this._backgroundColorString = "#000000", this.backgroundColor = i.backgroundColor || this._backgroundColor, this._tempDisplayObjectParent = new a, this._lastObjectRendered = this._tempDisplayObjectParent;
                }
                var n = t("../utils"), s = t("../math"), o = t("../const"), a = t("../display/Container"), h = t("../textures/RenderTexture"), u = t("eventemitter3"), l = new s.Matrix;
                i.prototype = Object.create(u.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { backgroundColor: { get: function () { return this._backgroundColor; }, set: function (t) { this._backgroundColor = t, this._backgroundColorString = n.hex2string(t), n.hex2rgb(t, this._backgroundColorRgba); } } }), i.prototype.resize = function (t, e) { this.width = t * this.resolution, this.height = e * this.resolution, this.view.width = this.width, this.view.height = this.height, this.autoResize && (this.view.style.width = this.width / this.resolution + "px", this.view.style.height = this.height / this.resolution + "px"); }, i.prototype.generateTexture = function (t, e, r) { var i = t.getLocalBounds(), n = h.create(0 | i.width, 0 | i.height, e, r); return l.tx = -i.x, l.ty = -i.y, this.render(t, n, !1, l, !0), n; }, i.prototype.destroy = function (t) { t && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.type = o.RENDERER_TYPE.UNKNOWN, this.width = 0, this.height = 0, this.view = null, this.resolution = 0, this.transparent = !1, this.autoResize = !1, this.blendModes = null, this.preserveDrawingBuffer = !1, this.clearBeforeRender = !1, this.roundPixels = !1, this._backgroundColor = 0, this._backgroundColorRgba = null, this._backgroundColorString = null, this.backgroundColor = 0, this._tempDisplayObjectParent = null, this._lastObjectRendered = null; };
            }, { "../const": 78, "../display/Container": 80, "../math": 102, "../textures/RenderTexture": 143, "../utils": 151, eventemitter3: 32 }], 109: [function (t, e, r) { function i(t, e, r) { r = r || {}, n.call(this, "Canvas", t, e, r), this.type = u.RENDERER_TYPE.CANVAS, this.rootContext = this.view.getContext("2d", { alpha: this.transparent }), this.rootResolution = this.resolution, this.refresh = !0, this.maskManager = new s(this), this.smoothProperty = "imageSmoothingEnabled", this.rootContext.imageSmoothingEnabled || (this.rootContext.webkitImageSmoothingEnabled ? this.smoothProperty = "webkitImageSmoothingEnabled" : this.rootContext.mozImageSmoothingEnabled ? this.smoothProperty = "mozImageSmoothingEnabled" : this.rootContext.oImageSmoothingEnabled ? this.smoothProperty = "oImageSmoothingEnabled" : this.rootContext.msImageSmoothingEnabled && (this.smoothProperty = "msImageSmoothingEnabled")), this.initPlugins(), this.blendModes = a(), this._activeBlendMode = null, this.context = null, this.renderingToScreen = !1, this.resize(t, e); } var n = t("../SystemRenderer"), s = t("./utils/CanvasMaskManager"), o = t("./utils/CanvasRenderTarget"), a = t("./utils/mapCanvasBlendModesToPixi"), h = t("../../utils"), u = t("../../const"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, h.pluginTarget.mixin(i), i.prototype.render = function (t, e, r, i, n) { if (this.view) {
                this.renderingToScreen = !e, this.emit("prerender"), e ? (e = e.baseTexture || e, e._canvasRenderTarget || (e._canvasRenderTarget = new o(e.width, e.height, e.resolution), e.source = e._canvasRenderTarget.canvas, e.valid = !0), this.context = e._canvasRenderTarget.context, this.resolution = e._canvasRenderTarget.resolution) : (this.context = this.rootContext, this.resolution = this.rootResolution);
                var s = this.context;
                if (e || (this._lastObjectRendered = t), !n) {
                    var a = t.parent, h = this._tempDisplayObjectParent.transform.worldTransform;
                    i ? i.copy(h) : h.identity(), t.parent = this._tempDisplayObjectParent, t.updateTransform(), t.parent = a;
                }
                s.setTransform(1, 0, 0, 1, 0, 0), s.globalAlpha = 1, s.globalCompositeOperation = this.blendModes[u.BLEND_MODES.NORMAL], navigator.isCocoonJS && this.view.screencanvas && (s.fillStyle = "black", s.clear()), (void 0 !== r ? r : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? s.clearRect(0, 0, this.width, this.height) : (s.fillStyle = this._backgroundColorString, s.fillRect(0, 0, this.width, this.height)));
                var l = this.context;
                this.context = s, t.renderCanvas(this), this.context = l, this.emit("postrender");
            } }, i.prototype.setBlendMode = function (t) { this._activeBlendMode !== t && (this.context.globalCompositeOperation = this.blendModes[t]); }, i.prototype.destroy = function (t) { this.destroyPlugins(), n.prototype.destroy.call(this, t), this.context = null, this.refresh = !0, this.maskManager.destroy(), this.maskManager = null, this.smoothProperty = null; }, i.prototype.resize = function (t, e) { n.prototype.resize.call(this, t, e), this.smoothProperty && (this.rootContext[this.smoothProperty] = u.SCALE_MODES.DEFAULT === u.SCALE_MODES.LINEAR); }; }, { "../../const": 78, "../../utils": 151, "../SystemRenderer": 108, "./utils/CanvasMaskManager": 110, "./utils/CanvasRenderTarget": 111, "./utils/mapCanvasBlendModesToPixi": 113 }], 110: [function (t, e, r) { function i(t) { this.renderer = t; } var n = t("../../../const"); i.prototype.constructor = i, e.exports = i, i.prototype.pushMask = function (t) { var e = this.renderer; e.context.save(); var r = t.alpha, i = t.transform.worldTransform, n = e.resolution; e.context.setTransform(i.a * n, i.b * n, i.c * n, i.d * n, i.tx * n, i.ty * n), t._texture || (this.renderGraphicsShape(t), e.context.clip()), t.worldAlpha = r; }, i.prototype.renderGraphicsShape = function (t) { var e = this.renderer.context, r = t.graphicsData.length; if (0 !== r) {
                e.beginPath();
                for (var i = 0; i < r; i++) {
                    var s = t.graphicsData[i], o = s.shape;
                    if (s.type === n.SHAPES.POLY) {
                        var a = o.points;
                        e.moveTo(a[0], a[1]);
                        for (var h = 1; h < a.length / 2; h++)
                            e.lineTo(a[2 * h], a[2 * h + 1]);
                        a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && e.closePath();
                    }
                    else if (s.type === n.SHAPES.RECT)
                        e.rect(o.x, o.y, o.width, o.height), e.closePath();
                    else if (s.type === n.SHAPES.CIRC)
                        e.arc(o.x, o.y, o.radius, 0, 2 * Math.PI), e.closePath();
                    else if (s.type === n.SHAPES.ELIP) {
                        var u = 2 * o.width, l = 2 * o.height, c = o.x - u / 2, d = o.y - l / 2, p = .5522848, f = u / 2 * p, v = l / 2 * p, g = c + u, y = d + l, x = c + u / 2, m = d + l / 2;
                        e.moveTo(c, m), e.bezierCurveTo(c, m - v, x - f, d, x, d), e.bezierCurveTo(x + f, d, g, m - v, g, m), e.bezierCurveTo(g, m + v, x + f, y, x, y), e.bezierCurveTo(x - f, y, c, m + v, c, m), e.closePath();
                    }
                    else if (s.type === n.SHAPES.RREC) {
                        var _ = o.x, b = o.y, T = o.width, E = o.height, w = o.radius, S = Math.min(T, E) / 2 | 0;
                        w = w > S ? S : w, e.moveTo(_, b + w), e.lineTo(_, b + E - w), e.quadraticCurveTo(_, b + E, _ + w, b + E), e.lineTo(_ + T - w, b + E), e.quadraticCurveTo(_ + T, b + E, _ + T, b + E - w), e.lineTo(_ + T, b + w), e.quadraticCurveTo(_ + T, b, _ + T - w, b), e.lineTo(_ + w, b), e.quadraticCurveTo(_, b, _, b + w), e.closePath();
                    }
                }
            } }, i.prototype.popMask = function (t) { t.context.restore(); }, i.prototype.destroy = function () { }; }, { "../../../const": 78 }], 111: [function (t, e, r) { function i(t, e, r) { this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = r || n.RESOLUTION, this.resize(t, e); } var n = t("../../../const"); i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { width: { get: function () { return this.canvas.width; }, set: function (t) { this.canvas.width = t; } }, height: { get: function () { return this.canvas.height; }, set: function (t) { this.canvas.height = t; } } }), i.prototype.clear = function () { this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); }, i.prototype.resize = function (t, e) { this.canvas.width = t * this.resolution, this.canvas.height = e * this.resolution; }, i.prototype.destroy = function () { this.context = null, this.canvas = null; }; }, { "../../../const": 78 }], 112: [function (t, e, r) { var i = function () { if ("undefined" == typeof document)
                return !1; var t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/", e = "AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==", r = new Image; r.src = t + "AP804Oa6" + e; var i = new Image; i.src = t + "/wCKxvRF" + e; var n = document.createElement("canvas"); n.width = 6, n.height = 1; var s = n.getContext("2d"); s.globalCompositeOperation = "multiply", s.drawImage(r, 0, 0), s.drawImage(i, 2, 0); var o = s.getImageData(2, 0, 1, 1); if (!o)
                return !1; var a = o.data; return 255 === a[0] && 0 === a[1] && 0 === a[2]; }; e.exports = i; }, {}], 113: [function (t, e, r) { function i(t) { return t = t || [], s() ? (t[n.BLEND_MODES.NORMAL] = "source-over", t[n.BLEND_MODES.ADD] = "lighter", t[n.BLEND_MODES.MULTIPLY] = "multiply", t[n.BLEND_MODES.SCREEN] = "screen", t[n.BLEND_MODES.OVERLAY] = "overlay", t[n.BLEND_MODES.DARKEN] = "darken", t[n.BLEND_MODES.LIGHTEN] = "lighten", t[n.BLEND_MODES.COLOR_DODGE] = "color-dodge", t[n.BLEND_MODES.COLOR_BURN] = "color-burn", t[n.BLEND_MODES.HARD_LIGHT] = "hard-light", t[n.BLEND_MODES.SOFT_LIGHT] = "soft-light", t[n.BLEND_MODES.DIFFERENCE] = "difference", t[n.BLEND_MODES.EXCLUSION] = "exclusion", t[n.BLEND_MODES.HUE] = "hue", t[n.BLEND_MODES.SATURATION] = "saturate", t[n.BLEND_MODES.COLOR] = "color", t[n.BLEND_MODES.LUMINOSITY] = "luminosity") : (t[n.BLEND_MODES.NORMAL] = "source-over", t[n.BLEND_MODES.ADD] = "lighter", t[n.BLEND_MODES.MULTIPLY] = "source-over", t[n.BLEND_MODES.SCREEN] = "source-over", t[n.BLEND_MODES.OVERLAY] = "source-over", t[n.BLEND_MODES.DARKEN] = "source-over", t[n.BLEND_MODES.LIGHTEN] = "source-over", t[n.BLEND_MODES.COLOR_DODGE] = "source-over", t[n.BLEND_MODES.COLOR_BURN] = "source-over", t[n.BLEND_MODES.HARD_LIGHT] = "source-over", t[n.BLEND_MODES.SOFT_LIGHT] = "source-over", t[n.BLEND_MODES.DIFFERENCE] = "source-over", t[n.BLEND_MODES.EXCLUSION] = "source-over", t[n.BLEND_MODES.HUE] = "source-over", t[n.BLEND_MODES.SATURATION] = "source-over", t[n.BLEND_MODES.COLOR] = "source-over", t[n.BLEND_MODES.LUMINOSITY] = "source-over"), t; } var n = t("../../../const"), s = t("./canUseNewCanvasBlendModes"); e.exports = i; }, { "../../../const": 78, "./canUseNewCanvasBlendModes": 112 }], 114: [function (t, e, r) { function i(t) { this.renderer = t, this.count = 0, this.checkCount = 0, this.maxIdle = 3600, this.checkCountMax = 600, this.mode = n.GC_MODES.DEFAULT; } var n = t("../../const"); i.prototype.constructor = i, e.exports = i, i.prototype.update = function () { this.count++, this.mode !== n.GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())); }, i.prototype.run = function () { var t, e, r = this.renderer.textureManager, i = r._managedTextures, n = !1; for (t = 0; t < i.length; t++) {
                var s = i[t];
                !s._glRenderTargets && this.count - s.touched > this.maxIdle && (r.destroyTexture(s, !0), i[t] = null, n = !0);
            } if (n) {
                for (e = 0, t = 0; t < i.length; t++)
                    null !== i[t] && (i[e++] = i[t]);
                i.length = e;
            } }, i.prototype.unload = function (t) { var e = this.renderer.textureManager; t._texture && e.destroyTexture(t._texture, !0); for (var r = t.children.length - 1; r >= 0; r--)
                this.unload(t.children[r]); }; }, { "../../const": 78 }], 115: [function (t, e, r) { var i = t("pixi-gl-core").GLTexture, n = t("../../const"), s = t("./utils/RenderTarget"), o = t("../../utils"), a = function (t) { this.renderer = t, this.gl = t.gl, this._managedTextures = []; }; a.prototype.bindTexture = function () { }, a.prototype.getTexture = function () { }, a.prototype.updateTexture = function (t) { t = t.baseTexture || t; var e = !!t._glRenderTargets; if (t.hasLoaded) {
                var r = t._glTextures[this.renderer.CONTEXT_UID];
                if (r)
                    e ? t._glRenderTargets[this.renderer.CONTEXT_UID].resize(t.width, t.height) : r.upload(t.source);
                else {
                    if (e) {
                        var o = new s(this.gl, t.width, t.height, t.scaleMode, t.resolution);
                        o.resize(t.width, t.height), t._glRenderTargets[this.renderer.CONTEXT_UID] = o, r = o.texture;
                    }
                    else
                        r = new i(this.gl), r.premultiplyAlpha = !0, r.upload(t.source);
                    t._glTextures[this.renderer.CONTEXT_UID] = r, t.on("update", this.updateTexture, this), t.on("dispose", this.destroyTexture, this), this._managedTextures.push(t), t.isPowerOfTwo ? (t.mipmap && r.enableMipmap(), t.wrapMode === n.WRAP_MODES.CLAMP ? r.enableWrapClamp() : t.wrapMode === n.WRAP_MODES.REPEAT ? r.enableWrapRepeat() : r.enableWrapMirrorRepeat()) : r.enableWrapClamp(), t.scaleMode === n.SCALE_MODES.NEAREST ? r.enableNearestScaling() : r.enableLinearScaling();
                }
                return r;
            } }, a.prototype.destroyTexture = function (t, e) { if (t = t.baseTexture || t, t.hasLoaded && t._glTextures[this.renderer.CONTEXT_UID] && (t._glTextures[this.renderer.CONTEXT_UID].destroy(), t.off("update", this.updateTexture, this), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.renderer.CONTEXT_UID], !e)) {
                var r = this._managedTextures.indexOf(t);
                r !== -1 && o.removeItems(this._managedTextures, r, 1);
            } }, a.prototype.removeAll = function () { for (var t = 0; t < this._managedTextures.length; ++t) {
                var e = this._managedTextures[t];
                e._glTextures[this.renderer.CONTEXT_UID] && delete e._glTextures[this.renderer.CONTEXT_UID];
            } }, a.prototype.destroy = function () { for (var t = 0; t < this._managedTextures.length; ++t) {
                var e = this._managedTextures[t];
                this.destroyTexture(e, !0), e.off("update", this.updateTexture, this), e.off("dispose", this.destroyTexture, this);
            } this._managedTextures = null; }, e.exports = a; }, { "../../const": 78, "../../utils": 151, "./utils/RenderTarget": 128, "pixi-gl-core": 7 }], 116: [function (t, e, r) { function i(t, e, r) { r = r || {}, n.call(this, "WebGL", t, e, r), this.type = x.RENDERER_TYPE.WEBGL, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), this.view.addEventListener("webglcontextlost", this.handleContextLost, !1), this.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1), this._contextOptions = { alpha: this.transparent, antialias: r.antialias, premultipliedAlpha: this.transparent && "notMultiplied" !== this.transparent, stencil: !0, preserveDrawingBuffer: r.preserveDrawingBuffer }, this._backgroundColorRgba[3] = this.transparent ? 0 : 1, this.maskManager = new s(this), this.stencilManager = new o(this), this.emptyRenderer = new u(this), this.currentRenderer = this.emptyRenderer, this.initPlugins(), r.context && v(r.context), this.gl = r.context || p(this.view, this._contextOptions), this.CONTEXT_UID = m++, this.state = new d(this.gl), this.renderingToScreen = !0, this._initContext(), this.filterManager = new a(this), this.drawModes = f(this.gl), this._activeShader = null, this._activeRenderTarget = null, this._activeTextureLocation = 999, this._activeTexture = null, this.setBlendMode(0); } var n = t("../SystemRenderer"), s = t("./managers/MaskManager"), o = t("./managers/StencilManager"), a = t("./managers/FilterManager"), h = t("./utils/RenderTarget"), u = t("./utils/ObjectRenderer"), l = t("./TextureManager"), c = t("./TextureGarbageCollector"), d = t("./WebGLState"), p = t("pixi-gl-core").createContext, f = t("./utils/mapWebGLDrawModesToPixi"), v = t("./utils/validateContext"), g = t("../../utils"), y = t("pixi-gl-core"), x = t("../../const"), m = 0; i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, g.pluginTarget.mixin(i), i.prototype._initContext = function () { var t = this.gl; this.textureManager = new l(this), this.textureGC = new c(this), this.state.resetToDefault(), this.rootRenderTarget = new h(t, this.width, this.height, null, this.resolution, (!0)), this.rootRenderTarget.clearColor = this._backgroundColorRgba, this.bindRenderTarget(this.rootRenderTarget), this.emit("context", t), this.resize(this.width, this.height); }, i.prototype.render = function (t, e, r, i, n) { if (this.renderingToScreen = !e, this.emit("prerender"), this.gl && !this.gl.isContextLost()) {
                if (e || (this._lastObjectRendered = t), !n) {
                    var s = t.parent;
                    t.parent = this._tempDisplayObjectParent, t.updateTransform(), t.parent = s;
                }
                this.bindRenderTexture(e, i), this.currentRenderer.start(), (void 0 !== r ? r : this.clearBeforeRender) && this._activeRenderTarget.clear(), t.renderWebGL(this), this.currentRenderer.flush(), this.textureGC.update(), this.emit("postrender");
            } }, i.prototype.setObjectRenderer = function (t) { this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start()); }, i.prototype.flush = function () { this.setObjectRenderer(this.emptyRenderer); }, i.prototype.resize = function (t, e) { n.prototype.resize.call(this, t, e), this.rootRenderTarget.resize(t, e), this._activeRenderTarget === this.rootRenderTarget && (this.rootRenderTarget.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(!0))); }, i.prototype.setBlendMode = function (t) { this.state.setBlendMode(t); }, i.prototype.clear = function (t) { this._activeRenderTarget.clear(t); }, i.prototype.setTransform = function (t) { this._activeRenderTarget.transform = t; }, i.prototype.bindRenderTexture = function (t, e) { var r; if (t) {
                var i = t.baseTexture, n = this.gl;
                i._glRenderTargets[this.CONTEXT_UID] ? (this._activeTextureLocation = i._id, n.activeTexture(n.TEXTURE0 + i._id), n.bindTexture(n.TEXTURE_2D, null)) : (this.textureManager.updateTexture(i), n.bindTexture(n.TEXTURE_2D, null)), r = i._glRenderTargets[this.CONTEXT_UID], r.setFrame(t.frame);
            }
            else
                r = this.rootRenderTarget; return r.transform = e, this.bindRenderTarget(r), this; }, i.prototype.bindRenderTarget = function (t) { return t !== this._activeRenderTarget && (this._activeRenderTarget = t, t.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = t.projectionMatrix.toArray(!0)), this.stencilManager.setMaskStack(t.stencilMaskStack)), this; }, i.prototype.bindShader = function (t) { return this._activeShader !== t && (this._activeShader = t, t.bind(), t.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(!0)), this; }, i.prototype.bindTexture = function (t, e) { t = t.baseTexture || t; var r = this.gl; return e = e || 0, this._activeTextureLocation !== e && (this._activeTextureLocation = e, r.activeTexture(r.TEXTURE0 + e)), this._activeTexture = t, t._glTextures[this.CONTEXT_UID] ? (t.touched = this.textureGC.count, t._glTextures[this.CONTEXT_UID].bind()) : this.textureManager.updateTexture(t), this; }, i.prototype.createVao = function () { return new y.VertexArrayObject(this.gl, this.state.attribState); }, i.prototype.reset = function () { return this.setObjectRenderer(this.emptyRenderer), this._activeShader = null, this._activeRenderTarget = this.rootRenderTarget, this._activeTextureLocation = 999, this._activeTexture = null, this.rootRenderTarget.activate(), this.state.resetToDefault(), this; }, i.prototype.handleContextLost = function (t) { t.preventDefault(); }, i.prototype.handleContextRestored = function () { this._initContext(), this.textureManager.removeAll(); }, i.prototype.destroy = function (t) { this.destroyPlugins(), this.view.removeEventListener("webglcontextlost", this.handleContextLost), this.view.removeEventListener("webglcontextrestored", this.handleContextRestored), this.textureManager.destroy(), n.prototype.destroy.call(this, t), this.uid = 0, this.maskManager.destroy(), this.stencilManager.destroy(), this.filterManager.destroy(), this.maskManager = null, this.filterManager = null, this.textureManager = null, this.currentRenderer = null, this.handleContextLost = null, this.handleContextRestored = null, this._contextOptions = null, this.gl.useProgram(null), this.gl.getExtension("WEBGL_lose_context") && this.gl.getExtension("WEBGL_lose_context").loseContext(), this.gl = null; }; }, { "../../const": 78, "../../utils": 151, "../SystemRenderer": 108, "./TextureGarbageCollector": 114, "./TextureManager": 115, "./WebGLState": 117, "./managers/FilterManager": 122, "./managers/MaskManager": 123, "./managers/StencilManager": 124, "./utils/ObjectRenderer": 126, "./utils/RenderTarget": 128, "./utils/mapWebGLDrawModesToPixi": 131, "./utils/validateContext": 132, "pixi-gl-core": 7 }], 117: [function (t, e, r) { function i(t) { this.activeState = new Uint8Array(16), this.defaultState = new Uint8Array(16), this.defaultState[0] = 1, this.stackIndex = 0, this.stack = [], this.gl = t, this.maxAttribs = t.getParameter(t.MAX_VERTEX_ATTRIBS), this.attribState = { tempAttribState: new Array(this.maxAttribs), attribState: new Array(this.maxAttribs) }, this.blendModes = n(t), this.nativeVaoExtension = t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object"); } var n = t("./utils/mapWebGLBlendModesToPixi"); i.prototype.push = function () { var t = this.stack[++this.stackIndex]; t || (t = this.stack[this.stackIndex] = new Uint8Array(16)); for (var e = 0; e < this.activeState.length; e++)
                this.activeState[e] = t[e]; }; var s = 0, o = 1, a = 2, h = 3, u = 4; i.prototype.pop = function () { var t = this.stack[--this.stackIndex]; this.setState(t); }, i.prototype.setState = function (t) { this.setBlend(t[s]), this.setDepthTest(t[o]), this.setFrontFace(t[a]), this.setCullFace(t[h]), this.setBlendMode(t[u]); }, i.prototype.setBlend = function (t) { if (!(this.activeState[s] === t | 0)) {
                this.activeState[s] = 0 | t;
                var e = this.gl;
                t ? e.enable(e.BLEND) : e.disable(e.BLEND);
            } }, i.prototype.setBlendMode = function (t) { t !== this.activeState[u] && (this.activeState[u] = t, this.gl.blendFunc(this.blendModes[t][0], this.blendModes[t][1])); }, i.prototype.setDepthTest = function (t) { if (!(this.activeState[o] === t | 0)) {
                this.activeState[o] = 0 | t;
                var e = this.gl;
                t ? e.enable(e.DEPTH_TEST) : e.disable(e.DEPTH_TEST);
            } }, i.prototype.setCullFace = function (t) { if (!(this.activeState[h] === t | 0)) {
                this.activeState[h] = 0 | t;
                var e = this.gl;
                t ? e.enable(e.CULL_FACE) : e.disable(e.CULL_FACE);
            } }, i.prototype.setFrontFace = function (t) { if (!(this.activeState[a] === t | 0)) {
                this.activeState[a] = 0 | t;
                var e = this.gl;
                t ? e.frontFace(e.CW) : e.frontFace(e.CCW);
            } }, i.prototype.resetAttributes = function () { var t; for (t = 0; t < this.attribState.tempAttribState.length; t++)
                this.attribState.tempAttribState[t] = 0; for (t = 0; t < this.attribState.attribState.length; t++)
                this.attribState.attribState[t] = 0; var e = this.gl; for (t = 1; t < this.maxAttribs; t++)
                e.disableVertexAttribArray(t); }, i.prototype.resetToDefault = function () { this.nativeVaoExtension && this.nativeVaoExtension.bindVertexArrayOES(null), this.resetAttributes(); for (var t = 0; t < this.activeState.length; t++)
                this.activeState[t] = 32; var e = this.gl; e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), this.setState(this.defaultState); }, e.exports = i; }, { "./utils/mapWebGLBlendModesToPixi": 130 }], 118: [function (t, e, r) { function i(t, e, r) { this.vertexSrc = t || i.defaultVertexSrc, this.fragmentSrc = e || i.defaultFragmentSrc, this.blendMode = o.BLEND_MODES.NORMAL, this.uniformData = r || n(this.vertexSrc, this.fragmentSrc, "projectionMatrix|uSampler"), this.uniforms = {}; for (var h in this.uniformData)
                this.uniforms[h] = this.uniformData[h].value; this.glShaders = [], a[this.vertexSrc + this.fragmentSrc] || (a[this.vertexSrc + this.fragmentSrc] = s.uid()), this.glShaderKey = a[this.vertexSrc + this.fragmentSrc], this.padding = 4, this.resolution = 1, this.enabled = !0; } var n = t("./extractUniformsFromSrc"), s = t("../../../utils"), o = t("../../../const"), a = {}; e.exports = i, i.prototype.apply = function (t, e, r, i) { t.applyFilter(this, e, r, i); }, i.defaultVertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}"].join("\n"), i.defaultFragmentSrc = ["varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}"].join("\n"); }, { "../../../const": 78, "../../../utils": 151, "./extractUniformsFromSrc": 119 }], 119: [function (t, e, r) { function i(t, e, r) { var i = n(t, r), s = n(e, r); return Object.assign(i, s); } function n(t) { for (var e, r = new RegExp("^(projectionMatrix|uSampler|filterArea)$"), i = {}, n = t.replace(/\s+/g, " ").split(/\s*;\s*/), o = 0; o < n.length; o++) {
                var a = n[o].trim();
                if (a.indexOf("uniform") > -1) {
                    var h = a.split(" "), u = h[1], l = h[2], c = 1;
                    l.indexOf("[") > -1 && (e = l.split(/\[|\]/), l = e[0], c *= Number(e[1])), l.match(r) || (i[l] = { value: s(u, c), name: l, type: u });
                }
            } return i; } var s = t("pixi-gl-core").shader.defaultValue; e.exports = i; }, { "pixi-gl-core": 7 }], 120: [function (t, e, r) { var i = t("../../../math"), n = function (t, e, r) { var i = t.identity(); return i.translate(e.x / r.width, e.y / r.height), i.scale(r.width, r.height), i; }, s = function (t, e, r) { var i = t.identity(); i.translate(e.x / r.width, e.y / r.height); var n = r.width / e.width, s = r.height / e.height; return i.scale(n, s), i; }, o = function (t, e, r, n) { var s = n.worldTransform.copy(i.Matrix.TEMP_MATRIX), o = n._texture.baseTexture, a = t.identity(), h = r.height / r.width; a.translate(e.x / r.width, e.y / r.height), a.scale(1, h); var u = r.width / o.width, l = r.height / o.height; return s.tx /= o.width * u, s.ty /= o.width * u, s.invert(), a.prepend(s), a.scale(1, 1 / h), a.scale(u, l), a.translate(n.anchor.x, n.anchor.y), a; }; e.exports = { calculateScreenSpaceMatrix: n, calculateNormalizedScreenSpaceMatrix: s, calculateSpriteMatrix: o }; }, { "../../../math": 102 }], 121: [function (t, e, r) { function i(t) { var e = new s.Matrix; n.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", "#define GLSLIFY 1\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n"), t.renderable = !1, this.maskSprite = t, this.maskMatrix = e; } var n = t("../Filter"), s = t("../../../../math"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.apply = function (t, e, r) { var i = this.maskSprite; this.uniforms.mask = i._texture, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, i), this.uniforms.alpha = i.worldAlpha, t.applyFilter(this, e, r); }; }, { "../../../../math": 102, "../Filter": 118 }], 122: [function (t, e, r) { function i(t) { n.call(this, t), this.gl = this.renderer.gl, this.quad = new o(this.gl, t.state.attribState), this.shaderCache = {}, this.pool = {}, this.filterData = null; } var n = t("./WebGLManager"), s = t("../utils/RenderTarget"), o = t("../utils/Quad"), a = t("../../../math"), h = t("../../../Shader"), u = t("../filters/filterTransforms"), l = t("bit-twiddle"), c = function () { this.renderTarget = null, this.sourceFrame = new a.Rectangle, this.destinationFrame = new a.Rectangle, this.filters = [], this.target = null, this.resolution = 1; }; i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.pushFilter = function (t, e) { var r = this.renderer, i = this.filterData; if (!i) {
                i = this.renderer._activeRenderTarget.filterStack;
                var n = new c;
                n.sourceFrame = n.destinationFrame = this.renderer._activeRenderTarget.size, n.renderTarget = r._activeRenderTarget, this.renderer._activeRenderTarget.filterData = i = { index: 0, stack: [n] }, this.filterData = i;
            } var s = i.stack[++i.index]; s || (s = i.stack[i.index] = new c); var o = e[0].resolution, a = e[0].padding, h = t.filterArea || t.getBounds(!0), u = s.sourceFrame, l = s.destinationFrame; u.x = (h.x * o | 0) / o, u.y = (h.y * o | 0) / o, u.width = (h.width * o | 0) / o, u.height = (h.height * o | 0) / o, i.stack[0].renderTarget.transform || u.fit(i.stack[0].destinationFrame), u.pad(a), l.width = u.width, l.height = u.height; var d = this.getPotRenderTarget(r.gl, u.width, u.height, o); s.target = t, s.filters = e, s.resolution = o, s.renderTarget = d, d.setFrame(l, u), r.bindRenderTarget(d), r.clear(); }, i.prototype.popFilter = function () { var t = this.filterData, e = t.stack[t.index - 1], r = t.stack[t.index]; this.quad.map(r.renderTarget.size, r.sourceFrame).upload(); var i = r.filters; if (1 === i.length)
                i[0].apply(this, r.renderTarget, e.renderTarget, !1), this.freePotRenderTarget(r.renderTarget);
            else {
                var n = r.renderTarget, s = this.getPotRenderTarget(this.renderer.gl, r.sourceFrame.width, r.sourceFrame.height, 1);
                s.setFrame(r.destinationFrame, r.sourceFrame);
                for (var o = 0; o < i.length - 1; o++) {
                    i[o].apply(this, n, s, !0);
                    var a = n;
                    n = s, s = a;
                }
                i[o].apply(this, n, e.renderTarget, !1), this.freePotRenderTarget(n), this.freePotRenderTarget(s);
            } t.index--, 0 === t.index && (this.filterData = null); }, i.prototype.applyFilter = function (t, e, r, i) { var n = this.renderer, s = t.glShaders[n.CONTEXT_UID]; if (s || (t.glShaderKey ? (s = this.shaderCache[t.glShaderKey], s || (s = t.glShaders[n.CONTEXT_UID] = this.shaderCache[t.glShaderKey] = new h(this.gl, t.vertexSrc, t.fragmentSrc))) : s = t.glShaders[n.CONTEXT_UID] = new h(this.gl, t.vertexSrc, t.fragmentSrc), this.quad.initVao(s)), n.bindRenderTarget(r), i) {
                var o = n.gl;
                o.disable(o.SCISSOR_TEST), n.clear(), o.enable(o.SCISSOR_TEST);
            } r === n.maskManager.scissorRenderTarget && n.maskManager.pushScissorMask(null, n.maskManager.scissorData), n.bindShader(s), this.syncUniforms(s, t), e.texture.bind(0), n._activeTextureLocation = 0, n.state.setBlendMode(t.blendMode), this.quad.draw(); }, i.prototype.syncUniforms = function (t, e) { var r, i = e.uniformData, n = e.uniforms, s = 1; if (t.uniforms.data.filterArea) {
                r = this.filterData.stack[this.filterData.index];
                var o = t.uniforms.filterArea;
                o[0] = r.renderTarget.size.width, o[1] = r.renderTarget.size.height, o[2] = r.sourceFrame.x, o[3] = r.sourceFrame.y, t.uniforms.filterArea = o;
            } if (t.uniforms.data.filterClamp) {
                r = this.filterData.stack[this.filterData.index];
                var a = t.uniforms.filterClamp;
                a[0] = .5 / r.renderTarget.size.width, a[1] = .5 / r.renderTarget.size.height, a[2] = (r.sourceFrame.width - .5) / r.renderTarget.size.width, a[3] = (r.sourceFrame.height - .5) / r.renderTarget.size.height, t.uniforms.filterClamp = a;
            } var h; for (var u in i)
                if ("sampler2D" === i[u].type) {
                    if (t.uniforms[u] = s, n[u].baseTexture)
                        this.renderer.bindTexture(n[u].baseTexture, s);
                    else {
                        var l = this.renderer.gl;
                        this.renderer._activeTextureLocation = l.TEXTURE0 + s, l.activeTexture(l.TEXTURE0 + s), n[u].texture.bind();
                    }
                    s++;
                }
                else
                    "mat3" === i[u].type ? void 0 !== n[u].a ? t.uniforms[u] = n[u].toArray(!0) : t.uniforms[u] = n[u] : "vec2" === i[u].type ? void 0 !== n[u].x ? (h = t.uniforms[u] || new Float32Array(2), h[0] = n[u].x, h[1] = n[u].y, t.uniforms[u] = h) : t.uniforms[u] = n[u] : "float" === i[u].type ? t.uniforms.data[u].value !== i[u] && (t.uniforms[u] = n[u]) : t.uniforms[u] = n[u]; }, i.prototype.getRenderTarget = function (t, e) { var r = this.filterData.stack[this.filterData.index], i = this.getPotRenderTarget(this.renderer.gl, r.sourceFrame.width, r.sourceFrame.height, e || r.resolution); return i.setFrame(r.destinationFrame, r.sourceFrame), i; }, i.prototype.returnRenderTarget = function (t) { return this.freePotRenderTarget(t); }, i.prototype.calculateScreenSpaceMatrix = function (t) { var e = this.filterData.stack[this.filterData.index]; return u.calculateScreenSpaceMatrix(t, e.sourceFrame, e.renderTarget.size); }, i.prototype.calculateNormalizedScreenSpaceMatrix = function (t) { var e = this.filterData.stack[this.filterData.index]; return u.calculateNormalizedScreenSpaceMatrix(t, e.sourceFrame, e.renderTarget.size, e.destinationFrame); }, i.prototype.calculateSpriteMatrix = function (t, e) { var r = this.filterData.stack[this.filterData.index]; return u.calculateSpriteMatrix(t, r.sourceFrame, r.renderTarget.size, e); }, i.prototype.destroy = function () { this.shaderCache = [], this.emptyPool(); }, i.prototype.getPotRenderTarget = function (t, e, r, i) { e = l.nextPow2(e * i), r = l.nextPow2(r * i); var n = (65535 & e) << 16 | 65535 & r; this.pool[n] || (this.pool[n] = []); var o = this.pool[n].pop() || new s(t, e, r, null, 1); return o.resolution = i, o.defaultFrame.width = o.size.width = e / i, o.defaultFrame.height = o.size.height = r / i, o; }, i.prototype.emptyPool = function () { for (var t in this.pool) {
                var e = this.pool[t];
                if (e)
                    for (var r = 0; r < e.length; r++)
                        e[r].destroy(!0);
            } this.pool = {}; }, i.prototype.freePotRenderTarget = function (t) { var e = t.size.width * t.resolution, r = t.size.height * t.resolution, i = (65535 & e) << 16 | 65535 & r; this.pool[i].push(t); }; }, { "../../../Shader": 77, "../../../math": 102, "../filters/filterTransforms": 120, "../utils/Quad": 127, "../utils/RenderTarget": 128, "./WebGLManager": 125, "bit-twiddle": 30 }], 123: [function (t, e, r) {
                function i(t) { n.call(this, t), this.scissor = !1, this.scissorData = null, this.scissorRenderTarget = null, this.enableScissor = !0, this.alphaMaskPool = [], this.alphaMaskIndex = 0; }
                var n = t("./WebGLManager"), s = t("../filters/spriteMask/SpriteMaskFilter");
                i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.pushMask = function (t, e) { if (e.texture)
                    this.pushSpriteMask(t, e);
                else if (this.enableScissor && !this.scissor && !this.renderer.stencilManager.stencilMaskStack.length && e.isFastRect()) {
                    var r = e.worldTransform, i = Math.atan2(r.b, r.a);
                    i = Math.round(i * (180 / Math.PI)), i % 90 ? this.pushStencilMask(e) : this.pushScissorMask(t, e);
                }
                else
                    this.pushStencilMask(e); }, i.prototype.popMask = function (t, e) { e.texture ? this.popSpriteMask(t, e) : this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length ? this.popScissorMask(t, e) : this.popStencilMask(t, e); }, i.prototype.pushSpriteMask = function (t, e) {
                    var r = this.alphaMaskPool[this.alphaMaskIndex];
                    r || (r = this.alphaMaskPool[this.alphaMaskIndex] = [new s(e)]), r[0].resolution = this.renderer.resolution,
                        r[0].maskSprite = e, t.filterArea = e.getBounds(!0), this.renderer.filterManager.pushFilter(t, r), this.alphaMaskIndex++;
                }, i.prototype.popSpriteMask = function () { this.renderer.filterManager.popFilter(), this.alphaMaskIndex--; }, i.prototype.pushStencilMask = function (t) { this.renderer.currentRenderer.stop(), this.renderer.stencilManager.pushStencil(t); }, i.prototype.popStencilMask = function () { this.renderer.currentRenderer.stop(), this.renderer.stencilManager.popStencil(); }, i.prototype.pushScissorMask = function (t, e) { e.renderable = !0; var r = this.renderer._activeRenderTarget, i = e.getBounds(); i.fit(r.size), e.renderable = !1, this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST); var n = this.renderer.resolution; this.renderer.gl.scissor(i.x * n, (r.root ? r.size.height - i.y - i.height : i.y) * n, i.width * n, i.height * n), this.scissorRenderTarget = r, this.scissorData = e, this.scissor = !0; }, i.prototype.popScissorMask = function () { this.scissorRenderTarget = null, this.scissorData = null, this.scissor = !1; var t = this.renderer.gl; t.disable(t.SCISSOR_TEST); };
            }, { "../filters/spriteMask/SpriteMaskFilter": 121, "./WebGLManager": 125 }], 124: [function (t, e, r) { function i(t) { n.call(this, t), this.stencilMaskStack = null; } var n = t("./WebGLManager"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.setMaskStack = function (t) { this.stencilMaskStack = t; var e = this.renderer.gl; 0 === t.length ? e.disable(e.STENCIL_TEST) : e.enable(e.STENCIL_TEST); }, i.prototype.pushStencil = function (t) { this.renderer.setObjectRenderer(this.renderer.plugins.graphics), this.renderer._activeRenderTarget.attachStencilBuffer(); var e = this.renderer.gl, r = this.stencilMaskStack; 0 === r.length && (e.enable(e.STENCIL_TEST), e.clear(e.STENCIL_BUFFER_BIT), e.stencilFunc(e.ALWAYS, 1, 1)), r.push(t), e.colorMask(!1, !1, !1, !1), e.stencilOp(e.KEEP, e.KEEP, e.INCR), this.renderer.plugins.graphics.render(t), e.colorMask(!0, !0, !0, !0), e.stencilFunc(e.NOTEQUAL, 0, r.length), e.stencilOp(e.KEEP, e.KEEP, e.KEEP); }, i.prototype.popStencil = function () { this.renderer.setObjectRenderer(this.renderer.plugins.graphics); var t = this.renderer.gl, e = this.stencilMaskStack, r = e.pop(); 0 === e.length ? t.disable(t.STENCIL_TEST) : (t.colorMask(!1, !1, !1, !1), t.stencilOp(t.KEEP, t.KEEP, t.DECR), this.renderer.plugins.graphics.render(r), t.colorMask(!0, !0, !0, !0), t.stencilFunc(t.NOTEQUAL, 0, e.length), t.stencilOp(t.KEEP, t.KEEP, t.KEEP)); }, i.prototype.destroy = function () { n.prototype.destroy.call(this), this.stencilMaskStack.stencilStack = null; }; }, { "./WebGLManager": 125 }], 125: [function (t, e, r) { function i(t) { this.renderer = t, this.renderer.on("context", this.onContextChange, this); } i.prototype.constructor = i, e.exports = i, i.prototype.onContextChange = function () { }, i.prototype.destroy = function () { this.renderer.off("context", this.onContextChange, this), this.renderer = null; }; }, {}], 126: [function (t, e, r) { function i(t) { n.call(this, t); } var n = t("../managers/WebGLManager"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.start = function () { }, i.prototype.stop = function () { this.flush(); }, i.prototype.flush = function () { }, i.prototype.render = function (t) { }; }, { "../managers/WebGLManager": 125 }], 127: [function (t, e, r) { function i(t, e) { this.gl = t, this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.interleaved = new Float32Array(16); for (var r = 0; r < 4; r++)
                this.interleaved[4 * r] = this.vertices[2 * r], this.interleaved[4 * r + 1] = this.vertices[2 * r + 1], this.interleaved[4 * r + 2] = this.uvs[2 * r], this.interleaved[4 * r + 3] = this.uvs[2 * r + 1]; this.indices = s(1), this.vertexBuffer = n.GLBuffer.createVertexBuffer(t, this.interleaved, t.STATIC_DRAW), this.indexBuffer = n.GLBuffer.createIndexBuffer(t, this.indices, t.STATIC_DRAW), this.vao = new n.VertexArrayObject(t, e); } var n = t("pixi-gl-core"), s = t("../../../utils/createIndicesForQuads"); i.prototype.constructor = i, i.prototype.initVao = function (t) { this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, t.attributes.aVertexPosition, this.gl.FLOAT, !1, 16, 0).addAttribute(this.vertexBuffer, t.attributes.aTextureCoord, this.gl.FLOAT, !1, 16, 8); }, i.prototype.map = function (t, e) { var r = 0, i = 0; return this.uvs[0] = r, this.uvs[1] = i, this.uvs[2] = r + e.width / t.width, this.uvs[3] = i, this.uvs[4] = r + e.width / t.width, this.uvs[5] = i + e.height / t.height, this.uvs[6] = r, this.uvs[7] = i + e.height / t.height, r = e.x, i = e.y, this.vertices[0] = r, this.vertices[1] = i, this.vertices[2] = r + e.width, this.vertices[3] = i, this.vertices[4] = r + e.width, this.vertices[5] = i + e.height, this.vertices[6] = r, this.vertices[7] = i + e.height, this; }, i.prototype.draw = function () { return this.vao.bind().draw(this.gl.TRIANGLES, 6, 0).unbind(), this; }, i.prototype.upload = function () { for (var t = 0; t < 4; t++)
                this.interleaved[4 * t] = this.vertices[2 * t], this.interleaved[4 * t + 1] = this.vertices[2 * t + 1], this.interleaved[4 * t + 2] = this.uvs[2 * t], this.interleaved[4 * t + 3] = this.uvs[2 * t + 1]; return this.vertexBuffer.upload(this.interleaved), this; }, i.prototype.destroy = function () { var t = this.gl; t.deleteBuffer(this.vertexBuffer), t.deleteBuffer(this.indexBuffer); }, e.exports = i; }, { "../../../utils/createIndicesForQuads": 149, "pixi-gl-core": 7 }], 128: [function (t, e, r) { var i = t("../../../math"), n = t("../../../const"), s = t("pixi-gl-core").GLFramebuffer, o = function (t, e, r, o, a, h) { this.gl = t, this.frameBuffer = null, this.texture = null, this.clearColor = [0, 0, 0, 0], this.size = new i.Rectangle(0, 0, 1, 1), this.resolution = a || n.RESOLUTION, this.projectionMatrix = new i.Matrix, this.transform = null, this.frame = null, this.defaultFrame = new i.Rectangle, this.destinationFrame = null, this.sourceFrame = null, this.stencilBuffer = null, this.stencilMaskStack = [], this.filterData = null, this.scaleMode = o || n.SCALE_MODES.DEFAULT, this.root = h, this.root ? (this.frameBuffer = new s(t, 100, 100), this.frameBuffer.framebuffer = null) : (this.frameBuffer = s.createRGBA(t, 100, 100), this.scaleMode === n.SCALE_MODES.NEAREST ? this.frameBuffer.texture.enableNearestScaling() : this.frameBuffer.texture.enableLinearScaling(), this.texture = this.frameBuffer.texture), this.setFrame(), this.resize(e, r); }; o.prototype.constructor = o, e.exports = o, o.prototype.clear = function (t) { var e = t || this.clearColor; this.frameBuffer.clear(e[0], e[1], e[2], e[3]); }, o.prototype.attachStencilBuffer = function () { this.root || this.frameBuffer.enableStencil(); }, o.prototype.setFrame = function (t, e) { this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || t; }, o.prototype.activate = function () { var t = this.gl; this.frameBuffer.bind(), this.calculateProjection(this.destinationFrame, this.sourceFrame), this.transform && this.projectionMatrix.append(this.transform), this.destinationFrame !== this.sourceFrame ? (t.enable(t.SCISSOR_TEST), t.scissor(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)) : t.disable(t.SCISSOR_TEST), t.viewport(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0); }, o.prototype.calculateProjection = function (t, e) { var r = this.projectionMatrix; e = e || t, r.identity(), this.root ? (r.a = 1 / t.width * 2, r.d = -1 / t.height * 2, r.tx = -1 - e.x * r.a, r.ty = 1 - e.y * r.d) : (r.a = 1 / t.width * 2, r.d = 1 / t.height * 2, r.tx = -1 - e.x * r.a, r.ty = -1 - e.y * r.d); }, o.prototype.resize = function (t, e) { if (t = 0 | t, e = 0 | e, this.size.width !== t || this.size.height !== e) {
                this.size.width = t, this.size.height = e, this.defaultFrame.width = t, this.defaultFrame.height = e, this.frameBuffer.resize(t * this.resolution, e * this.resolution);
                var r = this.frame || this.size;
                this.calculateProjection(r);
            } }, o.prototype.destroy = function () { this.frameBuffer.destroy(), this.frameBuffer = null, this.texture = null; }; }, { "../../../const": 78, "../../../math": 102, "pixi-gl-core": 7 }], 129: [function (t, e, r) { function i(t) { for (var e = "", r = 0; r < t; r++)
                r > 0 && (e += "\nelse "), r < t - 1 && (e += "if(test == " + r + ".0){}"); return e; } var n = t("pixi-gl-core"), s = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n"), o = function (t, e) { var r = !e; if (r) {
                var o = document.createElement("canvas");
                o.width = 1, o.height = 1, e = n.createContext(o);
            } for (var a = e.createShader(e.FRAGMENT_SHADER);;) {
                var h = s.replace(/%forloop%/gi, i(t));
                if (e.shaderSource(a, h), e.compileShader(a), e.getShaderParameter(a, e.COMPILE_STATUS))
                    break;
                t = t / 2 | 0;
            } return r && e.getExtension("WEBGL_lose_context") && e.getExtension("WEBGL_lose_context").loseContext(), t; }; e.exports = o; }, { "pixi-gl-core": 7 }], 130: [function (t, e, r) { function i(t, e) { return e = e || [], e[n.BLEND_MODES.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.ADD] = [t.ONE, t.DST_ALPHA], e[n.BLEND_MODES.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR], e[n.BLEND_MODES.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e; } var n = t("../../../const"); e.exports = i; }, { "../../../const": 78 }], 131: [function (t, e, r) { function i(t, e) { e = e || {}, e[n.DRAW_MODES.POINTS] = t.POINTS, e[n.DRAW_MODES.LINES] = t.LINES, e[n.DRAW_MODES.LINE_LOOP] = t.LINE_LOOP, e[n.DRAW_MODES.LINE_STRIP] = t.LINE_STRIP, e[n.DRAW_MODES.TRIANGLES] = t.TRIANGLES, e[n.DRAW_MODES.TRIANGLE_STRIP] = t.TRIANGLE_STRIP, e[n.DRAW_MODES.TRIANGLE_FAN] = t.TRIANGLE_FAN; } var n = t("../../../const"); e.exports = i; }, { "../../../const": 78 }], 132: [function (t, e, r) { function i(t) { var e = t.getContextAttributes(); e.stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly"); } e.exports = i; }, {}], 133: [function (t, e, r) { function i(t) { o.call(this), this.anchor = new n.ObservablePoint(this.onAnchorUpdate, this), this._texture = null, this._width = 0, this._height = 0, this._tint = null, this._tintRGB = null, this.tint = 16777215, this.blendMode = h.BLEND_MODES.NORMAL, this.shader = null, this.cachedTint = 16777215, this.texture = t || s.EMPTY, this.vertexData = new Float32Array(8), this.vertexTrimmedData = null, this._transformID = -1, this._textureID = -1; } var n = t("../math"), s = t("../textures/Texture"), o = t("../display/Container"), a = t("../utils"), h = t("../const"), u = new n.Point; i.prototype = Object.create(o.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { width: { get: function () { return Math.abs(this.scale.x) * this.texture.orig.width; }, set: function (t) { var e = a.sign(this.scale.x) || 1; this.scale.x = e * t / this.texture.orig.width, this._width = t; } }, height: { get: function () { return Math.abs(this.scale.y) * this.texture.orig.height; }, set: function (t) { var e = a.sign(this.scale.y) || 1; this.scale.y = e * t / this.texture.orig.height, this._height = t; } }, tint: { get: function () { return this._tint; }, set: function (t) { this._tint = t, this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16); } }, texture: { get: function () { return this._texture; }, set: function (t) { this._texture !== t && (this._texture = t, this.cachedTint = 16777215, this._textureID = -1, t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this))); } } }), i.prototype._onTextureUpdate = function () { this._textureID = -1, this._width && (this.scale.x = a.sign(this.scale.x) * this._width / this.texture.orig.width), this._height && (this.scale.y = a.sign(this.scale.y) * this._height / this.texture.orig.height); }, i.prototype.onAnchorUpdate = function () { this._transformID = -1; }, i.prototype.calculateVertices = function () { if (this._transformID !== this.transform._worldID || this._textureID !== this._texture._updateID) {
                this._transformID = this.transform._worldID, this._textureID = this._texture._updateID;
                var t, e, r, i, n = this._texture, s = this.transform.worldTransform, o = s.a, a = s.b, h = s.c, u = s.d, l = s.tx, c = s.ty, d = this.vertexData, p = n.trim, f = n.orig;
                p ? (e = p.x - this.anchor._x * f.width, t = e + p.width, i = p.y - this.anchor._y * f.height, r = i + p.height) : (t = f.width * (1 - this.anchor._x), e = f.width * -this.anchor._x, r = f.height * (1 - this.anchor._y), i = f.height * -this.anchor._y), d[0] = o * e + h * i + l, d[1] = u * i + a * e + c, d[2] = o * t + h * i + l, d[3] = u * i + a * t + c, d[4] = o * t + h * r + l, d[5] = u * r + a * t + c, d[6] = o * e + h * r + l, d[7] = u * r + a * e + c;
            } }, i.prototype.calculateTrimmedVertices = function () { this.vertexTrimmedData || (this.vertexTrimmedData = new Float32Array(8)); var t, e, r, i, n = this._texture, s = this.vertexTrimmedData, o = n.orig, a = this.transform.worldTransform, h = a.a, u = a.b, l = a.c, c = a.d, d = a.tx, p = a.ty; t = o.width * (1 - this.anchor._x), e = o.width * -this.anchor._x, r = o.height * (1 - this.anchor._y), i = o.height * -this.anchor._y, s[0] = h * e + l * i + d, s[1] = c * i + u * e + p, s[2] = h * t + l * i + d, s[3] = c * i + u * t + p, s[4] = h * t + l * r + d, s[5] = c * r + u * t + p, s[6] = h * e + l * r + d, s[7] = c * r + u * e + p; }, i.prototype._renderWebGL = function (t) { this.calculateVertices(), t.setObjectRenderer(t.plugins.sprite), t.plugins.sprite.render(this); }, i.prototype._renderCanvas = function (t) { t.plugins.sprite.render(this); }, i.prototype._calculateBounds = function () { var t = this._texture.trim, e = this._texture.orig; !t || t.width === e.width && t.height === e.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData)); }, i.prototype.getLocalBounds = function (t) { return 0 === this.children.length ? (this._bounds.minX = -this._texture.orig.width * this.anchor._x, this._bounds.minY = -this._texture.orig.height * this.anchor._y, this._bounds.maxX = this._texture.orig.width, this._bounds.maxY = this._texture.orig.height, t || (this._localBoundsRect || (this._localBoundsRect = new n.Rectangle), t = this._localBoundsRect), this._bounds.getRectangle(t)) : o.prototype.getLocalBounds.call(this, t); }, i.prototype.containsPoint = function (t) { this.worldTransform.applyInverse(t, u); var e, r = this._texture.orig.width, i = this._texture.orig.height, n = -r * this.anchor.x; return u.x > n && u.x < n + r && (e = -i * this.anchor.y, u.y > e && u.y < e + i); }, i.prototype.destroy = function (t) { o.prototype.destroy.call(this, t), this.anchor = null; var e = "boolean" == typeof t ? t : t && t.texture; if (e) {
                var r = "boolean" == typeof t ? t : t && t.baseTexture;
                this._texture.destroy(!!r);
            } this._texture = null, this.shader = null; }, i.from = function (t) { return new i(s.from(t)); }, i.fromFrame = function (t) { var e = a.TextureCache[t]; if (!e)
                throw new Error('The frameId "' + t + '" does not exist in the texture cache'); return new i(e); }, i.fromImage = function (t, e, r) { return new i(s.fromImage(t, e, r)); }; }, { "../const": 78, "../display/Container": 80, "../math": 102, "../textures/Texture": 144, "../utils": 151 }], 134: [function (t, e, r) { function i(t) { this.renderer = t; } var n = t("../../renderers/canvas/CanvasRenderer"), s = t("../../const"), o = t("../../math"), a = new o.Matrix, h = t("./CanvasTinter"); i.prototype.constructor = i, e.exports = i, n.registerPlugin("sprite", i), i.prototype.render = function (t) { var e, r, i = t._texture, n = this.renderer, u = t.transform.worldTransform, l = i._frame.width, c = i._frame.height; if (!(i.orig.width <= 0 || i.orig.height <= 0) && i.baseTexture.source && (n.setBlendMode(t.blendMode), i.valid)) {
                n.context.globalAlpha = t.worldAlpha;
                var d = i.baseTexture.scaleMode === s.SCALE_MODES.LINEAR;
                n.smoothProperty && n.context[n.smoothProperty] !== d && (n.context[n.smoothProperty] = d), i.trim ? (e = i.trim.width / 2 + i.trim.x - t.anchor.x * i.orig.width, r = i.trim.height / 2 + i.trim.y - t.anchor.y * i.orig.height) : (e = (.5 - t.anchor.x) * i.orig.width, r = (.5 - t.anchor.y) * i.orig.height), i.rotate && (u.copy(a), u = a, o.GroupD8.matrixAppendRotationInv(u, i.rotate, e, r), e = 0, r = 0), e -= l / 2, r -= c / 2, n.roundPixels ? (n.context.setTransform(u.a, u.b, u.c, u.d, u.tx * n.resolution | 0, u.ty * n.resolution | 0), e = 0 | e, r = 0 | r) : n.context.setTransform(u.a, u.b, u.c, u.d, u.tx * n.resolution, u.ty * n.resolution);
                var p = i.baseTexture.resolution;
                16777215 !== t.tint ? (t.cachedTint !== t.tint && (t.cachedTint = t.tint, t.tintedTexture = h.getTintedTexture(t, t.tint)), n.context.drawImage(t.tintedTexture, 0, 0, l * p, c * p, e * n.resolution, r * n.resolution, l * n.resolution, c * n.resolution)) : n.context.drawImage(i.baseTexture.source, i._frame.x * p, i._frame.y * p, l * p, c * p, e * n.resolution, r * n.resolution, l * n.resolution, c * n.resolution);
            } }, i.prototype.destroy = function () { this.renderer = null; }; }, { "../../const": 78, "../../math": 102, "../../renderers/canvas/CanvasRenderer": 109, "./CanvasTinter": 135 }], 135: [function (t, e, r) { var i = t("../../utils"), n = t("../../renderers/canvas/utils/canUseNewCanvasBlendModes"), s = e.exports = { getTintedTexture: function (t, e) { var r = t.texture; e = s.roundColor(e); var i = "#" + ("00000" + (0 | e).toString(16)).substr(-6); if (r.tintCache = r.tintCache || {}, r.tintCache[i])
                    return r.tintCache[i]; var n = s.canvas || document.createElement("canvas"); if (s.tintMethod(r, e, n), s.convertTintToImage) {
                    var o = new Image;
                    o.src = n.toDataURL(), r.tintCache[i] = o;
                }
                else
                    r.tintCache[i] = n, s.canvas = null; return n; }, tintWithMultiply: function (t, e, r) { var i = r.getContext("2d"), n = t._frame.clone(), s = t.baseTexture.resolution; n.x *= s, n.y *= s, n.width *= s, n.height *= s, r.width = n.width, r.height = n.height, i.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), i.fillRect(0, 0, n.width, n.height), i.globalCompositeOperation = "multiply", i.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height), i.globalCompositeOperation = "destination-atop", i.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height); }, tintWithOverlay: function (t, e, r) { var i = r.getContext("2d"), n = t._frame.clone(), s = t.baseTexture.resolution; n.x *= s, n.y *= s, n.width *= s, n.height *= s, r.width = n.width, r.height = n.height, i.globalCompositeOperation = "copy", i.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), i.fillRect(0, 0, n.width, n.height), i.globalCompositeOperation = "destination-atop", i.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height); }, tintWithPerPixel: function (t, e, r) { var n = r.getContext("2d"), s = t._frame.clone(), o = t.baseTexture.resolution; s.x *= o, s.y *= o, s.width *= o, s.height *= o, r.width = s.width, r.height = s.height, n.globalCompositeOperation = "copy", n.drawImage(t.baseTexture.source, s.x, s.y, s.width, s.height, 0, 0, s.width, s.height); for (var a = i.hex2rgb(e), h = a[0], u = a[1], l = a[2], c = n.getImageData(0, 0, s.width, s.height), d = c.data, p = 0; p < d.length; p += 4)
                    d[p + 0] *= h, d[p + 1] *= u, d[p + 2] *= l; n.putImageData(c, 0, 0); }, roundColor: function (t) { var e = s.cacheStepsPerColorChannel, r = i.hex2rgb(t); return r[0] = Math.min(255, r[0] / e * e), r[1] = Math.min(255, r[1] / e * e), r[2] = Math.min(255, r[2] / e * e), i.rgb2hex(r); }, cacheStepsPerColorChannel: 8, convertTintToImage: !1, canUseMultiply: n(), tintMethod: 0 }; s.tintMethod = s.canUseMultiply ? s.tintWithMultiply : s.tintWithPerPixel; }, { "../../renderers/canvas/utils/canUseNewCanvasBlendModes": 112, "../../utils": 151 }], 136: [function (t, e, r) { var i = function (t) { this.vertices = new ArrayBuffer(t), this.float32View = new Float32Array(this.vertices), this.uint32View = new Uint32Array(this.vertices); }; e.exports = i, i.prototype.destroy = function () { this.vertices = null, this.positions = null, this.uvs = null, this.colors = null; }; }, {}], 137: [function (t, e, r) { function i(t) { n.call(this, t), this.vertSize = 5, this.vertByteSize = 4 * this.vertSize, this.size = l.SPRITE_BATCH_SIZE, this.buffers = []; for (var e = 1; e <= d.nextPow2(this.size); e *= 2) {
                var r = 4 * e * this.vertByteSize;
                this.buffers.push(new u(r));
            } this.indices = o(this.size), this.shaders = null, this.currentIndex = 0, p = 0, this.groups = []; for (var i = 0; i < this.size; i++)
                this.groups[i] = { textures: [], textureCount: 0, ids: [], size: 0, start: 0, blend: 0 }; this.sprites = [], this.vertexBuffers = [], this.vaos = [], this.vaoMax = 2, this.vertexCount = 0, this.renderer.on("prerender", this.onPrerender, this); } var n = t("../../renderers/webgl/utils/ObjectRenderer"), s = t("../../renderers/webgl/WebGLRenderer"), o = t("../../utils/createIndicesForQuads"), a = t("./generateMultiTextureShader"), h = t("../../renderers/webgl/utils/checkMaxIfStatmentsInShader"), u = t("./BatchBuffer"), l = t("../../const"), c = t("pixi-gl-core"), d = t("bit-twiddle"), p = 0; i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, s.registerPlugin("sprite", i), i.prototype.onContextChange = function () { var t = this.renderer.gl; this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), l.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = h(this.MAX_TEXTURES, t), this.shaders = new Array(this.MAX_TEXTURES), this.shaders[0] = a(t, 1), this.shaders[1] = a(t, 2), this.indexBuffer = c.GLBuffer.createIndexBuffer(t, this.indices, t.STATIC_DRAW); for (var e = this.shaders[1], r = 0; r < this.vaoMax; r++)
                this.vertexBuffers[r] = c.GLBuffer.createVertexBuffer(t, null, t.STREAM_DRAW), this.vaos[r] = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(this.vertexBuffers[r], e.attributes.aVertexPosition, t.FLOAT, !1, this.vertByteSize, 0).addAttribute(this.vertexBuffers[r], e.attributes.aTextureCoord, t.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(this.vertexBuffers[r], e.attributes.aColor, t.UNSIGNED_BYTE, !0, this.vertByteSize, 12).addAttribute(this.vertexBuffers[r], e.attributes.aTextureId, t.FLOAT, !1, this.vertByteSize, 16); this.vao = this.vaos[0], this.currentBlendMode = 99999; }, i.prototype.onPrerender = function () { this.vertexCount = 0; }, i.prototype.render = function (t) { this.currentIndex >= this.size && this.flush(), t.texture._uvs && (this.sprites[this.currentIndex++] = t); }, i.prototype.flush = function () { if (0 !== this.currentIndex) {
                var t, e, r, i, n, s, o, h = this.renderer.gl, u = d.nextPow2(this.currentIndex), l = d.log2(u), f = this.buffers[l], v = this.sprites, g = this.groups, y = f.float32View, x = f.uint32View, m = 0, _ = 1, b = 0, T = g[0], E = v[0].blendMode;
                T.textureCount = 0, T.start = 0, T.blend = E, p++;
                for (var w = 0; w < this.currentIndex; w++) {
                    var S = v[w];
                    if (t = S._texture.baseTexture, E !== S.blendMode && (E = S.blendMode, e = null, b = this.MAX_TEXTURES, p++), e !== t && (e = t, t._enabled !== p && (b === this.MAX_TEXTURES && (p++, b = 0, T.size = w - T.start, T = g[_++], T.textureCount = 0, T.blend = E, T.start = w), t._enabled = p, t._id = b, T.textures[T.textureCount++] = t, b++)), r = S.vertexData, i = S._tintRGB + (255 * S.worldAlpha << 24), n = S._texture._uvs.uvsUint32, s = t._id, this.renderer.roundPixels) {
                        var A = this.renderer.resolution;
                        y[m] = (r[0] * A | 0) / A, y[m + 1] = (r[1] * A | 0) / A, y[m + 5] = (r[2] * A | 0) / A, y[m + 6] = (r[3] * A | 0) / A, y[m + 10] = (r[4] * A | 0) / A, y[m + 11] = (r[5] * A | 0) / A, y[m + 15] = (r[6] * A | 0) / A, y[m + 16] = (r[7] * A | 0) / A;
                    }
                    else
                        y[m] = r[0], y[m + 1] = r[1], y[m + 5] = r[2], y[m + 6] = r[3], y[m + 10] = r[4], y[m + 11] = r[5], y[m + 15] = r[6], y[m + 16] = r[7];
                    x[m + 2] = n[0], x[m + 7] = n[1], x[m + 12] = n[2], x[m + 17] = n[3], x[m + 3] = x[m + 8] = x[m + 13] = x[m + 18] = i, y[m + 4] = y[m + 9] = y[m + 14] = y[m + 19] = s, m += 20;
                }
                for (T.size = w - T.start, this.vertexCount++, this.vaoMax <= this.vertexCount && (this.vaoMax++, o = this.shaders[1], this.vertexBuffers[this.vertexCount] = c.GLBuffer.createVertexBuffer(h, null, h.STREAM_DRAW), this.vaos[this.vertexCount] = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(this.vertexBuffers[this.vertexCount], o.attributes.aVertexPosition, h.FLOAT, !1, this.vertByteSize, 0).addAttribute(this.vertexBuffers[this.vertexCount], o.attributes.aTextureCoord, h.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(this.vertexBuffers[this.vertexCount], o.attributes.aColor, h.UNSIGNED_BYTE, !0, this.vertByteSize, 12).addAttribute(this.vertexBuffers[this.vertexCount], o.attributes.aTextureId, h.FLOAT, !1, this.vertByteSize, 16)), this.vertexBuffers[this.vertexCount].upload(f.vertices, 0), this.vao = this.vaos[this.vertexCount].bind(), w = 0; w < _; w++) {
                    var M = g[w], R = M.textureCount;
                    o = this.shaders[R - 1], o || (o = this.shaders[R - 1] = a(h, R)), this.renderer.bindShader(o);
                    for (var C = 0; C < R; C++)
                        this.renderer.bindTexture(M.textures[C], C);
                    this.renderer.state.setBlendMode(M.blend), h.drawElements(h.TRIANGLES, 6 * M.size, h.UNSIGNED_SHORT, 6 * M.start * 2);
                }
                this.currentIndex = 0;
            } }, i.prototype.start = function () { }, i.prototype.stop = function () { this.flush(), this.vao.unbind(); }, i.prototype.destroy = function () { for (var t = 0; t < this.vaoMax; t++)
                this.vertexBuffers[t].destroy(), this.vaos[t].destroy(); for (this.indexBuffer.destroy(), this.renderer.off("prerender", this.onPrerender, this), n.prototype.destroy.call(this), t = 0; t < this.shaders.length; t++)
                this.shaders[t] && this.shaders[t].destroy(); for (this.vertexBuffers = null, this.vaos = null, this.indexBuffer = null, this.indices = null, this.sprites = null, t = 0; t < this.buffers.length; t++)
                this.buffers[t].destroy(); }; }, { "../../const": 78, "../../renderers/webgl/WebGLRenderer": 116, "../../renderers/webgl/utils/ObjectRenderer": 126, "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 129, "../../utils/createIndicesForQuads": 149, "./BatchBuffer": 136, "./generateMultiTextureShader": 138, "bit-twiddle": 30, "pixi-gl-core": 7 }], 138: [function (t, e, r) { function i(t, e) { var r = "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vTextureId = aTextureId;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", i = o; i = i.replace(/%count%/gi, e), i = i.replace(/%forloop%/gi, n(e)); for (var a = new s(t, r, i), h = [], u = 0; u < e; u++)
                h[u] = u; return a.bind(), a.uniforms.uSamplers = h, a; } function n(t) { var e = ""; e += "\n", e += "\n"; for (var r = 0; r < t; r++)
                r > 0 && (e += "\nelse "), r < t - 1 && (e += "if(textureId == " + r + ".0)"), e += "\n{", e += "\n\tcolor = texture2D(uSamplers[" + r + "], vTextureCoord);", e += "\n}"; return e += "\n", e += "\n"; } var s = t("../../Shader"), o = ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}"].join("\n"); e.exports = i; }, { "../../Shader": 77 }], 139: [function (t, e, r) {
                function i(t, e) { this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = h.RESOLUTION, this._text = null, this._style = null, this._styleListener = null, this._font = ""; var r = s.fromCanvas(this.canvas); r.orig = new o.Rectangle, r.trim = new o.Rectangle, n.call(this, r), this.text = t, this.style = e, this.localStyleID = -1; }
                var n = t("../sprites/Sprite"), s = t("../textures/Texture"), o = t("../math"), a = t("../utils"), h = t("../const"), u = t("./TextStyle"), l = { texture: !0, children: !1, baseTexture: !0 };
                i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.fontPropertiesCache = {}, i.fontPropertiesCanvas = document.createElement("canvas"), i.fontPropertiesContext = i.fontPropertiesCanvas.getContext("2d"), Object.defineProperties(i.prototype, { width: { get: function () { return this.updateText(!0), Math.abs(this.scale.x) * this.texture.orig.width; }, set: function (t) { this.updateText(!0); var e = a.sign(this.scale.x) || 1; this.scale.x = e * t / this.texture.orig.width, this._width = t; } }, height: { get: function () { return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height; }, set: function (t) { this.updateText(!0); var e = a.sign(this.scale.x) || 1; this.scale.x = e * t / this.texture.orig.width, this._width = t; } }, style: { get: function () { return this._style; }, set: function (t) { t = t || {}, t instanceof u ? this._style = t : this._style = new u(t), this.localStyleID = -1, this.dirty = !0; } }, text: { get: function () { return this._text; }, set: function (t) { t = t || " ", t = t.toString(), this._text !== t && (this._text = t, this.dirty = !0); } } }), i.prototype.updateText = function (t) { var e = this._style; if (this.localStyleID !== e.styleID && (this.dirty = !0, this.localStyleID = e.styleID), this.dirty || !t) {
                    var r = "number" == typeof e.fontSize ? e.fontSize + "px" : e.fontSize;
                    this._font = e.fontStyle + " " + e.fontVariant + " " + e.fontWeight + " " + r + " " + e.fontFamily, this.context.font = this._font;
                    var i, n = e.wordWrap ? this.wordWrap(this._text) : this._text, s = n.split(/(?:\r\n|\r|\n)/), o = new Array(s.length), a = 0, h = this.determineFontProperties(this._font);
                    for (i = 0; i < s.length; i++) {
                        var u = this.context.measureText(s[i]).width + (s[i].length - 1) * e.letterSpacing;
                        o[i] = u, a = Math.max(a, u);
                    }
                    var l = a + e.strokeThickness;
                    e.dropShadow && (l += e.dropShadowDistance), l += 2 * e.padding, this.canvas.width = Math.ceil((l + this.context.lineWidth) * this.resolution);
                    var c = this.style.lineHeight || h.fontSize + e.strokeThickness, d = Math.max(c, h.fontSize + e.strokeThickness) + (s.length - 1) * c;
                    e.dropShadow && (d += e.dropShadowDistance), this.canvas.height = Math.ceil((d + 2 * this._style.padding) * this.resolution), this.context.scale(this.resolution, this.resolution), navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.font = this._font, this.context.strokeStyle = e.stroke, this.context.lineWidth = e.strokeThickness, this.context.textBaseline = e.textBaseline, this.context.lineJoin = e.lineJoin, this.context.miterLimit = e.miterLimit;
                    var p, f;
                    if (e.dropShadow) {
                        e.dropShadowBlur > 0 ? (this.context.shadowColor = e.dropShadowColor, this.context.shadowBlur = e.dropShadowBlur) : this.context.fillStyle = e.dropShadowColor;
                        var v = Math.cos(e.dropShadowAngle) * e.dropShadowDistance, g = Math.sin(e.dropShadowAngle) * e.dropShadowDistance;
                        for (i = 0; i < s.length; i++)
                            p = e.strokeThickness / 2, f = e.strokeThickness / 2 + i * c + h.ascent, "right" === e.align ? p += a - o[i] : "center" === e.align && (p += (a - o[i]) / 2), e.fill && (this.drawLetterSpacing(s[i], p + v + e.padding, f + g + e.padding), e.stroke && e.strokeThickness && (this.context.strokeStyle = e.dropShadowColor, this.drawLetterSpacing(s[i], p + v + e.padding, f + g + e.padding, !0), this.context.strokeStyle = e.stroke));
                    }
                    for (this.context.fillStyle = this._generateFillStyle(e, s), i = 0; i < s.length; i++)
                        p = e.strokeThickness / 2, f = e.strokeThickness / 2 + i * c + h.ascent, "right" === e.align ? p += a - o[i] : "center" === e.align && (p += (a - o[i]) / 2), e.stroke && e.strokeThickness && this.drawLetterSpacing(s[i], p + e.padding, f + e.padding, !0), e.fill && this.drawLetterSpacing(s[i], p + e.padding, f + e.padding);
                    this.updateTexture();
                } }, i.prototype.drawLetterSpacing = function (t, e, r, i) { var n = this._style, s = n.letterSpacing; if (0 === s)
                    return void (i ? this.context.strokeText(t, e, r) : this.context.fillText(t, e, r)); for (var o, a = String.prototype.split.call(t, ""), h = 0, u = e; h < t.length;)
                    o = a[h++], i ? this.context.strokeText(o, u, r) : this.context.fillText(o, u, r), u += this.context.measureText(o).width + s; }, i.prototype.updateTexture = function () { var t = this._texture, e = this._style; t.baseTexture.hasLoaded = !0, t.baseTexture.resolution = this.resolution, t.baseTexture.realWidth = this.canvas.width, t.baseTexture.realHeight = this.canvas.height, t.baseTexture.width = this.canvas.width / this.resolution, t.baseTexture.height = this.canvas.height / this.resolution, t.trim.width = t._frame.width = this.canvas.width / this.resolution, t.trim.height = t._frame.height = this.canvas.height / this.resolution, t.trim.x = -e.padding, t.trim.y = -e.padding, t.orig.width = t._frame.width, t.orig.height = t._frame.height - 2 * e.padding, this._onTextureUpdate(), t.baseTexture.emit("update", t.baseTexture), this.dirty = !1; }, i.prototype.renderWebGL = function (t) { this.resolution !== t.resolution && (this.resolution = t.resolution, this.dirty = !0), this.updateText(!0), n.prototype.renderWebGL.call(this, t); }, i.prototype._renderCanvas = function (t) { this.resolution !== t.resolution && (this.resolution = t.resolution, this.dirty = !0), this.updateText(!0), n.prototype._renderCanvas.call(this, t); }, i.prototype.determineFontProperties = function (t) { var e = i.fontPropertiesCache[t]; if (!e) {
                    e = {};
                    var r = i.fontPropertiesCanvas, n = i.fontPropertiesContext;
                    n.font = t;
                    var s = Math.ceil(n.measureText("|MÉq").width), o = Math.ceil(n.measureText("M").width), a = 2 * o;
                    o = 1.4 * o | 0, r.width = s, r.height = a, n.fillStyle = "#f00", n.fillRect(0, 0, s, a), n.font = t, n.textBaseline = "alphabetic", n.fillStyle = "#000", n.fillText("|MÉq", 0, o);
                    var h, u, l = n.getImageData(0, 0, s, a).data, c = l.length, d = 4 * s, p = 0, f = !1;
                    for (h = 0; h < o; h++) {
                        for (u = 0; u < d; u += 4)
                            if (255 !== l[p + u]) {
                                f = !0;
                                break;
                            }
                        if (f)
                            break;
                        p += d;
                    }
                    for (e.ascent = o - h, p = c - d, f = !1, h = a; h > o; h--) {
                        for (u = 0; u < d; u += 4)
                            if (255 !== l[p + u]) {
                                f = !0;
                                break;
                            }
                        if (f)
                            break;
                        p -= d;
                    }
                    e.descent = h - o, e.fontSize = e.ascent + e.descent, i.fontPropertiesCache[t] = e;
                } return e; }, i.prototype.wordWrap = function (t) { for (var e = "", r = t.split("\n"), i = this._style.wordWrapWidth, n = 0; n < r.length; n++) {
                    for (var s = i, o = r[n].split(" "), a = 0; a < o.length; a++) {
                        var h = this.context.measureText(o[a]).width;
                        if (this._style.breakWords && h > i)
                            for (var u = o[a].split(""), l = 0; l < u.length; l++) {
                                var c = this.context.measureText(u[l]).width;
                                c > s ? (e += "\n" + u[l], s = i - c) : (0 === l && (e += " "), e += u[l], s -= c);
                            }
                        else {
                            var d = h + this.context.measureText(" ").width;
                            0 === a || d > s ? (a > 0 && (e += "\n"), e += o[a], s = i - h) : (s -= d, e += " " + o[a]);
                        }
                    }
                    n < r.length - 1 && (e += "\n");
                } return e; }, i.prototype._calculateBounds = function () { this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData); }, i.prototype._onStyleChange = function () { this.dirty = !0; }, i.prototype._generateFillStyle = function (t, e) {
                    if (Array.isArray(t.fill)) {
                        var r, i, n, s, o, a = this.canvas.width / this.resolution, u = this.canvas.height / this.resolution;
                        if (t.fillGradientType === h.TEXT_GRADIENT.LINEAR_VERTICAL)
                            for (i = this.context.createLinearGradient(a / 2, 0, a / 2, u),
                                n = (t.fill.length + 1) * e.length, s = 0, r = 0; r < e.length; r++) {
                                s += 1;
                                for (var l = 0; l < t.fill.length; l++)
                                    o = s / n, i.addColorStop(o, t.fill[l]), s++;
                            }
                        else
                            for (i = this.context.createLinearGradient(0, u / 2, a, u / 2), n = t.fill.length + 1, s = 1, r = 0; r < t.fill.length; r++)
                                o = s / n, i.addColorStop(o, t.fill[r]), s++;
                        return i;
                    }
                    return t.fill;
                }, i.prototype.destroy = function (t) { "boolean" == typeof t && (t = { children: t }), t = Object.assign({}, l, t), n.prototype.destroy.call(this, t), this.context = null, this.canvas = null, this._style = null; };
            }, { "../const": 78, "../math": 102, "../sprites/Sprite": 133, "../textures/Texture": 144, "../utils": 151, "./TextStyle": 140 }], 140: [function (t, e, r) { function i(t) { this.styleID = 0, Object.assign(this, this._defaults, t); } function n(t) { if ("number" == typeof t)
                return o.hex2string(t); if (Array.isArray(t))
                for (var e = 0; e < t.length; ++e)
                    "number" == typeof t[e] && (t[e] = o.hex2string(t[e])); return t; } var s = t("../const"), o = t("../utils"); i.prototype.constructor = i, e.exports = i, i.prototype._defaults = { align: "left", breakWords: !1, dropShadow: !1, dropShadowAngle: Math.PI / 6, dropShadowBlur: 0, dropShadowColor: "#000000", dropShadowDistance: 5, fill: "black", fillGradientType: s.TEXT_GRADIENT.LINEAR_VERTICAL, fontFamily: "Arial", fontSize: 26, fontStyle: "normal", fontVariant: "normal", fontWeight: "normal", letterSpacing: 0, lineHeight: 0, lineJoin: "miter", miterLimit: 10, padding: 0, stroke: "black", strokeThickness: 0, textBaseline: "alphabetic", wordWrap: !1, wordWrapWidth: 100 }, i.prototype.clone = function () { var t = {}; for (var e in this._defaults)
                t[e] = this[e]; return new i(t); }, i.prototype.reset = function () { Object.assign(this, this._defaults); }, Object.defineProperties(i.prototype, { align: { get: function () { return this._align; }, set: function (t) { this._align !== t && (this._align = t, this.styleID++); } }, breakWords: { get: function () { return this._breakWords; }, set: function (t) { this._breakWords !== t && (this._breakWords = t, this.styleID++); } }, dropShadow: { get: function () { return this._dropShadow; }, set: function (t) { this._dropShadow !== t && (this._dropShadow = t, this.styleID++); } }, dropShadowAngle: { get: function () { return this._dropShadowAngle; }, set: function (t) { this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++); } }, dropShadowBlur: { get: function () { return this._dropShadowBlur; }, set: function (t) { this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++); } }, dropShadowColor: { get: function () { return this._dropShadowColor; }, set: function (t) { var e = n(t); this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++); } }, dropShadowDistance: { get: function () { return this._dropShadowDistance; }, set: function (t) { this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++); } }, fill: { get: function () { return this._fill; }, set: function (t) { var e = n(t); this._fill !== e && (this._fill = e, this.styleID++); } }, fillGradientType: { get: function () { return this._fillGradientType; }, set: function (t) { this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++); } }, fontFamily: { get: function () { return this._fontFamily; }, set: function (t) { this.fontFamily !== t && (this._fontFamily = t, this.styleID++); } }, fontSize: { get: function () { return this._fontSize; }, set: function (t) { this._fontSize !== t && (this._fontSize = t, this.styleID++); } }, fontStyle: { get: function () { return this._fontStyle; }, set: function (t) { this._fontStyle !== t && (this._fontStyle = t, this.styleID++); } }, fontVariant: { get: function () { return this._fontVariant; }, set: function (t) { this._fontVariant !== t && (this._fontVariant = t, this.styleID++); } }, fontWeight: { get: function () { return this._fontWeight; }, set: function (t) { this._fontWeight !== t && (this._fontWeight = t, this.styleID++); } }, letterSpacing: { get: function () { return this._letterSpacing; }, set: function (t) { this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++); } }, lineHeight: { get: function () { return this._lineHeight; }, set: function (t) { this._lineHeight !== t && (this._lineHeight = t, this.styleID++); } }, lineJoin: { get: function () { return this._lineJoin; }, set: function (t) { this._lineJoin !== t && (this._lineJoin = t, this.styleID++); } }, miterLimit: { get: function () { return this._miterLimit; }, set: function (t) { this._miterLimit !== t && (this._miterLimit = t, this.styleID++); } }, padding: { get: function () { return this._padding; }, set: function (t) { this._padding !== t && (this._padding = t, this.styleID++); } }, stroke: { get: function () { return this._stroke; }, set: function (t) { var e = n(t); this._stroke !== e && (this._stroke = e, this.styleID++); } }, strokeThickness: { get: function () { return this._strokeThickness; }, set: function (t) { this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++); } }, textBaseline: { get: function () { return this._textBaseline; }, set: function (t) { this._textBaseline !== t && (this._textBaseline = t, this.styleID++); } }, wordWrap: { get: function () { return this._wordWrap; }, set: function (t) { this._wordWrap !== t && (this._wordWrap = t, this.styleID++); } }, wordWrapWidth: { get: function () { return this._wordWrapWidth; }, set: function (t) { this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++); } } }); }, { "../const": 78, "../utils": 151 }], 141: [function (t, e, r) { function i(t, e, r, i) { n.call(this, null, r), this.resolution = i || s.RESOLUTION, this.width = t || 100, this.height = e || 100, this.realWidth = this.width * this.resolution, this.realHeight = this.height * this.resolution, this.scaleMode = r || s.SCALE_MODES.DEFAULT, this.hasLoaded = !0, this._glRenderTargets = [], this._canvasRenderTarget = null, this.valid = !1; } var n = t("./BaseTexture"), s = t("../const"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.resize = function (t, e) { t === this.width && e === this.height || (this.valid = t > 0 && e > 0, this.width = t, this.height = e, this.realWidth = this.width * this.resolution, this.realHeight = this.height * this.resolution, this.valid && this.emit("update", this)); }, i.prototype.destroy = function () { n.prototype.destroy.call(this, !0), this.renderer = null; }; }, { "../const": 78, "./BaseTexture": 142 }], 142: [function (t, e, r) { function i(t, e, r) { o.call(this), this.uid = n.uid(), this.touched = 0, this.resolution = r || s.RESOLUTION, this.width = 100, this.height = 100, this.realWidth = 100, this.realHeight = 100, this.scaleMode = e || s.SCALE_MODES.DEFAULT, this.hasLoaded = !1, this.isLoading = !1, this.source = null, this.premultipliedAlpha = !0, this.imageUrl = null, this.isPowerOfTwo = !1, this.mipmap = s.MIPMAP_TEXTURES, this.wrapMode = s.WRAP_MODES.DEFAULT, this._glTextures = [], this._enabled = 0, this._id = 0, t && this.loadSource(t); } var n = t("../utils"), s = t("../const"), o = t("eventemitter3"), a = t("../utils/determineCrossOrigin"), h = t("bit-twiddle"); i.prototype = Object.create(o.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.update = function () { this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width, this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height, this.width = this.realWidth / this.resolution, this.height = this.realHeight / this.resolution, this.isPowerOfTwo = h.isPow2(this.realWidth) && h.isPow2(this.realHeight), this.emit("update", this); }, i.prototype.loadSource = function (t) { var e = this.isLoading; if (this.hasLoaded = !1, this.isLoading = !1, e && this.source && (this.source.onload = null, this.source.onerror = null), this.source = t, (this.source.complete || this.source.getContext) && this.source.width && this.source.height)
                this._sourceLoaded();
            else if (!t.getContext) {
                this.isLoading = !0;
                var r = this;
                t.onload = function () { t.onload = null, t.onerror = null, r.isLoading && (r.isLoading = !1, r._sourceLoaded(), r.emit("loaded", r)); }, t.onerror = function () { t.onload = null, t.onerror = null, r.isLoading && (r.isLoading = !1, r.emit("error", r)); }, t.complete && t.src && (this.isLoading = !1, t.onload = null, t.onerror = null, t.width && t.height ? (this._sourceLoaded(), e && this.emit("loaded", this)) : e && this.emit("error", this));
            } }, i.prototype._sourceLoaded = function () { this.hasLoaded = !0, this.update(); }, i.prototype.destroy = function () { this.imageUrl ? (delete n.BaseTextureCache[this.imageUrl], delete n.TextureCache[this.imageUrl], this.imageUrl = null, navigator.isCocoonJS || (this.source.src = "")) : this.source && this.source._pixiId && delete n.BaseTextureCache[this.source._pixiId], this.source = null, this.dispose(); }, i.prototype.dispose = function () { this.emit("dispose", this); }, i.prototype.updateSourceImage = function (t) { this.source.src = t, this.loadSource(this.source); }, i.fromImage = function (t, e, r) { var s = n.BaseTextureCache[t]; if (!s) {
                var o = new Image;
                void 0 === e && 0 !== t.indexOf("data:") && (o.crossOrigin = a(t)), s = new i(o, r), s.imageUrl = t, o.src = t, n.BaseTextureCache[t] = s, s.resolution = n.getResolutionOfUrl(t);
            } return s; }, i.fromCanvas = function (t, e) { t._pixiId || (t._pixiId = "canvas_" + n.uid()); var r = n.BaseTextureCache[t._pixiId]; return r || (r = new i(t, e), n.BaseTextureCache[t._pixiId] = r), r; }; }, { "../const": 78, "../utils": 151, "../utils/determineCrossOrigin": 150, "bit-twiddle": 30, eventemitter3: 32 }], 143: [function (t, e, r) { function i(t, e) { if (this.legacyRenderer = null, !(t instanceof n)) {
                var r = arguments[1], i = arguments[2], o = arguments[3] || 0, a = arguments[4] || 1;
                console.warn("v4 RenderTexture now expects a new BaseRenderTexture. Please use RenderTexture.create(" + r + ", " + i + ")"), this.legacyRenderer = arguments[0], e = null, t = new n(r, i, o, a);
            } s.call(this, t, e), this.valid = !0, this._updateUvs(); } var n = t("./BaseRenderTexture"), s = t("./Texture"); i.prototype = Object.create(s.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.resize = function (t, e, r) { this.valid = t > 0 && e > 0, this._frame.width = this.orig.width = t, this._frame.height = this.orig.height = e, r || this.baseTexture.resize(t, e), this._updateUvs(); }, i.create = function (t, e, r, s) { return new i(new n(t, e, r, s)); }; }, { "./BaseRenderTexture": 141, "./Texture": 144 }], 144: [function (t, e, r) { function i(t, e, r, n, s) { if (a.call(this), this.noFrame = !1, e || (this.noFrame = !0, e = new h.Rectangle(0, 0, 1, 1)), t instanceof i && (t = t.baseTexture), this.baseTexture = t, this._frame = e, this.trim = n, this.valid = !1, this.requiresUpdate = !1, this._uvs = null, this.orig = r || e, this._rotate = +(s || 0), s === !0)
                this._rotate = 2;
            else if (this._rotate % 2 !== 0)
                throw "attempt to use diamond-shaped UVs. If you are sure, set rotation manually"; t.hasLoaded ? (this.noFrame && (e = new h.Rectangle(0, 0, t.width, t.height), t.on("update", this.onBaseTextureUpdated, this)), this.frame = e) : t.once("loaded", this.onBaseTextureLoaded, this), this._updateID = 0; } var n = t("./BaseTexture"), s = t("./VideoBaseTexture"), o = t("./TextureUvs"), a = t("eventemitter3"), h = t("../math"), u = t("../utils"); i.prototype = Object.create(a.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { frame: { get: function () { return this._frame; }, set: function (t) { if (this._frame = t, this.noFrame = !1, t.x + t.width > this.baseTexture.width || t.y + t.height > this.baseTexture.height)
                        throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this); this.valid = t && t.width && t.height && this.baseTexture.hasLoaded, this.trim || this.rotate || (this.orig = t), this.valid && this._updateUvs(); } }, rotate: { get: function () { return this._rotate; }, set: function (t) { this._rotate = t, this.valid && this._updateUvs(); } }, width: { get: function () { return this.orig ? this.orig.width : 0; } }, height: { get: function () { return this.orig ? this.orig.height : 0; } } }), i.prototype.update = function () { this.baseTexture.update(); }, i.prototype.onBaseTextureLoaded = function (t) { this._updateID++, this.noFrame ? this.frame = new h.Rectangle(0, 0, t.width, t.height) : this.frame = this._frame, this.baseTexture.on("update", this.onBaseTextureUpdated, this), this.emit("update", this); }, i.prototype.onBaseTextureUpdated = function (t) { this._updateID++, this._frame.width = t.width, this._frame.height = t.height, this.emit("update", this); }, i.prototype.destroy = function (t) { this.baseTexture && (t && (u.TextureCache[this.baseTexture.imageUrl] && delete u.TextureCache[this.baseTexture.imageUrl], this.baseTexture.destroy()), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture.off("loaded", this.onBaseTextureLoaded, this), this.baseTexture = null), this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, this.off("dispose", this.dispose, this), this.off("update", this.update, this); }, i.prototype.clone = function () { return new i(this.baseTexture, this.frame, this.orig, this.trim, this.rotate); }, i.prototype._updateUvs = function () { this._uvs || (this._uvs = new o), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++; }, i.fromImage = function (t, e, r) { var s = u.TextureCache[t]; return s || (s = new i(n.fromImage(t, e, r)), u.TextureCache[t] = s), s; }, i.fromFrame = function (t) { var e = u.TextureCache[t]; if (!e)
                throw new Error('The frameId "' + t + '" does not exist in the texture cache'); return e; }, i.fromCanvas = function (t, e) { return new i(n.fromCanvas(t, e)); }, i.fromVideo = function (t, e) { return "string" == typeof t ? i.fromVideoUrl(t, e) : new i(s.fromVideo(t, e)); }, i.fromVideoUrl = function (t, e) { return new i(s.fromUrl(t, e)); }, i.from = function (t) { if ("string" == typeof t) {
                var e = u.TextureCache[t];
                if (!e) {
                    var r = null !== t.match(/\.(mp4|webm|ogg|h264|avi|mov)$/);
                    return r ? i.fromVideoUrl(t) : i.fromImage(t);
                }
                return e;
            } return t instanceof HTMLCanvasElement ? i.fromCanvas(t) : t instanceof HTMLVideoElement ? i.fromVideo(t) : t instanceof n ? new i(n) : void 0; }, i.addTextureToCache = function (t, e) { u.TextureCache[e] = t; }, i.removeTextureFromCache = function (t) { var e = u.TextureCache[t]; return delete u.TextureCache[t], delete u.BaseTextureCache[t], e; }, i.EMPTY = new i(new n), i.EMPTY.destroy = function () { }, i.EMPTY.on = function () { }, i.EMPTY.once = function () { }, i.EMPTY.emit = function () { }; }, { "../math": 102, "../utils": 151, "./BaseTexture": 142, "./TextureUvs": 145, "./VideoBaseTexture": 146, eventemitter3: 32 }], 145: [function (t, e, r) { function i() { this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsUint32 = new Uint32Array(4); } e.exports = i; var n = t("../math/GroupD8"); i.prototype.set = function (t, e, r) { var i = e.width, s = e.height; if (r) {
                var o = t.width / 2 / i, a = t.height / 2 / s, h = t.x / i + o, u = t.y / s + a;
                r = n.add(r, n.NW), this.x0 = h + o * n.uX(r), this.y0 = u + a * n.uY(r), r = n.add(r, 2), this.x1 = h + o * n.uX(r), this.y1 = u + a * n.uY(r), r = n.add(r, 2), this.x2 = h + o * n.uX(r), this.y2 = u + a * n.uY(r), r = n.add(r, 2), this.x3 = h + o * n.uX(r), this.y3 = u + a * n.uY(r);
            }
            else
                this.x0 = t.x / i, this.y0 = t.y / s, this.x1 = (t.x + t.width) / i, this.y1 = t.y / s, this.x2 = (t.x + t.width) / i, this.y2 = (t.y + t.height) / s, this.x3 = t.x / i, this.y3 = (t.y + t.height) / s; this.uvsUint32[0] = (65535 * this.y0 & 65535) << 16 | 65535 * this.x0 & 65535, this.uvsUint32[1] = (65535 * this.y1 & 65535) << 16 | 65535 * this.x1 & 65535, this.uvsUint32[2] = (65535 * this.y2 & 65535) << 16 | 65535 * this.x2 & 65535, this.uvsUint32[3] = (65535 * this.y3 & 65535) << 16 | 65535 * this.x3 & 65535; }; }, { "../math/GroupD8": 98 }], 146: [function (t, e, r) { function i(t, e) { if (!t)
                throw new Error("No video source element specified."); (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), s.call(this, t, e), this.autoUpdate = !1, this._onUpdate = this._onUpdate.bind(this), this._onCanPlay = this._onCanPlay.bind(this), t.complete || (t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlay), t.addEventListener("play", this._onPlayStart.bind(this)), t.addEventListener("pause", this._onPlayStop.bind(this))), this.__loaded = !1; } function n(t, e) { e || (e = "video/" + t.substr(t.lastIndexOf(".") + 1)); var r = document.createElement("source"); return r.src = t, r.type = e, r; } var s = t("./BaseTexture"), o = t("../utils"); i.prototype = Object.create(s.prototype), i.prototype.constructor = i, e.exports = i, i.prototype._onUpdate = function () { this.autoUpdate && (window.requestAnimationFrame(this._onUpdate), this.update()); }, i.prototype._onPlayStart = function () { this.autoUpdate || (window.requestAnimationFrame(this._onUpdate), this.autoUpdate = !0); }, i.prototype._onPlayStop = function () { this.autoUpdate = !1; }, i.prototype._onCanPlay = function () { this.hasLoaded = !0, this.source && (this.source.removeEventListener("canplay", this._onCanPlay), this.source.removeEventListener("canplaythrough", this._onCanPlay), this.width = this.source.videoWidth, this.height = this.source.videoHeight, this.source.play(), this.__loaded || (this.__loaded = !0, this.emit("loaded", this))); }, i.prototype.destroy = function () { this.source && this.source._pixiId && (delete o.BaseTextureCache[this.source._pixiId], delete this.source._pixiId), s.prototype.destroy.call(this); }, i.fromVideo = function (t, e) { t._pixiId || (t._pixiId = "video_" + o.uid()); var r = o.BaseTextureCache[t._pixiId]; return r || (r = new i(t, e), o.BaseTextureCache[t._pixiId] = r), r; }, i.fromUrl = function (t, e) { var r = document.createElement("video"); if (Array.isArray(t))
                for (var s = 0; s < t.length; ++s)
                    r.appendChild(n(t[s].src || t[s], t[s].mime));
            else
                r.appendChild(n(t.src || t, t.mime)); return r.load(), r.play(), i.fromVideo(r, e); }, i.fromUrls = i.fromUrl; }, { "../utils": 151, "./BaseTexture": 142 }], 147: [function (t, e, r) { function i() { var t = this; this._tick = function (e) { t._requestId = null, t.started && (t.update(e), t.started && null === t._requestId && t._emitter.listeners(o, !0) && (t._requestId = requestAnimationFrame(t._tick))); }, this._emitter = new s, this._requestId = null, this._maxElapsedMS = 100, this.autoStart = !1, this.deltaTime = 1, this.elapsedMS = 1 / n.TARGET_FPMS, this.lastTime = 0, this.speed = 1, this.started = !1; } var n = t("../const"), s = t("eventemitter3"), o = "tick"; Object.defineProperties(i.prototype, { FPS: { get: function () { return 1e3 / this.elapsedMS; } }, minFPS: { get: function () { return 1e3 / this._maxElapsedMS; }, set: function (t) { var e = Math.min(Math.max(0, t) / 1e3, n.TARGET_FPMS); this._maxElapsedMS = 1 / e; } } }), i.prototype._requestIfNeeded = function () { null === this._requestId && this._emitter.listeners(o, !0) && (this.lastTime = performance.now(), this._requestId = requestAnimationFrame(this._tick)); }, i.prototype._cancelIfNeeded = function () { null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null); }, i.prototype._startIfPossible = function () { this.started ? this._requestIfNeeded() : this.autoStart && this.start(); }, i.prototype.add = function (t, e) { return this._emitter.on(o, t, e), this._startIfPossible(), this; }, i.prototype.addOnce = function (t, e) { return this._emitter.once(o, t, e), this._startIfPossible(), this; }, i.prototype.remove = function (t, e) { return this._emitter.off(o, t, e), this._emitter.listeners(o, !0) || this._cancelIfNeeded(), this; }, i.prototype.start = function () { this.started || (this.started = !0, this._requestIfNeeded()); }, i.prototype.stop = function () { this.started && (this.started = !1, this._cancelIfNeeded()); }, i.prototype.update = function (t) { var e; t = t || performance.now(), t > this.lastTime ? (e = this.elapsedMS = t - this.lastTime, e > this._maxElapsedMS && (e = this._maxElapsedMS), this.deltaTime = e * n.TARGET_FPMS * this.speed, this._emitter.emit(o, this.deltaTime)) : this.deltaTime = this.elapsedMS = 0, this.lastTime = t; }, e.exports = i; }, { "../const": 78, eventemitter3: 32 }], 148: [function (t, e, r) { var i = t("./Ticker"), n = new i; n.autoStart = !0, e.exports = { shared: n, Ticker: i }; }, { "./Ticker": 147 }], 149: [function (t, e, r) { var i = function (t) { for (var e = 6 * t, r = new Uint16Array(e), i = 0, n = 0; i < e; i += 6, n += 4)
                r[i + 0] = n + 0, r[i + 1] = n + 1, r[i + 2] = n + 2, r[i + 3] = n + 0, r[i + 4] = n + 2, r[i + 5] = n + 3; return r; }; e.exports = i; }, {}], 150: [function (t, e, r) { var i, n = t("url"), s = function (t, e) { if (0 === t.indexOf("data:"))
                return ""; e = e || window.location, i || (i = document.createElement("a")), i.href = t, t = n.parse(i.href); var r = !t.port && "" === e.port || t.port === e.port; return t.hostname === e.hostname && r && t.protocol === e.protocol ? "" : "anonymous"; }; e.exports = s; }, { url: 72 }], 151: [function (t, e, r) { var i = t("../const"), n = e.exports = { _uid: 0, _saidHello: !1, EventEmitter: t("eventemitter3"), pluginTarget: t("./pluginTarget"), uid: function () { return ++n._uid; }, hex2rgb: function (t, e) { return e = e || [], e[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (255 & t) / 255, e; }, hex2string: function (t) { return t = t.toString(16), t = "000000".substr(0, 6 - t.length) + t, "#" + t; }, rgb2hex: function (t) { return (255 * t[0] << 16) + (255 * t[1] << 8) + 255 * t[2]; }, getResolutionOfUrl: function (t) { var e = i.RETINA_PREFIX.exec(t); return e ? parseFloat(e[1]) : 1; }, sayHello: function (t) { if (!n._saidHello) {
                    if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                        var e = ["\n %c %c %c Pixi.js " + i.VERSION + " - ✰ " + t + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                        window.console.log.apply(console, e);
                    }
                    else
                        window.console && window.console.log("Pixi.js " + i.VERSION + " - " + t + " - http://www.pixijs.com/");
                    n._saidHello = !0;
                } }, isWebGLSupported: function () { var t = { stencil: !0, failIfMajorPerformanceCaveat: !0 }; try {
                    if (!window.WebGLRenderingContext)
                        return !1;
                    var e = document.createElement("canvas"), r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), i = !(!r || !r.getContextAttributes().stencil);
                    if (r) {
                        var n = r.getExtension("WEBGL_lose_context");
                        n && n.loseContext();
                    }
                    return r = null, i;
                }
                catch (t) {
                    return !1;
                } }, sign: function (t) { return t ? t < 0 ? -1 : 1 : 0; }, removeItems: function (t, e, r) { var i = t.length; if (!(e >= i || 0 === r)) {
                    r = e + r > i ? i - e : r;
                    for (var n = e, s = i - r; n < s; ++n)
                        t[n] = t[n + r];
                    t.length = s;
                } }, TextureCache: {}, BaseTextureCache: {} }; }, { "../const": 78, "./pluginTarget": 153, eventemitter3: 32 }], 152: [function (t, e, r) { var i = t("ismobilejs"), n = function (t) { return i.tablet || i.phone ? 2 : t; }; e.exports = n; }, { ismobilejs: 33 }], 153: [function (t, e, r) { function i(t) { t.__plugins = {}, t.registerPlugin = function (e, r) { t.__plugins[e] = r; }, t.prototype.initPlugins = function () { this.plugins = this.plugins || {}; for (var e in t.__plugins)
                this.plugins[e] = new t.__plugins[e](this); }, t.prototype.destroyPlugins = function () { for (var t in this.plugins)
                this.plugins[t].destroy(), this.plugins[t] = null; this.plugins = null; }; } e.exports = { mixin: function (t) { i(t); } }; }, {}], 154: [function (t, e, r) { }, { "./core": 97, "./extras": 164, "./filters": 175, "./mesh": 191, "./particles": 194 }], 155: [function (t, e, r) { function i(t) { this.renderer = t, t.extract = this; } var n = t("../../core"), s = new n.Rectangle; i.prototype.constructor = i, e.exports = i, i.prototype.image = function (t) { var e = new Image; return e.src = this.base64(t), e; }, i.prototype.base64 = function (t) { return this.canvas(t).toDataURL(); }, i.prototype.canvas = function (t) { var e, r, i, o, a = this.renderer; t && (o = t instanceof n.RenderTexture ? t : a.generateTexture(t)), o ? (e = o.baseTexture._canvasRenderTarget.context, r = o.baseTexture._canvasRenderTarget.resolution, i = o.frame) : (e = a.rootContext, r = a.rootResolution, i = s, i.width = this.renderer.width, i.height = this.renderer.height); var h = i.width * r, u = i.height * r, l = new n.CanvasRenderTarget(h, u), c = e.getImageData(i.x * r, i.y * r, h, u); return l.context.putImageData(c, 0, 0), l.canvas; }, i.prototype.pixels = function (t) { var e, r, i, o, a = this.renderer; return t && (o = t instanceof n.RenderTexture ? t : a.generateTexture(t)), o ? (e = o.baseTexture._canvasRenderTarget.context, r = o.baseTexture._canvasRenderTarget.resolution, i = o.frame) : (e = a.rootContext, r = a.rootResolution, i = s, i.width = a.width, i.height = a.height), e.getImageData(0, 0, i.width * r, i.height * r).data; }, i.prototype.destroy = function () { this.renderer.extract = null, this.renderer = null; }, n.CanvasRenderer.registerPlugin("extract", i); }, { "../../core": 97 }], 156: [function (t, e, r) { e.exports = { webGL: t("./webgl/WebGLExtract"), canvas: t("./canvas/CanvasExtract") }; }, { "./canvas/CanvasExtract": 155, "./webgl/WebGLExtract": 157 }], 157: [function (t, e, r) { function i(t) { this.renderer = t, t.extract = this; } var n = t("../../core"), s = new n.Rectangle; i.prototype.constructor = i, e.exports = i, i.prototype.image = function (t) { var e = new Image; return e.src = this.base64(t), e; }, i.prototype.base64 = function (t) { return this.canvas(t).toDataURL(); }, i.prototype.canvas = function (t) { var e, r, i, o, a = this.renderer, h = !1; t && (o = t instanceof n.RenderTexture ? t : this.renderer.generateTexture(t)), o ? (e = o.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID], r = e.resolution, i = o.frame, h = !1) : (e = this.renderer.rootRenderTarget, r = e.resolution, h = !0, i = s, i.width = e.size.width, i.height = e.size.height); var u = i.width * r, l = i.height * r, c = new n.CanvasRenderTarget(u, l); if (e) {
                a.bindRenderTarget(e);
                var d = new Uint8Array(4 * u * l), p = a.gl;
                p.readPixels(i.x * r, i.y * r, u, l, p.RGBA, p.UNSIGNED_BYTE, d);
                var f = c.context.getImageData(0, 0, u, l);
                f.data.set(d), c.context.putImageData(f, 0, 0), h && (c.context.scale(1, -1), c.context.drawImage(c.canvas, 0, -l));
            } return c.canvas; }, i.prototype.pixels = function (t) { var e, r, i, o, a = this.renderer; t && (o = t instanceof n.RenderTexture ? t : this.renderer.generateTexture(t)), o ? (e = o.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID], r = e.resolution, i = o.frame) : (e = this.renderer.rootRenderTarget, r = e.resolution, i = s, i.width = e.size.width, i.height = e.size.height); var h = i.width * r, u = i.height * r, l = new Uint8Array(4 * h * u); if (e) {
                a.bindRenderTarget(e);
                var c = a.gl;
                c.readPixels(i.x * r, i.y * r, h, u, c.RGBA, c.UNSIGNED_BYTE, l);
            } return l; }, i.prototype.destroy = function () { this.renderer.extract = null, this.renderer = null; }, n.WebGLRenderer.registerPlugin("extract", i); }, { "../../core": 97 }], 158: [function (t, e, r) { function i(t, e) { n.Container.call(this), e = e || {}, this.textWidth = 0, this.textHeight = 0, this._glyphs = [], this._font = { tint: void 0 !== e.tint ? e.tint : 16777215, align: e.align || "left", name: null, size: 0 }, this.font = e.font, this._text = t, this.maxWidth = 0, this.maxLineHeight = 0, this._anchor = new s(this.makeDirty, this, 0, 0), this.dirty = !1, this.updateText(); } var n = t("../core"), s = t("../core/math/ObservablePoint"); i.prototype = Object.create(n.Container.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { tint: { get: function () { return this._font.tint; }, set: function (t) { this._font.tint = "number" == typeof t && t >= 0 ? t : 16777215, this.dirty = !0; } }, align: { get: function () { return this._font.align; }, set: function (t) { this._font.align = t || "left", this.dirty = !0; } }, anchor: { get: function () { return this._anchor; }, set: function (t) { "number" == typeof t ? this._anchor.set(t) : this._anchor.copy(t); } }, font: { get: function () { return this._font; }, set: function (t) { t && ("string" == typeof t ? (t = t.split(" "), this._font.name = 1 === t.length ? t[0] : t.slice(1).join(" "), this._font.size = t.length >= 2 ? parseInt(t[0], 10) : i.fonts[this._font.name].size) : (this._font.name = t.name, this._font.size = "number" == typeof t.size ? t.size : parseInt(t.size, 10)), this.dirty = !0); } }, text: { get: function () { return this._text; }, set: function (t) { t = t.toString() || " ", this._text !== t && (this._text = t, this.dirty = !0); } } }), i.prototype.updateText = function () { for (var t = i.fonts[this._font.name], e = new n.Point, r = null, s = [], o = 0, a = 0, h = [], u = 0, l = this._font.size / t.size, c = -1, d = 0, p = 0, f = 0; f < this.text.length; f++) {
                var v = this.text.charCodeAt(f);
                if (/(\s)/.test(this.text.charAt(f)) && (c = f, d = o), /(?:\r\n|\r|\n)/.test(this.text.charAt(f)))
                    h.push(o), a = Math.max(a, o), u++, e.x = 0, e.y += t.lineHeight, r = null;
                else if (c !== -1 && this.maxWidth > 0 && e.x * l > this.maxWidth)
                    n.utils.removeItems(s, c, f - c), f = c, c = -1, h.push(d), a = Math.max(a, d), u++, e.x = 0, e.y += t.lineHeight, r = null;
                else {
                    var g = t.chars[v];
                    g && (r && g.kerning[r] && (e.x += g.kerning[r]), s.push({ texture: g.texture, line: u, charCode: v, position: new n.Point(e.x + g.xOffset, e.y + g.yOffset) }), o = e.x + (g.texture.width + g.xOffset), e.x += g.xAdvance, p = Math.max(p, g.yOffset + g.texture.height), r = v);
                }
            } h.push(o), a = Math.max(a, o); var y = []; for (f = 0; f <= u; f++) {
                var x = 0;
                "right" === this._font.align ? x = a - h[f] : "center" === this._font.align && (x = (a - h[f]) / 2), y.push(x);
            } var m = s.length, _ = this.tint; for (f = 0; f < m; f++) {
                var b = this._glyphs[f];
                b ? b.texture = s[f].texture : (b = new n.Sprite(s[f].texture), this._glyphs.push(b)), b.position.x = (s[f].position.x + y[s[f].line]) * l, b.position.y = s[f].position.y * l, b.scale.x = b.scale.y = l, b.tint = _, b.parent || this.addChild(b);
            } for (f = m; f < this._glyphs.length; ++f)
                this.removeChild(this._glyphs[f]); if (this.textWidth = a * l, this.textHeight = (e.y + t.lineHeight) * l, 0 !== this.anchor.x || 0 !== this.anchor.y)
                for (f = 0; f < m; f++)
                    this._glyphs[f].x -= this.textWidth * this.anchor.x, this._glyphs[f].y -= this.textHeight * this.anchor.y; this.maxLineHeight = p * l; }, i.prototype.updateTransform = function () { this.validate(), this.containerUpdateTransform(); }, i.prototype.getLocalBounds = function () { return this.validate(), n.Container.prototype.getLocalBounds.call(this); }, i.prototype.validate = function () { this.dirty && (this.updateText(), this.dirty = !1); }, i.prototype.makeDirty = function () { this.dirty = !0; }, i.fonts = {}; }, { "../core": 97, "../core/math/ObservablePoint": 100 }], 159: [function (t, e, r) { function i(t) { n.Sprite.call(this, t[0] instanceof n.Texture ? t[0] : t[0].texture), this._textures = null, this._durations = null, this.textures = t, this.animationSpeed = 1, this.loop = !0, this.onComplete = null, this._currentTime = 0, this.playing = !1; } var n = t("../core"); i.prototype = Object.create(n.Sprite.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { totalFrames: { get: function () { return this._textures.length; } }, textures: { get: function () { return this._textures; }, set: function (t) { if (t[0] instanceof n.Texture)
                        this._textures = t, this._durations = null;
                    else {
                        this._textures = [], this._durations = [];
                        for (var e = 0; e < t.length; e++)
                            this._textures.push(t[e].texture), this._durations.push(t[e].time);
                    } } }, currentFrame: { get: function () { var t = Math.floor(this._currentTime) % this._textures.length; return t < 0 && (t += this._textures.length), t; } } }), i.prototype.stop = function () { this.playing && (this.playing = !1, n.ticker.shared.remove(this.update, this)); }, i.prototype.play = function () { this.playing || (this.playing = !0, n.ticker.shared.add(this.update, this)); }, i.prototype.gotoAndStop = function (t) { this.stop(), this._currentTime = t, this._texture = this._textures[this.currentFrame], this._textureID = -1; }, i.prototype.gotoAndPlay = function (t) { this._currentTime = t, this.play(); }, i.prototype.update = function (t) { var e = this.animationSpeed * t; if (null !== this._durations) {
                var r = this._currentTime % 1 * this._durations[this.currentFrame];
                for (r += e / 60 * 1e3; r < 0;)
                    this._currentTime--, r += this._durations[this.currentFrame];
                var i = Math.sign(this.animationSpeed * t);
                for (this._currentTime = Math.floor(this._currentTime); r >= this._durations[this.currentFrame];)
                    r -= this._durations[this.currentFrame] * i, this._currentTime += i;
                this._currentTime += r / this._durations[this.currentFrame];
            }
            else
                this._currentTime += e; this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : (this._texture = this._textures[this.currentFrame], this._textureID = -1); }, i.prototype.destroy = function () { this.stop(), n.Sprite.prototype.destroy.call(this); }, i.fromFrames = function (t) { for (var e = [], r = 0; r < t.length; ++r)
                e.push(n.Texture.fromFrame(t[r])); return new i(e); }, i.fromImages = function (t) { for (var e = [], r = 0; r < t.length; ++r)
                e.push(n.Texture.fromImage(t[r])); return new i(e); }; }, { "../core": 97 }], 160: [function (t, e, r) {
                function i(t, e, r) { n.Sprite.call(this, t), this.tileScale = new n.Point(1, 1), this.tilePosition = new n.Point(0, 0), this._width = e || 100, this._height = r || 100, this._uvs = new n.TextureUvs, this._canvasPattern = null, this._glDatas = []; }
                var n = t("../core"), s = new n.Point, o = t("../core/textures/Texture"), a = t("../core/sprites/canvas/CanvasTinter"), h = t("./webgl/TilingShader"), u = new Float32Array(4);
                i.prototype = Object.create(n.Sprite.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { width: { get: function () { return this._width; }, set: function (t) { this._width = t; } }, height: { get: function () { return this._height; }, set: function (t) { this._height = t; } } }), i.prototype._onTextureUpdate = function () { }, i.prototype._renderWebGL = function (t) { var e = this._texture; if (e && e._uvs) {
                    t.flush();
                    var r = t.gl, i = this._glDatas[t.CONTEXT_UID];
                    i || (i = { shader: new h(r), quad: new n.Quad(r) }, this._glDatas[t.CONTEXT_UID] = i, i.quad.initVao(i.shader));
                    var s = i.quad.vertices;
                    s[0] = s[6] = this._width * -this.anchor.x, s[1] = s[3] = this._height * -this.anchor.y, s[2] = s[4] = this._width * (1 - this.anchor.x), s[5] = s[7] = this._height * (1 - this.anchor.y), i.quad.upload(), t.bindShader(i.shader);
                    var o = e._uvs, a = e._frame.width, l = e._frame.height, c = e.baseTexture.width, d = e.baseTexture.height, p = i.shader.uniforms.uPixelSize;
                    p[0] = 1 / c, p[1] = 1 / d, i.shader.uniforms.uPixelSize = p;
                    var f = i.shader.uniforms.uFrame;
                    f[0] = o.x0, f[1] = o.y0, f[2] = o.x1 - o.x0, f[3] = o.y2 - o.y0, i.shader.uniforms.uFrame = f;
                    var v = i.shader.uniforms.uTransform;
                    v[0] = this.tilePosition.x % (a * this.tileScale.x) / this._width, v[1] = this.tilePosition.y % (l * this.tileScale.y) / this._height, v[2] = c / this._width * this.tileScale.x, v[3] = d / this._height * this.tileScale.y, i.shader.uniforms.uTransform = v, i.shader.uniforms.translationMatrix = this.worldTransform.toArray(!0);
                    var g = u;
                    n.utils.hex2rgb(this.tint, g), g[3] = this.worldAlpha, i.shader.uniforms.uColor = g, t.bindTexture(this._texture, 0), t.state.setBlendMode(this.blendMode), i.quad.draw();
                } }, i.prototype._renderCanvas = function (t) {
                    var e = this._texture;
                    if (e.baseTexture.hasLoaded) {
                        var r = t.context, i = this.worldTransform, s = t.resolution, o = e.baseTexture, h = this.tilePosition.x / this.tileScale.x % e._frame.width, u = this.tilePosition.y / this.tileScale.y % e._frame.height;
                        if (!this._canvasPattern) {
                            var l = new n.CanvasRenderTarget(e._frame.width, e._frame.height);
                            16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = a.getTintedTexture(this, this.tint)),
                                l.context.drawImage(this.tintedTexture, 0, 0)) : l.context.drawImage(o.source, -e._frame.x, -e._frame.y), this._canvasPattern = l.context.createPattern(l.canvas, "repeat");
                        }
                        r.globalAlpha = this.worldAlpha, r.setTransform(i.a * s, i.b * s, i.c * s, i.d * s, i.tx * s, i.ty * s), r.scale(this.tileScale.x, this.tileScale.y), r.translate(h + this.anchor.x * -this._width, u + this.anchor.y * -this._height);
                        var c = t.blendModes[this.blendMode];
                        c !== t.context.globalCompositeOperation && (r.globalCompositeOperation = c), r.fillStyle = this._canvasPattern, r.fillRect(-h, -u, this._width / this.tileScale.x, this._height / this.tileScale.y);
                    }
                }, i.prototype.getBounds = function () { var t, e, r, i, n = this._width, s = this._height, o = n * (1 - this.anchor.x), a = n * -this.anchor.x, h = s * (1 - this.anchor.y), u = s * -this.anchor.y, l = this.worldTransform, c = l.a, d = l.b, p = l.c, f = l.d, v = l.tx, g = l.ty, y = c * a + p * u + v, x = f * u + d * a + g, m = c * o + p * u + v, _ = f * u + d * o + g, b = c * o + p * h + v, T = f * h + d * o + g, E = c * a + p * h + v, w = f * h + d * a + g; t = y, t = m < t ? m : t, t = b < t ? b : t, t = E < t ? E : t, r = x, r = _ < r ? _ : r, r = T < r ? T : r, r = w < r ? w : r, e = y, e = m > e ? m : e, e = b > e ? b : e, e = E > e ? E : e, i = x, i = _ > i ? _ : i, i = T > i ? T : i, i = w > i ? w : i; var S = this._bounds; return S.x = t, S.width = e - t, S.y = r, S.height = i - r, this._currentBounds = S, S; }, i.prototype.containsPoint = function (t) { this.worldTransform.applyInverse(t, s); var e, r = this._width, i = this._height, n = -r * this.anchor.x; return s.x > n && s.x < n + r && (e = -i * this.anchor.y, s.y > e && s.y < e + i); }, i.prototype.destroy = function () { n.Sprite.prototype.destroy.call(this), this.tileScale = null, this._tileScaleOffset = null, this.tilePosition = null, this._uvs = null; }, i.from = function (t, e, r) { return new i(o.from(t), e, r); }, i.fromFrame = function (t, e, r) { var s = n.utils.TextureCache[t]; if (!s)
                    throw new Error('The frameId "' + t + '" does not exist in the texture cache ' + this); return new i(s, e, r); }, i.fromImage = function (t, e, r, s, o) { return new i(n.Texture.fromImage(t, s, o), e, r); };
            }, { "../core": 97, "../core/sprites/canvas/CanvasTinter": 135, "../core/textures/Texture": 144, "./webgl/TilingShader": 165 }], 161: [function (t, e, r) { var i = t("../core"), n = i.DisplayObject, s = new i.Matrix; n.prototype._cacheAsBitmap = !1, n.prototype._cacheData = !1; var o = function () { this.originalRenderWebGL = null, this.originalRenderCanvas = null, this.originalUpdateTransform = null, this.originalHitTest = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.sprite = null; }; Object.defineProperties(n.prototype, { cacheAsBitmap: { get: function () { return this._cacheAsBitmap; }, set: function (t) { if (this._cacheAsBitmap !== t) {
                        this._cacheAsBitmap = t;
                        var e;
                        t ? (this._cacheData || (this._cacheData = new o), e = this._cacheData, e.originalRenderWebGL = this.renderWebGL, e.originalRenderCanvas = this.renderCanvas, e.originalUpdateTransform = this.updateTransform, e.originalGetBounds = this.getBounds, e.originalDestroy = this.destroy, e.originalContainsPoint = this.containsPoint, e.originalMask = this._mask, e.originalFilterArea = this.filterArea, this.renderWebGL = this._renderCachedWebGL, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (e = this._cacheData, e.sprite && this._destroyCachedDisplayObject(), this.renderWebGL = e.originalRenderWebGL, this.renderCanvas = e.originalRenderCanvas, this.getBounds = e.originalGetBounds, this.destroy = e.originalDestroy, this.updateTransform = e.originalUpdateTransform, this.containsPoint = e.originalContainsPoint, this._mask = e.originalMask, this.filterArea = e.originalFilterArea);
                    } } } }), n.prototype._renderCachedWebGL = function (t) { !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite._transformID = -1, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderWebGL(t)); }, n.prototype._initCachedDisplayObject = function (t) { if (!this._cacheData || !this._cacheData.sprite) {
                t.currentRenderer.flush();
                var e = this.getLocalBounds().clone();
                if (this._filters) {
                    var r = this._filters[0].padding;
                    e.x -= r, e.y -= r, e.width += 2 * r, e.height += 2 * r;
                }
                var n = t._activeRenderTarget, o = t.filterManager.filterStack, a = i.RenderTexture.create(0 | e.width, 0 | e.height), h = s;
                h.tx = -e.x, h.ty = -e.y, this.transform.worldTransform.identity(), this.renderWebGL = this._cacheData.originalRenderWebGL, t.render(this, a, !0, h, !0), t.bindRenderTarget(n), t.filterManager.filterStack = o, this.renderWebGL = this._renderCachedWebGL, this.updateTransform = this.displayObjectUpdateTransform, this.getBounds = this._getCachedBounds, this._mask = null, this.filterArea = null;
                var u = new i.Sprite(a);
                u.transform.worldTransform = this.transform.worldTransform, u.anchor.x = -(e.x / e.width), u.anchor.y = -(e.y / e.height), this._cacheData.sprite = u, this.transform._parentID = -1, this.updateTransform(), this.containsPoint = u.containsPoint.bind(u);
            } }, n.prototype._renderCachedCanvas = function (t) { !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite.renderCanvas(t)); }, n.prototype._initCachedDisplayObjectCanvas = function (t) { if (!this._cacheData || !this._cacheData.sprite) {
                var e = this.getLocalBounds(), r = t.context, n = new i.RenderTexture.create(0 | e.width, 0 | e.height), o = s;
                this.transform.worldTransform.copy(o), o.invert(), o.tx -= e.x, o.ty -= e.y, this.renderCanvas = this._cacheData.originalRenderCanvas, t.render(this, n, !0, o, !1), t.context = r, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.getBounds = this._getCachedBounds, this._mask = null, this.filterArea = null;
                var a = new i.Sprite(n);
                a.transform.worldTransform = this.transform.worldTransform, a.anchor.x = -(e.x / e.width), a.anchor.y = -(e.y / e.height), this.updateTransform(), this._cacheData.sprite = a, this.containsPoint = a.containsPoint.bind(a);
            } }, n.prototype._getCachedBounds = function () { return this._cacheData.sprite._currentBounds = null, this._cacheData.sprite.getBounds(); }, n.prototype._destroyCachedDisplayObject = function () { this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null; }, n.prototype._cacheAsBitmapDestroy = function () { this.cacheAsBitmap = !1, this.destroy(); }; }, { "../core": 97 }], 162: [function (t, e, r) { var i = t("../core"); i.DisplayObject.prototype.name = null, i.Container.prototype.getChildByName = function (t) { for (var e = 0; e < this.children.length; e++)
                if (this.children[e].name === t)
                    return this.children[e]; return null; }; }, { "../core": 97 }], 163: [function (t, e, r) { var i = t("../core"); i.DisplayObject.prototype.getGlobalPosition = function (t) { return t = t || new i.Point, this.parent ? (this.displayObjectUpdateTransform(), t.x = this.worldTransform.tx, t.y = this.worldTransform.ty) : (t.x = this.position.x, t.y = this.position.y), t; }; }, { "../core": 97 }], 164: [function (t, e, r) { t("./cacheAsBitmap"), t("./getChildByName"), t("./getGlobalPosition"), e.exports = { MovieClip: t("./MovieClip"), TilingSprite: t("./TilingSprite"), BitmapText: t("./BitmapText") }; }, { "./BitmapText": 158, "./MovieClip": 159, "./TilingSprite": 160, "./cacheAsBitmap": 161, "./getChildByName": 162, "./getGlobalPosition": 163 }], 165: [function (t, e, r) { function i(t) { n.call(this, t, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\n\nuniform vec4 uFrame;\nuniform vec4 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vec2 coord = aTextureCoord;\n    coord -= uTransform.xy;\n    coord /= uTransform.zw;\n    vTextureCoord = coord;\n}\n", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform vec4 uFrame;\nuniform vec2 uPixelSize;\n\nvoid main(void)\n{\n\n   \tvec2 coord = mod(vTextureCoord, uFrame.zw);\n   \tcoord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);\n   \tcoord += uFrame.xy;\n\n   \tvec4 sample = texture2D(uSampler, coord);\n  \tvec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\n\n   \tgl_FragColor = sample * color ;\n}\n"); } var n = t("../../core/Shader"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i; }, { "../../core/Shader": 77 }], 166: [function (t, e, r) { function i(t, e, r) { n.Filter.call(this), this.blurXFilter = new s, this.blurYFilter = new o, this.resolution = 1, this.padding = 0, this.resolution = r || 1, this.quality = e || 4, this.blur = t || 8; } var n = t("../../core"), s = t("./BlurXFilter"), o = t("./BlurYFilter"); i.prototype = Object.create(n.Filter.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.apply = function (t, e, r) { var i = t.getRenderTarget(!0); this.blurXFilter.apply(t, e, i, !0), this.blurYFilter.apply(t, i, r, !1), t.returnRenderTarget(i); }, Object.defineProperties(i.prototype, { blur: { get: function () { return this.blurXFilter.blur; }, set: function (t) { this.blurXFilter.blur = this.blurYFilter.blur = t, this.padding = 2 * Math.max(Math.abs(this.blurYFilter.strength), Math.abs(this.blurYFilter.strength)); } }, quality: { get: function () { return this.blurXFilter.quality; }, set: function (t) { this.blurXFilter.quality = this.blurYFilter.quality = t; } }, blurX: { get: function () { return this.blurXFilter.blur; }, set: function (t) { this.blurXFilter.blur = t, this.padding = 2 * Math.max(Math.abs(this.blurYFilter.strength), Math.abs(this.blurYFilter.strength)); } }, blurY: { get: function () { return this.blurYFilter.blur; }, set: function (t) { this.blurYFilter.blur = t, this.padding = 2 * Math.max(Math.abs(this.blurYFilter.strength), Math.abs(this.blurYFilter.strength)); } } }); }, { "../../core": 97, "./BlurXFilter": 167, "./BlurYFilter": 168 }], 167: [function (t, e, r) { function i(t, e, r) { var i = s(5, !0), a = o(5); n.Filter.call(this, i, a), this.resolution = r || 1, this._quality = 0, this.quality = e || 4, this.strength = t || 8, this.firstRun = !0; } var n = t("../../core"), s = t("./generateBlurVertSource"), o = t("./generateBlurFragSource"), a = t("./getMaxBlurKernelSize"); i.prototype = Object.create(n.Filter.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.apply = function (t, e, r, i) { if (this.firstRun) {
                var n = t.renderer.gl, h = a(n);
                this.vertexSrc = s(h, !0), this.fragmentSrc = o(h), this.firstRun = !1;
            } if (this.uniforms.strength = 1 / r.size.width * (r.size.width / e.size.width), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes)
                t.applyFilter(this, e, r, i);
            else {
                for (var u = t.getRenderTarget(!0), l = e, c = u, d = 0; d < this.passes - 1; d++) {
                    t.applyFilter(this, l, c, !0);
                    var p = c;
                    c = l, l = p;
                }
                t.applyFilter(this, l, r, i), t.returnRenderTarget(u);
            } }, Object.defineProperties(i.prototype, { blur: { get: function () { return this.strength; }, set: function (t) { this.padding = 2 * Math.abs(t), this.strength = t; } }, quality: { get: function () { return this._quality; }, set: function (t) { this._quality = t, this.passes = t; } } }); }, { "../../core": 97, "./generateBlurFragSource": 169, "./generateBlurVertSource": 170, "./getMaxBlurKernelSize": 171 }], 168: [function (t, e, r) { function i(t, e, r) { var i = s(5, !1), a = o(5); n.Filter.call(this, i, a), this.resolution = r || 1, this._quality = 0, this.quality = e || 4, this.strength = t || 8, this.firstRun = !0; } var n = t("../../core"), s = t("./generateBlurVertSource"), o = t("./generateBlurFragSource"), a = t("./getMaxBlurKernelSize"); i.prototype = Object.create(n.Filter.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.apply = function (t, e, r, i) { if (this.firstRun) {
                var n = t.renderer.gl, h = a(n);
                this.vertexSrc = s(h, !1), this.fragmentSrc = o(h), this.firstRun = !1;
            } if (this.uniforms.strength = 1 / r.size.height * (r.size.height / e.size.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes)
                t.applyFilter(this, e, r, i);
            else {
                for (var u = t.getRenderTarget(!0), l = e, c = u, d = 0; d < this.passes - 1; d++) {
                    t.applyFilter(this, l, c, !0);
                    var p = c;
                    c = l, l = p;
                }
                t.applyFilter(this, l, r, i), t.returnRenderTarget(u);
            } }, Object.defineProperties(i.prototype, { blur: { get: function () { return this.strength; }, set: function (t) { this.padding = 2 * Math.abs(t), this.strength = t; } }, quality: { get: function () { return this._quality; }, set: function (t) { this._quality = t, this.passes = t; } } }); }, { "../../core": 97, "./generateBlurFragSource": 169, "./generateBlurVertSource": 170, "./getMaxBlurKernelSize": 171 }], 169: [function (t, e, r) { var i = { 5: [.153388, .221461, .250301], 7: [.071303, .131514, .189879, .214607], 9: [.028532, .067234, .124009, .179044, .20236], 11: [.0093, .028002, .065984, .121703, .175713, .198596], 13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641], 15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448] }, n = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "\tgl_FragColor = vec4(0.0);", "\t%blur%", "}"].join("\n"), s = function (t) { for (var e, r = i[t], s = r.length, o = n, a = "", h = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", u = 0; u < t; u++) {
                var l = h.replace("%index%", u);
                e = u, u >= s && (e = t - u - 1), l = l.replace("%value%", r[e]), a += l, a += "\n";
            } return o = o.replace("%blur%", a), o = o.replace("%size%", t); }; e.exports = s; }, {}], 170: [function (t, e, r) { var i = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float strength;", "uniform mat3 projectionMatrix;", "varying vec2 vBlurTexCoords[%size%];", "void main(void)", "{", "gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);", "%blur%", "}"].join("\n"), n = function (t, e) { var r, n, s = Math.ceil(t / 2), o = i, a = ""; r = e ? "vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);"; for (var h = 0; h < t; h++) {
                var u = r.replace("%index%", h);
                n = h, h >= s && (n = t - h - 1), u = u.replace("%sampleIndex%", h - (s - 1) + ".0"), a += u, a += "\n";
            } return o = o.replace("%blur%", a), o = o.replace("%size%", t); }; e.exports = n; }, {}], 171: [function (t, e, r) { var i = function (t) { for (var e = t.getParameter(t.MAX_VARYING_VECTORS), r = 15; r > e;)
                r -= 2; return r; }; e.exports = i; }, {}], 172: [function (t, e, r) { function i() { n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4] * c.a;\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9] * c.a;\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14] * c.a;\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19] * c.a;\n\n//    gl_FragColor = vec4(m[0]);\n}\n"), this.uniforms.m = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]; } var n = t("../../core"); i.prototype = Object.create(n.Filter.prototype), i.prototype.constructor = i, e.exports = i, i.prototype._loadMatrix = function (t, e) { e = !!e; var r = t; e && (this._multiply(r, this.uniforms.m, t), r = this._colorMatrix(r)), this.uniforms.m = r; }, i.prototype._multiply = function (t, e, r) { return t[0] = e[0] * r[0] + e[1] * r[5] + e[2] * r[10] + e[3] * r[15], t[1] = e[0] * r[1] + e[1] * r[6] + e[2] * r[11] + e[3] * r[16], t[2] = e[0] * r[2] + e[1] * r[7] + e[2] * r[12] + e[3] * r[17], t[3] = e[0] * r[3] + e[1] * r[8] + e[2] * r[13] + e[3] * r[18], t[4] = e[0] * r[4] + e[1] * r[9] + e[2] * r[14] + e[3] * r[19], t[5] = e[5] * r[0] + e[6] * r[5] + e[7] * r[10] + e[8] * r[15], t[6] = e[5] * r[1] + e[6] * r[6] + e[7] * r[11] + e[8] * r[16], t[7] = e[5] * r[2] + e[6] * r[7] + e[7] * r[12] + e[8] * r[17], t[8] = e[5] * r[3] + e[6] * r[8] + e[7] * r[13] + e[8] * r[18], t[9] = e[5] * r[4] + e[6] * r[9] + e[7] * r[14] + e[8] * r[19], t[10] = e[10] * r[0] + e[11] * r[5] + e[12] * r[10] + e[13] * r[15], t[11] = e[10] * r[1] + e[11] * r[6] + e[12] * r[11] + e[13] * r[16], t[12] = e[10] * r[2] + e[11] * r[7] + e[12] * r[12] + e[13] * r[17], t[13] = e[10] * r[3] + e[11] * r[8] + e[12] * r[13] + e[13] * r[18], t[14] = e[10] * r[4] + e[11] * r[9] + e[12] * r[14] + e[13] * r[19], t[15] = e[15] * r[0] + e[16] * r[5] + e[17] * r[10] + e[18] * r[15], t[16] = e[15] * r[1] + e[16] * r[6] + e[17] * r[11] + e[18] * r[16], t[17] = e[15] * r[2] + e[16] * r[7] + e[17] * r[12] + e[18] * r[17], t[18] = e[15] * r[3] + e[16] * r[8] + e[17] * r[13] + e[18] * r[18], t[19] = e[15] * r[4] + e[16] * r[9] + e[17] * r[14] + e[18] * r[19], t; }, i.prototype._colorMatrix = function (t) { var e = new Float32Array(t); return e[4] /= 255, e[9] /= 255, e[14] /= 255, e[19] /= 255, e; }, i.prototype.brightness = function (t, e) { var r = [t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(r, e); }, i.prototype.greyscale = function (t, e) { var r = [t, t, t, 0, 0, t, t, t, 0, 0, t, t, t, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(r, e); }, i.prototype.grayscale = i.prototype.greyscale, i.prototype.blackAndWhite = function (t) { var e = [.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.hue = function (t, e) { t = (t || 0) / 180 * Math.PI; var r = Math.cos(t), i = Math.sin(t), n = Math.sqrt, s = 1 / 3, o = n(s), a = r + (1 - r) * s, h = s * (1 - r) - o * i, u = s * (1 - r) + o * i, l = s * (1 - r) + o * i, c = r + s * (1 - r), d = s * (1 - r) - o * i, p = s * (1 - r) - o * i, f = s * (1 - r) + o * i, v = r + s * (1 - r), g = [a, h, u, 0, 0, l, c, d, 0, 0, p, f, v, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(g, e); }, i.prototype.contrast = function (t, e) { var r = (t || 0) + 1, i = -128 * (r - 1), n = [r, 0, 0, 0, i, 0, r, 0, 0, i, 0, 0, r, 0, i, 0, 0, 0, 1, 0]; this._loadMatrix(n, e); }, i.prototype.saturate = function (t, e) { var r = 2 * (t || 0) / 3 + 1, i = (r - 1) * -.5, n = [r, i, i, 0, 0, i, r, i, 0, 0, i, i, r, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(n, e); }, i.prototype.desaturate = function () { this.saturate(-1); }, i.prototype.negative = function (t) { var e = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.sepia = function (t) { var e = [.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.technicolor = function (t) { var e = [1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.polaroid = function (t) { var e = [1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.toBGR = function (t) { var e = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.kodachrome = function (t) { var e = [1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.browni = function (t) { var e = [.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.vintage = function (t) { var e = [.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.colorTone = function (t, e, r, i, n) { t = t || .2, e = e || .15, r = r || 16770432, i = i || 3375104; var s = (r >> 16 & 255) / 255, o = (r >> 8 & 255) / 255, a = (255 & r) / 255, h = (i >> 16 & 255) / 255, u = (i >> 8 & 255) / 255, l = (255 & i) / 255, c = [.3, .59, .11, 0, 0, s, o, a, t, 0, h, u, l, e, 0, s - h, o - u, a - l, 0, 0]; this._loadMatrix(c, n); }, i.prototype.night = function (t, e) { t = t || .1; var r = [t * -2, -t, 0, 0, 0, -t, 0, t, 0, 0, 0, t, 2 * t, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(r, e); }, i.prototype.predator = function (t, e) { var r = [11.224130630493164 * t, -4.794486999511719 * t, -2.8746118545532227 * t, 0 * t, .40342438220977783 * t, -3.6330697536468506 * t, 9.193157196044922 * t, -2.951810836791992 * t, 0 * t, -1.316135048866272 * t, -3.2184197902679443 * t, -4.2375030517578125 * t, 7.476448059082031 * t, 0 * t, .8044459223747253 * t, 0, 0, 0, 1, 0]; this._loadMatrix(r, e); }, i.prototype.lsd = function (t) { var e = [2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(e, t); }, i.prototype.reset = function () { var t = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]; this._loadMatrix(t, !1); }, Object.defineProperties(i.prototype, { matrix: { get: function () { return this.uniforms.m; }, set: function (t) { this.uniforms.m = t; } } }); }, { "../../core": 97 }], 173: [function (t, e, r) { function i(t, e) { var r = new n.Matrix; t.renderable = !1, n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"), this.maskSprite = t, this.maskMatrix = r, this.uniforms.mapSampler = t.texture, this.uniforms.filterMatrix = r.toArray(!0), this.uniforms.scale = { x: 1, y: 1 }, null !== e && void 0 !== e || (e = 20), this.scale = new n.Point(e, e); } var n = t("../../core"); i.prototype = Object.create(n.Filter.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.apply = function (t, e, r) { var i = 1 / r.destinationFrame.width * (r.size.width / e.size.width); this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x * i, this.uniforms.scale.y = this.scale.y * i, t.applyFilter(this, e, r); }, Object.defineProperties(i.prototype, { map: { get: function () { return this.uniforms.mapSampler; }, set: function (t) { this.uniforms.mapSampler = t; } } }); }, { "../../core": 97 }], 174: [function (t, e, r) { function i() { n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}", '#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n  \tvec2 fragCoord = vTextureCoord * filterArea.xy;\n\n  \tvec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n  \tgl_FragColor = color;\n}\n'); } var n = t("../../core"); i.prototype = Object.create(n.Filter.prototype), i.prototype.constructor = i, e.exports = i; }, { "../../core": 97 }], 175: [function (t, e, r) { e.exports = { FXAAFilter: t("./fxaa/FXAAFilter"), NoiseFilter: t("./noise/NoiseFilter"), DisplacementFilter: t("./displacement/DisplacementFilter"), BlurFilter: t("./blur/BlurFilter"), BlurXFilter: t("./blur/BlurXFilter"), BlurYFilter: t("./blur/BlurYFilter"), ColorMatrixFilter: t("./colormatrix/ColorMatrixFilter"), VoidFilter: t("./void/VoidFilter") }; }, { "./blur/BlurFilter": 166, "./blur/BlurXFilter": 167, "./blur/BlurYFilter": 168, "./colormatrix/ColorMatrixFilter": 172, "./displacement/DisplacementFilter": 173, "./fxaa/FXAAFilter": 174, "./noise/NoiseFilter": 176, "./void/VoidFilter": 177 }], 176: [function (t, e, r) { function i() { n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(gl_FragCoord.xy) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n"), this.noise = .5; } var n = t("../../core"); i.prototype = Object.create(n.Filter.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { noise: { get: function () { return this.uniforms.noise; }, set: function (t) { this.uniforms.noise = t; } } }); }, { "../../core": 97 }], 177: [function (t, e, r) { function i() { n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"), this.glShaderKey = "void"; } var n = t("../../core"); i.prototype = Object.create(n.Filter.prototype), i.prototype.constructor = i, e.exports = i; }, { "../../core": 97 }], 178: [function (t, e, r) { function i() { this.global = new n.Point, this.target = null, this.originalEvent = null; } var n = t("../core"); i.prototype.constructor = i, e.exports = i, i.prototype.getLocalPosition = function (t, e, r) { return t.worldTransform.applyInverse(r || this.global, e); }; }, { "../core": 97 }], 179: [function (t, e, r) {
                function i(t, e) { o.call(this), e = e || {}, this.renderer = t, this.autoPreventDefault = void 0 === e.autoPreventDefault || e.autoPreventDefault, this.interactionFrequency = e.interactionFrequency || 10, this.mouse = new s, this.mouse.global.set(-999999), this.eventData = { stopped: !1, target: null, type: null, data: this.mouse, stopPropagation: function () { this.stopped = !0; } }, this.interactiveDataPool = [], this.interactionDOMElement = null, this.moveWhenInside = !1, this.eventsAdded = !1, this.onMouseUp = this.onMouseUp.bind(this), this.processMouseUp = this.processMouseUp.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.processMouseDown = this.processMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.processMouseMove = this.processMouseMove.bind(this), this.onMouseOut = this.onMouseOut.bind(this), this.processMouseOverOut = this.processMouseOverOut.bind(this), this.onMouseOver = this.onMouseOver.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.processTouchStart = this.processTouchStart.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this), this.processTouchEnd = this.processTouchEnd.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.processTouchMove = this.processTouchMove.bind(this), this.defaultCursorStyle = "inherit", this.currentCursorStyle = "inherit", this._tempPoint = new n.Point, this.resolution = 1, this.setTargetElement(this.renderer.view, this.renderer.resolution); }
                var n = t("../core"), s = t("./InteractionData"), o = t("eventemitter3");
                Object.assign(n.DisplayObject.prototype, t("./interactiveTarget")), i.prototype = Object.create(o.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.setTargetElement = function (t, e) { this.removeEvents(), this.interactionDOMElement = t, this.resolution = e || 1, this.addEvents(); }, i.prototype.addEvents = function () {
                    this.interactionDOMElement && (n.ticker.shared.add(this.update, this),
                        window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "none", this.interactionDOMElement.style["-ms-touch-action"] = "none"), window.document.addEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onMouseOver, !0), this.interactionDOMElement.addEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.addEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.addEventListener("touchmove", this.onTouchMove, !0), window.addEventListener("mouseup", this.onMouseUp, !0), this.eventsAdded = !0);
                }, i.prototype.removeEvents = function () { this.interactionDOMElement && (n.ticker.shared.remove(this.update), window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = ""), window.document.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onMouseOver, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), this.interactionDOMElement = null, window.removeEventListener("mouseup", this.onMouseUp, !0), this.eventsAdded = !1); }, i.prototype.update = function (t) { if (this._deltaTime += t, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.interactionDOMElement)) {
                    if (this.didMove)
                        return void (this.didMove = !1);
                    this.cursor = this.defaultCursorStyle, this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !0), this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.interactionDOMElement.style.cursor = this.cursor);
                } }, i.prototype.dispatchEvent = function (t, e, r) { r.stopped || (r.target = t, r.type = e, t.emit(e, r), t[e] && t[e](r)); }, i.prototype.mapPositionToPoint = function (t, e, r) { var i; i = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 }, t.x = (e - i.left) * (this.interactionDOMElement.width / i.width) / this.resolution, t.y = (r - i.top) * (this.interactionDOMElement.height / i.height) / this.resolution; }, i.prototype.processInteractive = function (t, e, r, i, n) { if (!e || !e.visible)
                    return !1; var s = !1, o = n = e.interactive || n; if (e.hitArea && (o = !1), i && e._mask && (e._mask.containsPoint(t) || (i = !1)), i && e.filterArea && (e.filterArea.contains(t.x, t.y) || (i = !1)), e.interactiveChildren)
                    for (var a = e.children, h = a.length - 1; h >= 0; h--) {
                        var u = a[h];
                        if (this.processInteractive(t, u, r, i, o)) {
                            if (!u.parent)
                                continue;
                            s = !0, o = !1, i = !1;
                        }
                    } return n && (i && !s && (e.hitArea ? (e.worldTransform.applyInverse(t, this._tempPoint), s = e.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) : e.containsPoint && (s = e.containsPoint(t))), e.interactive && r(e, s)), s; }, i.prototype.onMouseDown = function (t) { this.mouse.originalEvent = t, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.autoPreventDefault && this.mouse.originalEvent.preventDefault(), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseDown, !0); var e = 2 === t.button || 3 === t.which; this.emit(e ? "rightdown" : "mousedown", this.eventData); }, i.prototype.processMouseDown = function (t, e) { var r = this.mouse.originalEvent, i = 2 === r.button || 3 === r.which; e && (t[i ? "_isRightDown" : "_isLeftDown"] = !0, this.dispatchEvent(t, i ? "rightdown" : "mousedown", this.eventData)); }, i.prototype.onMouseUp = function (t) { this.mouse.originalEvent = t, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseUp, !0); var e = 2 === t.button || 3 === t.which; this.emit(e ? "rightup" : "mouseup", this.eventData); }, i.prototype.processMouseUp = function (t, e) { var r = this.mouse.originalEvent, i = 2 === r.button || 3 === r.which, n = i ? "_isRightDown" : "_isLeftDown"; e ? (this.dispatchEvent(t, i ? "rightup" : "mouseup", this.eventData), t[n] && (t[n] = !1, this.dispatchEvent(t, i ? "rightclick" : "click", this.eventData))) : t[n] && (t[n] = !1, this.dispatchEvent(t, i ? "rightupoutside" : "mouseupoutside", this.eventData)); }, i.prototype.onMouseMove = function (t) { this.mouse.originalEvent = t, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.didMove = !0, this.cursor = this.defaultCursorStyle, this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseMove, !0), this.emit("mousemove", this.eventData), this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.interactionDOMElement.style.cursor = this.cursor); }, i.prototype.processMouseMove = function (t, e) { this.processMouseOverOut(t, e), this.moveWhenInside && !e || this.dispatchEvent(t, "mousemove", this.eventData); }, i.prototype.onMouseOut = function (t) { this.mouse.originalEvent = t, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.interactionDOMElement.style.cursor = this.defaultCursorStyle, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !1), this.emit("mouseout", this.eventData); }, i.prototype.processMouseOverOut = function (t, e) { e ? (t._over || (t._over = !0, this.dispatchEvent(t, "mouseover", this.eventData)), t.buttonMode && (this.cursor = t.defaultCursor)) : t._over && (t._over = !1, this.dispatchEvent(t, "mouseout", this.eventData)); }, i.prototype.onMouseOver = function (t) { this.mouse.originalEvent = t, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.emit("mouseover", this.eventData); }, i.prototype.onTouchStart = function (t) { this.autoPreventDefault && t.preventDefault(); for (var e = t.changedTouches, r = e.length, i = 0; i < r; i++) {
                    var n = e[i], s = this.getTouchData(n);
                    s.originalEvent = t, this.eventData.data = s, this.eventData.stopped = !1, this.processInteractive(s.global, this.renderer._lastObjectRendered, this.processTouchStart, !0), this.emit("touchstart", this.eventData), this.returnTouchData(s);
                } }, i.prototype.processTouchStart = function (t, e) { e && (t._touchDown = !0, this.dispatchEvent(t, "touchstart", this.eventData)); }, i.prototype.onTouchEnd = function (t) { this.autoPreventDefault && t.preventDefault(); for (var e = t.changedTouches, r = e.length, i = 0; i < r; i++) {
                    var n = e[i], s = this.getTouchData(n);
                    s.originalEvent = t, this.eventData.data = s, this.eventData.stopped = !1, this.processInteractive(s.global, this.renderer._lastObjectRendered, this.processTouchEnd, !0), this.emit("touchend", this.eventData), this.returnTouchData(s);
                } }, i.prototype.processTouchEnd = function (t, e) { e ? (this.dispatchEvent(t, "touchend", this.eventData), t._touchDown && (t._touchDown = !1, this.dispatchEvent(t, "tap", this.eventData))) : t._touchDown && (t._touchDown = !1, this.dispatchEvent(t, "touchendoutside", this.eventData)); }, i.prototype.onTouchMove = function (t) { this.autoPreventDefault && t.preventDefault(); for (var e = t.changedTouches, r = e.length, i = 0; i < r; i++) {
                    var n = e[i], s = this.getTouchData(n);
                    s.originalEvent = t, this.eventData.data = s, this.eventData.stopped = !1, this.processInteractive(s.global, this.renderer._lastObjectRendered, this.processTouchMove, this.moveWhenInside), this.emit("touchmove", this.eventData), this.returnTouchData(s);
                } }, i.prototype.processTouchMove = function (t, e) { this.moveWhenInside && !e || this.dispatchEvent(t, "touchmove", this.eventData); }, i.prototype.getTouchData = function (t) { var e = this.interactiveDataPool.pop(); return e || (e = new s), e.identifier = t.identifier, this.mapPositionToPoint(e.global, t.clientX, t.clientY), navigator.isCocoonJS && (e.global.x = e.global.x / this.resolution, e.global.y = e.global.y / this.resolution), t.globalX = e.global.x, t.globalY = e.global.y, e; }, i.prototype.returnTouchData = function (t) { this.interactiveDataPool.push(t); }, i.prototype.destroy = function () { this.removeEvents(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactiveDataPool = null, this.interactionDOMElement = null, this.onMouseUp = null, this.processMouseUp = null, this.onMouseDown = null, this.processMouseDown = null, this.onMouseMove = null, this.processMouseMove = null, this.onMouseOut = null, this.processMouseOverOut = null, this.onMouseOver = null, this.onTouchStart = null, this.processTouchStart = null, this.onTouchEnd = null, this.processTouchEnd = null, this.onTouchMove = null, this.processTouchMove = null, this._tempPoint = null; }, n.WebGLRenderer.registerPlugin("interaction", i), n.CanvasRenderer.registerPlugin("interaction", i);
            }, { "../core": 97, "./InteractionData": 178, "./interactiveTarget": 181, eventemitter3: 32 }], 180: [function (t, e, r) { e.exports = { InteractionData: t("./InteractionData"), InteractionManager: t("./InteractionManager"), interactiveTarget: t("./interactiveTarget") }; }, { "./InteractionData": 178, "./InteractionManager": 179, "./interactiveTarget": 181 }], 181: [function (t, e, r) { var i = { interactive: !1, interactiveChildren: !0, hitArea: null, buttonMode: !1, defaultCursor: "pointer", _over: !1, _isLeftDown: !1, _isRightDown: !1, _touchDown: !1 }; e.exports = i; }, {}], 182: [function (t, e, r) { function i(t, e) { var r = {}, i = t.data.getElementsByTagName("info")[0], n = t.data.getElementsByTagName("common")[0]; r.font = i.getAttribute("face"), r.size = parseInt(i.getAttribute("size"), 10), r.lineHeight = parseInt(n.getAttribute("lineHeight"), 10), r.chars = {}; for (var a = t.data.getElementsByTagName("char"), h = 0; h < a.length; h++) {
                var u = parseInt(a[h].getAttribute("id"), 10), l = new s.Rectangle(parseInt(a[h].getAttribute("x"), 10) + e.frame.x, parseInt(a[h].getAttribute("y"), 10) + e.frame.y, parseInt(a[h].getAttribute("width"), 10), parseInt(a[h].getAttribute("height"), 10));
                r.chars[u] = { xOffset: parseInt(a[h].getAttribute("xoffset"), 10), yOffset: parseInt(a[h].getAttribute("yoffset"), 10), xAdvance: parseInt(a[h].getAttribute("xadvance"), 10), kerning: {}, texture: new s.Texture(e.baseTexture, l) };
            } var c = t.data.getElementsByTagName("kerning"); for (h = 0; h < c.length; h++) {
                var d = parseInt(c[h].getAttribute("first"), 10), p = parseInt(c[h].getAttribute("second"), 10), f = parseInt(c[h].getAttribute("amount"), 10);
                r.chars[p] && (r.chars[p].kerning[d] = f);
            } t.bitmapFont = r, o.BitmapText.fonts[r.font] = r; } var n = t("resource-loader").Resource, s = t("../core"), o = t("../extras"), a = t("path"); e.exports = function () { return function (t, e) { if (!t.data || !t.isXml)
                return e(); if (0 === t.data.getElementsByTagName("page").length || 0 === t.data.getElementsByTagName("info").length || null === t.data.getElementsByTagName("info")[0].getAttribute("face"))
                return e(); var r = t.isDataUrl ? "" : a.dirname(t.url); t.isDataUrl && ("." === r && (r = ""), this.baseUrl && r && ("/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (r += "/"), r = r.replace(this.baseUrl, ""))), r && "/" !== r.charAt(r.length - 1) && (r += "/"); var o = r + t.data.getElementsByTagName("page")[0].getAttribute("file"); if (s.utils.TextureCache[o])
                i(t, s.utils.TextureCache[o]), e();
            else {
                var h = { crossOrigin: t.crossOrigin, loadType: n.LOAD_TYPE.IMAGE, metadata: t.metadata.imageMetadata };
                this.add(t.name + "_image", o, h, function (r) { i(t, r.texture), e(); });
            } }; }; }, { "../core": 97, "../extras": 164, path: 60, "resource-loader": 69 }], 183: [function (t, e, r) { e.exports = { Loader: t("./loader"), bitmapFontParser: t("./bitmapFontParser"), spritesheetParser: t("./spritesheetParser"), textureParser: t("./textureParser"), Resource: t("resource-loader").Resource }; }, { "./bitmapFontParser": 182, "./loader": 184, "./spritesheetParser": 185, "./textureParser": 186, "resource-loader": 69 }], 184: [function (t, e, r) { function i(t, e) { n.call(this, t, e); for (var r = 0; r < i._pixiMiddleware.length; ++r)
                this.use(i._pixiMiddleware[r]()); } var n = t("resource-loader"), s = t("./textureParser"), o = t("./spritesheetParser"), a = t("./bitmapFontParser"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i._pixiMiddleware = [n.middleware.parsing.blob, s, o, a], i.addPixiMiddleware = function (t) { i._pixiMiddleware.push(t); }; var h = n.Resource; h.setExtensionXhrType("fnt", h.XHR_RESPONSE_TYPE.DOCUMENT); }, { "./bitmapFontParser": 182, "./spritesheetParser": 185, "./textureParser": 186, "resource-loader": 69 }], 185: [function (t, e, r) { var i = t("resource-loader").Resource, n = t("path"), s = t("../core"), o = 1e3; e.exports = function () { return function (t, e) { var r, a = t.name + "_image"; if (!t.data || !t.isJson || !t.data.frames || this.resources[a])
                return e(); var h = { crossOrigin: t.crossOrigin, loadType: i.LOAD_TYPE.IMAGE, metadata: t.metadata.imageMetadata }; r = t.isDataUrl ? t.data.meta.image : n.dirname(t.url.replace(this.baseUrl, "")) + "/" + t.data.meta.image, this.add(a, r, h, function (r) { function i(e, i) { for (var n = e; n - e < i && n < l.length;) {
                var o = l[n], a = u[o].frame;
                if (a) {
                    var h = null, d = null, p = new s.Rectangle(0, 0, u[o].sourceSize.w / c, u[o].sourceSize.h / c);
                    h = u[o].rotated ? new s.Rectangle(a.x / c, a.y / c, a.h / c, a.w / c) : new s.Rectangle(a.x / c, a.y / c, a.w / c, a.h / c), u[o].trimmed && (d = new s.Rectangle(u[o].spriteSourceSize.x / c, u[o].spriteSourceSize.y / c, u[o].spriteSourceSize.w / c, u[o].spriteSourceSize.h / c)), t.textures[o] = new s.Texture(r.texture.baseTexture, h, p, d, u[o].rotated ? 2 : 0), s.utils.TextureCache[o] = t.textures[o];
                }
                n++;
            } } function n() { return d * o < l.length; } function a(t) { i(d * o, o), d++, setTimeout(t, 0); } function h() { a(function () { n() ? h() : e(); }); } t.textures = {}; var u = t.data.frames, l = Object.keys(u), c = s.utils.getResolutionOfUrl(t.url), d = 0; l.length <= o ? (i(0, o), e()) : h(); }); }; }; }, { "../core": 97, path: 60, "resource-loader": 69 }], 186: [function (t, e, r) { var i = t("../core"); e.exports = function () { return function (t, e) { if (t.data && t.isImage) {
                var r = new i.BaseTexture(t.data, null, i.utils.getResolutionOfUrl(t.url));
                r.imageUrl = t.url, t.texture = new i.Texture(r), i.utils.BaseTextureCache[t.url] = r, i.utils.TextureCache[t.url] = t.texture;
            } e(); }; }; }, { "../core": 97 }], 187: [function (t, e, r) { function i(t, e, r, s, o) { n.Container.call(this), this._texture = null, this.uvs = r || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.vertices = e || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]), this.indices = s || new Uint16Array([0, 1, 3, 2]), this.dirty = 0, this.indexDirty = 0, this.blendMode = n.BLEND_MODES.NORMAL, this.canvasPadding = 0, this.drawMode = o || i.DRAW_MODES.TRIANGLE_MESH, this.texture = t, this.shader = null, this.tintRgb = new Float32Array([1, 1, 1]), this._glDatas = []; } var n = t("../core"), s = t("pixi-gl-core"), o = t("./webgl/MeshShader"), a = new n.Point, h = new n.Polygon; i.prototype = Object.create(n.Container.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { texture: { get: function () { return this._texture; }, set: function (t) { this._texture !== t && (this._texture = t, t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this))); } }, tint: { get: function () { return n.utils.rgb2hex(this.tintRgb); }, set: function (t) { this.tintRgb = n.utils.hex2rgb(t, this.tintRgb); } } }), i.prototype._renderWebGL = function (t) { t.flush(); var e = t.gl, r = this._glDatas[t.CONTEXT_UID]; r || (r = { shader: new o(e), vertexBuffer: s.GLBuffer.createVertexBuffer(e, this.vertices, e.STREAM_DRAW), uvBuffer: s.GLBuffer.createVertexBuffer(e, this.uvs, e.STREAM_DRAW), indexBuffer: s.GLBuffer.createIndexBuffer(e, this.indices, e.STATIC_DRAW), vao: new s.VertexArrayObject(e), dirty: this.dirty, indexDirty: this.indexDirty }, r.vao = new s.VertexArrayObject(e).addIndex(r.indexBuffer).addAttribute(r.vertexBuffer, r.shader.attributes.aVertexPosition, e.FLOAT, !1, 8, 0).addAttribute(r.uvBuffer, r.shader.attributes.aTextureCoord, e.FLOAT, !1, 8, 0), this._glDatas[t.CONTEXT_UID] = r), this.dirty !== r.dirty && (r.dirty = this.dirty, r.uvBuffer.upload()), this.indexDirty !== r.indexDirty && (r.indexDirty = this.indexDirty, r.indexBuffer.upload()), r.vertexBuffer.upload(), t.bindShader(r.shader), t.bindTexture(this._texture, 0), t.state.setBlendMode(this.blendMode), r.shader.uniforms.translationMatrix = this.worldTransform.toArray(!0), r.shader.uniforms.alpha = this.worldAlpha, r.shader.uniforms.tint = this.tintRgb; var n = this.drawMode === i.DRAW_MODES.TRIANGLE_MESH ? e.TRIANGLE_STRIP : e.TRIANGLES; r.vao.bind().draw(n, this.indices.length).unbind(); }, i.prototype._renderCanvas = function (t) { var e = t.context, r = this.worldTransform, n = t.resolution; t.roundPixels ? e.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n | 0, r.ty * n | 0) : e.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n, r.ty * n), this.drawMode === i.DRAW_MODES.TRIANGLE_MESH ? this._renderCanvasTriangleMesh(e) : this._renderCanvasTriangles(e); }, i.prototype._renderCanvasTriangleMesh = function (t) { for (var e = this.vertices, r = this.uvs, i = e.length / 2, n = 0; n < i - 2; n++) {
                var s = 2 * n;
                this._renderCanvasDrawTriangle(t, e, r, s, s + 2, s + 4);
            } }, i.prototype._renderCanvasTriangles = function (t) { for (var e = this.vertices, r = this.uvs, i = this.indices, n = i.length, s = 0; s < n; s += 3) {
                var o = 2 * i[s], a = 2 * i[s + 1], h = 2 * i[s + 2];
                this._renderCanvasDrawTriangle(t, e, r, o, a, h);
            } }, i.prototype._renderCanvasDrawTriangle = function (t, e, r, i, n, s) { var o = this._texture.baseTexture, a = o.source, h = o.width, u = o.height, l = e[i], c = e[n], d = e[s], p = e[i + 1], f = e[n + 1], v = e[s + 1], g = r[i] * o.width, y = r[n] * o.width, x = r[s] * o.width, m = r[i + 1] * o.height, _ = r[n + 1] * o.height, b = r[s + 1] * o.height; if (this.canvasPadding > 0) {
                var T = this.canvasPadding / this.worldTransform.a, E = this.canvasPadding / this.worldTransform.d, w = (l + c + d) / 3, S = (p + f + v) / 3, A = l - w, M = p - S, R = Math.sqrt(A * A + M * M);
                l = w + A / R * (R + T), p = S + M / R * (R + E), A = c - w, M = f - S, R = Math.sqrt(A * A + M * M), c = w + A / R * (R + T), f = S + M / R * (R + E), A = d - w, M = v - S, R = Math.sqrt(A * A + M * M), d = w + A / R * (R + T), v = S + M / R * (R + E);
            } t.save(), t.beginPath(), t.moveTo(l, p), t.lineTo(c, f), t.lineTo(d, v), t.closePath(), t.clip(); var C = g * _ + m * x + y * b - _ * x - m * y - g * b, O = l * _ + m * d + c * b - _ * d - m * c - l * b, D = g * c + l * x + y * d - c * x - l * y - g * d, P = g * _ * d + m * c * x + l * y * b - l * _ * x - m * y * d - g * c * b, I = p * _ + m * v + f * b - _ * v - m * f - p * b, L = g * f + p * x + y * v - f * x - p * y - g * v, F = g * _ * v + m * f * x + p * y * b - p * _ * x - m * y * v - g * f * b; t.transform(O / C, I / C, D / C, L / C, P / C, F / C), t.drawImage(a, 0, 0, h * o.resolution, u * o.resolution, 0, 0, h, u), t.restore(); }, i.prototype.renderMeshFlat = function (t) { var e = this.context, r = t.vertices, i = r.length / 2; e.beginPath(); for (var n = 1; n < i - 2; n++) {
                var s = 2 * n, o = r[s], a = r[s + 2], h = r[s + 4], u = r[s + 1], l = r[s + 3], c = r[s + 5];
                e.moveTo(o, u), e.lineTo(a, l), e.lineTo(h, c);
            } e.fillStyle = "#FF0000", e.fill(), e.closePath(); }, i.prototype._onTextureUpdate = function () { }, i.prototype._calculateBounds = function () { this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length); }, i.prototype.containsPoint = function (t) { if (!this.getBounds().contains(t.x, t.y))
                return !1; this.worldTransform.applyInverse(t, a); for (var e = this.vertices, r = h.points, n = this.indices, s = this.indices.length, o = this.drawMode === i.DRAW_MODES.TRIANGLES ? 3 : 1, u = 0; u + 2 < s; u += o) {
                var l = 2 * n[u], c = 2 * n[u + 1], d = 2 * n[u + 2];
                if (r[0] = e[l], r[1] = e[l + 1], r[2] = e[c], r[3] = e[c + 1], r[4] = e[d], r[5] = e[d + 1], h.contains(a.x, a.y))
                    return !0;
            } return !1; }, i.DRAW_MODES = { TRIANGLE_MESH: 0, TRIANGLES: 1 }; }, { "../core": 97, "./webgl/MeshShader": 192, "pixi-gl-core": 7 }], 188: [function (t, e, r) { function i(t, e, r, i, o) { s.call(this, t, 4, 4); var a = this.uvs; a[6] = a[14] = a[22] = a[30] = 1, a[25] = a[27] = a[29] = a[31] = 1, this._origWidth = t.width, this._origHeight = t.height, this._uvw = 1 / this._origWidth, this._uvh = 1 / this._origHeight, this.width = t.width, this.height = t.height, a[2] = a[10] = a[18] = a[26] = this._uvw * e, a[4] = a[12] = a[20] = a[28] = 1 - this._uvw * i, a[9] = a[11] = a[13] = a[15] = this._uvh * r, a[17] = a[19] = a[21] = a[23] = 1 - this._uvh * o, this.leftWidth = "undefined" != typeof e ? e : n, this.rightWidth = "undefined" != typeof i ? i : n, this.topHeight = "undefined" != typeof r ? r : n, this.bottomHeight = "undefined" != typeof o ? o : n; } var n = 10, s = t("./Plane"); i.prototype = Object.create(s.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, { width: { get: function () { return this._width; }, set: function (t) { this._width = t, this.updateVerticalVertices(); } }, height: { get: function () { return this._height; }, set: function (t) { this._height = t, this.updateHorizontalVertices(); } }, leftWidth: { get: function () { return this._leftWidth; }, set: function (t) { this._leftWidth = t; var e = this.uvs, r = this.vertices; e[2] = e[10] = e[18] = e[26] = this._uvw * t, r[2] = r[10] = r[18] = r[26] = t, this.dirty = !0; } }, rightWidth: { get: function () { return this._rightWidth; }, set: function (t) { this._rightWidth = t; var e = this.uvs, r = this.vertices; e[4] = e[12] = e[20] = e[28] = 1 - this._uvw * t, r[4] = r[12] = r[20] = r[28] = this._width - t, this.dirty = !0; } }, topHeight: { get: function () { return this._topHeight; }, set: function (t) { this._topHeight = t; var e = this.uvs, r = this.vertices; e[9] = e[11] = e[13] = e[15] = this._uvh * t, r[9] = r[11] = r[13] = r[15] = t, this.dirty = !0; } }, bottomHeight: { get: function () { return this._bottomHeight; }, set: function (t) { this._bottomHeight = t; var e = this.uvs, r = this.vertices; e[17] = e[19] = e[21] = e[23] = 1 - this._uvh * t, r[17] = r[19] = r[21] = r[23] = this._height - t, this.dirty = !0; } } }), i.prototype.updateHorizontalVertices = function () { var t = this.vertices; t[9] = t[11] = t[13] = t[15] = this._topHeight, t[17] = t[19] = t[21] = t[23] = this._height - this._bottomHeight, t[25] = t[27] = t[29] = t[31] = this._height; }, i.prototype.updateVerticalVertices = function () { var t = this.vertices; t[2] = t[10] = t[18] = t[26] = this._leftWidth, t[4] = t[12] = t[20] = t[28] = this._width - this._rightWidth, t[6] = t[14] = t[22] = t[30] = this._width; }, i.prototype._renderCanvas = function (t) { var e = t.context; e.globalAlpha = this.worldAlpha; var r = this.worldTransform, i = t.resolution; t.roundPixels ? e.setTransform(r.a * i, r.b * i, r.c * i, r.d * i, r.tx * i | 0, r.ty * i | 0) : e.setTransform(r.a * i, r.b * i, r.c * i, r.d * i, r.tx * i, r.ty * i); var n = this._texture.baseTexture, s = n.source, o = n.width, a = n.height; this.drawSegment(e, s, o, a, 0, 1, 10, 11), this.drawSegment(e, s, o, a, 2, 3, 12, 13), this.drawSegment(e, s, o, a, 4, 5, 14, 15), this.drawSegment(e, s, o, a, 8, 9, 18, 19), this.drawSegment(e, s, o, a, 10, 11, 20, 21), this.drawSegment(e, s, o, a, 12, 13, 22, 23), this.drawSegment(e, s, o, a, 16, 17, 26, 27), this.drawSegment(e, s, o, a, 18, 19, 28, 29), this.drawSegment(e, s, o, a, 20, 21, 30, 31); }, i.prototype.drawSegment = function (t, e, r, i, n, s, o, a) { var h = this.uvs, u = this.vertices, l = (h[o] - h[n]) * r, c = (h[a] - h[s]) * i, d = u[o] - u[n], p = u[a] - u[s]; l < 1 && (l = 1), c < 1 && (c = 1), d < 1 && (d = 1), p < 1 && (p = 1), t.drawImage(e, h[n] * r, h[s] * i, l, c, u[n], u[s], d, p); }; }, { "./Plane": 189 }], 189: [function (t, e, r) { function i(t, e, r) { n.call(this, t), this._ready = !0, this.verticesX = e || 10, this.verticesY = r || 10, this.drawMode = n.DRAW_MODES.TRIANGLES, this.refresh(); } var n = t("./Mesh"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.refresh = function () { var t = this.verticesX * this.verticesY, e = [], r = [], i = [], n = [], s = this.texture, o = this.verticesX - 1, a = this.verticesY - 1, h = 0, u = s.width / o, l = s.height / a; for (h = 0; h < t; h++) {
                var c = h % this.verticesX, d = h / this.verticesX | 0;
                e.push(c * u, d * l), i.push(s._uvs.x0 + (s._uvs.x1 - s._uvs.x0) * (c / (this.verticesX - 1)), s._uvs.y0 + (s._uvs.y3 - s._uvs.y0) * (d / (this.verticesY - 1)));
            } var p = o * a; for (h = 0; h < p; h++) {
                var f = h % o, v = h / o | 0, g = v * this.verticesX + f, y = v * this.verticesX + f + 1, x = (v + 1) * this.verticesX + f, m = (v + 1) * this.verticesX + f + 1;
                n.push(g, y, x), n.push(y, m, x);
            } this.vertices = new Float32Array(e), this.uvs = new Float32Array(i), this.colors = new Float32Array(r), this.indices = new Uint16Array(n), this.indexDirty = !0; }, i.prototype._onTextureUpdate = function () { n.prototype._onTextureUpdate.call(this), this._ready && this.refresh(); }; }, { "./Mesh": 187 }], 190: [function (t, e, r) { function i(t, e) { n.call(this, t), this.points = e, this.vertices = new Float32Array(4 * e.length), this.uvs = new Float32Array(4 * e.length), this.colors = new Float32Array(2 * e.length), this.indices = new Uint16Array(2 * e.length), this._ready = !0, this.refresh(); } var n = t("./Mesh"), s = t("../core"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.refresh = function () { var t = this.points; if (!(t.length < 1) && this._texture._uvs) {
                var e = this.uvs, r = this.indices, i = this.colors, n = this._texture._uvs, o = new s.Point(n.x0, n.y0), a = new s.Point(n.x2 - n.x0, n.y2 - n.y0);
                e[0] = 0 + o.x, e[1] = 0 + o.y, e[2] = 0 + o.x, e[3] = 1 * a.y + o.y, i[0] = 1, i[1] = 1, r[0] = 0, r[1] = 1;
                for (var h, u, l, c = t.length, d = 1; d < c; d++)
                    h = t[d], u = 4 * d, l = d / (c - 1), e[u] = l * a.x + o.x, e[u + 1] = 0 + o.y, e[u + 2] = l * a.x + o.x, e[u + 3] = 1 * a.y + o.y, u = 2 * d, i[u] = 1, i[u + 1] = 1, u = 2 * d, r[u] = u, r[u + 1] = u + 1;
                this.dirty = !0, this.indexDirty = !0;
            } }, i.prototype._onTextureUpdate = function () { n.prototype._onTextureUpdate.call(this), this._ready && this.refresh(); }, i.prototype.updateTransform = function () { var t = this.points; if (!(t.length < 1)) {
                for (var e, r, i, n, s, o, a = t[0], h = 0, u = 0, l = this.vertices, c = t.length, d = 0; d < c; d++)
                    r = t[d], i = 4 * d, e = d < t.length - 1 ? t[d + 1] : r, u = -(e.x - a.x), h = e.y - a.y, n = 10 * (1 - d / (c - 1)), n > 1 && (n = 1), s = Math.sqrt(h * h + u * u), o = this._texture.height / 2, h /= s, u /= s, h *= o, u *= o, l[i] = r.x + h, l[i + 1] = r.y + u, l[i + 2] = r.x - h, l[i + 3] = r.y - u, a = r;
                this.containerUpdateTransform();
            } }; }, { "../core": 97, "./Mesh": 187 }], 191: [function (t, e, r) { e.exports = { Mesh: t("./Mesh"), Plane: t("./Plane"), NineSlicePlane: t("./NineSlicePlane"), Rope: t("./Rope"), MeshShader: t("./webgl/MeshShader") }; }, { "./Mesh": 187, "./NineSlicePlane": 188, "./Plane": 189, "./Rope": 190, "./webgl/MeshShader": 192 }], 192: [function (t, e, r) { function i(t) { n.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "uniform float alpha;", "uniform vec3 tint;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(tint * alpha, alpha);", "}"].join("\n")); } var n = t("../../core/Shader"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i; }, { "../../core/Shader": 77 }], 193: [function (t, e, r) { function i(t, e, r) { n.Container.call(this), r = r || 15e3, t = t || 15e3; var i = 16384; r > i && (r = i), r > t && (r = t), this._properties = [!1, !0, !1, !1, !1], this._maxSize = t, this._batchSize = r, this._glBuffers = [], this._bufferToUpdate = 0, this.interactiveChildren = !1, this.blendMode = n.BLEND_MODES.NORMAL, this.roundPixels = !0, this.baseTexture = null, this.setProperties(e); } var n = t("../core"); i.prototype = Object.create(n.Container.prototype), i.prototype.constructor = i, e.exports = i, i.prototype.setProperties = function (t) { t && (this._properties[0] = "scale" in t ? !!t.scale : this._properties[0], this._properties[1] = "position" in t ? !!t.position : this._properties[1], this._properties[2] = "rotation" in t ? !!t.rotation : this._properties[2], this._properties[3] = "uvs" in t ? !!t.uvs : this._properties[3], this._properties[4] = "alpha" in t ? !!t.alpha : this._properties[4]); }, i.prototype.updateTransform = function () { this.displayObjectUpdateTransform(); }, i.prototype.renderWebGL = function (t) { this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.hasLoaded || this.baseTexture.once("update", function () { this.onChildrenChange(0); }, this)), t.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this)); }, i.prototype.onChildrenChange = function (t) { var e = Math.floor(t / this._batchSize); e < this._bufferToUpdate && (this._bufferToUpdate = e); }, i.prototype.renderCanvas = function (t) { if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
                var e = t.context, r = this.worldTransform, i = !0, n = 0, s = 0, o = 0, a = 0, h = t.blendModes[this.blendMode];
                h !== e.globalCompositeOperation && (e.globalCompositeOperation = h), e.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
                for (var u = 0; u < this.children.length; ++u) {
                    var l = this.children[u];
                    if (l.visible) {
                        var c = l.texture.frame;
                        if (e.globalAlpha = this.worldAlpha * l.alpha, l.rotation % (2 * Math.PI) === 0)
                            i && (e.setTransform(r.a, r.b, r.c, r.d, r.tx * t.resolution, r.ty * t.resolution), i = !1), n = l.anchor.x * (-c.width * l.scale.x) + l.position.x + .5, s = l.anchor.y * (-c.height * l.scale.y) + l.position.y + .5, o = c.width * l.scale.x, a = c.height * l.scale.y;
                        else {
                            i || (i = !0), l.displayObjectUpdateTransform();
                            var d = l.worldTransform;
                            t.roundPixels ? e.setTransform(d.a, d.b, d.c, d.d, d.tx * t.resolution | 0, d.ty * t.resolution | 0) : e.setTransform(d.a, d.b, d.c, d.d, d.tx * t.resolution, d.ty * t.resolution), n = l.anchor.x * -c.width + .5, s = l.anchor.y * -c.height + .5, o = c.width, a = c.height;
                        }
                        var p = l.texture.baseTexture.resolution;
                        e.drawImage(l.texture.baseTexture.source, c.x * p, c.y * p, c.width * p, c.height * p, n * p, s * p, o * p, a * p);
                    }
                }
            } }, i.prototype.destroy = function () { if (n.Container.prototype.destroy.apply(this, arguments), this._buffers)
                for (var t = 0; t < this._buffers.length; ++t)
                    this._buffers[t].destroy(); this._properties = null, this._buffers = null; }; }, { "../core": 97 }], 194: [function (t, e, r) { e.exports = { ParticleContainer: t("./ParticleContainer"), ParticleRenderer: t("./webgl/ParticleRenderer") }; }, { "./ParticleContainer": 193, "./webgl/ParticleRenderer": 196 }], 195: [function (t, e, r) { function i(t, e, r, i) { this.gl = t, this.vertSize = 2, this.vertByteSize = 4 * this.vertSize, this.size = i, this.dynamicProperties = [], this.staticProperties = []; for (var n = 0; n < e.length; n++) {
                var s = e[n];
                s = { attribute: s.attribute, size: s.size, uploadFunction: s.uploadFunction, offset: s.offset }, r[n] ? this.dynamicProperties.push(s) : this.staticProperties.push(s);
            } this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.initBuffers(); } var n = t("pixi-gl-core"), s = t("../../core/utils/createIndicesForQuads"); i.prototype.constructor = i, e.exports = i, i.prototype.initBuffers = function () { var t, e, r = this.gl, i = 0; for (this.indices = s(this.size), this.indexBuffer = n.GLBuffer.createIndexBuffer(r, this.indices, r.STATIC_DRAW), this.dynamicStride = 0, t = 0; t < this.dynamicProperties.length; t++)
                e = this.dynamicProperties[t], e.offset = i, i += e.size, this.dynamicStride += e.size; this.dynamicData = new Float32Array(this.size * this.dynamicStride * 4), this.dynamicBuffer = n.GLBuffer.createVertexBuffer(r, this.dynamicData, r.STREAM_DRAW); var o = 0; for (this.staticStride = 0, t = 0; t < this.staticProperties.length; t++)
                e = this.staticProperties[t], e.offset = o, o += e.size, this.staticStride += e.size; for (this.staticData = new Float32Array(this.size * this.staticStride * 4), this.staticBuffer = n.GLBuffer.createVertexBuffer(r, this.staticData, r.STATIC_DRAW), this.vao = new n.VertexArrayObject(r).addIndex(this.indexBuffer), t = 0; t < this.dynamicProperties.length; t++)
                e = this.dynamicProperties[t], this.vao.addAttribute(this.dynamicBuffer, e.attribute, r.FLOAT, !1, 4 * this.dynamicStride, 4 * e.offset); for (t = 0; t < this.staticProperties.length; t++)
                e = this.staticProperties[t], this.vao.addAttribute(this.staticBuffer, e.attribute, r.FLOAT, !1, 4 * this.staticStride, 4 * e.offset); }, i.prototype.uploadDynamic = function (t, e, r) { for (var i = 0; i < this.dynamicProperties.length; i++) {
                var n = this.dynamicProperties[i];
                n.uploadFunction(t, e, r, this.dynamicData, this.dynamicStride, n.offset);
            } this.dynamicBuffer.upload(); }, i.prototype.uploadStatic = function (t, e, r) { for (var i = 0; i < this.staticProperties.length; i++) {
                var n = this.staticProperties[i];
                n.uploadFunction(t, e, r, this.staticData, this.staticStride, n.offset);
            } this.staticBuffer.upload(); }, i.prototype.bind = function () { this.vao.bind(); }, i.prototype.destroy = function () { this.dynamicProperties = null, this.dynamicData = null, this.dynamicBuffer.destroy(), this.staticProperties = null, this.staticData = null, this.staticBuffer.destroy(); }; }, { "../../core/utils/createIndicesForQuads": 149, "pixi-gl-core": 7 }], 196: [function (t, e, r) {
                function i(t) { n.ObjectRenderer.call(this, t), this.shader = null, this.indexBuffer = null, this.properties = null, this.tempMatrix = new n.Matrix, this.CONTEXT_UID = 0; }
                var n = t("../../core"), s = t("./ParticleShader"), o = t("./ParticleBuffer");
                i.prototype = Object.create(n.ObjectRenderer.prototype), i.prototype.constructor = i, e.exports = i, n.WebGLRenderer.registerPlugin("particle", i), i.prototype.onContextChange = function () { var t = this.renderer.gl; this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.shader = new s(t), this.properties = [{ attribute: this.shader.attributes.aVertexPosition, size: 2, uploadFunction: this.uploadVertices, offset: 0 }, { attribute: this.shader.attributes.aPositionCoord, size: 2, uploadFunction: this.uploadPosition, offset: 0 }, { attribute: this.shader.attributes.aRotation, size: 1, uploadFunction: this.uploadRotation, offset: 0 }, { attribute: this.shader.attributes.aTextureCoord, size: 2, uploadFunction: this.uploadUvs, offset: 0 }, { attribute: this.shader.attributes.aColor, size: 1, uploadFunction: this.uploadAlpha, offset: 0 }]; }, i.prototype.start = function () { this.renderer.bindShader(this.shader); }, i.prototype.render = function (t) {
                    var e = t.children, r = e.length, i = t._maxSize, n = t._batchSize;
                    if (0 !== r) {
                        r > i && (r = i);
                        var s = t._glBuffers[this.renderer.CONTEXT_UID];
                        s || (s = t._glBuffers[this.renderer.CONTEXT_UID] = this.generateBuffers(t)), this.renderer.setBlendMode(t.blendMode);
                        var o = this.renderer.gl, a = t.worldTransform.copy(this.tempMatrix);
                        a.prepend(this.renderer._activeRenderTarget.projectionMatrix), this.shader.uniforms.projectionMatrix = a.toArray(!0), this.shader.uniforms.uAlpha = t.worldAlpha;
                        var h = e[0]._texture.baseTexture;
                        this.renderer.bindTexture(h);
                        for (var u = 0, l = 0; u < r; u += n, l += 1) {
                            var c = r - u;
                            c > n && (c = n);
                            var d = s[l];
                            d.uploadDynamic(e, u, c), t._bufferToUpdate === l && (d.uploadStatic(e, u, c), t._bufferToUpdate = l + 1), d.vao.bind().draw(o.TRIANGLES, 6 * c).unbind();
                        }
                    }
                }, i.prototype.generateBuffers = function (t) { var e, r = this.renderer.gl, i = [], n = t._maxSize, s = t._batchSize, a = t._properties; for (e = 0; e < n; e += s)
                    i.push(new o(r, this.properties, a, s)); return i; }, i.prototype.uploadVertices = function (t, e, r, i, n, s) { for (var o, a, h, u, l, c, d, p, f, v, g = 0; g < r; g++)
                    o = t[e + g], a = o._texture, l = o.scale.x, c = o.scale.y, h = a.trim, u = a.orig, h ? (p = h.x - o.anchor.x * u.width, d = p + h.width, v = h.y - o.anchor.y * u.height, f = v + h.height) : (d = u.width * (1 - o.anchor.x), p = u.width * -o.anchor.x, f = u.height * (1 - o.anchor.y), v = u.height * -o.anchor.y), i[s] = p * l, i[s + 1] = v * c, i[s + n] = d * l, i[s + n + 1] = v * c, i[s + 2 * n] = d * l, i[s + 2 * n + 1] = f * c, i[s + 3 * n] = p * l, i[s + 3 * n + 1] = f * c, s += 4 * n; }, i.prototype.uploadPosition = function (t, e, r, i, n, s) { for (var o = 0; o < r; o++) {
                    var a = t[e + o].position;
                    i[s] = a.x, i[s + 1] = a.y, i[s + n] = a.x, i[s + n + 1] = a.y, i[s + 2 * n] = a.x, i[s + 2 * n + 1] = a.y, i[s + 3 * n] = a.x, i[s + 3 * n + 1] = a.y, s += 4 * n;
                } }, i.prototype.uploadRotation = function (t, e, r, i, n, s) { for (var o = 0; o < r; o++) {
                    var a = t[e + o].rotation;
                    i[s] = a, i[s + n] = a, i[s + 2 * n] = a, i[s + 3 * n] = a, s += 4 * n;
                } }, i.prototype.uploadUvs = function (t, e, r, i, n, s) { for (var o = 0; o < r; o++) {
                    var a = t[e + o]._texture._uvs;
                    a ? (i[s] = a.x0, i[s + 1] = a.y0, i[s + n] = a.x1, i[s + n + 1] = a.y1, i[s + 2 * n] = a.x2, i[s + 2 * n + 1] = a.y2, i[s + 3 * n] = a.x3, i[s + 3 * n + 1] = a.y3, s += 4 * n) : (i[s] = 0, i[s + 1] = 0, i[s + n] = 0, i[s + n + 1] = 0, i[s + 2 * n] = 0, i[s + 2 * n + 1] = 0, i[s + 3 * n] = 0, i[s + 3 * n + 1] = 0, s += 4 * n);
                } }, i.prototype.uploadAlpha = function (t, e, r, i, n, s) { for (var o = 0; o < r; o++) {
                    var a = t[e + o].alpha;
                    i[s] = a, i[s + n] = a, i[s + 2 * n] = a, i[s + 3 * n] = a, s += 4 * n;
                } }, i.prototype.destroy = function () { this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer), n.ObjectRenderer.prototype.destroy.apply(this, arguments), this.shader.destroy(), this.indices = null, this.tempMatrix = null; };
            }, { "../../core": 97, "./ParticleBuffer": 195, "./ParticleShader": 197 }], 197: [function (t, e, r) { function i(t) { n.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "uniform float uAlpha;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;", "  if (color.a == 0.0) discard;", "  gl_FragColor = color;", "}"].join("\n")); } var n = t("../../core/Shader"); i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i; }, { "../../core/Shader": 77 }], 198: [function (t, e, r) { Math.sign || (Math.sign = function (t) { return t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1; }); }, {}], 199: [function (t, e, r) { Object.assign || (Object.assign = t("object-assign")); }, { "object-assign": 59 }], 200: [function (t, e, r) { t("./Object.assign"), t("./requestAnimationFrame"), t("./Math.sign"), window.ArrayBuffer || (window.ArrayBuffer = Array), window.Float32Array || (window.Float32Array = Array), window.Uint32Array || (window.Uint32Array = Array), window.Uint16Array || (window.Uint16Array = Array); }, { "./Math.sign": 198, "./Object.assign": 199, "./requestAnimationFrame": 201 }], 201: [function (t, e, r) { (function (t) { if (Date.now && Date.prototype.getTime || (Date.now = function () { return (new Date).getTime(); }), !t.performance || !t.performance.now) {
                var e = Date.now();
                t.performance || (t.performance = {}), t.performance.now = function () { return Date.now() - e; };
            } for (var r = Date.now(), i = ["ms", "moz", "webkit", "o"], n = 0; n < i.length && !t.requestAnimationFrame; ++n)
                t.requestAnimationFrame = t[i[n] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[i[n] + "CancelAnimationFrame"] || t[i[n] + "CancelRequestAnimationFrame"]; t.requestAnimationFrame || (t.requestAnimationFrame = function (t) { if ("function" != typeof t)
                throw new TypeError(t + "is not a function"); var e = Date.now(), i = 16 + r - e; return i < 0 && (i = 0), r = e, setTimeout(function () { r = Date.now(), t(performance.now()); }, i); }), t.cancelAnimationFrame || (t.cancelAnimationFrame = function (t) { clearTimeout(t); }); }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}); }, {}], 202: [function (t, e, r) { function i() { } var n = t("../../core"); i.prototype.constructor = i, e.exports = i, i.prototype.upload = function (t, e) { "function" == typeof t && (e = t, t = null), e(); }, i.prototype.register = function () { return this; }, i.prototype.add = function () { return this; }, i.prototype.destroy = function () { }, n.CanvasRenderer.registerPlugin("prepare", i); }, { "../../core": 97 }], 203: [function (t, e, r) { e.exports = { webGL: t("./webgl/WebGLPrepare"), canvas: t("./canvas/CanvasPrepare") }; }, { "./canvas/CanvasPrepare": 202, "./webgl/WebGLPrepare": 204 }], 204: [function (t, e, r) { function i(t) { this.renderer = t, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.register(o, n).register(a, s); } function n(t, e) { return e instanceof h.BaseTexture && (t.textureManager.updateTexture(e), !0); } function s(t, e) { return e instanceof h.Graphics && (t.plugins.graphics.updateGraphics(e), !0); } function o(t, e) { if (t instanceof h.BaseTexture)
                return e.indexOf(t) === -1 && e.push(t), !0; if (t._texture && t._texture instanceof h.Texture) {
                var r = t._texture.baseTexture;
                return e.indexOf(r) === -1 && e.push(r), !0;
            } return !1; } function a(t, e) { return t instanceof h.Graphics && (e.push(t), !0); } var h = t("../../core"), u = h.ticker.shared; i.UPLOADS_PER_FRAME = 4, i.prototype.constructor = i, e.exports = i, i.prototype.upload = function (t, e) { "function" == typeof t && (e = t, t = null), t && this.add(t), this.queue.length ? (this.numLeft = i.UPLOADS_PER_FRAME, this.completes.push(e), this.ticking || (this.ticking = !0, u.add(this.tick, this))) : e(); }, i.prototype.tick = function () { for (var t, e; this.queue.length && this.numLeft > 0;) {
                var r = this.queue[0], n = !1;
                for (t = 0, e = this.uploadHooks.length; t < e; t++)
                    if (this.uploadHooks[t](this.renderer, r)) {
                        this.numLeft--, this.queue.shift(), n = !0;
                        break;
                    }
                n || this.queue.shift();
            } if (this.queue.length)
                this.numLeft = i.UPLOADS_PER_FRAME;
            else {
                this.ticking = !1, u.remove(this.tick, this);
                var s = this.completes.slice(0);
                for (this.completes.length = 0, t = 0, e = s.length; t < e; t++)
                    s[t]();
            } }, i.prototype.register = function (t, e) { return t && this.addHooks.push(t), e && this.uploadHooks.push(e), this; }, i.prototype.add = function (t) { var e, r; for (e = 0, r = this.addHooks.length; e < r && !this.addHooks[e](t, this.queue); e++)
                ; if (t instanceof h.Container)
                for (e = t.children.length - 1; e >= 0; e--)
                    this.add(t.children[e]); return this; }, i.prototype.destroy = function () { this.ticking && u.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null; }, h.WebGLRenderer.registerPlugin("prepare", i); }, { "../../core": 97 }], 205: [function (t, e, r) { (function (r) { t("./polyfill"); var i = e.exports = t("./core"); i.extras = t("./extras"), i.filters = t("./filters"), i.interaction = t("./interaction"), i.loaders = t("./loaders"), i.mesh = t("./mesh"), i.particles = t("./particles"), i.accessibility = t("./accessibility"), i.extract = t("./extract"), i.prepare = t("./prepare"), i.loader = new i.loaders.Loader, r.PIXI = i; }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}); }, { "./accessibility": 76, "./core": 97, "./deprecation": 154, "./extract": 156, "./extras": 164, "./filters": 175, "./interaction": 180, "./loaders": 183, "./mesh": 191, "./particles": 194, "./polyfill": 200, "./prepare": 203 }] }, {}, [205])(205);
});
//# sourceMappingURL=pixi.min.js.map
var PhysicsType2d;
(function (PhysicsType2d) {
    var BitFlag = (function () {
        function BitFlag(initial) { if (initial) {
            this.m_flags = initial;
        }
        else {
            this.m_flags = 0;
        } }
        BitFlag.prototype.Set = function (flag) { this.m_flags = this.m_flags | flag; };
        BitFlag.prototype.Clear = function (flag) { this.m_flags = this.m_flags & (~flag); };
        BitFlag.prototype.IsSet = function (desiredFlags) { return (this.m_flags & desiredFlags) == desiredFlags; };
        return BitFlag;
    })();
    PhysicsType2d.BitFlag = BitFlag;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var Utils = (function () {
        function Utils() { }
        Utils.log = function (format) {
            var optionalArgs = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                optionalArgs[_i] = arguments[_i + 1];
            }
            optionalArgs.unshift(format);
            console.log.apply(console, optionalArgs);
        };
        Utils.AllocateArray = function (size, create) {
            var array = [];
            for (var i = 0; i < size; i++) {
                array[i] = create();
            }
            return array;
        };
        return Utils;
    })();
    PhysicsType2d.Utils = Utils;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    "use strict";
    var MathExtensions = (function () {
        function MathExtensions() { }
        MathExtensions.IsValid = function (x) { return !isNaN(x) && isFinite(x); };
        MathExtensions.InvSqrt = function (num) { var x = num; var convert = {}; convert.x = x; var xhalf = 0.5 * x; convert.i = 0x5f3759df - (convert.i >> 1); x = convert.x; x = x * (1.5 - xhalf * x * x); return x; };
        MathExtensions.Cross2x1 = function (a, s) { return new PhysicsType2d.Vector2(s * a.y, -s * a.x); };
        MathExtensions.Cross1x2 = function (s, a) { return new PhysicsType2d.Vector2(-s * a.y, s * a.x); };
        MathExtensions.Cross2x2 = function (a, b) { return a.Cross(b); };
        MathExtensions.Dot = function (a, b) { return a.Dot(b); };
        MathExtensions.NextPowerOfTwo = function (num) { var x = num; x |= (x >> 1); x |= (x >> 2); x |= (x >> 4); x |= (x >> 8); x |= (x >> 16); return x + 1; };
        MathExtensions.IsPowerOfTwo = function (x) { var result = x > 0 && (x & (x - 1)) === 0; return result; };
        MathExtensions.Clamp = function (a, low, high) { return Math.max(low, Math.min(a, high)); };
        MathExtensions.UInt8 = function (x) { return MathExtensions.Clamp(Math.floor(x), 0, 2 ^ 8); };
        MathExtensions.UInt16 = function (x) { return MathExtensions.Clamp(Math.floor(x), 0, 2 ^ 16); };
        return MathExtensions;
    })();
    PhysicsType2d.MathExtensions = MathExtensions;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    "use strict";
    function Assert(result, message) { if (!result) {
        if (message && 0 < message.length) {
            throw message;
        }
        else {
            throw "Assert Failed";
        }
    } }
    PhysicsType2d.Assert = Assert;
    var Constants = (function () {
        function Constants() { }
        Constants.MAX_FLOAT = Number.MAX_VALUE;
        Constants.EPSILON = Number.MIN_VALUE * 10;
        Constants.PI = Math.PI;
        return Constants;
    })();
    PhysicsType2d.Constants = Constants;
    var Settings = (function () {
        function Settings() { }
        Settings.isDebug = true;
        Settings.maxManifoldPoints = 2;
        Settings.maxPolygonVertices = 8;
        Settings.aabbExtension = 0.1;
        Settings.aabbMultiplier = 2.0;
        Settings.linearSlop = 0.005;
        Settings.angularSlop = (2.0 / 180.0 * Constants.PI);
        Settings.polygonRadius = (2.0 * Settings.linearSlop);
        Settings.maxSubSteps = 8;
        Settings.maxTOIContacts = 32;
        Settings.velocityThreshold = 1.0;
        Settings.maxLinearCorrection = 0.2;
        Settings.maxAngularCorrection = (8.0 / 180.0 * Constants.PI);
        Settings.maxTranslation = 2.0;
        Settings.maxTranslationSquared = (Settings.maxTranslation * Settings.maxTranslation);
        Settings.maxRotation = (0.5 * Constants.PI);
        Settings.maxRotationSquared = (Settings.maxRotation * Settings.maxRotation);
        Settings.baumgarte = 0.2;
        Settings.toiBaugarte = 0.75;
        Settings.timeToSleep = 0.5;
        Settings.linearSleepTolerance = 0.01;
        Settings.angularSleepTolerance = (2.0 / 180.0 * Constants.PI);
        return Settings;
    })();
    PhysicsType2d.Settings = Settings;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var Rotation = (function () {
        function Rotation() { }
        Rotation.prototype.Clone = function () { var clone = new Rotation(); clone.S = this.S; clone.C = this.C; return clone; };
        Rotation.FromRadians = function (angleInRadians) { var r = new Rotation(); r.Set(angleInRadians); return r; };
        Rotation.prototype.Set = function (angleInRadians) { this.S = Math.sin(angleInRadians); this.C = Math.cos(angleInRadians); };
        Rotation.prototype.SetIdentity = function () { this.S = 0.0; this.C = 1.0; };
        Rotation.prototype.GetAngle = function () { return Math.atan2(this.S, this.C); };
        Rotation.prototype.GetXAxis = function () { return new PhysicsType2d.Vector2(this.C, this.S); };
        Rotation.prototype.GetYAxis = function () { return new PhysicsType2d.Vector2(-this.S, this.C); };
        Rotation.prototype.Multiply = function (r) { var qr = new Rotation(); qr.S = this.S * r.C + this.C * r.S; qr.C = this.C * r.C - this.S * r.S; return qr; };
        Rotation.prototype.MultiplyTranspose = function (r) { var qr = new Rotation(); qr.S = this.C * r.S - this.S * r.C; qr.C = this.C * r.C + this.S * r.S; return qr; };
        Rotation.prototype.ApplyToVector2 = function (v) { return new PhysicsType2d.Vector2(this.C * v.x - this.S * v.y, this.S * v.x + this.C * v.y); };
        Rotation.prototype.ApplyTransposeToVector2 = function (v) { return new PhysicsType2d.Vector2(this.C * v.x + this.S * v.y, -this.S * v.x + this.C * v.y); };
        return Rotation;
    })();
    PhysicsType2d.Rotation = Rotation;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var Transform = (function () {
        function Transform() { this.q = new PhysicsType2d.Rotation(); this.p = new PhysicsType2d.Vector2(0, 0); }
        Transform.prototype.Clone = function () { var clone = new Transform(); clone.p = this.p.Clone(); clone.q = this.q.Clone(); return clone; };
        Transform.prototype.Initialize = function (position, rotation) { this.p = position; this.q = rotation; };
        Transform.prototype.SetIdentity = function () { this.p.SetZero(); this.q.SetIdentity(); };
        Transform.prototype.Set = function (position, angle) { this.p = position; this.q.Set(angle); };
        Transform.prototype.Multiply = function (B) { var C = new Transform(); C.q = this.q.Multiply(B.q); C.p = this.q.ApplyToVector2(B.p).Add(this.p); return C; };
        Transform.prototype.MultiplyTranspose = function (B) { var C = new Transform(); C.q = this.q.MultiplyTranspose(B.q); C.p = this.q.ApplyTransposeToVector2(B.p.Subtract(this.p)); return C; };
        Transform.prototype.ApplyToVector2 = function (v) { var x = (this.q.C * v.x - this.q.S * v.y) + this.p.x; var y = (this.q.S * v.x + this.q.C * v.y) + this.p.y; return new PhysicsType2d.Vector2(x, y); };
        Transform.prototype.ApplyTransposeToVector2 = function (v) { var px = v.x - this.p.x; var py = v.y - this.p.y; var x = (this.q.C * px + this.q.S * py); var y = (-this.q.S * px + this.q.C * py); return new PhysicsType2d.Vector2(x, y); };
        return Transform;
    })();
    PhysicsType2d.Transform = Transform;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    "use strict";
    var Vector2 = (function () {
        function Vector2(x, y) { this.x = (x); this.y = (y); }
        Vector2.Zero = function () { return new Vector2(0, 0); };
        Vector2.prototype.AngleBetween = function (v2) { var perpDot = this.x * v2.y - this.y * v2.x; return Math.atan2(perpDot, this.Dot(v2)); };
        Vector2.prototype.Clone = function () { return new Vector2(this.x, this.y); };
        Vector2.prototype.IsValid = function () { return PhysicsType2d.MathExtensions.IsValid(this.x) && PhysicsType2d.MathExtensions.IsValid(this.y); };
        Vector2.prototype.Skew = function () { return new Vector2(-this.y, this.x); };
        Vector2.prototype.SetZero = function () { this.x = 0.0; this.y = 0.0; };
        Vector2.prototype.Set = function (x, y) { this.x = (x); this.y = (y); };
        Vector2.prototype.Negative = function () { return new Vector2(-this.x, -this.y); };
        Vector2.prototype.GetIndex = function (index) { switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new RangeException();
        } };
        Vector2.prototype.SetIndex = function (index, value) { switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            default: throw new RangeException();
        } };
        Vector2.prototype.Add = function (v) { return new Vector2(this.x + v.x, this.y + v.y); };
        Vector2.prototype.Subtract = function (v) { return new Vector2(this.x - v.x, this.y - v.y); };
        Vector2.prototype.Multiply = function (a) { return new Vector2(this.x * a, this.y * a); };
        Vector2.prototype.Equals = function (v) { return this.x === v.x && this.y === v.y; };
        Vector2.prototype.Length = function () { return Math.sqrt(this.x * this.x + this.y * this.y); };
        Vector2.prototype.LengthSquared = function () { return this.x * this.x + this.y * this.y; };
        Vector2.prototype.Normalize = function () {
            var length = this.Length();
            if (length < PhysicsType2d.Constants.EPSILON) {
                return 0.0;
            }
            var invLength = 1.0 / length;
            this.x *= invLength;
            this.y *= invLength;
            return length;
        };
        Vector2.prototype.Dot = function (b) { return (this.x * b.x + this.y * b.y); };
        Vector2.prototype.Cross = function (b) { return (this.x * b.y - this.y * b.x); };
        Vector2.prototype.Rotate = function (q) { return new Vector2(q.C * this.x - q.S * this.y, q.S * this.x + q.C * this.y); };
        Vector2.prototype.RotateTranspose = function (q) { return new Vector2(q.C * this.x + q.S * this.y, -q.S * this.x + q.C * this.y); };
        Vector2.prototype.DistanceFrom = function (b) { var c = this.Subtract(b); return c.Length(); };
        Vector2.prototype.DistanceFromSquared = function (b) { var c = this.Subtract(b); return c.LengthSquared(); };
        Vector2.prototype.Transform = function (T) { var x = (T.q.C * this.x - T.q.S * this.y) + T.p.x; var y = (T.q.S * this.x + T.q.C * this.y) + T.p.y; return new Vector2(x, y); };
        Vector2.prototype.TransformTranspose = function (T) { var px = this.x - T.p.x; var py = this.y - T.p.y; var x = (T.q.C * px + T.q.S * py); var y = (-T.q.S * px + T.q.C * py); return new Vector2(x, y); };
        Vector2.prototype.Abs = function () { return new Vector2(Math.abs(this.x), Math.abs(this.y)); };
        Vector2.prototype.Clamp = function (low, high) { return Vector2.Max(low, Vector2.Min(this, high)); };
        Vector2.Min = function (a, b) { return new Vector2(Math.min(a.x, b.x), Math.min(a.y, b.y)); };
        Vector2.Max = function (a, b) { return new Vector2(Math.max(a.x, b.x), Math.max(a.y, b.y)); };
        Vector2.DistanceBetween = function (a, b) { return (new Vector2(a.x, a.y)).DistanceFrom(b); };
        Vector2.FromPoint = function (pt) { return new Vector2(pt.x, pt.y); };
        Vector2.prototype.toString = function () { return "{" + this.x.toPrecision(6) + ", " + this.y.toPrecision(6) + "}"; };
        return Vector2;
    })();
    PhysicsType2d.Vector2 = Vector2;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) { (function (DrawFlags) { DrawFlags[DrawFlags["SHAPE"] = 0x0001] = "SHAPE"; DrawFlags[DrawFlags["JOINT"] = 0x0002] = "JOINT"; DrawFlags[DrawFlags["AABB"] = 0x0004] = "AABB"; DrawFlags[DrawFlags["PAIR"] = 0x0008] = "PAIR"; DrawFlags[DrawFlags["CENTER_OF_MASS"] = 0x0010] = "CENTER_OF_MASS"; })(PhysicsType2d.DrawFlags || (PhysicsType2d.DrawFlags = {})); var DrawFlags = PhysicsType2d.DrawFlags; })(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var Node = (function () {
        function Node(value) { this.Data = value; this.Next = null; this.Previous = null; }
        Node.prototype.InsertBefore = function (targetNode) {
            var old = targetNode.Previous;
            if (old) {
                old.Next = this;
            }
            this.Previous = old;
            targetNode.Previous = this;
            this.Next = targetNode;
        };
        Node.prototype.InsertAfter = function (targetNode) {
            var old = targetNode.Next;
            if (old) {
                old.Previous = this;
            }
            this.Next = old;
            targetNode.Next = this;
            this.Previous = targetNode;
        };
        return Node;
    })();
    var LinkedList = (function () {
        function LinkedList() { this._head = null; this._count = 0; }
        LinkedList.prototype.Add = function (value) {
            var node = new Node(value);
            if (null != this._head) {
                node.InsertBefore(this._head);
            }
            this._head = node;
            this._count++;
        };
        LinkedList.prototype.RemoveTop = function () { var data = this._head.Data; this._head = this._head.Next; this._count--; return data; };
        LinkedList.prototype.Remove = function (data) {
            if (this._head) {
                if (this._head.Data == data) {
                    this._head = this._head.Next;
                    if (this._head) {
                        this._head.Previous = null;
                    }
                    this._count--;
                    return true;
                }
                var node = this._head.Next;
                while (node) {
                    if (node.Data == data) {
                        node.Previous.Next = node.Next;
                        if (node.Next) {
                            node.Next.Previous = node.Previous;
                        }
                        this._count--;
                        return true;
                    }
                    node = node.Next;
                }
            }
            return false;
        };
        LinkedList.prototype.DeleteCurrent = function (iterator) {
            var iter = iterator;
            var currentNode = iter.GetCurrentNode();
            if (currentNode == this._head) {
                this._head = currentNode.Next;
                if (this._head) {
                    this._head.Previous = null;
                }
            }
            else {
                currentNode.Previous.Next = currentNode.Next;
                if (currentNode.Next) {
                    currentNode.Next.Previous = currentNode.Previous;
                }
            }
            this._count--;
        };
        LinkedList.prototype.Count = function () { return this._count; };
        LinkedList.prototype.GetIterator = function () { return new ListIterator(this._head); };
        return LinkedList;
    })();
    PhysicsType2d.LinkedList = LinkedList;
    var ListIterator = (function () {
        function ListIterator(head) { this._head = head; this._started = false; this._current = null; }
        ListIterator.prototype.GetCurrentNode = function () { PhysicsType2d.Assert(this._started); PhysicsType2d.Assert(null != this._current); return this._current; };
        ListIterator.prototype.Reset = function () { this._started = false; this._current = null; };
        ListIterator.prototype.Current = function () { return this._current.Data; };
        ListIterator.prototype.SetCurrent = function (value) { this._current.Data = value; };
        ListIterator.prototype.MoveNext = function () {
            if (!this._started) {
                this._started = true;
                this._current = this._head;
                return this._current != null;
            }
            else if (this._current) {
                this._current = this._current.Next;
                return this._current != null;
            }
            return false;
        };
        ListIterator.prototype.MovePrevious = function () {
            if (this._current) {
                this._current = this._current.Previous;
                return this._current != null;
            }
            return false;
        };
        return ListIterator;
    })();
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var Matrix2x2 = (function () {
        function Matrix2x2() { this.EX = new PhysicsType2d.Vector2(0, 0); this.EY = new PhysicsType2d.Vector2(0, 0); }
        Matrix2x2.FromColumns = function (c1, c2) { var m = new Matrix2x2(); m.Set(c1, c2); return m; };
        Matrix2x2.FromScalars = function (a11, a12, a21, a22) { var m = new Matrix2x2(); m.EX.Set(a11, a21); m.EY.Set(a12, a22); return m; };
        Matrix2x2.prototype.Set = function (c1, c2) { this.EX = c1; this.EY = c2; };
        Matrix2x2.prototype.SetIdentity = function () { this.EX.Set(1.0, 0.0); this.EY.Set(0.0, 1.0); };
        Matrix2x2.prototype.SetZero = function () { this.EX.SetZero(); this.EY.SetZero(); };
        Matrix2x2.prototype.GetInverse = function () {
            var a = this.EX.x;
            var b = this.EY.x;
            var c = this.EX.y;
            var d = this.EY.y;
            var inverse = new Matrix2x2();
            var det = a * d - b * c;
            if (det != 0.0) {
                det = 1.0 / det;
            }
            inverse.EX.Set(det * d, -det * c);
            inverse.EY.Set(-det * b, det * a);
            return inverse;
        };
        Matrix2x2.prototype.Solve = function (b) {
            var a11 = this.EX.x;
            var a12 = this.EY.x;
            var a21 = this.EX.y;
            var a22 = this.EY.y;
            var det = a11 * a22 - a12 * a21;
            if (det != 0.0) {
                det = 1.0 / det;
            }
            var solution = new PhysicsType2d.Vector2(det * (a22 * b.x - a12 * b.y), det * (a11 * b.y - a21 * b.x));
            return solution;
        };
        Matrix2x2.prototype.VectorMultiply = function (v) { return new PhysicsType2d.Vector2(this.EX.x * v.x + this.EY.x * v.y, this.EX.y * v.x + this.EY.y * v.y); };
        Matrix2x2.prototype.VectorMultiplyTranspose = function (v) { return new PhysicsType2d.Vector2(v.Dot(this.EX), v.Dot(this.EY)); };
        Matrix2x2.prototype.Add = function (B) { return Matrix2x2.FromColumns(this.EX.Add(B.EX), this.EY.Add(B.EY)); };
        Matrix2x2.prototype.Multiply = function (B) { return Matrix2x2.FromColumns(this.VectorMultiply(B.EX), this.VectorMultiply(B.EY)); };
        Matrix2x2.prototype.MultiplyTranspose = function (B) { var c1 = new PhysicsType2d.Vector2(this.EX.Dot(B.EX), this.EY.Dot(B.EX)); var c2 = new PhysicsType2d.Vector2(this.EX.Dot(B.EY), this.EY.Dot(B.EY)); return Matrix2x2.FromColumns(c1, c2); };
        Matrix2x2.prototype.Abs = function () { return Matrix2x2.FromColumns(this.EX.Abs(), this.EY.Abs()); };
        return Matrix2x2;
    })();
    PhysicsType2d.Matrix2x2 = Matrix2x2;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var Vector3 = (function () {
        function Vector3(x, y, z) { this.x = (x); this.y = (y); this.z = (z); }
        Vector3.prototype.SetZero = function () { this.x = 0.0; this.y = 0.0; this.z = 0.0; };
        Vector3.prototype.Set = function (x, y, z) { this.x = (x); this.y = (y); this.z = (z); };
        Vector3.prototype.Negative = function () { return new Vector3(-this.x, -this.y, -this.z); };
        Vector3.prototype.Add = function (v) { return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z); };
        Vector3.prototype.Subtract = function (v) { return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z); };
        Vector3.prototype.Multiply = function (a) { return new Vector3(this.x * a, this.y * a, this.z * a); };
        Vector3.prototype.Dot = function (b) { return (this.x * b.x + this.y * b.y + this.z * b.z); };
        Vector3.prototype.Cross = function (b) { return new Vector3(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x); };
        Vector3.prototype.Abs = function () { return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z)); };
        return Vector3;
    })();
    PhysicsType2d.Vector3 = Vector3;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var Matrix3x3 = (function () {
        function Matrix3x3() { this.EX = new PhysicsType2d.Vector3(0, 0, 0); this.EY = new PhysicsType2d.Vector3(0, 0, 0); this.EZ = new PhysicsType2d.Vector3(0, 0, 0); }
        Matrix3x3.prototype.FromColumns = function (c1, c2, c3) { this.EX = c1; this.EY = c2; this.EZ = c3; };
        Matrix3x3.prototype.SetZero = function () { this.EX.SetZero(); this.EY.SetZero(); this.EZ.SetZero(); };
        Matrix3x3.prototype.Solve3x3 = function (b) {
            var det = this.EX.Dot(this.EY.Cross(this.EZ));
            if (det != 0.0) {
                det = 1.0 / det;
            }
            var x = new PhysicsType2d.Vector3(det * b.Dot(this.EY.Cross(this.EZ)), det * this.EX.Dot(b.Cross(this.EZ)), det * this.EX.Dot(this.EY.Cross(b)));
            return x;
        };
        Matrix3x3.prototype.Solve2x2 = function (b) {
            var a11 = this.EX.x;
            var a12 = this.EY.x;
            var a21 = this.EX.y;
            var a22 = this.EY.y;
            var det = a11 * a22 - a12 * a21;
            if (det != 0.0) {
                det = 1.0 / det;
            }
            var x = det * (a22 * b.x - a12 * b.y);
            var y = det * (a11 * b.y - a21 * b.x);
            return new PhysicsType2d.Vector2(x, y);
        };
        Matrix3x3.prototype.GetInverse22 = function () {
            var a = this.EX.x;
            var b = this.EY.x;
            var c = this.EX.y;
            var d = this.EY.y;
            var det = a * d - b * c;
            if (det != 0.0) {
                det = 1.0 / det;
            }
            var M = new Matrix3x3();
            M.EX.Set(det * d, -det * c, 0.0);
            M.EY.Set(-det * b, det * a, 0.0);
            M.EZ.Set(0.0, 0.0, 0.0);
            return M;
        };
        Matrix3x3.prototype.GetSymInverse33 = function () {
            var det = this.EX.Dot(this.EY.Cross(this.EZ));
            if (det != 0.0) {
                det = 1.0 / det;
            }
            var a11 = this.EX.x;
            var a12 = this.EY.x;
            var a13 = this.EZ.x;
            var a22 = this.EY.y;
            var a23 = this.EZ.y;
            var a33 = this.EZ.z;
            var M = new Matrix3x3();
            M.EX.Set(det * (a22 * a33 - a23 * a23), det * (a13 * a23 - a12 * a33), det * (a12 * a23 - a13 * a22));
            M.EY.Set(M.EX.y, det * (a11 * a33 - a13 * a13), det * (a13 * a12 - a11 * a23));
            M.EZ.Set(M.EX.z, M.EY.z, det * (a11 * a22 - a12 * a12));
            return M;
        };
        Matrix3x3.prototype.Vector3Multiply = function (v) { return this.EX.Multiply(v.x).Add(this.EY.Multiply(v.y)).Add(this.EZ.Multiply(v.z)); };
        Matrix3x3.prototype.Vector2Multiply = function (v) { return new PhysicsType2d.Vector2(this.EX.x * v.x + this.EY.x * v.y, this.EX.y * v.x + this.EY.y * v.y); };
        return Matrix3x3;
    })();
    PhysicsType2d.Matrix3x3 = Matrix3x3;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var RopeDefinition = (function () {
        function RopeDefinition() { this.gravity = new PhysicsType2d.Vector2(0, 0); this.vertices = []; this.masses = []; this.damping = 0.1; this.k2 = 0.9; this.k3 = 0.1; }
        RopeDefinition.prototype.VertexCount = function () {
            if (this.vertices) {
                return this.vertices.length;
            }
            return 0;
        };
        return RopeDefinition;
    })();
    PhysicsType2d.RopeDefinition = RopeDefinition;
    var Rope = (function () {
        function Rope() { this._gravity = new PhysicsType2d.Vector2(0, 0); this._ps = []; this._p0s = []; this._vs = []; this._ims = []; this._Ls = []; this._as = []; this._k2 = 1.0; this._k3 = 0.1; }
        Rope.prototype.Initialize = function (def) {
            PhysicsType2d.Assert(def.VertexCount() >= 3, "Must have at least 3 vertices");
            var count = def.VertexCount();
            this._ps = new Array(count);
            this._p0s = new Array(count);
            this._vs = new Array(count);
            this._ims = new Array(count);
            var i = 0;
            for (i = 0; i < count; i++) {
                this._ps[i] = def.vertices[i];
                this._p0s[i] = def.vertices[i];
                this._vs[i] = new PhysicsType2d.Vector2(0, 0);
                var m = def.masses[i];
                if (m > 0.0) {
                    this._ims[i] = 1.0 / m;
                }
                else {
                    this._ims[i] = 0.0;
                }
            }
            var count2 = count - 1;
            var count3 = count - 2;
            this._Ls = new Array(count2);
            this._as = new Array(count3);
            for (i = 0; i < count2; i++) {
                var p1 = this._ps[i];
                var p2 = this._ps[i + 1];
                this._Ls[i] = p1.DistanceFrom(p2);
            }
            for (i = 0; i < count3; i++) {
                var p1 = this._ps[i];
                var p2 = this._ps[i + 1];
                var p3 = this._ps[i + 2];
                var d1 = p2.Subtract(p1);
                var d2 = p3.Subtract(p2);
                var a = d1.Cross(d2);
                var b = d1.Dot(d2);
                this._as[i] = Math.atan2(a, b);
            }
            this._gravity = def.gravity;
            this._damping = def.damping;
            this._k2 = def.k2;
            this._k3 = def.k3;
        };
        Rope.prototype.Step = function (h, iterations) {
            if (h === 0.0) {
                return;
            }
            var d = Math.exp(-h * this._damping);
            var i = 0;
            for (i = 0; i < this._ps.length; i++) {
                this._p0s[i] = this._ps[i];
                if (this._ims[i] > 0.0) {
                    this._vs[i] = this._vs[i].Add(this._gravity.Multiply(h));
                }
                this._vs[i] = this._vs[i].Multiply(d);
                this._ps[i] = this._ps[i].Add(this._vs[i].Multiply(h));
            }
            for (i = 0; i < iterations; i++) {
                this.SolveC2();
                this.SolveC3();
                this.SolveC2();
            }
            var inv_h = 1.0 / h;
            for (i = 0; i < this._ps.length; i++) {
                this._vs[i] = (this._ps[i].Subtract(this._p0s[i])).Multiply(inv_h);
            }
        };
        Rope.prototype.GetVertexCount = function () { return this._ps.length; };
        Rope.prototype.GetVertices = function () { return this._ps; };
        Rope.prototype.Draw = function (draw, c) { for (var i = 0; i < this._ps.length - 1; i++) {
            draw.DrawSegment(this._ps[i], this._ps[i + 1], c);
        } };
        Rope.prototype.SetAngle = function (angle) { var count3 = this._as.length - 2; for (var i = 0; i < count3; i++) {
            this._as[i] = angle;
        } };
        Rope.prototype.SolveC2 = function () {
            var count2 = this._ps.length - 1;
            for (var i = 0; i < count2; i++) {
                var p1 = this._ps[i];
                var p2 = this._ps[i + 1];
                var d = p2.Subtract(p1);
                var L = d.Normalize();
                var im1 = this._ims[i];
                var im2 = this._ims[i + 1];
                if ((im1 + im2) === 0.0) {
                    continue;
                }
                var s1 = im1 / (im1 + im2);
                var s2 = im2 / (im1 + im2);
                p1 = p1.Subtract(d.Multiply(this._k2 * s1 * (this._Ls[i] - L)));
                p2 = p2.Add(d.Multiply(this._k2 * s2 * (this._Ls[i] - L)));
                this._ps[i] = p1;
                this._ps[i + 1] = p2;
            }
        };
        Rope.prototype.SolveC3 = function () {
            var count3 = this._ps.length - 2;
            for (var i = 0; i < count3; ++i) {
                var p1 = this._ps[i];
                var p2 = this._ps[i + 1];
                var p3 = this._ps[i + 2];
                var m1 = this._ims[i];
                var m2 = this._ims[i + 1];
                var m3 = this._ims[i + 2];
                var d1 = p2.Subtract(p1);
                var d2 = p3.Subtract(p2);
                var L1sqr = d1.LengthSquared();
                var L2sqr = d2.LengthSquared();
                if (L1sqr * L2sqr == 0.0) {
                    continue;
                }
                var a = d1.Cross(d2);
                var b = d1.Dot(d2);
                var angle = Math.atan2(a, b);
                var Jd1 = (d1.Skew()).Multiply(-1.0 / L1sqr);
                var Jd2 = (d2.Skew()).Multiply(1.0 / L2sqr);
                var J1 = Jd1.Negative();
                var J2 = Jd1.Subtract(Jd2);
                var J3 = Jd2;
                var mass = m1 * J1.Dot(J1) + m2 * J2.Dot(J2) + m3 * J3.Dot(J3);
                if (mass === 0.0) {
                    continue;
                }
                mass = 1.0 / mass;
                var C = angle - this._as[i];
                while (C > PhysicsType2d.Constants.PI) {
                    angle -= 2 * PhysicsType2d.Constants.PI;
                    C = angle - this._as[i];
                }
                while (C < -PhysicsType2d.Constants.PI) {
                    angle += 2.0 * PhysicsType2d.Constants.PI;
                    C = angle - this._as[i];
                }
                var impulse = -this._k3 * mass * C;
                p1 = p1.Add(J1.Multiply(m1 * impulse));
                p2 = p2.Add(J2.Multiply(m2 * impulse));
                p3 = p3.Add(J3.Multiply(m3 * impulse));
                this._ps[i] = p1;
                this._ps[i + 1] = p2;
                this._ps[i + 2] = p3;
            }
        };
        return Rope;
    })();
    PhysicsType2d.Rope = Rope;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var TWO_PI = 2.0 * PhysicsType2d.Constants.PI;
    var Sweep = (function () {
        function Sweep() { this.a = 0; this.a0 = 0; this.alpha0 = 0; this.c = PhysicsType2d.Vector2.Zero(); this.c0 = PhysicsType2d.Vector2.Zero(); this.localCenter = PhysicsType2d.Vector2.Zero(); }
        Sweep.prototype.Clone = function () { var clone = new Sweep(); clone.a = this.a; clone.a0 = this.a0; clone.alpha0 = this.alpha0; clone.c = this.c.Clone(); clone.c0 = this.c0.Clone(); clone.localCenter = this.localCenter.Clone(); return clone; };
        Sweep.prototype.GetTransform = function (beta) { var xf = new PhysicsType2d.Transform(); xf.p = this.c0.Multiply(1.0 - beta).Add(this.c.Multiply(beta)); var angle = (1.0 - beta) * this.a0 + beta * this.a; xf.q.Set(angle); xf.p = xf.p.Subtract(xf.q.ApplyToVector2(this.localCenter)); return xf; };
        Sweep.prototype.Advance = function (alpha) { PhysicsType2d.Assert(this.alpha0 < 1.0); var beta = (alpha - this.alpha0) / (1.0 - this.alpha0); this.c0 = this.c0.Multiply(1.0 - beta).Add(this.c.Multiply(beta)); this.a0 = (1.0 - beta) * this.a0 + beta * this.a; this.alpha0 = alpha; };
        Sweep.prototype.Normalize = function () { var d = TWO_PI * Math.floor(this.a0 / TWO_PI); this.a0 -= d; this.a -= d; };
        return Sweep;
    })();
    PhysicsType2d.Sweep = Sweep;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    var Timer = (function () {
        function Timer() { this.Reset(); }
        Timer.prototype.Reset = function () { this.m_start = (new Date()).getTime(); };
        Timer.prototype.GetMilliseconds = function () { return (new Date()).getTime() - this.m_start; };
        return Timer;
    })();
    PhysicsType2d.Timer = Timer;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        (function (ContactFeatureType) { ContactFeatureType[ContactFeatureType["VERTEX"] = 0] = "VERTEX"; ContactFeatureType[ContactFeatureType["FACE"] = 1] = "FACE"; })(Collision.ContactFeatureType || (Collision.ContactFeatureType = {}));
        var ContactFeatureType = Collision.ContactFeatureType;
        ;
        var ContactFeature = (function () {
            function ContactFeature() { this.indexA = 0; this.indexB = 0; this.typeA = 0; this.typeB = 0; }
            return ContactFeature;
        })();
        Collision.ContactFeature = ContactFeature;
        var ContactID = (function () {
            function ContactID() { this.cf = new ContactFeature(); this.key = 0; }
            return ContactID;
        })();
        Collision.ContactID = ContactID;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        var ClipVertex = (function () {
            function ClipVertex() { this.v = new PhysicsType2d.Vector2(0, 0); this.id = new PhysicsType2d.Collision.ContactID(); }
            return ClipVertex;
        })();
        Collision.ClipVertex = ClipVertex;
        var RayCastInput = (function () {
            function RayCastInput() { this.p1 = new PhysicsType2d.Vector2(0, 0); this.p2 = new PhysicsType2d.Vector2(0, 0); }
            return RayCastInput;
        })();
        Collision.RayCastInput = RayCastInput;
        var RayCastOutput = (function () {
            function RayCastOutput() { this.normal = new PhysicsType2d.Vector2(0, 0); }
            return RayCastOutput;
        })();
        Collision.RayCastOutput = RayCastOutput;
        var ManifoldPoint = (function () {
            function ManifoldPoint() { this.localPoint = new PhysicsType2d.Vector2(0, 0); this.normalImpulse = 0; this.tangentImpulse = 0; this.id = new PhysicsType2d.Collision.ContactID(); }
            return ManifoldPoint;
        })();
        Collision.ManifoldPoint = ManifoldPoint;
        (function (ManifoldType) { ManifoldType[ManifoldType["CIRCLES"] = 0] = "CIRCLES"; ManifoldType[ManifoldType["FACE_A"] = 1] = "FACE_A"; ManifoldType[ManifoldType["FACE_B"] = 2] = "FACE_B"; })(Collision.ManifoldType || (Collision.ManifoldType = {}));
        var ManifoldType = Collision.ManifoldType;
        ;
        var Manifold = (function () {
            function Manifold() { this.points = []; this.localNormal = new PhysicsType2d.Vector2(0, 0); this.localPoint = new PhysicsType2d.Vector2(0, 0); }
            return Manifold;
        })();
        Collision.Manifold = Manifold;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        var AxisAlignedBoundingBox = (function () {
            function AxisAlignedBoundingBox() { this.lowerBound = new PhysicsType2d.Vector2(0, 0); this.upperBound = new PhysicsType2d.Vector2(0, 0); }
            AxisAlignedBoundingBox.prototype.Clone = function () { var clone = new AxisAlignedBoundingBox(); clone.lowerBound = this.lowerBound.Clone(); clone.upperBound = this.upperBound.Clone(); return clone; };
            AxisAlignedBoundingBox.prototype.IsValid = function () { var d = this.upperBound.Subtract(this.lowerBound); var valid = d.x >= 0.0 && d.y >= 0.0; valid = valid && this.lowerBound.IsValid() && this.upperBound.IsValid(); return valid; };
            AxisAlignedBoundingBox.prototype.GetCenter = function () { return (this.lowerBound.Add(this.upperBound)).Multiply(0.5); };
            AxisAlignedBoundingBox.prototype.GetExtents = function () { return (this.upperBound.Subtract(this.lowerBound)).Multiply(0.5); };
            AxisAlignedBoundingBox.prototype.GetPerimeter = function () { var wx = this.upperBound.x - this.lowerBound.x; var wy = this.upperBound.y - this.lowerBound.y; return 2.0 * (wx + wy); };
            AxisAlignedBoundingBox.prototype.CombineWith = function (aabb) { this.lowerBound = PhysicsType2d.Vector2.Min(this.lowerBound, aabb.lowerBound); this.upperBound = PhysicsType2d.Vector2.Max(this.upperBound, aabb.upperBound); };
            AxisAlignedBoundingBox.prototype.Combine = function (aabb1, aabb2) { this.lowerBound = PhysicsType2d.Vector2.Min(aabb1.lowerBound, aabb2.lowerBound); this.upperBound = PhysicsType2d.Vector2.Max(aabb1.upperBound, aabb2.upperBound); };
            AxisAlignedBoundingBox.prototype.Contains = function (aabb) { var result = true; result = result && this.lowerBound.x <= aabb.lowerBound.x; result = result && this.lowerBound.y <= aabb.lowerBound.y; result = result && aabb.upperBound.x <= this.upperBound.x; result = result && aabb.upperBound.y <= this.upperBound.y; return result; };
            AxisAlignedBoundingBox.prototype.RayCast = function (input) {
                var tmin = -PhysicsType2d.Constants.MAX_FLOAT;
                var tmax = PhysicsType2d.Constants.MAX_FLOAT;
                var p = input.p1.Clone();
                var d = input.p2.Subtract(input.p1);
                var absD = d.Abs();
                var normal = new PhysicsType2d.Vector2(0, 0);
                for (var i = 0; i < 2; ++i) {
                    if (absD.GetIndex(i) < PhysicsType2d.Constants.EPSILON) {
                        if (p.GetIndex(i) < this.lowerBound.GetIndex(i) || this.upperBound.GetIndex(i) < p.GetIndex(i)) {
                            return null;
                        }
                    }
                    else {
                        var inv_d = 1.0 / d.GetIndex(i);
                        var t1 = (this.lowerBound.GetIndex(i) - p.GetIndex(i)) * inv_d;
                        var t2 = (this.upperBound.GetIndex(i) - p.GetIndex(i)) * inv_d;
                        var s = -1.0;
                        if (t1 > t2) {
                            var temp = t1;
                            t1 = t2;
                            t2 = temp;
                            s = 1.0;
                        }
                        if (t1 > tmin) {
                            normal.SetZero();
                            normal.SetIndex(i, s);
                            tmin = t1;
                        }
                        tmax = Math.min(tmax, t2);
                        if (tmin > tmax) {
                            return null;
                        }
                    }
                }
                if (tmin < 0.0 || input.maxFraction < tmin) {
                    return null;
                }
                var output = new PhysicsType2d.Collision.RayCastOutput();
                output.fraction = tmin;
                output.normal = normal;
                return output;
            };
            AxisAlignedBoundingBox.prototype.TestOverlap = function (b) {
                PhysicsType2d.Assert(this.IsValid());
                PhysicsType2d.Assert(b.IsValid());
                var d1 = b.lowerBound.Subtract(this.upperBound);
                var d2 = this.lowerBound.Subtract(b.upperBound);
                if (d1.x > 0.0 || d1.y > 0.0) {
                    return false;
                }
                if (d2.x > 0.0 || d2.y > 0.0) {
                    return false;
                }
                return true;
            };
            return AxisAlignedBoundingBox;
        })();
        Collision.AxisAlignedBoundingBox = AxisAlignedBoundingBox;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        (function (TreeConstants) { TreeConstants[TreeConstants["NULL_NODE"] = -1] = "NULL_NODE"; })(Collision.TreeConstants || (Collision.TreeConstants = {}));
        var TreeConstants = Collision.TreeConstants;
        var TreeNode = (function () {
            function TreeNode() { this.aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox(); }
            TreeNode.prototype.Clone = function () { var clone = new TreeNode(); clone._link = this._link; clone.aabb = this.aabb.Clone(); clone.child1 = this.child1; clone.child2 = this.child2; clone.height = this.height; return clone; };
            TreeNode.prototype.IsLeaf = function () { return this.child1 == -1; };
            TreeNode.prototype.parent = function (value) {
                if (PhysicsType2d.MathExtensions.IsValid(value)) {
                    this._link = value;
                }
                return this._link;
            };
            TreeNode.prototype.next = function (value) {
                if (PhysicsType2d.MathExtensions.IsValid(value)) {
                    this._link = value;
                }
                return this._link;
            };
            return TreeNode;
        })();
        Collision.TreeNode = TreeNode;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        var DynamicTree = (function () {
            function DynamicTree() {
                this.m_root = -1;
                this.m_nodeCapacity = 16;
                this.m_nodeCount = 0;
                this.m_nodes = PhysicsType2d.Utils.AllocateArray(this.m_nodeCapacity, function () { return new PhysicsType2d.Collision.TreeNode(); });
                for (var i = 0; i < this.m_nodeCapacity - 1; ++i) {
                    this.m_nodes[i].next(i + 1);
                    this.m_nodes[i].height = -1;
                }
                this.m_nodes[this.m_nodeCapacity - 1].next(-1);
                this.m_nodes[this.m_nodeCapacity - 1].height = -1;
                this.m_freeList = 0;
                this.m_path = 0;
                this.m_insertionCount = 0;
            }
            DynamicTree.prototype.CreateProxy = function (aabb, userData) { var proxyId = this.AllocateNode(); var r = new PhysicsType2d.Vector2(PhysicsType2d.Settings.aabbExtension, PhysicsType2d.Settings.aabbExtension); this.m_nodes[proxyId].aabb.lowerBound = aabb.lowerBound.Subtract(r); this.m_nodes[proxyId].aabb.upperBound = aabb.upperBound.Add(r); this.m_nodes[proxyId].userData = userData; this.m_nodes[proxyId].height = 0; this.InsertLeaf(proxyId); return proxyId; };
            DynamicTree.prototype.DestroyProxy = function (proxyId) { PhysicsType2d.Assert(0 <= proxyId && proxyId < this.m_nodeCapacity); PhysicsType2d.Assert(this.m_nodes[proxyId].IsLeaf()); this.RemoveLeaf(proxyId); this.FreeNode(proxyId); };
            DynamicTree.prototype.MoveProxy = function (proxyId, aabb, displacement) {
                PhysicsType2d.Assert(0 <= proxyId && proxyId < this.m_nodeCapacity);
                PhysicsType2d.Assert(this.m_nodes[proxyId].IsLeaf());
                if (this.m_nodes[proxyId].aabb.Contains(aabb)) {
                    return false;
                }
                this.RemoveLeaf(proxyId);
                var b = aabb.Clone();
                var r = new PhysicsType2d.Vector2(PhysicsType2d.Settings.aabbExtension, PhysicsType2d.Settings.aabbExtension);
                b.lowerBound = b.lowerBound.Subtract(r);
                b.upperBound = b.upperBound.Add(r);
                var d = displacement.Multiply(PhysicsType2d.Settings.aabbMultiplier);
                if (d.x < 0.0) {
                    b.lowerBound.x += d.x;
                }
                else {
                    b.upperBound.x += d.x;
                }
                if (d.y < 0.0) {
                    b.lowerBound.y += d.y;
                }
                else {
                    b.upperBound.y += d.y;
                }
                this.m_nodes[proxyId].aabb = b;
                this.InsertLeaf(proxyId);
                return true;
            };
            DynamicTree.prototype.GetUserData = function (proxyId) { PhysicsType2d.Assert(0 <= proxyId && proxyId < this.m_nodeCapacity); return this.m_nodes[proxyId].userData; };
            DynamicTree.prototype.GetFatAABB = function (proxyId) { PhysicsType2d.Assert(0 <= proxyId && proxyId < this.m_nodeCapacity); return this.m_nodes[proxyId].aabb.Clone(); };
            DynamicTree.prototype.Query = function (listener, aabb) {
                var stack = [];
                stack.push(this.m_root);
                while (stack.length > 0) {
                    var nodeId = stack.pop();
                    if (nodeId == -1) {
                        continue;
                    }
                    var node = this.m_nodes[nodeId];
                    if (node.aabb.TestOverlap(aabb)) {
                        if (node.IsLeaf()) {
                            var proceed = listener.QueryCallback(nodeId);
                            if (proceed == false) {
                                return;
                            }
                        }
                        else {
                            stack.push(node.child1);
                            stack.push(node.child2);
                        }
                    }
                }
            };
            DynamicTree.prototype.RayCast = function (callback, input) {
                var p1 = input.p1;
                var p2 = input.p2;
                var r = p2.Subtract(p1);
                PhysicsType2d.Assert(r.LengthSquared() > 0.0);
                r.Normalize();
                var v = PhysicsType2d.MathExtensions.Cross1x2(1.0, r);
                var abs_v = v.Abs();
                var maxFraction = input.maxFraction;
                var segmentAABB = (function (self) { var t = p1.Add((p2.Subtract(p1)).Multiply(maxFraction)); var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox(); aabb.lowerBound = PhysicsType2d.Vector2.Min(p1, t); aabb.upperBound = PhysicsType2d.Vector2.Max(p1, t); return aabb; })(this);
                var stack = [];
                stack.push(this.m_root);
                while (stack.length > 0) {
                    var nodeId = stack.pop();
                    if (nodeId == -1) {
                        continue;
                    }
                    var node = this.m_nodes[nodeId];
                    if (node.aabb.TestOverlap(segmentAABB) == false) {
                        continue;
                    }
                    var c = node.aabb.GetCenter();
                    var h = node.aabb.GetExtents();
                    var separation = Math.abs(v.Dot(p1.Subtract(c))) - abs_v.Dot(h);
                    if (separation > 0.0) {
                        continue;
                    }
                    if (node.IsLeaf()) {
                        var subInput = new PhysicsType2d.Collision.RayCastInput();
                        subInput.p1 = input.p1;
                        subInput.p2 = input.p2;
                        subInput.maxFraction = maxFraction;
                        var value = callback.RayCastCallback(subInput, nodeId);
                        if (value == 0.0) {
                            return;
                        }
                        if (value > 0.0) {
                            maxFraction = value;
                            var t = p1.Add((p2.Subtract(p1)).Multiply(maxFraction));
                            segmentAABB.lowerBound = PhysicsType2d.Vector2.Min(p1, t);
                            segmentAABB.upperBound = PhysicsType2d.Vector2.Max(p1, t);
                        }
                    }
                    else {
                        stack.push(node.child1);
                        stack.push(node.child2);
                    }
                }
            };
            DynamicTree.prototype.Validate = function () {
                this.ValidateStructure(this.m_root);
                this.ValidateMetrics(this.m_root);
                var freeCount = 0;
                var freeIndex = this.m_freeList;
                while (freeIndex != -1) {
                    PhysicsType2d.Assert(0 <= freeIndex && freeIndex < this.m_nodeCapacity);
                    freeIndex = this.m_nodes[freeIndex].next();
                    ++freeCount;
                }
                PhysicsType2d.Assert(this.GetHeight() == this.ComputeHeight());
                PhysicsType2d.Assert(this.m_nodeCount + freeCount == this.m_nodeCapacity);
            };
            DynamicTree.prototype.GetHeight = function () {
                if (this.m_root == -1) {
                    return 0;
                }
                return this.m_nodes[this.m_root].height;
            };
            DynamicTree.prototype.GetMaxBalance = function () {
                var maxBalance = 0;
                for (var i = 0; i < this.m_nodeCapacity; ++i) {
                    var node = this.m_nodes[i];
                    if (node.height <= 1) {
                        continue;
                    }
                    PhysicsType2d.Assert(node.IsLeaf() == false);
                    var child1 = node.child1;
                    var child2 = node.child2;
                    var balance = Math.abs(this.m_nodes[child2].height - this.m_nodes[child1].height);
                    maxBalance = Math.max(maxBalance, balance);
                }
                return maxBalance;
            };
            DynamicTree.prototype.GetAreaRatio = function () {
                if (this.m_root == -1) {
                    return 0.0;
                }
                var root = this.m_nodes[this.m_root];
                var rootArea = root.aabb.GetPerimeter();
                var totalArea = 0.0;
                for (var i = 0; i < this.m_nodeCapacity; ++i) {
                    var node = this.m_nodes[i];
                    if (node.height < 0) {
                        continue;
                    }
                    totalArea += node.aabb.GetPerimeter();
                }
                return totalArea / rootArea;
            };
            DynamicTree.prototype.RebuildBottomUp = function () {
                var nodes = new Array(this.m_nodeCount);
                var count = 0;
                for (var i = 0; i < this.m_nodeCapacity; ++i) {
                    if (this.m_nodes[i].height < 0) {
                        continue;
                    }
                    if (this.m_nodes[i].IsLeaf()) {
                        this.m_nodes[i].parent(-1);
                        nodes[count] = i;
                        ++count;
                    }
                    else {
                        this.FreeNode(i);
                    }
                }
                while (count > 1) {
                    var minCost = PhysicsType2d.Constants.MAX_FLOAT;
                    var iMin = -1;
                    var jMin = -1;
                    for (var i = 0; i < count; ++i) {
                        var aabbi = this.m_nodes[nodes[i]].aabb.Clone();
                        for (var j = i + 1; j < count; ++j) {
                            var aabbj = this.m_nodes[nodes[j]].aabb.Clone();
                            var b = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                            b.Combine(aabbi, aabbj);
                            var cost = b.GetPerimeter();
                            if (cost < minCost) {
                                iMin = i;
                                jMin = j;
                                minCost = cost;
                            }
                        }
                    }
                    var index1 = nodes[iMin];
                    var index2 = nodes[jMin];
                    var child1 = this.m_nodes[index1];
                    var child2 = this.m_nodes[index2];
                    var parentIndex = this.AllocateNode();
                    var parent = this.m_nodes[parentIndex];
                    parent.child1 = index1;
                    parent.child2 = index2;
                    parent.height = 1 + Math.max(child1.height, child2.height);
                    parent.aabb.Combine(child1.aabb, child2.aabb);
                    parent.parent(-1);
                    child1.parent(parentIndex);
                    child2.parent(parentIndex);
                    nodes[jMin] = nodes[count - 1];
                    nodes[iMin] = parentIndex;
                    --count;
                }
                this.m_root = nodes[0];
                nodes = null;
                this.Validate();
            };
            DynamicTree.prototype.AllocateNode = function () {
                if (this.m_freeList == -1) {
                    PhysicsType2d.Assert(this.m_nodeCount == this.m_nodeCapacity);
                    var oldNodes = this.m_nodes;
                    this.m_nodeCapacity *= 2;
                    this.m_nodes = PhysicsType2d.Utils.AllocateArray(this.m_nodeCapacity, function () { return new PhysicsType2d.Collision.TreeNode(); });
                    for (var i = 0; i < oldNodes.length; i++) {
                        this.m_nodes[i] = oldNodes[i];
                    }
                    oldNodes = null;
                    for (var i = this.m_nodeCount; i < this.m_nodeCapacity - 1; ++i) {
                        this.m_nodes[i].next(i + 1);
                        this.m_nodes[i].height = -1;
                    }
                    this.m_nodes[this.m_nodeCapacity - 1].next(-1);
                    this.m_nodes[this.m_nodeCapacity - 1].height = -1;
                    this.m_freeList = this.m_nodeCount;
                }
                var nodeId = this.m_freeList;
                this.m_freeList = this.m_nodes[nodeId].next();
                this.m_nodes[nodeId].parent(-1);
                this.m_nodes[nodeId].child1 = -1;
                this.m_nodes[nodeId].child2 = -1;
                this.m_nodes[nodeId].height = 0;
                this.m_nodes[nodeId].userData = null;
                ++this.m_nodeCount;
                return nodeId;
            };
            DynamicTree.prototype.FreeNode = function (nodeId) { PhysicsType2d.Assert(0 <= nodeId && nodeId < this.m_nodeCapacity); PhysicsType2d.Assert(0 < this.m_nodeCount); this.m_nodes[nodeId].next(this.m_freeList); this.m_nodes[nodeId].height = -1; this.m_freeList = nodeId; --this.m_nodeCount; };
            DynamicTree.prototype.InsertLeaf = function (leaf) {
                ++this.m_insertionCount;
                if (this.m_root == -1) {
                    this.m_root = leaf;
                    this.m_nodes[this.m_root].parent(-1);
                    return;
                }
                var leafAABB = this.m_nodes[leaf].aabb;
                var index = this.m_root;
                while (this.m_nodes[index].IsLeaf() == false) {
                    var child1 = this.m_nodes[index].child1;
                    var child2 = this.m_nodes[index].child2;
                    var area = this.m_nodes[index].aabb.GetPerimeter();
                    var combinedAABB = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                    combinedAABB.Combine(this.m_nodes[index].aabb, leafAABB);
                    var combinedArea = combinedAABB.GetPerimeter();
                    var cost = 2.0 * combinedArea;
                    var inheritanceCost = 2.0 * (combinedArea - area);
                    var cost1 = 0.0;
                    if (this.m_nodes[child1].IsLeaf()) {
                        var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                        aabb.Combine(leafAABB, this.m_nodes[child1].aabb);
                        cost1 = aabb.GetPerimeter() + inheritanceCost;
                    }
                    else {
                        var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                        aabb.Combine(leafAABB, this.m_nodes[child1].aabb);
                        var oldArea = this.m_nodes[child1].aabb.GetPerimeter();
                        var newArea = aabb.GetPerimeter();
                        cost1 = (newArea - oldArea) + inheritanceCost;
                    }
                    var cost2;
                    if (this.m_nodes[child2].IsLeaf()) {
                        var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                        aabb.Combine(leafAABB, this.m_nodes[child2].aabb);
                        cost2 = aabb.GetPerimeter() + inheritanceCost;
                    }
                    else {
                        var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                        aabb.Combine(leafAABB, this.m_nodes[child2].aabb);
                        var oldArea = this.m_nodes[child2].aabb.GetPerimeter();
                        var newArea = aabb.GetPerimeter();
                        cost2 = newArea - oldArea + inheritanceCost;
                    }
                    if (cost < cost1 && cost < cost2) {
                        break;
                    }
                    if (cost1 < cost2) {
                        index = child1;
                    }
                    else {
                        index = child2;
                    }
                }
                var sibling = index;
                var oldParent = this.m_nodes[sibling].parent();
                var newParent = this.AllocateNode();
                this.m_nodes[newParent].parent(oldParent);
                this.m_nodes[newParent].userData = null;
                this.m_nodes[newParent].aabb.Combine(leafAABB, this.m_nodes[sibling].aabb);
                this.m_nodes[newParent].height = this.m_nodes[sibling].height + 1;
                if (oldParent != -1) {
                    if (this.m_nodes[oldParent].child1 == sibling) {
                        this.m_nodes[oldParent].child1 = newParent;
                    }
                    else {
                        this.m_nodes[oldParent].child2 = newParent;
                    }
                    this.m_nodes[newParent].child1 = sibling;
                    this.m_nodes[newParent].child2 = leaf;
                    this.m_nodes[sibling].parent(newParent);
                    this.m_nodes[leaf].parent(newParent);
                }
                else {
                    this.m_nodes[newParent].child1 = sibling;
                    this.m_nodes[newParent].child2 = leaf;
                    this.m_nodes[sibling].parent(newParent);
                    this.m_nodes[leaf].parent(newParent);
                    this.m_root = newParent;
                }
                index = this.m_nodes[leaf].parent();
                while (index != -1) {
                    index = this.Balance(index);
                    var child1 = this.m_nodes[index].child1;
                    var child2 = this.m_nodes[index].child2;
                    PhysicsType2d.Assert(child1 != -1);
                    PhysicsType2d.Assert(child2 != -1);
                    this.m_nodes[index].height = 1 + Math.max(this.m_nodes[child1].height, this.m_nodes[child2].height);
                    this.m_nodes[index].aabb.Combine(this.m_nodes[child1].aabb, this.m_nodes[child2].aabb);
                    index = this.m_nodes[index].parent();
                }
            };
            DynamicTree.prototype.RemoveLeaf = function (leaf) {
                if (leaf == this.m_root) {
                    this.m_root = -1;
                    return;
                }
                var parent = this.m_nodes[leaf].parent();
                var grandParent = this.m_nodes[parent].parent();
                var sibling;
                if (this.m_nodes[parent].child1 == leaf) {
                    sibling = this.m_nodes[parent].child2;
                }
                else {
                    sibling = this.m_nodes[parent].child1;
                }
                if (grandParent != -1) {
                    if (this.m_nodes[grandParent].child1 == parent) {
                        this.m_nodes[grandParent].child1 = sibling;
                    }
                    else {
                        this.m_nodes[grandParent].child2 = sibling;
                    }
                    this.m_nodes[sibling].parent(grandParent);
                    this.FreeNode(parent);
                    var index = grandParent;
                    while (index != -1) {
                        index = this.Balance(index);
                        var child1 = this.m_nodes[index].child1;
                        var child2 = this.m_nodes[index].child2;
                        this.m_nodes[index].aabb.Combine(this.m_nodes[child1].aabb, this.m_nodes[child2].aabb);
                        this.m_nodes[index].height = 1 + Math.max(this.m_nodes[child1].height, this.m_nodes[child2].height);
                        index = this.m_nodes[index].parent();
                    }
                }
                else {
                    this.m_root = sibling;
                    this.m_nodes[sibling].parent(-1);
                    this.FreeNode(parent);
                }
            };
            DynamicTree.prototype.Balance = function (iA) {
                PhysicsType2d.Assert(iA != -1);
                var A = this.m_nodes[iA];
                if (A.IsLeaf() || A.height < 2) {
                    return iA;
                }
                var iB = A.child1;
                var iC = A.child2;
                PhysicsType2d.Assert(0 <= iB && iB < this.m_nodeCapacity);
                PhysicsType2d.Assert(0 <= iC && iC < this.m_nodeCapacity);
                var B = this.m_nodes[iB];
                var C = this.m_nodes[iC];
                var balance = C.height - B.height;
                if (balance > 1) {
                    var iF = C.child1;
                    var iG = C.child2;
                    var F = this.m_nodes[iF];
                    var G = this.m_nodes[iG];
                    PhysicsType2d.Assert(0 <= iF && iF < this.m_nodeCapacity);
                    PhysicsType2d.Assert(0 <= iG && iG < this.m_nodeCapacity);
                    C.child1 = iA;
                    C.parent(A.parent());
                    A.parent(iC);
                    if (C.parent() != -1) {
                        if (this.m_nodes[C.parent()].child1 == iA) {
                            this.m_nodes[C.parent()].child1 = iC;
                        }
                        else {
                            PhysicsType2d.Assert(this.m_nodes[C.parent()].child2 == iA);
                            this.m_nodes[C.parent()].child2 = iC;
                        }
                    }
                    else {
                        this.m_root = iC;
                    }
                    if (F.height > G.height) {
                        C.child2 = iF;
                        A.child2 = iG;
                        G.parent(iA);
                        A.aabb.Combine(B.aabb, G.aabb);
                        C.aabb.Combine(A.aabb, F.aabb);
                        A.height = 1 + Math.max(B.height, G.height);
                        C.height = 1 + Math.max(A.height, F.height);
                    }
                    else {
                        C.child2 = iG;
                        A.child2 = iF;
                        F.parent(iA);
                        A.aabb.Combine(B.aabb, F.aabb);
                        C.aabb.Combine(A.aabb, G.aabb);
                        A.height = 1 + Math.max(B.height, F.height);
                        C.height = 1 + Math.max(A.height, G.height);
                    }
                    return iC;
                }
                if (balance < -1) {
                    var iD = B.child1;
                    var iE = B.child2;
                    var D = this.m_nodes[iD];
                    var E = this.m_nodes[iE];
                    PhysicsType2d.Assert(0 <= iD && iD < this.m_nodeCapacity);
                    PhysicsType2d.Assert(0 <= iE && iE < this.m_nodeCapacity);
                    B.child1 = iA;
                    B.parent(A.parent());
                    A.parent(iB);
                    if (B.parent() != -1) {
                        if (this.m_nodes[B.parent()].child1 == iA) {
                            this.m_nodes[B.parent()].child1 = iB;
                        }
                        else {
                            PhysicsType2d.Assert(this.m_nodes[B.parent()].child2 == iA);
                            this.m_nodes[B.parent()].child2 = iB;
                        }
                    }
                    else {
                        this.m_root = iB;
                    }
                    if (D.height > E.height) {
                        B.child2 = iD;
                        A.child1 = iE;
                        E.parent(iA);
                        A.aabb.Combine(C.aabb, E.aabb);
                        B.aabb.Combine(A.aabb, D.aabb);
                        A.height = 1 + Math.max(C.height, E.height);
                        B.height = 1 + Math.max(A.height, D.height);
                    }
                    else {
                        B.child2 = iE;
                        A.child1 = iD;
                        D.parent(iA);
                        A.aabb.Combine(C.aabb, D.aabb);
                        B.aabb.Combine(A.aabb, E.aabb);
                        A.height = 1 + Math.max(C.height, D.height);
                        B.height = 1 + Math.max(A.height, E.height);
                    }
                    return iB;
                }
                return iA;
            };
            DynamicTree.prototype.ComputeHeight = function () { var height = this.ComputeHeightAtNode(this.m_root); return height; };
            DynamicTree.prototype.ComputeHeightAtNode = function (nodeId) {
                PhysicsType2d.Assert(0 <= nodeId && nodeId < this.m_nodeCapacity);
                var node = this.m_nodes[nodeId];
                if (node.IsLeaf()) {
                    return 0;
                }
                var height1 = this.ComputeHeightAtNode(node.child1);
                var height2 = this.ComputeHeightAtNode(node.child2);
                return 1 + Math.max(height1, height2);
            };
            DynamicTree.prototype.ValidateStructure = function (index) {
                if (index == -1) {
                    return;
                }
                if (index == this.m_root) {
                    PhysicsType2d.Assert(this.m_nodes[index].parent() == -1);
                }
                var node = this.m_nodes[index];
                var child1 = node.child1;
                var child2 = node.child2;
                if (node.IsLeaf()) {
                    PhysicsType2d.Assert(child1 == -1);
                    PhysicsType2d.Assert(child2 == -1);
                    PhysicsType2d.Assert(node.height == 0);
                    return;
                }
                PhysicsType2d.Assert(0 <= child1 && child1 < this.m_nodeCapacity);
                PhysicsType2d.Assert(0 <= child2 && child2 < this.m_nodeCapacity);
                PhysicsType2d.Assert(this.m_nodes[child1].parent() == index);
                PhysicsType2d.Assert(this.m_nodes[child2].parent() == index);
                this.ValidateStructure(child1);
                this.ValidateStructure(child2);
            };
            DynamicTree.prototype.ValidateMetrics = function (index) {
                if (index == -1) {
                    return;
                }
                var node = this.m_nodes[index];
                var child1 = node.child1;
                var child2 = node.child2;
                if (node.IsLeaf()) {
                    PhysicsType2d.Assert(child1 == -1);
                    PhysicsType2d.Assert(child2 == -1);
                    PhysicsType2d.Assert(node.height == 0);
                    return;
                }
                PhysicsType2d.Assert(0 <= child1 && child1 < this.m_nodeCapacity);
                PhysicsType2d.Assert(0 <= child2 && child2 < this.m_nodeCapacity);
                var height1 = this.m_nodes[child1].height;
                var height2 = this.m_nodes[child2].height;
                var height = 1 + Math.max(height1, height2);
                PhysicsType2d.Assert(node.height == height);
                var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                aabb.Combine(this.m_nodes[child1].aabb, this.m_nodes[child2].aabb);
                PhysicsType2d.Assert(aabb.lowerBound == node.aabb.lowerBound);
                PhysicsType2d.Assert(aabb.upperBound == node.aabb.upperBound);
                this.ValidateMetrics(child1);
                this.ValidateMetrics(child2);
            };
            return DynamicTree;
        })();
        Collision.DynamicTree = DynamicTree;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        var Pair = (function () {
            function Pair() { this.proxyIdA = 0; this.proxyIdB = 0; this.next = 0; }
            Pair.LessThan = function (pair1, pair2) {
                if (pair1.proxyIdA < pair2.proxyIdA) {
                    return -1;
                }
                if (pair1.proxyIdA == pair2.proxyIdA) {
                    if (pair1.proxyIdB < pair2.proxyIdB) {
                        return -1;
                    }
                    else if (pair1.proxyIdB > pair2.proxyIdB) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
                return 1;
            };
            return Pair;
        })();
        Collision.Pair = Pair;
        (function (BroadPhaseConstants) { BroadPhaseConstants[BroadPhaseConstants["NULL_PROXY"] = -1] = "NULL_PROXY"; })(Collision.BroadPhaseConstants || (Collision.BroadPhaseConstants = {}));
        var BroadPhaseConstants = Collision.BroadPhaseConstants;
        var BroadPhase = (function () {
            function BroadPhase() { this.m_proxyCount = 0; this.m_tree = new PhysicsType2d.Collision.DynamicTree(); this.m_moveBuffer = []; this.m_pairBuffer = []; }
            BroadPhase.prototype.CreateProxy = function (aabb, userData) { var proxyId = this.m_tree.CreateProxy(aabb, userData); this.m_proxyCount++; this.BufferMove(proxyId); return proxyId; };
            BroadPhase.prototype.DestroyProxy = function (proxyId) { this.m_proxyCount--; this.UnBufferMove(proxyId); this.m_tree.DestroyProxy(proxyId); };
            BroadPhase.prototype.MoveProxy = function (proxyId, aabb, displacement) { var buffer = this.m_tree.MoveProxy(proxyId, aabb, displacement); if (buffer) {
                this.BufferMove(proxyId);
            } };
            BroadPhase.prototype.TouchProxy = function (proxyId) { this.BufferMove(proxyId); };
            BroadPhase.prototype.GetFatAABB = function (proxyId) { return this.m_tree.GetFatAABB(proxyId); };
            BroadPhase.prototype.GetUserData = function (proxyId) { return this.m_tree.GetUserData(proxyId); };
            BroadPhase.prototype.TestOverlap = function (proxyIdA, proxyIdB) { var aabbA = this.m_tree.GetFatAABB(proxyIdA); var aabbB = this.m_tree.GetFatAABB(proxyIdB); return aabbA.TestOverlap(aabbB); };
            BroadPhase.prototype.GetProxyCount = function () { return this.m_proxyCount; };
            BroadPhase.prototype.UpdatePairs = function (callback) {
                this.m_pairBuffer = [];
                for (var i = 0; i < this.m_moveBuffer.length; ++i) {
                    this.m_queryProxyId = this.m_moveBuffer[i];
                    if (this.m_queryProxyId == -1) {
                        continue;
                    }
                    var fatAABB = this.m_tree.GetFatAABB(this.m_queryProxyId);
                    this.m_tree.Query(this, fatAABB);
                }
                this.m_moveBuffer = [];
                this.m_pairBuffer = this.m_pairBuffer.sort(Pair.LessThan);
                var i = 0;
                while (i < this.m_pairBuffer.length) {
                    var primaryPair = this.m_pairBuffer[i];
                    var userDataA = this.m_tree.GetUserData(primaryPair.proxyIdA);
                    var userDataB = this.m_tree.GetUserData(primaryPair.proxyIdB);
                    callback.AddPair(userDataA, userDataB);
                    ++i;
                    while (i < this.m_pairBuffer.length) {
                        var pair = this.m_pairBuffer[i];
                        if (pair.proxyIdA != primaryPair.proxyIdA || pair.proxyIdB != primaryPair.proxyIdB) {
                            break;
                        }
                        ++i;
                    }
                }
            };
            BroadPhase.prototype.Query = function (callback, aabb) { this.m_tree.Query(callback, aabb); };
            BroadPhase.prototype.RayCast = function (callback, input) { this.m_tree.RayCast(callback, input); };
            BroadPhase.prototype.GetTreeHeight = function () { return this.m_tree.GetHeight(); };
            BroadPhase.prototype.GetTreeBalance = function () { return this.m_tree.GetMaxBalance(); };
            BroadPhase.prototype.GetTreeQuality = function () { return this.m_tree.GetAreaRatio(); };
            BroadPhase.prototype.BufferMove = function (proxyId) { this.m_moveBuffer.push(proxyId); };
            BroadPhase.prototype.UnBufferMove = function (proxyId) { for (var i = 0; i < this.m_moveBuffer.length; ++i) {
                if (this.m_moveBuffer[i] == proxyId) {
                    this.m_moveBuffer[i] = -1;
                    return;
                }
            } };
            BroadPhase.prototype.QueryCallback = function (proxyId) {
                if (proxyId == this.m_queryProxyId) {
                    return true;
                }
                var pair = new Pair();
                pair.proxyIdA = Math.min(proxyId, this.m_queryProxyId);
                pair.proxyIdB = Math.max(proxyId, this.m_queryProxyId);
                this.m_pairBuffer.push(pair);
                return true;
            };
            return BroadPhase;
        })();
        Collision.BroadPhase = BroadPhase;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        (function (Shapes) {
            var MassData = (function () {
                function MassData() { this.center = new PhysicsType2d.Vector2(0, 0); }
                return MassData;
            })();
            Shapes.MassData = MassData;
        })(Collision.Shapes || (Collision.Shapes = {}));
        var Shapes = Collision.Shapes;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) { (function (Collision) { (function (Shapes) { (function (ShapeType) { ShapeType[ShapeType["CIRCLE"] = 0] = "CIRCLE"; ShapeType[ShapeType["EDGE"] = 1] = "EDGE"; ShapeType[ShapeType["POLYGON"] = 2] = "POLYGON"; ShapeType[ShapeType["CHAIN"] = 3] = "CHAIN"; ShapeType[ShapeType["COUNT"] = 4] = "COUNT"; })(Shapes.ShapeType || (Shapes.ShapeType = {})); var ShapeType = Shapes.ShapeType; ; })(Collision.Shapes || (Collision.Shapes = {})); var Shapes = Collision.Shapes; })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {})); var Collision = PhysicsType2d.Collision; })(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        (function (Shapes) {
            var CircleShape = (function () {
                function CircleShape() { this.m_p = new PhysicsType2d.Vector2(0, 0); this.m_radius = 0.0; }
                CircleShape.prototype.GetRadius = function () { return this.m_radius; };
                CircleShape.prototype.Clone = function () { var clone = new CircleShape(); clone.m_p = this.m_p.Clone(); clone.m_radius = this.m_radius; return clone; };
                CircleShape.prototype.GetType = function () { return 0; };
                CircleShape.prototype.GetChildCount = function () { return 1; };
                CircleShape.prototype.TestPoint = function (transform, p) { var center = transform.p.Add(transform.q.ApplyToVector2(this.m_p)); var d = p.Subtract(center); return d.Dot(d) <= this.m_radius * this.m_radius; };
                CircleShape.prototype.RayCast = function (input, transform, childIndex) {
                    var position = transform.p.Add(transform.q.ApplyToVector2(this.m_p));
                    var s = input.p1.Subtract(position);
                    var b = s.Dot(s) - this.m_radius * this.m_radius;
                    var r = input.p2.Subtract(input.p1);
                    var c = s.Dot(r);
                    var rr = r.Dot(r);
                    var sigma = c * c - rr * b;
                    if (sigma < 0.0 || rr < PhysicsType2d.Constants.EPSILON) {
                        return null;
                    }
                    var a = -(c + Math.sqrt(sigma));
                    if (0.0 <= a && a <= input.maxFraction * rr) {
                        a /= rr;
                        var output = new PhysicsType2d.Collision.RayCastOutput();
                        output.fraction = a;
                        output.normal = s.Add(r.Multiply(a));
                        output.normal.Normalize();
                        return output;
                    }
                    return null;
                };
                CircleShape.prototype.ComputeAABB = function (transform, childIndex) { var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox(); var p = transform.p.Add(transform.q.ApplyToVector2(this.m_p)); aabb.lowerBound.Set(p.x - this.m_radius, p.y - this.m_radius); aabb.upperBound.Set(p.x + this.m_radius, p.y + this.m_radius); return aabb; };
                CircleShape.prototype.ComputeMass = function (density) { var massData = new PhysicsType2d.Collision.Shapes.MassData(); massData.mass = density * PhysicsType2d.Constants.PI * this.m_radius * this.m_radius; massData.center = this.m_p; massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + this.m_p.Dot(this.m_p)); return massData; };
                CircleShape.prototype.GetSupport = function (d) { return 0; };
                CircleShape.prototype.GetSupportVertex = function (d) { return this.m_p; };
                CircleShape.prototype.GetVertexCount = function () { return 1; };
                CircleShape.prototype.GetVertex = function (index) { PhysicsType2d.Assert(index == 0); return this.m_p; };
                return CircleShape;
            })();
            Shapes.CircleShape = CircleShape;
        })(Collision.Shapes || (Collision.Shapes = {}));
        var Shapes = Collision.Shapes;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        (function (Shapes) {
            var PolygonShape = (function () {
                function PolygonShape() { this.m_vertices = []; this.m_normals = []; this.m_radius = PhysicsType2d.Settings.polygonRadius; this.m_centroid = new PhysicsType2d.Vector2(0, 0); }
                PolygonShape.prototype.GetRadius = function () { return this.m_radius; };
                PolygonShape.prototype.Clone = function () { var clone = new PolygonShape(); clone.m_centroid = this.m_centroid.Clone(); clone.m_radius = this.m_radius; clone.m_normals = this.m_normals.map(function (value, index, array) { return value.Clone(); }); clone.m_vertices = this.m_vertices.map(function (value, index, array) { return value.Clone(); }); return clone; };
                PolygonShape.prototype.GetType = function () { return 2; };
                PolygonShape.prototype.GetChildCount = function () { return 1; };
                PolygonShape.prototype.TestPoint = function (xf, p) {
                    var pLocal = xf.q.ApplyTransposeToVector2(p.Subtract(xf.p));
                    for (var i = 0; i < this.m_normals.length; ++i) {
                        var dot = this.m_normals[i].Dot(pLocal.Subtract(this.m_vertices[i]));
                        if (dot > 0.0) {
                            return false;
                        }
                    }
                    return true;
                };
                PolygonShape.prototype.RayCast = function (input, xf, childIndex) {
                    var p1 = xf.q.ApplyTransposeToVector2(input.p1.Subtract(xf.p));
                    var p2 = xf.q.ApplyTransposeToVector2(input.p2.Subtract(xf.p));
                    var d = p2.Subtract(p1);
                    var lower = 0.0;
                    var upper = input.maxFraction;
                    var index = -1;
                    for (var i = 0; i < this.m_normals.length; ++i) {
                        var numerator = this.m_normals[i].Dot(this.m_vertices[i].Subtract(p1));
                        var denominator = this.m_normals[i].Dot(d);
                        if (denominator == 0.0) {
                            if (numerator < 0.0) {
                                return null;
                            }
                        }
                        else {
                            if (denominator < 0.0 && numerator < lower * denominator) {
                                lower = numerator / denominator;
                                index = i;
                            }
                            else if (denominator > 0.0 && numerator < upper * denominator) {
                                upper = numerator / denominator;
                            }
                        }
                        if (upper < lower) {
                            return null;
                        }
                    }
                    PhysicsType2d.Assert(0.0 <= lower && lower <= input.maxFraction);
                    if (index >= 0) {
                        var output = new PhysicsType2d.Collision.RayCastOutput();
                        output.fraction = lower;
                        output.normal = xf.q.ApplyToVector2(this.m_normals[index]);
                        return output;
                    }
                    return null;
                };
                PolygonShape.prototype.ComputeAABB = function (xf, childIndex) {
                    var lower = xf.ApplyToVector2(this.m_vertices[0]);
                    var upper = lower;
                    for (var i = 1; i < this.m_vertices.length; ++i) {
                        var v = xf.ApplyToVector2(this.m_vertices[i]);
                        lower = PhysicsType2d.Vector2.Min(lower, v);
                        upper = PhysicsType2d.Vector2.Max(upper, v);
                    }
                    var r = new PhysicsType2d.Vector2(this.m_radius, this.m_radius);
                    var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                    aabb.lowerBound = lower.Subtract(r);
                    aabb.upperBound = upper.Add(r);
                    return aabb;
                };
                PolygonShape.prototype.ComputeMass = function (density) {
                    PhysicsType2d.Assert(this.m_vertices.length >= 3);
                    var center = new PhysicsType2d.Vector2(0.0, 0.0);
                    var area = 0.0;
                    var I = 0.0;
                    var s = new PhysicsType2d.Vector2(0.0, 0.0);
                    for (var i = 0; i < this.m_vertices.length; ++i) {
                        s = s.Add(this.m_vertices[i]);
                    }
                    s = s.Multiply(1.0 / this.m_vertices.length);
                    var k_inv3 = 1.0 / 3.0;
                    for (var i = 0; i < this.m_vertices.length; ++i) {
                        var e1 = this.m_vertices[i].Subtract(s);
                        var e2 = ((i + 1) < this.m_vertices.length) ? this.m_vertices[i + 1].Subtract(s) : this.m_vertices[0].Subtract(s);
                        var D = e1.Cross(e2);
                        var triangleArea = 0.5 * D;
                        area += triangleArea;
                        center = center.Add((e1.Add(e2)).Multiply(triangleArea * k_inv3));
                        var ex1 = e1.x;
                        var ey1 = e1.y;
                        var ex2 = e2.x;
                        var ey2 = e2.y;
                        var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
                        var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
                        I += (0.25 * k_inv3 * D) * (intx2 + inty2);
                    }
                    var massData = new PhysicsType2d.Collision.Shapes.MassData();
                    massData.mass = density * area;
                    PhysicsType2d.Assert(area > PhysicsType2d.Constants.EPSILON);
                    center = center.Multiply(1.0 / area);
                    massData.center = center.Add(s);
                    massData.I = density * I;
                    massData.I += massData.mass * (massData.center.Dot(massData.center) - center.Dot(center));
                    return massData;
                };
                PolygonShape.prototype.GetVertex = function (index) { PhysicsType2d.Assert(0 <= index && index < this.m_vertices.length); return this.m_vertices[index]; };
                PolygonShape.prototype.SetAsBoxAtOrigin = function (hx, hy) { this.m_vertices = []; this.m_vertices[0] = new PhysicsType2d.Vector2(-hx, -hy); this.m_vertices[1] = new PhysicsType2d.Vector2(hx, -hy); this.m_vertices[2] = new PhysicsType2d.Vector2(hx, hy); this.m_vertices[3] = new PhysicsType2d.Vector2(-hx, hy); this.m_normals = []; this.m_normals[0] = new PhysicsType2d.Vector2(0.0, -1.0); this.m_normals[1] = new PhysicsType2d.Vector2(1.0, 0.0); this.m_normals[2] = new PhysicsType2d.Vector2(0.0, 1.0); this.m_normals[3] = new PhysicsType2d.Vector2(-1.0, 0.0); this.m_centroid.SetZero(); };
                PolygonShape.prototype.SetAsBox = function (hx, hy, center, angle) { this.m_vertices = []; this.m_vertices[0] = new PhysicsType2d.Vector2(-hx, -hy); this.m_vertices[1] = new PhysicsType2d.Vector2(hx, -hy); this.m_vertices[2] = new PhysicsType2d.Vector2(hx, hy); this.m_vertices[3] = new PhysicsType2d.Vector2(-hx, hy); this.m_normals = []; this.m_normals[0] = new PhysicsType2d.Vector2(0.0, -1.0); this.m_normals[1] = new PhysicsType2d.Vector2(1.0, 0.0); this.m_normals[2] = new PhysicsType2d.Vector2(0.0, 1.0); this.m_normals[3] = new PhysicsType2d.Vector2(-1.0, 0.0); this.m_centroid = center; var xf = new PhysicsType2d.Transform(); xf.p = center; xf.q.Set(angle); for (var i = 0; i < this.m_vertices.length; ++i) {
                    this.m_vertices[i] = xf.ApplyToVector2(this.m_vertices[i]);
                    this.m_normals[i] = xf.q.ApplyToVector2(this.m_normals[i]);
                } };
                PolygonShape.ComputeCentroid = function (vs) {
                    PhysicsType2d.Assert(vs.length >= 3);
                    var c = new PhysicsType2d.Vector2(0.0, 0.0);
                    var area = 0.0;
                    var pRef = new PhysicsType2d.Vector2(0.0, 0.0);
                    var inv3 = 1.0 / 3.0;
                    for (var i = 0; i < vs.length; ++i) {
                        var p1 = pRef;
                        var p2 = vs[i];
                        var p3 = i + 1 < vs.length ? vs[i + 1] : vs[0];
                        var e1 = p2.Subtract(p1);
                        var e2 = p3.Subtract(p1);
                        var D = e1.Cross(e2);
                        var triangleArea = 0.5 * D;
                        area += triangleArea;
                        c = c.Add((p1.Add(p2).Add(p3)).Multiply(inv3 * triangleArea));
                    }
                    PhysicsType2d.Assert(area > PhysicsType2d.Constants.EPSILON);
                    c = c.Multiply(1.0 / area);
                    return c;
                };
                PolygonShape.prototype.Set = function (vertices) {
                    PhysicsType2d.Assert(3 <= vertices.length && vertices.length <= PhysicsType2d.Settings.maxPolygonVertices);
                    this.m_vertices = vertices.slice(0);
                    for (var i = 0; i < this.m_vertices.length; ++i) {
                        var i1 = i;
                        var i2 = (i + 1) < this.m_vertices.length ? i + 1 : 0;
                        var edge = this.m_vertices[i2].Subtract(this.m_vertices[i1]);
                        PhysicsType2d.Assert(edge.LengthSquared() > PhysicsType2d.Constants.EPSILON * PhysicsType2d.Constants.EPSILON);
                        this.m_normals[i] = PhysicsType2d.MathExtensions.Cross2x1(edge, 1.0);
                        this.m_normals[i].Normalize();
                    }
                    if (PhysicsType2d.Settings.isDebug) {
                        for (var i = 0; i < this.m_vertices.length; ++i) {
                            var i1 = i;
                            var i2 = (i + 1) < this.m_vertices.length ? i + 1 : 0;
                            var edge = this.m_vertices[i2].Subtract(this.m_vertices[i1]);
                            for (var j = 0; j < this.m_vertices.length; ++j) {
                                if (j == i1 || j == i2) {
                                    continue;
                                }
                                var r = this.m_vertices[j].Subtract(this.m_vertices[i1]);
                                var s = edge.Cross(r);
                                PhysicsType2d.Assert(s > 0.0, "ERROR: Please ensure your polygon is convex and has a CCW winding order");
                            }
                        }
                    }
                    this.m_centroid = PolygonShape.ComputeCentroid(this.m_vertices);
                };
                return PolygonShape;
            })();
            Shapes.PolygonShape = PolygonShape;
        })(Collision.Shapes || (Collision.Shapes = {}));
        var Shapes = Collision.Shapes;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        function CollideCircles(manifold, circleA, xfA, circleB, xfB) {
            manifold.points = [];
            var pA = xfA.ApplyToVector2(circleA.m_p);
            var pB = xfB.ApplyToVector2(circleB.m_p);
            var d = pB.Subtract(pA);
            var distSqr = d.Dot(d);
            var rA = circleA.m_radius;
            var rB = circleB.m_radius;
            var radius = rA + rB;
            if (distSqr > radius * radius) {
                return manifold;
            }
            manifold.type = 0;
            manifold.localPoint = circleA.m_p;
            manifold.localNormal.SetZero();
            manifold.points[0] = new PhysicsType2d.Collision.ManifoldPoint();
            manifold.points[0].localPoint = circleB.m_p;
            manifold.points[0].id.key = 0;
            return manifold;
        }
        Collision.CollideCircles = CollideCircles;
        function CollidePolygonAndCircle(manifold, polygonA, xfA, circleB, xfB) {
            manifold.points = [];
            var c = xfB.ApplyToVector2(circleB.m_p);
            var cLocal = xfA.ApplyTransposeToVector2(c);
            var normalIndex = 0;
            var separation = -PhysicsType2d.Constants.MAX_FLOAT;
            var radius = polygonA.m_radius + circleB.m_radius;
            var vertexCount = polygonA.m_vertices.length;
            var vertices = polygonA.m_vertices;
            var normals = polygonA.m_normals;
            for (var i = 0; i < vertexCount; ++i) {
                var s = normals[i].Dot(cLocal.Subtract(vertices[i]));
                if (s > radius) {
                    return manifold;
                }
                if (s > separation) {
                    separation = s;
                    normalIndex = i;
                }
            }
            var vertIndex1 = normalIndex;
            var vertIndex2 = (vertIndex1 + 1) < vertexCount ? vertIndex1 + 1 : 0;
            var v1 = vertices[vertIndex1];
            var v2 = vertices[vertIndex2];
            if (separation < PhysicsType2d.Constants.EPSILON) {
                manifold.type = 1;
                manifold.localNormal = normals[normalIndex];
                manifold.localPoint = (v1.Add(v2)).Multiply(0.5);
                manifold.points[0] = new PhysicsType2d.Collision.ManifoldPoint();
                manifold.points[0].localPoint = circleB.m_p;
                manifold.points[0].id.key = 0;
                return manifold;
            }
            var u1 = (cLocal.Subtract(v1)).Dot(v2.Subtract(v1));
            var u2 = (cLocal.Subtract(v2)).Dot(v1.Subtract(v2));
            if (u1 <= 0.0) {
                if (cLocal.DistanceFromSquared(v1) > radius * radius) {
                    return manifold;
                }
                manifold.type = 1;
                manifold.localNormal = cLocal.Subtract(v1);
                manifold.localNormal.Normalize();
                manifold.localPoint = v1;
                manifold.points[0] = new PhysicsType2d.Collision.ManifoldPoint();
                manifold.points[0].localPoint = circleB.m_p;
                manifold.points[0].id.key = 0;
            }
            else if (u2 <= 0.0) {
                if (cLocal.DistanceFromSquared(v2) > radius * radius) {
                    return manifold;
                }
                manifold.type = 1;
                manifold.localNormal = cLocal.Subtract(v2);
                manifold.localNormal.Normalize();
                manifold.localPoint = v2;
                manifold.points[0] = new PhysicsType2d.Collision.ManifoldPoint();
                manifold.points[0].localPoint = circleB.m_p;
                manifold.points[0].id.key = 0;
            }
            else {
                var faceCenter = (v1.Add(v2)).Multiply(0.5);
                var separation = (cLocal.Subtract(faceCenter)).Dot(normals[vertIndex1]);
                if (separation > radius) {
                    return manifold;
                }
                manifold.type = 1;
                manifold.localNormal = normals[vertIndex1];
                manifold.localPoint = faceCenter;
                manifold.points[0] = new PhysicsType2d.Collision.ManifoldPoint();
                manifold.points[0].localPoint = circleB.m_p;
                manifold.points[0].id.key = 0;
            }
            return manifold;
        }
        Collision.CollidePolygonAndCircle = CollidePolygonAndCircle;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        (function (Shapes) {
            var EdgeShape = (function () {
                function EdgeShape() { this.m_vertex1 = new PhysicsType2d.Vector2(0, 0); this.m_vertex2 = new PhysicsType2d.Vector2(0, 0); this.m_vertex0 = new PhysicsType2d.Vector2(0, 0); this.m_vertex3 = new PhysicsType2d.Vector2(0, 0); this.m_radius = PhysicsType2d.Settings.polygonRadius; this.m_hasVertex0 = false; this.m_hasVertex3 = false; }
                EdgeShape.prototype.GetRadius = function () { return this.m_radius; };
                EdgeShape.prototype.Clone = function () { var clone = new EdgeShape(); clone.m_radius = this.m_radius; clone.m_vertex1 = this.m_vertex1.Clone(); clone.m_vertex2 = this.m_vertex2.Clone(); clone.m_vertex0 = this.m_vertex0.Clone(); clone.m_vertex3 = this.m_vertex3.Clone(); clone.m_hasVertex0 = this.m_hasVertex0; clone.m_hasVertex3 = this.m_hasVertex3; return clone; };
                EdgeShape.prototype.GetType = function () { return 1; };
                EdgeShape.prototype.GetChildCount = function () { return 1; };
                EdgeShape.prototype.TestPoint = function (xf, p) { return false; };
                EdgeShape.prototype.RayCast = function (input, xf, childIndex) {
                    var p1 = xf.q.ApplyTransposeToVector2(input.p1.Subtract(xf.p));
                    var p2 = xf.q.ApplyTransposeToVector2(input.p2.Subtract(xf.p));
                    var d = p2.Subtract(p1);
                    var v1 = this.m_vertex1;
                    var v2 = this.m_vertex2;
                    var e = v2.Subtract(v1);
                    var normal = new PhysicsType2d.Vector2(e.y, -e.x);
                    normal.Normalize();
                    var numerator = normal.Dot(v1.Subtract(p1));
                    var denominator = normal.Dot(d);
                    if (denominator == 0.0) {
                        return null;
                    }
                    var t = numerator / denominator;
                    if (t < 0.0 || input.maxFraction < t) {
                        return null;
                    }
                    var q = p1.Add(d.Multiply(t));
                    var r = v2.Subtract(v1);
                    var rr = r.Dot(r);
                    if (rr == 0.0) {
                        return null;
                    }
                    var s = (q.Subtract(v1)).Dot(r) / rr;
                    if (s < 0.0 || 1.0 < s) {
                        return null;
                    }
                    var output = new PhysicsType2d.Collision.RayCastOutput();
                    output.fraction = t;
                    if (numerator > 0.0) {
                        output.normal = normal.Negative();
                    }
                    else {
                        output.normal = normal;
                    }
                    return output;
                };
                EdgeShape.prototype.ComputeAABB = function (xf, childIndex) { var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox(); var v1 = xf.ApplyToVector2(this.m_vertex1); var v2 = xf.ApplyToVector2(this.m_vertex2); var lower = PhysicsType2d.Vector2.Min(v1, v2); var upper = PhysicsType2d.Vector2.Max(v1, v2); var r = new PhysicsType2d.Vector2(this.m_radius, this.m_radius); aabb.lowerBound = lower.Subtract(r); aabb.upperBound = upper.Add(r); return aabb; };
                EdgeShape.prototype.ComputeMass = function (density) { var massData = new PhysicsType2d.Collision.Shapes.MassData(); massData.mass = 0.0; massData.center = (this.m_vertex1.Add(this.m_vertex2)).Multiply(0.5); massData.I = 0.0; return massData; };
                EdgeShape.prototype.Set = function (v1, v2) { this.m_vertex1 = v1; this.m_vertex2 = v2; this.m_hasVertex0 = false; this.m_hasVertex3 = false; };
                return EdgeShape;
            })();
            Shapes.EdgeShape = EdgeShape;
        })(Collision.Shapes || (Collision.Shapes = {}));
        var Shapes = Collision.Shapes;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        (function (Shapes) {
            var ChainShape = (function () {
                function ChainShape() { this.m_prevVertex = new PhysicsType2d.Vector2(0, 0); this.m_nextVertex = new PhysicsType2d.Vector2(0, 0); this.m_radius = PhysicsType2d.Settings.polygonRadius; this.m_vertices = []; this.m_hasPrevVertex = null; this.m_hasNextVertex = null; }
                ChainShape.prototype.Clone = function () { var clone = new ChainShape(); clone.m_hasNextVertex = this.m_hasNextVertex; clone.m_hasPrevVertex = this.m_hasPrevVertex; clone.m_nextVertex = this.m_nextVertex.Clone(); clone.m_prevVertex = this.m_prevVertex.Clone(); clone.m_vertices = this.m_vertices.map(function (value, index, array) { return value.Clone(); }); clone.m_radius = this.m_radius; return clone; };
                ChainShape.prototype.GetRadius = function () { return this.m_radius; };
                ChainShape.prototype.GetType = function () { return 3; };
                ChainShape.prototype.CreateLoop = function (vertices) { PhysicsType2d.Assert(this.m_vertices.length == 0); PhysicsType2d.Assert(vertices.length >= 3); this.m_vertices = vertices.slice(0); this.m_vertices.push(this.m_vertices[0]); this.m_prevVertex = this.m_vertices[this.m_vertices.length - 2]; this.m_nextVertex = this.m_vertices[1]; this.m_hasPrevVertex = true; this.m_hasNextVertex = true; };
                ChainShape.prototype.CreateChain = function (vertices) { PhysicsType2d.Assert(this.m_vertices.length == 0); PhysicsType2d.Assert(vertices.length >= 2); this.m_vertices = vertices.slice(0); this.m_hasPrevVertex = false; this.m_hasNextVertex = false; };
                ChainShape.prototype.SetPrevVertex = function (prevVertex) { this.m_prevVertex = prevVertex; this.m_hasPrevVertex = true; };
                ChainShape.prototype.SetNextVertex = function (nextVertex) { this.m_nextVertex = nextVertex; this.m_hasNextVertex = true; };
                ChainShape.prototype.GetChildEdge = function (index) {
                    PhysicsType2d.Assert(0 <= index && index < this.m_vertices.length - 1);
                    var edge = new PhysicsType2d.Collision.Shapes.EdgeShape();
                    edge.m_radius = this.m_radius;
                    edge.m_vertex1 = this.m_vertices[index + 0];
                    edge.m_vertex2 = this.m_vertices[index + 1];
                    if (index > 0) {
                        edge.m_vertex0 = this.m_vertices[index - 1];
                        edge.m_hasVertex0 = true;
                    }
                    else {
                        edge.m_vertex0 = this.m_prevVertex;
                        edge.m_hasVertex0 = this.m_hasPrevVertex;
                    }
                    if (index < this.m_vertices.length - 2) {
                        edge.m_vertex3 = this.m_vertices[index + 2];
                        edge.m_hasVertex3 = true;
                    }
                    else {
                        edge.m_vertex3 = this.m_nextVertex;
                        edge.m_hasVertex3 = this.m_hasNextVertex;
                    }
                    return edge;
                };
                ChainShape.prototype.GetChildCount = function () { return this.m_vertices.length - 1; };
                ChainShape.prototype.TestPoint = function (xf, p) { return false; };
                ChainShape.prototype.RayCast = function (input, xf, childIndex) {
                    PhysicsType2d.Assert(childIndex < this.m_vertices.length);
                    var edgeShape = new PhysicsType2d.Collision.Shapes.EdgeShape();
                    var i1 = childIndex;
                    var i2 = childIndex + 1;
                    if (i2 == this.m_vertices.length) {
                        i2 = 0;
                    }
                    edgeShape.m_vertex1 = this.m_vertices[i1];
                    edgeShape.m_vertex2 = this.m_vertices[i2];
                    return edgeShape.RayCast(input, xf, 0);
                };
                ChainShape.prototype.ComputeAABB = function (xf, childIndex) {
                    PhysicsType2d.Assert(childIndex < this.m_vertices.length);
                    var i1 = childIndex;
                    var i2 = childIndex + 1;
                    if (i2 == this.m_vertices.length) {
                        i2 = 0;
                    }
                    var v1 = xf.ApplyToVector2(this.m_vertices[i1]);
                    var v2 = xf.ApplyToVector2(this.m_vertices[i2]);
                    var aabb = new PhysicsType2d.Collision.AxisAlignedBoundingBox();
                    aabb.lowerBound = PhysicsType2d.Vector2.Min(v1, v2);
                    aabb.upperBound = PhysicsType2d.Vector2.Max(v1, v2);
                    return aabb;
                };
                ChainShape.prototype.ComputeMass = function (density) { var massData = new PhysicsType2d.Collision.Shapes.MassData(); massData.mass = 0.0; massData.center.SetZero(); massData.I = 0.0; return massData; };
                return ChainShape;
            })();
            Shapes.ChainShape = ChainShape;
        })(Collision.Shapes || (Collision.Shapes = {}));
        var Shapes = Collision.Shapes;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        var DistanceProxy = (function () {
            function DistanceProxy() { this.m_vertices = null; this.m_radius = 0.0; }
            DistanceProxy.prototype.Clone = function () { var clone = new DistanceProxy(); clone.m_vertices = this.m_vertices.slice(0); clone.m_radius = this.m_radius; return clone; };
            DistanceProxy.prototype.Set = function (shape, index) {
                this.m_vertices = [];
                switch (shape.GetType()) {
                    case 0:
                        {
                            var circle = shape;
                            this.m_vertices = [circle.m_p];
                            this.m_radius = circle.m_radius;
                        }
                        break;
                    case 2:
                        {
                            var polygon = shape;
                            this.m_vertices = polygon.m_vertices;
                            this.m_radius = polygon.m_radius;
                        }
                        break;
                    case 3:
                        {
                            var chain = shape;
                            PhysicsType2d.Assert(0 <= index && index < chain.m_vertices.length);
                            this.m_vertices[0] = chain.m_vertices[index];
                            if (index + 1 < chain.m_vertices.length) {
                                this.m_vertices[1] = chain.m_vertices[index + 1];
                            }
                            else {
                                this.m_vertices[1] = chain.m_vertices[0];
                            }
                            this.m_radius = chain.m_radius;
                        }
                        break;
                    case 1:
                        {
                            var edge = shape;
                            this.m_vertices = [edge.m_vertex1, edge.m_vertex2];
                            this.m_radius = edge.m_radius;
                        }
                        break;
                    default: PhysicsType2d.Assert(false);
                }
            };
            DistanceProxy.prototype.GetSupport = function (d) {
                var bestIndex = 0;
                var bestValue = this.m_vertices[0].Dot(d);
                for (var i = 1; i < this.m_vertices.length; ++i) {
                    var value = this.m_vertices[i].Dot(d);
                    if (value > bestValue) {
                        bestIndex = i;
                        bestValue = value;
                    }
                }
                return bestIndex;
            };
            DistanceProxy.prototype.GetSupportVertex = function (d) {
                var bestIndex = 0;
                var bestValue = this.m_vertices[0].Dot(d);
                for (var i = 1; i < this.m_vertices.length; ++i) {
                    var value = this.m_vertices[i].Dot(d);
                    if (value > bestValue) {
                        bestIndex = i;
                        bestValue = value;
                    }
                }
                return this.m_vertices[bestIndex];
            };
            DistanceProxy.prototype.GetVertexCount = function () { return this.m_vertices.length; };
            DistanceProxy.prototype.GetVertex = function (index) { PhysicsType2d.Assert(0 <= index && index < this.m_vertices.length); return this.m_vertices[index]; };
            return DistanceProxy;
        })();
        Collision.DistanceProxy = DistanceProxy;
        var SimplexCache = (function () {
            function SimplexCache() { this.metric = 0; this.Clear(); }
            SimplexCache.prototype.Count = function () { return this.index.length; };
            SimplexCache.prototype.Clear = function () { this.index = []; };
            SimplexCache.prototype.AddIndices = function (iA, iB) { this.index.push({ A: iA, B: iB }); };
            SimplexCache.prototype.GetA = function (i) { return this.index[i].A; };
            SimplexCache.prototype.GetB = function (i) { return this.index[i].B; };
            SimplexCache.prototype.Clone = function () { var clone = new SimplexCache(); clone.metric = this.metric; clone.index = this.index.slice(0); return clone; };
            return SimplexCache;
        })();
        Collision.SimplexCache = SimplexCache;
        var DistanceInput = (function () {
            function DistanceInput() { this.proxyA = new DistanceProxy(); this.proxyB = new DistanceProxy(); this.transformA = new PhysicsType2d.Transform(); this.transformB = new PhysicsType2d.Transform(); }
            DistanceInput.prototype.Clone = function () { var clone = new DistanceInput(); clone.proxyA = this.proxyA.Clone(); clone.proxyB = this.proxyB.Clone(); clone.transformA = this.transformA.Clone(); clone.transformB = this.transformB.Clone(); clone.useRadii = this.useRadii; return clone; };
            return DistanceInput;
        })();
        Collision.DistanceInput = DistanceInput;
        var DistanceOutput = (function () {
            function DistanceOutput() { this.pointA = new PhysicsType2d.Vector2(0, 0); this.pointB = new PhysicsType2d.Vector2(0, 0); }
            DistanceOutput.prototype.Clone = function () { var clone = new DistanceOutput(); clone.pointA = this.pointA.Clone(); clone.pointB = this.pointB.Clone(); clone.distance = this.distance; clone.iterations = this.iterations; return clone; };
            return DistanceOutput;
        })();
        Collision.DistanceOutput = DistanceOutput;
        function Distance(cache, input) {
            ++gjk.Calls;
            var proxyA = input.proxyA;
            var proxyB = input.proxyB;
            var transformA = input.transformA;
            var transformB = input.transformB;
            var simplex = new Simplex();
            simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
            var vertices = simplex.GetAsArray();
            var k_maxIters = 20;
            var saveA = [];
            var saveB = [];
            var saveCount = 0;
            var closestPoint = simplex.GetClosestPoint();
            var distanceSqr1 = closestPoint.LengthSquared();
            var distanceSqr2 = distanceSqr1;
            var iter = 0;
            while (iter < k_maxIters) {
                saveCount = simplex.m_count;
                for (var i = 0; i < saveCount; ++i) {
                    saveA[i] = vertices[i].indexA;
                    saveB[i] = vertices[i].indexB;
                }
                switch (simplex.m_count) {
                    case 1: break;
                    case 2:
                        simplex.Solve2();
                        break;
                    case 3:
                        simplex.Solve3();
                        break;
                    default: PhysicsType2d.Assert(false);
                }
                if (simplex.m_count == 3) {
                    break;
                }
                var p = simplex.GetClosestPoint();
                distanceSqr2 = p.LengthSquared();
                if (distanceSqr2 >= distanceSqr1) { }
                distanceSqr1 = distanceSqr2;
                var d = simplex.GetSearchDirection();
                if (d.LengthSquared() < PhysicsType2d.Constants.EPSILON * PhysicsType2d.Constants.EPSILON) {
                    break;
                }
                var vertex = vertices[simplex.m_count];
                vertex.indexA = proxyA.GetSupport(transformA.q.ApplyTransposeToVector2(d.Negative()));
                vertex.wA = transformA.ApplyToVector2(proxyA.GetVertex(vertex.indexA));
                vertex.indexB = proxyB.GetSupport(transformB.q.ApplyTransposeToVector2(d));
                vertex.wB = transformB.ApplyToVector2(proxyB.GetVertex(vertex.indexB));
                vertex.w = vertex.wB.Subtract(vertex.wA);
                ++iter;
                ++gjk.Iters;
                var duplicate = false;
                for (var i = 0; i < saveCount; ++i) {
                    if (vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
                        duplicate = true;
                        break;
                    }
                }
                if (duplicate) {
                    break;
                }
                ++simplex.m_count;
            }
            gjk.MaxIters = Math.max(gjk.MaxIters, iter);
            var output = new DistanceOutput();
            var witnessPoints = simplex.GetWitnessPoints();
            output.pointA = witnessPoints.A;
            output.pointB = witnessPoints.B;
            output.distance = output.pointA.DistanceFrom(output.pointB);
            output.iterations = iter;
            simplex.WriteCache(cache);
            if (input.useRadii) {
                var rA = proxyA.m_radius;
                var rB = proxyB.m_radius;
                if (output.distance > rA + rB && output.distance > PhysicsType2d.Constants.EPSILON) {
                    output.distance -= rA + rB;
                    var normal = output.pointB.Subtract(output.pointA);
                    normal.Normalize();
                    output.pointA = output.pointA.Add(normal.Multiply(rA));
                    output.pointB = output.pointB.Subtract(normal.Multiply(rB));
                }
                else {
                    var p = (output.pointA.Add(output.pointB)).Multiply(0.5);
                    output.pointA = p;
                    output.pointB = p;
                    output.distance = 0.0;
                }
            }
            return output;
        }
        Collision.Distance = Distance;
        var gjk = (function () {
            function gjk() { }
            gjk.Calls = 0;
            gjk.Iters = 0;
            gjk.MaxIters = 0;
            return gjk;
        })();
        Collision.gjk = gjk;
        var SimplexVertex = (function () {
            function SimplexVertex() { this.wA = new PhysicsType2d.Vector2(0, 0); this.wB = new PhysicsType2d.Vector2(0, 0); this.w = new PhysicsType2d.Vector2(0, 0); this.a = 0; this.indexA = 0; this.indexB = 0; }
            SimplexVertex.prototype.Clone = function () { var clone = new SimplexVertex(); clone.wA = this.wA.Clone(); clone.wB = this.wB.Clone(); clone.w = this.w.Clone(); clone.a = this.a; clone.indexA = this.indexA; clone.indexB = this.indexB; return clone; };
            return SimplexVertex;
        })();
        var Simplex = (function () {
            function Simplex() { this.m_v1 = new SimplexVertex(); this.m_v2 = new SimplexVertex(); this.m_v3 = new SimplexVertex(); this.m_count = 0; }
            Simplex.prototype.Clone = function () { var clone = new Simplex(); clone.m_v1 = this.m_v1.Clone(); clone.m_v2 = this.m_v2.Clone(); clone.m_v3 = this.m_v3.Clone(); clone.m_count = this.m_count; return clone; };
            Simplex.prototype.GetAsArray = function () { return [this.m_v1, this.m_v2, this.m_v3]; };
            Simplex.prototype.Set = function (i, vertex) { switch (i) {
                case 0:
                    this.m_v1 = vertex;
                    break;
                case 1:
                    this.m_v2 = vertex;
                    break;
                case 2:
                    this.m_v3 = vertex;
                    break;
                default: PhysicsType2d.Assert(false, "Index does not exist for SimplexCache.");
            } };
            Simplex.prototype.SetFromArray = function (vertices) { this.m_v1 = vertices[0]; this.m_v2 = vertices[1]; this.m_v3 = vertices[2]; };
            Simplex.prototype.ReadCache = function (cache, proxyA, transformA, proxyB, transformB) {
                PhysicsType2d.Assert(cache.Count() <= 3);
                this.m_count = cache.Count();
                var vertices = this.GetAsArray();
                for (var i = 0; i < this.m_count; ++i) {
                    var v = vertices[i];
                    v.indexA = cache.GetA(i);
                    v.indexB = cache.GetB(i);
                    var wALocal = proxyA.GetVertex(v.indexA);
                    var wBLocal = proxyB.GetVertex(v.indexB);
                    v.wA = transformA.ApplyToVector2(wALocal);
                    v.wB = transformB.ApplyToVector2(wBLocal);
                    v.w = v.wB.Subtract(v.wA);
                    v.a = 0.0;
                }
                if (this.m_count > 1) {
                    var metric1 = cache.metric;
                    var metric2 = this.GetMetric();
                    if (metric2 < 0.5 * metric1 || 2.0 * metric1 < metric2 || metric2 < PhysicsType2d.Constants.EPSILON) {
                        this.m_count = 0;
                    }
                }
                if (this.m_count == 0) {
                    var v = vertices[0];
                    v.indexA = 0;
                    v.indexB = 0;
                    var wALocal = proxyA.GetVertex(0);
                    var wBLocal = proxyB.GetVertex(0);
                    v.wA = transformA.ApplyToVector2(wALocal);
                    v.wB = transformB.ApplyToVector2(wBLocal);
                    v.w = v.wB.Subtract(v.wA);
                    this.m_count = 1;
                }
                this.SetFromArray(vertices);
            };
            Simplex.prototype.WriteCache = function (cache) { cache.metric = this.GetMetric(); var vertices = this.GetAsArray(); cache.Clear(); for (var i = 0; i < this.m_count; ++i) {
                cache.AddIndices(vertices[i].indexA, vertices[i].indexB);
            } };
            Simplex.prototype.GetSearchDirection = function () {
                switch (this.m_count) {
                    case 1: return this.m_v1.w.Negative();
                    case 2: {
                        var e12 = this.m_v2.w.Subtract(this.m_v1.w);
                        var sgn = e12.Cross(this.m_v1.w.Negative());
                        if (sgn > 0.0) {
                            return PhysicsType2d.MathExtensions.Cross1x2(1.0, e12);
                        }
                        else {
                            return PhysicsType2d.MathExtensions.Cross2x1(e12, 1.0);
                        }
                    }
                    default:
                        PhysicsType2d.Assert(false);
                        return PhysicsType2d.Vector2.Zero();
                }
            };
            Simplex.prototype.GetClosestPoint = function () { switch (this.m_count) {
                case 0:
                    PhysicsType2d.Assert(false);
                    return PhysicsType2d.Vector2.Zero();
                case 1: return this.m_v1.w;
                case 2: return (this.m_v1.w.Multiply(this.m_v1.a)).Add(this.m_v2.w.Multiply(this.m_v2.a));
                case 3: return PhysicsType2d.Vector2.Zero();
                default:
                    PhysicsType2d.Assert(false);
                    return PhysicsType2d.Vector2.Zero();
            } };
            Simplex.prototype.GetWitnessPoints = function () {
                var p;
                switch (this.m_count) {
                    case 0:
                        PhysicsType2d.Assert(false);
                        break;
                    case 1:
                        p = { A: this.m_v1.wA, B: this.m_v1.wB };
                        break;
                    case 2:
                        p = { A: (this.m_v1.wA.Multiply(this.m_v1.a)).Add(this.m_v2.wA.Multiply(this.m_v2.a)), B: (this.m_v1.wB.Multiply(this.m_v1.a)).Add(this.m_v2.wB.Multiply(this.m_v2.a)) };
                        break;
                    case 3:
                        var a = (this.m_v1.wA.Multiply(this.m_v1.a)).Add(this.m_v2.wA.Multiply(this.m_v2.a)).Add(this.m_v3.wA.Multiply(this.m_v3.a));
                        p = { A: a, B: a };
                        break;
                    default:
                        PhysicsType2d.Assert(false);
                        break;
                }
                return p;
            };
            Simplex.prototype.GetMetric = function () { switch (this.m_count) {
                case 0:
                    PhysicsType2d.Assert(false);
                    return 0.0;
                case 1: return 0.0;
                case 2: return this.m_v1.w.DistanceFrom(this.m_v2.w);
                case 3: return (this.m_v2.w.Subtract(this.m_v1.w)).Cross(this.m_v3.w.Subtract(this.m_v1.w));
                default:
                    PhysicsType2d.Assert(false);
                    return 0.0;
            } };
            Simplex.prototype.Solve2 = function () {
                var w1 = this.m_v1.w;
                var w2 = this.m_v2.w;
                var e12 = w2.Subtract(w1);
                var d12_2 = -w1.Dot(e12);
                if (d12_2 <= 0.0) {
                    this.m_v1.a = 1.0;
                    this.m_count = 1;
                    return;
                }
                var d12_1 = w2.Dot(e12);
                if (d12_1 <= 0.0) {
                    this.m_v2.a = 1.0;
                    this.m_count = 1;
                    this.m_v1 = this.m_v2.Clone();
                    return;
                }
                var inv_d12 = 1.0 / (d12_1 + d12_2);
                this.m_v1.a = d12_1 * inv_d12;
                this.m_v2.a = d12_2 * inv_d12;
                this.m_count = 2;
            };
            Simplex.prototype.Solve3 = function () {
                var w1 = this.m_v1.w;
                var w2 = this.m_v2.w;
                var w3 = this.m_v3.w;
                var e12 = w2.Subtract(w1);
                var w1e12 = w1.Dot(e12);
                var w2e12 = w2.Dot(e12);
                var d12_1 = w2e12;
                var d12_2 = -w1e12;
                var e13 = w3.Subtract(w1);
                var w1e13 = w1.Dot(e13);
                var w3e13 = w3.Dot(e13);
                var d13_1 = w3e13;
                var d13_2 = -w1e13;
                var e23 = w3.Subtract(w2);
                var w2e23 = w2.Dot(e23);
                var w3e23 = w3.Dot(e23);
                var d23_1 = w3e23;
                var d23_2 = -w2e23;
                var n123 = e12.Cross(e13);
                var d123_1 = n123 * w2.Cross(w3);
                var d123_2 = n123 * w3.Cross(w1);
                var d123_3 = n123 * w1.Cross(w2);
                if (d12_2 <= 0.0 && d13_2 <= 0.0) {
                    this.m_v1.a = 1.0;
                    this.m_count = 1;
                    return;
                }
                if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
                    var inv_d12 = 1.0 / (d12_1 + d12_2);
                    this.m_v1.a = d12_1 * inv_d12;
                    this.m_v2.a = d12_2 * inv_d12;
                    this.m_count = 2;
                    return;
                }
                if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
                    var inv_d13 = 1.0 / (d13_1 + d13_2);
                    this.m_v1.a = d13_1 * inv_d13;
                    this.m_v3.a = d13_2 * inv_d13;
                    this.m_count = 2;
                    this.m_v2 = this.m_v3.Clone();
                    return;
                }
                if (d12_1 <= 0.0 && d23_2 <= 0.0) {
                    this.m_v2.a = 1.0;
                    this.m_count = 1;
                    this.m_v1 = this.m_v2.Clone();
                    return;
                }
                if (d13_1 <= 0.0 && d23_1 <= 0.0) {
                    this.m_v3.a = 1.0;
                    this.m_count = 1;
                    this.m_v1 = this.m_v3.Clone();
                    return;
                }
                if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
                    var inv_d23 = 1.0 / (d23_1 + d23_2);
                    this.m_v2.a = d23_1 * inv_d23;
                    this.m_v3.a = d23_2 * inv_d23;
                    this.m_count = 2;
                    this.m_v1 = this.m_v3.Clone();
                    return;
                }
                var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
                this.m_v1.a = d123_1 * inv_d123;
                this.m_v2.a = d123_2 * inv_d123;
                this.m_v3.a = d123_3 * inv_d123;
                this.m_count = 3;
            };
            return Simplex;
        })();
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        (function (PointState) { PointState[PointState["NULL"] = 0] = "NULL"; PointState[PointState["ADD"] = 1] = "ADD"; PointState[PointState["PERSIST"] = 2] = "PERSIST"; PointState[PointState["REMOVE"] = 3] = "REMOVE"; })(Collision.PointState || (Collision.PointState = {}));
        var PointState = Collision.PointState;
        function GetPointStates(manifold1, manifold2) {
            var transition = { state1: PhysicsType2d.Utils.AllocateArray(PhysicsType2d.Settings.maxManifoldPoints, function () { return 0; }), state2: PhysicsType2d.Utils.AllocateArray(PhysicsType2d.Settings.maxManifoldPoints, function () { return 0; }) };
            for (var i = 0; i < manifold1.points.length; ++i) {
                var id = manifold1.points[i].id;
                transition.state1[i] = 3;
                for (var j = 0; j < manifold2.points.length; ++j) {
                    if (manifold2.points[j].id.key == id.key) {
                        transition.state1[i] = 2;
                        break;
                    }
                }
            }
            for (var i = 0; i < manifold2.points.length; ++i) {
                var id = manifold2.points[i].id;
                transition.state2[i] = 1;
                for (var j = 0; j < manifold1.points.length; ++j) {
                    if (manifold1.points[j].id.key == id.key) {
                        transition.state2[i] = 2;
                        break;
                    }
                }
            }
            return transition;
        }
        Collision.GetPointStates = GetPointStates;
        function ClipSegmentToLine(vIn, normal, offset, vertexIndexA) {
            var vOut = [];
            var distance0 = normal.Dot(vIn[0].v) - offset;
            var distance1 = normal.Dot(vIn[1].v) - offset;
            if (distance0 <= 0.0) {
                vOut.push(vIn[0]);
            }
            if (distance1 <= 0.0) {
                vOut.push(vIn[1]);
            }
            if (distance0 * distance1 < 0.0) {
                var interp = distance0 / (distance0 - distance1);
                var vertex = new PhysicsType2d.Collision.ClipVertex();
                vertex.v = vIn[0].v.Add((vIn[1].v.Subtract(vIn[0].v)).Multiply(interp));
                vertex.id.cf.indexA = vertexIndexA;
                vertex.id.cf.indexB = vIn[0].id.cf.indexB;
                vertex.id.cf.typeA = 0;
                vertex.id.cf.typeB = 1;
                vOut.push(vertex);
            }
            return vOut;
        }
        Collision.ClipSegmentToLine = ClipSegmentToLine;
        function TestOverlap(shapeA, indexA, shapeB, indexB, xfA, xfB) { var input = new PhysicsType2d.Collision.DistanceInput(); input.proxyA.Set(shapeA, indexA); input.proxyB.Set(shapeB, indexB); input.transformA = xfA; input.transformB = xfB; input.useRadii = true; var cache = new PhysicsType2d.Collision.SimplexCache(); var output = PhysicsType2d.Collision.Distance(cache, input); return output.distance < 10.0 * PhysicsType2d.Constants.EPSILON; }
        Collision.TestOverlap = TestOverlap;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        function CollideEdgeAndCircle(manifold, edgeA, xfA, circleB, xfB) {
            manifold.points = [];
            var Q = xfA.ApplyTransposeToVector2(xfB.ApplyToVector2(circleB.m_p));
            var A = edgeA.m_vertex1;
            var B = edgeA.m_vertex2;
            var e = B.Subtract(A);
            var u = PhysicsType2d.MathExtensions.Dot(e, B.Subtract(Q));
            var v = PhysicsType2d.MathExtensions.Dot(e, Q.Subtract(A));
            var radius = edgeA.m_radius + circleB.m_radius;
            var cf = new PhysicsType2d.Collision.ContactFeature();
            cf.indexB = 0;
            cf.typeB = 0;
            if (v <= 0.0) {
                var P = A;
                var d = Q.Subtract(P);
                var dd = PhysicsType2d.MathExtensions.Dot(d, d);
                if (dd > radius * radius) {
                    return manifold;
                }
                if (edgeA.m_hasVertex0) {
                    var A1 = edgeA.m_vertex0;
                    var B1 = A;
                    var e1 = B1.Subtract(A1);
                    var u1 = PhysicsType2d.MathExtensions.Dot(e1, B1.Subtract(Q));
                    if (u1 > 0.0) {
                        return manifold;
                    }
                }
                cf.indexA = 0;
                cf.typeA = 0;
                manifold.type = 0;
                manifold.localNormal.SetZero();
                manifold.localPoint = P;
                manifold.points[0] = new PhysicsType2d.Collision.ManifoldPoint();
                manifold.points[0].id.key = 0;
                manifold.points[0].id.cf = cf;
                manifold.points[0].localPoint = circleB.m_p;
                return manifold;
            }
            if (u <= 0.0) {
                var P = B;
                var d = Q.Subtract(P);
                var dd = PhysicsType2d.MathExtensions.Dot(d, d);
                if (dd > radius * radius) {
                    return manifold;
                }
                if (edgeA.m_hasVertex3) {
                    var B2 = edgeA.m_vertex3;
                    var A2 = B;
                    var e2 = B2.Subtract(A2);
                    var v2 = PhysicsType2d.MathExtensions.Dot(e2, Q.Subtract(A2));
                    if (v2 > 0.0) {
                        return manifold;
                    }
                }
                cf.indexA = 1;
                cf.typeA = 0;
                manifold.type = 0;
                manifold.localNormal.SetZero();
                manifold.localPoint = P;
                manifold.points[0] = new PhysicsType2d.Collision.ManifoldPoint();
                manifold.points[0].id.key = 0;
                manifold.points[0].id.cf = cf;
                manifold.points[0].localPoint = circleB.m_p;
                return manifold;
            }
            var den = PhysicsType2d.MathExtensions.Dot(e, e);
            PhysicsType2d.Assert(den > 0.0);
            var P = ((A.Multiply(u)).Add(B.Multiply(v))).Multiply(1.0 / den);
            var d = Q.Subtract(P);
            var dd = PhysicsType2d.MathExtensions.Dot(d, d);
            if (dd > radius * radius) {
                return manifold;
            }
            var n = new PhysicsType2d.Vector2(-e.y, e.x);
            if (PhysicsType2d.MathExtensions.Dot(n, Q.Subtract(A)) < 0.0) {
                n.Set(-n.x, -n.y);
            }
            n.Normalize();
            cf.indexA = 0;
            cf.typeA = 1;
            manifold.type = 1;
            manifold.localNormal = n;
            manifold.localPoint = A;
            manifold.points[0] = new PhysicsType2d.Collision.ManifoldPoint();
            manifold.points[0].id.key = 0;
            manifold.points[0].id.cf = cf;
            manifold.points[0].localPoint = circleB.m_p;
            return manifold;
        }
        Collision.CollideEdgeAndCircle = CollideEdgeAndCircle;
        var AxisType;
        (function (AxisType) { AxisType[AxisType["UNKNOWN"] = 0] = "UNKNOWN"; AxisType[AxisType["EDGE_A"] = 1] = "EDGE_A"; AxisType[AxisType["EDGE_B"] = 2] = "EDGE_B"; })(AxisType || (AxisType = {}));
        ;
        var EPAxis = (function () {
            function EPAxis() { }
            return EPAxis;
        })();
        var TempPolygon = (function () {
            function TempPolygon() { this.vertices = []; this.normals = []; }
            return TempPolygon;
        })();
        var ReferenceFace = (function () {
            function ReferenceFace() { this.v1 = new PhysicsType2d.Vector2(0, 0); this.v2 = new PhysicsType2d.Vector2(0, 0); this.normal = new PhysicsType2d.Vector2(0, 0); this.sideNormal1 = new PhysicsType2d.Vector2(0, 0); this.sideNormal2 = new PhysicsType2d.Vector2(0, 0); }
            return ReferenceFace;
        })();
        var EPCollider = (function () {
            function EPCollider() { this.m_polygonB = new TempPolygon(); this.m_xf = new PhysicsType2d.Transform(); this.m_centroidB = new PhysicsType2d.Vector2(0, 0); this.m_v0 = new PhysicsType2d.Vector2(0, 0); this.m_v1 = new PhysicsType2d.Vector2(0, 0); this.m_v2 = new PhysicsType2d.Vector2(0, 0); this.m_v3 = new PhysicsType2d.Vector2(0, 0); this.m_normal0 = new PhysicsType2d.Vector2(0, 0); this.m_normal1 = new PhysicsType2d.Vector2(0, 0); this.m_normal2 = new PhysicsType2d.Vector2(0, 0); this.m_normal = new PhysicsType2d.Vector2(0, 0); this.m_lowerLimit = new PhysicsType2d.Vector2(0, 0); this.m_upperLimit = new PhysicsType2d.Vector2(0, 0); }
            EPCollider.prototype.Collide = function (manifold, edgeA, xfA, polygonB, xfB) {
                this.m_xf = xfA.MultiplyTranspose(xfB);
                this.m_centroidB = this.m_xf.ApplyToVector2(polygonB.m_centroid);
                this.m_v0 = edgeA.m_vertex0;
                this.m_v1 = edgeA.m_vertex1;
                this.m_v2 = edgeA.m_vertex2;
                this.m_v3 = edgeA.m_vertex3;
                var hasVertex0 = edgeA.m_hasVertex0;
                var hasVertex3 = edgeA.m_hasVertex3;
                var edge1 = this.m_v2.Subtract(this.m_v1);
                edge1.Normalize();
                this.m_normal1.Set(edge1.y, -edge1.x);
                var offset1 = PhysicsType2d.MathExtensions.Dot(this.m_normal1, this.m_centroidB.Subtract(this.m_v1));
                var offset0 = 0.0, offset2 = 0.0;
                var convex1 = false, convex2 = false;
                if (hasVertex0) {
                    var edge0 = this.m_v1.Subtract(this.m_v0);
                    edge0.Normalize();
                    this.m_normal0.Set(edge0.y, -edge0.x);
                    convex1 = PhysicsType2d.MathExtensions.Cross2x2(edge0, edge1) >= 0.0;
                    offset0 = PhysicsType2d.MathExtensions.Dot(this.m_normal0, this.m_centroidB.Subtract(this.m_v0));
                }
                if (hasVertex3) {
                    var edge2 = this.m_v3.Subtract(this.m_v2);
                    edge2.Normalize();
                    this.m_normal2.Set(edge2.y, -edge2.x);
                    convex2 = PhysicsType2d.MathExtensions.Cross2x2(edge1, edge2) > 0.0;
                    offset2 = PhysicsType2d.MathExtensions.Dot(this.m_normal2, this.m_centroidB.Subtract(this.m_v2));
                }
                if (hasVertex0 && hasVertex3) {
                    if (convex1 && convex2) {
                        this.m_front = offset0 >= 0.0 || offset1 >= 0.0 || offset2 >= 0.0;
                        if (this.m_front) {
                            this.m_normal = this.m_normal1;
                            this.m_lowerLimit = this.m_normal0;
                            this.m_upperLimit = this.m_normal2;
                        }
                        else {
                            this.m_normal = this.m_normal1.Negative();
                            this.m_lowerLimit = this.m_normal1.Negative();
                            this.m_upperLimit = this.m_normal1.Negative();
                        }
                    }
                    else if (convex1) {
                        this.m_front = offset0 >= 0.0 || (offset1 >= 0.0 && offset2 >= 0.0);
                        if (this.m_front) {
                            this.m_normal = this.m_normal1;
                            this.m_lowerLimit = this.m_normal0;
                            this.m_upperLimit = this.m_normal1;
                        }
                        else {
                            this.m_normal = this.m_normal1.Negative();
                            this.m_lowerLimit = this.m_normal2.Negative();
                            this.m_upperLimit = this.m_normal1.Negative();
                        }
                    }
                    else if (convex2) {
                        this.m_front = offset2 >= 0.0 || (offset0 >= 0.0 && offset1 >= 0.0);
                        if (this.m_front) {
                            this.m_normal = this.m_normal1;
                            this.m_lowerLimit = this.m_normal1;
                            this.m_upperLimit = this.m_normal2;
                        }
                        else {
                            this.m_normal = this.m_normal1.Negative();
                            this.m_lowerLimit = this.m_normal1.Negative();
                            this.m_upperLimit = this.m_normal0.Negative();
                        }
                    }
                    else {
                        this.m_front = offset0 >= 0.0 && offset1 >= 0.0 && offset2 >= 0.0;
                        if (this.m_front) {
                            this.m_normal = this.m_normal1;
                            this.m_lowerLimit = this.m_normal1;
                            this.m_upperLimit = this.m_normal1;
                        }
                        else {
                            this.m_normal = this.m_normal1.Negative();
                            this.m_lowerLimit = this.m_normal2.Negative();
                            this.m_upperLimit = this.m_normal0.Negative();
                        }
                    }
                }
                else if (hasVertex0) {
                    if (convex1) {
                        this.m_front = offset0 >= 0.0 || offset1 >= 0.0;
                        if (this.m_front) {
                            this.m_normal = this.m_normal1;
                            this.m_lowerLimit = this.m_normal0;
                            this.m_upperLimit = this.m_normal1.Negative();
                        }
                        else {
                            this.m_normal = this.m_normal1.Negative();
                            this.m_lowerLimit = this.m_normal1;
                            this.m_upperLimit = this.m_normal1.Negative();
                        }
                    }
                    else {
                        this.m_front = offset0 >= 0.0 && offset1 >= 0.0;
                        if (this.m_front) {
                            this.m_normal = this.m_normal1;
                            this.m_lowerLimit = this.m_normal1;
                            this.m_upperLimit = this.m_normal1.Negative();
                        }
                        else {
                            this.m_normal = this.m_normal1.Negative();
                            this.m_lowerLimit = this.m_normal1;
                            this.m_upperLimit = this.m_normal0.Negative();
                        }
                    }
                }
                else if (hasVertex3) {
                    if (convex2) {
                        this.m_front = offset1 >= 0.0 || offset2 >= 0.0;
                        if (this.m_front) {
                            this.m_normal = this.m_normal1;
                            this.m_lowerLimit = this.m_normal1.Negative();
                            this.m_upperLimit = this.m_normal2;
                        }
                        else {
                            this.m_normal = this.m_normal1.Negative();
                            this.m_lowerLimit = this.m_normal1.Negative();
                            this.m_upperLimit = this.m_normal1;
                        }
                    }
                    else {
                        this.m_front = offset1 >= 0.0 && offset2 >= 0.0;
                        if (this.m_front) {
                            this.m_normal = this.m_normal1;
                            this.m_lowerLimit = this.m_normal1.Negative();
                            this.m_upperLimit = this.m_normal1;
                        }
                        else {
                            this.m_normal = this.m_normal1.Negative();
                            this.m_lowerLimit = this.m_normal2.Negative();
                            this.m_upperLimit = this.m_normal1;
                        }
                    }
                }
                else {
                    this.m_front = offset1 >= 0.0;
                    if (this.m_front) {
                        this.m_normal = this.m_normal1;
                        this.m_lowerLimit = this.m_normal1.Negative();
                        this.m_upperLimit = this.m_normal1.Negative();
                    }
                    else {
                        this.m_normal = this.m_normal1.Negative();
                        this.m_lowerLimit = this.m_normal1;
                        this.m_upperLimit = this.m_normal1;
                    }
                }
                this.m_polygonB.vertices = new Array(polygonB.m_vertices.length);
                for (var i = 0; i < polygonB.m_vertices.length; ++i) {
                    this.m_polygonB.vertices[i] = this.m_xf.ApplyToVector2(polygonB.m_vertices[i]);
                    this.m_polygonB.normals[i] = this.m_xf.q.ApplyToVector2(polygonB.m_normals[i]);
                }
                this.m_radius = 2.0 * PhysicsType2d.Settings.polygonRadius;
                manifold.points = [];
                var edgeAxis = this.ComputeEdgeSeparation();
                if (edgeAxis.type == 0) {
                    return manifold;
                }
                if (edgeAxis.separation > this.m_radius) {
                    return manifold;
                }
                var polygonAxis = this.ComputePolygonSeparation();
                if (polygonAxis.type != 0 && polygonAxis.separation > this.m_radius) {
                    return manifold;
                }
                var k_relativeTol = 0.98;
                var k_absoluteTol = 0.001;
                var primaryAxis;
                if (polygonAxis.type == 0) {
                    primaryAxis = edgeAxis;
                }
                else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
                    primaryAxis = polygonAxis;
                }
                else {
                    primaryAxis = edgeAxis;
                }
                var ie = [];
                var rf = new ReferenceFace();
                if (primaryAxis.type == 1) {
                    manifold.type = 1;
                    var bestIndex = 0;
                    var bestValue = PhysicsType2d.MathExtensions.Dot(this.m_normal, this.m_polygonB.normals[0]);
                    for (var i = 1; i < this.m_polygonB.normals.length; ++i) {
                        var value = PhysicsType2d.MathExtensions.Dot(this.m_normal, this.m_polygonB.normals[i]);
                        if (value < bestValue) {
                            bestValue = value;
                            bestIndex = i;
                        }
                    }
                    var i1 = bestIndex;
                    var i2 = i1 + 1 < this.m_polygonB.vertices.length ? i1 + 1 : 0;
                    ie[0] = new PhysicsType2d.Collision.ClipVertex();
                    ie[0].v = this.m_polygonB.vertices[i1];
                    ie[0].id.cf.indexA = 0;
                    ie[0].id.cf.indexB = i1;
                    ie[0].id.cf.typeA = 1;
                    ie[0].id.cf.typeB = 0;
                    ie[1] = new PhysicsType2d.Collision.ClipVertex();
                    ie[1].v = this.m_polygonB.vertices[i2];
                    ie[1].id.cf.indexA = 0;
                    ie[1].id.cf.indexB = i2;
                    ie[1].id.cf.typeA = 1;
                    ie[1].id.cf.typeB = 0;
                    if (this.m_front) {
                        rf.i1 = 0;
                        rf.i2 = 1;
                        rf.v1 = this.m_v1;
                        rf.v2 = this.m_v2;
                        rf.normal = this.m_normal1;
                    }
                    else {
                        rf.i1 = 1;
                        rf.i2 = 0;
                        rf.v1 = this.m_v2;
                        rf.v2 = this.m_v1;
                        rf.normal = this.m_normal1.Negative();
                    }
                }
                else {
                    manifold.type = 2;
                    ie[0] = new PhysicsType2d.Collision.ClipVertex();
                    ie[0].v = this.m_v1;
                    ie[0].id.cf.indexA = 0;
                    ie[0].id.cf.indexB = primaryAxis.index;
                    ie[0].id.cf.typeA = 0;
                    ie[0].id.cf.typeB = 1;
                    ie[1] = new PhysicsType2d.Collision.ClipVertex();
                    ie[1].v = this.m_v2;
                    ie[1].id.cf.indexA = 0;
                    ie[1].id.cf.indexB = primaryAxis.index;
                    ie[1].id.cf.typeA = 0;
                    ie[1].id.cf.typeB = 1;
                    rf.i1 = primaryAxis.index;
                    rf.i2 = rf.i1 + 1 < this.m_polygonB.vertices.length ? rf.i1 + 1 : 0;
                    rf.v1 = this.m_polygonB.vertices[rf.i1];
                    rf.v2 = this.m_polygonB.vertices[rf.i2];
                    rf.normal = this.m_polygonB.normals[rf.i1];
                }
                rf.sideNormal1.Set(rf.normal.y, -rf.normal.x);
                rf.sideNormal2 = rf.sideNormal1.Negative();
                rf.sideOffset1 = PhysicsType2d.MathExtensions.Dot(rf.sideNormal1, rf.v1);
                rf.sideOffset2 = PhysicsType2d.MathExtensions.Dot(rf.sideNormal2, rf.v2);
                var clipPoints1 = PhysicsType2d.Collision.ClipSegmentToLine(ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
                if (clipPoints1.length < PhysicsType2d.Settings.maxManifoldPoints) {
                    return manifold;
                }
                var clipPoints2 = PhysicsType2d.Collision.ClipSegmentToLine(clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
                if (clipPoints2.length < PhysicsType2d.Settings.maxManifoldPoints) {
                    return manifold;
                }
                if (primaryAxis.type == 1) {
                    manifold.localNormal = rf.normal;
                    manifold.localPoint = rf.v1;
                }
                else {
                    manifold.localNormal = polygonB.m_normals[rf.i1];
                    manifold.localPoint = polygonB.m_vertices[rf.i1];
                }
                manifold.points = [];
                for (var i = 0; i < clipPoints2.length; ++i) {
                    var separation = PhysicsType2d.MathExtensions.Dot(rf.normal, clipPoints2[i].v.Subtract(rf.v1));
                    if (separation <= this.m_radius) {
                        var cp = new PhysicsType2d.Collision.ManifoldPoint();
                        if (primaryAxis.type == 1) {
                            cp.localPoint = this.m_xf.ApplyTransposeToVector2(clipPoints2[i].v);
                            cp.id = clipPoints2[i].id;
                        }
                        else {
                            cp.localPoint = clipPoints2[i].v;
                            cp.id.cf.typeA = clipPoints2[i].id.cf.typeB;
                            cp.id.cf.typeB = clipPoints2[i].id.cf.typeA;
                            cp.id.cf.indexA = clipPoints2[i].id.cf.indexB;
                            cp.id.cf.indexB = clipPoints2[i].id.cf.indexA;
                        }
                        manifold.points.push(cp);
                    }
                }
                return manifold;
            };
            EPCollider.prototype.ComputeEdgeSeparation = function () {
                var axis = new EPAxis();
                axis.type = 1;
                axis.index = this.m_front ? 0 : 1;
                axis.separation = PhysicsType2d.Constants.MAX_FLOAT;
                for (var i = 0; i < this.m_polygonB.vertices.length; ++i) {
                    var s = PhysicsType2d.MathExtensions.Dot(this.m_normal, this.m_polygonB.vertices[i].Subtract(this.m_v1));
                    if (s < axis.separation) {
                        axis.separation = s;
                    }
                }
                return axis;
            };
            EPCollider.prototype.ComputePolygonSeparation = function () {
                var axis = new EPAxis();
                axis.type = 0;
                axis.index = -1;
                axis.separation = -PhysicsType2d.Constants.MAX_FLOAT;
                var perp = new PhysicsType2d.Vector2(-this.m_normal.y, this.m_normal.x);
                for (var i = 0; i < this.m_polygonB.vertices.length; ++i) {
                    var n = this.m_polygonB.normals[i].Negative();
                    var s1 = PhysicsType2d.MathExtensions.Dot(n, this.m_polygonB.vertices[i].Subtract(this.m_v1));
                    var s2 = PhysicsType2d.MathExtensions.Dot(n, this.m_polygonB.vertices[i].Subtract(this.m_v2));
                    var s = Math.min(s1, s2);
                    if (s > this.m_radius) {
                        axis.type = 2;
                        axis.index = i;
                        axis.separation = s;
                        return axis;
                    }
                    if (PhysicsType2d.MathExtensions.Dot(n, perp) >= 0.0) {
                        if (PhysicsType2d.MathExtensions.Dot(n.Subtract(this.m_upperLimit), this.m_normal) < -PhysicsType2d.Settings.angularSlop) {
                            continue;
                        }
                    }
                    else {
                        if (PhysicsType2d.MathExtensions.Dot(n.Subtract(this.m_lowerLimit), this.m_normal) < -PhysicsType2d.Settings.angularSlop) {
                            continue;
                        }
                    }
                    if (s > axis.separation) {
                        axis.type = 2;
                        axis.index = i;
                        axis.separation = s;
                    }
                }
                return axis;
            };
            return EPCollider;
        })();
        var EPColliderVertexType;
        (function (EPColliderVertexType) { EPColliderVertexType[EPColliderVertexType["ISOLATED"] = 0] = "ISOLATED"; EPColliderVertexType[EPColliderVertexType["CONCAVE"] = 1] = "CONCAVE"; EPColliderVertexType[EPColliderVertexType["CONVEX"] = 2] = "CONVEX"; })(EPColliderVertexType || (EPColliderVertexType = {}));
        function CollideEdgeAndPolygon(manifold, edgeA, xfA, polygonB, xfB) { var collider = new EPCollider(); return collider.Collide(manifold, edgeA, xfA, polygonB, xfB); }
        Collision.CollideEdgeAndPolygon = CollideEdgeAndPolygon;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        function EdgeSeparation(poly1, xf1, edge1, poly2, xf2) {
            var vertices1 = poly1.m_vertices;
            var normals1 = poly1.m_normals;
            var count2 = poly2.m_vertices.length;
            var vertices2 = poly2.m_vertices;
            PhysicsType2d.Assert(0 <= edge1 && edge1 < poly1.m_vertices.length);
            var normal1World = xf1.q.ApplyToVector2(normals1[edge1]);
            var normal1 = xf2.q.ApplyTransposeToVector2(normal1World);
            var index = 0;
            var minDot = PhysicsType2d.Constants.MAX_FLOAT;
            for (var i = 0; i < count2; ++i) {
                var dot = PhysicsType2d.MathExtensions.Dot(vertices2[i], normal1);
                if (dot < minDot) {
                    minDot = dot;
                    index = i;
                }
            }
            var v1 = xf1.ApplyToVector2(vertices1[edge1]);
            var v2 = xf2.ApplyToVector2(vertices2[index]);
            return PhysicsType2d.MathExtensions.Dot(v2.Subtract(v1), normal1World);
        }
        function FindMaxSeparation(poly1, xf1, poly2, xf2) {
            var count1 = poly1.m_vertices.length;
            var normals1 = poly1.m_normals;
            var d = (xf2.ApplyToVector2(poly2.m_centroid)).Subtract(xf1.ApplyToVector2(poly1.m_centroid));
            var dLocal1 = xf1.q.ApplyTransposeToVector2(d);
            var edge = 0;
            var maxDot = -PhysicsType2d.Constants.MAX_FLOAT;
            for (var i = 0; i < count1; ++i) {
                var dot = PhysicsType2d.MathExtensions.Dot(normals1[i], dLocal1);
                if (dot > maxDot) {
                    maxDot = dot;
                    edge = i;
                }
            }
            var s = EdgeSeparation(poly1, xf1, edge, poly2, xf2);
            var prevEdge = (edge - 1) >= 0 ? edge - 1 : count1 - 1;
            var sPrev = EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
            var nextEdge = (edge + 1) < count1 ? edge + 1 : 0;
            var sNext = EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
            var bestEdge;
            var bestSeparation;
            var increment;
            if (sPrev > s && sPrev > sNext) {
                increment = -1;
                bestEdge = prevEdge;
                bestSeparation = sPrev;
            }
            else if (sNext > s) {
                increment = 1;
                bestEdge = nextEdge;
                bestSeparation = sNext;
            }
            else {
                var sep = { index: edge, separation: s };
                return sep;
            }
            for (;;) {
                if (increment == -1)
                    edge = (bestEdge - 1) >= 0 ? bestEdge - 1 : count1 - 1;
                else
                    edge = (bestEdge + 1) < count1 ? bestEdge + 1 : 0;
                s = EdgeSeparation(poly1, xf1, edge, poly2, xf2);
                if (s > bestSeparation) {
                    bestEdge = edge;
                    bestSeparation = s;
                }
                else {
                    break;
                }
            }
            var sep = { index: bestEdge, separation: bestSeparation };
            return sep;
        }
        function FindIncidentEdge(poly1, xf1, edge1, poly2, xf2) {
            var normals1 = poly1.m_normals;
            var count2 = poly2.m_vertices.length;
            var vertices2 = poly2.m_vertices;
            var normals2 = poly2.m_normals;
            PhysicsType2d.Assert(0 <= edge1 && edge1 < poly1.m_vertices.length);
            var normal1 = xf2.q.ApplyTransposeToVector2(xf1.q.ApplyToVector2(normals1[edge1]));
            var index = 0;
            var minDot = PhysicsType2d.Constants.MAX_FLOAT;
            for (var i = 0; i < count2; ++i) {
                var dot = PhysicsType2d.MathExtensions.Dot(normal1, normals2[i]);
                if (dot < minDot) {
                    minDot = dot;
                    index = i;
                }
            }
            var i1 = index;
            var i2 = (i1 + 1) < count2 ? i1 + 1 : 0;
            var c = [];
            c[0] = new PhysicsType2d.Collision.ClipVertex();
            c[0].v = xf2.ApplyToVector2(vertices2[i1]);
            c[0].id.cf.indexA = PhysicsType2d.MathExtensions.UInt8(edge1);
            c[0].id.cf.indexB = PhysicsType2d.MathExtensions.UInt8(i1);
            c[0].id.cf.typeA = 1;
            c[0].id.cf.typeB = 0;
            c[1] = new PhysicsType2d.Collision.ClipVertex();
            c[1].v = xf2.ApplyToVector2(vertices2[i2]);
            c[1].id.cf.indexA = PhysicsType2d.MathExtensions.UInt8(edge1);
            c[1].id.cf.indexB = PhysicsType2d.MathExtensions.UInt8(i2);
            c[1].id.cf.typeA = 1;
            c[1].id.cf.typeB = 0;
            return c;
        }
        function CollidePolygons(manifold, polyA, xfA, polyB, xfB) {
            var totalRadius = polyA.m_radius + polyB.m_radius;
            var maxSeparation = FindMaxSeparation(polyA, xfA, polyB, xfB);
            var edgeA = maxSeparation.index;
            var separationA = maxSeparation.separation;
            if (separationA > totalRadius) {
                return manifold;
            }
            maxSeparation = FindMaxSeparation(polyB, xfB, polyA, xfA);
            var edgeB = maxSeparation.index;
            var separationB = maxSeparation.separation;
            if (separationB > totalRadius) {
                return manifold;
            }
            var poly1;
            var poly2;
            var xf1;
            var xf2;
            var edge1;
            var flip;
            var k_relativeTol = 0.98;
            var k_absoluteTol = 0.001;
            if (separationB > k_relativeTol * separationA + k_absoluteTol) {
                poly1 = polyB;
                poly2 = polyA;
                xf1 = xfB.Clone();
                xf2 = xfA.Clone();
                edge1 = edgeB;
                manifold.type = 2;
                flip = 1;
            }
            else {
                poly1 = polyA;
                poly2 = polyB;
                xf1 = xfA.Clone();
                xf2 = xfB.Clone();
                edge1 = edgeA;
                manifold.type = 1;
                flip = 0;
            }
            var incidentEdge = FindIncidentEdge(poly1, xf1, edge1, poly2, xf2);
            var count1 = poly1.m_vertices.length;
            var vertices1 = poly1.m_vertices;
            var iv1 = edge1;
            var iv2 = (edge1 + 1) < count1 ? edge1 + 1 : 0;
            var v11 = vertices1[iv1];
            var v12 = vertices1[iv2];
            var localTangent = v12.Subtract(v11);
            localTangent.Normalize();
            var localNormal = PhysicsType2d.MathExtensions.Cross2x1(localTangent, 1.0);
            var planePoint = (v11.Add(v12)).Multiply(0.5);
            var tangent = xf1.q.ApplyToVector2(localTangent);
            var normal = PhysicsType2d.MathExtensions.Cross2x1(tangent, 1.0);
            v11 = xf1.ApplyToVector2(v11);
            v12 = xf1.ApplyToVector2(v12);
            var frontOffset = PhysicsType2d.MathExtensions.Dot(normal, v11);
            var sideOffset1 = -PhysicsType2d.MathExtensions.Dot(tangent, v11) + totalRadius;
            var sideOffset2 = PhysicsType2d.MathExtensions.Dot(tangent, v12) + totalRadius;
            var clipPoints1 = PhysicsType2d.Collision.ClipSegmentToLine(incidentEdge, tangent.Negative(), sideOffset1, iv1);
            ;
            if (clipPoints1.length < 2) {
                return manifold;
            }
            var clipPoints2 = PhysicsType2d.Collision.ClipSegmentToLine(clipPoints1, tangent, sideOffset2, iv2);
            if (clipPoints1.length < 2) {
                return manifold;
            }
            manifold.localNormal = localNormal;
            manifold.localPoint = planePoint;
            manifold.points = [];
            for (var i = 0; i < clipPoints2.length; ++i) {
                var separation = PhysicsType2d.MathExtensions.Dot(normal, clipPoints2[i].v) - frontOffset;
                if (separation <= totalRadius) {
                    var cp = new PhysicsType2d.Collision.ManifoldPoint();
                    cp.localPoint = xf2.ApplyTransposeToVector2(clipPoints2[i].v);
                    cp.id = clipPoints2[i].id;
                    if (flip) {
                        var cf = cp.id.cf;
                        cp.id.cf.indexA = cf.indexB;
                        cp.id.cf.indexB = cf.indexA;
                        cp.id.cf.typeA = cf.typeB;
                        cp.id.cf.typeB = cf.typeA;
                    }
                    manifold.points.push(cp);
                }
            }
            return manifold;
        }
        Collision.CollidePolygons = CollidePolygons;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        var TOIInput = (function () {
            function TOIInput() { this.proxyA = new PhysicsType2d.Collision.DistanceProxy(); this.proxyB = new PhysicsType2d.Collision.DistanceProxy(); this.sweepA = new PhysicsType2d.Sweep(); this.sweepB = new PhysicsType2d.Sweep(); }
            return TOIInput;
        })();
        Collision.TOIInput = TOIInput;
        (function (OutputState) { OutputState[OutputState["UNKNOWN"] = 0] = "UNKNOWN"; OutputState[OutputState["FAILED"] = 1] = "FAILED"; OutputState[OutputState["OVERLAPPED"] = 2] = "OVERLAPPED"; OutputState[OutputState["TOUCHING"] = 3] = "TOUCHING"; OutputState[OutputState["SEPARATED"] = 4] = "SEPARATED"; })(Collision.OutputState || (Collision.OutputState = {}));
        var OutputState = Collision.OutputState;
        var TOIOutput = (function () {
            function TOIOutput() { }
            return TOIOutput;
        })();
        Collision.TOIOutput = TOIOutput;
        var toi = (function () {
            function toi() { }
            toi.Calls = 0;
            toi.Iters = 0;
            toi.MaxIters = 0;
            toi.RootIters = 0;
            toi.MaxRootIters = 0;
            toi.Time = 0;
            toi.MaxTime = 0;
            return toi;
        })();
        Collision.toi = toi;
        var SeparationType;
        (function (SeparationType) { SeparationType[SeparationType["POINTS"] = 0] = "POINTS"; SeparationType[SeparationType["FACE_A"] = 1] = "FACE_A"; SeparationType[SeparationType["FACE_B"] = 2] = "FACE_B"; })(SeparationType || (SeparationType = {}));
        ;
        var SeparationFunction = (function () {
            function SeparationFunction() { this.m_localPoint = new PhysicsType2d.Vector2(0, 0); this.m_axis = new PhysicsType2d.Vector2(0, 0); }
            SeparationFunction.prototype.Initialize = function (cache, proxyA, sweepA, proxyB, sweepB, t1) {
                this.m_proxyA = proxyA;
                this.m_proxyB = proxyB;
                var count = cache.Count();
                PhysicsType2d.Assert(0 < count && count < 3);
                this.m_sweepA = sweepA;
                this.m_sweepB = sweepB;
                var xfA = this.m_sweepA.GetTransform(t1);
                var xfB = this.m_sweepB.GetTransform(t1);
                if (count == 1) {
                    this.m_type = 0;
                    var localPointA = this.m_proxyA.GetVertex(cache.GetA(0));
                    var localPointB = this.m_proxyB.GetVertex(cache.GetB(0));
                    var pointA = xfA.ApplyToVector2(localPointA);
                    var pointB = xfB.ApplyToVector2(localPointB);
                    this.m_axis = pointB.Subtract(pointA);
                    var s = this.m_axis.Normalize();
                    return s;
                }
                else if (cache.GetA(0) == cache.GetA(1)) {
                    this.m_type = 2;
                    var localPointB1 = proxyB.GetVertex(cache.GetB(0));
                    var localPointB2 = proxyB.GetVertex(cache.GetB(1));
                    this.m_axis = PhysicsType2d.MathExtensions.Cross2x1(localPointB2.Subtract(localPointB1), 1.0);
                    this.m_axis.Normalize();
                    var normal = xfB.q.ApplyToVector2(this.m_axis);
                    this.m_localPoint = (localPointB1.Add(localPointB2)).Multiply(0.5);
                    var pointB = xfB.ApplyToVector2(this.m_localPoint);
                    var localPointA = proxyA.GetVertex(cache.GetA(0));
                    var pointA = xfA.ApplyToVector2(localPointA);
                    var s = (pointA.Subtract(pointB)).Dot(normal);
                    if (s < 0.0) {
                        this.m_axis = this.m_axis.Negative();
                        s = -s;
                    }
                    return s;
                }
                else {
                    this.m_type = 1;
                    var localPointA1 = this.m_proxyA.GetVertex(cache.GetA(0));
                    var localPointA2 = this.m_proxyA.GetVertex(cache.GetA(1));
                    this.m_axis = PhysicsType2d.MathExtensions.Cross2x1(localPointA2.Subtract(localPointA1), 1.0);
                    this.m_axis.Normalize();
                    var normal = xfA.q.ApplyToVector2(this.m_axis);
                    this.m_localPoint = (localPointA1.Add(localPointA2)).Multiply(0.5);
                    var pointA = xfA.ApplyToVector2(this.m_localPoint);
                    var localPointB = this.m_proxyB.GetVertex(cache.GetB(0));
                    var pointB = xfB.ApplyToVector2(localPointB);
                    var s = (pointB.Subtract(pointA)).Dot(normal);
                    if (s < 0.0) {
                        this.m_axis = this.m_axis.Negative();
                        s = -s;
                    }
                    return s;
                }
            };
            SeparationFunction.prototype.FindMinSeparation = function (t) {
                var s = { indexA: 0, indexB: 0, separation: 0 };
                var xfA = this.m_sweepA.GetTransform(t);
                var xfB = this.m_sweepB.GetTransform(t);
                switch (this.m_type) {
                    case 0: {
                        var axisA = xfA.q.ApplyTransposeToVector2(this.m_axis);
                        var axisB = xfB.q.ApplyTransposeToVector2(this.m_axis.Negative());
                        s.indexA = this.m_proxyA.GetSupport(axisA);
                        s.indexB = this.m_proxyB.GetSupport(axisB);
                        var localPointA = this.m_proxyA.GetVertex(s.indexA);
                        var localPointB = this.m_proxyB.GetVertex(s.indexB);
                        var pointA = xfA.ApplyToVector2(localPointA);
                        var pointB = xfB.ApplyToVector2(localPointB);
                        s.separation = (pointB.Subtract(pointA)).Dot(this.m_axis);
                        return s;
                    }
                    case 1: {
                        var normal = xfA.q.ApplyToVector2(this.m_axis);
                        var pointA = xfA.ApplyToVector2(this.m_localPoint);
                        var axisB = xfB.q.ApplyTransposeToVector2(normal.Negative());
                        s.indexA = -1;
                        s.indexB = this.m_proxyB.GetSupport(axisB);
                        var localPointB = this.m_proxyB.GetVertex(s.indexB);
                        var pointB = xfB.ApplyToVector2(localPointB);
                        s.separation = (pointB.Subtract(pointA)).Dot(normal);
                        return s;
                    }
                    case 2: {
                        var normal = xfB.q.ApplyToVector2(this.m_axis);
                        var pointB = xfB.ApplyToVector2(this.m_localPoint);
                        var axisA = xfA.q.ApplyTransposeToVector2(normal.Negative());
                        s.indexB = -1;
                        s.indexA = this.m_proxyA.GetSupport(axisA);
                        var localPointA = this.m_proxyA.GetVertex(s.indexA);
                        var pointA = xfA.ApplyToVector2(localPointA);
                        s.separation = (pointA.Subtract(pointB)).Dot(normal);
                        return s;
                    }
                    default:
                        PhysicsType2d.Assert(false);
                        s.indexA = -1;
                        s.indexB = -1;
                        return s;
                }
            };
            SeparationFunction.prototype.Evaluate = function (sep, t) {
                var s = { indexA: sep.indexA, indexB: sep.indexB, separation: 0 };
                var xfA = this.m_sweepA.GetTransform(t);
                var xfB = this.m_sweepB.GetTransform(t);
                switch (this.m_type) {
                    case 0: {
                        var axisA = xfA.q.ApplyTransposeToVector2(this.m_axis);
                        var axisB = xfB.q.ApplyTransposeToVector2(this.m_axis.Negative());
                        var localPointA = this.m_proxyA.GetVertex(s.indexA);
                        var localPointB = this.m_proxyB.GetVertex(s.indexB);
                        var pointA = xfA.ApplyToVector2(localPointA);
                        var pointB = xfB.ApplyToVector2(localPointB);
                        s.separation = (pointB.Subtract(pointA)).Dot(this.m_axis);
                        return s;
                    }
                    case 1: {
                        var normal = xfA.q.ApplyToVector2(this.m_axis);
                        var pointA = xfA.ApplyToVector2(this.m_localPoint);
                        var axisB = xfB.q.ApplyTransposeToVector2(normal.Negative());
                        var localPointB = this.m_proxyB.GetVertex(s.indexB);
                        var pointB = xfB.ApplyToVector2(localPointB);
                        s.separation = (pointB.Subtract(pointA)).Dot(normal);
                        return s;
                    }
                    case 2: {
                        var normal = xfB.q.ApplyToVector2(this.m_axis);
                        var pointB = xfB.ApplyToVector2(this.m_localPoint);
                        var axisA = xfA.q.ApplyTransposeToVector2(normal.Negative());
                        var localPointA = this.m_proxyA.GetVertex(s.indexA);
                        var pointA = xfA.ApplyToVector2(localPointA);
                        s.separation = (pointA.Subtract(pointB)).Dot(normal);
                        return s;
                    }
                    default:
                        PhysicsType2d.Assert(false);
                        return s;
                }
            };
            return SeparationFunction;
        })();
        function TimeOfImpact(input) {
            ++toi.Calls;
            var output = new TOIOutput();
            output.state = 0;
            output.t = input.tMax;
            var proxyA = input.proxyA;
            var proxyB = input.proxyB;
            var sweepA = input.sweepA;
            var sweepB = input.sweepB;
            sweepA.Normalize();
            sweepB.Normalize();
            var tMax = input.tMax;
            var totalRadius = proxyA.m_radius + proxyB.m_radius;
            var target = Math.max(PhysicsType2d.Settings.linearSlop, totalRadius - 3.0 * PhysicsType2d.Settings.linearSlop);
            var tolerance = 0.25 * PhysicsType2d.Settings.linearSlop;
            PhysicsType2d.Assert(target > tolerance);
            var t1 = 0.0;
            var k_maxIterations = 20;
            var iter = 0;
            var cache = new PhysicsType2d.Collision.SimplexCache();
            var distanceInput = new PhysicsType2d.Collision.DistanceInput();
            distanceInput.proxyA = input.proxyA;
            distanceInput.proxyB = input.proxyB;
            distanceInput.useRadii = false;
            for (;;) {
                var xfA = sweepA.GetTransform(t1);
                var xfB = sweepB.GetTransform(t1);
                distanceInput.transformA = xfA;
                distanceInput.transformB = xfB;
                var distanceOutput = PhysicsType2d.Collision.Distance(cache, distanceInput);
                if (distanceOutput.distance <= 0.0) {
                    output.state = 2;
                    output.t = 0.0;
                    break;
                }
                if (distanceOutput.distance < target + tolerance) {
                    output.state = 3;
                    output.t = t1;
                    break;
                }
                var separationFunction = new SeparationFunction();
                separationFunction.Initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
                var done = false;
                var t2 = tMax;
                var pushBackIter = 0;
                for (;;) {
                    var s2 = separationFunction.FindMinSeparation(t2);
                    if (s2.separation > target + tolerance) {
                        output.state = 4;
                        output.t = tMax;
                        done = true;
                        break;
                    }
                    if (s2.separation > target - tolerance) {
                        t1 = t2;
                        break;
                    }
                    var s1 = separationFunction.Evaluate(s2, t1);
                    if (s1.separation < target - tolerance) {
                        output.state = 1;
                        output.t = t1;
                        done = true;
                        break;
                    }
                    if (s1.separation <= target + tolerance) {
                        output.state = 3;
                        output.t = t1;
                        done = true;
                        break;
                    }
                    var rootIterCount = 0;
                    var a1 = t1;
                    var a2 = t2;
                    for (;;) {
                        var t;
                        if (rootIterCount & 1) {
                            t = a1 + (target - s1.separation) * (a2 - a1) / (s2.separation - s1.separation);
                        }
                        else {
                            t = 0.5 * (a1 + a2);
                        }
                        var s = separationFunction.Evaluate(s1, t);
                        if (Math.abs(s.separation - target) < tolerance) {
                            t2 = t;
                            break;
                        }
                        if (s.separation > target) {
                            a1 = t;
                            s1 = s;
                        }
                        else {
                            a2 = t;
                            s2.separation = s.separation;
                        }
                        ++rootIterCount;
                        ++toi.RootIters;
                        if (rootIterCount == 50) {
                            break;
                        }
                    }
                    toi.MaxRootIters = Math.max(toi.MaxRootIters, rootIterCount);
                    ++pushBackIter;
                    if (pushBackIter == PhysicsType2d.Settings.maxPolygonVertices) {
                        break;
                    }
                }
                ++iter;
                ++toi.Iters;
                if (done) {
                    break;
                }
                if (iter == k_maxIterations) {
                    output.state = 1;
                    output.t = t1;
                    break;
                }
            }
            toi.MaxIters = Math.max(toi.MaxIters, iter);
            return output;
        }
        Collision.TimeOfImpact = TimeOfImpact;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Collision) {
        var WorldManifold = (function () {
            function WorldManifold() { this.normal = new PhysicsType2d.Vector2(0, 0); this.points = []; }
            WorldManifold.prototype.Initialize = function (manifold, xfA, radiusA, xfB, radiusB) {
                if (manifold.points.length === 0) {
                    return;
                }
                switch (manifold.type) {
                    case 0:
                        {
                            this.normal.Set(1.0, 0.0);
                            var pointA = xfA.ApplyToVector2(manifold.localPoint);
                            var pointB = xfB.ApplyToVector2(manifold.points[0].localPoint);
                            if (pointA.DistanceFromSquared(pointB) > (PhysicsType2d.Constants.EPSILON * PhysicsType2d.Constants.EPSILON)) {
                                this.normal = pointB.Subtract(pointA);
                                this.normal.Normalize();
                            }
                            var cA = pointA.Add(this.normal.Multiply(radiusA));
                            var cB = pointB.Subtract(this.normal.Multiply(radiusB));
                            this.points[0] = (cA.Add(cB)).Multiply(0.5);
                        }
                        break;
                    case 1:
                        {
                            this.normal = xfA.q.ApplyToVector2(manifold.localNormal);
                            var planePoint = xfA.ApplyToVector2(manifold.localPoint);
                            for (var i = 0; i < manifold.points.length; ++i) {
                                var clipPoint = xfB.ApplyToVector2(manifold.points[i].localPoint);
                                var cA = clipPoint.Add(this.normal.Multiply(radiusA - (clipPoint.Subtract(planePoint)).Dot(this.normal)));
                                var cB = clipPoint.Subtract(this.normal.Multiply(radiusB));
                                this.points[i] = (cA.Add(cB)).Multiply(0.5);
                            }
                        }
                        break;
                    case 2:
                        {
                            this.normal = xfB.q.ApplyToVector2(manifold.localNormal);
                            var planePoint = xfB.ApplyToVector2(manifold.localPoint);
                            for (var i = 0; i < manifold.points.length; ++i) {
                                var clipPoint = xfA.ApplyToVector2(manifold.points[i].localPoint);
                                var cB = clipPoint.Add(this.normal.Multiply((radiusB - (clipPoint.Subtract(planePoint)).Dot(this.normal))));
                                var cA = clipPoint.Subtract(this.normal.Multiply(radiusA));
                                this.points[i] = (cA.Add(cB)).Multiply(0.5);
                            }
                            this.normal = this.normal.Negative();
                        }
                        break;
                }
            };
            return WorldManifold;
        })();
        Collision.WorldManifold = WorldManifold;
    })(PhysicsType2d.Collision || (PhysicsType2d.Collision = {}));
    var Collision = PhysicsType2d.Collision;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (BodyType) { BodyType[BodyType["STATIC"] = 0] = "STATIC"; BodyType[BodyType["KINEMATIC"] = 1] = "KINEMATIC"; BodyType[BodyType["DYNAMIC"] = 2] = "DYNAMIC"; })(Dynamics.BodyType || (Dynamics.BodyType = {}));
        var BodyType = Dynamics.BodyType;
        (function (BodyFlags) { BodyFlags[BodyFlags["ISLAND"] = 0x0001] = "ISLAND"; BodyFlags[BodyFlags["AWAKE"] = 0x0002] = "AWAKE"; BodyFlags[BodyFlags["AUTO_SLEEP"] = 0x0004] = "AUTO_SLEEP"; BodyFlags[BodyFlags["BULLET"] = 0x0008] = "BULLET"; BodyFlags[BodyFlags["FIXED_ROTATION"] = 0x0010] = "FIXED_ROTATION"; BodyFlags[BodyFlags["ACTIVE"] = 0x0020] = "ACTIVE"; BodyFlags[BodyFlags["TOI"] = 0x0040] = "TOI"; })(Dynamics.BodyFlags || (Dynamics.BodyFlags = {}));
        var BodyFlags = Dynamics.BodyFlags;
        var BodyDefinition = (function () {
            function BodyDefinition() { this.position = new PhysicsType2d.Vector2(0, 0); this.linearVelocity = new PhysicsType2d.Vector2(0, 0); this.userData = null; this.angle = 0.0; this.angularVelocity = 0.0; this.linearDamping = 0.0; this.angularDamping = 0.0; this.allowSleep = true; this.awake = true; this.fixedRotation = false; this.bullet = false; this.type = 0; this.active = true; this.gravityScale = 1.0; }
            BodyDefinition.prototype.Clone = function () { var def = new BodyDefinition(); def.type = this.type; def.position = this.position.Clone(); def.angle = this.angle; def.linearVelocity = this.linearVelocity.Clone(); def.angularVelocity = this.angularVelocity; def.linearDamping = this.linearDamping; def.angularDamping = this.angularDamping; def.allowSleep = this.allowSleep; def.awake = this.awake; def.fixedRotation = this.fixedRotation; def.bullet = this.bullet; def.active = this.active; def.userData = this.userData; def.gravityScale = this.gravityScale; return def; };
            return BodyDefinition;
        })();
        Dynamics.BodyDefinition = BodyDefinition;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        var Filter = (function () {
            function Filter() { this.categoryBits = 0x0001; this.maskBits = 0xFFFF; this.groupIndex = 0; }
            Filter.prototype.Clone = function () { var f = new Filter(); f.categoryBits = this.categoryBits; f.maskBits = this.maskBits; f.groupIndex = this.groupIndex; return f; };
            return Filter;
        })();
        Dynamics.Filter = Filter;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        var FixtureDefinition = (function () {
            function FixtureDefinition() { this.shape = null; this.userData = null; this.friction = 0.2; this.restitution = 0.0; this.density = 0.0; this.isSensor = false; this.filter = new PhysicsType2d.Dynamics.Filter(); }
            FixtureDefinition.prototype.Clone = function () { var clone = new FixtureDefinition(); clone.density = this.density; clone.filter = this.filter; clone.friction = this.friction; clone.isSensor = this.isSensor; clone.restitution = this.restitution; clone.shape = this.shape.Clone(); clone.userData = this.userData; return clone; };
            return FixtureDefinition;
        })();
        Dynamics.FixtureDefinition = FixtureDefinition;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        var FixtureProxy = (function () {
            function FixtureProxy(fixture, aabb) { this.aabb = aabb; this.fixture = fixture; this.childIndex = 0; this.proxyId = -1; }
            FixtureProxy.prototype.Clone = function () { var clone = new FixtureProxy(this.fixture, this.aabb.Clone()); clone.childIndex; clone.proxyId; return clone; };
            return FixtureProxy;
        })();
        Dynamics.FixtureProxy = FixtureProxy;
        var Fixture = (function () {
            function Fixture() { this.m_userData = null; this.m_body = null; this.m_proxies = []; this.m_filter = null; this.m_shape = null; this.m_density = 0.0; }
            Fixture.prototype.GetType = function () { return this.m_shape.GetType(); };
            Fixture.prototype.GetShape = function () { return this.m_shape; };
            Fixture.prototype.SetSensor = function (sensor) { if (sensor != this.m_isSensor) {
                this.m_body.SetAwake(true);
                this.m_isSensor = sensor;
            } };
            Fixture.prototype.IsSensor = function () { return this.m_isSensor; };
            Fixture.prototype.SetFilterData = function (filter) { this.m_filter = filter; this.Refilter(); };
            Fixture.prototype.GetFilterData = function () { return this.m_filter; };
            Fixture.prototype.Refilter = function () {
                if (this.m_body == null) {
                    return;
                }
                var list = this.m_body.GetContactEdges();
                while (list.MoveNext()) {
                    var contact = list.Current().contact;
                    var fixtureA = contact.GetFixtureA();
                    var fixtureB = contact.GetFixtureB();
                    if (fixtureA == this || fixtureB == this) {
                        contact.FlagForFiltering();
                    }
                }
                var world = this.m_body.GetWorld();
                if (world == null) {
                    return;
                }
                var broadPhase = world.GetContactManager().m_broadPhase;
                for (var i = 0; i < this.m_proxies.length; ++i) {
                    broadPhase.TouchProxy(this.m_proxies[i].proxyId);
                }
            };
            Fixture.prototype.GetBody = function () { return this.m_body; };
            Fixture.prototype.GetUserData = function () { return this.m_userData; };
            Fixture.prototype.SetUserData = function (data) { this.m_userData = data; };
            Fixture.prototype.TestPoint = function (p) { return this.m_shape.TestPoint(this.m_body.GetTransform(), p); };
            Fixture.prototype.RayCast = function (input, childIndex) { return this.m_shape.RayCast(input, this.m_body.GetTransform(), childIndex); };
            Fixture.prototype.GetMassData = function () { return this.m_shape.ComputeMass(this.m_density); };
            Fixture.prototype.SetDensity = function (density) { PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(density) && density >= 0.0); this.m_density = density; };
            Fixture.prototype.GetDensity = function () { return this.m_density; };
            Fixture.prototype.GetFriction = function () { return this.m_friction; };
            Fixture.prototype.SetFriction = function (friction) { this.m_friction = friction; };
            Fixture.prototype.GetRestitution = function () { return this.m_restitution; };
            Fixture.prototype.SetRestitution = function (restitution) { this.m_restitution = restitution; };
            Fixture.prototype.GetAABB = function (childIndex) { PhysicsType2d.Assert(0 <= childIndex && childIndex < this.m_proxies.length); return this.m_proxies[childIndex].aabb.Clone(); };
            Fixture.prototype.Dump = function (bodyIndex) {
                PhysicsType2d.Utils.log("    FixtureDefinition fd;");
                PhysicsType2d.Utils.log("    fd.friction = {0};", this.m_friction);
                PhysicsType2d.Utils.log("    fd.restitution = {0};", this.m_restitution);
                PhysicsType2d.Utils.log("    fd.density = {0};", this.m_density);
                PhysicsType2d.Utils.log("    fd.isSensor = boolean({0});", this.m_isSensor);
                PhysicsType2d.Utils.log("    fd.filter.categoryBits = uint16({0});", this.m_filter.categoryBits);
                PhysicsType2d.Utils.log("    fd.filter.maskBits = uint16({0});", this.m_filter.maskBits);
                PhysicsType2d.Utils.log("    fd.filter.groupIndex = int16({0});", this.m_filter.groupIndex);
                switch (this.m_shape.GetType()) {
                    case 0:
                        (function () { var s = this.m_shape; PhysicsType2d.Utils.log("    CircleShape shape;"); PhysicsType2d.Utils.log("    shape.m_radius = {0};", s.m_radius); PhysicsType2d.Utils.log("    shape.m_p.Set({0}, {0});", s.m_p.x, s.m_p.y); })();
                        break;
                    case 1:
                        (function () { var s = this.m_shape; PhysicsType2d.Utils.log("    EdgeShape shape;"); PhysicsType2d.Utils.log("    shape.m_radius = {0};", s.m_radius); PhysicsType2d.Utils.log("    shape.m_vertex0.Set({0}, {1});", s.m_vertex0.x, s.m_vertex0.y); PhysicsType2d.Utils.log("    shape.m_vertex1.Set({0}, {1});", s.m_vertex1.x, s.m_vertex1.y); PhysicsType2d.Utils.log("    shape.m_vertex2.Set({0}, {1});", s.m_vertex2.x, s.m_vertex2.y); PhysicsType2d.Utils.log("    shape.m_vertex3.Set({0}, {1});", s.m_vertex3.x, s.m_vertex3.y); PhysicsType2d.Utils.log("    shape.m_hasVertex0 = boolean({0});", s.m_hasVertex0); PhysicsType2d.Utils.log("    shape.m_hasVertex3 = boolean({0});", s.m_hasVertex3); })();
                        break;
                    case 2:
                        (function () {
                            var s = this.m_shape;
                            PhysicsType2d.Utils.log("    PolygonShape shape;");
                            PhysicsType2d.Utils.log("    Vector2 vs[{0}];", PhysicsType2d.Settings.maxPolygonVertices);
                            for (var i = 0; i < s.m_vertices.length; ++i) {
                                PhysicsType2d.Utils.log("    vs[{0}].Set({0}, {1});", i, s.m_vertices[i].x, s.m_vertices[i].y);
                            }
                            PhysicsType2d.Utils.log("    shape.Set(vs, {0});", s.m_vertices.length);
                        })();
                        break;
                    case 3:
                        (function () {
                            var s = this.m_shape;
                            PhysicsType2d.Utils.log("    ChainShape shape;");
                            PhysicsType2d.Utils.log("    Vector2 vs[{0}];", s.m_vertices.length);
                            for (var i = 0; i < s.m_vertices.length; ++i) {
                                PhysicsType2d.Utils.log("    vs[{0}].Set({0}, {1});", i, s.m_vertices[i].x, s.m_vertices[i].y);
                            }
                            PhysicsType2d.Utils.log("    shape.CreateChain(vs, {0});", s.m_vertices.length);
                            PhysicsType2d.Utils.log("    shape.m_prevVertex.Set({0}, {1});", s.m_prevVertex.x, s.m_prevVertex.y);
                            PhysicsType2d.Utils.log("    shape.m_nextVertex.Set({0}, {1});", s.m_nextVertex.x, s.m_nextVertex.y);
                            PhysicsType2d.Utils.log("    shape.m_hasPrevVertex = boolean({0});", s.m_hasPrevVertex);
                            PhysicsType2d.Utils.log("    shape.m_hasNextVertex = boolean({0});", s.m_hasNextVertex);
                        })();
                        break;
                    default: return;
                }
                PhysicsType2d.Utils.log("    fd.shape = &shape;");
                PhysicsType2d.Utils.log("    bodies[{0}].CreateFixture(&fd);", bodyIndex);
            };
            Fixture.Create = function (body, def) { var newFixture = new Fixture(); newFixture.m_userData = def.userData; newFixture.m_friction = def.friction; newFixture.m_restitution = def.restitution; newFixture.m_body = body; newFixture.m_filter = def.filter.Clone(); newFixture.m_isSensor = def.isSensor; newFixture.m_shape = def.shape.Clone(); newFixture.m_proxies = []; newFixture.m_density = def.density; return newFixture; };
            Fixture.prototype.Destroy = function (forceProxies) {
                if (forceProxies !== true) {
                    PhysicsType2d.Assert(this.m_proxies.length == 0);
                }
                this.m_proxies = null;
                this.m_shape = null;
            };
            Fixture.prototype.CreateProxies = function (broadPhase, xf) { PhysicsType2d.Assert(this.m_proxies.length == 0); var count = this.m_shape.GetChildCount(); this.m_proxies = new Array(count); for (var i = 0; i < count; ++i) {
                var proxy = new FixtureProxy(this, this.m_shape.ComputeAABB(xf, i));
                proxy.proxyId = broadPhase.CreateProxy(proxy.aabb, proxy);
                proxy.childIndex = i;
                this.m_proxies[i] = proxy;
            } };
            Fixture.prototype.DestroyProxies = function (broadPhase) {
                for (var i = 0; i < this.m_proxies.length; ++i) {
                    var proxy = this.m_proxies[i];
                    broadPhase.DestroyProxy(proxy.proxyId);
                    proxy.proxyId = -1;
                }
                this.m_proxies = [];
            };
            Fixture.prototype.Synchronize = function (broadPhase, xf1, xf2) {
                if (this.m_proxies.length == 0) {
                    return;
                }
                for (var i = 0; i < this.m_proxies.length; ++i) {
                    var proxy = this.m_proxies[i];
                    var aabb1 = this.m_shape.ComputeAABB(xf1, proxy.childIndex);
                    var aabb2 = this.m_shape.ComputeAABB(xf2, proxy.childIndex);
                    proxy.aabb.Combine(aabb1, aabb2);
                    var displacement = xf2.p.Subtract(xf1.p);
                    broadPhase.MoveProxy(proxy.proxyId, proxy.aabb, displacement);
                }
            };
            Fixture.prototype.ClearBody = function () { this.m_body = null; };
            Fixture.prototype.SetBody = function (body) { this.m_body = body; };
            Fixture.prototype.GetProxies = function () { return this.m_proxies; };
            Fixture.prototype.GetProxy = function (index) { return this.m_proxies[index]; };
            Fixture.prototype.GetProxyCount = function () { return this.m_proxies.length; };
            return Fixture;
        })();
        Dynamics.Fixture = Fixture;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        var Profile = (function () {
            function Profile() { this.step = 0; this.collide = 0; this.solve = 0; this.solveInit = 0; this.solveVelocity = 0; this.solvePosition = 0; this.broadphase = 0; this.solveTOI = 0; }
            return Profile;
        })();
        Dynamics.Profile = Profile;
        var TimeStep = (function () {
            function TimeStep() { this.dt = 0; this.inv_dt = 0; this.dtRatio = 0; this.velocityIterations = 0; this.positionIterations = 0; this.warmStarting = false; }
            return TimeStep;
        })();
        Dynamics.TimeStep = TimeStep;
        var Position = (function () {
            function Position(c, a) { this.c = c; this.a = a; }
            Position.prototype.Clone = function () { return new Position(this.c.Clone(), this.a); };
            return Position;
        })();
        Dynamics.Position = Position;
        var Velocity = (function () {
            function Velocity(v, w) { this.v = v; this.w = w; }
            Velocity.prototype.Clone = function () { return new Velocity(this.v.Clone(), this.w); };
            return Velocity;
        })();
        Dynamics.Velocity = Velocity;
        var SolverData = (function () {
            function SolverData(step, positions, velocities) { this.step = step; this.positions = positions; this.velocities = velocities; }
            return SolverData;
        })();
        Dynamics.SolverData = SolverData;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            (function (JointType) { JointType[JointType["UNKNOWN"] = 0] = "UNKNOWN"; JointType[JointType["REVOLUTE"] = 1] = "REVOLUTE"; JointType[JointType["PRISMATIC"] = 2] = "PRISMATIC"; JointType[JointType["DISTANCE"] = 3] = "DISTANCE"; JointType[JointType["PULLEY"] = 4] = "PULLEY"; JointType[JointType["MOUSE"] = 5] = "MOUSE"; JointType[JointType["GEAR"] = 6] = "GEAR"; JointType[JointType["WHEEL"] = 7] = "WHEEL"; JointType[JointType["WELD"] = 8] = "WELD"; JointType[JointType["FRICTION"] = 9] = "FRICTION"; JointType[JointType["ROPE"] = 10] = "ROPE"; JointType[JointType["MOTOR"] = 11] = "MOTOR"; })(Joints.JointType || (Joints.JointType = {}));
            var JointType = Joints.JointType;
            ;
            (function (LimitState) { LimitState[LimitState["INACTIVE_LIMIT"] = 0] = "INACTIVE_LIMIT"; LimitState[LimitState["AT_LOWER_LIMIT"] = 1] = "AT_LOWER_LIMIT"; LimitState[LimitState["AT_UPPER_LIMIT"] = 2] = "AT_UPPER_LIMIT"; LimitState[LimitState["EQUAL_LIMIT"] = 3] = "EQUAL_LIMIT"; })(Joints.LimitState || (Joints.LimitState = {}));
            var LimitState = Joints.LimitState;
            ;
            var Jacobian = (function () {
                function Jacobian() { this.linear = new PhysicsType2d.Vector2(0, 0); }
                return Jacobian;
            })();
            Joints.Jacobian = Jacobian;
            ;
            var JointDefinition = (function () {
                function JointDefinition() { this.type = 0; this.userData = null; this.bodyA = null; this.bodyB = null; this.collideConnected = false; }
                return JointDefinition;
            })();
            Joints.JointDefinition = JointDefinition;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var Joint = (function () {
                function Joint(def) { PhysicsType2d.Assert(def.bodyA != def.bodyB); this.m_type = def.type; this.m_bodyA = def.bodyA; this.m_bodyB = def.bodyB; this.m_index = 0; this.m_collideConnected = def.collideConnected; this.m_islandFlag = false; this.m_userData = def.userData; this.m_edgeA = new PhysicsType2d.Dynamics.Joints.JointEdge(); this.m_edgeA.joint = null; this.m_edgeA.other = null; this.m_edgeB = new PhysicsType2d.Dynamics.Joints.JointEdge(); this.m_edgeB.joint = null; this.m_edgeB.other = null; }
                Joint.prototype.GetType = function () { return this.m_type; };
                Joint.prototype.GetBodyA = function () { return this.m_bodyA; };
                Joint.prototype.GetBodyB = function () { return this.m_bodyB; };
                Joint.prototype.GetUserData = function () { return this.m_userData; };
                Joint.prototype.SetUserData = function (data) { this.m_userData = data; };
                Joint.prototype.IsActive = function () { return this.m_bodyA.IsActive() && this.m_bodyB.IsActive(); };
                Joint.prototype.GetCollideConnected = function () { return this.m_collideConnected; };
                Joint.prototype.Dump = function () { PhysicsType2d.Utils.log("// Dump is not supported for this joint type."); };
                Joint.Create = function (def) {
                    var joint = null;
                    switch (def.type) {
                        case 3:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.DistanceJoint(def);
                            }
                            break;
                        case 5:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.MouseJoint(def);
                            }
                            break;
                        case 2:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.PrismaticJoint(def);
                            }
                            break;
                        case 1:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.RevoluteJoint(def);
                            }
                            break;
                        case 4:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.PulleyJoint(def);
                            }
                            break;
                        case 6:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.GearJoint(def);
                            }
                            break;
                        case 7:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.WheelJoint(def);
                            }
                            break;
                        case 8:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.WeldJoint(def);
                            }
                            break;
                        case 9:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.FrictionJoint(def);
                            }
                            break;
                        case 10:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.RopeJoint(def);
                            }
                            break;
                        case 11:
                            {
                                joint = new PhysicsType2d.Dynamics.Joints.MotorJoint(def);
                            }
                            break;
                        default:
                            PhysicsType2d.Assert(false, "Unknown Joint Type.  Define the creation method.");
                            break;
                    }
                    return joint;
                };
                Joint.prototype.GetAnchorA = function () { PhysicsType2d.Assert(false); return null; };
                Joint.prototype.GetAnchorB = function () { PhysicsType2d.Assert(false); return null; };
                Joint.prototype.GetReactionForce = function (inv_dt) { PhysicsType2d.Assert(false); return null; };
                Joint.prototype.GetReactionTorque = function (inv_dt) { PhysicsType2d.Assert(false); return 0; };
                Joint.prototype.InitVelocityConstraints = function (data) { PhysicsType2d.Assert(false); };
                Joint.prototype.SolveVelocityConstraints = function (data) { PhysicsType2d.Assert(false); };
                Joint.prototype.SolvePositionConstraints = function (data) { PhysicsType2d.Assert(false); return false; };
                return Joint;
            })();
            Joints.Joint = Joint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            function MixFriction(friction1, friction2) { return Math.sqrt(friction1 * friction2); }
            Contacts.MixFriction = MixFriction;
            function MixRestitution(restitution1, restitution2) { return restitution1 > restitution2 ? restitution1 : restitution2; }
            Contacts.MixRestitution = MixRestitution;
            var ContactRegister = (function () {
                function ContactRegister() { }
                return ContactRegister;
            })();
            Contacts.ContactRegister = ContactRegister;
            var ContactEdge = (function () {
                function ContactEdge() { }
                ContactEdge.prototype.Clone = function () { var clone = new ContactEdge(); clone.other = this.other; clone.contact = this.contact; return clone; };
                return ContactEdge;
            })();
            Contacts.ContactEdge = ContactEdge;
            (function (ContactFlags) { ContactFlags[ContactFlags["ISLAND"] = 0x0001] = "ISLAND"; ContactFlags[ContactFlags["TOUCHING"] = 0x0002] = "TOUCHING"; ContactFlags[ContactFlags["ENABLED"] = 0x0004] = "ENABLED"; ContactFlags[ContactFlags["FILTER"] = 0x0008] = "FILTER"; ContactFlags[ContactFlags["BULLET_HIT"] = 0x0010] = "BULLET_HIT"; ContactFlags[ContactFlags["TOI"] = 0x0020] = "TOI"; })(Contacts.ContactFlags || (Contacts.ContactFlags = {}));
            var ContactFlags = Contacts.ContactFlags;
            var Contact = (function () {
                function Contact(fA, indexA, fB, indexB) { this.m_flags = new PhysicsType2d.BitFlag(4); this.m_fixtureA = fA; this.m_fixtureB = fB; this.m_indexA = indexA; this.m_indexB = indexB; this.m_manifold = new PhysicsType2d.Collision.Manifold(); this.m_nodeA = new ContactEdge(); this.m_nodeB = new ContactEdge(); this.m_nodeA.contact = null; this.m_nodeA.other = null; this.m_nodeB.contact = null; this.m_nodeB.other = null; this.m_toiCount = 0; this.m_toi = 0; this.m_friction = MixFriction(this.m_fixtureA.GetFriction(), this.m_fixtureB.GetFriction()); this.m_restitution = MixRestitution(this.m_fixtureA.GetRestitution(), this.m_fixtureB.GetRestitution()); }
                Contact.prototype.GetManifold = function () { return this.m_manifold; };
                Contact.prototype.GetWorldManifold = function () { var bodyA = this.m_fixtureA.GetBody(); var bodyB = this.m_fixtureB.GetBody(); var shapeA = this.m_fixtureA.GetShape(); var shapeB = this.m_fixtureB.GetShape(); var worldManifold = new PhysicsType2d.Collision.WorldManifold(); worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.GetRadius(), bodyB.GetTransform(), shapeB.GetRadius()); return worldManifold; };
                Contact.prototype.IsTouching = function () { return this.IsFlagSet(2); };
                Contact.prototype.SetEnabled = function (flag) { if (flag) {
                    this.SetFlag(4);
                }
                else {
                    this.ClearFlag(4);
                } };
                Contact.prototype.IsEnabled = function () { return this.IsFlagSet(4); };
                Contact.prototype.GetFixtureA = function () { return this.m_fixtureA; };
                Contact.prototype.GetChildIndexA = function () { return this.m_indexA; };
                Contact.prototype.GetFixtureB = function () { return this.m_fixtureB; };
                Contact.prototype.GetChildIndexB = function () { return this.m_indexB; };
                Contact.prototype.SetFriction = function (friction) { this.m_friction = friction; };
                Contact.prototype.GetFriction = function () { return this.m_friction; };
                Contact.prototype.ResetFriction = function () { this.m_friction = MixFriction(this.m_fixtureA.GetFriction(), this.m_fixtureB.GetFriction()); };
                Contact.prototype.SetRestitution = function (restitution) { this.m_restitution = restitution; };
                Contact.prototype.GetRestitution = function () { return this.m_restitution; };
                Contact.prototype.ResetRestitution = function () { this.m_restitution = MixRestitution(this.m_fixtureA.GetRestitution(), this.m_fixtureB.GetRestitution()); };
                Contact.prototype.FlagForFiltering = function () { this.SetFlag(8); };
                Contact.prototype.Evaluate = function (manifold, xfA, xfB) { throw Error("Abstract Method Not Implemented"); };
                Contact.InitializeRegisters = function () { Contact.AddType(PhysicsType2d.Dynamics.Contacts.CircleContact.Create, 0, 0); Contact.AddType(PhysicsType2d.Dynamics.Contacts.PolygonAndCircleContact.Create, 2, 0); Contact.AddType(PhysicsType2d.Dynamics.Contacts.PolygonContact.Create, 2, 2); Contact.AddType(PhysicsType2d.Dynamics.Contacts.EdgeAndCircleContact.Create, 1, 0); Contact.AddType(PhysicsType2d.Dynamics.Contacts.EdgeAndPolygonContact.Create, 1, 2); Contact.AddType(PhysicsType2d.Dynamics.Contacts.ChainAndCircleContact.Create, 3, 0); Contact.AddType(PhysicsType2d.Dynamics.Contacts.ChainAndPolygonContact.Create, 3, 2); };
                Contact.AddType = function (create, type1, type2) { PhysicsType2d.Assert(0 <= type1 && type1 < 4); PhysicsType2d.Assert(0 <= type2 && type2 < 4); Contact.s_registers[type1][type2].create = create; Contact.s_registers[type1][type2].primary = true; if (type1 != type2) {
                    Contact.s_registers[type2][type1].create = create;
                    Contact.s_registers[type2][type1].primary = false;
                } };
                Contact.Create = function (fixtureA, indexA, fixtureB, indexB) {
                    if (Contact.s_initialized == false) {
                        this.InitializeRegisters();
                        Contact.s_initialized = true;
                    }
                    var type1 = fixtureA.GetType();
                    var type2 = fixtureB.GetType();
                    PhysicsType2d.Assert(0 <= type1 && type1 < 4);
                    PhysicsType2d.Assert(0 <= type2 && type2 < 4);
                    var create = Contact.s_registers[type1][type2].create;
                    if (create) {
                        if (Contact.s_registers[type1][type2].primary) {
                            return create(fixtureA, indexA, fixtureB, indexB);
                        }
                        else {
                            return create(fixtureB, indexB, fixtureA, indexA);
                        }
                    }
                    else {
                        return null;
                    }
                };
                Contact.prototype.Destructor = function () {
                    PhysicsType2d.Assert(Contact.s_initialized == true);
                    if (this.m_manifold.points.length > 0) {
                        this.GetFixtureA().GetBody().SetAwake(true);
                        this.GetFixtureB().GetBody().SetAwake(true);
                    }
                    var typeA = this.GetFixtureA().GetType();
                    var typeB = this.GetFixtureB().GetType();
                    PhysicsType2d.Assert(0 <= typeA && typeB < 4);
                    PhysicsType2d.Assert(0 <= typeA && typeB < 4);
                };
                Contact.prototype.Update = function (listener) {
                    var oldManifold = this.m_manifold;
                    this.SetFlag(4);
                    var touching = false;
                    var wasTouching = this.IsFlagSet(2);
                    var sensorA = this.m_fixtureA.IsSensor();
                    var sensorB = this.m_fixtureB.IsSensor();
                    var sensor = sensorA || sensorB;
                    var bodyA = this.m_fixtureA.GetBody();
                    var bodyB = this.m_fixtureB.GetBody();
                    var xfA = bodyA.GetTransform();
                    var xfB = bodyB.GetTransform();
                    if (sensor) {
                        var shapeA = this.m_fixtureA.GetShape();
                        var shapeB = this.m_fixtureB.GetShape();
                        touching = PhysicsType2d.Collision.TestOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);
                        this.m_manifold.points = [];
                    }
                    else {
                        this.Evaluate(this.m_manifold, xfA, xfB);
                        touching = this.m_manifold.points.length > 0;
                        for (var i = 0; i < this.m_manifold.points.length; ++i) {
                            var mp2 = this.m_manifold.points[i];
                            mp2.normalImpulse = 0.0;
                            mp2.tangentImpulse = 0.0;
                            var id2 = mp2.id;
                            for (var j = 0; j < oldManifold.points.length; ++j) {
                                var mp1 = oldManifold.points[j];
                                if (mp1.id.key == id2.key) {
                                    mp2.normalImpulse = mp1.normalImpulse;
                                    mp2.tangentImpulse = mp1.tangentImpulse;
                                    break;
                                }
                            }
                        }
                        if (touching != wasTouching) {
                            bodyA.SetAwake(true);
                            bodyB.SetAwake(true);
                        }
                    }
                    if (touching) {
                        this.SetFlag(2);
                    }
                    else {
                        this.ClearFlag(2);
                    }
                    if (wasTouching == false && touching == true && listener) {
                        listener.BeginContact(this);
                    }
                    if (wasTouching == true && touching == false && listener) {
                        listener.EndContact(this);
                    }
                    if (sensor == false && touching && listener) {
                        listener.PreSolve(this, oldManifold);
                    }
                };
                Contact.prototype.SetFlag = function (flag) { this.m_flags.Set(flag); };
                Contact.prototype.ClearFlag = function (flag) { this.m_flags.Clear(flag); };
                Contact.prototype.IsFlagSet = function (desiredFlags) { return this.m_flags.IsSet(desiredFlags); };
                Contact.s_registers = PhysicsType2d.Utils.AllocateArray(4, function () { return PhysicsType2d.Utils.AllocateArray(4, function () { return new ContactRegister(); }); });
                Contact.s_initialized = false;
                return Contact;
            })();
            Contacts.Contact = Contact;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            var VelocityConstraintPoint = (function () {
                function VelocityConstraintPoint() { this.rA = new PhysicsType2d.Vector2(0, 0); this.rB = new PhysicsType2d.Vector2(0, 0); this.normalImpulse = 0; this.tangentImpulse = 0; this.normalMass = 0; this.tangentMass = 0; this.velocityBias = 0; }
                return VelocityConstraintPoint;
            })();
            Contacts.VelocityConstraintPoint = VelocityConstraintPoint;
            var ContactVelocityConstraint = (function () {
                function ContactVelocityConstraint() { this.points = []; this.normal = new PhysicsType2d.Vector2(0, 0); this.normalMass = new PhysicsType2d.Matrix2x2(); this.K = new PhysicsType2d.Matrix2x2(); }
                return ContactVelocityConstraint;
            })();
            Contacts.ContactVelocityConstraint = ContactVelocityConstraint;
            var ContactSolverDef = (function () {
                function ContactSolverDef() { this.step = new PhysicsType2d.Dynamics.TimeStep(); this.contacts = []; this.positions = []; this.velocities = []; }
                return ContactSolverDef;
            })();
            Contacts.ContactSolverDef = ContactSolverDef;
            var ContactPositionConstraint = (function () {
                function ContactPositionConstraint() { this.localPoints = []; this.localNormal = new PhysicsType2d.Vector2(0, 0); this.localPoint = new PhysicsType2d.Vector2(0, 0); this.indexA = 0; this.indexB = 0; this.invMassA = 0; this.invMassB = 0; this.localCenterA = new PhysicsType2d.Vector2(0, 0); this.localCenterB = new PhysicsType2d.Vector2(0, 0); this.invIA = 0; this.invIB = 0; this.type = 0; this.radiusA = 0; this.radiusB = 0; }
                return ContactPositionConstraint;
            })();
            Contacts.ContactPositionConstraint = ContactPositionConstraint;
            var PositionSolverManifold = (function () {
                function PositionSolverManifold() { this.normal = new PhysicsType2d.Vector2(0, 0); this.point = new PhysicsType2d.Vector2(0, 0); }
                PositionSolverManifold.prototype.Initialize = function (pc, xfA, xfB, index) {
                    PhysicsType2d.Assert(pc.localPoints.length > 0);
                    switch (pc.type) {
                        case 0:
                            {
                                var pointA = xfA.ApplyToVector2(pc.localPoint);
                                var pointB = xfB.ApplyToVector2(pc.localPoints[0]);
                                this.normal = pointB.Subtract(pointA);
                                this.normal.Normalize();
                                this.point = (pointA.Add(pointB)).Multiply(0.5);
                                this.separation = (pointB.Subtract(pointA)).Dot(this.normal) - pc.radiusA - pc.radiusB;
                            }
                            break;
                        case 1:
                            {
                                this.normal = xfA.q.ApplyToVector2(pc.localNormal);
                                var planePoint = xfA.ApplyToVector2(pc.localPoint);
                                var clipPoint = xfB.ApplyToVector2(pc.localPoints[index]);
                                this.separation = (clipPoint.Subtract(planePoint)).Dot(this.normal) - pc.radiusA - pc.radiusB;
                                this.point = clipPoint;
                            }
                            break;
                        case 2:
                            {
                                this.normal = xfB.q.ApplyToVector2(pc.localNormal);
                                var planePoint = xfB.ApplyToVector2(pc.localPoint);
                                var clipPoint = xfA.ApplyToVector2(pc.localPoints[index]);
                                this.separation = (clipPoint.Subtract(planePoint)).Dot(this.normal) - pc.radiusA - pc.radiusB;
                                this.point = clipPoint;
                                this.normal = this.normal.Negative();
                            }
                            break;
                    }
                };
                return PositionSolverManifold;
            })();
            var ContactSolver = (function () {
                function ContactSolver(def) {
                    this.m_step = def.step;
                    this.m_positionConstraints = [];
                    this.m_velocityConstraints = [];
                    this.m_positions = def.positions;
                    this.m_velocities = def.velocities;
                    this.m_contacts = def.contacts;
                    for (var i = 0; i < this.m_contacts.length; ++i) {
                        var contact = this.m_contacts[i];
                        var fixtureA = contact.GetFixtureA();
                        var fixtureB = contact.GetFixtureB();
                        var shapeA = fixtureA.GetShape();
                        var shapeB = fixtureB.GetShape();
                        var radiusA = shapeA.GetRadius();
                        var radiusB = shapeB.GetRadius();
                        var bodyA = fixtureA.GetBody();
                        var bodyB = fixtureB.GetBody();
                        var manifold = contact.GetManifold();
                        var pointCount = manifold.points.length;
                        PhysicsType2d.Assert(pointCount > 0);
                        var vc = new ContactVelocityConstraint();
                        vc.friction = contact.GetFriction();
                        vc.restitution = contact.GetRestitution();
                        vc.indexA = bodyA.GetIslandIndex();
                        vc.indexB = bodyB.GetIslandIndex();
                        vc.invMassA = bodyA.GetInvMass();
                        vc.invMassB = bodyB.GetInvMass();
                        vc.invIA = bodyA.GetInvI();
                        vc.invIB = bodyB.GetInvI();
                        vc.contactIndex = i;
                        vc.points = [];
                        vc.K.SetZero();
                        vc.normalMass.SetZero();
                        var pc = new ContactPositionConstraint();
                        pc.indexA = bodyA.GetIslandIndex();
                        pc.indexB = bodyB.GetIslandIndex();
                        pc.invMassA = bodyA.GetInvMass();
                        pc.invMassB = bodyB.GetInvMass();
                        pc.localCenterA = bodyA.GetSweep().localCenter;
                        pc.localCenterB = bodyB.GetSweep().localCenter;
                        pc.invIA = bodyA.GetInvI();
                        pc.invIB = bodyB.GetInvI();
                        pc.localNormal = manifold.localNormal;
                        pc.localPoint = manifold.localPoint;
                        pc.localPoints = [];
                        pc.radiusA = radiusA;
                        pc.radiusB = radiusB;
                        pc.type = manifold.type;
                        for (var j = 0; j < pointCount; ++j) {
                            var cp = manifold.points[j];
                            var vcp = new VelocityConstraintPoint();
                            if (this.m_step.warmStarting) {
                                vcp.normalImpulse = this.m_step.dtRatio * cp.normalImpulse;
                                vcp.tangentImpulse = this.m_step.dtRatio * cp.tangentImpulse;
                            }
                            else {
                                vcp.normalImpulse = 0.0;
                                vcp.tangentImpulse = 0.0;
                            }
                            vcp.rA = PhysicsType2d.Vector2.Zero();
                            vcp.rB = PhysicsType2d.Vector2.Zero();
                            vcp.normalMass = 0.0;
                            vcp.tangentMass = 0.0;
                            vcp.velocityBias = 0.0;
                            vc.points[j] = vcp;
                            pc.localPoints[j] = cp.localPoint;
                        }
                        this.m_positionConstraints[i] = pc;
                        this.m_velocityConstraints[i] = vc;
                    }
                }
                ContactSolver.prototype.Destructor = function () { this.m_velocityConstraints = null; this.m_positionConstraints = null; };
                ContactSolver.prototype.InitializeVelocityConstraints = function () {
                    for (var i = 0; i < this.m_contacts.length; ++i) {
                        var vc = this.m_velocityConstraints[i];
                        var pc = this.m_positionConstraints[i];
                        var radiusA = pc.radiusA;
                        var radiusB = pc.radiusB;
                        var manifold = this.m_contacts[vc.contactIndex].GetManifold();
                        var indexA = vc.indexA;
                        var indexB = vc.indexB;
                        var mA = vc.invMassA;
                        var mB = vc.invMassB;
                        var iA = vc.invIA;
                        var iB = vc.invIB;
                        var localCenterA = pc.localCenterA;
                        var localCenterB = pc.localCenterB;
                        var cA = this.m_positions[indexA].c;
                        var aA = this.m_positions[indexA].a;
                        var vA = this.m_velocities[indexA].v;
                        var wA = this.m_velocities[indexA].w;
                        var cB = this.m_positions[indexB].c;
                        var aB = this.m_positions[indexB].a;
                        var vB = this.m_velocities[indexB].v;
                        var wB = this.m_velocities[indexB].w;
                        PhysicsType2d.Assert(manifold.points.length > 0);
                        var xfA = new PhysicsType2d.Transform();
                        var xfB = new PhysicsType2d.Transform();
                        xfA.q.Set(aA);
                        xfB.q.Set(aB);
                        xfA.p = cA.Subtract(xfA.q.ApplyToVector2(localCenterA));
                        xfB.p = cB.Subtract(xfB.q.ApplyToVector2(localCenterB));
                        var worldManifold = new PhysicsType2d.Collision.WorldManifold();
                        worldManifold.Initialize(manifold, xfA, radiusA, xfB, radiusB);
                        vc.normal = worldManifold.normal;
                        for (var j = 0; j < vc.points.length; ++j) {
                            var vcp = vc.points[j];
                            vcp.rA = worldManifold.points[j].Subtract(cA);
                            vcp.rB = worldManifold.points[j].Subtract(cB);
                            var rnA = PhysicsType2d.MathExtensions.Cross2x2(vcp.rA, vc.normal);
                            var rnB = PhysicsType2d.MathExtensions.Cross2x2(vcp.rB, vc.normal);
                            var kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                            vcp.normalMass = kNormal > 0.0 ? 1.0 / kNormal : 0.0;
                            var tangent = PhysicsType2d.MathExtensions.Cross2x1(vc.normal, 1.0);
                            var rtA = PhysicsType2d.MathExtensions.Cross2x2(vcp.rA, tangent);
                            var rtB = PhysicsType2d.MathExtensions.Cross2x2(vcp.rB, tangent);
                            var kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
                            vcp.tangentMass = kTangent > 0.0 ? 1.0 / kTangent : 0.0;
                            vcp.velocityBias = 0.0;
                            var vRel = PhysicsType2d.MathExtensions.Dot(vc.normal, vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, vcp.rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, vcp.rA)));
                            if (vRel < -PhysicsType2d.Settings.velocityThreshold) {
                                vcp.velocityBias = -vc.restitution * vRel;
                            }
                            vc.points[j] = vcp;
                        }
                        if (vc.points.length == 2) {
                            var vcp1 = vc.points[0];
                            var vcp2 = vc.points[1];
                            var rn1A = PhysicsType2d.MathExtensions.Cross2x2(vcp1.rA, vc.normal);
                            var rn1B = PhysicsType2d.MathExtensions.Cross2x2(vcp1.rB, vc.normal);
                            var rn2A = PhysicsType2d.MathExtensions.Cross2x2(vcp2.rA, vc.normal);
                            var rn2B = PhysicsType2d.MathExtensions.Cross2x2(vcp2.rB, vc.normal);
                            var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
                            var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
                            var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
                            var k_maxConditionNumber = 1000.0;
                            if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
                                vc.K.EX.Set(k11, k12);
                                vc.K.EY.Set(k12, k22);
                                vc.normalMass = vc.K.GetInverse();
                            }
                            else {
                                vc.points = [vc.points[0]];
                            }
                        }
                    }
                };
                ContactSolver.prototype.WarmStart = function () {
                    for (var i = 0; i < this.m_contacts.length; ++i) {
                        var vc = this.m_velocityConstraints[i];
                        var indexA = vc.indexA;
                        var indexB = vc.indexB;
                        var mA = vc.invMassA;
                        var iA = vc.invIA;
                        var mB = vc.invMassB;
                        var iB = vc.invIB;
                        var vA = this.m_velocities[indexA].v;
                        var wA = this.m_velocities[indexA].w;
                        var vB = this.m_velocities[indexB].v;
                        var wB = this.m_velocities[indexB].w;
                        var normal = vc.normal;
                        var tangent = PhysicsType2d.MathExtensions.Cross2x1(normal, 1.0);
                        for (var j = 0; j < vc.points.length; ++j) {
                            var vcp = vc.points[j];
                            var P = normal.Multiply(vcp.normalImpulse).Add(tangent.Multiply(vcp.tangentImpulse));
                            wA -= iA * PhysicsType2d.MathExtensions.Cross2x2(vcp.rA, P);
                            vA = vA.Subtract(P.Multiply(mA));
                            wB += iB * PhysicsType2d.MathExtensions.Cross2x2(vcp.rB, P);
                            vB = vB.Add(P.Multiply(mB));
                        }
                        this.m_velocities[indexA].v = vA;
                        this.m_velocities[indexA].w = wA;
                        this.m_velocities[indexB].v = vB;
                        this.m_velocities[indexB].w = wB;
                    }
                };
                ContactSolver.prototype.SolveVelocityConstraints = function () {
                    for (var i = 0; i < this.m_contacts.length; ++i) {
                        var vc = this.m_velocityConstraints[i];
                        var indexA = vc.indexA;
                        var indexB = vc.indexB;
                        var mA = vc.invMassA;
                        var iA = vc.invIA;
                        var mB = vc.invMassB;
                        var iB = vc.invIB;
                        var vA = this.m_velocities[indexA].v;
                        var wA = this.m_velocities[indexA].w;
                        var vB = this.m_velocities[indexB].v;
                        var wB = this.m_velocities[indexB].w;
                        var normal = vc.normal;
                        var tangent = PhysicsType2d.MathExtensions.Cross2x1(normal, 1.0);
                        var friction = vc.friction;
                        PhysicsType2d.Assert(vc.points.length == 1 || vc.points.length == 2);
                        for (var j = 0; j < vc.points.length; ++j) {
                            var vcp = vc.points[j];
                            var dv = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, vcp.rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, vcp.rA));
                            var vt = PhysicsType2d.MathExtensions.Dot(dv, tangent);
                            var lambda = vcp.tangentMass * (-vt);
                            var maxFriction = friction * vcp.normalImpulse;
                            var newImpulse = PhysicsType2d.MathExtensions.Clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
                            lambda = newImpulse - vcp.tangentImpulse;
                            vcp.tangentImpulse = newImpulse;
                            var P = tangent.Multiply(lambda);
                            vA = vA.Subtract(P.Multiply(mA));
                            wA -= iA * PhysicsType2d.MathExtensions.Cross2x2(vcp.rA, P);
                            vB = vB.Add(P.Multiply(mB));
                            wB += iB * PhysicsType2d.MathExtensions.Cross2x2(vcp.rB, P);
                        }
                        if (vc.points.length == 1) {
                            var vcp = vc.points[0];
                            var dv = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, vcp.rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, vcp.rA));
                            var vn = PhysicsType2d.MathExtensions.Dot(dv, normal);
                            var lambda = -vcp.normalMass * (vn - vcp.velocityBias);
                            var newImpulse = Math.max(vcp.normalImpulse + lambda, 0.0);
                            lambda = newImpulse - vcp.normalImpulse;
                            vcp.normalImpulse = newImpulse;
                            var P = normal.Multiply(lambda);
                            vA = vA.Subtract(P.Multiply(mA));
                            wA -= iA * PhysicsType2d.MathExtensions.Cross2x2(vcp.rA, P);
                            vB = vB.Add(P.Multiply(mB));
                            wB += iB * PhysicsType2d.MathExtensions.Cross2x2(vcp.rB, P);
                        }
                        else {
                            var cp1 = vc.points[0];
                            var cp2 = vc.points[1];
                            var a = new PhysicsType2d.Vector2(cp1.normalImpulse, cp2.normalImpulse);
                            PhysicsType2d.Assert(a.x >= 0.0 && a.y >= 0.0);
                            var dv1 = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, cp1.rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, cp1.rA));
                            var dv2 = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, cp2.rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, cp2.rA));
                            var vn1 = PhysicsType2d.MathExtensions.Dot(dv1, normal);
                            var vn2 = PhysicsType2d.MathExtensions.Dot(dv2, normal);
                            var b = new PhysicsType2d.Vector2(vn1 - cp1.velocityBias, vn2 - cp2.velocityBias);
                            b = b.Subtract(vc.K.VectorMultiply(a));
                            var k_errorTol = 0.001;
                            for (;;) {
                                var x = vc.normalMass.VectorMultiply(b).Negative();
                                if (x.x >= 0.0 && x.y >= 0.0) {
                                    var d = x.Subtract(a);
                                    var P1 = normal.Multiply(d.x);
                                    var P2 = normal.Multiply(d.y);
                                    vA = vA.Subtract((P1.Add(P2)).Multiply(mA));
                                    wA -= iA * (PhysicsType2d.MathExtensions.Cross2x2(cp1.rA, P1) + PhysicsType2d.MathExtensions.Cross2x2(cp2.rA, P2));
                                    vB = vB.Add((P1.Add(P2)).Multiply(mB));
                                    wB += iB * (PhysicsType2d.MathExtensions.Cross2x2(cp1.rB, P1) + PhysicsType2d.MathExtensions.Cross2x2(cp2.rB, P2));
                                    cp1.normalImpulse = x.x;
                                    cp2.normalImpulse = x.y;
                                    break;
                                }
                                x.x = -cp1.normalMass * b.x;
                                x.y = 0.0;
                                vn1 = 0.0;
                                vn2 = vc.K.EX.y * x.x + b.y;
                                if (x.x >= 0.0 && vn2 >= 0.0) {
                                    var d = x.Subtract(a);
                                    var P1 = normal.Multiply(d.x);
                                    var P2 = normal.Multiply(d.y);
                                    vA = vA.Subtract((P1.Add(P2)).Multiply(mA));
                                    wA -= iA * (PhysicsType2d.MathExtensions.Cross2x2(cp1.rA, P1) + PhysicsType2d.MathExtensions.Cross2x2(cp2.rA, P2));
                                    vB = vB.Add((P1.Add(P2)).Multiply(mB));
                                    wB += iB * (PhysicsType2d.MathExtensions.Cross2x2(cp1.rB, P1) + PhysicsType2d.MathExtensions.Cross2x2(cp2.rB, P2));
                                    cp1.normalImpulse = x.x;
                                    cp2.normalImpulse = x.y;
                                    break;
                                }
                                x.x = 0.0;
                                x.y = -cp2.normalMass * b.y;
                                vn1 = vc.K.EY.x * x.y + b.x;
                                vn2 = 0.0;
                                if (x.y >= 0.0 && vn1 >= 0.0) {
                                    var d = x.Subtract(a);
                                    var P1 = normal.Multiply(d.x);
                                    var P2 = normal.Multiply(d.y);
                                    vA = vA.Subtract((P1.Add(P2)).Multiply(mA));
                                    wA -= iA * (PhysicsType2d.MathExtensions.Cross2x2(cp1.rA, P1) + PhysicsType2d.MathExtensions.Cross2x2(cp2.rA, P2));
                                    vB = vB.Add((P1.Add(P2)).Multiply(mB));
                                    wB += iB * (PhysicsType2d.MathExtensions.Cross2x2(cp1.rB, P1) + PhysicsType2d.MathExtensions.Cross2x2(cp2.rB, P2));
                                    cp1.normalImpulse = x.x;
                                    cp2.normalImpulse = x.y;
                                    break;
                                }
                                x.x = 0.0;
                                x.y = 0.0;
                                vn1 = b.x;
                                vn2 = b.y;
                                if (vn1 >= 0.0 && vn2 >= 0.0) {
                                    var d = x.Subtract(a);
                                    var P1 = normal.Multiply(d.x);
                                    var P2 = normal.Multiply(d.y);
                                    vA = vA.Subtract((P1.Add(P2)).Multiply(mA));
                                    wA -= iA * (PhysicsType2d.MathExtensions.Cross2x2(cp1.rA, P1) + PhysicsType2d.MathExtensions.Cross2x2(cp2.rA, P2));
                                    vB = vB.Add((P1.Add(P2)).Multiply(mB));
                                    wB += iB * (PhysicsType2d.MathExtensions.Cross2x2(cp1.rB, P1) + PhysicsType2d.MathExtensions.Cross2x2(cp2.rB, P2));
                                    cp1.normalImpulse = x.x;
                                    cp2.normalImpulse = x.y;
                                    break;
                                }
                                break;
                            }
                        }
                        this.m_velocities[indexA].v = vA;
                        this.m_velocities[indexA].w = wA;
                        this.m_velocities[indexB].v = vB;
                        this.m_velocities[indexB].w = wB;
                    }
                };
                ContactSolver.prototype.StoreImpulses = function () { for (var i = 0; i < this.m_contacts.length; ++i) {
                    var vc = this.m_velocityConstraints[i];
                    var manifold = this.m_contacts[vc.contactIndex].GetManifold();
                    for (var j = 0; j < vc.points.length; ++j) {
                        manifold.points[j].normalImpulse = vc.points[j].normalImpulse;
                        manifold.points[j].tangentImpulse = vc.points[j].tangentImpulse;
                    }
                } };
                ContactSolver.prototype.SolvePositionConstraints = function () {
                    var minSeparation = 0.0;
                    for (var i = 0; i < this.m_contacts.length; ++i) {
                        var pc = this.m_positionConstraints[i];
                        var indexA = pc.indexA;
                        var indexB = pc.indexB;
                        var localCenterA = pc.localCenterA;
                        var mA = pc.invMassA;
                        var iA = pc.invIA;
                        var localCenterB = pc.localCenterB;
                        var mB = pc.invMassB;
                        var iB = pc.invIB;
                        var cA = this.m_positions[indexA].c;
                        var aA = this.m_positions[indexA].a;
                        var cB = this.m_positions[indexB].c;
                        var aB = this.m_positions[indexB].a;
                        for (var j = 0; j < pc.localPoints.length; ++j) {
                            var xfA = new PhysicsType2d.Transform();
                            var xfB = new PhysicsType2d.Transform();
                            xfA.q.Set(aA);
                            xfB.q.Set(aB);
                            xfA.p = cA.Subtract(xfA.q.ApplyToVector2(localCenterA));
                            xfB.p = cB.Subtract(xfB.q.ApplyToVector2(localCenterB));
                            var psm = new PositionSolverManifold();
                            psm.Initialize(pc, xfA, xfB, j);
                            var normal = psm.normal;
                            var point = psm.point;
                            var separation = psm.separation;
                            var rA = point.Subtract(cA);
                            var rB = point.Subtract(cB);
                            minSeparation = Math.min(minSeparation, separation);
                            var C = PhysicsType2d.MathExtensions.Clamp(PhysicsType2d.Settings.baumgarte * (separation + PhysicsType2d.Settings.linearSlop), -PhysicsType2d.Settings.maxLinearCorrection, 0.0);
                            var rnA = PhysicsType2d.MathExtensions.Cross2x2(rA, normal);
                            var rnB = PhysicsType2d.MathExtensions.Cross2x2(rB, normal);
                            var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                            var impulse = K > 0.0 ? -C / K : 0.0;
                            var P = normal.Multiply(impulse);
                            cA = cA.Subtract(P.Multiply(mA));
                            aA -= iA * PhysicsType2d.MathExtensions.Cross2x2(rA, P);
                            cB = cB.Add(P.Multiply(mB));
                            aB += iB * PhysicsType2d.MathExtensions.Cross2x2(rB, P);
                        }
                        this.m_positions[indexA].c = cA;
                        this.m_positions[indexA].a = aA;
                        this.m_positions[indexB].c = cB;
                        this.m_positions[indexB].a = aB;
                    }
                    return minSeparation >= -3.0 * PhysicsType2d.Settings.linearSlop;
                };
                ContactSolver.prototype.SolveTOIPositionConstraints = function (toiIndexA, toiIndexB) {
                    var minSeparation = 0.0;
                    for (var i = 0; i < this.m_contacts.length; ++i) {
                        var pc = this.m_positionConstraints[i];
                        var indexA = pc.indexA;
                        var indexB = pc.indexB;
                        var localCenterA = pc.localCenterA;
                        var localCenterB = pc.localCenterB;
                        var mA = 0.0;
                        var iA = 0.0;
                        if (indexA == toiIndexA || indexA == toiIndexB) {
                            mA = pc.invMassA;
                            iA = pc.invIA;
                        }
                        var mB = pc.invMassB;
                        var iB = pc.invIB;
                        if (indexB == toiIndexA || indexB == toiIndexB) {
                            mB = pc.invMassB;
                            iB = pc.invIB;
                        }
                        var cA = this.m_positions[indexA].c;
                        var aA = this.m_positions[indexA].a;
                        var cB = this.m_positions[indexB].c;
                        var aB = this.m_positions[indexB].a;
                        for (var j = 0; j < pc.localPoints.length; ++j) {
                            var xfA = new PhysicsType2d.Transform();
                            var xfB = new PhysicsType2d.Transform();
                            xfA.q.Set(aA);
                            xfB.q.Set(aB);
                            xfA.p = cA.Subtract(xfA.q.ApplyToVector2(localCenterA));
                            xfB.p = cB.Subtract(xfB.q.ApplyToVector2(localCenterB));
                            var psm = new PositionSolverManifold();
                            psm.Initialize(pc, xfA, xfB, j);
                            var normal = psm.normal;
                            var point = psm.point;
                            var separation = psm.separation;
                            var rA = point.Subtract(cA);
                            var rB = point.Subtract(cB);
                            minSeparation = Math.min(minSeparation, separation);
                            var C = PhysicsType2d.MathExtensions.Clamp(PhysicsType2d.Settings.toiBaugarte * (separation + PhysicsType2d.Settings.linearSlop), -PhysicsType2d.Settings.maxLinearCorrection, 0.0);
                            var rnA = PhysicsType2d.MathExtensions.Cross2x2(rA, normal);
                            var rnB = PhysicsType2d.MathExtensions.Cross2x2(rB, normal);
                            var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                            var impulse = K > 0.0 ? -C / K : 0.0;
                            var P = normal.Multiply(impulse);
                            cA = cA.Subtract(P.Multiply(mA));
                            aA -= iA * PhysicsType2d.MathExtensions.Cross2x2(rA, P);
                            cB = cB.Add(P.Multiply(mB));
                            aB += iB * PhysicsType2d.MathExtensions.Cross2x2(rB, P);
                        }
                        this.m_positions[indexA].c = cA;
                        this.m_positions[indexA].a = aA;
                        this.m_positions[indexB].c = cB;
                        this.m_positions[indexB].a = aB;
                    }
                    return minSeparation >= -1.5 * PhysicsType2d.Settings.linearSlop;
                };
                return ContactSolver;
            })();
            Contacts.ContactSolver = ContactSolver;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        var Island = (function () {
            function Island(bodyCapacity, contactCapacity, jointCapacity, listener) { this.m_bodyCapacity = bodyCapacity; this.m_jointCapacity = jointCapacity; this.m_contactCapacity = contactCapacity; this.m_listener = listener; this.m_bodies = []; this.m_contacts = []; this.m_joints = []; this.m_velocities = []; this.m_positions = []; }
            Island.prototype.Destructor = function () { this.m_positions = null; this.m_velocities = null; this.m_joints = null; this.m_contacts = null; this.m_bodies = null; };
            Island.prototype.GetBody = function (i) { return this.m_bodies[i]; };
            Island.prototype.GetContact = function (i) { PhysicsType2d.Assert(i < this.m_contacts.length); return this.m_contacts[i]; };
            Island.prototype.GetJoint = function (i) { return this.m_joints[i]; };
            Island.prototype.GetBodyCount = function () { return this.m_bodies.length; };
            Island.prototype.GetBodyCapacity = function () { return this.m_bodyCapacity; };
            Island.prototype.GetJointCount = function () { return this.m_joints.length; };
            Island.prototype.GetJointCapacity = function () { return this.m_jointCapacity; };
            Island.prototype.IntegrateVelocity = function (index, h, gravity) {
                var b = this.m_bodies[index];
                var sweepClone = b.GetSweep();
                var c = sweepClone.c;
                var a = sweepClone.a;
                var v = b.GetLinearVelocity();
                var w = b.GetAngularVelocity();
                b.m_sweep.c0 = sweepClone.c;
                b.m_sweep.a0 = sweepClone.a;
                if (b.GetType() == 2) {
                    var invMass = b.GetInvMass();
                    var f = b.GetForce();
                    var g = gravity.Multiply(b.GetGravityScale());
                    var deltaV = (g.Add(f.Multiply(invMass))).Multiply(h);
                    v = v.Add(deltaV);
                    w += h * b.GetInvI() * b.GetTorque();
                    v = v.Multiply(PhysicsType2d.MathExtensions.Clamp(1.0 - h * b.GetLinearDamping(), 0.0, 1.0));
                    w *= PhysicsType2d.MathExtensions.Clamp(1.0 - h * b.GetAngularDamping(), 0.0, 1.0);
                }
                this.m_positions[index] = new PhysicsType2d.Dynamics.Position(c, a);
                this.m_velocities[index] = new PhysicsType2d.Dynamics.Velocity(v, w);
            };
            Island.prototype.Solve = function (step, gravity, allowSleep) {
                var profile = new PhysicsType2d.Dynamics.Profile();
                var timer = new PhysicsType2d.Timer();
                var h = step.dt;
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    this.IntegrateVelocity(i, h, gravity);
                }
                timer.Reset();
                var solverData = new PhysicsType2d.Dynamics.SolverData(step, this.m_positions, this.m_velocities);
                var contactSolverDef = new PhysicsType2d.Dynamics.Contacts.ContactSolverDef();
                contactSolverDef.step = step;
                contactSolverDef.contacts = this.m_contacts;
                contactSolverDef.positions = this.m_positions;
                contactSolverDef.velocities = this.m_velocities;
                var contactSolver = new PhysicsType2d.Dynamics.Contacts.ContactSolver(contactSolverDef);
                contactSolver.InitializeVelocityConstraints();
                if (step.warmStarting) {
                    contactSolver.WarmStart();
                }
                for (var i = 0; i < this.m_joints.length; ++i) {
                    this.m_joints[i].InitVelocityConstraints(solverData);
                }
                profile.solveInit = timer.GetMilliseconds();
                timer.Reset();
                for (var i = 0; i < step.velocityIterations; ++i) {
                    for (var j = 0; j < this.m_joints.length; ++j) {
                        this.m_joints[j].SolveVelocityConstraints(solverData);
                    }
                    contactSolver.SolveVelocityConstraints();
                }
                contactSolver.StoreImpulses();
                profile.solveVelocity = timer.GetMilliseconds();
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    this.IntegratePosition(i, h);
                }
                timer.Reset();
                var positionSolved = false;
                for (var i = 0; i < step.positionIterations; ++i) {
                    var contactsOkay = contactSolver.SolvePositionConstraints();
                    var jointsOkay = true;
                    for (var j = 0; j < this.m_joints.length; ++j) {
                        var jointOkay = this.m_joints[j].SolvePositionConstraints(solverData);
                        jointsOkay = jointsOkay && jointOkay;
                    }
                    if (contactsOkay && jointsOkay) {
                        positionSolved = true;
                        break;
                    }
                }
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    var body = this.m_bodies[i];
                    body.m_sweep.c = this.m_positions[i].c;
                    body.m_sweep.a = this.m_positions[i].a;
                    body.SetLinearVelocity(this.m_velocities[i].v);
                    body.SetAngularVelocity(this.m_velocities[i].w);
                    body.SynchronizeTransform();
                }
                profile.solvePosition = timer.GetMilliseconds();
                this.Report(contactSolver.m_velocityConstraints);
                if (allowSleep) {
                    var minSleepTime = PhysicsType2d.Constants.MAX_FLOAT;
                    var linTolSqr = PhysicsType2d.Settings.linearSleepTolerance * PhysicsType2d.Settings.linearSleepTolerance;
                    var angTolSqr = PhysicsType2d.Settings.angularSleepTolerance * PhysicsType2d.Settings.angularSleepTolerance;
                    for (var i = 0; i < this.m_bodies.length; ++i) {
                        var b = this.m_bodies[i];
                        if (b.GetType() == 0) {
                            continue;
                        }
                        if ((!b.IsFlagSet(4)) || b.GetAngularVelocity() * b.GetAngularVelocity() > angTolSqr || b.GetLinearVelocity().Dot(b.GetLinearVelocity()) > linTolSqr) {
                            b.SetSleepTime(0.0);
                            minSleepTime = 0.0;
                        }
                        else {
                            b.SetSleepTime(b.GetSleepTime() + h);
                            minSleepTime = Math.min(minSleepTime, b.GetSleepTime());
                        }
                    }
                    if (minSleepTime >= PhysicsType2d.Settings.timeToSleep && positionSolved) {
                        for (var i = 0; i < this.m_bodies.length; ++i) {
                            var b = this.m_bodies[i];
                            b.SetAwake(false);
                        }
                    }
                }
                return profile;
            };
            Island.prototype.IntegratePosition = function (index, h) {
                var c = this.m_positions[index].c;
                var a = this.m_positions[index].a;
                var v = this.m_velocities[index].v;
                var w = this.m_velocities[index].w;
                var translation = v.Multiply(h);
                if (translation.Dot(translation) > PhysicsType2d.Settings.maxTranslationSquared) {
                    var ratio = PhysicsType2d.Settings.maxTranslation / translation.Length();
                    v = v.Multiply(ratio);
                }
                var rotation = h * w;
                if (rotation * rotation > PhysicsType2d.Settings.maxRotationSquared) {
                    var ratio = PhysicsType2d.Settings.maxRotation / Math.abs(rotation);
                    w *= ratio;
                }
                c = c.Add(v.Multiply(h));
                a += h * w;
                this.m_positions[index] = new PhysicsType2d.Dynamics.Position(c, a);
                this.m_velocities[index] = new PhysicsType2d.Dynamics.Velocity(v, w);
            };
            Island.prototype.SolveTOI = function (subStep, toiIndexA, toiIndexB) {
                PhysicsType2d.Assert(toiIndexA < this.m_bodies.length);
                PhysicsType2d.Assert(toiIndexB < this.m_bodies.length);
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    var b = this.m_bodies[i];
                    var sweep = b.GetSweep();
                    this.m_positions[i] = new PhysicsType2d.Dynamics.Position(sweep.c, sweep.a);
                    this.m_velocities[i] = new PhysicsType2d.Dynamics.Velocity(b.GetLinearVelocity(), b.GetAngularVelocity());
                }
                var contactSolverDef = new PhysicsType2d.Dynamics.Contacts.ContactSolverDef();
                contactSolverDef.contacts = this.m_contacts;
                contactSolverDef.step = subStep;
                contactSolverDef.positions = this.m_positions;
                contactSolverDef.velocities = this.m_velocities;
                var contactSolver = new PhysicsType2d.Dynamics.Contacts.ContactSolver(contactSolverDef);
                for (var i = 0; i < subStep.positionIterations; ++i) {
                    var contactsOkay = contactSolver.SolveTOIPositionConstraints(toiIndexA, toiIndexB);
                    if (contactsOkay) {
                        break;
                    }
                }
                this.m_bodies[toiIndexA].m_sweep.c0 = this.m_positions[toiIndexA].c;
                this.m_bodies[toiIndexA].m_sweep.a0 = this.m_positions[toiIndexA].a;
                this.m_bodies[toiIndexB].m_sweep.c0 = this.m_positions[toiIndexB].c;
                this.m_bodies[toiIndexB].m_sweep.a0 = this.m_positions[toiIndexB].a;
                contactSolver.InitializeVelocityConstraints();
                for (var i = 0; i < subStep.velocityIterations; ++i) {
                    contactSolver.SolveVelocityConstraints();
                }
                var h = subStep.dt;
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    var c = this.m_positions[i].c;
                    var a = this.m_positions[i].a;
                    var v = this.m_velocities[i].v;
                    var w = this.m_velocities[i].w;
                    var translation = v.Multiply(h);
                    if (translation.Dot(translation) > PhysicsType2d.Settings.maxTranslationSquared) {
                        var ratio = PhysicsType2d.Settings.maxTranslation / translation.Length();
                        v = v.Multiply(ratio);
                    }
                    var rotation = h * w;
                    if (rotation * rotation > PhysicsType2d.Settings.maxRotationSquared) {
                        var ratio = PhysicsType2d.Settings.maxRotation / Math.abs(rotation);
                        w *= ratio;
                    }
                    c = c.Add(v.Multiply(h));
                    a += h * w;
                    this.m_positions[i] = new PhysicsType2d.Dynamics.Position(c, a);
                    this.m_velocities[i] = new PhysicsType2d.Dynamics.Velocity(v, w);
                    var body = this.m_bodies[i];
                    body.m_sweep.c = c;
                    body.m_sweep.a = a;
                    body.SetLinearVelocity(v);
                    body.SetAngularVelocity(w);
                    body.SynchronizeTransform();
                }
                this.Report(contactSolver.m_velocityConstraints);
            };
            Island.prototype.Report = function (constraints) {
                if (this.m_listener == null) {
                    return;
                }
                for (var i = 0; i < this.m_contacts.length; ++i) {
                    var c = this.m_contacts[i];
                    var vc = constraints[i];
                    var impulse = new PhysicsType2d.Dynamics.ContactImpulse();
                    for (var j = 0; j < vc.points.length; ++j) {
                        impulse.normalImpulses[j] = vc.points[j].normalImpulse;
                        impulse.tangentImpulses[j] = vc.points[j].tangentImpulse;
                    }
                    this.m_listener.PostSolve(c, impulse);
                }
            };
            Island.prototype.GetContactCount = function () { return this.m_contacts.length; };
            Island.prototype.GetContactCapacity = function () { return this.m_contactCapacity; };
            Island.prototype.Clear = function () { this.m_bodies = []; this.m_contacts = []; this.m_joints = []; };
            Island.prototype.AddBody = function (body) { PhysicsType2d.Assert(this.m_bodies.length < this.m_bodyCapacity); body.SetIslandIndex(this.m_bodies.length); this.m_bodies.push(body); };
            Island.prototype.AddContact = function (contact) { PhysicsType2d.Assert(this.m_contacts.length < this.m_contactCapacity); this.m_contacts.push(contact); };
            Island.prototype.AddJoint = function (joint) { PhysicsType2d.Assert(this.m_joints.length < this.m_jointCapacity); this.m_joints.push(joint); };
            return Island;
        })();
        Dynamics.Island = Island;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        var ContactFilter = (function () {
            function ContactFilter() { }
            ContactFilter.prototype.Destructor = function () { };
            ContactFilter.prototype.ShouldCollide = function (fixtureA, fixtureB) {
                var filterA = fixtureA.GetFilterData();
                var filterB = fixtureB.GetFilterData();
                if (filterA.groupIndex == filterB.groupIndex && filterA.groupIndex != 0) {
                    return filterA.groupIndex > 0;
                }
                var collide = (filterA.maskBits & filterB.categoryBits) != 0 && (filterA.categoryBits & filterB.maskBits) != 0;
                return collide;
            };
            return ContactFilter;
        })();
        Dynamics.ContactFilter = ContactFilter;
        var ContactImpulse = (function () {
            function ContactImpulse() { this.normalImpulses = []; this.tangentImpulses = []; }
            ContactImpulse.prototype.Clone = function () { var clone = new ContactImpulse(); clone.normalImpulses = this.normalImpulses.slice(0); clone.tangentImpulses = this.tangentImpulses.slice(0); return clone; };
            return ContactImpulse;
        })();
        Dynamics.ContactImpulse = ContactImpulse;
        var ContactListener = (function () {
            function ContactListener() { }
            ContactListener.prototype.Destructor = function () { };
            ContactListener.prototype.BeginContact = function (contact) { };
            ContactListener.prototype.EndContact = function (contact) { };
            ContactListener.prototype.PreSolve = function (contact, oldManifold) { };
            ContactListener.prototype.PostSolve = function (contact, impulse) { };
            return ContactListener;
        })();
        Dynamics.ContactListener = ContactListener;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        var defaultFilter = new PhysicsType2d.Dynamics.ContactFilter();
        var defaultListener = new PhysicsType2d.Dynamics.ContactListener();
        var ContactManager = (function () {
            function ContactManager() { this.m_contactList = new PhysicsType2d.LinkedList(); this.m_contactFilter = defaultFilter; this.m_contactListener = defaultListener; this.m_broadPhase = new PhysicsType2d.Collision.BroadPhase(); }
            ContactManager.prototype.Destroy = function (c) {
                var fixtureA = c.GetFixtureA();
                var fixtureB = c.GetFixtureB();
                var bodyA = fixtureA.GetBody();
                var bodyB = fixtureB.GetBody();
                if (this.m_contactListener && c.IsTouching()) {
                    this.m_contactListener.EndContact(c);
                }
                this.m_contactList.Remove(c);
                bodyA.RemoveContactEdge(c.m_nodeA);
                bodyB.RemoveContactEdge(c.m_nodeB);
                c.Destructor();
            };
            ContactManager.prototype.Collide = function () {
                var iter = this.m_contactList.GetIterator();
                while (iter.MoveNext()) {
                    var c = iter.Current();
                    var fixtureA = c.GetFixtureA();
                    var fixtureB = c.GetFixtureB();
                    var indexA = c.GetChildIndexA();
                    var indexB = c.GetChildIndexB();
                    var bodyA = fixtureA.GetBody();
                    var bodyB = fixtureB.GetBody();
                    if (c.IsFlagSet(8)) {
                        if (bodyB.ShouldCollide(bodyA) == false) {
                            this.Destroy(c);
                            continue;
                        }
                        if (this.m_contactFilter && this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
                            this.Destroy(c);
                            continue;
                        }
                        c.ClearFlag(8);
                    }
                    var activeA = bodyA.IsAwake() && bodyA.GetType() != 0;
                    var activeB = bodyB.IsAwake() && bodyB.GetType() != 0;
                    if (activeA == false && activeB == false) {
                        continue;
                    }
                    var proxyIdA = fixtureA.GetProxy(indexA).proxyId;
                    var proxyIdB = fixtureB.GetProxy(indexB).proxyId;
                    var overlap = this.m_broadPhase.TestOverlap(proxyIdA, proxyIdB);
                    if (overlap == false) {
                        this.Destroy(c);
                        continue;
                    }
                    c.Update(this.m_contactListener);
                }
            };
            ContactManager.prototype.FindNewContacts = function () { this.m_broadPhase.UpdatePairs(this); };
            ContactManager.prototype.AddPair = function (proxyUserDataA, proxyUserDataB) {
                var proxyA = proxyUserDataA;
                var proxyB = proxyUserDataB;
                var fixtureA = proxyA.fixture;
                var fixtureB = proxyB.fixture;
                var indexA = proxyA.childIndex;
                var indexB = proxyB.childIndex;
                var bodyA = fixtureA.GetBody();
                var bodyB = fixtureB.GetBody();
                if (bodyA == bodyB) {
                    return;
                }
                var edgeIterator = bodyB.GetContactEdges();
                while (edgeIterator.MoveNext()) {
                    var edge = edgeIterator.Current();
                    if (edge.other == bodyA) {
                        var fA = edge.contact.GetFixtureA();
                        var fB = edge.contact.GetFixtureB();
                        var iA = edge.contact.GetChildIndexA();
                        var iB = edge.contact.GetChildIndexB();
                        if (fA == fixtureA && fB == fixtureB && iA == indexA && iB == indexB) {
                            return;
                        }
                        if (fA == fixtureB && fB == fixtureA && iA == indexB && iB == indexA) {
                            return;
                        }
                    }
                }
                if (bodyB.ShouldCollide(bodyA) == false) {
                    return;
                }
                if (this.m_contactFilter && this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
                    return;
                }
                var c = PhysicsType2d.Dynamics.Contacts.Contact.Create(fixtureA, indexA, fixtureB, indexB);
                if (c == null) {
                    return;
                }
                fixtureA = c.GetFixtureA();
                fixtureB = c.GetFixtureB();
                indexA = c.GetChildIndexA();
                indexB = c.GetChildIndexB();
                bodyA = fixtureA.GetBody();
                bodyB = fixtureB.GetBody();
                this.m_contactList.Add(c);
                c.m_nodeA.contact = c;
                c.m_nodeA.other = bodyB;
                bodyA.AddContactEdge(c.m_nodeA);
                c.m_nodeB.contact = c;
                c.m_nodeB.other = bodyA;
                bodyB.AddContactEdge(c.m_nodeB);
                bodyA.SetAwake(true);
                bodyB.SetAwake(true);
            };
            ContactManager.prototype.GetContactList = function () { return this.m_contactList.GetIterator(); };
            ContactManager.prototype.Count = function () { return this.m_contactList.Count(); };
            return ContactManager;
        })();
        Dynamics.ContactManager = ContactManager;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (WorldFlags) { WorldFlags[WorldFlags["NEW_FIXTURE"] = 0x0001] = "NEW_FIXTURE"; WorldFlags[WorldFlags["LOCKED"] = 0x0002] = "LOCKED"; WorldFlags[WorldFlags["CLEAR_FORCES"] = 0x0004] = "CLEAR_FORCES"; })(Dynamics.WorldFlags || (Dynamics.WorldFlags = {}));
        var WorldFlags = Dynamics.WorldFlags;
        var WorldQueryWrapper = (function () {
            function WorldQueryWrapper() { }
            WorldQueryWrapper.prototype.QueryCallback = function (proxyId) { var proxy = this.broadPhase.GetUserData(proxyId); return this.callback.ReportFixture(proxy.fixture); };
            WorldQueryWrapper.prototype.Clone = function () { var clone = new WorldQueryWrapper(); clone.broadPhase = this.broadPhase; clone.callback = this.callback; return clone; };
            return WorldQueryWrapper;
        })();
        Dynamics.WorldQueryWrapper = WorldQueryWrapper;
        var WorldRayCastWrapper = (function () {
            function WorldRayCastWrapper() { }
            WorldRayCastWrapper.prototype.RayCastCallback = function (input, proxyId) {
                var userData = this.broadPhase.GetUserData(proxyId);
                var proxy = userData;
                var fixture = proxy.fixture;
                var index = proxy.childIndex;
                var output = fixture.RayCast(input, index);
                if (null !== output) {
                    var fraction = output.fraction;
                    var point = (input.p1.Multiply(1.0 - fraction)).Add(input.p2.Multiply(fraction));
                    return this.callback.ReportFixture(fixture, point, output.normal, fraction);
                }
                return input.maxFraction;
            };
            WorldRayCastWrapper.prototype.Clone = function () { var clone = new WorldRayCastWrapper(); clone.broadPhase = this.broadPhase; clone.callback = this.callback; return clone; };
            return WorldRayCastWrapper;
        })();
        Dynamics.WorldRayCastWrapper = WorldRayCastWrapper;
        var World = (function () {
            function World(gravity) { this.m_gravity = new PhysicsType2d.Vector2(0, 0); this.m_destructionListener = null; this.m_debugDraw = null; this.m_bodyList = new PhysicsType2d.LinkedList(); this.m_jointList = new PhysicsType2d.LinkedList(); this.m_contactManager = new PhysicsType2d.Dynamics.ContactManager(); this.m_warmStarting = true; this.m_continuousPhysics = true; this.m_subStepping = false; this.m_stepComplete = true; this.m_allowSleep = true; this.m_gravity = gravity; this.m_flags = new PhysicsType2d.BitFlag(4); this.m_inv_dt0 = 0.0; this.m_profile = new PhysicsType2d.Dynamics.Profile(); }
            World.prototype.GetBodyList = function () { return this.m_bodyList.GetIterator(); };
            World.prototype.GetJoints = function () { return this.m_jointList.GetIterator(); };
            World.prototype.GetContactList = function () { return this.m_contactManager.GetContactList(); };
            World.prototype.GetBodyCount = function () { return this.m_bodyList.Count(); };
            World.prototype.GetJointCount = function () { return this.m_jointList.Count(); };
            World.prototype.GetContactCount = function () { return this.m_contactManager.Count(); };
            World.prototype.SetGravity = function (gravity) { this.m_gravity = gravity; };
            World.prototype.GetGravity = function () { return this.m_gravity; };
            World.prototype.IsLocked = function () { return this.IsFlagSet(2); };
            World.prototype.SetAutoClearForces = function (flag) { if (flag) {
                this.SetFlag(4);
            }
            else {
                this.ClearFlag(4);
            } };
            World.prototype.GetAutoClearForces = function () { return this.IsFlagSet(4); };
            World.prototype.GetContactManager = function () { return this.m_contactManager; };
            World.prototype.GetProfile = function () { return this.m_profile; };
            World.prototype.Destructor = function () { var iter = this.m_bodyList.GetIterator(); while (iter.MoveNext()) {
                var f = iter.Current().GetFixtures();
                while (f.MoveNext()) {
                    f.Current().Destroy(true);
                }
            } };
            World.prototype.SetDestructionListener = function (listener) { this.m_destructionListener = listener; };
            World.prototype.SetContactFilter = function (filter) { this.m_contactManager.m_contactFilter = filter; };
            World.prototype.SetContactListener = function (listener) { this.m_contactManager.m_contactListener = listener; };
            World.prototype.SetDebugDraw = function (debugDraw) { this.m_debugDraw = debugDraw; };
            World.prototype.CreateBody = function (def) {
                PhysicsType2d.Assert(this.IsLocked() == false);
                if (this.IsLocked()) {
                    return null;
                }
                var b = PhysicsType2d.Dynamics.Body.FromDefinition(def, this);
                this.m_bodyList.Add(b);
                return b;
            };
            World.prototype.DestroyBody = function (b) {
                PhysicsType2d.Assert(this.m_bodyList.Count() > 0);
                PhysicsType2d.Assert(this.IsLocked() == false);
                if (this.IsLocked()) {
                    return;
                }
                var je = b.GetJointEdges();
                while (je.MoveNext()) {
                    var je0 = je.Current();
                    if (this.m_destructionListener) {
                        this.m_destructionListener.SayGoodbyeJoint(je0.joint);
                    }
                    this.DestroyJoint(je0.joint);
                }
                b.ClearJointEdges();
                var ce = b.GetContactEdges();
                while (ce.MoveNext()) {
                    this.m_contactManager.Destroy(ce.Current().contact);
                }
                b.ClearContactEdges();
                var fList = b.GetFixtures();
                while (fList.MoveNext()) {
                    var f0 = fList.Current();
                    if (this.m_destructionListener) {
                        this.m_destructionListener.SayGoodbyeFixture(f0);
                    }
                    f0.DestroyProxies(this.m_contactManager.m_broadPhase);
                    f0.Destroy();
                    f0 = null;
                }
                b.ClearFixtures();
                this.m_bodyList.Remove(b);
                b = null;
            };
            World.prototype.CreateJoint = function (def) {
                PhysicsType2d.Assert(this.IsLocked() == false);
                if (this.IsLocked()) {
                    return null;
                }
                var j = PhysicsType2d.Dynamics.Joints.Joint.Create(def);
                this.m_jointList.Add(j);
                j.m_edgeA.joint = j;
                j.m_edgeA.other = j.m_bodyB;
                j.m_bodyA.AddJointEdge(j.m_edgeA);
                j.m_edgeB.joint = j;
                j.m_edgeB.other = j.m_bodyA;
                j.m_bodyB.AddJointEdge(j.m_edgeB);
                var bodyA = def.bodyA;
                var bodyB = def.bodyB;
                if (def.collideConnected == false) {
                    var contacts = bodyB.GetContactEdges();
                    while (contacts.MoveNext()) {
                        var edge = contacts.Current();
                        if (edge.other == bodyA) {
                            edge.contact.FlagForFiltering();
                        }
                    }
                }
                return j;
            };
            World.prototype.DestroyJoint = function (j) {
                PhysicsType2d.Assert(this.IsLocked() == false);
                PhysicsType2d.Assert(this.m_jointList.Count() > 0);
                if (this.IsLocked()) {
                    return;
                }
                var collideConnected = j.m_collideConnected;
                this.m_jointList.Remove(j);
                var bodyA = j.m_bodyA;
                var bodyB = j.m_bodyB;
                bodyA.SetAwake(true);
                bodyB.SetAwake(true);
                PhysicsType2d.Assert(bodyA.RemoveJointEdge(j.m_edgeA));
                PhysicsType2d.Assert(bodyB.RemoveJointEdge(j.m_edgeB));
                j = null;
                if (collideConnected == false) {
                    var contacts = bodyB.GetContactEdges();
                    while (contacts.MoveNext()) {
                        var edge = contacts.Current();
                        if (edge.other == bodyA) {
                            edge.contact.FlagForFiltering();
                        }
                    }
                }
            };
            World.prototype.GetAllowSleeping = function () { return this.m_allowSleep; };
            World.prototype.SetAllowSleeping = function (flag) {
                if (flag == this.m_allowSleep) {
                    return;
                }
                this.m_allowSleep = flag;
                if (this.m_allowSleep == false) {
                    var bodies = this.m_bodyList.GetIterator();
                    while (bodies.MoveNext()) {
                        bodies.Current().SetAwake(true);
                    }
                }
            };
            World.prototype.Solve = function (step) {
                this.m_profile.solveInit = 0.0;
                this.m_profile.solveVelocity = 0.0;
                this.m_profile.solvePosition = 0.0;
                var island = new PhysicsType2d.Dynamics.Island(this.m_bodyList.Count(), this.m_contactManager.Count(), this.m_jointList.Count(), this.m_contactManager.m_contactListener);
                var bodyIter = this.m_bodyList.GetIterator();
                while (bodyIter.MoveNext()) {
                    bodyIter.Current().ClearFlag(1);
                }
                var contactIter = this.m_contactManager.GetContactList();
                while (contactIter.MoveNext()) {
                    contactIter.Current().ClearFlag(1);
                }
                var jointIter = this.m_jointList.GetIterator();
                while (jointIter.MoveNext()) {
                    jointIter.Current().m_islandFlag = false;
                }
                var stackSize = this.m_bodyList.Count();
                var stack = new Array(stackSize);
                var bodyIter = this.m_bodyList.GetIterator();
                while (bodyIter.MoveNext()) {
                    var seed = bodyIter.Current();
                    if (seed.IsFlagSet(1)) {
                        continue;
                    }
                    if (seed.IsAwake() == false || seed.IsActive() == false) {
                        continue;
                    }
                    if (seed.GetType() == 0) {
                        continue;
                    }
                    island.Clear();
                    var stackCount = 0;
                    stack[stackCount++] = seed;
                    seed.SetFlag(1);
                    while (stackCount > 0) {
                        var b = stack[--stackCount];
                        PhysicsType2d.Assert(b.IsActive() == true);
                        island.AddBody(b);
                        b.SetAwake(true);
                        if (b.GetType() == 0) {
                            continue;
                        }
                        var cIter = b.GetContactEdges();
                        while (cIter.MoveNext()) {
                            var ce = cIter.Current();
                            var contact = ce.contact;
                            if (contact.IsFlagSet(1)) {
                                continue;
                            }
                            if (contact.IsEnabled() == false || contact.IsTouching() == false) {
                                continue;
                            }
                            var sensorA = contact.GetFixtureA().IsSensor();
                            var sensorB = contact.GetFixtureB().IsSensor();
                            if (sensorA || sensorB) {
                                continue;
                            }
                            island.AddContact(contact);
                            contact.SetFlag(1);
                            var other = ce.other;
                            if (other.IsFlagSet(1)) {
                                continue;
                            }
                            PhysicsType2d.Assert(stackCount < stackSize);
                            stack[stackCount++] = other;
                            other.SetFlag(1);
                        }
                        var jIter = b.GetJointEdges();
                        while (jIter.MoveNext()) {
                            var je = jIter.Current();
                            if (je.joint.m_islandFlag == true) {
                                continue;
                            }
                            var other = je.other;
                            if (other.IsActive() == false) {
                                continue;
                            }
                            island.AddJoint(je.joint);
                            je.joint.m_islandFlag = true;
                            if (other.IsFlagSet(1)) {
                                continue;
                            }
                            PhysicsType2d.Assert(stackCount < stackSize);
                            stack[stackCount++] = other;
                            other.SetFlag(1);
                        }
                    }
                    var profile = island.Solve(step, this.m_gravity, this.m_allowSleep);
                    this.m_profile.solveInit += profile.solveInit;
                    this.m_profile.solveVelocity += profile.solveVelocity;
                    this.m_profile.solvePosition += profile.solvePosition;
                    for (var i = 0; i < island.GetBodyCount(); ++i) {
                        var b = island.GetBody(i);
                        if (b.GetType() == 0) {
                            b.ClearFlag(1);
                        }
                    }
                }
                (function (self) {
                    var timer = new PhysicsType2d.Timer();
                    var iter = self.m_bodyList.GetIterator();
                    while (iter.MoveNext()) {
                        var b = iter.Current();
                        if (!b.IsFlagSet(1)) {
                            continue;
                        }
                        if (b.GetType() == 0) {
                            continue;
                        }
                        b.SynchronizeFixtures();
                    }
                    self.m_contactManager.FindNewContacts();
                    self.m_profile.broadphase = timer.GetMilliseconds();
                })(this);
            };
            World.prototype.InvalidateTOI = function () {
                var bodyIter = this.m_bodyList.GetIterator();
                while (bodyIter.MoveNext()) {
                    var b = bodyIter.Current();
                    b.ClearFlag(1);
                    b.m_sweep.alpha0 = 0.0;
                }
                var contactIter = this.m_contactManager.GetContactList();
                while (contactIter.MoveNext()) {
                    var c = contactIter.Current();
                    c.ClearFlag(32);
                    c.ClearFlag(1);
                    c.m_toiCount = 0;
                    c.m_toi = 1.0;
                }
            };
            World.prototype.SolveTOI = function (step) {
                var island = new PhysicsType2d.Dynamics.Island(2 * PhysicsType2d.Settings.maxTOIContacts, PhysicsType2d.Settings.maxTOIContacts, 0, this.m_contactManager.m_contactListener);
                if (this.m_stepComplete) {
                    this.InvalidateTOI();
                }
                var hasMore = true;
                while (hasMore) {
                    hasMore = this.FindTOI(island, step);
                }
            };
            World.prototype.ComputeTOIContact = function (c) {
                var fA = c.GetFixtureA();
                var fB = c.GetFixtureB();
                var bA = fA.GetBody();
                var bB = fB.GetBody();
                var sweepA = bA.GetSweep();
                var sweepB = bB.GetSweep();
                var alpha0 = sweepA.alpha0;
                if (sweepA.alpha0 < sweepB.alpha0) {
                    alpha0 = sweepB.alpha0;
                    bA.m_sweep.Advance(alpha0);
                }
                else if (sweepB.alpha0 < sweepA.alpha0) {
                    bB.m_sweep.Advance(alpha0);
                }
                PhysicsType2d.Assert(alpha0 < 1.0);
                var indexA = c.GetChildIndexA();
                var indexB = c.GetChildIndexB();
                var input = new PhysicsType2d.Collision.TOIInput();
                input.proxyA.Set(fA.GetShape(), indexA);
                input.proxyB.Set(fB.GetShape(), indexB);
                input.sweepA = bA.GetSweep();
                input.sweepB = bB.GetSweep();
                input.tMax = 1.0;
                var output = PhysicsType2d.Collision.TimeOfImpact(input);
                var beta = output.t;
                if (output.state == 3) {
                    return Math.min(alpha0 + (1.0 - alpha0) * beta, 1.0);
                }
                return 1.0;
            };
            World.prototype.FindMinimum = function () {
                var minContact = null;
                var minAlpha = 1.0;
                var contactIter = this.m_contactManager.GetContactList();
                while (contactIter.MoveNext()) {
                    var c = contactIter.Current();
                    if (c.IsEnabled() == false) {
                        continue;
                    }
                    if (c.m_toiCount > PhysicsType2d.Settings.maxSubSteps) {
                        continue;
                    }
                    var alpha = 1.0;
                    if (c.IsFlagSet(32)) {
                        alpha = c.m_toi;
                    }
                    else {
                        var fA = c.GetFixtureA();
                        var fB = c.GetFixtureB();
                        if (fA.IsSensor() || fB.IsSensor()) {
                            continue;
                        }
                        var bA = fA.GetBody();
                        var bB = fB.GetBody();
                        var typeA = bA.GetType();
                        var typeB = bB.GetType();
                        PhysicsType2d.Assert(typeA == 2 || typeB == 2);
                        var activeA = bA.IsAwake() && typeA != 0;
                        var activeB = bB.IsAwake() && typeB != 0;
                        if (activeA == false && activeB == false) {
                            continue;
                        }
                        var collideA = bA.IsBullet() || typeA != 2;
                        var collideB = bB.IsBullet() || typeB != 2;
                        if (collideA == false && collideB == false) {
                            continue;
                        }
                        alpha = this.ComputeTOIContact(c);
                        c.m_toi = alpha;
                        c.SetFlag(32);
                    }
                    if (alpha < minAlpha) {
                        minContact = c;
                        minAlpha = alpha;
                    }
                }
                return { contact: minContact, alpha: minAlpha };
            };
            World.prototype.FindTOI = function (island, step) {
                var minimum = this.FindMinimum();
                var minContact = minimum.contact;
                var minAlpha = minimum.alpha;
                if (minContact == null || 1.0 - 10.0 * PhysicsType2d.Constants.EPSILON < minAlpha) {
                    this.m_stepComplete = true;
                    return false;
                }
                var fA = minContact.GetFixtureA();
                var fB = minContact.GetFixtureB();
                var bA = fA.GetBody();
                var bB = fB.GetBody();
                var backup1 = bA.GetSweep();
                var backup2 = bB.GetSweep();
                bA.Advance(minAlpha);
                bB.Advance(minAlpha);
                minContact.Update(this.m_contactManager.m_contactListener);
                minContact.ClearFlag(32);
                ++minContact.m_toiCount;
                if (minContact.IsEnabled() == false || minContact.IsTouching() == false) {
                    minContact.SetEnabled(false);
                    bA.SetSweep(backup1);
                    bB.SetSweep(backup2);
                    bA.SynchronizeTransform();
                    bB.SynchronizeTransform();
                    return true;
                }
                bA.SetAwake(true);
                bB.SetAwake(true);
                island.Clear();
                island.AddBody(bA);
                island.AddBody(bB);
                island.AddContact(minContact);
                bA.SetFlag(1);
                bB.SetFlag(1);
                minContact.SetFlag(1);
                var bodies = [bA, bB];
                for (var i = 0; i < 2; ++i) {
                    var body = bodies[i];
                    if (body.GetType() == 2) {
                        var cIter = body.GetContactEdges();
                        while (cIter.MoveNext()) {
                            var ce = cIter.Current();
                            if (island.GetBodyCount() == island.GetBodyCapacity()) {
                                break;
                            }
                            if (island.GetContactCount() == island.GetContactCapacity()) {
                                break;
                            }
                            var contact = ce.contact;
                            if (contact.IsFlagSet(1)) {
                                continue;
                            }
                            var other = ce.other;
                            if (other.GetType() == 2 && body.IsBullet() == false && other.IsBullet() == false) {
                                continue;
                            }
                            var sensorA = contact.GetFixtureA().IsSensor();
                            var sensorB = contact.GetFixtureB().IsSensor();
                            if (sensorA || sensorB) {
                                continue;
                            }
                            var backup = other.GetSweep();
                            if (!other.IsFlagSet(1)) {
                                other.Advance(minAlpha);
                            }
                            contact.Update(this.m_contactManager.m_contactListener);
                            if (contact.IsEnabled() == false) {
                                other.SetSweep(backup);
                                other.SynchronizeTransform();
                                continue;
                            }
                            if (contact.IsTouching() == false) {
                                other.SetSweep(backup);
                                other.SynchronizeTransform();
                                continue;
                            }
                            contact.SetFlag(1);
                            island.AddContact(contact);
                            if (other.IsFlagSet(1)) {
                                continue;
                            }
                            other.SetFlag(1);
                            if (other.GetType() != 0) {
                                other.SetAwake(true);
                            }
                            island.AddBody(other);
                        }
                    }
                }
                var subStep = new PhysicsType2d.Dynamics.TimeStep();
                subStep.dt = (1.0 - minAlpha) * step.dt;
                subStep.inv_dt = 1.0 / subStep.dt;
                subStep.dtRatio = 1.0;
                subStep.positionIterations = 20;
                subStep.velocityIterations = step.velocityIterations;
                subStep.warmStarting = false;
                island.SolveTOI(subStep, bA.GetIslandIndex(), bB.GetIslandIndex());
                for (var i = 0; i < island.GetBodyCount(); ++i) {
                    var body = island.GetBody(i);
                    body.ClearFlag(1);
                    if (body.GetType() != 2) {
                        continue;
                    }
                    body.SynchronizeFixtures();
                    var cIter = body.GetContactEdges();
                    while (cIter.MoveNext()) {
                        var ce = cIter.Current();
                        ce.contact.ClearFlag(32);
                        ce.contact.ClearFlag(1);
                    }
                }
                this.m_contactManager.FindNewContacts();
                if (this.m_subStepping) {
                    this.m_stepComplete = false;
                    return false;
                }
                return true;
            };
            World.prototype.Step = function (dt, velocityIterations, positionIterations) {
                var stepTimer = new PhysicsType2d.Timer();
                if (this.IsFlagSet(1)) {
                    this.m_contactManager.FindNewContacts();
                    this.ClearFlag(1);
                }
                this.SetFlag(2);
                var step = new PhysicsType2d.Dynamics.TimeStep();
                step.dt = dt;
                step.velocityIterations = velocityIterations;
                step.positionIterations = positionIterations;
                if (dt > 0.0) {
                    step.inv_dt = 1.0 / dt;
                }
                else {
                    step.inv_dt = 0.0;
                }
                step.dtRatio = this.m_inv_dt0 * dt;
                step.warmStarting = this.m_warmStarting;
                var timer = new PhysicsType2d.Timer();
                this.m_contactManager.Collide();
                this.m_profile.collide = timer.GetMilliseconds();
                timer = null;
                if (this.m_stepComplete && step.dt > 0.0) {
                    timer = new PhysicsType2d.Timer();
                    this.Solve(step);
                    this.m_profile.solve = timer.GetMilliseconds();
                    timer = null;
                }
                if (this.m_continuousPhysics && step.dt > 0.0) {
                    timer = new PhysicsType2d.Timer();
                    this.SolveTOI(step);
                    this.m_profile.solveTOI = timer.GetMilliseconds();
                    timer = null;
                }
                if (step.dt > 0.0) {
                    this.m_inv_dt0 = step.inv_dt;
                }
                if (this.IsFlagSet(4)) {
                    this.ClearForces();
                }
                this.ClearFlag(2);
                this.m_profile.step = stepTimer.GetMilliseconds();
            };
            World.prototype.ClearForces = function () { var iter = this.m_bodyList.GetIterator(); while (iter.MoveNext()) {
                var body = iter.Current();
                body.SetForce(PhysicsType2d.Vector2.Zero());
                body.SetTorque(0.0);
            } };
            World.prototype.QueryAABB = function (callback, aabb) { var wrapper = new WorldQueryWrapper(); wrapper.broadPhase = this.m_contactManager.m_broadPhase; wrapper.callback = callback; this.m_contactManager.m_broadPhase.Query(wrapper, aabb); };
            World.prototype.RayCast = function (callback, point1, point2) { var wrapper = new WorldRayCastWrapper(); wrapper.broadPhase = this.m_contactManager.m_broadPhase; wrapper.callback = callback; var input = new PhysicsType2d.Collision.RayCastInput(); input.maxFraction = 1.0; input.p1 = point1; input.p2 = point2; this.m_contactManager.m_broadPhase.RayCast(wrapper, input); };
            World.prototype.DrawDebugData = function () {
                if (this.m_debugDraw == null) {
                    return;
                }
                if (this.m_debugDraw.IsFlagSet(1)) {
                    var iter = this.m_bodyList.GetIterator();
                    while (iter.MoveNext()) {
                        var b = iter.Current();
                        var xf = b.GetTransform();
                        var fList = b.GetFixtures();
                        while (fList.MoveNext()) {
                            var f = fList.Current();
                            if (b.IsActive() == false) {
                                this.DrawShape(f, xf, this.m_debugDraw.FromRGB(0.5, 0.5, 0.3));
                            }
                            else if (b.GetType() == 0) {
                                this.DrawShape(f, xf, this.m_debugDraw.FromRGB(0.5, 0.9, 0.5));
                            }
                            else if (b.GetType() == 1) {
                                this.DrawShape(f, xf, this.m_debugDraw.FromRGB(0.5, 0.5, 0.9));
                            }
                            else if (b.IsAwake() == false) {
                                this.DrawShape(f, xf, this.m_debugDraw.FromRGB(0.6, 0.6, 0.6));
                            }
                            else {
                                this.DrawShape(f, xf, this.m_debugDraw.FromRGB(0.9, 0.7, 0.7));
                            }
                        }
                    }
                }
                if (this.m_debugDraw.IsFlagSet(2)) {
                    var jList = this.m_jointList.GetIterator();
                    while (jList.MoveNext()) {
                        this.DrawJoint(jList.Current());
                    }
                }
                if (this.m_debugDraw.IsFlagSet(8)) {
                    var color = this.m_debugDraw.FromRGB(0.3, 0.9, 0.9);
                    var contactIter = this.m_contactManager.GetContactList();
                    while (contactIter.MoveNext()) {
                        var c = contactIter.Current();
                        var fixtureA = c.GetFixtureA();
                        var fixtureB = c.GetFixtureB();
                        var cA = fixtureA.GetAABB(c.GetChildIndexA()).GetCenter();
                        var cB = fixtureB.GetAABB(c.GetChildIndexB()).GetCenter();
                        this.m_debugDraw.DrawSegment(cA, cB, color);
                    }
                }
                if (this.m_debugDraw.IsFlagSet(4)) {
                    var color = this.m_debugDraw.FromRGB(0.9, 0.3, 0.9);
                    var bp = this.m_contactManager.m_broadPhase;
                    var iter = this.m_bodyList.GetIterator();
                    while (iter.MoveNext()) {
                        var b = iter.Current();
                        if (b.IsActive() == false) {
                            continue;
                        }
                        var fList = b.GetFixtures();
                        while (fList.MoveNext()) {
                            var f = fList.Current();
                            var proxies = f.GetProxies();
                            for (var i = 0; i < f.GetProxyCount(); ++i) {
                                var proxy = proxies[i];
                                var aabb = bp.GetFatAABB(proxy.proxyId);
                                var vs = [];
                                vs[0] = new PhysicsType2d.Vector2(aabb.lowerBound.x, aabb.lowerBound.y);
                                vs[1] = new PhysicsType2d.Vector2(aabb.upperBound.x, aabb.lowerBound.y);
                                vs[2] = new PhysicsType2d.Vector2(aabb.upperBound.x, aabb.upperBound.y);
                                vs[3] = new PhysicsType2d.Vector2(aabb.lowerBound.x, aabb.upperBound.y);
                                this.m_debugDraw.DrawPolygon(vs, color);
                            }
                        }
                    }
                }
                if (this.m_debugDraw.IsFlagSet(16)) {
                    var iter = this.m_bodyList.GetIterator();
                    while (iter.MoveNext()) {
                        var b = iter.Current();
                        var xf = b.GetTransform();
                        xf.p = b.GetWorldCenter();
                        this.m_debugDraw.DrawTransform(xf);
                    }
                }
            };
            World.prototype.SetWarmStarting = function (flag) { this.m_warmStarting = flag; };
            World.prototype.GetWarmStarting = function () { return this.m_warmStarting; };
            World.prototype.SetContinuousPhysics = function (flag) { this.m_continuousPhysics = flag; };
            World.prototype.GetContinuousPhysics = function () { return this.m_continuousPhysics; };
            World.prototype.SetSubStepping = function (flag) { this.m_subStepping = flag; };
            World.prototype.GetSubStepping = function () { return this.m_subStepping; };
            World.prototype.GetProxyCount = function () { return this.m_contactManager.m_broadPhase.GetProxyCount(); };
            World.prototype.GetTreeHeight = function () { return this.m_contactManager.m_broadPhase.GetTreeHeight(); };
            World.prototype.GetTreeBalance = function () { return this.m_contactManager.m_broadPhase.GetTreeBalance(); };
            World.prototype.GetTreeQuality = function () { return this.m_contactManager.m_broadPhase.GetTreeQuality(); };
            World.prototype.Dump = function () {
                if (this.IsFlagSet(2)) {
                    return;
                }
                PhysicsType2d.Utils.log("Vector2 g({0}, {1});", this.m_gravity.x, this.m_gravity.y);
                PhysicsType2d.Utils.log("m_world.SetGravity(g);");
                PhysicsType2d.Utils.log("bodies = {0}", this.m_bodyList.Count());
                PhysicsType2d.Utils.log("joints = {0}", this.m_jointList.Count());
                var i = 0;
                var iter = this.m_bodyList.GetIterator();
                while (iter.MoveNext()) {
                    var b = iter.Current();
                    b.SetIslandIndex(i);
                    b.Dump();
                    ++i;
                }
                i = 0;
                var jList = this.m_jointList.GetIterator();
                while (jList.MoveNext()) {
                    var j = jList.Current();
                    j.m_index = i;
                    ++i;
                }
                var jList = this.m_jointList.GetIterator();
                while (jList.MoveNext()) {
                    var j = jList.Current();
                    if (j.m_type == 6) {
                        continue;
                    }
                    PhysicsType2d.Utils.log("{");
                    j.Dump();
                    PhysicsType2d.Utils.log("}");
                }
                var jList = this.m_jointList.GetIterator();
                while (jList.MoveNext()) {
                    var j = jList.Current();
                    if (j.m_type != 6) {
                        continue;
                    }
                    PhysicsType2d.Utils.log("{");
                    j.Dump();
                    PhysicsType2d.Utils.log("}");
                }
                PhysicsType2d.Utils.log("joints = null;");
                PhysicsType2d.Utils.log("bodies = null;");
            };
            World.prototype.DrawJoint = function (joint) {
                var bodyA = joint.GetBodyA();
                var bodyB = joint.GetBodyB();
                var xf1 = bodyA.GetTransform();
                var xf2 = bodyB.GetTransform();
                var x1 = xf1.p;
                var x2 = xf2.p;
                var p1 = joint.GetAnchorA();
                var p2 = joint.GetAnchorB();
                var color = this.m_debugDraw.FromRGB(0.5, 0.8, 0.8);
                switch (joint.GetType()) {
                    case 3:
                        this.m_debugDraw.DrawSegment(p1, p2, color);
                        break;
                    case 4:
                        {
                            var pulley = joint;
                            var s1 = pulley.GetGroundAnchorA();
                            var s2 = pulley.GetGroundAnchorB();
                            this.m_debugDraw.DrawSegment(s1, p1, color);
                            this.m_debugDraw.DrawSegment(s2, p2, color);
                            this.m_debugDraw.DrawSegment(s1, s2, color);
                        }
                        break;
                    case 5: break;
                    default:
                        this.m_debugDraw.DrawSegment(x1, p1, color);
                        this.m_debugDraw.DrawSegment(p1, p2, color);
                        this.m_debugDraw.DrawSegment(x2, p2, color);
                }
            };
            World.prototype.DrawShape = function (fixture, xf, color) {
                switch (fixture.GetType()) {
                    case 0:
                        {
                            var circle = fixture.GetShape();
                            var center = xf.ApplyToVector2(circle.m_p);
                            var radius = circle.m_radius;
                            var axis = xf.q.ApplyToVector2(new PhysicsType2d.Vector2(1.0, 0.0));
                            this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
                        }
                        break;
                    case 1:
                        {
                            var edge = fixture.GetShape();
                            var v1 = xf.ApplyToVector2(edge.m_vertex1);
                            var v2 = xf.ApplyToVector2(edge.m_vertex2);
                            this.m_debugDraw.DrawSegment(v1, v2, color);
                        }
                        break;
                    case 3:
                        {
                            var chain = fixture.GetShape();
                            var count = chain.m_vertices.length;
                            var vertices = chain.m_vertices;
                            var v1 = xf.ApplyToVector2(vertices[0]);
                            for (var i = 1; i < count; ++i) {
                                var v2 = xf.ApplyToVector2(vertices[i]);
                                this.m_debugDraw.DrawSegment(v1, v2, color);
                                this.m_debugDraw.DrawCircle(v1, 0.05, color);
                                v1 = v2;
                            }
                        }
                        break;
                    case 2:
                        {
                            var poly = fixture.GetShape();
                            var vertexCount = poly.m_vertices.length;
                            PhysicsType2d.Assert(vertexCount <= PhysicsType2d.Settings.maxPolygonVertices);
                            var vertices = [];
                            for (var i = 0; i < vertexCount; ++i) {
                                vertices[i] = xf.ApplyToVector2(poly.m_vertices[i]);
                            }
                            this.m_debugDraw.DrawSolidPolygon(vertices, color);
                        }
                        break;
                    default: break;
                }
            };
            World.prototype.SetFlag = function (flag) { this.m_flags.Set(flag); };
            World.prototype.ClearFlag = function (flag) { this.m_flags.Clear(flag); };
            World.prototype.IsFlagSet = function (desiredFlags) { return this.m_flags.IsSet(desiredFlags); };
            return World;
        })();
        Dynamics.World = World;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var JointEdge = (function () {
                function JointEdge() { }
                return JointEdge;
            })();
            Joints.JointEdge = JointEdge;
            ;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        var Body = (function () {
            function Body() { this.m_linearVelocity = new PhysicsType2d.Vector2(0, 0); this.m_force = new PhysicsType2d.Vector2(0, 0); this.m_xf = new PhysicsType2d.Transform(); this.m_sweep = new PhysicsType2d.Sweep(); }
            Body.prototype.CreateFixtureFromDefinition = function (def) {
                PhysicsType2d.Assert(this.m_world.IsLocked() === false);
                if (this.m_world.IsLocked() === true) {
                    return null;
                }
                var fixture = PhysicsType2d.Dynamics.Fixture.Create(this, def);
                if (this.m_flags.IsSet(32)) {
                    var broadPhase = this.m_world.GetContactManager().m_broadPhase;
                    fixture.CreateProxies(broadPhase, this.m_xf);
                }
                this.m_fixtureList.Add(fixture);
                fixture.SetBody(this);
                if (fixture.GetDensity() > 0.0) {
                    this.ResetMassData();
                }
                this.m_world.SetFlag(1);
                return fixture;
            };
            Body.prototype.CreateFixture = function (shape, density) { var def = new PhysicsType2d.Dynamics.FixtureDefinition(); def.shape = shape; def.density = density; return this.CreateFixtureFromDefinition(def); };
            Body.prototype.DestroyFixture = function (fixture) {
                PhysicsType2d.Assert(this.m_world.IsLocked() === false);
                if (this.m_world.IsLocked() === true) {
                    return;
                }
                PhysicsType2d.Assert(fixture.GetBody() === this);
                PhysicsType2d.Assert(this.m_fixtureList.Remove(fixture));
                this.DestroyAssociatedContacts(fixture);
                if (this.m_flags.IsSet(32)) {
                    var broadPhase = this.m_world.GetContactManager().m_broadPhase;
                    fixture.DestroyProxies(broadPhase);
                }
                fixture.Destroy();
                fixture.ClearBody();
                fixture = null;
                this.ResetMassData();
            };
            Body.prototype.DestroyAssociatedContacts = function (fixture) { var iterator = this.m_contactEdgeList.GetIterator(); while (iterator.MoveNext()) {
                var edge = iterator.Current();
                var c = edge.contact;
                var fixtureA = c.GetFixtureA();
                var fixtureB = c.GetFixtureB();
                if (fixture == fixtureA || fixture == fixtureB) {
                    this.m_contactEdgeList.DeleteCurrent(iterator);
                    this.m_world.GetContactManager().Destroy(c);
                }
            } };
            Body.prototype.SetTransform = function (position, angle) {
                PhysicsType2d.Assert(this.m_world.IsLocked() == false);
                if (this.m_world.IsLocked() == true) {
                    return;
                }
                this.m_xf.q.Set(angle);
                this.m_xf.p = position.Clone();
                this.m_sweep.c = this.m_xf.ApplyToVector2(this.m_sweep.localCenter);
                this.m_sweep.a = angle;
                this.m_sweep.c0 = this.m_sweep.c;
                this.m_sweep.a0 = angle;
                var broadPhase = this.m_world.GetContactManager().m_broadPhase;
                var iterator = this.m_fixtureList.GetIterator();
                while (iterator.MoveNext()) {
                    iterator.Current().Synchronize(broadPhase, this.m_xf, this.m_xf);
                }
                this.m_world.GetContactManager().FindNewContacts();
            };
            Body.prototype.GetTransform = function () { return this.m_xf.Clone(); };
            Body.prototype.GetPosition = function () { return this.m_xf.p.Clone(); };
            Body.prototype.GetAngle = function () { return this.m_sweep.a; };
            Body.prototype.GetWorldCenter = function () { return this.m_sweep.c; };
            Body.prototype.GetLocalCenter = function () { return this.m_sweep.localCenter.Clone(); };
            Body.prototype.SetLinearVelocity = function (v) {
                if (this.m_type == 0) {
                    return;
                }
                if (v.Dot(v) > 0.0) {
                    this.SetAwake(true);
                }
                this.m_linearVelocity = v.Clone();
            };
            Body.prototype.GetLinearVelocity = function () { return this.m_linearVelocity.Clone(); };
            Body.prototype.SetAngularVelocity = function (omega) {
                if (this.m_type == 0) {
                    return;
                }
                if (omega * omega > 0.0) {
                    this.SetAwake(true);
                }
                this.m_angularVelocity = omega;
            };
            Body.prototype.GetAngularVelocity = function () { return this.m_angularVelocity; };
            Body.prototype.ApplyForce = function (force, point) {
                if (this.m_type != 2) {
                    return;
                }
                if (this.IsAwake() == false) {
                    this.SetAwake(true);
                }
                this.m_force = this.m_force.Add(force);
                this.m_torque += (point.Subtract(this.m_sweep.c)).Cross(force);
            };
            Body.prototype.ApplyForceToCenter = function (force) {
                if (this.m_type != 2) {
                    return;
                }
                if (this.IsAwake() == false) {
                    this.SetAwake(true);
                }
                this.m_force = this.m_force.Add(force);
            };
            Body.prototype.ApplyTorque = function (torque) {
                if (this.m_type != 2) {
                    return;
                }
                if (this.IsAwake() == false) {
                    this.SetAwake(true);
                }
                this.m_torque += torque;
            };
            Body.prototype.ApplyLinearImpulse = function (impulse, point) {
                if (this.m_type != 2) {
                    return;
                }
                if (this.IsAwake() == false) {
                    this.SetAwake(true);
                }
                this.m_linearVelocity = this.m_linearVelocity.Add(impulse.Multiply(this.m_invMass));
                this.m_angularVelocity += this.m_invI * (point.Subtract(this.m_sweep.c)).Cross(impulse);
            };
            Body.prototype.ApplyAngularImpulse = function (impulse) {
                if (this.m_type != 2) {
                    return;
                }
                if (this.IsAwake() == false) {
                    this.SetAwake(true);
                }
                this.m_angularVelocity += this.m_invI * impulse;
            };
            Body.prototype.GetMass = function () { return this.m_mass; };
            Body.prototype.GetInertia = function () { return this.m_I + this.m_mass * this.m_sweep.localCenter.Dot(this.m_sweep.localCenter); };
            Body.prototype.GetMassData = function () { var data = new PhysicsType2d.Collision.Shapes.MassData(); data.mass = this.m_mass; data.I = this.m_I + this.m_mass * (this.m_sweep.localCenter.Dot(this.m_sweep.localCenter)); data.center = this.m_sweep.localCenter; return data; };
            Body.prototype.SetMassData = function (data) {
                PhysicsType2d.Assert(this.m_world.IsLocked() == false);
                if (this.m_world.IsLocked() == true) {
                    return;
                }
                if (this.m_type != 2) {
                    return;
                }
                this.m_invMass = 0.0;
                this.m_I = 0.0;
                this.m_invI = 0.0;
                this.m_mass = data.mass;
                if (this.m_mass <= 0.0) {
                    this.m_mass = 1.0;
                }
                this.m_invMass = 1.0 / this.m_mass;
                if (data.I > 0.0 && (!this.m_flags.IsSet(16))) {
                    this.m_I = data.I - this.m_mass * data.center.Dot(data.center);
                    PhysicsType2d.Assert(this.m_I > 0.0);
                    this.m_invI = 1.0 / this.m_I;
                }
                var oldCenter = this.m_sweep.c;
                this.m_sweep.localCenter = data.center;
                this.m_sweep.c0 = this.m_sweep.c = this.m_xf.ApplyToVector2(this.m_sweep.localCenter);
                this.m_linearVelocity = this.m_linearVelocity.Add(PhysicsType2d.MathExtensions.Cross1x2(this.m_angularVelocity, this.m_sweep.c.Subtract(oldCenter)));
            };
            Body.prototype.ResetMassData = function () {
                this.m_mass = 0.0;
                this.m_invMass = 0.0;
                this.m_I = 0.0;
                this.m_invI = 0.0;
                this.m_sweep.localCenter.SetZero();
                if (this.m_type == 0 || this.m_type == 1) {
                    this.m_sweep.c0 = this.m_xf.p;
                    this.m_sweep.c = this.m_xf.p;
                    this.m_sweep.a0 = this.m_sweep.a;
                    return;
                }
                PhysicsType2d.Assert(this.m_type == 2);
                var localCenter = PhysicsType2d.Vector2.Zero();
                var iter = this.m_fixtureList.GetIterator();
                while (iter.MoveNext()) {
                    var f = iter.Current();
                    if (f.GetDensity() == 0.0) {
                        continue;
                    }
                    var massData = f.GetMassData();
                    this.m_mass += massData.mass;
                    localCenter = localCenter.Add(massData.center.Multiply(massData.mass));
                    this.m_I += massData.I;
                }
                if (this.m_mass > 0.0) {
                    this.m_invMass = 1.0 / this.m_mass;
                    localCenter = localCenter.Multiply(this.m_invMass);
                }
                else {
                    this.m_mass = 1.0;
                    this.m_invMass = 1.0;
                }
                if (this.m_I > 0.0 && (!this.m_flags.IsSet(16))) {
                    this.m_I -= this.m_mass * localCenter.Dot(localCenter);
                    PhysicsType2d.Assert(this.m_I > 0.0);
                    this.m_invI = 1.0 / this.m_I;
                }
                else {
                    this.m_I = 0.0;
                    this.m_invI = 0.0;
                }
                var oldCenter = this.m_sweep.c;
                this.m_sweep.localCenter = localCenter;
                this.m_sweep.c0 = this.m_sweep.c = this.m_xf.ApplyToVector2(this.m_sweep.localCenter);
                this.m_linearVelocity = this.m_linearVelocity.Add(PhysicsType2d.MathExtensions.Cross1x2(this.m_angularVelocity, this.m_sweep.c.Subtract(oldCenter)));
            };
            Body.prototype.GetWorldPoint = function (localPoint) { return this.m_xf.ApplyToVector2(localPoint); };
            Body.prototype.GetWorldVector = function (localVector) { return this.m_xf.q.ApplyToVector2(localVector); };
            Body.prototype.GetLocalPoint = function (worldPoint) { return this.m_xf.ApplyTransposeToVector2(worldPoint); };
            Body.prototype.GetLocalVector = function (worldVector) { return this.m_xf.q.ApplyTransposeToVector2(worldVector); };
            Body.prototype.GetLinearVelocityFromWorldPoint = function (worldPoint) { return this.m_linearVelocity.Add(PhysicsType2d.MathExtensions.Cross1x2(this.m_angularVelocity, worldPoint.Subtract(this.m_sweep.c))); };
            Body.prototype.GetLinearVelocityFromLocalPoint = function (localPoint) { return this.GetLinearVelocityFromWorldPoint(this.GetWorldPoint(localPoint)); };
            Body.prototype.GetLinearDamping = function () { return this.m_linearDamping; };
            Body.prototype.SetLinearDamping = function (linearDamping) { this.m_linearDamping = linearDamping; };
            Body.prototype.GetAngularDamping = function () { return this.m_angularDamping; };
            Body.prototype.SetAngularDamping = function (angularDamping) { this.m_angularDamping = angularDamping; };
            Body.prototype.GetGravityScale = function () { return this.m_gravityScale; };
            Body.prototype.SetGravityScale = function (scale) { this.m_gravityScale = scale; };
            Body.prototype.SetType = function (type) {
                PhysicsType2d.Assert(this.m_world.IsLocked() === false);
                if (this.m_world.IsLocked() === true) {
                    return;
                }
                if (this.m_type == type) {
                    return;
                }
                this.m_type = type;
                this.ResetMassData();
                if (this.m_type === 0) {
                    this.m_linearVelocity.SetZero();
                    this.m_angularVelocity = 0.0;
                    this.m_sweep.a0 = this.m_sweep.a;
                    this.m_sweep.c0 = this.m_sweep.c;
                    this.SynchronizeFixtures();
                }
                this.SetAwake(true);
                this.m_force.SetZero();
                this.m_torque = 0.0;
                var iter = this.m_fixtureList.GetIterator();
                while (iter.MoveNext()) {
                    iter.Current().Refilter();
                }
            };
            Body.prototype.GetType = function () { return this.m_type; };
            Body.prototype.SetSleepingAllowed = function (flag) { if (flag) {
                this.m_flags.Set(4);
            }
            else {
                this.m_flags.Clear(4);
                this.SetAwake(true);
            } };
            Body.prototype.IsSleepingAllowed = function () { return this.m_flags.IsSet(4); };
            Body.prototype.SetBullet = function (flag) { if (flag) {
                this.m_flags.Set(8);
            }
            else {
                this.m_flags.Clear(8);
            } };
            Body.prototype.IsBullet = function () { return this.m_flags.IsSet(8); };
            Body.prototype.SetAwake = function (flag) { if (flag) {
                if (!this.m_flags.IsSet(2)) {
                    this.m_flags.Set(2);
                    this.m_sleepTime = 0.0;
                }
            }
            else {
                this.m_flags.Clear(2);
                this.m_sleepTime = 0.0;
                this.m_linearVelocity.SetZero();
                this.m_angularVelocity = 0.0;
                this.m_force.SetZero();
                this.m_torque = 0.0;
            } };
            Body.prototype.IsAwake = function () { return this.m_flags.IsSet(2); };
            Body.prototype.SetActive = function (flag) {
                PhysicsType2d.Assert(this.m_world.IsLocked() === false);
                if (flag === this.IsActive()) {
                    return;
                }
                if (flag) {
                    this.m_flags.Set(32);
                    var broadPhase = this.m_world.GetContactManager().m_broadPhase;
                    var iter = this.m_fixtureList.GetIterator();
                    while (iter.MoveNext()) {
                        iter.Current().CreateProxies(broadPhase, this.m_xf);
                    }
                }
                else {
                    this.m_flags.Clear(32);
                    var broadPhase = this.m_world.GetContactManager().m_broadPhase;
                    var f = this.m_fixtureList.GetIterator();
                    while (f.MoveNext()) {
                        f.Current().DestroyProxies(broadPhase);
                    }
                    var ce = this.m_contactEdgeList.GetIterator();
                    while (ce.MoveNext()) {
                        this.m_world.GetContactManager().Destroy(ce.Current().contact);
                    }
                    this.m_contactEdgeList = new PhysicsType2d.LinkedList();
                }
            };
            Body.prototype.GetIslandIndex = function () { return this.m_islandIndex; };
            Body.prototype.SetIslandIndex = function (value) { this.m_islandIndex = value; };
            Body.prototype.GetSweep = function () { return this.m_sweep.Clone(); };
            Body.prototype.SetSweep = function (value) { this.m_sweep = value.Clone(); };
            Body.prototype.GetSleepTime = function () { return this.m_sleepTime; };
            Body.prototype.SetSleepTime = function (value) { this.m_sleepTime = value; };
            Body.prototype.GetInvMass = function () { return this.m_invMass; };
            Body.prototype.GetInvI = function () { return this.m_invI; };
            Body.prototype.IsActive = function () { return this.m_flags.IsSet(32); };
            Body.prototype.SetFixedRotation = function (flag) {
                if (flag) {
                    this.m_flags.Set(16);
                }
                else {
                    this.m_flags.Clear(16);
                }
                this.ResetMassData();
            };
            Body.prototype.IsFixedRotation = function () { return this.m_flags.IsSet(16); };
            Body.prototype.GetFixtures = function () { return this.m_fixtureList.GetIterator(); };
            Body.prototype.ClearFixtures = function () { this.m_fixtureList = new PhysicsType2d.LinkedList(); };
            Body.prototype.GetJointEdges = function () { return this.m_jointEdgeList.GetIterator(); };
            Body.prototype.ClearJointEdges = function () { this.m_jointEdgeList = new PhysicsType2d.LinkedList(); };
            Body.prototype.AddJointEdge = function (edge) { this.m_jointEdgeList.Add(edge); };
            Body.prototype.RemoveJointEdge = function (edge) { return this.m_jointEdgeList.Remove(edge); };
            Body.prototype.GetContactEdges = function () { return this.m_contactEdgeList.GetIterator(); };
            Body.prototype.ClearContactEdges = function () { this.m_contactEdgeList = new PhysicsType2d.LinkedList(); };
            Body.prototype.RemoveContactEdge = function (edge) { return this.m_contactEdgeList.Remove(edge); };
            Body.prototype.AddContactEdge = function (edge) { this.m_contactEdgeList.Add(edge); };
            Body.prototype.SetUserData = function (data) { this.m_userData = data; };
            Body.prototype.GetUserData = function () { return this.m_userData; };
            Body.prototype.GetWorld = function () { return this.m_world; };
            Body.prototype.Dump = function () {
                var bodyIndex = this.m_islandIndex;
                PhysicsType2d.Utils.log("{");
                PhysicsType2d.Utils.log("  BodyDefinition bd;");
                PhysicsType2d.Utils.log("  bd.type = BodyType(%d);", this.m_type);
                PhysicsType2d.Utils.log("  bd.position.Set(%f, %f);", this.m_xf.p.x, this.m_xf.p.y);
                PhysicsType2d.Utils.log("  bd.angle = %d;", this.m_sweep.a);
                PhysicsType2d.Utils.log("  bd.linearVelocity.Set(%f, %f);", this.m_linearVelocity.x, this.m_linearVelocity.y);
                PhysicsType2d.Utils.log("  bd.angularVelocity = %d;", this.m_angularVelocity);
                PhysicsType2d.Utils.log("  bd.linearDamping = %f;", this.m_linearDamping);
                PhysicsType2d.Utils.log("  bd.angularDamping = %f;", this.m_angularDamping);
                PhysicsType2d.Utils.log("  bd.allowSleep = boolean(%d);", this.m_flags.IsSet(4));
                PhysicsType2d.Utils.log("  bd.awake = boolean(%d);", this.m_flags.IsSet(2));
                PhysicsType2d.Utils.log("  bd.fixedRotation = boolean(%d);", this.m_flags.IsSet(16));
                PhysicsType2d.Utils.log("  bd.bullet = boolean(%d);", this.m_flags.IsSet(8));
                PhysicsType2d.Utils.log("  bd.active = boolean(%d);", this.m_flags.IsSet(32));
                PhysicsType2d.Utils.log("  bd.gravityScale = %d;", this.m_gravityScale);
                PhysicsType2d.Utils.log("  bodies[%d] = m_world.CreateBody(&bd);", this.m_islandIndex);
                PhysicsType2d.Utils.log("");
                var iter = this.m_fixtureList.GetIterator();
                while (iter.MoveNext()) {
                    PhysicsType2d.Utils.log("  {");
                    iter.Current().Dump(bodyIndex);
                    PhysicsType2d.Utils.log("  }");
                }
                PhysicsType2d.Utils.log("}");
            };
            Body.prototype.GetForce = function () { return this.m_force.Clone(); };
            Body.prototype.SetForce = function (value) { this.m_force = value.Clone(); };
            Body.prototype.GetTorque = function () { return this.m_torque; };
            Body.prototype.SetTorque = function (value) { this.m_torque = value; };
            Body.FromDefinition = function (def, world) {
                var bd = def.Clone();
                PhysicsType2d.Assert(bd.position.IsValid());
                PhysicsType2d.Assert(bd.linearVelocity.IsValid());
                PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(bd.angle));
                PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(bd.angularVelocity));
                PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(bd.angularDamping) && bd.angularDamping >= 0.0);
                PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(bd.linearDamping) && bd.linearDamping >= 0.0);
                var newBody = new Body();
                newBody.m_flags = new PhysicsType2d.BitFlag(0);
                if (bd.bullet) {
                    newBody.m_flags.Set(8);
                }
                if (bd.fixedRotation) {
                    newBody.m_flags.Set(16);
                }
                if (bd.allowSleep) {
                    newBody.m_flags.Set(4);
                }
                if (bd.awake) {
                    newBody.m_flags.Set(2);
                }
                if (bd.active) {
                    newBody.m_flags.Set(32);
                }
                newBody.m_world = world;
                newBody.m_xf.p = bd.position;
                newBody.m_xf.q.Set(bd.angle);
                newBody.m_sweep.localCenter.SetZero();
                newBody.m_sweep.c0 = newBody.m_xf.p;
                newBody.m_sweep.c = newBody.m_xf.p;
                newBody.m_sweep.a0 = bd.angle;
                newBody.m_sweep.a = bd.angle;
                newBody.m_sweep.alpha0 = 0.0;
                newBody.m_jointEdgeList = new PhysicsType2d.LinkedList();
                newBody.m_contactEdgeList = new PhysicsType2d.LinkedList();
                newBody.m_linearVelocity = bd.linearVelocity;
                newBody.m_angularVelocity = bd.angularVelocity;
                newBody.m_linearDamping = bd.linearDamping;
                newBody.m_angularDamping = bd.angularDamping;
                newBody.m_gravityScale = bd.gravityScale;
                newBody.m_force.SetZero();
                newBody.m_torque = 0.0;
                newBody.m_sleepTime = 0.0;
                newBody.m_type = bd.type;
                if (newBody.m_type == 2) {
                    newBody.m_mass = 1.0;
                    newBody.m_invMass = 1.0;
                }
                else {
                    newBody.m_mass = 0.0;
                    newBody.m_invMass = 0.0;
                }
                newBody.m_I = 0.0;
                newBody.m_invI = 0.0;
                newBody.m_userData = bd.userData;
                newBody.m_fixtureList = new PhysicsType2d.LinkedList();
                return newBody;
            };
            Body.prototype.SynchronizeFixtures = function () { var xf1 = new PhysicsType2d.Transform(); xf1.q.Set(this.m_sweep.a0); xf1.p = this.m_sweep.c0.Subtract(xf1.q.ApplyToVector2(this.m_sweep.localCenter)); var broadPhase = this.m_world.GetContactManager().m_broadPhase; var iter = this.m_fixtureList.GetIterator(); while (iter.MoveNext()) {
                iter.Current().Synchronize(broadPhase, xf1, this.m_xf);
            } };
            Body.prototype.SynchronizeTransform = function () { this.m_xf.q.Set(this.m_sweep.a); this.m_xf.p = this.m_sweep.c.Subtract(this.m_xf.q.ApplyToVector2(this.m_sweep.localCenter)); };
            Body.prototype.ShouldCollide = function (other) {
                if (this.m_type != 2 && other.m_type != 2) {
                    return false;
                }
                var iter = this.m_jointEdgeList.GetIterator();
                while (iter.MoveNext()) {
                    var jn = iter.Current();
                    if (jn.other == other) {
                        if (jn.joint.m_collideConnected == false) {
                            return false;
                        }
                    }
                }
                return true;
            };
            Body.prototype.Advance = function (alpha) { this.m_sweep.Advance(alpha); this.m_sweep.c = this.m_sweep.c0; this.m_sweep.a = this.m_sweep.a0; this.m_xf.q.Set(this.m_sweep.a); this.m_xf.p = this.m_sweep.c.Subtract(this.m_xf.q.ApplyToVector2(this.m_sweep.localCenter)); };
            Body.prototype.SetFlag = function (flag) { this.m_flags.Set(flag); };
            Body.prototype.ClearFlag = function (flag) { this.m_flags.Clear(flag); };
            Body.prototype.IsFlagSet = function (desiredFlags) { return this.m_flags.IsSet(desiredFlags); };
            return Body;
        })();
        Dynamics.Body = Body;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            var ChainAndCircleContact = (function (_super) {
                __extends(ChainAndCircleContact, _super);
                function ChainAndCircleContact(fixtureA, indexA, fixtureB, indexB) { _super.call(this, fixtureA, indexA, fixtureB, indexB); PhysicsType2d.Assert(this.m_fixtureA.GetType() == 3); PhysicsType2d.Assert(this.m_fixtureB.GetType() == 0); }
                ChainAndCircleContact.Create = function (fixtureA, indexA, fixtureB, indexB) { return new ChainAndCircleContact(fixtureA, indexA, fixtureB, indexB); };
                ChainAndCircleContact.prototype.Evaluate = function (manifold, xfA, xfB) { var chain = this.m_fixtureA.GetShape(); var edge = chain.GetChildEdge(this.m_indexA); return PhysicsType2d.Collision.CollideEdgeAndCircle(manifold, edge, xfA, this.m_fixtureB.GetShape(), xfB); };
                return ChainAndCircleContact;
            })(PhysicsType2d.Dynamics.Contacts.Contact);
            Contacts.ChainAndCircleContact = ChainAndCircleContact;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            var ChainAndPolygonContact = (function (_super) {
                __extends(ChainAndPolygonContact, _super);
                function ChainAndPolygonContact(fixtureA, indexA, fixtureB, indexB) { _super.call(this, fixtureA, indexA, fixtureB, indexB); PhysicsType2d.Assert(this.m_fixtureA.GetType() == 3); PhysicsType2d.Assert(this.m_fixtureB.GetType() == 2); }
                ChainAndPolygonContact.Create = function (fixtureA, indexA, fixtureB, indexB) { return new ChainAndPolygonContact(fixtureA, indexA, fixtureB, indexB); };
                ChainAndPolygonContact.prototype.Evaluate = function (manifold, xfA, xfB) { var chain = this.m_fixtureA.GetShape(); var edge = chain.GetChildEdge(this.m_indexA); return PhysicsType2d.Collision.CollideEdgeAndPolygon(manifold, edge, xfA, this.m_fixtureB.GetShape(), xfB); };
                return ChainAndPolygonContact;
            })(PhysicsType2d.Dynamics.Contacts.Contact);
            Contacts.ChainAndPolygonContact = ChainAndPolygonContact;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            var CircleContact = (function (_super) {
                __extends(CircleContact, _super);
                function CircleContact(fixtureA, indexA, fixtureB, indexB) { _super.call(this, fixtureA, indexA, fixtureB, indexB); PhysicsType2d.Assert(this.m_fixtureA.GetType() == 0); PhysicsType2d.Assert(this.m_fixtureB.GetType() == 0); }
                CircleContact.Create = function (fixtureA, indexA, fixtureB, indexB) { return new CircleContact(fixtureA, indexA, fixtureB, indexB); };
                CircleContact.prototype.Evaluate = function (manifold, xfA, xfB) { return PhysicsType2d.Collision.CollideCircles(manifold, this.m_fixtureA.GetShape(), xfA, this.m_fixtureB.GetShape(), xfB); };
                return CircleContact;
            })(PhysicsType2d.Dynamics.Contacts.Contact);
            Contacts.CircleContact = CircleContact;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            var EdgeAndCircleContact = (function (_super) {
                __extends(EdgeAndCircleContact, _super);
                function EdgeAndCircleContact(fixtureA, indexA, fixtureB, indexB) { _super.call(this, fixtureA, indexA, fixtureB, indexB); PhysicsType2d.Assert(this.m_fixtureA.GetType() == 1); PhysicsType2d.Assert(this.m_fixtureB.GetType() == 0); }
                EdgeAndCircleContact.Create = function (fixtureA, indexA, fixtureB, indexB) { return new EdgeAndCircleContact(fixtureA, indexA, fixtureB, indexB); };
                EdgeAndCircleContact.prototype.Evaluate = function (manifold, xfA, xfB) { return PhysicsType2d.Collision.CollideEdgeAndCircle(manifold, this.m_fixtureA.GetShape(), xfA, this.m_fixtureB.GetShape(), xfB); };
                return EdgeAndCircleContact;
            })(PhysicsType2d.Dynamics.Contacts.Contact);
            Contacts.EdgeAndCircleContact = EdgeAndCircleContact;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            var EdgeAndPolygonContact = (function (_super) {
                __extends(EdgeAndPolygonContact, _super);
                function EdgeAndPolygonContact(fixtureA, indexA, fixtureB, indexB) { _super.call(this, fixtureA, indexA, fixtureB, indexB); PhysicsType2d.Assert(this.m_fixtureA.GetType() == 1); PhysicsType2d.Assert(this.m_fixtureB.GetType() == 2); }
                EdgeAndPolygonContact.Create = function (fixtureA, indexA, fixtureB, indexB) { return new EdgeAndPolygonContact(fixtureA, indexA, fixtureB, indexB); };
                EdgeAndPolygonContact.prototype.Evaluate = function (manifold, xfA, xfB) { return PhysicsType2d.Collision.CollideEdgeAndPolygon(manifold, this.m_fixtureA.GetShape(), xfA, this.m_fixtureB.GetShape(), xfB); };
                return EdgeAndPolygonContact;
            })(PhysicsType2d.Dynamics.Contacts.Contact);
            Contacts.EdgeAndPolygonContact = EdgeAndPolygonContact;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            var PolygonAndCircleContact = (function (_super) {
                __extends(PolygonAndCircleContact, _super);
                function PolygonAndCircleContact(fixtureA, indexA, fixtureB, indexB) { _super.call(this, fixtureA, indexA, fixtureB, indexB); PhysicsType2d.Assert(this.m_fixtureA.GetType() == 2); PhysicsType2d.Assert(this.m_fixtureB.GetType() == 0); }
                PolygonAndCircleContact.Create = function (fixtureA, indexA, fixtureB, indexB) { return new PolygonAndCircleContact(fixtureA, indexA, fixtureB, indexB); };
                PolygonAndCircleContact.prototype.Evaluate = function (manifold, xfA, xfB) { return PhysicsType2d.Collision.CollidePolygonAndCircle(manifold, this.m_fixtureA.GetShape(), xfA, this.m_fixtureB.GetShape(), xfB); };
                return PolygonAndCircleContact;
            })(PhysicsType2d.Dynamics.Contacts.Contact);
            Contacts.PolygonAndCircleContact = PolygonAndCircleContact;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Contacts) {
            var PolygonContact = (function (_super) {
                __extends(PolygonContact, _super);
                function PolygonContact(fixtureA, indexA, fixtureB, indexB) { _super.call(this, fixtureA, indexA, fixtureB, indexB); PhysicsType2d.Assert(this.m_fixtureA.GetType() == 2); PhysicsType2d.Assert(this.m_fixtureB.GetType() == 2); }
                PolygonContact.Create = function (fixtureA, indexA, fixtureB, indexB) { return new PolygonContact(fixtureA, indexA, fixtureB, indexB); };
                PolygonContact.prototype.Evaluate = function (manifold, xfA, xfB) { return PhysicsType2d.Collision.CollidePolygons(manifold, this.m_fixtureA.GetShape(), xfA, this.m_fixtureB.GetShape(), xfB); };
                return PolygonContact;
            })(PhysicsType2d.Dynamics.Contacts.Contact);
            Contacts.PolygonContact = PolygonContact;
        })(Dynamics.Contacts || (Dynamics.Contacts = {}));
        var Contacts = Dynamics.Contacts;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var DistanceJointDefinition = (function (_super) {
                __extends(DistanceJointDefinition, _super);
                function DistanceJointDefinition() { _super.call(this); this.localAnchorA = new PhysicsType2d.Vector2(0, 0); this.localAnchorB = new PhysicsType2d.Vector2(0, 0); this.type = 3; this.length = 1.0; this.frequencyHz = 0.0; this.dampingRatio = 0.0; }
                DistanceJointDefinition.prototype.Initialize = function (bA, bB, anchorA, anchorB) { this.bodyA = bA; this.bodyB = bB; this.localAnchorA = this.bodyA.GetLocalPoint(anchorA); this.localAnchorB = this.bodyB.GetLocalPoint(anchorB); var d = anchorB.Subtract(anchorA); this.length = d.Length(); };
                return DistanceJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.DistanceJointDefinition = DistanceJointDefinition;
            var DistanceJoint = (function (_super) {
                __extends(DistanceJoint, _super);
                function DistanceJoint(def) { _super.call(this, def); this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_u = new PhysicsType2d.Vector2(0, 0); this.m_rA = new PhysicsType2d.Vector2(0, 0); this.m_rB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorA = def.localAnchorA; this.m_localAnchorB = def.localAnchorB; this.m_length = def.length; this.m_frequencyHz = def.frequencyHz; this.m_dampingRatio = def.dampingRatio; this.m_impulse = 0.0; this.m_gamma = 0.0; this.m_bias = 0.0; }
                DistanceJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                DistanceJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                DistanceJoint.prototype.GetReactionForce = function (inv_dt) { return this.m_u.Multiply(inv_dt * this.m_impulse); };
                DistanceJoint.prototype.GetReactionTorque = function (inv_dt) { return 0.0; };
                DistanceJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
                DistanceJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
                DistanceJoint.prototype.SetLength = function (length) { this.m_length = length; };
                DistanceJoint.prototype.GetLength = function () { return this.m_length; };
                DistanceJoint.prototype.SetFrequency = function (hz) { this.m_frequencyHz = hz; };
                DistanceJoint.prototype.GetFrequency = function () { return this.m_frequencyHz; };
                DistanceJoint.prototype.SetDampingRatio = function (ratio) { this.m_dampingRatio = ratio; };
                DistanceJoint.prototype.GetDampingRatio = function () { return this.m_dampingRatio; };
                DistanceJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log(" DistanceJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.localAnchorA.Set({0}, {1});", this.m_localAnchorA.x, this.m_localAnchorA.y); PhysicsType2d.Utils.log("  jd.localAnchorB.Set({0}, {1});", this.m_localAnchorB.x, this.m_localAnchorB.y); PhysicsType2d.Utils.log("  jd.length = {0};", this.m_length); PhysicsType2d.Utils.log("  jd.frequencyHz = {0};", this.m_frequencyHz); PhysicsType2d.Utils.log("  jd.dampingRatio = {0};", this.m_dampingRatio); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world->CreateJoint(&jd);", this.m_index); };
                DistanceJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    this.m_rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    this.m_rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    this.m_u = cB.Add(this.m_rB).Subtract(cA).Subtract(this.m_rA);
                    var length = this.m_u.Length();
                    if (length > PhysicsType2d.Settings.linearSlop) {
                        this.m_u = this.m_u.Multiply(1.0 / length);
                    }
                    else {
                        this.m_u.Set(0.0, 0.0);
                    }
                    var crAu = this.m_rA.Cross(this.m_u);
                    var crBu = this.m_rB.Cross(this.m_u);
                    var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;
                    this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
                    if (this.m_frequencyHz > 0.0) {
                        var C = length - this.m_length;
                        var omega = 2.0 * PhysicsType2d.Constants.PI * this.m_frequencyHz;
                        var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
                        var k = this.m_mass * omega * omega;
                        var h = data.step.dt;
                        this.m_gamma = h * (d + h * k);
                        this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
                        this.m_bias = C * h * k * this.m_gamma;
                        invMass += this.m_gamma;
                        this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
                    }
                    else {
                        this.m_gamma = 0.0;
                        this.m_bias = 0.0;
                    }
                    if (data.step.warmStarting) {
                        this.m_impulse *= data.step.dtRatio;
                        var P = this.m_u.Multiply(this.m_impulse);
                        vA = vA.Subtract(P.Multiply(this.m_invMassA));
                        wA -= this.m_invIA * this.m_rA.Cross(P);
                        vB = vB.Add(P.Multiply(this.m_invMassB));
                        wB += this.m_invIB * this.m_rB.Cross(P);
                    }
                    else {
                        this.m_impulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                DistanceJoint.prototype.SolveVelocityConstraints = function (data) { var vA = data.velocities[this.m_indexA].v; var wA = data.velocities[this.m_indexA].w; var vB = data.velocities[this.m_indexB].v; var wB = data.velocities[this.m_indexB].w; var vpA = vA.Add(PhysicsType2d.MathExtensions.Cross1x2(wA, this.m_rA)); var vpB = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, this.m_rB)); var Cdot = this.m_u.Dot(vpB.Subtract(vpA)); var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse); this.m_impulse += impulse; var P = this.m_u.Multiply(impulse); vA = vA.Subtract(P.Multiply(this.m_invMassA)); wA -= this.m_invIA * this.m_rA.Cross(P); vB = vB.Add(P.Multiply(this.m_invMassB)); wB += this.m_invIB * this.m_rB.Cross(P); data.velocities[this.m_indexA].v = vA; data.velocities[this.m_indexA].w = wA; data.velocities[this.m_indexB].v = vB; data.velocities[this.m_indexB].w = wB; };
                DistanceJoint.prototype.SolvePositionConstraints = function (data) {
                    if (this.m_frequencyHz > 0.0) {
                        return true;
                    }
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var u = cB.Add(rB.Subtract(cA).Subtract(rA));
                    var length = u.Normalize();
                    var C = length - this.m_length;
                    C = PhysicsType2d.MathExtensions.Clamp(C, -PhysicsType2d.Settings.maxLinearCorrection, PhysicsType2d.Settings.maxLinearCorrection);
                    var impulse = -this.m_mass * C;
                    var P = u.Multiply(impulse);
                    cA = cA.Subtract(P.Multiply(this.m_invMassA));
                    aA -= this.m_invIA * rA.Cross(P);
                    cB = cB.Add(P.Multiply(this.m_invMassB));
                    aB += this.m_invIB * rB.Cross(P);
                    data.positions[this.m_indexA].c = cA;
                    data.positions[this.m_indexA].a = aA;
                    data.positions[this.m_indexB].c = cB;
                    data.positions[this.m_indexB].a = aB;
                    return Math.abs(C) < PhysicsType2d.Settings.linearSlop;
                };
                return DistanceJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.DistanceJoint = DistanceJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var FrictionJointDefinition = (function (_super) {
                __extends(FrictionJointDefinition, _super);
                function FrictionJointDefinition() { _super.call(this); this.localAnchorA = new PhysicsType2d.Vector2(0, 0); this.localAnchorB = new PhysicsType2d.Vector2(0, 0); this.type = 9; this.maxForce = 0.0; this.maxTorque = 0.0; }
                FrictionJointDefinition.prototype.Initialize = function (bA, bB, anchor) { this.bodyA = bA; this.bodyB = bB; this.localAnchorA = this.bodyA.GetLocalPoint(anchor); this.localAnchorB = this.bodyB.GetLocalPoint(anchor); };
                return FrictionJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.FrictionJointDefinition = FrictionJointDefinition;
            var FrictionJoint = (function (_super) {
                __extends(FrictionJoint, _super);
                function FrictionJoint(def) { _super.call(this, def); this.m_linearImpulse = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_u = new PhysicsType2d.Vector2(0, 0); this.m_rA = new PhysicsType2d.Vector2(0, 0); this.m_rB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_linearMass = new PhysicsType2d.Matrix2x2(); this.m_localAnchorA = def.localAnchorA; this.m_localAnchorB = def.localAnchorB; this.m_angularImpulse = 0.0; this.m_maxForce = def.maxForce; this.m_maxTorque = def.maxTorque; }
                FrictionJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    this.m_rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    this.m_rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var mA = this.m_invMassA;
                    var mB = this.m_invMassB;
                    var iA = this.m_invIA;
                    var iB = this.m_invIB;
                    var K = new PhysicsType2d.Matrix2x2();
                    K.EX.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
                    K.EX.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
                    K.EY.x = K.EX.y;
                    K.EY.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
                    this.m_linearMass = K.GetInverse();
                    this.m_angularMass = iA + iB;
                    if (this.m_angularMass > 0.0) {
                        this.m_angularMass = 1.0 / this.m_angularMass;
                    }
                    if (data.step.warmStarting) {
                        this.m_linearImpulse = this.m_linearImpulse.Multiply(data.step.dtRatio);
                        this.m_angularImpulse *= data.step.dtRatio;
                        var P = new PhysicsType2d.Vector2(this.m_linearImpulse.x, this.m_linearImpulse.y);
                        vA = vA.Subtract(P.Multiply(mA));
                        wA -= iA * (this.m_rA.Cross(P) + this.m_angularImpulse);
                        vB = vB.Add(P.Multiply(mB));
                        wB += iB * (this.m_rB.Cross(P) + this.m_angularImpulse);
                    }
                    else {
                        this.m_linearImpulse.SetZero();
                        this.m_angularImpulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                FrictionJoint.prototype.SolveAngularFriction = function (velocityA, velocityB, h) { var iA = this.m_invIA; var iB = this.m_invIB; var Cdot = velocityB.w - velocityA.w; var impulse = -this.m_angularMass * Cdot; var oldImpulse = this.m_angularImpulse; var maxImpulse = h * this.m_maxTorque; this.m_angularImpulse = PhysicsType2d.MathExtensions.Clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse); impulse = this.m_angularImpulse - oldImpulse; velocityA.w -= iA * impulse; velocityB.w += iB * impulse; };
                FrictionJoint.prototype.SolveLinearFriction = function (velocityA, velocityB, h) {
                    var Cdot = velocityB.v.Add(PhysicsType2d.MathExtensions.Cross1x2(velocityB.w, this.m_rB)).Subtract(velocityA.v).Subtract(PhysicsType2d.MathExtensions.Cross1x2(velocityA.w, this.m_rA));
                    var impulse = this.m_linearMass.VectorMultiply(Cdot).Negative();
                    var oldImpulse = this.m_linearImpulse;
                    this.m_linearImpulse = this.m_linearImpulse.Add(impulse);
                    var maxImpulse = h * this.m_maxForce;
                    if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
                        this.m_linearImpulse.Normalize();
                        this.m_linearImpulse = this.m_linearImpulse.Multiply(maxImpulse);
                    }
                    impulse = this.m_linearImpulse.Subtract(oldImpulse);
                    var iA = this.m_invIA;
                    var iB = this.m_invIB;
                    var mA = this.m_invMassA;
                    var mB = this.m_invMassB;
                    velocityA.v = velocityA.v.Subtract(impulse.Multiply(mA));
                    velocityA.w -= iA * this.m_rA.Cross(impulse);
                    velocityB.v = velocityB.v.Add(impulse.Multiply(mB));
                    velocityB.w += iB * this.m_rB.Cross(impulse);
                };
                FrictionJoint.prototype.SolveVelocityConstraints = function (data) { var h = data.step.dt; this.SolveAngularFriction(data.velocities[this.m_indexA], data.velocities[this.m_indexB], h); this.SolveLinearFriction(data.velocities[this.m_indexA], data.velocities[this.m_indexB], h); };
                FrictionJoint.prototype.SolvePositionConstraints = function (data) { return true; };
                FrictionJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
                FrictionJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
                FrictionJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                FrictionJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                FrictionJoint.prototype.GetReactionForce = function (inv_dt) { return this.m_linearImpulse.Multiply(inv_dt); };
                FrictionJoint.prototype.GetReactionTorque = function (inv_dt) { return inv_dt * this.m_angularImpulse; };
                FrictionJoint.prototype.SetMaxForce = function (force) { PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(force) && force >= 0.0); this.m_maxForce = force; };
                FrictionJoint.prototype.GetMaxForce = function () { return this.m_maxForce; };
                FrictionJoint.prototype.SetMaxTorque = function (torque) { PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(torque) && torque >= 0.0); this.m_maxTorque = torque; };
                FrictionJoint.prototype.GetMaxTorque = function () { return this.m_maxTorque; };
                FrictionJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log(" FrictionJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.localAnchorA.Set({0}, {1});", this.m_localAnchorA.x, this.m_localAnchorA.y); PhysicsType2d.Utils.log("  jd.localAnchorB.Set({0}, {1});", this.m_localAnchorB.x, this.m_localAnchorB.y); PhysicsType2d.Utils.log("  jd.maxForce = {0};", this.m_maxForce); PhysicsType2d.Utils.log("  jd.maxTorque = {0};", this.m_maxTorque); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world->CreateJoint(&jd);", this.m_index); };
                return FrictionJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.FrictionJoint = FrictionJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var RevoluteJointDefinition = (function (_super) {
                __extends(RevoluteJointDefinition, _super);
                function RevoluteJointDefinition() { _super.call(this); this.localAnchorA = new PhysicsType2d.Vector2(0, 0); this.localAnchorB = new PhysicsType2d.Vector2(0, 0); this.type = 1; this.localAnchorA = new PhysicsType2d.Vector2(0.0, 0.0); this.localAnchorB = new PhysicsType2d.Vector2(0.0, 0.0); this.referenceAngle = 0.0; this.lowerAngle = 0.0; this.upperAngle = 0.0; this.maxMotorTorque = 0.0; this.motorSpeed = 0.0; this.enableLimit = false; this.enableMotor = false; }
                RevoluteJointDefinition.prototype.Initialize = function (bA, bB, anchor) { this.bodyA = bA; this.bodyB = bB; this.localAnchorA = this.bodyA.GetLocalPoint(anchor); this.localAnchorB = this.bodyB.GetLocalPoint(anchor); this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle(); };
                return RevoluteJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.RevoluteJointDefinition = RevoluteJointDefinition;
            var RevoluteJoint = (function (_super) {
                __extends(RevoluteJoint, _super);
                function RevoluteJoint(def) { _super.call(this, def); this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_rA = new PhysicsType2d.Vector2(0, 0); this.m_rB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_mass = new PhysicsType2d.Matrix3x3(); this.m_localAnchorA = def.localAnchorA; this.m_localAnchorB = def.localAnchorB; this.m_referenceAngle = def.referenceAngle; this.m_impulse = new PhysicsType2d.Vector3(0, 0, 0); this.m_motorImpulse = 0.0; this.m_lowerAngle = def.lowerAngle; this.m_upperAngle = def.upperAngle; this.m_maxMotorTorque = def.maxMotorTorque; this.m_motorSpeed = def.motorSpeed; this.m_enableLimit = def.enableLimit; this.m_enableMotor = def.enableMotor; this.m_limitState = 0; }
                RevoluteJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                RevoluteJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                RevoluteJoint.prototype.GetReactionForce = function (inv_dt) { var P = new PhysicsType2d.Vector2(this.m_impulse.x, this.m_impulse.y); return P.Multiply(inv_dt); };
                RevoluteJoint.prototype.GetReactionTorque = function (inv_dt) { return inv_dt * this.m_impulse.z; };
                RevoluteJoint.prototype.GetJointAngle = function () { var bA = this.m_bodyA; var bB = this.m_bodyB; return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle; };
                RevoluteJoint.prototype.GetJointSpeed = function () { var bA = this.m_bodyA; var bB = this.m_bodyB; return bB.GetAngularVelocity() - bA.GetAngularVelocity(); };
                RevoluteJoint.prototype.IsMotorEnabled = function () { return this.m_enableMotor; };
                RevoluteJoint.prototype.EnableMotor = function (flag) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_enableMotor = flag; };
                RevoluteJoint.prototype.GetMotorTorque = function (inv_dt) { return inv_dt * this.m_motorImpulse; };
                RevoluteJoint.prototype.SetMotorSpeed = function (speed) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_motorSpeed = speed; };
                RevoluteJoint.prototype.SetMaxMotorTorque = function (torque) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_maxMotorTorque = torque; };
                RevoluteJoint.prototype.IsLimitEnabled = function () { return this.m_enableLimit; };
                RevoluteJoint.prototype.EnableLimit = function (flag) { if (flag != this.m_enableLimit) {
                    this.m_bodyA.SetAwake(true);
                    this.m_bodyB.SetAwake(true);
                    this.m_enableLimit = flag;
                    this.m_impulse.z = 0.0;
                } };
                RevoluteJoint.prototype.GetLowerLimit = function () { return this.m_lowerAngle; };
                RevoluteJoint.prototype.GetUpperLimit = function () { return this.m_upperAngle; };
                RevoluteJoint.prototype.SetLimits = function (lower, upper) { PhysicsType2d.Assert(lower <= upper); if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
                    this.m_bodyA.SetAwake(true);
                    this.m_bodyB.SetAwake(true);
                    this.m_impulse.z = 0.0;
                    this.m_lowerAngle = lower;
                    this.m_upperAngle = upper;
                } };
                RevoluteJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log("  RevoluteJointDefinition jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.localAnchorA.Set({0}, {1});", this.m_localAnchorA.x, this.m_localAnchorA.y); PhysicsType2d.Utils.log("  jd.localAnchorB.Set({0}, {1});", this.m_localAnchorB.x, this.m_localAnchorB.y); PhysicsType2d.Utils.log("  jd.referenceAngle = {0};", this.m_referenceAngle); PhysicsType2d.Utils.log("  jd.enableLimit = boolean({0});", this.m_enableLimit); PhysicsType2d.Utils.log("  jd.lowerAngle = {0};", this.m_lowerAngle); PhysicsType2d.Utils.log("  jd.upperAngle = {0};", this.m_upperAngle); PhysicsType2d.Utils.log("  jd.enableMotor = boolean({0});", this.m_enableMotor); PhysicsType2d.Utils.log("  jd.motorSpeed = {0};", this.m_motorSpeed); PhysicsType2d.Utils.log("  jd.maxMotorTorque = {0};", this.m_maxMotorTorque); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world->CreateJoint(&jd);", this.m_index); };
                RevoluteJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
                RevoluteJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
                RevoluteJoint.prototype.GetReferenceAngle = function () { return this.m_referenceAngle; };
                RevoluteJoint.prototype.GetMaxMotorTorque = function () { return this.m_maxMotorTorque; };
                RevoluteJoint.prototype.GetMotorSpeed = function () { return this.m_motorSpeed; };
                RevoluteJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    this.m_rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    this.m_rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var mA = this.m_invMassA;
                    var mB = this.m_invMassB;
                    var iA = this.m_invIA;
                    var iB = this.m_invIB;
                    var fixedRotation = (iA + iB == 0.0);
                    this.m_mass.EX.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
                    this.m_mass.EY.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
                    this.m_mass.EZ.x = -this.m_rA.y * iA - this.m_rB.y * iB;
                    this.m_mass.EX.y = this.m_mass.EY.x;
                    this.m_mass.EY.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
                    this.m_mass.EZ.y = this.m_rA.x * iA + this.m_rB.x * iB;
                    this.m_mass.EX.z = this.m_mass.EZ.x;
                    this.m_mass.EY.z = this.m_mass.EZ.y;
                    this.m_mass.EZ.z = iA + iB;
                    this.m_motorMass = iA + iB;
                    if (this.m_motorMass > 0.0) {
                        this.m_motorMass = 1.0 / this.m_motorMass;
                    }
                    if (!this.m_enableMotor || fixedRotation) {
                        this.m_motorImpulse = 0.0;
                    }
                    if (this.m_enableLimit && fixedRotation == false) {
                        var jointAngle = aB - aA - this.m_referenceAngle;
                        if (Math.abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * PhysicsType2d.Settings.angularSlop) {
                            this.m_limitState = 3;
                        }
                        else if (jointAngle <= this.m_lowerAngle) {
                            if (this.m_limitState != 1) {
                                this.m_impulse.z = 0.0;
                            }
                            this.m_limitState = 1;
                        }
                        else if (jointAngle >= this.m_upperAngle) {
                            if (this.m_limitState != 2) {
                                this.m_impulse.z = 0.0;
                            }
                            this.m_limitState = 2;
                        }
                        else {
                            this.m_limitState = 0;
                            this.m_impulse.z = 0.0;
                        }
                    }
                    else {
                        this.m_limitState = 0;
                    }
                    if (data.step.warmStarting) {
                        this.m_impulse = this.m_impulse.Multiply(data.step.dtRatio);
                        this.m_motorImpulse *= data.step.dtRatio;
                        var P = new PhysicsType2d.Vector2(this.m_impulse.x, this.m_impulse.y);
                        vA = vA.Subtract(P.Multiply(mA));
                        wA -= iA * (this.m_rA.Cross(P) + this.m_motorImpulse + this.m_impulse.z);
                        vB = vB.Add(P.Multiply(mB));
                        wB += iB * (this.m_rB.Cross(P) + this.m_motorImpulse + this.m_impulse.z);
                    }
                    else {
                        this.m_impulse.SetZero();
                        this.m_motorImpulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                RevoluteJoint.prototype.SolveVelocityConstraints = function (data) {
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var mA = this.m_invMassA;
                    var mB = this.m_invMassB;
                    var iA = this.m_invIA;
                    var iB = this.m_invIB;
                    var fixedRotation = (iA + iB == 0.0);
                    if (this.m_enableMotor && this.m_limitState != 3 && fixedRotation == false) {
                        var Cdot = wB - wA - this.m_motorSpeed;
                        var impulse = -this.m_motorMass * Cdot;
                        var oldImpulse = this.m_motorImpulse;
                        var maxImpulse = data.step.dt * this.m_maxMotorTorque;
                        this.m_motorImpulse = PhysicsType2d.MathExtensions.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                        impulse = this.m_motorImpulse - oldImpulse;
                        wA -= iA * impulse;
                        wB += iB * impulse;
                    }
                    if (this.m_enableLimit && this.m_limitState != 0 && fixedRotation == false) {
                        (function (self) {
                            var Cdot1 = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, self.m_rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, self.m_rA));
                            var Cdot2 = wB - wA;
                            var Cdot = new PhysicsType2d.Vector3(Cdot1.x, Cdot1.y, Cdot2);
                            var impulse = self.m_mass.Solve3x3(Cdot).Negative();
                            if (self.m_limitState == 3) {
                                self.m_impulse = self.m_impulse.Add(impulse);
                            }
                            else if (self.m_limitState == 1) {
                                var newImpulse = self.m_impulse.z + impulse.z;
                                if (newImpulse < 0.0) {
                                    var massVector = new PhysicsType2d.Vector2(self.m_mass.EZ.x, self.m_mass.EZ.y);
                                    var rhs = Cdot1.Negative().Add(massVector.Multiply(self.m_impulse.z));
                                    var reduced = self.m_mass.Solve2x2(rhs);
                                    impulse.x = reduced.x;
                                    impulse.y = reduced.y;
                                    impulse.z = -self.m_impulse.z;
                                    self.m_impulse.x += reduced.x;
                                    self.m_impulse.y += reduced.y;
                                    self.m_impulse.z = 0.0;
                                }
                                else {
                                    self.m_impulse = self.m_impulse.Add(impulse);
                                }
                            }
                            else if (self.m_limitState == 2) {
                                var newImpulse = self.m_impulse.z + impulse.z;
                                if (newImpulse > 0.0) {
                                    var massVector = new PhysicsType2d.Vector2(self.m_mass.EZ.x, self.m_mass.EZ.y);
                                    var rhs = Cdot1.Negative().Add(massVector.Multiply(self.m_impulse.z));
                                    var reduced = self.m_mass.Solve2x2(rhs);
                                    impulse.x = reduced.x;
                                    impulse.y = reduced.y;
                                    impulse.z = -self.m_impulse.z;
                                    self.m_impulse.x += reduced.x;
                                    self.m_impulse.y += reduced.y;
                                    self.m_impulse.z = 0.0;
                                }
                                else {
                                    self.m_impulse = self.m_impulse.Add(impulse);
                                }
                            }
                            var P = new PhysicsType2d.Vector2(impulse.x, impulse.y);
                            vA = vA.Subtract(P.Multiply(mA));
                            wA -= iA * (self.m_rA.Cross(P) + impulse.z);
                            vB = vB.Add(P.Multiply(mB));
                            wB += iB * (self.m_rB.Cross(P) + impulse.z);
                        })(this);
                    }
                    else {
                        (function (self) { var Cdot = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, self.m_rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, self.m_rA)); var impulse = self.m_mass.Solve2x2(Cdot.Negative()); self.m_impulse.x += impulse.x; self.m_impulse.y += impulse.y; vA = vA.Subtract(impulse.Multiply(mA)); wA -= iA * self.m_rA.Cross(impulse); vB = vB.Add(impulse.Multiply(mB)); wB += iB * self.m_rB.Cross(impulse); })(this);
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                RevoluteJoint.prototype.SolvePositionConstraints = function (data) {
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var angularError = 0.0;
                    var positionError = 0.0;
                    var fixedRotation = (this.m_invIA + this.m_invIB == 0.0);
                    if (this.m_enableLimit && this.m_limitState != 0 && fixedRotation == false) {
                        var angle = aB - aA - this.m_referenceAngle;
                        var limitImpulse = 0.0;
                        if (this.m_limitState == 3) {
                            var C = PhysicsType2d.MathExtensions.Clamp(angle - this.m_lowerAngle, -PhysicsType2d.Settings.maxAngularCorrection, PhysicsType2d.Settings.maxAngularCorrection);
                            limitImpulse = -this.m_motorMass * C;
                            angularError = Math.abs(C);
                        }
                        else if (this.m_limitState == 1) {
                            var C = angle - this.m_lowerAngle;
                            angularError = -C;
                            C = PhysicsType2d.MathExtensions.Clamp(C + PhysicsType2d.Settings.angularSlop, -PhysicsType2d.Settings.maxAngularCorrection, 0.0);
                            limitImpulse = -this.m_motorMass * C;
                        }
                        else if (this.m_limitState == 2) {
                            var C = angle - this.m_upperAngle;
                            angularError = C;
                            C = PhysicsType2d.MathExtensions.Clamp(C - PhysicsType2d.Settings.angularSlop, 0.0, PhysicsType2d.Settings.maxAngularCorrection);
                            limitImpulse = -this.m_motorMass * C;
                        }
                        aA -= this.m_invIA * limitImpulse;
                        aB += this.m_invIB * limitImpulse;
                    }
                    (function (self) { qA.Set(aA); qB.Set(aB); var rA = qA.ApplyToVector2(self.m_localAnchorA.Subtract(self.m_localCenterA)); var rB = qB.ApplyToVector2(self.m_localAnchorB.Subtract(self.m_localCenterB)); var C = cB.Add(rB).Subtract(cA).Subtract(rA); positionError = C.Length(); var mA = self.m_invMassA; var mB = self.m_invMassB; var iA = self.m_invIA; var iB = self.m_invIB; var K = new PhysicsType2d.Matrix2x2(); K.EX.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y; K.EX.y = -iA * rA.x * rA.y - iB * rB.x * rB.y; K.EY.x = K.EX.y; K.EY.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x; var impulse = K.Solve(C).Negative(); cA = cA.Subtract(impulse.Multiply(mA)); aA -= iA * rA.Cross(impulse); cB = cB.Add(impulse.Multiply(mB)); aB += iB * rB.Cross(impulse); })(this);
                    data.positions[this.m_indexA].c = cA;
                    data.positions[this.m_indexA].a = aA;
                    data.positions[this.m_indexB].c = cB;
                    data.positions[this.m_indexB].a = aB;
                    return positionError <= PhysicsType2d.Settings.linearSlop && angularError <= PhysicsType2d.Settings.angularSlop;
                };
                return RevoluteJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.RevoluteJoint = RevoluteJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var PrismaticJointDefinition = (function (_super) {
                __extends(PrismaticJointDefinition, _super);
                function PrismaticJointDefinition() { _super.call(this); this.localAnchorA = new PhysicsType2d.Vector2(0, 0); this.localAnchorB = new PhysicsType2d.Vector2(0, 0); this.localAxisA = new PhysicsType2d.Vector2(0, 0); this.type = 2; this.localAxisA = new PhysicsType2d.Vector2(1.0, 0.0); this.referenceAngle = 0.0; this.enableLimit = false; this.lowerTranslation = 0.0; this.upperTranslation = 0.0; this.enableMotor = false; this.maxMotorForce = 0.0; this.motorSpeed = 0.0; }
                PrismaticJointDefinition.prototype.Initialize = function (bA, bB, anchor, axis) { this.bodyA = bA; this.bodyB = bB; this.localAnchorA = this.bodyA.GetLocalPoint(anchor); this.localAnchorB = this.bodyB.GetLocalPoint(anchor); this.localAxisA = this.bodyA.GetLocalVector(axis); this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle(); };
                return PrismaticJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.PrismaticJointDefinition = PrismaticJointDefinition;
            var PrismaticJoint = (function (_super) {
                __extends(PrismaticJoint, _super);
                function PrismaticJoint(def) { _super.call(this, def); this.m_localXAxisA = new PhysicsType2d.Vector2(0, 0); this.m_localYAxisA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_axis = new PhysicsType2d.Vector2(0, 0); this.m_perp = new PhysicsType2d.Vector2(0, 0); this.m_K = new PhysicsType2d.Matrix3x3(); this.m_localAnchorA = def.localAnchorA; this.m_localAnchorB = def.localAnchorB; this.m_localXAxisA = def.localAxisA; this.m_localXAxisA.Normalize(); this.m_localYAxisA = PhysicsType2d.MathExtensions.Cross1x2(1.0, this.m_localXAxisA); this.m_referenceAngle = def.referenceAngle; this.m_impulse = new PhysicsType2d.Vector3(0, 0, 0); this.m_motorMass = 0.0; this.m_motorImpulse = 0.0; this.m_lowerTranslation = def.lowerTranslation; this.m_upperTranslation = def.upperTranslation; this.m_maxMotorForce = def.maxMotorForce; this.m_motorSpeed = def.motorSpeed; this.m_enableLimit = def.enableLimit; this.m_enableMotor = def.enableMotor; this.m_limitState = 0; }
                PrismaticJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
                PrismaticJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
                PrismaticJoint.prototype.GetLocalAxisA = function () { return this.m_localXAxisA; };
                PrismaticJoint.prototype.GetReferenceAngle = function () { return this.m_referenceAngle; };
                PrismaticJoint.prototype.GetMotorSpeed = function () { return this.m_motorSpeed; };
                PrismaticJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                PrismaticJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                PrismaticJoint.prototype.GetReactionForce = function (inv_dt) { return ((this.m_perp.Multiply(this.m_impulse.x)).Add(this.m_axis.Multiply(this.m_motorImpulse + this.m_impulse.z))).Multiply(inv_dt); };
                PrismaticJoint.prototype.GetReactionTorque = function (inv_dt) { return inv_dt * this.m_impulse.y; };
                PrismaticJoint.prototype.GetJointTranslation = function () { var pA = this.m_bodyA.GetWorldPoint(this.m_localAnchorA); var pB = this.m_bodyB.GetWorldPoint(this.m_localAnchorB); var d = pB.Subtract(pA); var axis = this.m_bodyA.GetWorldVector(this.m_localXAxisA); var translation = d.Dot(axis); return translation; };
                PrismaticJoint.prototype.GetJointSpeed = function () { var bA = this.m_bodyA; var bB = this.m_bodyB; var rA = bA.GetTransform().q.ApplyToVector2(this.m_localAnchorA.Subtract(bA.GetSweep().localCenter)); var rB = bB.GetTransform().q.ApplyToVector2(this.m_localAnchorB.Subtract(bB.GetSweep().localCenter)); var p1 = bA.GetSweep().c.Add(rA); var p2 = bB.GetSweep().c.Add(rB); var d = p2.Subtract(p1); var axis = bA.GetTransform().q.ApplyToVector2(this.m_localXAxisA); var vA = bA.GetLinearVelocity(); var vB = bB.GetLinearVelocity(); var wA = bA.GetAngularVelocity(); var wB = bB.GetAngularVelocity(); var speed = d.Dot(PhysicsType2d.MathExtensions.Cross1x2(wA, axis)) + axis.Dot(vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, rA))); return speed; };
                PrismaticJoint.prototype.IsLimitEnabled = function () { return this.m_enableLimit; };
                PrismaticJoint.prototype.EnableLimit = function (flag) { if (flag != this.m_enableLimit) {
                    this.m_bodyA.SetAwake(true);
                    this.m_bodyB.SetAwake(true);
                    this.m_enableLimit = flag;
                    this.m_impulse.z = 0.0;
                } };
                PrismaticJoint.prototype.GetLowerLimit = function () { return this.m_lowerTranslation; };
                PrismaticJoint.prototype.GetUpperLimit = function () { return this.m_upperTranslation; };
                PrismaticJoint.prototype.SetLimits = function (lower, upper) { PhysicsType2d.Assert(lower <= upper); if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
                    this.m_bodyA.SetAwake(true);
                    this.m_bodyB.SetAwake(true);
                    this.m_lowerTranslation = lower;
                    this.m_upperTranslation = upper;
                    this.m_impulse.z = 0.0;
                } };
                PrismaticJoint.prototype.IsMotorEnabled = function () { return this.m_enableMotor; };
                PrismaticJoint.prototype.EnableMotor = function (flag) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_enableMotor = flag; };
                PrismaticJoint.prototype.SetMotorSpeed = function (speed) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_motorSpeed = speed; };
                PrismaticJoint.prototype.SetMaxMotorForce = function (force) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_maxMotorForce = force; };
                PrismaticJoint.prototype.GetMotorForce = function (inv_dt) { return inv_dt * this.m_motorImpulse; };
                PrismaticJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log(" PrismaticJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.localAnchorA.Set({0}, {1});", this.m_localAnchorA.x, this.m_localAnchorA.y); PhysicsType2d.Utils.log("  jd.localAnchorB.Set({0}, {1});", this.m_localAnchorB.x, this.m_localAnchorB.y); PhysicsType2d.Utils.log("  jd.localAxisA.Set({0}, {1});", this.m_localXAxisA.x, this.m_localXAxisA.y); PhysicsType2d.Utils.log("  jd.referenceAngle = {0};", this.m_referenceAngle); PhysicsType2d.Utils.log("  jd.enableLimit = boolean({0});", this.m_enableLimit); PhysicsType2d.Utils.log("  jd.lowerTranslation = {0};", this.m_lowerTranslation); PhysicsType2d.Utils.log("  jd.upperTranslation = {0};", this.m_upperTranslation); PhysicsType2d.Utils.log("  jd.enableMotor = boolean({0});", this.m_enableMotor); PhysicsType2d.Utils.log("  jd.motorSpeed = {0};", this.m_motorSpeed); PhysicsType2d.Utils.log("  jd.maxMotorForce = {0};", this.m_maxMotorForce); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world->CreateJoint(&jd);", this.m_index); };
                PrismaticJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var d = cB.Subtract(cA).Add(rB).Subtract(rA);
                    var mA = this.m_invMassA;
                    var mB = this.m_invMassB;
                    var iA = this.m_invIA;
                    var iB = this.m_invIB;
                    {
                        this.m_axis = qA.ApplyToVector2(this.m_localXAxisA);
                        this.m_a1 = (d.Add(rA)).Cross(this.m_axis);
                        this.m_a2 = rB.Cross(this.m_axis);
                        this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
                        if (this.m_motorMass > 0.0) {
                            this.m_motorMass = 1.0 / this.m_motorMass;
                        }
                    }
                    {
                        this.m_perp = qA.ApplyToVector2(this.m_localYAxisA);
                        this.m_s1 = (d.Add(rA)).Cross(this.m_perp);
                        this.m_s2 = rB.Cross(this.m_perp);
                        var k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
                        var k12 = iA * this.m_s1 + iB * this.m_s2;
                        var k13 = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
                        var k22 = iA + iB;
                        if (k22 == 0.0) {
                            k22 = 1.0;
                        }
                        var k23 = iA * this.m_a1 + iB * this.m_a2;
                        var k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
                        this.m_K.EX.Set(k11, k12, k13);
                        this.m_K.EY.Set(k12, k22, k23);
                        this.m_K.EZ.Set(k13, k23, k33);
                    }
                    if (this.m_enableLimit) {
                        var jointTranslation = this.m_axis.Dot(d);
                        if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * PhysicsType2d.Settings.linearSlop) {
                            this.m_limitState = 3;
                        }
                        else if (jointTranslation <= this.m_lowerTranslation) {
                            if (this.m_limitState != 1) {
                                this.m_limitState = 1;
                                this.m_impulse.z = 0.0;
                            }
                        }
                        else if (jointTranslation >= this.m_upperTranslation) {
                            if (this.m_limitState != 2) {
                                this.m_limitState = 2;
                                this.m_impulse.z = 0.0;
                            }
                        }
                        else {
                            this.m_limitState = 0;
                            this.m_impulse.z = 0.0;
                        }
                    }
                    else {
                        this.m_limitState = 0;
                        this.m_impulse.z = 0.0;
                    }
                    if (this.m_enableMotor == false) {
                        this.m_motorImpulse = 0.0;
                    }
                    if (data.step.warmStarting) {
                        this.m_impulse = this.m_impulse.Multiply(data.step.dtRatio);
                        this.m_motorImpulse *= data.step.dtRatio;
                        var P = (this.m_perp.Multiply(this.m_impulse.x)).Add(this.m_axis.Multiply(this.m_motorImpulse + this.m_impulse.z));
                        var LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
                        var LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
                        vA = vA.Subtract(P.Multiply(mA));
                        wA -= iA * LA;
                        vB = vB.Add(P.Multiply(mB));
                        wB += iB * LB;
                    }
                    else {
                        this.m_impulse.SetZero();
                        this.m_motorImpulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                PrismaticJoint.prototype.SolveVelocityConstraints = function (data) {
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var mA = this.m_invMassA, mB = this.m_invMassB;
                    var iA = this.m_invIA, iB = this.m_invIB;
                    if (this.m_enableMotor && this.m_limitState != 3) {
                        (function (self) { var Cdot = self.m_axis.Dot(vB.Subtract(vA)) + self.m_a2 * wB - self.m_a1 * wA; var impulse = self.m_motorMass * (self.m_motorSpeed - Cdot); var oldImpulse = self.m_motorImpulse; var maxImpulse = data.step.dt * self.m_maxMotorForce; self.m_motorImpulse = PhysicsType2d.MathExtensions.Clamp(self.m_motorImpulse + impulse, -maxImpulse, maxImpulse); impulse = self.m_motorImpulse - oldImpulse; var P = self.m_axis.Multiply(impulse); var LA = impulse * self.m_a1; var LB = impulse * self.m_a2; vA = vA.Subtract(P.Multiply(mA)); wA -= iA * LA; vB = vB.Add(P.Multiply(mB)); wB += iB * LB; })(this);
                    }
                    var Cdot1 = new PhysicsType2d.Vector2(0, 0);
                    Cdot1.x = this.m_perp.Dot(vB.Subtract(vA)) + this.m_s2 * wB - this.m_s1 * wA;
                    Cdot1.y = wB - wA;
                    if (this.m_enableLimit && this.m_limitState != 0) {
                        (function (self) {
                            var Cdot2 = self.m_axis.Dot(vB.Subtract(vA)) + self.m_a2 * wB - self.m_a1 * wA;
                            var Cdot = new PhysicsType2d.Vector3(Cdot1.x, Cdot1.y, Cdot2);
                            var f1 = self.m_impulse;
                            var df = self.m_K.Solve3x3(Cdot.Negative());
                            self.m_impulse = self.m_impulse.Add(df);
                            if (self.m_limitState == 1) {
                                self.m_impulse.z = Math.max(self.m_impulse.z, 0.0);
                            }
                            else if (self.m_limitState == 2) {
                                self.m_impulse.z = Math.min(self.m_impulse.z, 0.0);
                            }
                            var b = (Cdot1.Negative()).Subtract((new PhysicsType2d.Vector2(self.m_K.EZ.x, self.m_K.EZ.y)).Multiply(self.m_impulse.z - f1.z));
                            var f2r = self.m_K.Solve2x2(b).Add(new PhysicsType2d.Vector2(f1.x, f1.y));
                            self.m_impulse.x = f2r.x;
                            self.m_impulse.y = f2r.y;
                            df = self.m_impulse.Subtract(f1);
                            var P = (self.m_perp.Multiply(df.x)).Add(self.m_axis.Multiply(df.z));
                            var LA = df.x * self.m_s1 + df.y + df.z * self.m_a1;
                            var LB = df.x * self.m_s2 + df.y + df.z * self.m_a2;
                            vA = vA.Subtract(P.Multiply(mA));
                            wA -= iA * LA;
                            vB = vB.Add(P.Multiply(mB));
                            wB += iB * LB;
                        })(this);
                    }
                    else {
                        (function (self) { var df = self.m_K.Solve2x2(Cdot1.Negative()); self.m_impulse.x += df.x; self.m_impulse.y += df.y; var P = self.m_perp.Multiply(df.x); var LA = df.x * self.m_s1 + df.y; var LB = df.x * self.m_s2 + df.y; vA = vA.Subtract(P.Multiply(mA)); wA -= iA * LA; vB = vB.Add(P.Multiply(mB)); wB += iB * LB; var Cdot10 = Cdot1; Cdot1.x = self.m_perp.Dot(vB.Subtract(vA)) + self.m_s2 * wB - self.m_s1 * wA; Cdot1.y = wB - wA; if (Math.abs(Cdot1.x) > 0.01 || Math.abs(Cdot1.y) > 0.01) {
                            var test = self.m_K.Vector2Multiply(df);
                            Cdot1.x += 0.0;
                        } })(this);
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                PrismaticJoint.prototype.SolvePositionConstraints = function (data) {
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var mA = this.m_invMassA;
                    var mB = this.m_invMassB;
                    var iA = this.m_invIA;
                    var iB = this.m_invIB;
                    var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var d = cB.Add(rB).Subtract(cA).Subtract(rA);
                    var axis = qA.ApplyToVector2(this.m_localXAxisA);
                    var a1 = (d.Add(rA)).Cross(axis);
                    var a2 = rB.Cross(axis);
                    var perp = qA.ApplyToVector2(this.m_localYAxisA);
                    var s1 = (d.Add(rA)).Cross(perp);
                    var s2 = rB.Cross(perp);
                    var impulse = new PhysicsType2d.Vector3(0, 0, 0);
                    var C1 = new PhysicsType2d.Vector2(perp.Dot(d), aB - aA - this.m_referenceAngle);
                    var linearError = Math.abs(C1.x);
                    var angularError = Math.abs(C1.y);
                    var active = false;
                    var C2 = 0.0;
                    if (this.m_enableLimit) {
                        var translation = axis.Dot(d);
                        if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * PhysicsType2d.Settings.linearSlop) {
                            C2 = PhysicsType2d.MathExtensions.Clamp(translation, -PhysicsType2d.Settings.maxLinearCorrection, PhysicsType2d.Settings.maxLinearCorrection);
                            linearError = Math.max(linearError, Math.abs(translation));
                            active = true;
                        }
                        else if (translation <= this.m_lowerTranslation) {
                            C2 = PhysicsType2d.MathExtensions.Clamp(translation - this.m_lowerTranslation + PhysicsType2d.Settings.linearSlop, -PhysicsType2d.Settings.maxLinearCorrection, 0.0);
                            linearError = Math.max(linearError, this.m_lowerTranslation - translation);
                            active = true;
                        }
                        else if (translation >= this.m_upperTranslation) {
                            C2 = PhysicsType2d.MathExtensions.Clamp(translation - this.m_upperTranslation - PhysicsType2d.Settings.linearSlop, 0.0, PhysicsType2d.Settings.maxLinearCorrection);
                            linearError = Math.max(linearError, translation - this.m_upperTranslation);
                            active = true;
                        }
                    }
                    if (active) {
                        (function (self) {
                            var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
                            var k12 = iA * s1 + iB * s2;
                            var k13 = iA * s1 * a1 + iB * s2 * a2;
                            var k22 = iA + iB;
                            if (k22 == 0.0) {
                                k22 = 1.0;
                            }
                            var k23 = iA * a1 + iB * a2;
                            var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2;
                            var K = new PhysicsType2d.Matrix3x3;
                            K.EX.Set(k11, k12, k13);
                            K.EY.Set(k12, k22, k23);
                            K.EZ.Set(k13, k23, k33);
                            var C = new PhysicsType2d.Vector3(0, 0, 0);
                            C.x = C1.x;
                            C.y = C1.y;
                            C.z = C2;
                            impulse = K.Solve3x3(C.Negative());
                        })(this);
                    }
                    else {
                        (function (self) {
                            var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
                            var k12 = iA * s1 + iB * s2;
                            var k22 = iA + iB;
                            if (k22 == 0.0) {
                                k22 = 1.0;
                            }
                            var K = new PhysicsType2d.Matrix2x2();
                            K.EX.Set(k11, k12);
                            K.EY.Set(k12, k22);
                            var impulse1 = K.Solve(C1.Negative());
                            impulse.x = impulse1.x;
                            impulse.y = impulse1.y;
                            impulse.z = 0.0;
                        })(this);
                    }
                    var P = (perp.Multiply(impulse.x)).Add(axis.Multiply(impulse.z));
                    var LA = impulse.x * s1 + impulse.y + impulse.z * a1;
                    var LB = impulse.x * s2 + impulse.y + impulse.z * a2;
                    cA = cA.Subtract(P.Multiply(mA));
                    aA -= iA * LA;
                    cB = cB.Add(P.Multiply(mB));
                    aB += iB * LB;
                    data.positions[this.m_indexA].c = cA;
                    data.positions[this.m_indexA].a = aA;
                    data.positions[this.m_indexB].c = cB;
                    data.positions[this.m_indexB].a = aB;
                    return linearError <= PhysicsType2d.Settings.linearSlop && angularError <= PhysicsType2d.Settings.angularSlop;
                };
                return PrismaticJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.PrismaticJoint = PrismaticJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var GearJointDefinition = (function (_super) {
                __extends(GearJointDefinition, _super);
                function GearJointDefinition() { _super.call(this); this.type = 6; this.joint1 = null; this.joint2 = null; this.ratio = 1.0; }
                return GearJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.GearJointDefinition = GearJointDefinition;
            var GearJoint = (function (_super) {
                __extends(GearJoint, _super);
                function GearJoint(def) {
                    _super.call(this, def);
                    this.m_localAnchorC = new PhysicsType2d.Vector2(0, 0);
                    this.m_localAnchorD = new PhysicsType2d.Vector2(0, 0);
                    this.m_localAxisC = new PhysicsType2d.Vector2(0, 0);
                    this.m_localAxisD = new PhysicsType2d.Vector2(0, 0);
                    this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0);
                    this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0);
                    this.m_lcA = new PhysicsType2d.Vector2(0, 0);
                    this.m_lcB = new PhysicsType2d.Vector2(0, 0);
                    this.m_lcC = new PhysicsType2d.Vector2(0, 0);
                    this.m_lcD = new PhysicsType2d.Vector2(0, 0);
                    this.m_JvAC = new PhysicsType2d.Vector2(0, 0);
                    this.m_JvBD = new PhysicsType2d.Vector2(0, 0);
                    this.m_joint1 = def.joint1;
                    this.m_joint2 = def.joint2;
                    this.m_typeA = this.m_joint1.GetType();
                    this.m_typeB = this.m_joint2.GetType();
                    PhysicsType2d.Assert(this.m_typeA == 1 || this.m_typeA == 2);
                    PhysicsType2d.Assert(this.m_typeB == 1 || this.m_typeB == 2);
                    var coordinateA;
                    var coordinateB;
                    this.m_bodyC = this.m_joint1.GetBodyA();
                    this.m_bodyA = this.m_joint1.GetBodyB();
                    var xfA = this.m_bodyA.GetTransform();
                    var aA = this.m_bodyA.GetSweep().a;
                    var xfC = this.m_bodyC.GetTransform();
                    var aC = this.m_bodyC.GetSweep().a;
                    if (this.m_typeA == 1) {
                        var revolute = def.joint1;
                        this.m_localAnchorC = revolute.GetLocalAnchorA();
                        this.m_localAnchorA = revolute.GetLocalAnchorB();
                        this.m_referenceAngleA = revolute.GetReferenceAngle();
                        coordinateA = aA - aC - this.m_referenceAngleA;
                    }
                    else {
                        var prismatic = def.joint1;
                        this.m_localAnchorC = prismatic.GetLocalAnchorA();
                        this.m_localAnchorA = prismatic.GetLocalAnchorB();
                        this.m_referenceAngleA = prismatic.GetReferenceAngle();
                        this.m_localAxisC = prismatic.GetLocalAxisA();
                        var pC = this.m_localAnchorC;
                        var pA = xfC.q.ApplyTransposeToVector2(xfA.q.ApplyToVector2(this.m_localAnchorA).Add(xfA.p.Subtract(xfC.p)));
                        coordinateA = (pA.Subtract(pC)).Dot(this.m_localAxisC);
                    }
                    this.m_bodyD = this.m_joint2.GetBodyA();
                    this.m_bodyB = this.m_joint2.GetBodyB();
                    var xfB = this.m_bodyB.GetTransform();
                    var aB = this.m_bodyB.GetSweep().a;
                    var xfD = this.m_bodyD.GetTransform();
                    var aD = this.m_bodyD.GetSweep().a;
                    if (this.m_typeB == 1) {
                        var revolute = def.joint2;
                        this.m_localAnchorD = revolute.GetLocalAnchorA();
                        this.m_localAnchorB = revolute.GetLocalAnchorB();
                        this.m_referenceAngleB = revolute.GetReferenceAngle();
                        coordinateB = aB - aD - this.m_referenceAngleB;
                    }
                    else {
                        var prismatic = def.joint2;
                        this.m_localAnchorD = prismatic.GetLocalAnchorA();
                        this.m_localAnchorB = prismatic.GetLocalAnchorB();
                        this.m_referenceAngleB = prismatic.GetReferenceAngle();
                        this.m_localAxisD = prismatic.GetLocalAxisA();
                        var pD = this.m_localAnchorD;
                        var pB = xfD.q.ApplyTransposeToVector2(xfB.q.ApplyToVector2(this.m_localAnchorB).Add(xfB.p.Subtract(xfD.p)));
                        coordinateB = (pB.Subtract(pD)).Dot(this.m_localAxisD);
                    }
                    this.m_ratio = def.ratio;
                    this.m_constant = coordinateA + this.m_ratio * coordinateB;
                    this.m_impulse = 0.0;
                }
                GearJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_indexC = this.m_bodyC.GetIslandIndex();
                    this.m_indexD = this.m_bodyD.GetIslandIndex();
                    this.m_lcA = this.m_bodyA.GetSweep().localCenter;
                    this.m_lcB = this.m_bodyB.GetSweep().localCenter;
                    this.m_lcC = this.m_bodyC.GetSweep().localCenter;
                    this.m_lcD = this.m_bodyD.GetSweep().localCenter;
                    this.m_mA = this.m_bodyA.GetInvMass();
                    this.m_mB = this.m_bodyB.GetInvMass();
                    this.m_mC = this.m_bodyC.GetInvMass();
                    this.m_mD = this.m_bodyD.GetInvMass();
                    this.m_iA = this.m_bodyA.GetInvI();
                    this.m_iB = this.m_bodyB.GetInvI();
                    this.m_iC = this.m_bodyC.GetInvI();
                    this.m_iD = this.m_bodyD.GetInvI();
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var cC = data.positions[this.m_indexC].c;
                    var aC = data.positions[this.m_indexC].a;
                    var vC = data.velocities[this.m_indexC].v;
                    var wC = data.velocities[this.m_indexC].w;
                    var cD = data.positions[this.m_indexD].c;
                    var aD = data.positions[this.m_indexD].a;
                    var vD = data.velocities[this.m_indexD].v;
                    var wD = data.velocities[this.m_indexD].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var qC = PhysicsType2d.Rotation.FromRadians(aC);
                    var qD = PhysicsType2d.Rotation.FromRadians(aD);
                    this.m_mass = 0.0;
                    if (this.m_typeA == 1) {
                        this.m_JvAC.SetZero();
                        this.m_JwA = 1.0;
                        this.m_JwC = 1.0;
                        this.m_mass += this.m_iA + this.m_iC;
                    }
                    else {
                        var u = qC.ApplyToVector2(this.m_localAxisC);
                        var rC = qC.ApplyToVector2(this.m_localAnchorC.Subtract(this.m_lcC));
                        var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_lcA));
                        this.m_JvAC = u;
                        this.m_JwC = rC.Cross(u);
                        this.m_JwA = rA.Cross(u);
                        this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
                    }
                    if (this.m_typeB == 1) {
                        this.m_JvBD.SetZero();
                        this.m_JwB = this.m_ratio;
                        this.m_JwD = this.m_ratio;
                        this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
                    }
                    else {
                        var u = qD.ApplyToVector2(this.m_localAxisD);
                        var rD = qD.ApplyToVector2(this.m_localAnchorD.Subtract(this.m_lcD));
                        var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_lcB));
                        this.m_JvBD = u.Multiply(this.m_ratio);
                        this.m_JwD = this.m_ratio * rD.Cross(u);
                        this.m_JwB = this.m_ratio * rB.Cross(u);
                        this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
                    }
                    this.m_mass = this.m_mass > 0.0 ? 1.0 / this.m_mass : 0.0;
                    if (data.step.warmStarting) {
                        vA = vA.Add(this.m_JvAC.Multiply(this.m_mA * this.m_impulse));
                        wA += this.m_iA * this.m_impulse * this.m_JwA;
                        vB = vB.Add(this.m_JvBD.Multiply(this.m_mB * this.m_impulse));
                        wB += this.m_iB * this.m_impulse * this.m_JwB;
                        vC = vC.Subtract(this.m_JvAC.Multiply(this.m_mC * this.m_impulse));
                        wC -= this.m_iC * this.m_impulse * this.m_JwC;
                        vD = vD.Subtract(this.m_JvBD.Multiply(this.m_mD * this.m_impulse));
                        wD -= this.m_iD * this.m_impulse * this.m_JwD;
                    }
                    else {
                        this.m_impulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                    data.velocities[this.m_indexC].v = vC;
                    data.velocities[this.m_indexC].w = wC;
                    data.velocities[this.m_indexD].v = vD;
                    data.velocities[this.m_indexD].w = wD;
                };
                GearJoint.prototype.SolveVelocityConstraints = function (data) { var vA = data.velocities[this.m_indexA].v; var wA = data.velocities[this.m_indexA].w; var vB = data.velocities[this.m_indexB].v; var wB = data.velocities[this.m_indexB].w; var vC = data.velocities[this.m_indexC].v; var wC = data.velocities[this.m_indexC].w; var vD = data.velocities[this.m_indexD].v; var wD = data.velocities[this.m_indexD].w; var Cdot = this.m_JvAC.Dot(vA.Subtract(vC)) + this.m_JvBD.Dot(vB.Subtract(vD)); Cdot += (this.m_JwA * wA - this.m_JwC * wC) + (this.m_JwB * wB - this.m_JwD * wD); var impulse = -this.m_mass * Cdot; this.m_impulse += impulse; vA = vA.Add(this.m_JvAC.Multiply(this.m_mA * impulse)); wA += this.m_iA * impulse * this.m_JwA; vB = vB.Add(this.m_JvBD.Multiply(this.m_mB * impulse)); wB += this.m_iB * impulse * this.m_JwB; vC = vC.Subtract(this.m_JvAC.Multiply(this.m_mC * impulse)); wC -= this.m_iC * impulse * this.m_JwC; vD = vD.Subtract(this.m_JvBD.Multiply(this.m_mD * impulse)); wD -= this.m_iD * impulse * this.m_JwD; data.velocities[this.m_indexA].v = vA; data.velocities[this.m_indexA].w = wA; data.velocities[this.m_indexB].v = vB; data.velocities[this.m_indexB].w = wB; data.velocities[this.m_indexC].v = vC; data.velocities[this.m_indexC].w = wC; data.velocities[this.m_indexD].v = vD; data.velocities[this.m_indexD].w = wD; };
                GearJoint.prototype.SolvePositionConstraints = function (data) {
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var cC = data.positions[this.m_indexC].c;
                    var aC = data.positions[this.m_indexC].a;
                    var cD = data.positions[this.m_indexD].c;
                    var aD = data.positions[this.m_indexD].a;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var qC = PhysicsType2d.Rotation.FromRadians(aC);
                    var qD = PhysicsType2d.Rotation.FromRadians(aD);
                    var linearError = 0.0;
                    var coordinateA;
                    var coordinateB;
                    var JvAC = new PhysicsType2d.Vector2(0, 0);
                    var JvBD = new PhysicsType2d.Vector2(0, 0);
                    var JwA;
                    var JwB;
                    var JwC;
                    var JwD;
                    var mass = 0.0;
                    if (this.m_typeA == 1) {
                        JvAC.SetZero();
                        JwA = 1.0;
                        JwC = 1.0;
                        mass += this.m_iA + this.m_iC;
                        coordinateA = aA - aC - this.m_referenceAngleA;
                    }
                    else {
                        var u = qC.ApplyToVector2(this.m_localAxisC);
                        var rC = qC.ApplyToVector2(this.m_localAnchorC.Subtract(this.m_lcC));
                        var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_lcA));
                        JvAC = u;
                        JwC = rC.Cross(u);
                        JwA = rA.Cross(u);
                        mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
                        var pC = this.m_localAnchorC.Subtract(this.m_lcC);
                        var pA = qC.ApplyTransposeToVector2(rA.Add(cA.Subtract(cC)));
                        coordinateA = (pA.Subtract(pC)).Dot(this.m_localAxisC);
                    }
                    if (this.m_typeB == 1) {
                        JvBD.SetZero();
                        JwB = this.m_ratio;
                        JwD = this.m_ratio;
                        mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
                        coordinateB = aB - aD - this.m_referenceAngleB;
                    }
                    else {
                        var u = qD.ApplyToVector2(this.m_localAxisD);
                        var rD = qD.ApplyToVector2(this.m_localAnchorD.Subtract(this.m_lcD));
                        var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_lcB));
                        JvBD = u.Multiply(this.m_ratio);
                        JwD = this.m_ratio * rD.Cross(u);
                        JwB = this.m_ratio * rB.Cross(u);
                        mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * JwD * JwD + this.m_iB * JwB * JwB;
                        var pD = this.m_localAnchorD.Subtract(this.m_lcD);
                        var pB = qD.ApplyTransposeToVector2(rB.Add(cB.Subtract(cD)));
                        coordinateB = (pB.Subtract(pD)).Dot(this.m_localAxisD);
                    }
                    var C = (coordinateA + this.m_ratio * coordinateB) - this.m_constant;
                    var impulse = 0.0;
                    if (mass > 0.0) {
                        impulse = -C / mass;
                    }
                    cA = cA.Add(JvAC.Multiply(this.m_mA * impulse));
                    aA += this.m_iA * impulse * JwA;
                    cB = cB.Add(JvBD.Multiply(this.m_mB * impulse));
                    aB += this.m_iB * impulse * JwB;
                    cC = cC.Subtract(JvAC.Multiply(this.m_mC * impulse));
                    aC -= this.m_iC * impulse * JwC;
                    cD = cD.Subtract(JvBD.Multiply(this.m_mD * impulse));
                    aD -= this.m_iD * impulse * JwD;
                    data.positions[this.m_indexA].c = cA;
                    data.positions[this.m_indexA].a = aA;
                    data.positions[this.m_indexB].c = cB;
                    data.positions[this.m_indexB].a = aB;
                    data.positions[this.m_indexC].c = cC;
                    data.positions[this.m_indexC].a = aC;
                    data.positions[this.m_indexD].c = cD;
                    data.positions[this.m_indexD].a = aD;
                    return linearError < PhysicsType2d.Settings.linearSlop;
                };
                GearJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                GearJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                GearJoint.prototype.GetReactionForce = function (inv_dt) { var P = this.m_JvAC.Multiply(this.m_impulse); return P.Multiply(inv_dt); };
                GearJoint.prototype.GetReactionTorque = function (inv_dt) { var L = this.m_impulse * this.m_JwA; return inv_dt * L; };
                GearJoint.prototype.SetRatio = function (ratio) { PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(ratio)); this.m_ratio = ratio; };
                GearJoint.prototype.GetRatio = function () { return this.m_ratio; };
                GearJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); var index1 = this.m_joint1.m_index; var index2 = this.m_joint2.m_index; PhysicsType2d.Utils.log("  GearJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.joint1 = joints[{0}];", index1); PhysicsType2d.Utils.log("  jd.joint2 = joints[{0}];", index2); PhysicsType2d.Utils.log("  jd.ratio = {0};", this.m_ratio); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world->CreateJoint(&jd);", this.m_index); };
                GearJoint.prototype.GetJoint1 = function () { return this.m_joint1; };
                GearJoint.prototype.GetJoint2 = function () { return this.m_joint2; };
                return GearJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.GearJoint = GearJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var MouseJointDefinition = (function (_super) {
                __extends(MouseJointDefinition, _super);
                function MouseJointDefinition() { _super.call(this); this.target = new PhysicsType2d.Vector2(0, 0); this.type = 5; this.maxForce = 0.0; this.frequencyHz = 5.0; this.dampingRatio = 0.7; }
                return MouseJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.MouseJointDefinition = MouseJointDefinition;
            var MouseJoint = (function (_super) {
                __extends(MouseJoint, _super);
                function MouseJoint(def) { _super.call(this, def); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_targetA = new PhysicsType2d.Vector2(0, 0); this.m_impulse = new PhysicsType2d.Vector2(0, 0); this.m_rB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_mass = new PhysicsType2d.Matrix2x2(); this.m_C = new PhysicsType2d.Vector2(0, 0); PhysicsType2d.Assert(def.target.IsValid()); PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(def.maxForce) && def.maxForce >= 0.0); PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(def.frequencyHz) && def.frequencyHz >= 0.0); PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(def.dampingRatio) && def.dampingRatio >= 0.0); this.m_targetA = def.target; this.m_localAnchorB = this.m_bodyB.GetTransform().ApplyTransposeToVector2(this.m_targetA); this.m_maxForce = def.maxForce; this.m_frequencyHz = def.frequencyHz; this.m_dampingRatio = def.dampingRatio; this.m_beta = 0.0; this.m_gamma = 0.0; }
                MouseJoint.prototype.SetTarget = function (target) {
                    if (!this.m_bodyB.IsAwake()) {
                        this.m_bodyB.SetAwake(true);
                    }
                    this.m_targetA = target;
                };
                MouseJoint.prototype.GetTarget = function () { return this.m_targetA; };
                MouseJoint.prototype.SetMaxForce = function (force) { this.m_maxForce = force; };
                MouseJoint.prototype.GetMaxForce = function () { return this.m_maxForce; };
                MouseJoint.prototype.SetFrequency = function (hz) { this.m_frequencyHz = hz; };
                MouseJoint.prototype.GetFrequency = function () { return this.m_frequencyHz; };
                MouseJoint.prototype.SetDampingRatio = function (ratio) { this.m_dampingRatio = ratio; };
                MouseJoint.prototype.GetDampingRatio = function () { return this.m_dampingRatio; };
                MouseJoint.prototype.GetAnchorA = function () { return this.m_targetA; };
                MouseJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                MouseJoint.prototype.GetReactionForce = function (inv_dt) { return this.m_impulse.Multiply(inv_dt); };
                MouseJoint.prototype.GetReactionTorque = function (inv_dt) { return inv_dt * 0.0; };
                MouseJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var mass = this.m_bodyB.GetMass();
                    var omega = 2.0 * PhysicsType2d.Constants.PI * this.m_frequencyHz;
                    var d = 2.0 * mass * this.m_dampingRatio * omega;
                    var k = mass * (omega * omega);
                    var h = data.step.dt;
                    PhysicsType2d.Assert(d + h * k > PhysicsType2d.Constants.EPSILON);
                    this.m_gamma = h * (d + h * k);
                    if (this.m_gamma != 0.0) {
                        this.m_gamma = 1.0 / this.m_gamma;
                    }
                    this.m_beta = h * k * this.m_gamma;
                    this.m_rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var K = new PhysicsType2d.Matrix2x2();
                    K.EX.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
                    K.EX.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
                    K.EY.x = K.EX.y;
                    K.EY.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;
                    this.m_mass = K.GetInverse();
                    this.m_C = cB.Add(this.m_rB).Subtract(this.m_targetA);
                    this.m_C = this.m_C.Multiply(this.m_beta);
                    wB *= 0.98;
                    if (data.step.warmStarting) {
                        this.m_impulse = this.m_impulse.Multiply(data.step.dtRatio);
                        vB = vB.Add(this.m_impulse.Multiply(this.m_invMassB));
                        wB += this.m_invIB * this.m_rB.Cross(this.m_impulse);
                    }
                    else {
                        this.m_impulse.SetZero();
                    }
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                MouseJoint.prototype.SolveVelocityConstraints = function (data) {
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var Cdot = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, this.m_rB));
                    var impulse = this.m_mass.VectorMultiply(Cdot.Add(this.m_C).Add(this.m_impulse.Multiply(this.m_gamma)).Negative());
                    var oldImpulse = this.m_impulse;
                    this.m_impulse = this.m_impulse.Add(impulse);
                    var maxImpulse = data.step.dt * this.m_maxForce;
                    if (this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
                        this.m_impulse = this.m_impulse.Multiply(maxImpulse / this.m_impulse.Length());
                    }
                    impulse = this.m_impulse.Subtract(oldImpulse);
                    vB = vB.Add(impulse.Multiply(this.m_invMassB));
                    wB += this.m_invIB * this.m_rB.Cross(impulse);
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                MouseJoint.prototype.SolvePositionConstraints = function (data) { return true; };
                return MouseJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.MouseJoint = MouseJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var MotorJointDefinition = (function (_super) {
                __extends(MotorJointDefinition, _super);
                function MotorJointDefinition() { _super.call(this); this.linearOffset = new PhysicsType2d.Vector2(0, 0); this.type = 11; this.angularOffset = 0.0; this.maxForce = 1.0; this.maxTorque = 1.0; this.correctionFactor = 0.3; }
                MotorJointDefinition.prototype.Initialize = function (bA, bB) { this.bodyA = bA; this.bodyB = bB; var xB = this.bodyB.GetPosition(); this.linearOffset = this.bodyA.GetLocalPoint(xB); var angleA = this.bodyA.GetAngle(); var angleB = this.bodyB.GetAngle(); this.angularOffset = angleB - angleA; };
                return MotorJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.MotorJointDefinition = MotorJointDefinition;
            var MotorJoint = (function (_super) {
                __extends(MotorJoint, _super);
                function MotorJoint(def) { _super.call(this, def); this.m_linearOffset = new PhysicsType2d.Vector2(0, 0); this.m_linearImpulse = new PhysicsType2d.Vector2(0, 0); this.m_rA = new PhysicsType2d.Vector2(0, 0); this.m_rB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_linearError = new PhysicsType2d.Vector2(0, 0); this.m_linearMass = new PhysicsType2d.Matrix2x2(); this.m_linearOffset = def.linearOffset; this.m_angularOffset = def.angularOffset; this.m_angularImpulse = 0.0; this.m_maxForce = def.maxForce; this.m_maxTorque = def.maxTorque; this.m_correctionFactor = def.correctionFactor; }
                MotorJoint.prototype.SetMaxForce = function (force) { PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(force) && force >= 0.0); this.m_maxForce = force; };
                MotorJoint.prototype.GetMaxForce = function () { return this.m_maxForce; };
                MotorJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetPosition(); };
                MotorJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetPosition(); };
                MotorJoint.prototype.GetReactionForce = function (inv_dt) { return this.m_linearImpulse.Multiply(inv_dt); };
                MotorJoint.prototype.GetReactionTorque = function (inv_dt) { return inv_dt * this.m_angularImpulse; };
                MotorJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    this.m_rA = qA.ApplyToVector2(this.m_localCenterA.Negative());
                    this.m_rB = qB.ApplyToVector2(this.m_localCenterB.Negative());
                    var mA = this.m_invMassA;
                    var mB = this.m_invMassB;
                    var iA = this.m_invIA;
                    var iB = this.m_invIB;
                    var K = new PhysicsType2d.Matrix2x2();
                    K.EX.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
                    K.EX.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
                    K.EY.x = K.EX.y;
                    K.EY.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
                    this.m_linearMass = K.GetInverse();
                    this.m_angularMass = iA + iB;
                    if (this.m_angularMass > 0.0) {
                        this.m_angularMass = 1.0 / this.m_angularMass;
                    }
                    this.m_linearError = cB.Add(this.m_rB).Subtract(cA).Subtract(this.m_rA).Subtract(qA.ApplyToVector2(this.m_linearOffset));
                    this.m_angularError = aB - aA - this.m_angularOffset;
                    if (data.step.warmStarting) {
                        this.m_linearImpulse = this.m_linearImpulse.Multiply(data.step.dtRatio);
                        this.m_angularImpulse *= data.step.dtRatio;
                        var P = new PhysicsType2d.Vector2(this.m_linearImpulse.x, this.m_linearImpulse.y);
                        vA = vA.Subtract(P.Multiply(mA));
                        wA -= iA * (PhysicsType2d.MathExtensions.Cross2x2(this.m_rA, P) + this.m_angularImpulse);
                        vB = vB.Add(P.Multiply(mB));
                        wB += iB * (PhysicsType2d.MathExtensions.Cross2x2(this.m_rB, P) + this.m_angularImpulse);
                    }
                    else {
                        this.m_linearImpulse.SetZero();
                        this.m_angularImpulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                MotorJoint.prototype.SolveAngularFriction = function (velocityA, velocityB, h, inv_h) { var Cdot = velocityB.w - velocityA.w + inv_h * this.m_correctionFactor * this.m_angularError; var impulse = -this.m_angularMass * Cdot; var oldImpulse = this.m_angularImpulse; var maxImpulse = h * this.m_maxTorque; this.m_angularImpulse = PhysicsType2d.MathExtensions.Clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse); impulse = this.m_angularImpulse - oldImpulse; var iA = this.m_invIA; var iB = this.m_invIB; velocityA.w -= iA * impulse; velocityB.w += iB * impulse; };
                MotorJoint.prototype.SolveLinearFriction = function (velocityA, velocityB, h, inv_h) {
                    var Cdot = velocityB.v.Add(PhysicsType2d.MathExtensions.Cross1x2(velocityB.w, this.m_rB)).Subtract(velocityA.v).Subtract(PhysicsType2d.MathExtensions.Cross1x2(velocityA.w, this.m_rA)).Add(this.m_linearError.Multiply(inv_h * this.m_correctionFactor));
                    var impulse = this.m_linearMass.VectorMultiply(Cdot).Negative();
                    var oldImpulse = this.m_linearImpulse;
                    this.m_linearImpulse = this.m_linearImpulse.Add(impulse);
                    var maxImpulse = h * this.m_maxForce;
                    if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
                        this.m_linearImpulse.Normalize();
                        this.m_linearImpulse = this.m_linearImpulse.Multiply(maxImpulse);
                    }
                    impulse = this.m_linearImpulse.Subtract(oldImpulse);
                    var mA = this.m_invMassA;
                    var mB = this.m_invMassB;
                    var iA = this.m_invIA;
                    var iB = this.m_invIB;
                    velocityA.v = velocityA.v.Subtract(impulse.Multiply(mA));
                    velocityA.w -= iA * PhysicsType2d.MathExtensions.Cross2x2(this.m_rA, impulse);
                    velocityB.v = velocityB.v.Add(impulse.Multiply(mB));
                    velocityB.w += iB * PhysicsType2d.MathExtensions.Cross2x2(this.m_rB, impulse);
                };
                MotorJoint.prototype.SolveVelocityConstraints = function (data) { var h = data.step.dt; var inv_h = data.step.inv_dt; this.SolveAngularFriction(data.velocities[this.m_indexA], data.velocities[this.m_indexB], h, inv_h); this.SolveLinearFriction(data.velocities[this.m_indexA], data.velocities[this.m_indexB], h, inv_h); };
                MotorJoint.prototype.SolvePositionConstraints = function (data) { return true; };
                MotorJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log(" MotorJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = bool({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.linearOffset.Set({0}, {1});", this.m_linearOffset.x, this.m_linearOffset.y); PhysicsType2d.Utils.log("  jd.angularOffset = {0};", this.m_angularOffset); PhysicsType2d.Utils.log("  jd.maxForce = {0};", this.m_maxForce); PhysicsType2d.Utils.log("  jd.maxTorque = {0};", this.m_maxTorque); PhysicsType2d.Utils.log("  jd.correctionFactor = {0};", this.m_correctionFactor); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world.CreateJoint(&jd);", this.m_index); };
                MotorJoint.prototype.SetLinearOffset = function (linearOffset) { if (linearOffset.x != this.m_linearOffset.x || linearOffset.y != this.m_linearOffset.y) {
                    this.m_bodyA.SetAwake(true);
                    this.m_bodyB.SetAwake(true);
                    this.m_linearOffset = linearOffset;
                } };
                MotorJoint.prototype.GetLinearOffset = function () { return this.m_linearOffset; };
                MotorJoint.prototype.SetAngularOffset = function (angularOffset) { if (angularOffset != this.m_angularOffset) {
                    this.m_bodyA.SetAwake(true);
                    this.m_bodyB.SetAwake(true);
                    this.m_angularOffset = angularOffset;
                } };
                MotorJoint.prototype.GetAngularOffset = function () { return this.m_angularOffset; };
                MotorJoint.prototype.SetMaxTorque = function (torque) { PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(torque) && torque >= 0.0); this.m_maxTorque = torque; };
                MotorJoint.prototype.GetMaxTorque = function () { return this.m_maxTorque; };
                MotorJoint.prototype.SetCorrectionFactor = function (factor) { PhysicsType2d.Assert(PhysicsType2d.MathExtensions.IsValid(factor) && 0.0 <= factor && factor <= 1.0); this.m_correctionFactor = factor; };
                MotorJoint.prototype.GetCorrectionFactor = function () { return this.m_correctionFactor; };
                return MotorJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.MotorJoint = MotorJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var PulleyJointDefinition = (function (_super) {
                __extends(PulleyJointDefinition, _super);
                function PulleyJointDefinition() { _super.call(this); this.groundAnchorA = new PhysicsType2d.Vector2(0, 0); this.groundAnchorB = new PhysicsType2d.Vector2(0, 0); this.localAnchorA = new PhysicsType2d.Vector2(0, 0); this.localAnchorB = new PhysicsType2d.Vector2(0, 0); this.type = 4; this.groundAnchorA = new PhysicsType2d.Vector2(-1.0, 1.0); this.groundAnchorB = new PhysicsType2d.Vector2(1.0, 1.0); this.localAnchorA = new PhysicsType2d.Vector2(-1.0, 0.0); this.localAnchorB = new PhysicsType2d.Vector2(1.0, 0.0); this.lengthA = 0.0; this.lengthB = 0.0; this.ratio = 1.0; this.collideConnected = true; }
                PulleyJointDefinition.prototype.Initialize = function (bA, bB, groundA, groundB, anchorA, anchorB, r) { this.bodyA = bA; this.bodyB = bB; this.groundAnchorA = groundA; this.groundAnchorB = groundB; this.localAnchorA = this.bodyA.GetLocalPoint(anchorA); this.localAnchorB = this.bodyB.GetLocalPoint(anchorB); var dA = anchorA.Subtract(groundA); this.lengthA = dA.Length(); var dB = anchorB.Subtract(groundB); this.lengthB = dB.Length(); this.ratio = r; PhysicsType2d.Assert(this.ratio > PhysicsType2d.Constants.EPSILON); };
                return PulleyJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.PulleyJointDefinition = PulleyJointDefinition;
            var PulleyJoint = (function (_super) {
                __extends(PulleyJoint, _super);
                function PulleyJoint(def) { _super.call(this, def); this.m_groundAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_groundAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_rA = new PhysicsType2d.Vector2(0, 0); this.m_rB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_uA = new PhysicsType2d.Vector2(0, 0); this.m_uB = new PhysicsType2d.Vector2(0, 0); this.m_groundAnchorA = def.groundAnchorA; this.m_groundAnchorB = def.groundAnchorB; this.m_localAnchorA = def.localAnchorA; this.m_localAnchorB = def.localAnchorB; this.m_lengthA = def.lengthA; this.m_lengthB = def.lengthB; PhysicsType2d.Assert(def.ratio != 0.0); this.m_ratio = def.ratio; this.m_constant = def.lengthA + this.m_ratio * def.lengthB; this.m_impulse = 0.0; }
                PulleyJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                PulleyJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                PulleyJoint.prototype.GetReactionForce = function (inv_dt) { var P = this.m_uB.Multiply(this.m_impulse); return P.Multiply(inv_dt); };
                PulleyJoint.prototype.GetReactionTorque = function (inv_dt) { return 0.0; };
                PulleyJoint.prototype.GetGroundAnchorA = function () { return this.m_groundAnchorA; };
                PulleyJoint.prototype.GetGroundAnchorB = function () { return this.m_groundAnchorB; };
                PulleyJoint.prototype.GetLengthA = function () { var p = this.m_bodyA.GetWorldPoint(this.m_localAnchorA); var s = this.m_groundAnchorA; var d = p.Subtract(s); return d.Length(); };
                PulleyJoint.prototype.GetLengthB = function () { var p = this.m_bodyB.GetWorldPoint(this.m_localAnchorB); var s = this.m_groundAnchorB; var d = p.Subtract(s); return d.Length(); };
                PulleyJoint.prototype.GetRatio = function () { return this.m_ratio; };
                PulleyJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log(" PulleyJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.groundAnchorA.Set({0}, {1});", this.m_groundAnchorA.x, this.m_groundAnchorA.y); PhysicsType2d.Utils.log("  jd.groundAnchorB.Set({0}, {1});", this.m_groundAnchorB.x, this.m_groundAnchorB.y); PhysicsType2d.Utils.log("  jd.localAnchorA.Set({0}, {1});", this.m_localAnchorA.x, this.m_localAnchorA.y); PhysicsType2d.Utils.log("  jd.localAnchorB.Set({0}, {1});", this.m_localAnchorB.x, this.m_localAnchorB.y); PhysicsType2d.Utils.log("  jd.lengthA = {0};", this.m_lengthA); PhysicsType2d.Utils.log("  jd.lengthB = {0};", this.m_lengthB); PhysicsType2d.Utils.log("  jd.ratio = {0};", this.m_ratio); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world->CreateJoint(&jd);", this.m_index); };
                PulleyJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    this.m_rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    this.m_rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    this.m_uA = cA.Add(this.m_rA).Subtract(this.m_groundAnchorA);
                    this.m_uB = cB.Add(this.m_rB).Subtract(this.m_groundAnchorB);
                    var lengthA = this.m_uA.Length();
                    var lengthB = this.m_uB.Length();
                    if (lengthA > 10.0 * PhysicsType2d.Settings.linearSlop) {
                        this.m_uA = this.m_uA.Multiply(1.0 / lengthA);
                    }
                    else {
                        this.m_uA.SetZero();
                    }
                    if (lengthB > 10.0 * PhysicsType2d.Settings.linearSlop) {
                        this.m_uB = this.m_uB.Multiply(1.0 / lengthB);
                    }
                    else {
                        this.m_uB.SetZero();
                    }
                    var ruA = this.m_rA.Cross(this.m_uA);
                    var ruB = this.m_rB.Cross(this.m_uB);
                    var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
                    var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
                    this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
                    if (this.m_mass > 0.0) {
                        this.m_mass = 1.0 / this.m_mass;
                    }
                    if (data.step.warmStarting) {
                        this.m_impulse *= data.step.dtRatio;
                        var PA = this.m_uA.Multiply(-this.m_impulse);
                        var PB = this.m_uB.Multiply(-this.m_ratio * this.m_impulse);
                        vA = vA.Add(PA.Multiply(this.m_invMassA));
                        wA += this.m_invIA * this.m_rA.Cross(PA);
                        vB = vB.Add(PB.Multiply(this.m_invMassB));
                        wB += this.m_invIB * this.m_rB.Cross(PB);
                    }
                    else {
                        this.m_impulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                PulleyJoint.prototype.SolveVelocityConstraints = function (data) { var vA = data.velocities[this.m_indexA].v; var wA = data.velocities[this.m_indexA].w; var vB = data.velocities[this.m_indexB].v; var wB = data.velocities[this.m_indexB].w; var vpA = vA.Add(PhysicsType2d.MathExtensions.Cross1x2(wA, this.m_rA)); var vpB = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, this.m_rB)); var Cdot = -this.m_uA.Dot(vpA) - this.m_ratio * this.m_uB.Dot(vpB); var impulse = -this.m_mass * Cdot; this.m_impulse += impulse; var PA = this.m_uA.Multiply(-impulse); var PB = this.m_uB.Multiply(-this.m_ratio * impulse); vA = vA.Add(PA.Multiply(this.m_invMassA)); wA += this.m_invIA * this.m_rA.Cross(PA); vB = vB.Add(PB.Multiply(this.m_invMassB)); wB += this.m_invIB * this.m_rB.Cross(PB); data.velocities[this.m_indexA].v = vA; data.velocities[this.m_indexA].w = wA; data.velocities[this.m_indexB].v = vB; data.velocities[this.m_indexB].w = wB; };
                PulleyJoint.prototype.SolvePositionConstraints = function (data) {
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var uA = cA.Add(rA).Subtract(this.m_groundAnchorA);
                    var uB = cB.Add(rB).Subtract(this.m_groundAnchorB);
                    var lengthA = uA.Length();
                    var lengthB = uB.Length();
                    if (lengthA > 10.0 * PhysicsType2d.Settings.linearSlop) {
                        uA = uA.Multiply(1.0 / lengthA);
                    }
                    else {
                        uA.SetZero();
                    }
                    if (lengthB > 10.0 * PhysicsType2d.Settings.linearSlop) {
                        uB = uB.Multiply(1.0 / lengthB);
                    }
                    else {
                        uB.SetZero();
                    }
                    var ruA = rA.Cross(uA);
                    var ruB = rB.Cross(uB);
                    var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
                    var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
                    var mass = mA + this.m_ratio * this.m_ratio * mB;
                    if (mass > 0.0) {
                        mass = 1.0 / mass;
                    }
                    var C = this.m_constant - lengthA - this.m_ratio * lengthB;
                    var linearError = Math.abs(C);
                    var impulse = -mass * C;
                    var PA = uA.Multiply(-impulse);
                    var PB = uB.Multiply(-this.m_ratio * impulse);
                    cA = cA.Add(PA.Multiply(this.m_invMassA));
                    aA += this.m_invIA * rA.Cross(PA);
                    cB = cB.Add(PB.Multiply(this.m_invMassB));
                    aB += this.m_invIB * rB.Cross(PB);
                    data.positions[this.m_indexA].c = cA;
                    data.positions[this.m_indexA].a = aA;
                    data.positions[this.m_indexB].c = cB;
                    data.positions[this.m_indexB].a = aB;
                    return linearError < PhysicsType2d.Settings.linearSlop;
                };
                return PulleyJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.PulleyJoint = PulleyJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var RopeJointDefinition = (function (_super) {
                __extends(RopeJointDefinition, _super);
                function RopeJointDefinition() { _super.call(this); this.localAnchorA = new PhysicsType2d.Vector2(0, 0); this.localAnchorB = new PhysicsType2d.Vector2(0, 0); this.type = 10; this.localAnchorA = new PhysicsType2d.Vector2(-1.0, 0.0); this.localAnchorB = new PhysicsType2d.Vector2(1.0, 0.0); this.maxLength = 0.0; }
                return RopeJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.RopeJointDefinition = RopeJointDefinition;
            var RopeJoint = (function (_super) {
                __extends(RopeJoint, _super);
                function RopeJoint(def) { _super.call(this, def); this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_u = new PhysicsType2d.Vector2(0, 0); this.m_rA = new PhysicsType2d.Vector2(0, 0); this.m_rB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorA = def.localAnchorA; this.m_localAnchorB = def.localAnchorB; this.m_maxLength = def.maxLength; this.m_mass = 0.0; this.m_impulse = 0.0; this.m_state = 0; this.m_length = 0.0; }
                RopeJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                RopeJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                RopeJoint.prototype.GetReactionForce = function (inv_dt) { var F = this.m_u.Multiply(inv_dt * this.m_impulse); return F; };
                RopeJoint.prototype.GetReactionTorque = function (inv_dt) { return 0.0; };
                RopeJoint.prototype.GetMaxLength = function () { return this.m_maxLength; };
                RopeJoint.prototype.GetLimitState = function () { return this.m_state; };
                RopeJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log(" RopeJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.localAnchorA.Set({0}, {1});", this.m_localAnchorA.x, this.m_localAnchorA.y); PhysicsType2d.Utils.log("  jd.localAnchorB.Set({0}, {1});", this.m_localAnchorB.x, this.m_localAnchorB.y); PhysicsType2d.Utils.log("  jd.maxLength = {0};", this.m_maxLength); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world->CreateJoint(&jd);", this.m_index); };
                RopeJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
                RopeJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
                RopeJoint.prototype.SetMaxLength = function (length) { this.m_maxLength = length; };
                RopeJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    this.m_rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    this.m_rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    this.m_u = cB.Add(this.m_rB).Subtract(cA).Subtract(this.m_rA);
                    this.m_length = this.m_u.Length();
                    var C = this.m_length - this.m_maxLength;
                    if (C > 0.0) {
                        this.m_state = 2;
                    }
                    else {
                        this.m_state = 0;
                    }
                    if (this.m_length > PhysicsType2d.Settings.linearSlop) {
                        this.m_u = this.m_u.Multiply(1.0 / this.m_length);
                    }
                    else {
                        this.m_u.SetZero();
                        this.m_mass = 0.0;
                        this.m_impulse = 0.0;
                        return;
                    }
                    var crA = this.m_rA.Cross(this.m_u);
                    var crB = this.m_rB.Cross(this.m_u);
                    var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB + this.m_invIB * crB * crB;
                    this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
                    if (data.step.warmStarting) {
                        this.m_impulse *= data.step.dtRatio;
                        var P = this.m_u.Multiply(this.m_impulse);
                        vA = vA.Subtract(P.Multiply(this.m_invMassA));
                        wA -= this.m_invIA * this.m_rA.Cross(P);
                        vB = vB.Add(P.Multiply(this.m_invMassB));
                        wB += this.m_invIB * this.m_rB.Cross(P);
                    }
                    else {
                        this.m_impulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                RopeJoint.prototype.SolveVelocityConstraints = function (data) {
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var vpA = vA.Add(PhysicsType2d.MathExtensions.Cross1x2(wA, this.m_rA));
                    var vpB = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, this.m_rB));
                    var C = this.m_length - this.m_maxLength;
                    var Cdot = this.m_u.Dot(vpB.Subtract(vpA));
                    if (C < 0.0) {
                        Cdot += data.step.inv_dt * C;
                    }
                    var impulse = -this.m_mass * Cdot;
                    var oldImpulse = this.m_impulse;
                    this.m_impulse = Math.min(0.0, this.m_impulse + impulse);
                    impulse = this.m_impulse - oldImpulse;
                    var P = this.m_u.Multiply(impulse);
                    vA = vA.Subtract(P.Multiply(this.m_invMassA));
                    wA -= this.m_invIA * this.m_rA.Cross(P);
                    vB = vB.Add(P.Multiply(this.m_invMassB));
                    wB += this.m_invIB * this.m_rB.Cross(P);
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                RopeJoint.prototype.SolvePositionConstraints = function (data) { var cA = data.positions[this.m_indexA].c; var aA = data.positions[this.m_indexA].a; var cB = data.positions[this.m_indexB].c; var aB = data.positions[this.m_indexB].a; var qA = PhysicsType2d.Rotation.FromRadians(aA); var qB = PhysicsType2d.Rotation.FromRadians(aB); var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA)); var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB)); var u = cB.Add(rB).Subtract(cA).Subtract(rA); var length = u.Normalize(); var C = length - this.m_maxLength; C = PhysicsType2d.MathExtensions.Clamp(C, 0.0, PhysicsType2d.Settings.maxLinearCorrection); var impulse = -this.m_mass * C; var P = u.Multiply(impulse); cA = cA.Subtract(P.Multiply(this.m_invMassA)); aA -= this.m_invIA * rA.Cross(P); cB = cB.Add(P.Multiply(this.m_invMassB)); aB += this.m_invIB * rB.Cross(P); data.positions[this.m_indexA].c = cA; data.positions[this.m_indexA].a = aA; data.positions[this.m_indexB].c = cB; data.positions[this.m_indexB].a = aB; return length - this.m_maxLength < PhysicsType2d.Settings.linearSlop; };
                return RopeJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.RopeJoint = RopeJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var WeldJointDefinition = (function (_super) {
                __extends(WeldJointDefinition, _super);
                function WeldJointDefinition() { _super.call(this); this.localAnchorA = new PhysicsType2d.Vector2(0, 0); this.localAnchorB = new PhysicsType2d.Vector2(0, 0); this.type = 8; this.localAnchorA = new PhysicsType2d.Vector2(0.0, 0.0); this.localAnchorB = new PhysicsType2d.Vector2(0.0, 0.0); this.referenceAngle = 0.0; this.frequencyHz = 0.0; this.dampingRatio = 0.0; }
                WeldJointDefinition.prototype.Initialize = function (bA, bB, anchor) { this.bodyA = bA; this.bodyB = bB; this.localAnchorA = this.bodyA.GetLocalPoint(anchor); this.localAnchorB = this.bodyB.GetLocalPoint(anchor); this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle(); };
                return WeldJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.WeldJointDefinition = WeldJointDefinition;
            var WeldJoint = (function (_super) {
                __extends(WeldJoint, _super);
                function WeldJoint(def) { _super.call(this, def); this.m_impulse = new PhysicsType2d.Vector3(0, 0, 0); this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_rA = new PhysicsType2d.Vector2(0, 0); this.m_rB = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_mass = new PhysicsType2d.Matrix3x3(); this.m_localAnchorA = def.localAnchorA; this.m_localAnchorB = def.localAnchorB; this.m_referenceAngle = def.referenceAngle; this.m_frequencyHz = def.frequencyHz; this.m_dampingRatio = def.dampingRatio; }
                WeldJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
                WeldJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
                WeldJoint.prototype.GetReferenceAngle = function () { return this.m_referenceAngle; };
                WeldJoint.prototype.SetFrequency = function (hz) { this.m_frequencyHz = hz; };
                WeldJoint.prototype.GetFrequency = function () { return this.m_frequencyHz; };
                WeldJoint.prototype.SetDampingRatio = function (ratio) { this.m_dampingRatio = ratio; };
                WeldJoint.prototype.GetDampingRatio = function () { return this.m_dampingRatio; };
                WeldJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                WeldJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                WeldJoint.prototype.GetReactionForce = function (inv_dt) { var P = new PhysicsType2d.Vector2(this.m_impulse.x, this.m_impulse.y); return P.Multiply(inv_dt); };
                WeldJoint.prototype.GetReactionTorque = function (inv_dt) { return inv_dt * this.m_impulse.z; };
                WeldJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log("  WeldJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.localAnchorA.Set({0}, {1});", this.m_localAnchorA.x, this.m_localAnchorA.y); PhysicsType2d.Utils.log("  jd.localAnchorB.Set({0}, {1});", this.m_localAnchorB.x, this.m_localAnchorB.y); PhysicsType2d.Utils.log("  jd.referenceAngle = {0};", this.m_referenceAngle); PhysicsType2d.Utils.log("  jd.frequencyHz = {0};", this.m_frequencyHz); PhysicsType2d.Utils.log("  jd.dampingRatio = {0};", this.m_dampingRatio); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world->CreateJoint(&jd);", this.m_index); };
                WeldJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    this.m_rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    this.m_rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var mA = this.m_invMassA, mB = this.m_invMassB;
                    var iA = this.m_invIA, iB = this.m_invIB;
                    var K = new PhysicsType2d.Matrix3x3();
                    K.EX.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
                    K.EY.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
                    K.EZ.x = -this.m_rA.y * iA - this.m_rB.y * iB;
                    K.EX.y = K.EY.x;
                    K.EY.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
                    K.EZ.y = this.m_rA.x * iA + this.m_rB.x * iB;
                    K.EX.z = K.EZ.x;
                    K.EY.z = K.EZ.y;
                    K.EZ.z = iA + iB;
                    if (this.m_frequencyHz > 0.0) {
                        this.m_mass = K.GetInverse22();
                        var invM = iA + iB;
                        var m = invM > 0.0 ? 1.0 / invM : 0.0;
                        var C = aB - aA - this.m_referenceAngle;
                        var omega = 2.0 * PhysicsType2d.Constants.PI * this.m_frequencyHz;
                        var d = 2.0 * m * this.m_dampingRatio * omega;
                        var k = m * omega * omega;
                        var h = data.step.dt;
                        this.m_gamma = h * (d + h * k);
                        this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
                        this.m_bias = C * h * k * this.m_gamma;
                        invM += this.m_gamma;
                        this.m_mass.EZ.z = invM != 0.0 ? 1.0 / invM : 0.0;
                    }
                    else {
                        this.m_mass = K.GetSymInverse33();
                        this.m_gamma = 0.0;
                        this.m_bias = 0.0;
                    }
                    if (data.step.warmStarting) {
                        this.m_impulse = this.m_impulse.Multiply(data.step.dtRatio);
                        var P = new PhysicsType2d.Vector2(this.m_impulse.x, this.m_impulse.y);
                        vA = vA.Subtract(P.Multiply(mA));
                        wA -= iA * (this.m_rA.Cross(P) + this.m_impulse.z);
                        vB = vB.Add(P.Multiply(mB));
                        wB += iB * (this.m_rB.Cross(P) + this.m_impulse.z);
                    }
                    else {
                        this.m_impulse.SetZero();
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                WeldJoint.prototype.SolveVelocityConstraints = function (data) {
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var mA = this.m_invMassA, mB = this.m_invMassB;
                    var iA = this.m_invIA, iB = this.m_invIB;
                    if (this.m_frequencyHz > 0.0) {
                        var Cdot2 = wB - wA;
                        var impulse2 = -this.m_mass.EZ.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
                        this.m_impulse.z += impulse2;
                        wA -= iA * impulse2;
                        wB += iB * impulse2;
                        var Cdot1 = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, this.m_rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, this.m_rA));
                        var impulse1 = this.m_mass.Vector2Multiply(Cdot1).Negative();
                        this.m_impulse.x += impulse1.x;
                        this.m_impulse.y += impulse1.y;
                        var P = impulse1;
                        vA = vA.Subtract(P.Multiply(mA));
                        wA -= iA * this.m_rA.Cross(P);
                        vB = vB.Add(P.Multiply(mB));
                        wB += iB * this.m_rB.Cross(P);
                    }
                    else {
                        var Cdot1 = vB.Add(PhysicsType2d.MathExtensions.Cross1x2(wB, this.m_rB)).Subtract(vA).Subtract(PhysicsType2d.MathExtensions.Cross1x2(wA, this.m_rA));
                        var Cdot2 = wB - wA;
                        var Cdot = new PhysicsType2d.Vector3(Cdot1.x, Cdot1.y, Cdot2);
                        var impulse = this.m_mass.Vector3Multiply(Cdot).Negative();
                        this.m_impulse = this.m_impulse.Add(impulse);
                        var P = new PhysicsType2d.Vector2(impulse.x, impulse.y);
                        vA = vA.Subtract(P.Multiply(mA));
                        wA -= iA * (this.m_rA.Cross(P) + impulse.z);
                        vB = vB.Add(P.Multiply(mB));
                        wB += iB * (this.m_rB.Cross(P) + impulse.z);
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                WeldJoint.prototype.SolvePositionConstraints = function (data) {
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var mA = this.m_invMassA, mB = this.m_invMassB;
                    var iA = this.m_invIA, iB = this.m_invIB;
                    var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var positionError = 0;
                    var angularError = 0;
                    var K = new PhysicsType2d.Matrix3x3();
                    K.EX.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
                    K.EY.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
                    K.EZ.x = -rA.y * iA - rB.y * iB;
                    K.EX.y = K.EY.x;
                    K.EY.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
                    K.EZ.y = rA.x * iA + rB.x * iB;
                    K.EX.z = K.EZ.x;
                    K.EY.z = K.EZ.y;
                    K.EZ.z = iA + iB;
                    if (this.m_frequencyHz > 0.0) {
                        var C1 = cB.Add(rB).Subtract(cA).Subtract(rA);
                        positionError = C1.Length();
                        angularError = 0.0;
                        var P = K.Solve2x2(C1).Negative();
                        cA = cA.Subtract(P.Multiply(mA));
                        aA -= iA * rA.Cross(P);
                        cB = cB.Add(P.Multiply(mB));
                        aB += iB * rB.Cross(P);
                    }
                    else {
                        var C1 = cB.Add(rB).Subtract(cA).Subtract(rA);
                        var C2 = aB - aA - this.m_referenceAngle;
                        positionError = C1.Length();
                        angularError = Math.abs(C2);
                        var C = new PhysicsType2d.Vector3(C1.x, C1.y, C2);
                        var impulse = K.Solve3x3(C).Negative();
                        var P = new PhysicsType2d.Vector2(impulse.x, impulse.y);
                        cA = cA.Subtract(P.Multiply(mA));
                        aA -= iA * (rA.Cross(P) + impulse.z);
                        cB = cB.Add(P.Multiply(mB));
                        aB += iB * (rB.Cross(P) + impulse.z);
                    }
                    data.positions[this.m_indexA].c = cA;
                    data.positions[this.m_indexA].a = aA;
                    data.positions[this.m_indexB].c = cB;
                    data.positions[this.m_indexB].a = aB;
                    return positionError <= PhysicsType2d.Settings.linearSlop && angularError <= PhysicsType2d.Settings.angularSlop;
                };
                return WeldJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.WeldJoint = WeldJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var WheelJointDefinition = (function (_super) {
                __extends(WheelJointDefinition, _super);
                function WheelJointDefinition() { _super.call(this); this.type = 7; this.enableMotor = false; this.maxMotorTorque = 0.0; this.motorSpeed = 0.0; this.frequencyHz = 2.0; this.dampingRatio = 0.7; this.localAnchorA = new PhysicsType2d.Vector2(0, 0); this.localAnchorB = new PhysicsType2d.Vector2(0, 0); this.localAxisA = new PhysicsType2d.Vector2(1, 0); }
                WheelJointDefinition.prototype.Initialize = function (bA, bB, anchor, axis) { this.bodyA = bA; this.bodyB = bB; this.localAnchorA = bA.GetLocalPoint(anchor); this.localAnchorB = bB.GetLocalPoint(anchor); this.localAxisA = bA.GetLocalVector(axis); };
                return WheelJointDefinition;
            })(PhysicsType2d.Dynamics.Joints.JointDefinition);
            Joints.WheelJointDefinition = WheelJointDefinition;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
var PhysicsType2d;
(function (PhysicsType2d) {
    (function (Dynamics) {
        (function (Joints) {
            var WheelJoint = (function (_super) {
                __extends(WheelJoint, _super);
                function WheelJoint(def) { _super.call(this, def); this.m_localAnchorA = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorB = new PhysicsType2d.Vector2(0, 0); this.m_localXAxisA = new PhysicsType2d.Vector2(0, 0); this.m_localYAxisA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterA = new PhysicsType2d.Vector2(0, 0); this.m_localCenterB = new PhysicsType2d.Vector2(0, 0); this.m_ax = new PhysicsType2d.Vector2(0, 0); this.m_ay = new PhysicsType2d.Vector2(0, 0); this.m_localAnchorA = def.localAnchorA.Clone(); this.m_localAnchorB = def.localAnchorB.Clone(); this.m_localXAxisA = def.localAxisA.Clone(); this.m_localYAxisA = PhysicsType2d.MathExtensions.Cross1x2(1.0, this.m_localXAxisA); this.m_mass = 0.0; this.m_impulse = 0.0; this.m_motorMass = 0.0; this.m_motorImpulse = 0.0; this.m_springMass = 0.0; this.m_springImpulse = 0.0; this.m_maxMotorTorque = def.maxMotorTorque; this.m_motorSpeed = def.motorSpeed; this.m_enableMotor = def.enableMotor; this.m_frequencyHz = def.frequencyHz; this.m_dampingRatio = def.dampingRatio; this.m_bias = 0.0; this.m_gamma = 0.0; }
                WheelJoint.prototype.GetAnchorA = function () { return this.m_bodyA.GetWorldPoint(this.m_localAnchorA); };
                WheelJoint.prototype.GetAnchorB = function () { return this.m_bodyB.GetWorldPoint(this.m_localAnchorB); };
                WheelJoint.prototype.GetReactionForce = function (inv_dt) { return (this.m_ay.Multiply(this.m_impulse).Add(this.m_ax.Multiply(this.m_springImpulse))).Multiply(inv_dt); };
                WheelJoint.prototype.GetReactionTorque = function (inv_dt) { return inv_dt * this.m_motorImpulse; };
                WheelJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
                WheelJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
                WheelJoint.prototype.GetLocalAxisA = function () { return this.m_localXAxisA; };
                WheelJoint.prototype.GetJointTranslation = function () { var bA = this.m_bodyA; var bB = this.m_bodyB; var pA = bA.GetWorldPoint(this.m_localAnchorA); var pB = bB.GetWorldPoint(this.m_localAnchorB); var d = pB.Subtract(pA); var axis = bA.GetWorldVector(this.m_localXAxisA); var translation = d.Dot(axis); return translation; };
                WheelJoint.prototype.GetJointSpeed = function () { var wA = this.m_bodyA.GetAngularVelocity(); var wB = this.m_bodyB.GetAngularVelocity(); return wB - wA; };
                WheelJoint.prototype.IsMotorEnabled = function () { return this.m_enableMotor; };
                WheelJoint.prototype.EnableMotor = function (flag) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_enableMotor = flag; };
                WheelJoint.prototype.SetMotorSpeed = function (speed) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_motorSpeed = speed; };
                WheelJoint.prototype.GetMotorSpeed = function () { return this.m_motorSpeed; };
                WheelJoint.prototype.SetMaxMotorTorque = function (torque) { this.m_bodyA.SetAwake(true); this.m_bodyB.SetAwake(true); this.m_maxMotorTorque = torque; };
                WheelJoint.prototype.GetMaxMotorTorque = function () { return this.m_maxMotorTorque; };
                WheelJoint.prototype.GetMotorTorque = function (inv_dt) { return inv_dt * this.m_motorImpulse; };
                WheelJoint.prototype.SetSpringFrequencyHz = function (hz) { this.m_frequencyHz = hz; };
                WheelJoint.prototype.GetSpringFrequencyHz = function () { return this.m_frequencyHz; };
                WheelJoint.prototype.SetSpringDampingRatio = function (ratio) { this.m_dampingRatio = ratio; };
                WheelJoint.prototype.GetSpringDampingRatio = function () { return this.m_dampingRatio; };
                WheelJoint.prototype.Dump = function () { var indexA = this.m_bodyA.GetIslandIndex(); var indexB = this.m_bodyB.GetIslandIndex(); PhysicsType2d.Utils.log("  WheelJointDef jd;"); PhysicsType2d.Utils.log("  jd.bodyA = bodies[{0}];", indexA); PhysicsType2d.Utils.log("  jd.bodyB = bodies[{0}];", indexB); PhysicsType2d.Utils.log("  jd.collideConnected = boolean({0});", this.m_collideConnected); PhysicsType2d.Utils.log("  jd.localAnchorA.Set({0}, {1});", this.m_localAnchorA.x, this.m_localAnchorA.y); PhysicsType2d.Utils.log("  jd.localAnchorB.Set({0}, {1});", this.m_localAnchorB.x, this.m_localAnchorB.y); PhysicsType2d.Utils.log("  jd.localAxisA.Set({0}, {1});", this.m_localXAxisA.x, this.m_localXAxisA.y); PhysicsType2d.Utils.log("  jd.enableMotor = boolean({0});", this.m_enableMotor); PhysicsType2d.Utils.log("  jd.motorSpeed = {0};", this.m_motorSpeed); PhysicsType2d.Utils.log("  jd.maxMotorTorque = {0};", this.m_maxMotorTorque); PhysicsType2d.Utils.log("  jd.frequencyHz = {0};", this.m_frequencyHz); PhysicsType2d.Utils.log("  jd.dampingRatio = {0};", this.m_dampingRatio); PhysicsType2d.Utils.log("  joints[{0}] = this.m_world.CreateJoint(&jd);", this.m_index); };
                WheelJoint.prototype.InitVelocityConstraints = function (data) {
                    this.m_indexA = this.m_bodyA.GetIslandIndex();
                    this.m_indexB = this.m_bodyB.GetIslandIndex();
                    this.m_localCenterA = this.m_bodyA.GetSweep().localCenter;
                    this.m_localCenterB = this.m_bodyB.GetSweep().localCenter;
                    this.m_invMassA = this.m_bodyA.GetInvMass();
                    this.m_invMassB = this.m_bodyB.GetInvMass();
                    this.m_invIA = this.m_bodyA.GetInvI();
                    this.m_invIB = this.m_bodyB.GetInvI();
                    var mA = this.m_invMassA, mB = this.m_invMassB;
                    var iA = this.m_invIA, iB = this.m_invIB;
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var vA = data.velocities[this.m_indexA].v;
                    var wA = data.velocities[this.m_indexA].w;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var vB = data.velocities[this.m_indexB].v;
                    var wB = data.velocities[this.m_indexB].w;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var d = cB.Add(rB).Subtract(cA).Subtract(rA);
                    {
                        this.m_ay = qA.ApplyToVector2(this.m_localYAxisA);
                        this.m_sAy = (d.Add(rA)).Cross(this.m_ay);
                        this.m_sBy = rB.Cross(this.m_ay);
                        this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy * this.m_sBy;
                        if (this.m_mass > 0.0) {
                            this.m_mass = 1.0 / this.m_mass;
                        }
                    }
                    this.m_springMass = 0.0;
                    this.m_bias = 0.0;
                    this.m_gamma = 0.0;
                    if (this.m_frequencyHz > 0.0) {
                        this.m_ax = qA.ApplyToVector2(this.m_localXAxisA);
                        this.m_sAx = (d.Add(rA)).Cross(this.m_ax);
                        this.m_sBx = rB.Cross(this.m_ax);
                        var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;
                        if (invMass > 0.0) {
                            this.m_springMass = 1.0 / invMass;
                            var C = d.Dot(this.m_ax);
                            var omega = 2.0 * PhysicsType2d.Constants.PI * this.m_frequencyHz;
                            var damping = 2.0 * this.m_springMass * this.m_dampingRatio * omega;
                            var k = this.m_springMass * omega * omega;
                            var h = data.step.dt;
                            this.m_gamma = h * (damping + h * k);
                            if (this.m_gamma > 0.0) {
                                this.m_gamma = 1.0 / this.m_gamma;
                            }
                            this.m_bias = C * h * k * this.m_gamma;
                            this.m_springMass = invMass + this.m_gamma;
                            if (this.m_springMass > 0.0) {
                                this.m_springMass = 1.0 / this.m_springMass;
                            }
                        }
                    }
                    else {
                        this.m_springImpulse = 0.0;
                    }
                    if (this.m_enableMotor) {
                        this.m_motorMass = iA + iB;
                        if (this.m_motorMass > 0.0) {
                            this.m_motorMass = 1.0 / this.m_motorMass;
                        }
                    }
                    else {
                        this.m_motorMass = 0.0;
                        this.m_motorImpulse = 0.0;
                    }
                    if (data.step.warmStarting) {
                        this.m_impulse *= data.step.dtRatio;
                        this.m_springImpulse *= data.step.dtRatio;
                        this.m_motorImpulse *= data.step.dtRatio;
                        var P = (this.m_ay.Multiply(this.m_impulse)).Add(this.m_ax.Multiply(this.m_springImpulse));
                        var LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
                        var LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
                        vA = vA.Subtract(P.Multiply(this.m_invMassA));
                        wA -= this.m_invIA * LA;
                        vB = vB.Add(P.Multiply(this.m_invMassB));
                        wB += this.m_invIB * LB;
                    }
                    else {
                        this.m_impulse = 0.0;
                        this.m_springImpulse = 0.0;
                        this.m_motorImpulse = 0.0;
                    }
                    data.velocities[this.m_indexA].v = vA;
                    data.velocities[this.m_indexA].w = wA;
                    data.velocities[this.m_indexB].v = vB;
                    data.velocities[this.m_indexB].w = wB;
                };
                WheelJoint.prototype.SolveVelocityConstraints = function (data) { var mA = this.m_invMassA; var mB = this.m_invMassB; var iA = this.m_invIA; var iB = this.m_invIB; var vA = data.velocities[this.m_indexA].v; var wA = data.velocities[this.m_indexA].w; var vB = data.velocities[this.m_indexB].v; var wB = data.velocities[this.m_indexB].w; (function (self) { var Cdot = self.m_ax.Dot(vB.Subtract(vA)) + self.m_sBx * wB - self.m_sAx * wA; var impulse = -self.m_springMass * (Cdot + self.m_bias + self.m_gamma * self.m_springImpulse); self.m_springImpulse += impulse; var P = self.m_ax.Multiply(impulse); var LA = impulse * self.m_sAx; var LB = impulse * self.m_sBx; vA = vA.Subtract(P.Multiply(mA)); wA -= iA * LA; vB = vB.Add(P.Multiply(mB)); wB += iB * LB; })(this); (function (self) { var Cdot = wB - wA - self.m_motorSpeed; var impulse = -self.m_motorMass * Cdot; var oldImpulse = self.m_motorImpulse; var maxImpulse = data.step.dt * self.m_maxMotorTorque; self.m_motorImpulse = PhysicsType2d.MathExtensions.Clamp(self.m_motorImpulse + impulse, -maxImpulse, maxImpulse); impulse = self.m_motorImpulse - oldImpulse; wA -= iA * impulse; wB += iB * impulse; })(this); (function (self) { var Cdot = self.m_ay.Dot(vB.Subtract(vA)) + self.m_sBy * wB - self.m_sAy * wA; var impulse = -self.m_mass * Cdot; self.m_impulse += impulse; var P = self.m_ay.Multiply(impulse); var LA = impulse * self.m_sAy; var LB = impulse * self.m_sBy; vA = vA.Subtract(P.Multiply(mA)); wA -= iA * LA; vB = vB.Add(P.Multiply(mB)); wB += iB * LB; })(this); data.velocities[this.m_indexA].v = vA; data.velocities[this.m_indexA].w = wA; data.velocities[this.m_indexB].v = vB; data.velocities[this.m_indexB].w = wB; };
                WheelJoint.prototype.SolvePositionConstraints = function (data) {
                    var cA = data.positions[this.m_indexA].c;
                    var aA = data.positions[this.m_indexA].a;
                    var cB = data.positions[this.m_indexB].c;
                    var aB = data.positions[this.m_indexB].a;
                    var qA = PhysicsType2d.Rotation.FromRadians(aA);
                    var qB = PhysicsType2d.Rotation.FromRadians(aB);
                    var rA = qA.ApplyToVector2(this.m_localAnchorA.Subtract(this.m_localCenterA));
                    var rB = qB.ApplyToVector2(this.m_localAnchorB.Subtract(this.m_localCenterB));
                    var d = cB.Subtract(cA).Add(rB.Subtract(rA));
                    var ay = qA.ApplyToVector2(this.m_localYAxisA);
                    var sAy = (d.Add(rA)).Cross(ay);
                    var sBy = rB.Cross(ay);
                    var C = d.Dot(ay);
                    var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
                    var impulse = 0.0;
                    if (k != 0.0) {
                        impulse = -C / k;
                    }
                    var P = ay.Multiply(impulse);
                    var LA = impulse * sAy;
                    var LB = impulse * sBy;
                    cA = cA.Subtract(P.Multiply(this.m_invMassA));
                    aA -= this.m_invIA * LA;
                    cB = cB.Add(P.Multiply(this.m_invMassB));
                    aB += this.m_invIB * LB;
                    data.positions[this.m_indexA].c = cA;
                    data.positions[this.m_indexA].a = aA;
                    data.positions[this.m_indexB].c = cB;
                    data.positions[this.m_indexB].a = aB;
                    return Math.abs(C) <= PhysicsType2d.Settings.linearSlop;
                };
                return WheelJoint;
            })(PhysicsType2d.Dynamics.Joints.Joint);
            Joints.WheelJoint = WheelJoint;
        })(Dynamics.Joints || (Dynamics.Joints = {}));
        var Joints = Dynamics.Joints;
    })(PhysicsType2d.Dynamics || (PhysicsType2d.Dynamics = {}));
    var Dynamics = PhysicsType2d.Dynamics;
})(PhysicsType2d || (PhysicsType2d = {}));
// Testing file
/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference types="pixi.js"/>
var renderer = PIXI.autoDetectRenderer(512, 512);
var image = "./images/OrangeBox.png";
document.body.appendChild(renderer.view);
main(5);
function main(speed) {
    var MainScene = new Scene();
    var Hero = new Actor(MainScene, image, 50, 50);
    MainScene.addActor(Hero);
    Hero.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, 0, 0);
    Hero.setVelocity(speed, 0);
    requestAnimationFrame(function () { return gameLoop(MainScene); });
}
function gameLoop(MainScene) {
    MainScene.mWorld.Step(1 / 45, 8, 3);
    MainScene.render();
}
var Actor = /** @class */ (function () {
    function Actor(scene, img, width, height) {
        PIXI.loader.add(img);
        this.mScene = scene;
        this.mSprite = new PIXI.Sprite(PIXI.loader.resources[img].texture);
        this.mSize = new PhysicsType2d.Vector2(width, height);
        this.mContainer = new PIXI.Container();
        this.mContainer.addChild(this.mSprite);
        this.mSprite.width = this.mSize.x;
        this.mSprite.height = this.mSize.y;
        this.mSprite.anchor.x = 0.5;
        this.mSprite.anchor.y = 0.5;
    }
    Actor.prototype.setBoxPhysics = function (type, x, y) {
        var shape = new PhysicsType2d.Collision.Shapes.PolygonShape();
        shape.SetAsBoxAtOrigin(this.mSize.x / 2, this.mSize.y / 2);
        var boxBodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
        boxBodyDef.type = type;
        boxBodyDef.position = new PhysicsType2d.Vector2(x + this.mSize.x / 2, y + this.mSize.y / 2);
        this.mBody = this.mScene.mWorld.CreateBody(boxBodyDef);
        var fd = new PhysicsType2d.Dynamics.FixtureDefinition();
        fd.shape = shape;
        fd.density = 0;
        fd.friction = 0;
        fd.restitution = 0;
        this.mBody.CreateFixtureFromDefinition(fd);
        this.mBody.SetUserData(this);
    };
    Actor.prototype.setVelocity = function (x, y) {
        this.mBody.SetLinearVelocity(new PhysicsType2d.Vector2(x, y));
    };
    Actor.prototype.render = function () {
        this.mSprite.position.x = this.mBody.GetWorldCenter().x;
        this.mSprite.position.y = this.mBody.GetWorldCenter().y;
        renderer.render(this.mContainer);
    };
    return Actor;
}());
var Scene = /** @class */ (function () {
    function Scene() {
        this.mWorld = new PhysicsType2d.Dynamics.World(new PhysicsType2d.Vector2(0, 0));
    }
    Scene.prototype.addActor = function (actor) {
        this.mRenderables.push(actor);
    };
    Scene.prototype.render = function () {
        this.mRenderables.forEach(function (e) {
            e.render();
        });
    };
    return Scene;
}());
