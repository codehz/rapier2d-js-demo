class Emitter {
    #handlers = {
    };
    emit(event, value) {
        this.#handlers[event]?.forEach((h)=>h(value)
        );
    }
    on(event, handler) {
        const set = this.#handlers[event];
        if (set != null) {
            set.add(handler);
        } else {
            this.#handlers[event] = new Set([
                handler
            ]);
        }
    }
    off(event, handler) {
        this.#handlers[event]?.delete(handler);
    }
}
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", {
    alpha: false,
    desynchronized: true,
    colorSpace: "srgb",
    willReadFrequently: false
});
class Camera extends Emitter {
    #origin = {
        x: 0,
        y: 0
    };
    #size = 30;
    #matrix = new DOMMatrix();
    get origin() {
        return this.#origin;
    }
    set origin(value) {
        this.#origin = value;
        this.#recalc();
    }
    get size() {
        return this.#size;
    }
    set size(value) {
        this.#size = value;
        this.#recalc();
    }
     #recalc() {
        const scale = Math.min(canvas.width, canvas.height) / this.#size;
        const matrix = new DOMMatrix();
        matrix.translateSelf(canvas.width / 2, canvas.height / 2);
        matrix.scaleSelf(scale, scale);
        matrix.translateSelf(-this.#origin.x, -this.#origin.y);
        this.#matrix = matrix;
    }
    #fit = ()=>{
        canvas.width = canvas.clientWidth * devicePixelRatio;
        canvas.height = canvas.clientHeight * devicePixelRatio;
        this.#recalc();
    };
    #click = ({ x , y: y1  })=>{
        const pos = this.#matrix.inverse().transformPoint({
            x: x * devicePixelRatio,
            y: y1 * devicePixelRatio
        });
        this.emit("click", pos);
    };
    apply() {
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(this.#matrix);
    }
    start() {
        window.addEventListener("resize", this.#fit);
        this.#fit();
        canvas.addEventListener("click", this.#click);
    }
    stop() {
        window.removeEventListener("resize", this.#fit);
    }
}
var __global$ = globalThis || (typeof window !== "undefined" ? window : self);
var B, N = new Array(32).fill(void 0);
function K(g) {
    return N[g];
}
N.push(void 0, null, !0, !1);
var u = N.length;
function rA(g) {
    let A = K(g);
    return (function(I) {
        I < 36 || (N[I] = u, u = I);
    })(g), A;
}
function J(g) {
    u === N.length && N.push(N.length + 1);
    let A = u;
    return u = N[A], N[A] = g, A;
}
var eA = new TextDecoder("utf-8", {
    ignoreBOM: !0,
    fatal: !0
});
eA.decode();
var IA = null;
function gA() {
    return IA !== null && IA.buffer === B.memory.buffer || (IA = new Uint8Array(B.memory.buffer)), IA;
}
function CA(g, A) {
    return eA.decode(gA().subarray(g, g + A));
}
function dA(g) {
    return g == null;
}
var BA = null, QA = null;
function y() {
    return QA !== null && QA.buffer === B.memory.buffer || (QA = new Int32Array(B.memory.buffer)), QA;
}
function yA(g) {
    let A = typeof g;
    if (A == "number" || A == "boolean" || g == null) return `${g}`;
    if (A == "string") return `"${g}"`;
    if (A == "symbol") {
        let Q = g.description;
        return Q == null ? "Symbol" : `Symbol(${Q})`;
    }
    if (A == "function") {
        let Q = g.name;
        return typeof Q == "string" && Q.length > 0 ? `Function(${Q})` : "Function";
    }
    if (Array.isArray(g)) {
        let Q = g.length, E = "[";
        Q > 0 && (E += yA(g[0]));
        for(let i = 1; i < Q; i++)E += ", " + yA(g[i]);
        return E += "]", E;
    }
    let I = /\[object ([^\]]+)\]/.exec(toString.call(g)), C;
    if (!(I.length > 1)) return toString.call(g);
    if (C = I[1], C == "Object") try {
        return "Object(" + JSON.stringify(g) + ")";
    } catch  {
        return "Object";
    }
    return g instanceof Error ? `${g.name}: ${g.message}
${g.stack}` : C;
}
var s = 0, EA = new TextEncoder("utf-8"), cI = typeof EA.encodeInto == "function" ? function(g, A) {
    return EA.encodeInto(g, A);
} : function(g, A) {
    let I = EA.encode(g);
    return A.set(I), {
        read: g.length,
        written: I.length
    };
}, L = 32;
function r(g) {
    if (L == 1) throw new Error("out of js stack");
    return N[--L] = g, L;
}
function o(g, A) {
    if (!(g instanceof A)) throw new Error(`expected instance of ${A.name}`);
    return g.ptr;
}
var iA = null;
function v() {
    return iA !== null && iA.buffer === B.memory.buffer || (iA = new Float32Array(B.memory.buffer)), iA;
}
function fA(g, A) {
    return v().subarray(g / 4, g / 4 + A);
}
var oA = null;
function TA() {
    return oA !== null && oA.buffer === B.memory.buffer || (oA = new Uint32Array(B.memory.buffer)), oA;
}
function X(g, A) {
    let I = A(4 * g.length);
    return v().set(g, I / 4), s = g.length, I;
}
function bA(g, A) {
    let I = A(4 * g.length);
    return TA().set(g, I / 4), s = g.length, I;
}
function f(g, A) {
    try {
        return g.apply(this, A);
    } catch (I) {
        B.__wbindgen_exn_store(J(I));
    }
}
Object.freeze({
    Ball: 0,
    0: "Ball",
    Fixed: 1,
    1: "Fixed",
    Prismatic: 2,
    2: "Prismatic",
    Revolute: 3,
    3: "Revolute"
}), Object.freeze({
    Disabled: 0,
    0: "Disabled",
    VelocityBased: 1,
    1: "VelocityBased",
    AccelerationBased: 2,
    2: "AccelerationBased",
    ForceBased: 3,
    3: "ForceBased"
}), Object.freeze({
    Dynamic: 0,
    0: "Dynamic",
    Static: 1,
    1: "Static",
    KinematicPositionBased: 2,
    2: "KinematicPositionBased",
    KinematicVelocityBased: 3,
    3: "KinematicVelocityBased"
}), Object.freeze({
    Ball: 0,
    0: "Ball",
    Cuboid: 1,
    1: "Cuboid",
    Capsule: 2,
    2: "Capsule",
    Segment: 3,
    3: "Segment",
    Polyline: 4,
    4: "Polyline",
    Triangle: 5,
    5: "Triangle",
    TriMesh: 6,
    6: "TriMesh",
    HeightField: 7,
    7: "HeightField",
    Compound: 8,
    8: "Compound",
    ConvexPolygon: 9,
    9: "ConvexPolygon",
    RoundCuboid: 10,
    10: "RoundCuboid",
    RoundTriangle: 11,
    11: "RoundTriangle",
    RoundConvexPolygon: 12,
    12: "RoundConvexPolygon"
});
var T = class {
    static __wrap(A) {
        let I = Object.create(T.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawbroadphase_free(A);
    }
    constructor(){
        var A = B.rawbroadphase_new();
        return T.__wrap(A);
    }
}, O = class {
    static __wrap(A) {
        let I = Object.create(O.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawccdsolver_free(A);
    }
    constructor(){
        var A = B.rawccdsolver_new();
        return O.__wrap(A);
    }
}, R = class {
    static __wrap(A) {
        let I = Object.create(R.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawcolliderset_free(A);
    }
    coTranslation(A) {
        var I = B.rawcolliderset_coTranslation(this.ptr, A);
        return G.__wrap(I);
    }
    coRotation(A) {
        var I = B.rawcolliderset_coRotation(this.ptr, A);
        return M.__wrap(I);
    }
    coSetTranslation(A, I, C) {
        B.rawcolliderset_coSetTranslation(this.ptr, A, I, C);
    }
    coSetTranslationWrtParent(A, I, C) {
        B.rawcolliderset_coSetTranslationWrtParent(this.ptr, A, I, C);
    }
    coSetRotation(A, I) {
        B.rawcolliderset_coSetRotation(this.ptr, A, I);
    }
    coSetRotationWrtParent(A, I) {
        B.rawcolliderset_coSetRotationWrtParent(this.ptr, A, I);
    }
    coIsSensor(A) {
        return B.rawcolliderset_coIsSensor(this.ptr, A) !== 0;
    }
    coShapeType(A) {
        return B.rawcolliderset_coShapeType(this.ptr, A) >>> 0;
    }
    coHalfExtents(A) {
        var I = B.rawcolliderset_coHalfExtents(this.ptr, A);
        return I === 0 ? void 0 : G.__wrap(I);
    }
    coRadius(A) {
        try {
            let Q = B.__wbindgen_add_to_stack_pointer(-16);
            B.rawcolliderset_coRadius(Q, this.ptr, A);
            var I = y()[Q / 4 + 0], C = v()[Q / 4 + 1];
            return I === 0 ? void 0 : C;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    coHalfHeight(A) {
        try {
            let Q = B.__wbindgen_add_to_stack_pointer(-16);
            B.rawcolliderset_coHalfHeight(Q, this.ptr, A);
            var I = y()[Q / 4 + 0], C = v()[Q / 4 + 1];
            return I === 0 ? void 0 : C;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    coRoundRadius(A) {
        try {
            let Q = B.__wbindgen_add_to_stack_pointer(-16);
            B.rawcolliderset_coRoundRadius(Q, this.ptr, A);
            var I = y()[Q / 4 + 0], C = v()[Q / 4 + 1];
            return I === 0 ? void 0 : C;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    coVertices(A) {
        try {
            let Q = B.__wbindgen_add_to_stack_pointer(-16);
            B.rawcolliderset_coVertices(Q, this.ptr, A);
            var I = y()[Q / 4 + 0], C = y()[Q / 4 + 1];
            let E;
            return I !== 0 && (E = fA(I, C).slice(), B.__wbindgen_free(I, 4 * C)), E;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    coIndices(A) {
        try {
            let Q = B.__wbindgen_add_to_stack_pointer(-16);
            B.rawcolliderset_coIndices(Q, this.ptr, A);
            var I = y()[Q / 4 + 0], C = y()[Q / 4 + 1];
            let E;
            return I !== 0 && (E = (function(i, D) {
                return TA().subarray(i / 4, i / 4 + D);
            })(I, C).slice(), B.__wbindgen_free(I, 4 * C)), E;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    coHeightfieldHeights(A) {
        try {
            let Q = B.__wbindgen_add_to_stack_pointer(-16);
            B.rawcolliderset_coHeightfieldHeights(Q, this.ptr, A);
            var I = y()[Q / 4 + 0], C = y()[Q / 4 + 1];
            let E;
            return I !== 0 && (E = fA(I, C).slice(), B.__wbindgen_free(I, 4 * C)), E;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    coHeightfieldScale(A) {
        var I = B.rawcolliderset_coHeightfieldScale(this.ptr, A);
        return I === 0 ? void 0 : G.__wrap(I);
    }
    coParent(A) {
        return B.rawcolliderset_coParent(this.ptr, A) >>> 0;
    }
    coFriction(A) {
        return B.rawcolliderset_coFriction(this.ptr, A);
    }
    coDensity(A) {
        try {
            let Q = B.__wbindgen_add_to_stack_pointer(-16);
            B.rawcolliderset_coDensity(Q, this.ptr, A);
            var I = y()[Q / 4 + 0], C = v()[Q / 4 + 1];
            return I === 0 ? void 0 : C;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    coCollisionGroups(A) {
        return B.rawcolliderset_coCollisionGroups(this.ptr, A) >>> 0;
    }
    coSolverGroups(A) {
        return B.rawcolliderset_coSolverGroups(this.ptr, A) >>> 0;
    }
    coActiveHooks(A) {
        return B.rawcolliderset_coActiveHooks(this.ptr, A) >>> 0;
    }
    coActiveCollisionTypes(A) {
        return B.rawcolliderset_coActiveCollisionTypes(this.ptr, A);
    }
    coActiveEvents(A) {
        return B.rawcolliderset_coActiveEvents(this.ptr, A) >>> 0;
    }
    coSetSensor(A, I) {
        B.rawcolliderset_coSetSensor(this.ptr, A, I);
    }
    coSetRestitution(A, I) {
        B.rawcolliderset_coSetRestitution(this.ptr, A, I);
    }
    coSetFriction(A, I) {
        B.rawcolliderset_coSetFriction(this.ptr, A, I);
    }
    coFrictionCombineRule(A) {
        return B.rawcolliderset_coFrictionCombineRule(this.ptr, A) >>> 0;
    }
    coSetFrictionCombineRule(A, I) {
        B.rawcolliderset_coSetFrictionCombineRule(this.ptr, A, I);
    }
    coRestitutionCombineRule(A) {
        return B.rawcolliderset_coRestitutionCombineRule(this.ptr, A) >>> 0;
    }
    coSetRestitutionCombineRule(A, I) {
        B.rawcolliderset_coSetRestitutionCombineRule(this.ptr, A, I);
    }
    coSetCollisionGroups(A, I) {
        B.rawcolliderset_coSetCollisionGroups(this.ptr, A, I);
    }
    coSetSolverGroups(A, I) {
        B.rawcolliderset_coSetSolverGroups(this.ptr, A, I);
    }
    coSetActiveHooks(A, I) {
        B.rawcolliderset_coSetActiveHooks(this.ptr, A, I);
    }
    coSetActiveEvents(A, I) {
        B.rawcolliderset_coSetActiveEvents(this.ptr, A, I);
    }
    coSetActiveCollisionTypes(A, I) {
        B.rawcolliderset_coSetActiveCollisionTypes(this.ptr, A, I);
    }
    coSetShape(A, I) {
        o(I, F);
        var C = I.ptr;
        I.ptr = 0, B.rawcolliderset_coSetShape(this.ptr, A, C);
    }
    constructor(){
        var A = B.rawcolliderset_new();
        return R.__wrap(A);
    }
    len() {
        return B.rawcolliderset_len(this.ptr) >>> 0;
    }
    contains(A) {
        return B.rawcolliderset_contains(this.ptr, A) !== 0;
    }
    createCollider(A, I, C, Q, E, i, D, k, S, h, a, U, x, q, Y, W, NI, yI, RI, MI, nA) {
        try {
            let NA = B.__wbindgen_add_to_stack_pointer(-16);
            o(A, F), o(I, G), o(C, M), o(i, G), o(nA, c), B.rawcolliderset_createCollider(NA, this.ptr, A.ptr, I.ptr, C.ptr, Q, E, i.ptr, D, k, S, h, a, U, x, q, Y, W, NI, yI, RI, MI, nA.ptr);
            var qI = y()[NA / 4 + 0], sI = y()[NA / 4 + 1];
            return qI === 0 ? void 0 : sI >>> 0;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    remove(A, I, C, Q) {
        o(I, t), o(C, c), B.rawcolliderset_remove(this.ptr, A, I.ptr, C.ptr, Q);
    }
    isHandleValid(A) {
        return B.rawcolliderset_contains(this.ptr, A) !== 0;
    }
    forEachColliderHandle(A) {
        try {
            B.rawcolliderset_forEachColliderHandle(this.ptr, r(A));
        } finally{
            N[L++] = void 0;
        }
    }
}, DA = class {
    static __wrap(A) {
        let I = Object.create(DA.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawcontactmanifold_free(A);
    }
    normal() {
        var A = B.rawcontactmanifold_normal(this.ptr);
        return G.__wrap(A);
    }
    local_n1() {
        var A = B.rawcontactmanifold_local_n1(this.ptr);
        return G.__wrap(A);
    }
    local_n2() {
        var A = B.rawcontactmanifold_local_n1(this.ptr);
        return G.__wrap(A);
    }
    subshape1() {
        return B.rawcontactmanifold_subshape1(this.ptr) >>> 0;
    }
    subshape2() {
        return B.rawcontactmanifold_subshape1(this.ptr) >>> 0;
    }
    num_contacts() {
        return B.rawcontactmanifold_num_contacts(this.ptr) >>> 0;
    }
    contact_local_p1(A) {
        var I = B.rawcontactmanifold_contact_local_p1(this.ptr, A);
        return I === 0 ? void 0 : G.__wrap(I);
    }
    contact_local_p2(A) {
        var I = B.rawcontactmanifold_contact_local_p1(this.ptr, A);
        return I === 0 ? void 0 : G.__wrap(I);
    }
    contact_dist(A) {
        return B.rawcontactmanifold_contact_dist(this.ptr, A);
    }
    contact_fid1(A) {
        return B.rawcontactmanifold_contact_fid1(this.ptr, A) >>> 0;
    }
    contact_fid2(A) {
        return B.rawcontactmanifold_contact_fid2(this.ptr, A) >>> 0;
    }
    contact_impulse(A) {
        return B.rawcontactmanifold_contact_impulse(this.ptr, A);
    }
    contact_tangent_impulse(A) {
        return B.rawcontactmanifold_contact_tangent_impulse(this.ptr, A);
    }
    num_solver_contacts() {
        return B.rawcontactmanifold_num_solver_contacts(this.ptr) >>> 0;
    }
    solver_contact_point(A) {
        var I = B.rawcontactmanifold_solver_contact_point(this.ptr, A);
        return I === 0 ? void 0 : G.__wrap(I);
    }
    solver_contact_dist(A) {
        return B.rawcontactmanifold_solver_contact_dist(this.ptr, A);
    }
    solver_contact_friction(A) {
        return B.rawcontactmanifold_solver_contact_friction(this.ptr, A);
    }
    solver_contact_restitution(A) {
        return B.rawcontactmanifold_solver_contact_restitution(this.ptr, A);
    }
    solver_contact_tangent_velocity(A) {
        var I = B.rawcontactmanifold_solver_contact_tangent_velocity(this.ptr, A);
        return G.__wrap(I);
    }
}, GA = class {
    static __wrap(A) {
        let I = Object.create(GA.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawcontactpair_free(A);
    }
    collider1() {
        return B.rawcontactpair_collider1(this.ptr) >>> 0;
    }
    collider2() {
        return B.rawcontactpair_collider2(this.ptr) >>> 0;
    }
    numContactManifolds() {
        return B.rawcontactpair_numContactManifolds(this.ptr) >>> 0;
    }
    contactManifold(A) {
        var I = B.rawcontactpair_contactManifold(this.ptr, A);
        return I === 0 ? void 0 : DA.__wrap(I);
    }
}, wA = class {
    static __wrap(A) {
        let I = Object.create(wA.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawdeserializedworld_free(A);
    }
    takeGravity() {
        var A = B.rawdeserializedworld_takeGravity(this.ptr);
        return A === 0 ? void 0 : G.__wrap(A);
    }
    takeIntegrationParameters() {
        var A = B.rawdeserializedworld_takeIntegrationParameters(this.ptr);
        return A === 0 ? void 0 : b.__wrap(A);
    }
    takeIslandManager() {
        var A = B.rawdeserializedworld_takeIslandManager(this.ptr);
        return A === 0 ? void 0 : t.__wrap(A);
    }
    takeBroadPhase() {
        var A = B.rawdeserializedworld_takeBroadPhase(this.ptr);
        return A === 0 ? void 0 : T.__wrap(A);
    }
    takeNarrowPhase() {
        var A = B.rawdeserializedworld_takeNarrowPhase(this.ptr);
        return A === 0 ? void 0 : Z.__wrap(A);
    }
    takeBodies() {
        var A = B.rawdeserializedworld_takeBodies(this.ptr);
        return A === 0 ? void 0 : c.__wrap(A);
    }
    takeColliders() {
        var A = B.rawdeserializedworld_takeColliders(this.ptr);
        return A === 0 ? void 0 : R.__wrap(A);
    }
    takeJoints() {
        var A = B.rawdeserializedworld_takeJoints(this.ptr);
        return A === 0 ? void 0 : d.__wrap(A);
    }
}, V = class {
    static __wrap(A) {
        let I = Object.create(V.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_raweventqueue_free(A);
    }
    constructor(A){
        var I = B.raweventqueue_new(A);
        return V.__wrap(I);
    }
    drainContactEvents(A) {
        try {
            B.raweventqueue_drainContactEvents(this.ptr, r(A));
        } finally{
            N[L++] = void 0;
        }
    }
    drainIntersectionEvents(A) {
        try {
            B.raweventqueue_drainIntersectionEvents(this.ptr, r(A));
        } finally{
            N[L++] = void 0;
        }
    }
    clear() {
        B.raweventqueue_clear(this.ptr);
    }
}, b = class {
    static __wrap(A) {
        let I = Object.create(b.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawintegrationparameters_free(A);
    }
    constructor(){
        var A = B.rawintegrationparameters_new();
        return b.__wrap(A);
    }
    get dt() {
        return B.rawintegrationparameters_dt(this.ptr);
    }
    get erp() {
        return B.rawintegrationparameters_erp(this.ptr);
    }
    get jointErp() {
        return B.rawintegrationparameters_jointErp(this.ptr);
    }
    get warmstartCoeff() {
        return B.rawintegrationparameters_warmstartCoeff(this.ptr);
    }
    get allowedLinearError() {
        return B.rawintegrationparameters_allowedLinearError(this.ptr);
    }
    get predictionDistance() {
        return B.rawintegrationparameters_predictionDistance(this.ptr);
    }
    get allowedAngularError() {
        return B.rawintegrationparameters_allowedAngularError(this.ptr);
    }
    get maxLinearCorrection() {
        return B.rawintegrationparameters_maxLinearCorrection(this.ptr);
    }
    get maxAngularCorrection() {
        return B.rawintegrationparameters_maxAngularCorrection(this.ptr);
    }
    get maxVelocityIterations() {
        return B.rawintegrationparameters_maxVelocityIterations(this.ptr) >>> 0;
    }
    get maxPositionIterations() {
        return B.rawintegrationparameters_maxPositionIterations(this.ptr) >>> 0;
    }
    get minIslandSize() {
        return B.rawintegrationparameters_minIslandSize(this.ptr) >>> 0;
    }
    get maxCcdSubsteps() {
        return B.rawintegrationparameters_maxCcdSubsteps(this.ptr) >>> 0;
    }
    set dt(A) {
        B.rawintegrationparameters_set_dt(this.ptr, A);
    }
    set erp(A) {
        B.rawintegrationparameters_set_erp(this.ptr, A);
    }
    set jointErp(A) {
        B.rawintegrationparameters_set_jointErp(this.ptr, A);
    }
    set warmstartCoeff(A) {
        B.rawintegrationparameters_set_warmstartCoeff(this.ptr, A);
    }
    set allowedLinearError(A) {
        B.rawintegrationparameters_set_allowedLinearError(this.ptr, A);
    }
    set predictionDistance(A) {
        B.rawintegrationparameters_set_predictionDistance(this.ptr, A);
    }
    set allowedAngularError(A) {
        B.rawintegrationparameters_set_allowedAngularError(this.ptr, A);
    }
    set maxLinearCorrection(A) {
        B.rawintegrationparameters_set_maxLinearCorrection(this.ptr, A);
    }
    set maxAngularCorrection(A) {
        B.rawintegrationparameters_set_maxAngularCorrection(this.ptr, A);
    }
    set maxVelocityIterations(A) {
        B.rawintegrationparameters_set_maxVelocityIterations(this.ptr, A);
    }
    set maxPositionIterations(A) {
        B.rawintegrationparameters_set_maxPositionIterations(this.ptr, A);
    }
    set minIslandSize(A) {
        B.rawintegrationparameters_set_minIslandSize(this.ptr, A);
    }
    set maxCcdSubsteps(A) {
        B.rawintegrationparameters_set_maxCcdSubsteps(this.ptr, A);
    }
}, t = class {
    static __wrap(A) {
        let I = Object.create(t.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawislandmanager_free(A);
    }
    constructor(){
        var A = B.rawislandmanager_new();
        return t.__wrap(A);
    }
    forEachActiveRigidBodyHandle(A) {
        try {
            B.rawislandmanager_forEachActiveRigidBodyHandle(this.ptr, r(A));
        } finally{
            N[L++] = void 0;
        }
    }
}, e = class {
    static __wrap(A) {
        let I = Object.create(e.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawjointparams_free(A);
    }
    static ball(A, I) {
        o(A, G), o(I, G);
        var C = B.rawjointparams_ball(A.ptr, I.ptr);
        return e.__wrap(C);
    }
    static prismatic(A, I, C, Q, E, i, D) {
        o(A, G), o(I, G), o(C, G), o(Q, G);
        var k = B.rawjointparams_prismatic(A.ptr, I.ptr, C.ptr, Q.ptr, E, i, D);
        return k === 0 ? void 0 : e.__wrap(k);
    }
    static fixed(A, I, C, Q) {
        o(A, G), o(I, M), o(C, G), o(Q, M);
        var E = B.rawjointparams_fixed(A.ptr, I.ptr, C.ptr, Q.ptr);
        return e.__wrap(E);
    }
}, d = class {
    static __wrap(A) {
        let I = Object.create(d.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawjointset_free(A);
    }
    jointBodyHandle1(A) {
        return B.rawjointset_jointBodyHandle1(this.ptr, A) >>> 0;
    }
    jointBodyHandle2(A) {
        return B.rawjointset_jointBodyHandle2(this.ptr, A) >>> 0;
    }
    jointType(A) {
        return B.rawjointset_jointType(this.ptr, A) >>> 0;
    }
    jointAnchor1(A) {
        var I = B.rawjointset_jointAnchor1(this.ptr, A);
        return G.__wrap(I);
    }
    jointAnchor2(A) {
        var I = B.rawjointset_jointAnchor2(this.ptr, A);
        return G.__wrap(I);
    }
    jointAxis1(A) {
        var I = B.rawjointset_jointAxis1(this.ptr, A);
        return I === 0 ? void 0 : G.__wrap(I);
    }
    jointAxis2(A) {
        var I = B.rawjointset_jointAxis2(this.ptr, A);
        return I === 0 ? void 0 : G.__wrap(I);
    }
    jointLimitsEnabled(A) {
        return B.rawjointset_jointLimitsEnabled(this.ptr, A) !== 0;
    }
    jointLimitsMin(A) {
        return B.rawjointset_jointLimitsMin(this.ptr, A);
    }
    jointLimitsMax(A) {
        return B.rawjointset_jointLimitsMax(this.ptr, A);
    }
    jointConfigureMotorModel(A, I) {
        B.rawjointset_jointConfigureMotorModel(this.ptr, A, I);
    }
    jointConfigureUnitMotorVelocity(A, I, C) {
        B.rawjointset_jointConfigureUnitMotorVelocity(this.ptr, A, I, C);
    }
    jointConfigureUnitMotorPosition(A, I, C, Q) {
        B.rawjointset_jointConfigureUnitMotorPosition(this.ptr, A, I, C, Q);
    }
    jointConfigureUnitMotor(A, I, C, Q, E) {
        B.rawjointset_jointConfigureUnitMotor(this.ptr, A, I, C, Q, E);
    }
    constructor(){
        var A = B.rawjointset_new();
        return d.__wrap(A);
    }
    createJoint(A, I, C, Q) {
        return o(A, c), o(I, e), B.rawjointset_createJoint(this.ptr, A.ptr, I.ptr, C, Q) >>> 0;
    }
    remove(A, I, C, Q) {
        o(I, t), o(C, c), B.rawjointset_remove(this.ptr, A, I.ptr, C.ptr, Q);
    }
    len() {
        return B.rawjointset_len(this.ptr) >>> 0;
    }
    contains(A) {
        return B.rawjointset_contains(this.ptr, A) !== 0;
    }
    forEachJointHandle(A) {
        try {
            B.rawjointset_forEachJointHandle(this.ptr, r(A));
        } finally{
            N[L++] = void 0;
        }
    }
}, Z = class {
    static __wrap(A) {
        let I = Object.create(Z.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawnarrowphase_free(A);
    }
    constructor(){
        var A = B.rawnarrowphase_new();
        return Z.__wrap(A);
    }
    contacts_with(A, I) {
        B.rawnarrowphase_contacts_with(this.ptr, A, J(I));
    }
    contact_pair(A, I) {
        var C = B.rawnarrowphase_contact_pair(this.ptr, A, I);
        return C === 0 ? void 0 : GA.__wrap(C);
    }
    intersections_with(A, I) {
        B.rawnarrowphase_intersections_with(this.ptr, A, J(I));
    }
    intersection_pair(A, I) {
        return B.rawnarrowphase_intersection_pair(this.ptr, A, I) !== 0;
    }
}, P = class {
    static __wrap(A) {
        let I = Object.create(P.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawphysicspipeline_free(A);
    }
    constructor(){
        var A = B.rawphysicspipeline_new();
        return P.__wrap(A);
    }
    step(A, I, C, Q, E, i, D, k, S) {
        o(A, G), o(I, b), o(C, t), o(Q, T), o(E, Z), o(i, c), o(D, R), o(k, d), o(S, O), B.rawphysicspipeline_step(this.ptr, A.ptr, I.ptr, C.ptr, Q.ptr, E.ptr, i.ptr, D.ptr, k.ptr, S.ptr);
    }
    stepWithEvents(A, I, C, Q, E, i, D, k, S, h, a, U, x) {
        o(A, G), o(I, b), o(C, t), o(Q, T), o(E, Z), o(i, c), o(D, R), o(k, d), o(S, O), o(h, V), B.rawphysicspipeline_stepWithEvents(this.ptr, A.ptr, I.ptr, C.ptr, Q.ptr, E.ptr, i.ptr, D.ptr, k.ptr, S.ptr, h.ptr, J(a), J(U), J(x));
    }
}, kA = class {
    static __wrap(A) {
        let I = Object.create(kA.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawpointcolliderprojection_free(A);
    }
    colliderHandle() {
        return B.rawpointcolliderprojection_colliderHandle(this.ptr) >>> 0;
    }
    point() {
        var A = B.rawpointcolliderprojection_point(this.ptr);
        return G.__wrap(A);
    }
    isInside() {
        return B.rawpointcolliderprojection_isInside(this.ptr) !== 0;
    }
}, z = class {
    static __wrap(A) {
        let I = Object.create(z.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawquerypipeline_free(A);
    }
    constructor(){
        var A = B.rawquerypipeline_new();
        return z.__wrap(A);
    }
    update(A, I, C) {
        o(A, t), o(I, c), o(C, R), B.rawquerypipeline_update(this.ptr, A.ptr, I.ptr, C.ptr);
    }
    castRay(A, I, C, Q, E, i) {
        o(A, R), o(I, G), o(C, G);
        var D = B.rawquerypipeline_castRay(this.ptr, A.ptr, I.ptr, C.ptr, Q, E, i);
        return D === 0 ? void 0 : hA.__wrap(D);
    }
    castRayAndGetNormal(A, I, C, Q, E, i) {
        o(A, R), o(I, G), o(C, G);
        var D = B.rawquerypipeline_castRayAndGetNormal(this.ptr, A.ptr, I.ptr, C.ptr, Q, E, i);
        return D === 0 ? void 0 : _.__wrap(D);
    }
    intersectionsWithRay(A, I, C, Q, E, i, D) {
        try {
            o(A, R), o(I, G), o(C, G), B.rawquerypipeline_intersectionsWithRay(this.ptr, A.ptr, I.ptr, C.ptr, Q, E, i, r(D));
        } finally{
            N[L++] = void 0;
        }
    }
    intersectionWithShape(A, I, C, Q, E) {
        try {
            let k = B.__wbindgen_add_to_stack_pointer(-16);
            o(A, R), o(I, G), o(C, M), o(Q, F), B.rawquerypipeline_intersectionWithShape(k, this.ptr, A.ptr, I.ptr, C.ptr, Q.ptr, E);
            var i = y()[k / 4 + 0], D = y()[k / 4 + 1];
            return i === 0 ? void 0 : D >>> 0;
        } finally{
            B.__wbindgen_add_to_stack_pointer(16);
        }
    }
    projectPoint(A, I, C, Q) {
        o(A, R), o(I, G);
        var E = B.rawquerypipeline_projectPoint(this.ptr, A.ptr, I.ptr, C, Q);
        return E === 0 ? void 0 : kA.__wrap(E);
    }
    intersectionsWithPoint(A, I, C, Q) {
        try {
            o(A, R), o(I, G), B.rawquerypipeline_intersectionsWithPoint(this.ptr, A.ptr, I.ptr, C, r(Q));
        } finally{
            N[L++] = void 0;
        }
    }
    castShape(A, I, C, Q, E, i, D) {
        o(A, R), o(I, G), o(C, M), o(Q, G), o(E, F);
        var k = B.rawquerypipeline_castShape(this.ptr, A.ptr, I.ptr, C.ptr, Q.ptr, E.ptr, i, D);
        return k === 0 ? void 0 : SA.__wrap(k);
    }
    intersectionsWithShape(A, I, C, Q, E, i) {
        try {
            o(A, R), o(I, G), o(C, M), o(Q, F), B.rawquerypipeline_intersectionsWithShape(this.ptr, A.ptr, I.ptr, C.ptr, Q.ptr, E, r(i));
        } finally{
            N[L++] = void 0;
        }
    }
    collidersWithAabbIntersectingAabb(A, I, C) {
        try {
            o(A, G);
            var Q = A.ptr;
            A.ptr = 0, o(I, G);
            var E = I.ptr;
            I.ptr = 0, B.rawquerypipeline_collidersWithAabbIntersectingAabb(this.ptr, Q, E, r(C));
        } finally{
            N[L++] = void 0;
        }
    }
}, _ = class {
    static __wrap(A) {
        let I = Object.create(_.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawraycolliderintersection_free(A);
    }
    colliderHandle() {
        return B.rawpointcolliderprojection_colliderHandle(this.ptr) >>> 0;
    }
    normal() {
        var A = B.rawraycolliderintersection_normal(this.ptr);
        return G.__wrap(A);
    }
    toi() {
        return B.rawraycolliderintersection_toi(this.ptr);
    }
}, hA = class {
    static __wrap(A) {
        let I = Object.create(hA.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawraycollidertoi_free(A);
    }
    colliderHandle() {
        return B.rawpointcolliderprojection_colliderHandle(this.ptr) >>> 0;
    }
    toi() {
        return B.rawraycolliderintersection_toi(this.ptr);
    }
}, c = class {
    static __wrap(A) {
        let I = Object.create(c.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawrigidbodyset_free(A);
    }
    rbTranslation(A) {
        var I = B.rawrigidbodyset_rbTranslation(this.ptr, A);
        return G.__wrap(I);
    }
    rbRotation(A) {
        var I = B.rawrigidbodyset_rbRotation(this.ptr, A);
        return M.__wrap(I);
    }
    rbSleep(A) {
        B.rawrigidbodyset_rbSleep(this.ptr, A);
    }
    rbIsSleeping(A) {
        return B.rawrigidbodyset_rbIsSleeping(this.ptr, A) !== 0;
    }
    rbIsMoving(A) {
        return B.rawrigidbodyset_rbIsMoving(this.ptr, A) !== 0;
    }
    rbNextTranslation(A) {
        var I = B.rawrigidbodyset_rbNextTranslation(this.ptr, A);
        return G.__wrap(I);
    }
    rbNextRotation(A) {
        var I = B.rawrigidbodyset_rbNextRotation(this.ptr, A);
        return M.__wrap(I);
    }
    rbSetTranslation(A, I, C, Q) {
        B.rawrigidbodyset_rbSetTranslation(this.ptr, A, I, C, Q);
    }
    rbSetRotation(A, I, C) {
        B.rawrigidbodyset_rbSetRotation(this.ptr, A, I, C);
    }
    rbSetLinvel(A, I, C) {
        o(I, G), B.rawrigidbodyset_rbSetLinvel(this.ptr, A, I.ptr, C);
    }
    rbSetAngvel(A, I, C) {
        B.rawrigidbodyset_rbSetAngvel(this.ptr, A, I, C);
    }
    rbSetNextKinematicTranslation(A, I, C) {
        B.rawrigidbodyset_rbSetNextKinematicTranslation(this.ptr, A, I, C);
    }
    rbSetNextKinematicRotation(A, I) {
        B.rawrigidbodyset_rbSetNextKinematicRotation(this.ptr, A, I);
    }
    rbLinvel(A) {
        var I = B.rawrigidbodyset_rbLinvel(this.ptr, A);
        return G.__wrap(I);
    }
    rbAngvel(A) {
        return B.rawrigidbodyset_rbAngvel(this.ptr, A);
    }
    rbLockTranslations(A, I, C) {
        B.rawrigidbodyset_rbLockRotations(this.ptr, A, I, C);
    }
    rbLockRotations(A, I, C) {
        B.rawrigidbodyset_rbLockRotations(this.ptr, A, I, C);
    }
    rbDominanceGroup(A) {
        return B.rawrigidbodyset_rbDominanceGroup(this.ptr, A);
    }
    rbSetDominanceGroup(A, I) {
        B.rawrigidbodyset_rbSetDominanceGroup(this.ptr, A, I);
    }
    rbEnableCcd(A, I) {
        B.rawrigidbodyset_rbEnableCcd(this.ptr, A, I);
    }
    rbMass(A) {
        return B.rawrigidbodyset_rbMass(this.ptr, A);
    }
    rbWakeUp(A) {
        B.rawrigidbodyset_rbWakeUp(this.ptr, A);
    }
    rbIsCcdEnabled(A) {
        return B.rawrigidbodyset_rbIsCcdEnabled(this.ptr, A) !== 0;
    }
    rbNumColliders(A) {
        return B.rawrigidbodyset_rbNumColliders(this.ptr, A) >>> 0;
    }
    rbCollider(A, I) {
        return B.rawrigidbodyset_rbCollider(this.ptr, A, I) >>> 0;
    }
    rbBodyType(A) {
        return B.rawrigidbodyset_rbBodyType(this.ptr, A) >>> 0;
    }
    rbIsStatic(A) {
        return B.rawrigidbodyset_rbIsStatic(this.ptr, A) !== 0;
    }
    rbIsKinematic(A) {
        return B.rawrigidbodyset_rbIsKinematic(this.ptr, A) !== 0;
    }
    rbIsDynamic(A) {
        return B.rawrigidbodyset_rbIsDynamic(this.ptr, A) !== 0;
    }
    rbLinearDamping(A) {
        return B.rawrigidbodyset_rbLinearDamping(this.ptr, A);
    }
    rbAngularDamping(A) {
        return B.rawrigidbodyset_rbAngularDamping(this.ptr, A);
    }
    rbSetLinearDamping(A, I) {
        B.rawrigidbodyset_rbSetLinearDamping(this.ptr, A, I);
    }
    rbSetAngularDamping(A, I) {
        B.rawrigidbodyset_rbSetAngularDamping(this.ptr, A, I);
    }
    rbGravityScale(A) {
        return B.rawrigidbodyset_rbGravityScale(this.ptr, A);
    }
    rbSetGravityScale(A, I, C) {
        B.rawrigidbodyset_rbSetGravityScale(this.ptr, A, I, C);
    }
    rbApplyForce(A, I, C) {
        o(I, G), B.rawrigidbodyset_rbApplyForce(this.ptr, A, I.ptr, C);
    }
    rbApplyImpulse(A, I, C) {
        o(I, G), B.rawrigidbodyset_rbApplyImpulse(this.ptr, A, I.ptr, C);
    }
    rbApplyTorque(A, I, C) {
        B.rawrigidbodyset_rbApplyTorque(this.ptr, A, I, C);
    }
    rbApplyTorqueImpulse(A, I, C) {
        B.rawrigidbodyset_rbApplyTorqueImpulse(this.ptr, A, I, C);
    }
    rbApplyForceAtPoint(A, I, C, Q) {
        o(I, G), o(C, G), B.rawrigidbodyset_rbApplyForceAtPoint(this.ptr, A, I.ptr, C.ptr, Q);
    }
    rbApplyImpulseAtPoint(A, I, C, Q) {
        o(I, G), o(C, G), B.rawrigidbodyset_rbApplyImpulseAtPoint(this.ptr, A, I.ptr, C.ptr, Q);
    }
    constructor(){
        var A = B.rawrigidbodyset_new();
        return c.__wrap(A);
    }
    createRigidBody(A, I, C, Q, E, i, D, k, S, h, a, U, x, q, Y, W) {
        return o(A, G), o(I, M), o(i, G), o(D, G), B.rawrigidbodyset_createRigidBody(this.ptr, A.ptr, I.ptr, C, Q, E, i.ptr, D.ptr, k, S, h, a, U, x, q, Y, W) >>> 0;
    }
    remove(A, I, C, Q) {
        o(I, t), o(C, R), o(Q, d), B.rawrigidbodyset_remove(this.ptr, A, I.ptr, C.ptr, Q.ptr);
    }
    len() {
        return B.rawrigidbodyset_len(this.ptr) >>> 0;
    }
    contains(A) {
        return B.rawrigidbodyset_contains(this.ptr, A) !== 0;
    }
    forEachRigidBodyHandle(A) {
        try {
            B.rawrigidbodyset_forEachRigidBodyHandle(this.ptr, r(A));
        } finally{
            N[L++] = void 0;
        }
    }
}, M = class {
    static __wrap(A) {
        let I = Object.create(M.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawrotation_free(A);
    }
    static identity() {
        var A = B.rawrotation_identity();
        return M.__wrap(A);
    }
    static fromAngle(A) {
        var I = B.rawrotation_fromAngle(A);
        return M.__wrap(I);
    }
    get im() {
        return B.rawrotation_im(this.ptr);
    }
    get re() {
        return B.rawintegrationparameters_dt(this.ptr);
    }
    get angle() {
        return B.rawrotation_angle(this.ptr);
    }
}, $ = class {
    static __wrap(A) {
        let I = Object.create($.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawserializationpipeline_free(A);
    }
    constructor(){
        var A = B.rawserializationpipeline_new();
        return $.__wrap(A);
    }
    serializeAll(A, I, C, Q, E, i, D, k) {
        return o(A, G), o(I, b), o(C, t), o(Q, T), o(E, Z), o(i, c), o(D, R), o(k, d), rA(B.rawserializationpipeline_serializeAll(this.ptr, A.ptr, I.ptr, C.ptr, Q.ptr, E.ptr, i.ptr, D.ptr, k.ptr));
    }
    deserializeAll(A) {
        var I = B.rawserializationpipeline_deserializeAll(this.ptr, J(A));
        return I === 0 ? void 0 : wA.__wrap(I);
    }
}, F = class {
    static __wrap(A) {
        let I = Object.create(F.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawshape_free(A);
    }
    static cuboid(A, I) {
        var C = B.rawshape_cuboid(A, I);
        return F.__wrap(C);
    }
    static roundCuboid(A, I, C) {
        var Q = B.rawshape_roundCuboid(A, I, C);
        return F.__wrap(Q);
    }
    static ball(A) {
        var I = B.rawshape_ball(A);
        return F.__wrap(I);
    }
    static capsule(A, I) {
        var C = B.rawshape_capsule(A, I);
        return F.__wrap(C);
    }
    static polyline(A, I) {
        var C = X(A, B.__wbindgen_malloc), Q = s, E = bA(I, B.__wbindgen_malloc), i = s, D = B.rawshape_polyline(C, Q, E, i);
        return F.__wrap(D);
    }
    static trimesh(A, I) {
        var C = X(A, B.__wbindgen_malloc), Q = s, E = bA(I, B.__wbindgen_malloc), i = s, D = B.rawshape_trimesh(C, Q, E, i);
        return F.__wrap(D);
    }
    static heightfield(A, I) {
        var C = X(A, B.__wbindgen_malloc), Q = s;
        o(I, G);
        var E = B.rawshape_heightfield(C, Q, I.ptr);
        return F.__wrap(E);
    }
    static segment(A, I) {
        o(A, G), o(I, G);
        var C = B.rawshape_segment(A.ptr, I.ptr);
        return F.__wrap(C);
    }
    static triangle(A, I, C) {
        o(A, G), o(I, G), o(C, G);
        var Q = B.rawshape_triangle(A.ptr, I.ptr, C.ptr);
        return F.__wrap(Q);
    }
    static roundTriangle(A, I, C, Q) {
        o(A, G), o(I, G), o(C, G);
        var E = B.rawshape_roundTriangle(A.ptr, I.ptr, C.ptr, Q);
        return F.__wrap(E);
    }
    static convexHull(A) {
        var I = X(A, B.__wbindgen_malloc), C = s, Q = B.rawshape_convexHull(I, C);
        return Q === 0 ? void 0 : F.__wrap(Q);
    }
    static roundConvexHull(A, I) {
        var C = X(A, B.__wbindgen_malloc), Q = s, E = B.rawshape_roundConvexHull(C, Q, I);
        return E === 0 ? void 0 : F.__wrap(E);
    }
    static convexPolyline(A) {
        var I = X(A, B.__wbindgen_malloc), C = s, Q = B.rawshape_convexPolyline(I, C);
        return Q === 0 ? void 0 : F.__wrap(Q);
    }
    static roundConvexPolyline(A, I) {
        var C = X(A, B.__wbindgen_malloc), Q = s, E = B.rawshape_roundConvexPolyline(C, Q, I);
        return E === 0 ? void 0 : F.__wrap(E);
    }
}, SA = class {
    static __wrap(A) {
        let I = Object.create(SA.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawshapecollidertoi_free(A);
    }
    colliderHandle() {
        return B.rawpointcolliderprojection_colliderHandle(this.ptr) >>> 0;
    }
    toi() {
        return B.rawraycolliderintersection_toi(this.ptr);
    }
    witness1() {
        var A = B.rawraycolliderintersection_normal(this.ptr);
        return G.__wrap(A);
    }
    witness2() {
        var A = B.rawraycolliderintersection_normal(this.ptr);
        return G.__wrap(A);
    }
    normal1() {
        var A = B.rawshapecollidertoi_normal1(this.ptr);
        return G.__wrap(A);
    }
    normal2() {
        var A = B.rawshapecollidertoi_normal1(this.ptr);
        return G.__wrap(A);
    }
}, G = class {
    static __wrap(A) {
        let I = Object.create(G.prototype);
        return I.ptr = A, I;
    }
    __destroy_into_raw() {
        let A = this.ptr;
        return this.ptr = 0, A;
    }
    free() {
        let A = this.__destroy_into_raw();
        B.__wbg_rawvector_free(A);
    }
    static zero() {
        var A = B.rawvector_zero();
        return G.__wrap(A);
    }
    constructor(A, I){
        var C = B.rawvector_new(A, I);
        return G.__wrap(C);
    }
    get x() {
        return B.rawintegrationparameters_dt(this.ptr);
    }
    set x(A) {
        B.rawintegrationparameters_set_dt(this.ptr, A);
    }
    get y() {
        return B.rawrotation_im(this.ptr);
    }
    set y(A) {
        B.rawvector_set_y(this.ptr, A);
    }
    xy() {
        var A = B.rawvector_xy(this.ptr);
        return G.__wrap(A);
    }
    yx() {
        var A = B.rawvector_yx(this.ptr);
        return G.__wrap(A);
    }
};
async function ZA(g) {
    g === void 0 && (g = new URL("rapier_wasm2d_bg.wasm", "<deleted>"));
    let A = {
        wbg: {
        }
    };
    A.wbg.__wbindgen_object_drop_ref = function(Q) {
        rA(Q);
    }, A.wbg.__wbindgen_number_new = function(Q) {
        return J(Q);
    }, A.wbg.__wbg_rawraycolliderintersection_new = function(Q) {
        return J(_.__wrap(Q));
    }, A.wbg.__wbindgen_string_new = function(Q, E) {
        return J(CA(Q, E));
    }, A.wbg.__wbg_now_885ca88fafee0fd1 = function(Q) {
        return K(Q).now();
    }, A.wbg.__wbg_newnoargs_1a11e7e8c906996c = function(Q, E) {
        return J(new Function(CA(Q, E)));
    }, A.wbg.__wbg_get_6d26c712aa73c8b2 = function() {
        return f(function(Q, E) {
            return J(Reflect.get(K(Q), K(E)));
        }, arguments);
    }, A.wbg.__wbg_call_e91f71ddf1f45cff = function() {
        return f(function(Q, E) {
            return J(K(Q).call(K(E)));
        }, arguments);
    }, A.wbg.__wbindgen_object_clone_ref = function(Q) {
        return J(K(Q));
    }, A.wbg.__wbg_call_e3c72355d091d5d4 = function() {
        return f(function(Q, E, i) {
            return J(K(Q).call(K(E), K(i)));
        }, arguments);
    }, A.wbg.__wbg_call_c143b19d87139944 = function() {
        return f(function(Q, E, i, D) {
            return J(K(Q).call(K(E), K(i), K(D)));
        }, arguments);
    }, A.wbg.__wbg_call_72facd37dbc97ddb = function() {
        return f(function(Q, E, i, D, k) {
            return J(K(Q).call(K(E), K(i), K(D), K(k)));
        }, arguments);
    }, A.wbg.__wbg_bind_07839579f523aa89 = function(Q, E, i, D) {
        return J(K(Q).bind(K(E), K(i), K(D)));
    }, A.wbg.__wbg_buffer_79a3294266d4e783 = function(Q) {
        return J(K(Q).buffer);
    }, A.wbg.__wbg_self_b4546ea7b590539e = function() {
        return f(function() {
            return J(self.self);
        }, arguments);
    }, A.wbg.__wbg_window_c279fea81f426a68 = function() {
        return f(function() {
            return J(window.window);
        }, arguments);
    }, A.wbg.__wbg_globalThis_038a6ea0ff17789f = function() {
        return f(function() {
            return J(globalThis.globalThis);
        }, arguments);
    }, A.wbg.__wbg_global_4f93ce884bcee597 = function() {
        return f(function() {
            return J(__global$.global);
        }, arguments);
    }, A.wbg.__wbindgen_is_undefined = function(Q) {
        return K(Q) === void 0;
    }, A.wbg.__wbg_newwithbyteoffsetandlength_22a36e6023ad3cd0 = function(Q, E, i) {
        return J(new Uint8Array(K(Q), E >>> 0, i >>> 0));
    }, A.wbg.__wbg_new_945397fb09fec0b8 = function(Q) {
        return J(new Uint8Array(K(Q)));
    }, A.wbg.__wbg_set_223873223acf6d07 = function(Q, E, i) {
        K(Q).set(K(E), i >>> 0);
    }, A.wbg.__wbg_length_68e13e7bbd918464 = function(Q) {
        return K(Q).length;
    }, A.wbg.__wbindgen_number_get = function(Q, E) {
        let i = K(E);
        var D = typeof i == "number" ? i : void 0;
        (BA !== null && BA.buffer === B.memory.buffer || (BA = new Float64Array(B.memory.buffer)), BA)[Q / 8 + 1] = dA(D) ? 0 : D, y()[Q / 4 + 0] = !dA(D);
    }, A.wbg.__wbindgen_boolean_get = function(Q) {
        let E = K(Q);
        return typeof E == "boolean" ? E ? 1 : 0 : 2;
    }, A.wbg.__wbindgen_debug_string = function(Q, E) {
        var i = function(k, S, h) {
            if (h === void 0) {
                let Y = EA.encode(k), W = S(Y.length);
                return gA().subarray(W, W + Y.length).set(Y), s = Y.length, W;
            }
            let a = k.length, U = S(a), x = gA(), q = 0;
            for(; q < a; q++){
                let Y = k.charCodeAt(q);
                if (Y > 127) break;
                x[U + q] = Y;
            }
            if (q !== a) {
                q !== 0 && (k = k.slice(q)), U = h(U, a, a = q + 3 * k.length);
                let Y = gA().subarray(U + q, U + a);
                q += cI(k, Y).written;
            }
            return s = q, U;
        }(yA(K(E)), B.__wbindgen_malloc, B.__wbindgen_realloc), D = s;
        y()[Q / 4 + 1] = D, y()[Q / 4 + 0] = i;
    }, A.wbg.__wbindgen_throw = function(Q, E) {
        throw new Error(CA(Q, E));
    }, A.wbg.__wbindgen_memory = function() {
        return J(B.memory);
    }, (typeof g == "string" || typeof Request == "function" && g instanceof Request || typeof URL == "function" && g instanceof URL) && (g = fetch(g));
    let { instance: I , module: C  } = await async function(Q, E) {
        if (typeof Response == "function" && Q instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming == "function") try {
                return await WebAssembly.instantiateStreaming(Q, E);
            } catch (D) {
                if (Q.headers.get("Content-Type") == "application/wasm") throw D;
                console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", D);
            }
            let i = await Q.arrayBuffer();
            return await WebAssembly.instantiate(i, E);
        }
        {
            let i = await WebAssembly.instantiate(Q, E);
            return i instanceof WebAssembly.Instance ? {
                instance: i,
                module: Q
            } : i;
        }
    }(await g, A);
    return B = I.exports, ZA.__wbindgen_wasm_module = C, B;
}
var j, xA = function(g, A) {
    this.x = g, this.y = A;
}, w = function() {
    function g() {
    }
    return g.new = function(A, I) {
        return new xA(A, I);
    }, g.zeros = function() {
        return g.new(0, 0);
    }, g.fromRaw = function(A) {
        if (!A) return null;
        var I = g.new(A.x, A.y);
        return A.free(), I;
    }, g.intoRaw = function(A) {
        return new G(A.x, A.y);
    }, g;
}(), H = function() {
    function g() {
    }
    return g.identity = function() {
        return 0;
    }, g.fromRaw = function(A) {
        if (!A) return null;
        var I = A.angle;
        return A.free(), I;
    }, g.intoRaw = function(A) {
        return M.fromAngle(A);
    }, g;
}();
(function(g) {
    g[g.Dynamic = 0] = "Dynamic", g[g.Static = 1] = "Static", g[g.KinematicPositionBased = 2] = "KinematicPositionBased", g[g.KinematicVelocityBased = 3] = "KinematicVelocityBased";
})(j || (j = {
}));
var l, RA, FA = function() {
    function g(A, I) {
        this.rawSet = A, this.handle = I;
    }
    return g.prototype.isValid = function() {
        return this.rawSet.contains(this.handle);
    }, g.prototype.lockTranslations = function(A, I) {
        return this.rawSet.rbLockTranslations(this.handle, A, I);
    }, g.prototype.lockRotations = function(A, I) {
        return this.rawSet.rbLockRotations(this.handle, A, I);
    }, g.prototype.dominanceGroup = function() {
        return this.rawSet.rbDominanceGroup(this.handle);
    }, g.prototype.setDominanceGroup = function(A) {
        this.rawSet.rbSetDominanceGroup(this.handle, A);
    }, g.prototype.enableCcd = function(A) {
        this.rawSet.rbEnableCcd(this.handle, A);
    }, g.prototype.translation = function() {
        var A = this.rawSet.rbTranslation(this.handle);
        return w.fromRaw(A);
    }, g.prototype.rotation = function() {
        var A = this.rawSet.rbRotation(this.handle);
        return H.fromRaw(A);
    }, g.prototype.nextTranslation = function() {
        var A = this.rawSet.rbNextTranslation(this.handle);
        return w.fromRaw(A);
    }, g.prototype.nextRotation = function() {
        var A = this.rawSet.rbNextRotation(this.handle);
        return H.fromRaw(A);
    }, g.prototype.setTranslation = function(A, I) {
        this.rawSet.rbSetTranslation(this.handle, A.x, A.y, I);
    }, g.prototype.setLinvel = function(A, I) {
        var C = w.intoRaw(A);
        this.rawSet.rbSetLinvel(this.handle, C, I), C.free();
    }, g.prototype.gravityScale = function() {
        return this.rawSet.rbGravityScale(this.handle);
    }, g.prototype.setGravityScale = function(A, I) {
        this.rawSet.rbSetGravityScale(this.handle, A, I);
    }, g.prototype.setRotation = function(A, I) {
        this.rawSet.rbSetRotation(this.handle, A, I);
    }, g.prototype.setAngvel = function(A, I) {
        this.rawSet.rbSetAngvel(this.handle, A, I);
    }, g.prototype.setNextKinematicTranslation = function(A) {
        this.rawSet.rbSetNextKinematicTranslation(this.handle, A.x, A.y);
    }, g.prototype.setNextKinematicRotation = function(A) {
        this.rawSet.rbSetNextKinematicRotation(this.handle, A);
    }, g.prototype.linvel = function() {
        return w.fromRaw(this.rawSet.rbLinvel(this.handle));
    }, g.prototype.angvel = function() {
        return this.rawSet.rbAngvel(this.handle);
    }, g.prototype.mass = function() {
        return this.rawSet.rbMass(this.handle);
    }, g.prototype.sleep = function() {
        this.rawSet.rbSleep(this.handle);
    }, g.prototype.wakeUp = function() {
        this.rawSet.rbWakeUp(this.handle);
    }, g.prototype.isCcdEnabled = function() {
        this.rawSet.rbIsCcdEnabled(this.handle);
    }, g.prototype.numColliders = function() {
        return this.rawSet.rbNumColliders(this.handle);
    }, g.prototype.collider = function(A) {
        return this.rawSet.rbCollider(this.handle, A);
    }, g.prototype.bodyType = function() {
        return this.rawSet.rbBodyType(this.handle);
    }, g.prototype.isSleeping = function() {
        return this.rawSet.rbIsSleeping(this.handle);
    }, g.prototype.isMoving = function() {
        return this.rawSet.rbIsMoving(this.handle);
    }, g.prototype.isStatic = function() {
        return this.rawSet.rbIsStatic(this.handle);
    }, g.prototype.isKinematic = function() {
        return this.rawSet.rbIsKinematic(this.handle);
    }, g.prototype.isDynamic = function() {
        return this.rawSet.rbIsDynamic(this.handle);
    }, g.prototype.linearDamping = function() {
        return this.rawSet.rbLinearDamping(this.handle);
    }, g.prototype.angularDamping = function() {
        return this.rawSet.rbAngularDamping(this.handle);
    }, g.prototype.setLinearDamping = function(A) {
        this.rawSet.rbSetLinearDamping(this.handle, A);
    }, g.prototype.setAngularDamping = function(A) {
        this.rawSet.rbSetAngularDamping(this.handle, A);
    }, g.prototype.applyForce = function(A, I) {
        var C = w.intoRaw(A);
        this.rawSet.rbApplyForce(this.handle, C, I), C.free();
    }, g.prototype.applyImpulse = function(A, I) {
        var C = w.intoRaw(A);
        this.rawSet.rbApplyImpulse(this.handle, C, I), C.free();
    }, g.prototype.applyTorque = function(A, I) {
        this.rawSet.rbApplyTorque(this.handle, A, I);
    }, g.prototype.applyTorqueImpulse = function(A, I) {
        this.rawSet.rbApplyTorqueImpulse(this.handle, A, I);
    }, g.prototype.applyForceAtPoint = function(A, I, C) {
        var Q = w.intoRaw(A), E = w.intoRaw(I);
        this.rawSet.rbApplyForceAtPoint(this.handle, Q, E, C), Q.free(), E.free();
    }, g.prototype.applyImpulseAtPoint = function(A, I, C) {
        var Q = w.intoRaw(A), E = w.intoRaw(I);
        this.rawSet.rbApplyImpulseAtPoint(this.handle, Q, E, C), Q.free(), E.free();
    }, g;
}(), YI = function() {
    function g(A) {
        this.status = A, this.translation = w.zeros(), this.rotation = H.identity(), this.gravityScale = 1, this.linvel = w.zeros(), this.mass = 0, this.translationsEnabled = !0, this.centerOfMass = w.zeros(), this.angvel = 0, this.principalAngularInertia = 0, this.rotationsEnabled = !0, this.linearDamping = 0, this.angularDamping = 0, this.canSleep = !0, this.ccdEnabled = !1, this.dominanceGroup = 0;
    }
    return g.newDynamic = function() {
        return new g(j.Dynamic);
    }, g.newKinematicPositionBased = function() {
        return new g(j.KinematicPositionBased);
    }, g.newKinematicVelocityBased = function() {
        return new g(j.KinematicVelocityBased);
    }, g.newStatic = function() {
        return new g(j.Static);
    }, g.prototype.setDominanceGroup = function(A) {
        return this.dominanceGroup = A, this;
    }, g.prototype.setTranslation = function(A, I) {
        if (typeof A != "number" || typeof I != "number") throw TypeError("The translation components must be numbers.");
        return this.translation = {
            x: A,
            y: I
        }, this;
    }, g.prototype.setRotation = function(A) {
        return this.rotation = A, this;
    }, g.prototype.setGravityScale = function(A) {
        return this.gravityScale = A, this;
    }, g.prototype.setAdditionalMass = function(A) {
        return this.mass = A, this;
    }, g.prototype.lockTranslations = function() {
        return this.translationsEnabled = !1, this;
    }, g.prototype.setLinvel = function(A, I) {
        if (typeof A != "number" || typeof I != "number") throw TypeError("The linvel components must be numbers.");
        return this.linvel = {
            x: A,
            y: I
        }, this;
    }, g.prototype.setAngvel = function(A) {
        return this.angvel = A, this;
    }, g.prototype.setAdditionalMassProperties = function(A, I, C) {
        return this.mass = A, this.centerOfMass = I, this.principalAngularInertia = C, this;
    }, g.prototype.setAdditionalPrincipalAngularInertia = function(A) {
        return this.principalAngularInertia = A, this;
    }, g.prototype.lockRotations = function() {
        return this.rotationsEnabled = !1, this;
    }, g.prototype.setLinearDamping = function(A) {
        return this.linearDamping = A, this;
    }, g.prototype.setAngularDamping = function(A) {
        return this.angularDamping = A, this;
    }, g.prototype.setCanSleep = function(A) {
        return this.canSleep = A, this;
    }, g.prototype.setCcdEnabled = function(A) {
        return this.ccdEnabled = A, this;
    }, g;
}(), WA = function() {
    function g(A) {
        this.raw = A || new c;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.createRigidBody = function(A) {
        var I = w.intoRaw(A.translation), C = H.intoRaw(A.rotation), Q = w.intoRaw(A.linvel), E = w.intoRaw(A.centerOfMass), i = this.raw.createRigidBody(I, C, A.gravityScale, A.mass, A.translationsEnabled, E, Q, A.angvel, A.principalAngularInertia, A.rotationsEnabled, A.linearDamping, A.angularDamping, A.status, A.canSleep, A.ccdEnabled, A.dominanceGroup);
        return I.free(), C.free(), Q.free(), E.free(), i;
    }, g.prototype.remove = function(A, I, C, Q) {
        this.raw.remove(A, I.raw, C.raw, Q.raw);
    }, g.prototype.len = function() {
        return this.raw.len();
    }, g.prototype.contains = function(A) {
        return this.raw.contains(A);
    }, g.prototype.get = function(A) {
        return this.raw.contains(A) ? new FA(this.raw, A) : null;
    }, g.prototype.forEachRigidBody = function(A) {
        var I = this;
        this.forEachRigidBodyHandle(function(C) {
            A(new FA(I.raw, C));
        });
    }, g.prototype.forEachRigidBodyHandle = function(A) {
        this.raw.forEachRigidBodyHandle(A);
    }, g.prototype.forEachActiveRigidBody = function(A, I) {
        var C = this;
        A.forEachActiveRigidBodyHandle(function(Q) {
            I(new FA(C.raw, Q));
        });
    }, g;
}(), XA = function() {
    function g(A) {
        this.raw = A || new b;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, Object.defineProperty(g.prototype, "dt", {
        get: function() {
            return this.raw.dt;
        },
        set: function(A) {
            this.raw.dt = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "erp", {
        get: function() {
            return this.raw.erp;
        },
        set: function(A) {
            this.raw.erp = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "jointErp", {
        get: function() {
            return this.raw.jointErp;
        },
        set: function(A) {
            this.raw.jointErp = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "warmstartCoeff", {
        get: function() {
            return this.raw.warmstartCoeff;
        },
        set: function(A) {
            this.raw.warmstartCoeff = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "allowedLinearError", {
        get: function() {
            return this.raw.allowedLinearError;
        },
        set: function(A) {
            this.raw.allowedLinearError = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "predictionDistance", {
        get: function() {
            return this.raw.predictionDistance;
        },
        set: function(A) {
            this.raw.predictionDistance = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "allowedAngularError", {
        get: function() {
            return this.raw.allowedAngularError;
        },
        set: function(A) {
            this.raw.allowedAngularError = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "maxLinearCorrection", {
        get: function() {
            return this.raw.maxLinearCorrection;
        },
        set: function(A) {
            this.raw.maxLinearCorrection = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "maxAngularCorrection", {
        get: function() {
            return this.raw.maxAngularCorrection;
        },
        set: function(A) {
            this.raw.maxAngularCorrection = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "maxVelocityIterations", {
        get: function() {
            return this.raw.maxVelocityIterations;
        },
        set: function(A) {
            this.raw.maxVelocityIterations = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "maxPositionIterations", {
        get: function() {
            return this.raw.maxPositionIterations;
        },
        set: function(A) {
            this.raw.maxPositionIterations = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "minIslandSize", {
        get: function() {
            return this.raw.minIslandSize;
        },
        set: function(A) {
            this.raw.minIslandSize = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "maxCcdSubsteps", {
        get: function() {
            return this.raw.maxCcdSubsteps;
        },
        set: function(A) {
            this.raw.maxCcdSubsteps = A;
        },
        enumerable: !1,
        configurable: !0
    }), g;
}(), OA = function(g, A) {
    return (OA = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(I, C) {
        I.__proto__ = C;
    } || function(I, C) {
        for(var Q in C)Object.prototype.hasOwnProperty.call(C, Q) && (I[Q] = C[Q]);
    })(g, A);
};
function KA(g, A) {
    if (typeof A != "function" && A !== null) throw new TypeError("Class extends value " + String(A) + " is not a constructor or null");
    function I() {
        this.constructor = g;
    }
    OA(g, A), g.prototype = A === null ? Object.create(A) : (I.prototype = A.prototype, new I);
}
function LI(g, A, I, C) {
    return new (I || (I = Promise))(function(Q, E) {
        function i(S) {
            try {
                k(C.next(S));
            } catch (h) {
                E(h);
            }
        }
        function D(S) {
            try {
                k(C.throw(S));
            } catch (h) {
                E(h);
            }
        }
        function k(S) {
            var h;
            S.done ? Q(S.value) : (h = S.value, h instanceof I ? h : new I(function(a) {
                a(h);
            })).then(i, D);
        }
        k((C = C.apply(g, A || [])).next());
    });
}
function tI(g, A) {
    var I, C, Q, E, i = {
        label: 0,
        sent: function() {
            if (1 & Q[0]) throw Q[1];
            return Q[1];
        },
        trys: [],
        ops: []
    };
    return E = {
        next: D(0),
        throw: D(1),
        return: D(2)
    }, typeof Symbol == "function" && (E[Symbol.iterator] = function() {
        return this;
    }), E;
    function D(k) {
        return function(S) {
            return (function(h) {
                if (I) throw new TypeError("Generator is already executing.");
                for(; i;)try {
                    if (I = 1, C && (Q = 2 & h[0] ? C.return : h[0] ? C.throw || ((Q = C.return) && Q.call(C), 0) : C.next) && !(Q = Q.call(C, h[1])).done) return Q;
                    switch(C = 0, Q && (h = [
                        2 & h[0],
                        Q.value
                    ]), h[0]){
                        case 0:
                        case 1:
                            Q = h;
                            break;
                        case 4:
                            return i.label++, {
                                value: h[1],
                                done: !1
                            };
                        case 5:
                            i.label++, C = h[1], h = [
                                0
                            ];
                            continue;
                        case 7:
                            h = i.ops.pop(), i.trys.pop();
                            continue;
                        default:
                            if (Q = i.trys, !((Q = Q.length > 0 && Q[Q.length - 1]) || h[0] !== 6 && h[0] !== 2)) {
                                i = 0;
                                continue;
                            }
                            if (h[0] === 3 && (!Q || h[1] > Q[0] && h[1] < Q[3])) {
                                i.label = h[1];
                                break;
                            }
                            if (h[0] === 6 && i.label < Q[1]) {
                                i.label = Q[1], Q = h;
                                break;
                            }
                            if (Q && i.label < Q[2]) {
                                i.label = Q[2], i.ops.push(h);
                                break;
                            }
                            Q[2] && i.ops.pop(), i.trys.pop();
                            continue;
                    }
                    h = A.call(g, i);
                } catch (a) {
                    h = [
                        6,
                        a
                    ], C = 0;
                } finally{
                    I = Q = 0;
                }
                if (5 & h[0]) throw h[1];
                return {
                    value: h[0] ? h[1] : void 0,
                    done: !0
                };
            })([
                k,
                S
            ]);
        };
    }
}
(function(g) {
    g[g.Ball = 0] = "Ball", g[g.Fixed = 1] = "Fixed", g[g.Prismatic = 2] = "Prismatic";
})(l || (l = {
})), (function(g) {
    g[g.Disabled = 0] = "Disabled", g[g.VelocityBased = 1] = "VelocityBased", g[g.AccelerationBased = 2] = "AccelerationBased", g[g.ForceBased = 3] = "ForceBased";
})(RA || (RA = {
}));
var AA, aA = function() {
    function g(A, I) {
        this.rawSet = A, this.handle = I;
    }
    return g.prototype.isValid = function() {
        return this.rawSet.contains(this.handle);
    }, g.prototype.bodyHandle1 = function() {
        return this.rawSet.jointBodyHandle1(this.handle);
    }, g.prototype.bodyHandle2 = function() {
        return this.rawSet.jointBodyHandle2(this.handle);
    }, g.prototype.type = function() {
        return this.rawSet.jointType(this.handle);
    }, g.prototype.anchor1 = function() {
        return w.fromRaw(this.rawSet.jointAnchor1(this.handle));
    }, g.prototype.anchor2 = function() {
        return w.fromRaw(this.rawSet.jointAnchor2(this.handle));
    }, g.prototype.axis1 = function() {
        return w.fromRaw(this.rawSet.jointAxis1(this.handle));
    }, g.prototype.axis2 = function() {
        return w.fromRaw(this.rawSet.jointAxis2(this.handle));
    }, g;
}(), MA = function(g) {
    function A() {
        return g !== null && g.apply(this, arguments) || this;
    }
    return KA(A, g), A.prototype.limitsEnabled = function() {
        return this.rawSet.jointLimitsEnabled(this.handle);
    }, A.prototype.limitsMin = function() {
        return this.rawSet.jointLimitsMin(this.handle);
    }, A.prototype.limitsMax = function() {
        return this.rawSet.jointLimitsMax(this.handle);
    }, A.prototype.configureMotorModel = function(I) {
        this.rawSet.jointConfigureMotorModel(this.handle, I);
    }, A.prototype.configureMotorVelocity = function(I, C) {
        this.rawSet.jointConfigureUnitMotorVelocity(this.handle, I, C);
    }, A.prototype.configureMotorPosition = function(I, C, Q) {
        this.rawSet.jointConfigureUnitMotorPosition(this.handle, I, C, Q);
    }, A.prototype.configureMotor = function(I, C, Q, E) {
        this.rawSet.jointConfigureUnitMotor(this.handle, I, C, Q, E);
    }, A;
}(aA), jA = function(g) {
    function A() {
        return g !== null && g.apply(this, arguments) || this;
    }
    return KA(A, g), A;
}(aA), mA = function(g) {
    function A() {
        return g !== null && g.apply(this, arguments) || this;
    }
    return KA(A, g), A;
}(MA), vA = function(g) {
    function A() {
        return g !== null && g.apply(this, arguments) || this;
    }
    return KA(A, g), A;
}(MA), HI = function() {
    function g() {
    }
    return g.ball = function(A, I) {
        var C = new g;
        return C.anchor1 = A, C.anchor2 = I, C.jointType = l.Ball, C;
    }, g.fixed = function(A, I, C, Q) {
        var E = new g;
        return E.anchor1 = A, E.anchor2 = C, E.frame1 = I, E.frame2 = Q, E.jointType = l.Fixed, E;
    }, g.prismatic = function(A, I, C, Q) {
        var E = new g;
        return E.anchor1 = A, E.axis1 = I, E.anchor2 = C, E.axis2 = Q, E.jointType = l.Prismatic, E;
    }, g.prototype.intoRaw = function() {
        var A, I, C, Q = w.intoRaw(this.anchor1), E = w.intoRaw(this.anchor2), i = !1, D = 0, k = 0;
        switch(this.jointType){
            case l.Ball:
                C = e.ball(Q, E);
                break;
            case l.Fixed:
                var S = H.intoRaw(this.frame1), h = H.intoRaw(this.frame2);
                C = e.fixed(Q, S, E, h), S.free(), h.free();
                break;
            case l.Prismatic:
                A = w.intoRaw(this.axis1), I = w.intoRaw(this.axis2), this.limitsEnabled && (i = !0, D = this.limits[0], k = this.limits[1]), C = e.prismatic(Q, A, E, I, i, D, k), A.free(), I.free();
        }
        return Q.free(), E.free(), C;
    }, g;
}(), VA = function() {
    function g(A) {
        this.raw = A || new d;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.createJoint = function(A, I, C, Q) {
        var E = I.intoRaw(), i = this.raw.createJoint(A.raw, E, C, Q);
        return E.free(), i;
    }, g.prototype.remove = function(A, I, C, Q) {
        this.raw.remove(A, I.raw, C.raw, Q);
    }, g.prototype.len = function() {
        return this.raw.len();
    }, g.prototype.contains = function(A) {
        return this.raw.contains(A);
    }, g.prototype.get = function(A) {
        if (!this.raw.contains(A)) return null;
        switch(this.raw.jointType(A)){
            case l.Ball:
                return new vA(this.raw, A);
            case l.Prismatic:
                return new mA(this.raw, A);
            case l.Fixed:
                return new jA(this.raw, A);
        }
    }, g.prototype.forEachJoint = function(A) {
        var I = this;
        this.raw.forEachJointHandle(function(C) {
            A(new aA(I.raw, C));
        });
    }, g.prototype.forEachJointHandle = function(A) {
        this.raw.forEachJointHandle(A);
    }, g;
}();
(function(g) {
    g[g.Average = 0] = "Average", g[g.Min = 1] = "Min", g[g.Multiply = 2] = "Multiply", g[g.Max = 3] = "Max";
})(AA || (AA = {
}));
var qA, uA = function() {
    function g(A) {
        this.raw = A || new O;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g;
}(), PA = function() {
    function g(A) {
        this.raw = A || new t;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.forEachActiveRigidBodyHandle = function(A) {
        this.raw.forEachActiveRigidBodyHandle(A);
    }, g;
}(), zA = function() {
    function g(A) {
        this.raw = A || new T;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g;
}(), _A = function() {
    function g(A) {
        this.raw = A || new Z, this.tempManifold = new $A(null);
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.contactsWith = function(A, I) {
        this.raw.contacts_with(A, I);
    }, g.prototype.intersectionsWith = function(A, I) {
        this.raw.intersections_with(A, I);
    }, g.prototype.contactPair = function(A, I, C) {
        var Q = this.raw.contact_pair(A, I);
        if (Q) {
            var E = Q.collider1() != A, i = void 0;
            for(i = 0; i < Q.numContactManifolds(); ++i)this.tempManifold.raw = Q.contactManifold(i), this.tempManifold.raw && C(this.tempManifold, E), this.tempManifold.free();
            Q.free();
        }
    }, g.prototype.intersectionPair = function(A, I) {
        return this.raw.intersection_pair(A, I);
    }, g;
}(), $A = function() {
    function g(A) {
        this.raw = A;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.normal = function() {
        return w.fromRaw(this.raw.normal());
    }, g.prototype.localNormal1 = function() {
        return w.fromRaw(this.raw.local_n1());
    }, g.prototype.localNormal2 = function() {
        return w.fromRaw(this.raw.local_n2());
    }, g.prototype.subshape1 = function() {
        return this.raw.subshape1();
    }, g.prototype.subshape2 = function() {
        return this.raw.subshape2();
    }, g.prototype.numContacts = function() {
        return this.raw.num_contacts();
    }, g.prototype.localContactPoint1 = function(A) {
        return w.fromRaw(this.raw.contact_local_p1(A));
    }, g.prototype.localContactPoint2 = function(A) {
        return w.fromRaw(this.raw.contact_local_p2(A));
    }, g.prototype.contactDist = function(A) {
        return this.raw.contact_dist(A);
    }, g.prototype.contactFid1 = function(A) {
        return this.raw.contact_fid1(A);
    }, g.prototype.contactFid2 = function(A) {
        return this.raw.contact_fid2(A);
    }, g.prototype.contactImpulse = function(A) {
        return this.raw.contact_impulse(A);
    }, g.prototype.contactTangentImpulse = function(A) {
        return this.raw.contact_tangent_impulse(A);
    }, g.prototype.numSolverContacts = function() {
        return this.raw.num_solver_contacts();
    }, g.prototype.solverContactPoint = function(A) {
        return w.fromRaw(this.raw.solver_contact_point(A));
    }, g.prototype.solverContactDist = function(A) {
        return this.raw.solver_contact_dist(A);
    }, g.prototype.solverContactFriction = function(A) {
        return this.raw.solver_contact_friction(A);
    }, g.prototype.solverContactRestitution = function(A) {
        return this.raw.solver_contact_restitution(A);
    }, g.prototype.solverContactTangentVelocity = function(A) {
        return w.fromRaw(this.raw.solver_contact_tangent_velocity(A));
    }, g;
}();
(function(g) {
    g[g.Ball = 0] = "Ball", g[g.Cuboid = 1] = "Cuboid", g[g.Capsule = 2] = "Capsule", g[g.Segment = 3] = "Segment", g[g.Polyline = 4] = "Polyline", g[g.Triangle = 5] = "Triangle", g[g.TriMesh = 6] = "TriMesh", g[g.HeightField = 7] = "HeightField", g[g.ConvexPolygon = 9] = "ConvexPolygon", g[g.RoundCuboid = 10] = "RoundCuboid", g[g.RoundTriangle = 11] = "RoundTriangle", g[g.RoundConvexPolygon = 12] = "RoundConvexPolygon";
})(qA || (qA = {
}));
var JA, AI = function() {
    function g(A) {
        this.radius = A;
    }
    return g.prototype.intoRaw = function() {
        return F.ball(this.radius);
    }, g;
}(), II = function() {
    function g(A, I) {
        this.halfExtents = w.new(A, I);
    }
    return g.prototype.intoRaw = function() {
        return F.cuboid(this.halfExtents.x, this.halfExtents.y);
    }, g;
}(), gI = function() {
    function g(A, I, C) {
        this.halfExtents = w.new(A, I), this.borderRadius = C;
    }
    return g.prototype.intoRaw = function() {
        return F.roundCuboid(this.halfExtents.x, this.halfExtents.y, this.borderRadius);
    }, g;
}(), CI = function() {
    function g(A, I) {
        this.halfHeight = A, this.radius = I;
    }
    return g.prototype.intoRaw = function() {
        return F.capsule(this.halfHeight, this.radius);
    }, g;
}(), BI = function() {
    function g(A, I) {
        this.a = A, this.b = I;
    }
    return g.prototype.intoRaw = function() {
        var A = w.intoRaw(this.a), I = w.intoRaw(this.b), C = F.segment(A, I);
        return A.free(), I.free(), C;
    }, g;
}(), QI = function() {
    function g(A, I, C) {
        this.a = A, this.b = I, this.c = C;
    }
    return g.prototype.intoRaw = function() {
        var A = w.intoRaw(this.a), I = w.intoRaw(this.b), C = w.intoRaw(this.c), Q = F.triangle(A, I, C);
        return A.free(), I.free(), C.free(), Q;
    }, g;
}(), EI = function() {
    function g(A, I, C, Q) {
        this.a = A, this.b = I, this.c = C, this.borderRadius = Q;
    }
    return g.prototype.intoRaw = function() {
        var A = w.intoRaw(this.a), I = w.intoRaw(this.b), C = w.intoRaw(this.c), Q = F.roundTriangle(A, I, C, this.borderRadius);
        return A.free(), I.free(), C.free(), Q;
    }, g;
}(), iI = function() {
    function g(A, I) {
        this.vertices = A, this.indices = I || new Uint32Array(0);
    }
    return g.prototype.intoRaw = function() {
        return F.polyline(this.vertices, this.indices);
    }, g;
}(), oI = function() {
    function g(A, I) {
        this.vertices = A, this.indices = I;
    }
    return g.prototype.intoRaw = function() {
        return F.trimesh(this.vertices, this.indices);
    }, g;
}(), sA = function() {
    function g(A, I) {
        this.vertices = A, this.skipConvexHullComputation = !!I;
    }
    return g.prototype.intoRaw = function() {
        return this.skipConvexHullComputation ? F.convexPolyline(this.vertices) : F.convexHull(this.vertices);
    }, g;
}(), cA = function() {
    function g(A, I, C) {
        this.vertices = A, this.borderRadius = I, this.skipConvexHullComputation = !!C;
    }
    return g.prototype.intoRaw = function() {
        return this.skipConvexHullComputation ? F.roundConvexPolyline(this.vertices, this.borderRadius) : F.roundConvexHull(this.vertices, this.borderRadius);
    }, g;
}(), DI = function() {
    function g(A, I) {
        this.heights = A, this.scale = I;
    }
    return g.prototype.intoRaw = function() {
        var A = w.intoRaw(this.scale), I = F.heightfield(this.heights, A);
        return A.free(), I;
    }, g;
}();
(function(g) {
    g[g.DYNAMIC_DYNAMIC = 1] = "DYNAMIC_DYNAMIC", g[g.DYNAMIC_KINEMATIC = 12] = "DYNAMIC_KINEMATIC", g[g.DYNAMIC_STATIC = 2] = "DYNAMIC_STATIC", g[g.KINEMATIC_KINEMATIC = 52224] = "KINEMATIC_KINEMATIC", g[g.KINEMATIC_STATIC = 8704] = "KINEMATIC_STATIC", g[g.STATIC_STATIC = 32] = "STATIC_STATIC", g[g.DEFAULT = 15] = "DEFAULT", g[g.ALL = 60943] = "ALL";
})(JA || (JA = {
}));
var YA, LA = function() {
    function g(A, I) {
        this.rawSet = A, this.handle = I;
    }
    return g.prototype.isValid = function() {
        return this.rawSet.contains(this.handle);
    }, g.prototype.translation = function() {
        return w.fromRaw(this.rawSet.coTranslation(this.handle));
    }, g.prototype.rotation = function() {
        return H.fromRaw(this.rawSet.coRotation(this.handle));
    }, g.prototype.isSensor = function() {
        return this.rawSet.coIsSensor(this.handle);
    }, g.prototype.setSensor = function(A) {
        this.rawSet.coSetSensor(this.handle, A);
    }, g.prototype.setShape = function(A) {
        var I = A.intoRaw();
        this.rawSet.coSetShape(this.handle, I), I.free();
    }, g.prototype.setRestitution = function(A) {
        this.rawSet.coSetRestitution(this.handle, A);
    }, g.prototype.setFriction = function(A) {
        this.rawSet.coSetFriction(this.handle, A);
    }, g.prototype.frictionCombineRule = function() {
        return this.rawSet.coFrictionCombineRule(this.handle);
    }, g.prototype.setFrictionCombineRule = function(A) {
        this.rawSet.coSetFrictionCombineRule(this.handle, A);
    }, g.prototype.restitutionCombineRule = function() {
        return this.rawSet.coRestitutionCombineRule(this.handle);
    }, g.prototype.setRestitutionCombineRule = function(A) {
        this.rawSet.coSetRestitutionCombineRule(this.handle, A);
    }, g.prototype.setCollisionGroups = function(A) {
        this.rawSet.coSetCollisionGroups(this.handle, A);
    }, g.prototype.setSolverGroups = function(A) {
        this.rawSet.coSetSolverGroups(this.handle, A);
    }, g.prototype.activeHooks = function() {
        this.rawSet.coActiveHooks(this.handle);
    }, g.prototype.setActiveHooks = function(A) {
        this.rawSet.coSetActiveHooks(this.handle, A);
    }, g.prototype.activeEvents = function() {
        return this.rawSet.coActiveEvents(this.handle);
    }, g.prototype.setActiveEvents = function(A) {
        this.rawSet.coSetActiveEvents(this.handle, A);
    }, g.prototype.activeCollisionTypes = function() {
        return this.rawSet.coActiveCollisionTypes(this.handle);
    }, g.prototype.setActiveCollisionTypes = function(A) {
        this.rawSet.coSetActiveCollisionTypes(this.handle, A);
    }, g.prototype.setTranslation = function(A) {
        this.rawSet.coSetTranslation(this.handle, A.x, A.y);
    }, g.prototype.setTranslationWrtParent = function(A) {
        this.rawSet.coSetTranslationWrtParent(this.handle, A.x, A.y);
    }, g.prototype.setRotation = function(A) {
        this.rawSet.coSetRotation(this.handle, A);
    }, g.prototype.setRotationWrtParent = function(A) {
        this.rawSet.coSetRotationWrtParent(this.handle, A);
    }, g.prototype.shapeType = function() {
        return this.rawSet.coShapeType(this.handle);
    }, g.prototype.halfExtents = function() {
        return w.fromRaw(this.rawSet.coHalfExtents(this.handle));
    }, g.prototype.radius = function() {
        return this.rawSet.coRadius(this.handle);
    }, g.prototype.roundRadius = function() {
        return this.rawSet.coRoundRadius(this.handle);
    }, g.prototype.halfHeight = function() {
        return this.rawSet.coHalfHeight(this.handle);
    }, g.prototype.vertices = function() {
        return this.rawSet.coVertices(this.handle);
    }, g.prototype.indices = function() {
        return this.rawSet.coIndices(this.handle);
    }, g.prototype.heightfieldHeights = function() {
        return this.rawSet.coHeightfieldHeights(this.handle);
    }, g.prototype.heightfieldScale = function() {
        var A = this.rawSet.coHeightfieldScale(this.handle);
        return w.fromRaw(A);
    }, g.prototype.parent = function() {
        return this.rawSet.coParent(this.handle);
    }, g.prototype.friction = function() {
        return this.rawSet.coFriction(this.handle);
    }, g.prototype.density = function() {
        return this.rawSet.coDensity(this.handle);
    }, g.prototype.collisionGroups = function() {
        return this.rawSet.coCollisionGroups(this.handle);
    }, g.prototype.solverGroups = function() {
        return this.rawSet.coSolverGroups(this.handle);
    }, g;
}(), pI = function() {
    function g(A) {
        this.shape = A, this.useMassProps = !1, this.density = 1, this.friction = 0.5, this.restitution = 0, this.rotation = H.identity(), this.translation = w.zeros(), this.isSensor = !1, this.collisionGroups = 4294967295, this.solverGroups = 4294967295, this.frictionCombineRule = AA.Average, this.restitutionCombineRule = AA.Average, this.activeCollisionTypes = JA.DEFAULT, this.activeEvents = 0, this.activeHooks = 0, this.mass = 0, this.centerOfMass = w.zeros(), this.principalAngularInertia = 0, this.rotationsEnabled = !0;
    }
    return g.ball = function(A) {
        return new g(new AI(A));
    }, g.capsule = function(A, I) {
        return new g(new CI(A, I));
    }, g.segment = function(A, I) {
        return new g(new BI(A, I));
    }, g.triangle = function(A, I, C) {
        return new g(new QI(A, I, C));
    }, g.roundTriangle = function(A, I, C, Q) {
        return new g(new EI(A, I, C, Q));
    }, g.polyline = function(A, I) {
        return new g(new iI(A, I));
    }, g.trimesh = function(A, I) {
        return new g(new oI(A, I));
    }, g.cuboid = function(A, I) {
        return new g(new II(A, I));
    }, g.roundCuboid = function(A, I, C) {
        return new g(new gI(A, I, C));
    }, g.heightfield = function(A, I) {
        return new g(new DI(A, I));
    }, g.convexHull = function(A) {
        return new g(new sA(A, !1));
    }, g.convexPolyline = function(A) {
        return new g(new sA(A, !0));
    }, g.roundConvexHull = function(A, I) {
        return new g(new cA(A, I, !1));
    }, g.roundConvexPolyline = function(A, I) {
        return new g(new cA(A, I, !0));
    }, g.prototype.setTranslation = function(A, I) {
        if (typeof A != "number" || typeof I != "number") throw TypeError("The translation components must be numbers.");
        return this.translation = {
            x: A,
            y: I
        }, this;
    }, g.prototype.setRotation = function(A) {
        return this.rotation = A, this;
    }, g.prototype.setSensor = function(A) {
        return this.isSensor = A, this;
    }, g.prototype.setDensity = function(A) {
        return this.useMassProps = !1, this.density = A, this;
    }, g.prototype.setMassProperties = function(A, I, C) {
        return this.useMassProps = !0, this.mass = A, this.centerOfMass = I, this.principalAngularInertia = C, this;
    }, g.prototype.setRestitution = function(A) {
        return this.restitution = A, this;
    }, g.prototype.setFriction = function(A) {
        return this.friction = A, this;
    }, g.prototype.setFrictionCombineRule = function(A) {
        return this.frictionCombineRule = A, this;
    }, g.prototype.setRestitutionCombineRule = function(A) {
        return this.restitutionCombineRule = A, this;
    }, g.prototype.setCollisionGroups = function(A) {
        return this.collisionGroups = A, this;
    }, g.prototype.setSolverGroups = function(A) {
        return this.solverGroups = A, this;
    }, g.prototype.setActiveHooks = function(A) {
        return this.activeHooks = A, this;
    }, g.prototype.setActiveEvents = function(A) {
        return this.activeEvents = A, this;
    }, g.prototype.setActiveCollisionTypes = function(A) {
        return this.activeCollisionTypes = A, this;
    }, g;
}(), GI = function() {
    function g(A) {
        this.raw = A || new R;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.createCollider = function(A, I, C) {
        var Q = C != null && C != null;
        if (Q && isNaN(C)) throw Error("Cannot create a collider with a parent rigid-body handle that is not a number.");
        var E = I.shape.intoRaw(), i = w.intoRaw(I.translation), D = H.intoRaw(I.rotation), k = w.intoRaw(I.centerOfMass), S = this.raw.createCollider(E, i, D, I.useMassProps, I.mass, k, I.principalAngularInertia, I.density, I.friction, I.restitution, I.frictionCombineRule, I.restitutionCombineRule, I.isSensor, I.collisionGroups, I.solverGroups, I.activeCollisionTypes, I.activeHooks, I.activeEvents, Q, Q ? C : 0, A.raw);
        return E.free(), i.free(), D.free(), k.free(), S;
    }, g.prototype.remove = function(A, I, C, Q) {
        this.raw.remove(A, I.raw, C.raw, Q);
    }, g.prototype.get = function(A) {
        return this.raw.contains(A) ? new LA(this.raw, A) : null;
    }, g.prototype.len = function() {
        return this.raw.len();
    }, g.prototype.contains = function(A) {
        return this.raw.contains(A);
    }, g.prototype.forEachCollider = function(A) {
        var I = this;
        this.forEachColliderHandle(function(C) {
            A(new LA(I.raw, C));
        });
    }, g.prototype.forEachColliderHandle = function(A) {
        this.raw.forEachColliderHandle(A);
    }, g;
}(), lI = function() {
    function g(A, I) {
        this.origin = A, this.dir = I;
    }
    return g.prototype.pointAt = function(A) {
        return {
            x: this.origin.x + this.dir.x * A,
            y: this.origin.y + this.dir.y * A
        };
    }, g;
}(), tA = function() {
    function g(A, I, C) {
        this.colliderHandle = A, this.toi = I, this.normal = C;
    }
    return g.fromRaw = function(A) {
        if (!A) return null;
        var I = new g(A.colliderHandle(), A.toi(), w.fromRaw(A.normal()));
        return A.free(), I;
    }, g;
}(), wI = function() {
    function g(A, I) {
        this.colliderHandle = A, this.toi = I;
    }
    return g.fromRaw = function(A) {
        if (!A) return null;
        var I = new g(A.colliderHandle(), A.toi());
        return A.free(), I;
    }, g;
}(), kI = function() {
    function g(A, I, C) {
        this.colliderHandle = A, this.point = I, this.isInside = C;
    }
    return g.fromRaw = function(A) {
        if (!A) return null;
        var I = new g(A.colliderHandle(), w.fromRaw(A.point()), A.isInside());
        return A.free(), I;
    }, g;
}(), hI = function() {
    function g(A, I, C, Q, E, i) {
        this.colliderHandle = A, this.toi = I, this.witness1 = C, this.witness2 = Q, this.normal1 = E, this.normal2 = i;
    }
    return g.fromRaw = function(A) {
        if (!A) return null;
        var I = new g(A.colliderHandle(), A.toi(), w.fromRaw(A.witness1()), w.fromRaw(A.witness2()), w.fromRaw(A.normal1()), w.fromRaw(A.normal2()));
        return A.free(), I;
    }, g;
}(), SI = function() {
    function g(A) {
        this.raw = A || new P;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.step = function(A, I, C, Q, E, i, D, k, S, h, a) {
        var U = w.intoRaw(A);
        h ? this.raw.stepWithEvents(U, I.raw, C.raw, Q.raw, E.raw, i.raw, D.raw, k.raw, S.raw, h.raw, a, a ? a.filterContactPair : null, a ? a.filterIntersectionPair : null) : this.raw.step(U, I.raw, C.raw, Q.raw, E.raw, i.raw, D.raw, k.raw, S.raw), U.free();
    }, g;
}(), nI = function() {
    function g(A) {
        this.raw = A || new z;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.update = function(A, I, C) {
        this.raw.update(A.raw, I.raw, C.raw);
    }, g.prototype.castRay = function(A, I, C, Q, E) {
        var i = w.intoRaw(I.origin), D = w.intoRaw(I.dir), k = wI.fromRaw(this.raw.castRay(A.raw, i, D, C, Q, E));
        return i.free(), D.free(), k;
    }, g.prototype.castRayAndGetNormal = function(A, I, C, Q, E) {
        var i = w.intoRaw(I.origin), D = w.intoRaw(I.dir), k = tA.fromRaw(this.raw.castRayAndGetNormal(A.raw, i, D, C, Q, E));
        return i.free(), D.free(), k;
    }, g.prototype.intersectionsWithRay = function(A, I, C, Q, E, i) {
        var D = w.intoRaw(I.origin), k = w.intoRaw(I.dir);
        this.raw.intersectionsWithRay(A.raw, D, k, C, Q, E, function(S) {
            return i(tA.fromRaw(S));
        }), D.free(), k.free();
    }, g.prototype.intersectionWithShape = function(A, I, C, Q, E) {
        var i = w.intoRaw(I), D = H.intoRaw(C), k = Q.intoRaw(), S = this.raw.intersectionWithShape(A.raw, i, D, k, E);
        return i.free(), D.free(), k.free(), S;
    }, g.prototype.projectPoint = function(A, I, C, Q) {
        var E = w.intoRaw(I), i = kI.fromRaw(this.raw.projectPoint(A.raw, E, C, Q));
        return E.free(), i;
    }, g.prototype.intersectionsWithPoint = function(A, I, C, Q) {
        var E = w.intoRaw(I);
        this.raw.intersectionsWithPoint(A.raw, E, C, Q), E.free();
    }, g.prototype.castShape = function(A, I, C, Q, E, i, D) {
        var k = w.intoRaw(I), S = H.intoRaw(C), h = w.intoRaw(Q), a = E.intoRaw(), U = hI.fromRaw(this.raw.castShape(A.raw, k, S, h, a, i, D));
        return k.free(), S.free(), h.free(), a.free(), U;
    }, g.prototype.intersectionsWithShape = function(A, I, C, Q, E, i) {
        var D = w.intoRaw(I), k = H.intoRaw(C), S = Q.intoRaw();
        this.raw.intersectionsWithShape(A.raw, D, k, S, E, i), D.free(), k.free(), S.free();
    }, g.prototype.collidersWithAabbIntersectingAabb = function(A, I, C) {
        var Q = w.intoRaw(A), E = w.intoRaw(I);
        this.raw.collidersWithAabbIntersectingAabb(Q, E, C), Q.free(), E.free();
    }, g;
}(), HA = function() {
    function g(A) {
        this.raw = A || new $;
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.serializeAll = function(A, I, C, Q, E, i, D, k) {
        var S = w.intoRaw(A), h = this.raw.serializeAll(S, I.raw, C.raw, Q.raw, E.raw, i.raw, D.raw, k.raw);
        return S.free(), h;
    }, g.prototype.deserializeAll = function(A) {
        return FI.fromRaw(this.raw.deserializeAll(A));
    }, g;
}(), FI = function() {
    function g(A, I, C, Q, E, i, D, k, S, h, a, U) {
        this.gravity = A, this.integrationParameters = new XA(I), this.islands = new PA(C), this.broadPhase = new zA(Q), this.narrowPhase = new _A(E), this.bodies = new WA(i), this.colliders = new GI(D), this.joints = new VA(k), this.ccdSolver = new uA(S), this.queryPipeline = new nI(h), this.physicsPipeline = new SI(a), this.serializationPipeline = new HA(U);
    }
    return g.prototype.free = function() {
        this.integrationParameters.free(), this.islands.free(), this.broadPhase.free(), this.narrowPhase.free(), this.bodies.free(), this.colliders.free(), this.joints.free(), this.ccdSolver.free(), this.queryPipeline.free(), this.physicsPipeline.free(), this.serializationPipeline.free(), this.integrationParameters = void 0, this.islands = void 0, this.broadPhase = void 0, this.narrowPhase = void 0, this.bodies = void 0, this.colliders = void 0, this.ccdSolver = void 0, this.joints = void 0, this.queryPipeline = void 0, this.physicsPipeline = void 0, this.serializationPipeline = void 0;
    }, g.fromRaw = function(A) {
        return A ? new g(w.fromRaw(A.takeGravity()), A.takeIntegrationParameters(), A.takeIslandManager(), A.takeBroadPhase(), A.takeNarrowPhase(), A.takeBodies(), A.takeColliders(), A.takeJoints()) : null;
    }, g.prototype.takeSnapshot = function() {
        return this.serializationPipeline.serializeAll(this.gravity, this.integrationParameters, this.islands, this.broadPhase, this.narrowPhase, this.bodies, this.colliders, this.joints);
    }, g.restoreSnapshot = function(A) {
        return new HA().deserializeAll(A);
    }, g.prototype.step = function(A, I) {
        this.physicsPipeline.step(this.gravity, this.integrationParameters, this.islands, this.broadPhase, this.narrowPhase, this.bodies, this.colliders, this.joints, this.ccdSolver, A, I), this.queryPipeline.update(this.islands, this.bodies, this.colliders);
    }, Object.defineProperty(g.prototype, "timestep", {
        get: function() {
            return this.integrationParameters.dt;
        },
        set: function(A) {
            this.integrationParameters.dt = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "maxVelocityIterations", {
        get: function() {
            return this.integrationParameters.maxVelocityIterations;
        },
        set: function(A) {
            this.integrationParameters.maxVelocityIterations = A;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(g.prototype, "maxPositionIterations", {
        get: function() {
            return this.integrationParameters.maxPositionIterations;
        },
        set: function(A) {
            this.integrationParameters.maxPositionIterations = A;
        },
        enumerable: !1,
        configurable: !0
    }), g.prototype.createRigidBody = function(A) {
        return this.bodies.get(this.bodies.createRigidBody(A));
    }, g.prototype.createCollider = function(A, I) {
        return this.colliders.get(this.colliders.createCollider(this.bodies, A, I));
    }, g.prototype.createJoint = function(A, I, C) {
        return this.joints.get(this.joints.createJoint(this.bodies, A, I.handle, C.handle));
    }, g.prototype.getRigidBody = function(A) {
        return this.bodies.get(A);
    }, g.prototype.getCollider = function(A) {
        return this.colliders.get(A);
    }, g.prototype.getJoint = function(A) {
        return this.joints.get(A);
    }, g.prototype.removeRigidBody = function(A) {
        this.bodies.remove(A.handle, this.islands, this.colliders, this.joints);
    }, g.prototype.removeCollider = function(A, I) {
        this.colliders.remove(A.handle, this.islands, this.bodies, I);
    }, g.prototype.removeJoint = function(A, I) {
        this.joints.remove(A.handle, this.islands, this.bodies, I);
    }, g.prototype.forEachCollider = function(A) {
        this.colliders.forEachCollider(A);
    }, g.prototype.forEachColliderHandle = function(A) {
        this.colliders.forEachColliderHandle(A);
    }, g.prototype.forEachRigidBody = function(A) {
        this.bodies.forEachRigidBody(A);
    }, g.prototype.forEachRigidBodyHandle = function(A) {
        this.bodies.forEachRigidBodyHandle(A);
    }, g.prototype.forEachActiveRigidBody = function(A) {
        this.bodies.forEachActiveRigidBody(this.islands, A);
    }, g.prototype.forEachActiveRigidBodyHandle = function(A) {
        this.islands.forEachActiveRigidBodyHandle(A);
    }, g.prototype.castRay = function(A, I, C, Q) {
        return this.queryPipeline.castRay(this.colliders, A, I, C, Q);
    }, g.prototype.castRayAndGetNormal = function(A, I, C, Q) {
        return this.queryPipeline.castRayAndGetNormal(this.colliders, A, I, C, Q);
    }, g.prototype.intersectionsWithRay = function(A, I, C, Q, E) {
        this.queryPipeline.intersectionsWithRay(this.colliders, A, I, C, Q, E);
    }, g.prototype.intersectionWithShape = function(A, I, C, Q) {
        return this.queryPipeline.intersectionWithShape(this.colliders, A, I, C, Q);
    }, g.prototype.projectPoint = function(A, I, C) {
        return this.queryPipeline.projectPoint(this.colliders, A, I, C);
    }, g.prototype.intersectionsWithPoint = function(A, I, C) {
        this.queryPipeline.intersectionsWithPoint(this.colliders, A, I, C);
    }, g.prototype.castShape = function(A, I, C, Q, E, i) {
        return this.queryPipeline.castShape(this.colliders, A, I, C, Q, E, i);
    }, g.prototype.intersectionsWithShape = function(A, I, C, Q, E) {
        this.queryPipeline.intersectionsWithShape(this.colliders, A, I, C, Q, E);
    }, g.prototype.collidersWithAabbIntersectingAabb = function(A, I, C) {
        this.queryPipeline.collidersWithAabbIntersectingAabb(A, I, C);
    }, g.prototype.contactsWith = function(A, I) {
        this.narrowPhase.contactsWith(A, I);
    }, g.prototype.intersectionsWith = function(A, I) {
        this.narrowPhase.intersectionsWith(A, I);
    }, g.prototype.contactPair = function(A, I, C) {
        this.narrowPhase.contactPair(A, I, C);
    }, g.prototype.intersectionPair = function(A, I) {
        return this.narrowPhase.intersectionPair(A, I);
    }, g;
}();
(function(g) {
    g[g.INTERSECTION_EVENTS = 1] = "INTERSECTION_EVENTS", g[g.CONTACT_EVENTS = 2] = "CONTACT_EVENTS";
})(YA || (YA = {
}));
var pA, lA, rI = function() {
    function g(A, I) {
        this.raw = I || new V(A);
    }
    return g.prototype.free = function() {
        this.raw.free(), this.raw = void 0;
    }, g.prototype.drainContactEvents = function(A) {
        this.raw.drainContactEvents(A);
    }, g.prototype.drainIntersectionEvents = function(A) {
        this.raw.drainIntersectionEvents(A);
    }, g.prototype.clear = function() {
        this.raw.clear();
    }, g;
}();
(function(g) {
    g[g.FILTER_CONTACT_PAIRS = 1] = "FILTER_CONTACT_PAIRS", g[g.FILTER_INTERSECTION_PAIRS = 2] = "FILTER_INTERSECTION_PAIRS";
})(pA || (pA = {
})), (function(g) {
    g[g.EMPTY = 0] = "EMPTY", g[g.COMPUTE_IMPULSE = 1] = "COMPUTE_IMPULSE";
})(lA || (lA = {
}));
for(KI = {
    byteLength: function(g) {
        var A = UI(g), I = A[0], C = A[1];
        return 3 * (I + C) / 4 - C;
    },
    toByteArray: function(g) {
        var A, I, C = UI(g), Q = C[0], E = C[1], i = new aI(function(S, h, a) {
            return 3 * (h + a) / 4 - a;
        }(0, Q, E)), D = 0, k = E > 0 ? Q - 4 : Q;
        for(I = 0; I < k; I += 4)A = p[g.charCodeAt(I)] << 18 | p[g.charCodeAt(I + 1)] << 12 | p[g.charCodeAt(I + 2)] << 6 | p[g.charCodeAt(I + 3)], i[D++] = A >> 16 & 255, i[D++] = A >> 8 & 255, i[D++] = 255 & A;
        return E === 2 && (A = p[g.charCodeAt(I)] << 2 | p[g.charCodeAt(I + 1)] >> 4, i[D++] = 255 & A), E === 1 && (A = p[g.charCodeAt(I)] << 10 | p[g.charCodeAt(I + 1)] << 4 | p[g.charCodeAt(I + 2)] >> 2, i[D++] = A >> 8 & 255, i[D++] = 255 & A), i;
    },
    fromByteArray: function(g) {
        for(var A, I = g.length, C = I % 3, Q = [], E = 16383, i = 0, D = I - C; i < D; i += E)Q.push(eI(g, i, i + E > D ? D : i + E));
        return C === 1 ? (A = g[I - 1], Q.push(n[A >> 2] + n[A << 4 & 63] + "==")) : C === 2 && (A = (g[I - 2] << 8) + g[I - 1], Q.push(n[A >> 10] + n[A >> 4 & 63] + n[A << 2 & 63] + "=")), Q.join("");
    }
}, n = [], p = [], aI = typeof Uint8Array != "undefined" ? Uint8Array : Array, UA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", m = 0, JI = UA.length; m < JI; ++m)n[m] = UA[m], p[UA.charCodeAt(m)] = m;
var KI, n, p, aI, UA, m, JI;
function UI(g) {
    var A = g.length;
    if (A % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var I = g.indexOf("=");
    return I === -1 && (I = A), [
        I,
        I === A ? 0 : 4 - I % 4
    ];
}
function eI(g, A, I) {
    for(var C, Q, E = [], i = A; i < I; i += 3)C = (g[i] << 16 & 16711680) + (g[i + 1] << 8 & 65280) + (255 & g[i + 2]), E.push(n[(Q = C) >> 18 & 63] + n[Q >> 12 & 63] + n[Q >> 6 & 63] + n[63 & Q]);
    return E.join("");
}
function dI() {
    return LI(this, void 0, void 0, function() {
        return tI(this, function(g) {
            switch(g.label){
                case 0:
                    return [
                        4,
                    ];
                case 1:
                    return g.sent(), [
                        2
                    ];
            }
        });
    });
}
function fI() {
    return (function() {
        try {
            let I = B.__wbindgen_add_to_stack_pointer(-16);
            B.version(I);
            var g = y()[I / 4 + 0], A = y()[I / 4 + 1];
            return CA(g, A);
        } finally{
            B.__wbindgen_add_to_stack_pointer(16), B.__wbindgen_free(g, A);
        }
    })();
}
p["-".charCodeAt(0)] = 62, p["_".charCodeAt(0)] = 63;
Object.freeze({
    __proto__: null,
    version: fI,
    Vector2: xA,
    VectorOps: w,
    RotationOps: H,
    get RigidBodyType () {
        return j;
    },
    RigidBody: FA,
    RigidBodyDesc: YI,
    RigidBodySet: WA,
    IntegrationParameters: XA,
    get JointType () {
        return l;
    },
    get SpringModel () {
        return RA;
    },
    Joint: aA,
    UnitJoint: MA,
    FixedJoint: jA,
    PrismaticJoint: mA,
    BallJoint: vA,
    JointParams: HI,
    JointSet: VA,
    get CoefficientCombineRule () {
        return AA;
    },
    CCDSolver: uA,
    IslandManager: PA,
    BroadPhase: zA,
    NarrowPhase: _A,
    TempContactManifold: $A,
    get ShapeType () {
        return qA;
    },
    Ball: AI,
    Cuboid: II,
    RoundCuboid: gI,
    Capsule: CI,
    Segment: BI,
    Triangle: QI,
    RoundTriangle: EI,
    Polyline: iI,
    TriMesh: oI,
    ConvexPolygon: sA,
    RoundConvexPolygon: cA,
    Heightfield: DI,
    get ActiveCollisionTypes () {
        return JA;
    },
    Collider: LA,
    ColliderDesc: pI,
    ColliderSet: GI,
    Ray: lI,
    RayColliderIntersection: tA,
    RayColliderToi: wI,
    PointColliderProjection: kI,
    ShapeColliderTOI: hI,
    World: FI,
    PhysicsPipeline: SI,
    SerializationPipeline: HA,
    get ActiveEvents () {
        return YA;
    },
    EventQueue: rI,
    get ActiveHooks () {
        return pA;
    },
    get SolverFlags () {
        return lA;
    },
    init: dI
});
await dI();
function toHexColor(init) {
    if (typeof init == "number") {
        return "#" + init.toString(16).padStart(6, "0");
    } else {
        return init;
    }
}
class WallMap {
    width;
    walls = [];
    #body;
    constructor(width){
        this.width = width;
    }
    addLines(...lines) {
        this.walls.push(lines);
    }
    render = (ctx1)=>{
        ctx1.strokeStyle = "white";
        ctx1.lineCap = "round";
        ctx1.lineJoin = "round";
        ctx1.lineWidth = this.width;
        for (const wall of this.walls){
            ctx1.beginPath();
            for (const { x , y: y2  } of wall){
                ctx1.lineTo(x, y2);
            }
            ctx1.stroke();
        }
    };
    appendTo(world1) {
        this.#body = world1.createRigidBody(YI.newStatic());
        for (const wall of this.walls){
            const n1 = wall.length;
            let last = wall[0];
            for(let i = 1; i < n1; i++){
                const curr = wall[i];
                const mid = [
                    (last.x + curr.x) / 2,
                    (last.y + curr.y) / 2
                ];
                const rot = Math.atan2(last.x - curr.x, last.y - curr.y);
                const half = Math.sqrt((last.x - curr.x) ** 2 + (last.y - curr.y) ** 2) / 2;
                const desc = pI.capsule(half, this.width / 2).setTranslation(...mid).setRotation(-rot).setRestitutionCombineRule(AA.Max);
                world1.createCollider(desc, this.#body.handle);
                last = curr;
            }
        }
    }
    removeFrom(world2) {
        world2.removeRigidBody(this.#body);
    }
}
class Circle {
    #color;
    density;
    #initial_translation;
    #initial_radius;
    #body;
    #collider;
    get color() {
        return this.#color;
    }
    set color(value) {
        this.#color = toHexColor(value);
    }
    get translation() {
        return this.#body.translation();
    }
    set translation(value) {
        this.#body.setTranslation(value, true);
    }
    get radius() {
        return this.#collider.radius();
    }
    set radius(value) {
        this.#collider.setShape(new AI(value));
    }
    constructor(translation, radius, color = "#FFFFFF", density = Math.PI){
        this.#initial_translation = translation;
        this.#initial_radius = radius;
        this.#color = toHexColor(color);
        this.density = density;
    }
    render = (ctx2)=>{
        ctx2.fillStyle = this.#color;
        ctx2.beginPath();
        const { x , y: y3  } = this.translation;
        ctx2.arc(x, y3, this.radius, 0, 2 * Math.PI, false);
        ctx2.fill();
    };
    appendTo(world3) {
        this.#body = world3.createRigidBody(YI.newDynamic().setTranslation(this.#initial_translation.x, this.#initial_translation.y).setCcdEnabled(true));
        const desc = pI.ball(this.#initial_radius).setDensity(this.density).setRestitution(0.8);
        this.#collider = world3.createCollider(desc, this.#body.handle);
    }
    removeFrom(world4) {
        world4.removeRigidBody(this.#body);
    }
}
let camera = new Camera();
camera.start();
camera.size = 20;
camera.origin = {
    x: 10,
    y: 10
};
window.camera = camera;
let world = new FI({
    x: 0,
    y: 10
});
const map = new WallMap(0.25);
map.addLines({
    x: 2,
    y: 2
}, {
    x: 2,
    y: 18
}, {
    x: 18,
    y: 15
}, {
    x: 18,
    y: 2
});
map.addLines({
    x: 5,
    y: 10
}, {
    x: 15,
    y: 11
});
map.appendTo(world);
const balls = [];
{
    const ball = new Circle({
        x: 10,
        y: 5
    }, 0.5, 65280);
    ball.appendTo(world);
    balls.push(ball);
}camera.on("click", (pos)=>{
    const ball = new Circle(pos, 0.5, 16711935);
    ball.appendTo(world);
    balls.push(ball);
});
let gameLoop = ()=>{
    world.step();
    camera.apply();
    map.render(ctx);
    for (const ball of balls){
        ball.render(ctx);
    }
    requestAnimationFrame(gameLoop);
};
gameLoop();