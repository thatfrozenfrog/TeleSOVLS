var SolveBoard = (() => {
  var _scriptName = globalThis.document?.currentScript?.src;
  return async function (moduleArg = {}) {
    var moduleRtn;
    var Module = moduleArg;
    var ENVIRONMENT_IS_WEB = true;
    var ENVIRONMENT_IS_WORKER = false;
    var arguments_ = [];
    var thisProgram = "./this.program";
    var scriptDirectory = "";
    var readAsync;
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      try {
        scriptDirectory = new URL(".", _scriptName).href;
      } catch {}
      {
        readAsync = async (url) => {
          var response = await fetch(url, { credentials: "same-origin" });
          if (response.ok) {
            return response.arrayBuffer();
          }
          throw new Error(response.status + " : " + response.url);
        };
      }
    } else {
    }
    var out = console.log.bind(console);
    var err = console.error.bind(console);
    var wasmBinary;
    var WebAssembly = {
      Memory: function (opts) {
        this.buffer = new ArrayBuffer(opts["initial"] * 65536);
      },
      Module: function (binary) {},
      Instance: function (module, info) {
        this.exports = // EMSCRIPTEN_START_ASM
        (function instantiate(ia) {
          var a;
          var b = new Uint8Array(123);
          for (var c = 25; c >= 0; --c) {
            b[48 + c] = 52 + c;
            b[65 + c] = c;
            b[97 + c] = 26 + c;
          }
          b[43] = 62;
          b[47] = 63;
          function i(j, k, l) {
            var d,
              e,
              c = 0,
              f = k,
              g = l.length,
              h = k + ((g * 3) >> 2) - (l[g - 2] == "=") - (l[g - 1] == "=");
            for (; c < g; c += 4) {
              d = b[l.charCodeAt(c + 1)];
              e = b[l.charCodeAt(c + 2)];
              j[f++] = (b[l.charCodeAt(c)] << 2) | (d >> 4);
              if (f < h) j[f++] = (d << 4) | (e >> 2);
              if (f < h) j[f++] = (e << 6) | b[l.charCodeAt(c + 3)];
            }
            return j;
          }
          function m(n) {
            i(
              a,
              1024,
              "aW5maW5pdHkARmVicnVhcnkASmFudWFyeQBKdWx5AFRodXJzZGF5AFR1ZXNkYXkAV2VkbmVzZGF5AFNhdHVyZGF5AFN1bmRheQBNb25kYXkARnJpZGF5AE1heQAlbS8lZC8leQAtKyAgIDBYMHgALTBYKzBYIDBYLTB4KzB4IDB4AE5vdgBUaHUAQXVndXN0AFJpZ2h0AE9jdABTYXQAJXM6JWQ6ICVzAEFwcgB2ZWN0b3IAbW9uZXlfZ2V0IGVycm9yAE9jdG9iZXIATm92ZW1iZXIAU2VwdGVtYmVyAERlY2VtYmVyAGlvc19iYXNlOjpjbGVhcgBNYXIAL2Vtc2RrL2Vtc2NyaXB0ZW4vc3lzdGVtL2xpYi9saWJjeHhhYmkvc3JjL3ByaXZhdGVfdHlwZWluZm8uY3BwAFNlcAAlSTolTTolUyAlcABTdW4ASnVuAHN0ZDo6ZXhjZXB0aW9uAE1vbgBuYW4ASmFuAEp1bABsbABBcHJpbABGcmkAYmFkX2FycmF5X25ld19sZW5ndGgATWFyY2gAQXVnAGJhc2ljX3N0cmluZwBpbmYAJS4wTGYAJUxmAHRydWUAVHVlAGZhbHNlAEp1bmUAJTAqbGxkACUqbGxkACslbGxkACUrLjRsZABsb2NhbGUgbm90IHN1cHBvcnRlZABXZWQAJVktJW0tJWQAc3RkOjpiYWRfYWxsb2MARGVjAEZlYgAlYSAlYiAlZCAlSDolTTolUyAlWQBQT1NJWAAlSDolTTolUwBOQU4AUE0AQU0AJUg6JU0ATENfQUxMAEFTQ0lJAExBTkcASU5GAEMAY2F0Y2hpbmcgYSBjbGFzcyB3aXRob3V0IGFuIG9iamVjdD8AMDEyMzQ1Njc4OQBDLlVURi04AC4ALQAobnVsbCkAJQBQdXJlIHZpcnR1YWwgZnVuY3Rpb24gY2FsbGVkIQAKAAkAAAAAAABECAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAAIAAAAAAAAAIAIAAATAAAAFAAAAPj////4////gAgAABUAAAAWAAAAIAcAADQHAAAEAAAAAAAAAMgIAAAXAAAAGAAAAPz////8////yAgAABkAAAAaAAAAUAcAAGQHAAAMAAAAAAAAAGAJAAAbAAAAHAAAAAQAAAD4////YAkAAB0AAAAeAAAA9P////T///9gCQAAHwAAACAAAACABwAAHAkAADAJAABECQAAWAkAAKgHAACUBwAAAAAAALAJAAAhAAAAIgAAAAcAAAAIAAAAIwAAACQAAAALAAAADAAAAA0AAAAlAAAADwAAACYAAAARAAAAJwAAAMA5AAAYCAAAVAsAAE5TdDNfXzI5YmFzaWNfaW9zSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAAAAmDkAAEwIAABOU3QzX18yMTViYXNpY19zdHJlYW1idWZJY05TXzExY2hhcl90cmFpdHNJY0VFRUUAAAAAHDoAAJgIAAAAAAAAAQAAAAwIAAAD9P//TlN0M19fMjEzYmFzaWNfaXN0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQAAHDoAAOAIAAAAAAAAAQAAAAwIAAAD9P//TlN0M19fMjEzYmFzaWNfb3N0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQAADAAAAAAAAACACAAAEwAAABQAAAD0////9P///4AIAAAVAAAAFgAAAAQAAAAAAAAAyAgAABcAAAAYAAAA/P////z////ICAAAGQAAABoAAAAcOgAAgAkAAAMAAAACAAAAgAgAAAIAAADICAAAAggAAE5TdDNfXzIxNGJhc2ljX2lvc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAMA5AAC8CQAARAgAAE5TdDNfXzIxNWJhc2ljX3N0cmluZ2J1ZkljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFAAAAQAAAAAAAAADwCgAAKAAAACkAAAA4AAAA+P////AKAAAqAAAAKwAAAMD////A////8AoAACwAAAAtAAAADAoAAHAKAACsCgAAwAoAANQKAADoCgAAmAoAAIQKAAA0CgAAIAoAAEAAAAAAAAAAYAkAABsAAAAcAAAAOAAAAPj///9gCQAAHQAAAB4AAADA////wP///2AJAAAfAAAAIAAAAEAAAAAAAAAAgAgAABMAAAAUAAAAwP///8D///+ACAAAFQAAABYAAAA4AAAAAAAAAMgIAAAXAAAAGAAAAMj////I////yAgAABkAAAAaAAAAwDkAAPwKAABgCQAATlN0M19fMjE4YmFzaWNfc3RyaW5nc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUUAAAAAAAAAAFQLAAAuAAAALwAAAJg5AABcCwAATlN0M19fMjhpb3NfYmFzZUUAAADeEgSVAAAAAP///////////////3ALAAAUAAAAQy5VVEYtOA==",
            );
            i(a, 3008, "hAs=");
            i(
              a,
              3040,
              "AgAAwAMAAMAEAADABQAAwAYAAMAHAADACAAAwAkAAMAKAADACwAAwAwAAMANAADADgAAwA8AAMAQAADAEQAAwBIAAMATAADAFAAAwBUAAMAWAADAFwAAwBgAAMAZAADAGgAAwBsAAMAcAADAHQAAwB4AAMAfAADAAAAAswEAAMMCAADDAwAAwwQAAMMFAADDBgAAwwcAAMMIAADDCQAAwwoAAMMLAADDDAAAww0AANMOAADDDwAAwwAADLsBAAzDAgAMwwMADMMEAAzbAAAAANF0ngBXnb0qgHBSD///PicKAAAAZAAAAOgDAAAQJwAAoIYBAEBCDwCAlpgAAOH1BRgAAAA1AAAAcQAAAGv////O+///kr///wAAAAAAAAAA/////////////////////////////////////////////////////////////////wABAgMEBQYHCAn/////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP///////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAQIEBwMGBQAAAAAAAAAZAAsAGRkZAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABkACgoZGRkDCgcAAQAJCxgAAAkGCwAACwAGGQAAABkZGQ==",
            );
            i(a, 3681, "DgAAAAAAAAAAGQALDRkZGQANAAACAAkOAAAACQAOAAAO");
            i(a, 3739, "DA==");
            i(a, 3751, "EwAAAAATAAAAAAkMAAAAAAAMAAAM");
            i(a, 3797, "EA==");
            i(a, 3809, "DwAAAAQPAAAAAAkQAAAAAAAQAAAQ");
            i(a, 3855, "Eg==");
            i(a, 3867, "EQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoa");
            i(a, 3922, "GgAAABoaGgAAAAAAAAk=");
            i(a, 3971, "FA==");
            i(a, 3983, "FwAAAAAXAAAAAAkUAAAAAAAUAAAU");
            i(a, 4029, "Fg==");
            i(
              a,
              4041,
              "FQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVGTENfQ1RZUEUAAAAATENfTlVNRVJJQwAATENfVElNRQAAAAAATENfQ09MTEFURQAATENfTU9ORVRBUlkATENfTUVTU0FHRVMAQBI=",
            );
            i(
              a,
              4676,
              "AQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAhAAAAIgAAACMAAAAkAAAAJQAAACYAAAAnAAAAKAAAACkAAAAqAAAAKwAAACwAAAAtAAAALgAAAC8AAAAwAAAAMQAAADIAAAAzAAAANAAAADUAAAA2AAAANwAAADgAAAA5AAAAOgAAADsAAAA8AAAAPQAAAD4AAAA/AAAAQAAAAEEAAABCAAAAQwAAAEQAAABFAAAARgAAAEcAAABIAAAASQAAAEoAAABLAAAATAAAAE0AAABOAAAATwAAAFAAAABRAAAAUgAAAFMAAABUAAAAVQAAAFYAAABXAAAAWAAAAFkAAABaAAAAWwAAAFwAAABdAAAAXgAAAF8AAABgAAAAQQAAAEIAAABDAAAARAAAAEUAAABGAAAARwAAAEgAAABJAAAASgAAAEsAAABMAAAATQAAAE4AAABPAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAAB7AAAAfAAAAH0AAAB+AAAAfw==",
            );
            i(a, 5696, "UBg=");
            i(
              a,
              6228,
              "AQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAhAAAAIgAAACMAAAAkAAAAJQAAACYAAAAnAAAAKAAAACkAAAAqAAAAKwAAACwAAAAtAAAALgAAAC8AAAAwAAAAMQAAADIAAAAzAAAANAAAADUAAAA2AAAANwAAADgAAAA5AAAAOgAAADsAAAA8AAAAPQAAAD4AAAA/AAAAQAAAAGEAAABiAAAAYwAAAGQAAABlAAAAZgAAAGcAAABoAAAAaQAAAGoAAABrAAAAbAAAAG0AAABuAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB0AAAAdQAAAHYAAAB3AAAAeAAAAHkAAAB6AAAAWwAAAFwAAABdAAAAXgAAAF8AAABgAAAAYQAAAGIAAABjAAAAZAAAAGUAAABmAAAAZwAAAGgAAABpAAAAagAAAGsAAABsAAAAbQAAAG4AAABvAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAdgAAAHcAAAB4AAAAeQAAAHoAAAB7AAAAfAAAAH0AAAB+AAAAfw==",
            );
            i(
              a,
              7252,
              "gN4oAIDITQAAp3YAADSeAIASxwCAn+4AAH4XAYBcQAGA6WcBAMiQAQBVuAEu",
            );
            i(
              a,
              7312,
              "U3VuAE1vbgBUdWUAV2VkAFRodQBGcmkAU2F0AFN1bmRheQBNb25kYXkAVHVlc2RheQBXZWRuZXNkYXkAVGh1cnNkYXkARnJpZGF5AFNhdHVyZGF5AEphbgBGZWIATWFyAEFwcgBNYXkASnVuAEp1bABBdWcAU2VwAE9jdABOb3YARGVjAEphbnVhcnkARmVicnVhcnkATWFyY2gAQXByaWwATWF5AEp1bmUASnVseQBBdWd1c3QAU2VwdGVtYmVyAE9jdG9iZXIATm92ZW1iZXIARGVjZW1iZXIAQU0AUE0AJWEgJWIgJWUgJVQgJVkAJW0vJWQvJXkAJUg6JU06JVMAJUk6JU06JVMgJXAAAAAlbS8lZC8leQAwMTIzNDU2Nzg5ACVhICViICVlICVUICVZACVIOiVNOiVTAAAAAABeW3lZXQBeW25OXQB5ZXMAbm8=",
            );
            i(
              a,
              7664,
              "MDEyMzQ1Njc4OWFiY2RlZkFCQ0RFRnhYKy1wUGlJbk4AJUk6JU06JVMgJXAlSDolTQ==",
            );
            i(
              a,
              7728,
              "JQAAAG0AAAAvAAAAJQAAAGQAAAAvAAAAJQAAAHkAAAAlAAAAWQAAAC0AAAAlAAAAbQAAAC0AAAAlAAAAZAAAACUAAABJAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAIAAAACUAAABwAAAAAAAAACUAAABIAAAAOgAAACUAAABN",
            );
            i(
              a,
              7872,
              "JQAAAEgAAAA6AAAAJQAAAE0AAAA6AAAAJQAAAFMAAAAAAAAAICgAAEUAAABGAAAARwAAAAAAAACEKAAASAAAAEkAAABHAAAASgAAAEsAAABMAAAATQAAAE4AAABPAAAAUAAAAFE=",
            );
            i(
              a,
              7984,
              "BAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABQIAAAUAAAAFAAAABQAAAAUAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAADAgAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAQgEAAEIBAABCAQAAQgEAAEIBAABCAQAAQgEAAEIBAABCAQAAQgEAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAAAqAQAAKgEAACoBAAAqAQAAKgEAACoBAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAADIBAAAyAQAAMgEAADIBAAAyAQAAMgEAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAggAAAIIAAACCAAAAggAAAAQ=",
            );
            i(
              a,
              9012,
              "3CcAAFIAAABTAAAARwAAAFQAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAAAAAAAAuCgAAFsAAABcAAAARwAAAF0AAABeAAAAXwAAAGAAAABhAAAAAAAAANwoAABiAAAAYwAAAEcAAABkAAAAZQAAAGYAAABnAAAAaAAAAHQAAAByAAAAdQAAAGUAAAAAAAAAZgAAAGEAAABsAAAAcwAAAGUAAAAAAAAAJQAAAG0AAAAvAAAAJQAAAGQAAAAvAAAAJQAAAHkAAAAAAAAAJQAAAEgAAAA6AAAAJQAAAE0AAAA6AAAAJQAAAFMAAAAAAAAAJQAAAGEAAAAgAAAAJQAAAGIAAAAgAAAAJQAAAGQAAAAgAAAAJQAAAEgAAAA6AAAAJQAAAE0AAAA6AAAAJQAAAFMAAAAgAAAAJQAAAFkAAAAAAAAAJQAAAEkAAAA6AAAAJQAAAE0AAAA6AAAAJQAAAFMAAAAgAAAAJQAAAHA=",
            );
            i(
              a,
              9388,
              "vCQAAGkAAABqAAAARwAAAMA5AADIJAAADDkAAE5TdDNfXzI2bG9jYWxlNWZhY2V0RQAAAAAAAAAkJQAAaQAAAGsAAABHAAAAbAAAAG0AAABuAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB0AAAAdQAAAHYAAAB3AAAAHDoAAEQlAAAAAAAAAgAAALwkAAACAAAAWCUAAAIAAABOU3QzX18yNWN0eXBlSXdFRQAAAJg5AABgJQAATlN0M19fMjEwY3R5cGVfYmFzZUUAAAAAAAAAAKglAABpAAAAeAAAAEcAAAB5AAAAegAAAHsAAAB8AAAAfQAAAH4AAAB/AAAAHDoAAMglAAAAAAAAAgAAALwkAAACAAAA7CUAAAIAAABOU3QzX18yN2NvZGVjdnRJY2MxMV9fbWJzdGF0ZV90RUUAAACYOQAA9CUAAE5TdDNfXzIxMmNvZGVjdnRfYmFzZUUAAAAAAAA8JgAAaQAAAIAAAABHAAAAgQAAAIIAAACDAAAAhAAAAIUAAACGAAAAhwAAABw6AABcJgAAAAAAAAIAAAC8JAAAAgAAAOwlAAACAAAATlN0M19fMjdjb2RlY3Z0SURzYzExX19tYnN0YXRlX3RFRQAAAAAAALAmAABpAAAAiAAAAEcAAACJAAAAigAAAIsAAACMAAAAjQAAAI4AAACPAAAAHDoAANAmAAAAAAAAAgAAALwkAAACAAAA7CUAAAIAAABOU3QzX18yN2NvZGVjdnRJRHNEdTExX19tYnN0YXRlX3RFRQAAAAAAJCcAAGkAAACQAAAARwAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAAAcOgAARCcAAAAAAAACAAAAvCQAAAIAAADsJQAAAgAAAE5TdDNfXzI3Y29kZWN2dElEaWMxMV9fbWJzdGF0ZV90RUUAAAAAAACYJwAAaQAAAJgAAABHAAAAmQAAAJoAAACbAAAAnAAAAJ0AAACeAAAAnwAAABw6AAC4JwAAAAAAAAIAAAC8JAAAAgAAAOwlAAACAAAATlN0M19fMjdjb2RlY3Z0SURpRHUxMV9fbWJzdGF0ZV90RUUAHDoAAPwnAAAAAAAAAgAAALwkAAACAAAA7CUAAAIAAABOU3QzX18yN2NvZGVjdnRJd2MxMV9fbWJzdGF0ZV90RUUAAADAOQAALCgAALwkAABOU3QzX18yNmxvY2FsZTVfX2ltcEUAAADAOQAAUCgAALwkAABOU3QzX18yN2NvbGxhdGVJY0VFAMA5AABwKAAAvCQAAE5TdDNfXzI3Y29sbGF0ZUl3RUUAHDoAAKQoAAAAAAAAAgAAALwkAAACAAAAWCUAAAIAAABOU3QzX18yNWN0eXBlSWNFRQAAAMA5AADEKAAAvCQAAE5TdDNfXzI4bnVtcHVuY3RJY0VFAAAAAMA5AADoKAAAvCQAAE5TdDNfXzI4bnVtcHVuY3RJd0VFAAAAAAAAAABEKAAAoAAAAKEAAABHAAAAogAAAKMAAACkAAAAAAAAAGQoAAClAAAApgAAAEcAAACnAAAAqAAAAKkAAAAAAAAAgCkAAGkAAACqAAAARwAAAKsAAACsAAAArQAAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAHDoAAKApAAAAAAAAAgAAALwkAAACAAAA5CkAAAAAAABOU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUVFABw6AAD8KQAAAAAAAAEAAAAUKgAAAAAAAE5TdDNfXzI5X19udW1fZ2V0SWNFRQAAAJg5AAAcKgAATlN0M19fMjE0X19udW1fZ2V0X2Jhc2VFAAAAAAAAAAB4KgAAaQAAALYAAABHAAAAtwAAALgAAAC5AAAAugAAALsAAAC8AAAAvQAAAL4AAAC/AAAAwAAAAMEAAAAcOgAAmCoAAAAAAAACAAAAvCQAAAIAAADcKgAAAAAAAE5TdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUAHDoAAPQqAAAAAAAAAQAAABQqAAAAAAAATlN0M19fMjlfX251bV9nZXRJd0VFAAAAAAAAAEArAABpAAAAwgAAAEcAAADDAAAAxAAAAMUAAADGAAAAxwAAAMgAAADJAAAAygAAABw6AABgKwAAAAAAAAIAAAC8JAAAAgAAAKQrAAAAAAAATlN0M19fMjdudW1fcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQAcOgAAvCsAAAAAAAABAAAA1CsAAAAAAABOU3QzX18yOV9fbnVtX3B1dEljRUUAAACYOQAA3CsAAE5TdDNfXzIxNF9fbnVtX3B1dF9iYXNlRQAAAAAAAAAALCwAAGkAAADLAAAARwAAAMwAAADNAAAAzgAAAM8AAADQAAAA0QAAANIAAADTAAAAHDoAAEwsAAAAAAAAAgAAALwkAAACAAAAkCwAAAAAAABOU3QzX18yN251bV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFABw6AACoLAAAAAAAAAEAAADUKwAAAAAAAE5TdDNfXzI5X19udW1fcHV0SXdFRQAAAAAAAAAULQAA1AAAANUAAABHAAAA1gAAANcAAADYAAAA2QAAANoAAADbAAAA3AAAAPj///8ULQAA3QAAAN4AAADfAAAA4AAAAOEAAADiAAAA4wAAABw6AAA8LQAAAAAAAAMAAAC8JAAAAgAAAIQtAAACAAAAoC0AAAAIAABOU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQAAAACYOQAAjC0AAE5TdDNfXzI5dGltZV9iYXNlRQAAmDkAAKgtAABOU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUljRUUAAAAAAAAAIC4AAOQAAADlAAAARwAAAOYAAADnAAAA6AAAAOkAAADqAAAA6wAAAOwAAAD4////IC4AAO0AAADuAAAA7wAAAPAAAADxAAAA8gAAAPMAAAAcOgAASC4AAAAAAAADAAAAvCQAAAIAAACELQAAAgAAAJAuAAAACAAATlN0M19fMjh0aW1lX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUAAAAAmDkAAJguAABOU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUl3RUUAAAAAAAAA1C4AAPQAAAD1AAAARwAAAPYAAAAcOgAA9C4AAAAAAAACAAAAvCQAAAIAAAA8LwAAAAgAAE5TdDNfXzI4dGltZV9wdXRJY05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUVFAAAAAJg5AABELwAATlN0M19fMjEwX190aW1lX3B1dEUAAAAAAAAAAHQvAAD3AAAA+AAAAEcAAAD5AAAAHDoAAJQvAAAAAAAAAgAAALwkAAACAAAAPC8AAAAIAABOU3QzX18yOHRpbWVfcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQAAAAAAAAAAFDAAAGkAAAD6AAAARwAAAPsAAAD8AAAA/QAAAP4AAAD/AAAAAAEAAAEBAAACAQAAAwEAABw6AAA0MAAAAAAAAAIAAAC8JAAAAgAAAFAwAAACAAAATlN0M19fMjEwbW9uZXlwdW5jdEljTGIwRUVFAJg5AABYMAAATlN0M19fMjEwbW9uZXlfYmFzZUUAAAAAAAAAAKgwAABpAAAABAEAAEcAAAAFAQAABgEAAAcBAAAIAQAACQEAAAoBAAALAQAADAEAAA0BAAAcOgAAyDAAAAAAAAACAAAAvCQAAAIAAABQMAAAAgAAAE5TdDNfXzIxMG1vbmV5cHVuY3RJY0xiMUVFRQAAAAAAHDEAAGkAAAAOAQAARwAAAA8BAAAQAQAAEQEAABIBAAATAQAAFAEAABUBAAAWAQAAFwEAABw6AAA8MQAAAAAAAAIAAAC8JAAAAgAAAFAwAAACAAAATlN0M19fMjEwbW9uZXlwdW5jdEl3TGIwRUVFAAAAAACQMQAAaQAAABgBAABHAAAAGQEAABoBAAAbAQAAHAEAAB0BAAAeAQAAHwEAACABAAAhAQAAHDoAALAxAAAAAAAAAgAAALwkAAACAAAAUDAAAAIAAABOU3QzX18yMTBtb25leXB1bmN0SXdMYjFFRUUAAAAAAOgxAABpAAAAIgEAAEcAAAAjAQAAJAEAABw6AAAIMgAAAAAAAAIAAAC8JAAAAgAAAFAyAAAAAAAATlN0M19fMjltb25leV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUVFAAAAmDkAAFgyAABOU3QzX18yMTFfX21vbmV5X2dldEljRUUAAAAAAAAAAJAyAABpAAAAJQEAAEcAAAAmAQAAJwEAABw6AACwMgAAAAAAAAIAAAC8JAAAAgAAAPgyAAAAAAAATlN0M19fMjltb25leV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAAAAmDkAAAAzAABOU3QzX18yMTFfX21vbmV5X2dldEl3RUUAAAAAAAAAADgzAABpAAAAKAEAAEcAAAApAQAAKgEAABw6AABYMwAAAAAAAAIAAAC8JAAAAgAAAKAzAAAAAAAATlN0M19fMjltb25leV9wdXRJY05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUVFAAAAmDkAAKgzAABOU3QzX18yMTFfX21vbmV5X3B1dEljRUUAAAAAAAAAAOAzAABpAAAAKwEAAEcAAAAsAQAALQEAABw6AAAANAAAAAAAAAIAAAC8JAAAAgAAAEg0AAAAAAAATlN0M19fMjltb25leV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAAAAmDkAAFA0AABOU3QzX18yMTFfX21vbmV5X3B1dEl3RUUAAAAAAAAAAIw0AABpAAAALgEAAEcAAAAvAQAAMAEAADEBAAAcOgAArDQAAAAAAAACAAAAvCQAAAIAAADENAAAAgAAAE5TdDNfXzI4bWVzc2FnZXNJY0VFAAAAAJg5AADMNAAATlN0M19fMjEzbWVzc2FnZXNfYmFzZUUAAAAAAAQ1AABpAAAAMgEAAEcAAAAzAQAANAEAADUBAAAcOgAAJDUAAAAAAAACAAAAvCQAAAIAAADENAAAAgAAAE5TdDNfXzI4bWVzc2FnZXNJd0VFAAAAAFMAAAB1AAAAbgAAAGQAAABhAAAAeQAAAAAAAABNAAAAbwAAAG4AAABkAAAAYQAAAHkAAAAAAAAAVAAAAHUAAABlAAAAcwAAAGQAAABhAAAAeQAAAAAAAABXAAAAZQAAAGQAAABuAAAAZQAAAHMAAABkAAAAYQAAAHkAAAAAAAAAVAAAAGgAAAB1AAAAcgAAAHMAAABkAAAAYQAAAHkAAAAAAAAARgAAAHIAAABpAAAAZAAAAGEAAAB5AAAAAAAAAFMAAABhAAAAdAAAAHUAAAByAAAAZAAAAGEAAAB5AAAAAAAAAFMAAAB1AAAAbgAAAAAAAABNAAAAbwAAAG4AAAAAAAAAVAAAAHUAAABlAAAAAAAAAFcAAABlAAAAZAAAAAAAAABUAAAAaAAAAHUAAAAAAAAARgAAAHIAAABpAAAAAAAAAFMAAABhAAAAdAAAAAAAAABKAAAAYQAAAG4AAAB1AAAAYQAAAHIAAAB5AAAAAAAAAEYAAABlAAAAYgAAAHIAAAB1AAAAYQAAAHIAAAB5AAAAAAAAAE0AAABhAAAAcgAAAGMAAABoAAAAAAAAAEEAAABwAAAAcgAAAGkAAABsAAAAAAAAAE0AAABhAAAAeQAAAAAAAABKAAAAdQAAAG4AAABlAAAAAAAAAEoAAAB1AAAAbAAAAHkAAAAAAAAAQQAAAHUAAABnAAAAdQAAAHMAAAB0AAAAAAAAAFMAAABlAAAAcAAAAHQAAABlAAAAbQAAAGIAAABlAAAAcgAAAAAAAABPAAAAYwAAAHQAAABvAAAAYgAAAGUAAAByAAAAAAAAAE4AAABvAAAAdgAAAGUAAABtAAAAYgAAAGUAAAByAAAAAAAAAEQAAABlAAAAYwAAAGUAAABtAAAAYgAAAGUAAAByAAAAAAAAAEoAAABhAAAAbgAAAAAAAABGAAAAZQAAAGIAAAAAAAAATQAAAGEAAAByAAAAAAAAAEEAAABwAAAAcgAAAAAAAABKAAAAdQAAAG4AAAAAAAAASgAAAHUAAABsAAAAAAAAAEEAAAB1AAAAZwAAAAAAAABTAAAAZQAAAHAAAAAAAAAATwAAAGMAAAB0AAAAAAAAAE4AAABvAAAAdgAAAAAAAABEAAAAZQAAAGMAAAAAAAAAQQAAAE0AAAAAAAAAUAAAAE0=",
            );
            i(
              a,
              14516,
              "oC0AAN0AAADeAAAA3wAAAOAAAADhAAAA4gAAAOMAAAAAAAAAkC4AAO0AAADuAAAA7wAAAPAAAADxAAAA8gAAAPMAAAAAAAAADDkAADYBAAA3AQAAOAEAAJg5AAAUOQAATlN0M19fMjE0X19zaGFyZWRfY291bnRFAAAAAMA5AAA8OQAAbDsAAE4xMF9fY3h4YWJpdjExNl9fc2hpbV90eXBlX2luZm9FAAAAAMA5AABsOQAAMDkAAE4xMF9fY3h4YWJpdjExN19fY2xhc3NfdHlwZV9pbmZvRQAAAAAAAABgOQAAOQEAADoBAAA7AQAAPAEAAD0BAAA+AQAAPwEAAEABAAAAAAAA4DkAADkBAABBAQAAOwEAADwBAAA9AQAAQgEAAEMBAABEAQAAwDkAAOw5AABgOQAATjEwX19jeHhhYml2MTIwX19zaV9jbGFzc190eXBlX2luZm9FAAAAAAAAAAA8OgAAOQEAAEUBAAA7AQAAPAEAAD0BAABGAQAARwEAAEgBAADAOQAASDoAAGA5AABOMTBfX2N4eGFiaXYxMjFfX3ZtaV9jbGFzc190eXBlX2luZm9FAAAAAAAAAMQ6AAACAAAASQEAAEoBAAAAAAAA4DoAAAIAAABLAQAATAEAAAAAAACsOgAAAgAAAE0BAABOAQAAmDkAALQ6AABTdDlleGNlcHRpb24AAAAAwDkAANA6AACsOgAAU3Q5YmFkX2FsbG9jAAAAAMA5AADsOgAAxDoAAFN0MjBiYWRfYXJyYXlfbmV3X2xlbmd0aAAAAAAAAAAAHDsAAAMAAABPAQAAUAEAAMA5AAAoOwAArDoAAFN0MTFsb2dpY19lcnJvcgAAAAAATDsAAAMAAABRAQAAUAEAAMA5AABYOwAAHDsAAFN0MTJsZW5ndGhfZXJyb3IAAAAAmDkAAHQ7AABTdDl0eXBlX2luZm8=",
            );
            i(
              a,
              15254,
              "MEAAAAAAAABAQAAAAAAAAFBAAAAAAAAAYEAAAAAAAABQQAAAAAAAAGBAAAAAAAAAcEAAAAAAAACAQAAAAAAAAHBAAAAAAAAAgEAAAAAAAACQQAAAAAAAALBAAAAAAAAA8EAAAAAAAADQQAAAAAAAALBAAAAAAAAAkEAAAAAAAAAEQJqZmZmZmbk/AAAAAAAA8D+gRwEAACAAACVtLyVkLyV5AAAACCVIOiVNOiVTAAAACA==",
            );
          }
          var o = new ArrayBuffer(16);
          var p = new Int32Array(o);
          var q = new Float32Array(o);
          var r = new Float64Array(o);
          function s(t) {
            return p[t];
          }
          function u(t, v) {
            p[t] = v;
          }
          function w() {
            return r[0];
          }
          function x(v) {
            r[0] = v;
          }
          function y(z, A, B) {
            a.copyWithin(z, A, A + B);
          }
          function C() {
            throw new Error("abort");
          }
          function D(z, v, B) {
            z = z >>> 0;
            B = B >>> 0;
            if (z + B > a.length) throw "trap: invalid memory.fill";
            a.fill(v, z, z + B);
          }
          function E() {
            return q[2];
          }
          function F(v) {
            q[2] = v;
          }
          function ha(n) {
            var G = new ArrayBuffer(16908288);
            var H = new Int8Array(G);
            var I = new Int16Array(G);
            var J = new Int32Array(G);
            var K = new Uint8Array(G);
            var L = new Uint16Array(G);
            var M = new Uint32Array(G);
            var N = new Float32Array(G);
            var O = new Float64Array(G);
            var P = Math.imul;
            var Q = Math.fround;
            var R = Math.abs;
            var S = Math.clz32;
            var T = Math.min;
            var U = Math.max;
            var V = Math.floor;
            var W = Math.ceil;
            var X = Math.trunc;
            var Y = Math.sqrt;
            var Z = n.a;
            var _ = Z.a;
            var $ = Z.b;
            var aa = Z.c;
            var ba = Z.d;
            var ca = Z.e;
            var da = 83872;
            var ea = 0;
            // EMSCRIPTEN_START_FUNCS
            function Kd(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                t = 0,
                v = 0,
                y = 0,
                z = 0,
                A = 0,
                B = 0,
                C = 0,
                D = 0,
                E = 0,
                G = 0,
                I = 0,
                L = 0,
                N = 0,
                O = 0,
                R = 0,
                T = 0;
              q = (da - 48) | 0;
              da = q;
              a: {
                b: {
                  if (c >>> 0 > 2) {
                    break b;
                  }
                  c = c << 2;
                  L = J[(c + 3308) >> 2];
                  I = J[(c + 3296) >> 2];
                  while (1) {
                    c = J[(b + 4) >> 2];
                    c: {
                      if ((c | 0) != J[(b + 104) >> 2]) {
                        J[(b + 4) >> 2] = c + 1;
                        c = K[c | 0];
                        break c;
                      }
                      c = ma(b);
                    }
                    if (((c | 0) == 32) | ((c - 9) >>> 0 < 5)) {
                      continue;
                    }
                    break;
                  }
                  y = 1;
                  d: {
                    e: {
                      switch ((c - 43) | 0) {
                        case 0:
                        case 2:
                          break e;
                        default:
                          break d;
                      }
                    }
                    y = (c | 0) == 45 ? -1 : 1;
                    c = J[(b + 4) >> 2];
                    if ((c | 0) != J[(b + 104) >> 2]) {
                      J[(b + 4) >> 2] = c + 1;
                      c = K[c | 0];
                      break d;
                    }
                    c = ma(b);
                  }
                  f: {
                    g: {
                      if ((c & -33) == 73) {
                        while (1) {
                          if ((h | 0) == 7) {
                            break g;
                          }
                          c = J[(b + 4) >> 2];
                          h: {
                            if ((c | 0) != J[(b + 104) >> 2]) {
                              J[(b + 4) >> 2] = c + 1;
                              c = K[c | 0];
                              break h;
                            }
                            c = ma(b);
                          }
                          v = H[(h + 1025) | 0];
                          h = (h + 1) | 0;
                          if ((c | 32) == (v | 0)) {
                            continue;
                          }
                          break;
                        }
                      }
                      if ((h | 0) != 3) {
                        v = (h | 0) == 8;
                        if (v) {
                          break g;
                        }
                        if (!d | (h >>> 0 < 4)) {
                          break f;
                        }
                        if (v) {
                          break g;
                        }
                      }
                      c = J[(b + 116) >> 2];
                      if (((c | 0) >= 0) | ((c | 0) > 0)) {
                        J[(b + 4) >> 2] = J[(b + 4) >> 2] - 1;
                      }
                      if (!d | (h >>> 0 < 4)) {
                        break g;
                      }
                      c = (c | 0) < 0;
                      while (1) {
                        if (!c) {
                          J[(b + 4) >> 2] = J[(b + 4) >> 2] - 1;
                        }
                        h = (h - 1) | 0;
                        if (h >>> 0 > 3) {
                          continue;
                        }
                        break;
                      }
                    }
                    r = (da - 16) | 0;
                    da = r;
                    d = (F(Q(Q(y | 0) * Q(Infinity))), s(2));
                    h = d & 8388607;
                    c = (d >>> 23) | 0;
                    b = c & 255;
                    i: {
                      if (b) {
                        if ((b | 0) != 255) {
                          i = h << 25;
                          g = (h >>> 7) | 0;
                          b = ((c & 255) + 16256) | 0;
                          break i;
                        }
                        i = h << 25;
                        g = (h >>> 7) | 0;
                        b = 32767;
                        break i;
                      }
                      b = 0;
                      if (!h) {
                        break i;
                      }
                      b = S(h);
                      za(r, h, 0, 0, 0, (b + 81) | 0);
                      i = J[(r + 8) >> 2];
                      g = J[(r + 12) >> 2] ^ 65536;
                      k = J[r >> 2];
                      j = J[(r + 4) >> 2];
                      b = (16265 - b) | 0;
                    }
                    J[q >> 2] = k;
                    J[(q + 4) >> 2] = j;
                    J[(q + 8) >> 2] = i;
                    J[(q + 12) >> 2] = g | ((d & -2147483648) | (b << 16));
                    da = (r + 16) | 0;
                    i = J[(q + 8) >> 2];
                    g = J[(q + 12) >> 2];
                    k = J[q >> 2];
                    j = J[(q + 4) >> 2];
                    break a;
                  }
                  j: {
                    k: {
                      l: {
                        m: {
                          n: {
                            o: {
                              if (h) {
                                break o;
                              }
                              h = 0;
                              if ((c & -33) != 78) {
                                break o;
                              }
                              while (1) {
                                if ((h | 0) == 2) {
                                  break n;
                                }
                                c = J[(b + 4) >> 2];
                                p: {
                                  if ((c | 0) != J[(b + 104) >> 2]) {
                                    J[(b + 4) >> 2] = c + 1;
                                    c = K[c | 0];
                                    break p;
                                  }
                                  c = ma(b);
                                }
                                v = H[(h + 1384) | 0];
                                h = (h + 1) | 0;
                                if ((c | 32) == (v | 0)) {
                                  continue;
                                }
                                break;
                              }
                            }
                            switch (h | 0) {
                              case 3:
                                break n;
                              case 0:
                                break k;
                              default:
                                break m;
                            }
                          }
                          q: {
                            c = J[(b + 4) >> 2];
                            r: {
                              if ((c | 0) != J[(b + 104) >> 2]) {
                                J[(b + 4) >> 2] = c + 1;
                                c = K[c | 0];
                                break r;
                              }
                              c = ma(b);
                            }
                            if ((c | 0) == 40) {
                              h = 1;
                              break q;
                            }
                            g = 2147450880;
                            if (J[(b + 116) >> 2] < 0) {
                              break a;
                            }
                            J[(b + 4) >> 2] = J[(b + 4) >> 2] - 1;
                            break a;
                          }
                          while (1) {
                            c = J[(b + 4) >> 2];
                            s: {
                              if ((c | 0) != J[(b + 104) >> 2]) {
                                J[(b + 4) >> 2] = c + 1;
                                c = K[c | 0];
                                break s;
                              }
                              c = ma(b);
                            }
                            if (
                              !(
                                !(
                                  ((c - 48) >>> 0 < 10) |
                                  ((c - 65) >>> 0 < 26) |
                                  ((c | 0) == 95)
                                ) &
                                ((c - 97) >>> 0 >= 26)
                              )
                            ) {
                              h = (h + 1) | 0;
                              continue;
                            }
                            break;
                          }
                          g = 2147450880;
                          if ((c | 0) == 41) {
                            break a;
                          }
                          c = J[(b + 116) >> 2];
                          if (((c | 0) >= 0) | ((c | 0) > 0)) {
                            J[(b + 4) >> 2] = J[(b + 4) >> 2] - 1;
                          }
                          t: {
                            if (d) {
                              if (h) {
                                break t;
                              }
                              break j;
                            }
                            break l;
                          }
                          while (1) {
                            if (((c | 0) > 0) | ((c | 0) >= 0)) {
                              J[(b + 4) >> 2] = J[(b + 4) >> 2] - 1;
                            }
                            h = (h - 1) | 0;
                            if (h) {
                              continue;
                            }
                            break;
                          }
                          break j;
                        }
                        c = J[(b + 116) >> 2];
                        if ((c | 0) > 0) {
                          c = 1;
                        } else {
                          c = (c | 0) >= 0;
                        }
                        if (c) {
                          J[(b + 4) >> 2] = J[(b + 4) >> 2] - 1;
                        }
                      }
                      J[3876] = 28;
                      Na(b, 0, 0);
                      break b;
                    }
                    u: {
                      if ((c | 0) != 48) {
                        break u;
                      }
                      h = J[(b + 4) >> 2];
                      v: {
                        if ((h | 0) != J[(b + 104) >> 2]) {
                          J[(b + 4) >> 2] = h + 1;
                          h = K[h | 0];
                          break v;
                        }
                        h = ma(b);
                      }
                      if ((h & -33) == 88) {
                        f = (da - 432) | 0;
                        da = f;
                        c = J[(b + 4) >> 2];
                        w: {
                          if ((c | 0) != J[(b + 104) >> 2]) {
                            J[(b + 4) >> 2] = c + 1;
                            c = K[c | 0];
                            break w;
                          }
                          c = ma(b);
                        }
                        x: {
                          y: {
                            while (1) {
                              if ((c | 0) != 48) {
                                z: {
                                  if ((c | 0) != 46) {
                                    break x;
                                  }
                                  c = J[(b + 4) >> 2];
                                  if ((c | 0) == J[(b + 104) >> 2]) {
                                    break z;
                                  }
                                  J[(b + 4) >> 2] = c + 1;
                                  c = K[c | 0];
                                  break y;
                                }
                              } else {
                                c = J[(b + 4) >> 2];
                                if ((c | 0) != J[(b + 104) >> 2]) {
                                  t = 1;
                                  J[(b + 4) >> 2] = c + 1;
                                  c = K[c | 0];
                                } else {
                                  t = 1;
                                  c = ma(b);
                                }
                                continue;
                              }
                              break;
                            }
                            c = ma(b);
                          }
                          if ((c | 0) != 48) {
                            B = 1;
                            break x;
                          }
                          while (1) {
                            c = r;
                            r = (c - 1) | 0;
                            z = (z - !c) | 0;
                            c = J[(b + 4) >> 2];
                            A: {
                              if ((c | 0) != J[(b + 104) >> 2]) {
                                J[(b + 4) >> 2] = c + 1;
                                c = K[c | 0];
                                break A;
                              }
                              c = ma(b);
                            }
                            if ((c | 0) == 48) {
                              continue;
                            }
                            break;
                          }
                          B = 1;
                          t = 1;
                        }
                        j = 1073676288;
                        while (1) {
                          B: {
                            C: {
                              D: {
                                h = c;
                                m = (c - 48) | 0;
                                if (m >>> 0 < 10) {
                                  break D;
                                }
                                v = (c | 0) != 46;
                                h = c | 32;
                                if (v & ((h - 97) >>> 0 > 5)) {
                                  break B;
                                }
                                if (v) {
                                  break D;
                                }
                                if (B) {
                                  break B;
                                }
                                B = 1;
                                r = i;
                                z = g;
                                break C;
                              }
                              c = (c | 0) > 57 ? (h - 87) | 0 : m;
                              E: {
                                if (
                                  (((g | 0) <= 0) & (i >>> 0 <= 7)) |
                                  ((g | 0) < 0)
                                ) {
                                  l = (c + (l << 4)) | 0;
                                  break E;
                                }
                                if (!g & (i >>> 0 <= 28)) {
                                  Ja((f + 48) | 0, c);
                                  pa(
                                    (f + 32) | 0,
                                    E,
                                    G,
                                    k,
                                    j,
                                    0,
                                    0,
                                    0,
                                    1073414144,
                                  );
                                  E = J[(f + 32) >> 2];
                                  G = J[(f + 36) >> 2];
                                  k = J[(f + 40) >> 2];
                                  j = J[(f + 44) >> 2];
                                  pa(
                                    (f + 16) | 0,
                                    J[(f + 48) >> 2],
                                    J[(f + 52) >> 2],
                                    J[(f + 56) >> 2],
                                    J[(f + 60) >> 2],
                                    E,
                                    G,
                                    k,
                                    j,
                                  );
                                  Ea(
                                    f,
                                    J[(f + 16) >> 2],
                                    J[(f + 20) >> 2],
                                    J[(f + 24) >> 2],
                                    J[(f + 28) >> 2],
                                    n,
                                    o,
                                    C,
                                    D,
                                  );
                                  C = J[(f + 8) >> 2];
                                  D = J[(f + 12) >> 2];
                                  n = J[f >> 2];
                                  o = J[(f + 4) >> 2];
                                  break E;
                                }
                                if (p | !c) {
                                  break E;
                                }
                                pa(
                                  (f + 80) | 0,
                                  E,
                                  G,
                                  k,
                                  j,
                                  0,
                                  0,
                                  0,
                                  1073610752,
                                );
                                Ea(
                                  (f - -64) | 0,
                                  J[(f + 80) >> 2],
                                  J[(f + 84) >> 2],
                                  J[(f + 88) >> 2],
                                  J[(f + 92) >> 2],
                                  n,
                                  o,
                                  C,
                                  D,
                                );
                                p = 1;
                                C = J[(f + 72) >> 2];
                                D = J[(f + 76) >> 2];
                                n = J[(f + 64) >> 2];
                                o = J[(f + 68) >> 2];
                              }
                              i = (i + 1) | 0;
                              g = i ? g : (g + 1) | 0;
                              t = 1;
                            }
                            c = J[(b + 4) >> 2];
                            if ((c | 0) != J[(b + 104) >> 2]) {
                              J[(b + 4) >> 2] = c + 1;
                              c = K[c | 0];
                            } else {
                              c = ma(b);
                            }
                            continue;
                          }
                          break;
                        }
                        F: {
                          if (!t) {
                            c = J[(b + 116) >> 2];
                            if ((c | 0) > 0) {
                              c = 1;
                            } else {
                              c = (c | 0) >= 0;
                            }
                            G: {
                              H: {
                                if (c) {
                                  c = J[(b + 4) >> 2];
                                  J[(b + 4) >> 2] = c - 1;
                                  if (!d) {
                                    break H;
                                  }
                                  J[(b + 4) >> 2] = c - 2;
                                  if (!B) {
                                    break G;
                                  }
                                  J[(b + 4) >> 2] = c - 3;
                                  break G;
                                }
                                if (d) {
                                  break G;
                                }
                              }
                              Na(b, 0, 0);
                            }
                            x(0);
                            c = s(1) | 0;
                            d = s(0) | 0;
                            x(+(y | 0));
                            b = s(1) | 0;
                            s(0) | 0;
                            u(0, d | 0);
                            u(1, (c & 2147483647) | (b & -2147483648));
                            Pa((f + 96) | 0, +w());
                            n = J[(f + 96) >> 2];
                            o = J[(f + 100) >> 2];
                            c = J[(f + 108) >> 2];
                            b = J[(f + 104) >> 2];
                            break F;
                          }
                          if (
                            (((g | 0) <= 0) & (i >>> 0 <= 7)) |
                            ((g | 0) < 0)
                          ) {
                            k = i;
                            j = g;
                            while (1) {
                              l = l << 4;
                              k = (k + 1) | 0;
                              j = k ? j : (j + 1) | 0;
                              if (j | ((k | 0) != 8)) {
                                continue;
                              }
                              break;
                            }
                          }
                          I: {
                            J: {
                              K: {
                                if ((c & -33) == 80) {
                                  k = Jd(b, d);
                                  c = ea;
                                  j = c;
                                  if (k | ((c | 0) != -2147483648)) {
                                    break I;
                                  }
                                  if (d) {
                                    c = J[(b + 116) >> 2];
                                    if ((c | 0) > 0) {
                                      c = 1;
                                    } else {
                                      c = (c | 0) >= 0;
                                    }
                                    if (c) {
                                      break K;
                                    }
                                    break J;
                                  }
                                  n = 0;
                                  o = 0;
                                  Na(b, 0, 0);
                                  c = 0;
                                  b = 0;
                                  break F;
                                }
                                k = 0;
                                j = 0;
                                if (J[(b + 116) >> 2] < 0) {
                                  break I;
                                }
                              }
                              J[(b + 4) >> 2] = J[(b + 4) >> 2] - 1;
                            }
                            k = 0;
                            j = 0;
                          }
                          if (!l) {
                            x(0);
                            c = s(1) | 0;
                            d = s(0) | 0;
                            x(+(y | 0));
                            b = s(1) | 0;
                            s(0) | 0;
                            u(0, d | 0);
                            u(1, (c & 2147483647) | (b & -2147483648));
                            Pa((f + 112) | 0, +w());
                            n = J[(f + 112) >> 2];
                            o = J[(f + 116) >> 2];
                            c = J[(f + 124) >> 2];
                            b = J[(f + 120) >> 2];
                            break F;
                          }
                          b = B ? r : i;
                          d = (k + (b << 2)) | 0;
                          i = (d - 32) | 0;
                          c = (0 - L) | 0;
                          b = (j + (((B ? z : g) << 2) | (b >>> 30))) | 0;
                          g =
                            ((d >>> 0 < k >>> 0 ? (b + 1) | 0 : b) -
                              (d >>> 0 < 32)) |
                            0;
                          b = g;
                          if ((b | 0) > 0) {
                            b = 1;
                          } else {
                            b = (c >>> 0 < i >>> 0) & ((b | 0) >= 0);
                          }
                          if (b) {
                            J[3876] = 68;
                            Ja((f + 160) | 0, y);
                            pa(
                              (f + 144) | 0,
                              J[(f + 160) >> 2],
                              J[(f + 164) >> 2],
                              J[(f + 168) >> 2],
                              J[(f + 172) >> 2],
                              -1,
                              -1,
                              -1,
                              2147418111,
                            );
                            pa(
                              (f + 128) | 0,
                              J[(f + 144) >> 2],
                              J[(f + 148) >> 2],
                              J[(f + 152) >> 2],
                              J[(f + 156) >> 2],
                              -1,
                              -1,
                              -1,
                              2147418111,
                            );
                            n = J[(f + 128) >> 2];
                            o = J[(f + 132) >> 2];
                            c = J[(f + 140) >> 2];
                            b = J[(f + 136) >> 2];
                            break F;
                          }
                          c = (L - 226) | 0;
                          b = c >> 31;
                          if (
                            (((g | 0) >= (b | 0)) & (c >>> 0 <= i >>> 0)) |
                            ((b | 0) < (g | 0))
                          ) {
                            if ((l | 0) >= 0) {
                              while (1) {
                                Ea(
                                  (f + 416) | 0,
                                  n,
                                  o,
                                  C,
                                  D,
                                  0,
                                  0,
                                  0,
                                  -1073807360,
                                );
                                b = bc(n, o, C, D, 1073610752);
                                b = (b | 0) >= 0;
                                Ea(
                                  (f + 400) | 0,
                                  n,
                                  o,
                                  C,
                                  D,
                                  b ? J[(f + 416) >> 2] : n,
                                  b ? J[(f + 420) >> 2] : o,
                                  b ? J[(f + 424) >> 2] : C,
                                  b ? J[(f + 428) >> 2] : D,
                                );
                                c = l << 1;
                                l = c | b;
                                b = i;
                                i = (b - 1) | 0;
                                g = (g - !b) | 0;
                                C = J[(f + 408) >> 2];
                                D = J[(f + 412) >> 2];
                                n = J[(f + 400) >> 2];
                                o = J[(f + 404) >> 2];
                                if ((c | 0) >= 0) {
                                  continue;
                                }
                                break;
                              }
                            }
                            b = (32 - L) | 0;
                            c = (b + i) | 0;
                            b = b >>> 0 > c >>> 0 ? (g + 1) | 0 : g;
                            c =
                              ((c >>> 0 < I >>> 0) & ((b | 0) <= 0)) |
                              ((b | 0) < 0)
                                ? (c | 0) > 0
                                  ? c
                                  : 0
                                : I;
                            L: {
                              if (c >>> 0 >= 113) {
                                Ja((f + 384) | 0, y);
                                k = J[(f + 392) >> 2];
                                j = J[(f + 396) >> 2];
                                E = J[(f + 384) >> 2];
                                G = J[(f + 388) >> 2];
                                g = 0;
                                b = 0;
                                break L;
                              }
                              Pa((f + 352) | 0, ac((144 - c) | 0));
                              Ja((f + 336) | 0, y);
                              E = J[(f + 336) >> 2];
                              G = J[(f + 340) >> 2];
                              k = J[(f + 344) >> 2];
                              j = J[(f + 348) >> 2];
                              Od(
                                (f + 368) | 0,
                                J[(f + 352) >> 2],
                                J[(f + 356) >> 2],
                                J[(f + 360) >> 2],
                                J[(f + 364) >> 2],
                                j,
                              );
                              O = J[(f + 376) >> 2];
                              A = J[(f + 380) >> 2];
                              g = J[(f + 372) >> 2];
                              b = J[(f + 368) >> 2];
                            }
                            c =
                              !(l & 1) &
                              (((Za(n, o, C, D, 0, 0, 0, 0) | 0) != 0) &
                                (c >>> 0 < 32));
                            fb((f + 320) | 0, c | l);
                            pa(
                              (f + 304) | 0,
                              E,
                              G,
                              k,
                              j,
                              J[(f + 320) >> 2],
                              J[(f + 324) >> 2],
                              J[(f + 328) >> 2],
                              J[(f + 332) >> 2],
                            );
                            Ea(
                              (f + 272) | 0,
                              J[(f + 304) >> 2],
                              J[(f + 308) >> 2],
                              J[(f + 312) >> 2],
                              J[(f + 316) >> 2],
                              b,
                              g,
                              O,
                              A,
                            );
                            pa(
                              (f + 288) | 0,
                              E,
                              G,
                              k,
                              j,
                              c ? 0 : n,
                              c ? 0 : o,
                              c ? 0 : C,
                              c ? 0 : D,
                            );
                            Ea(
                              (f + 256) | 0,
                              J[(f + 288) >> 2],
                              J[(f + 292) >> 2],
                              J[(f + 296) >> 2],
                              J[(f + 300) >> 2],
                              J[(f + 272) >> 2],
                              J[(f + 276) >> 2],
                              J[(f + 280) >> 2],
                              J[(f + 284) >> 2],
                            );
                            $b(
                              (f + 240) | 0,
                              J[(f + 256) >> 2],
                              J[(f + 260) >> 2],
                              J[(f + 264) >> 2],
                              J[(f + 268) >> 2],
                              b,
                              g,
                              O,
                              A,
                            );
                            g = J[(f + 240) >> 2];
                            d = J[(f + 244) >> 2];
                            c = J[(f + 248) >> 2];
                            b = J[(f + 252) >> 2];
                            if (!Za(g, d, c, b, 0, 0, 0, 0)) {
                              J[3876] = 68;
                            }
                            Nd((f + 224) | 0, g, d, c, b, i);
                            n = J[(f + 224) >> 2];
                            o = J[(f + 228) >> 2];
                            c = J[(f + 236) >> 2];
                            b = J[(f + 232) >> 2];
                            break F;
                          }
                          J[3876] = 68;
                          Ja((f + 208) | 0, y);
                          pa(
                            (f + 192) | 0,
                            J[(f + 208) >> 2],
                            J[(f + 212) >> 2],
                            J[(f + 216) >> 2],
                            J[(f + 220) >> 2],
                            0,
                            0,
                            0,
                            65536,
                          );
                          pa(
                            (f + 176) | 0,
                            J[(f + 192) >> 2],
                            J[(f + 196) >> 2],
                            J[(f + 200) >> 2],
                            J[(f + 204) >> 2],
                            0,
                            0,
                            0,
                            65536,
                          );
                          n = J[(f + 176) >> 2];
                          o = J[(f + 180) >> 2];
                          c = J[(f + 188) >> 2];
                          b = J[(f + 184) >> 2];
                        }
                        J[(q + 16) >> 2] = n;
                        J[(q + 20) >> 2] = o;
                        J[(q + 24) >> 2] = b;
                        J[(q + 28) >> 2] = c;
                        da = (f + 432) | 0;
                        i = J[(q + 24) >> 2];
                        g = J[(q + 28) >> 2];
                        k = J[(q + 16) >> 2];
                        j = J[(q + 20) >> 2];
                        break a;
                      }
                      if (J[(b + 116) >> 2] < 0) {
                        break u;
                      }
                      J[(b + 4) >> 2] = J[(b + 4) >> 2] - 1;
                    }
                    m = b;
                    h = c;
                    v = d;
                    d = 0;
                    e = (da - 8976) | 0;
                    da = e;
                    t = (0 - L) | 0;
                    f = (t - I) | 0;
                    M: {
                      N: {
                        while (1) {
                          if ((h | 0) != 48) {
                            O: {
                              if ((h | 0) != 46) {
                                break M;
                              }
                              b = J[(m + 4) >> 2];
                              if ((b | 0) == J[(m + 104) >> 2]) {
                                break O;
                              }
                              J[(m + 4) >> 2] = b + 1;
                              h = K[b | 0];
                              break N;
                            }
                          } else {
                            b = J[(m + 4) >> 2];
                            if ((b | 0) != J[(m + 104) >> 2]) {
                              J[(m + 4) >> 2] = b + 1;
                              h = K[b | 0];
                            } else {
                              h = ma(m);
                            }
                            d = 1;
                            continue;
                          }
                          break;
                        }
                        h = ma(m);
                      }
                      if ((h | 0) == 48) {
                        while (1) {
                          b = i;
                          i = (b - 1) | 0;
                          g = (g - !b) | 0;
                          b = J[(m + 4) >> 2];
                          P: {
                            if ((b | 0) != J[(m + 104) >> 2]) {
                              J[(m + 4) >> 2] = b + 1;
                              h = K[b | 0];
                              break P;
                            }
                            h = ma(m);
                          }
                          if ((h | 0) == 48) {
                            continue;
                          }
                          break;
                        }
                        d = 1;
                      }
                      B = 1;
                    }
                    J[(e + 784) >> 2] = 0;
                    Q: {
                      R: {
                        b = (h | 0) == 46;
                        c = (h - 48) | 0;
                        S: {
                          T: {
                            U: {
                              if (b | (c >>> 0 <= 9)) {
                                while (1) {
                                  V: {
                                    if (b & 1) {
                                      if (!B) {
                                        i = k;
                                        g = j;
                                        B = 1;
                                        break V;
                                      }
                                      b = !d;
                                      break U;
                                    }
                                    k = (k + 1) | 0;
                                    j = k ? j : (j + 1) | 0;
                                    if ((l | 0) <= 2044) {
                                      A = (h | 0) == 48 ? A : k;
                                      b = (((e + 784) | 0) + (l << 2)) | 0;
                                      J[b >> 2] = p
                                        ? (((P(J[b >> 2], 10) + h) | 0) - 48) |
                                          0
                                        : c;
                                      d = 1;
                                      b = (p + 1) | 0;
                                      c = (b | 0) == 9;
                                      p = c ? 0 : b;
                                      l = (c + l) | 0;
                                      break V;
                                    }
                                    if ((h | 0) == 48) {
                                      break V;
                                    }
                                    J[(e + 8960) >> 2] = J[(e + 8960) >> 2] | 1;
                                    A = 18396;
                                  }
                                  b = J[(m + 4) >> 2];
                                  W: {
                                    if ((b | 0) != J[(m + 104) >> 2]) {
                                      J[(m + 4) >> 2] = b + 1;
                                      h = K[b | 0];
                                      break W;
                                    }
                                    h = ma(m);
                                  }
                                  b = (h | 0) == 46;
                                  c = (h - 48) | 0;
                                  if (b | (c >>> 0 < 10)) {
                                    continue;
                                  }
                                  break;
                                }
                              }
                              i = B ? i : k;
                              g = B ? g : j;
                              if (!(!d | ((h & -33) != 69))) {
                                n = Jd(m, v);
                                b = ea;
                                o = b;
                                X: {
                                  if (n | ((b | 0) != -2147483648)) {
                                    break X;
                                  }
                                  if (!v) {
                                    break S;
                                  }
                                  n = 0;
                                  o = 0;
                                  if (J[(m + 116) >> 2] < 0) {
                                    break X;
                                  }
                                  J[(m + 4) >> 2] = J[(m + 4) >> 2] - 1;
                                }
                                b = (g + o) | 0;
                                i = (i + n) | 0;
                                g = i >>> 0 < n >>> 0 ? (b + 1) | 0 : b;
                                break R;
                              }
                              b = !d;
                              if ((h | 0) < 0) {
                                break T;
                              }
                            }
                            if (J[(m + 116) >> 2] < 0) {
                              break T;
                            }
                            J[(m + 4) >> 2] = J[(m + 4) >> 2] - 1;
                          }
                          if (!b) {
                            break R;
                          }
                          J[3876] = 28;
                        }
                        Na(m, 0, 0);
                        i = 0;
                        g = 0;
                        c = 0;
                        b = 0;
                        break Q;
                      }
                      b = J[(e + 784) >> 2];
                      if (!b) {
                        x(0);
                        c = s(1) | 0;
                        d = s(0) | 0;
                        x(+(y | 0));
                        b = s(1) | 0;
                        s(0) | 0;
                        u(0, d | 0);
                        u(1, (c & 2147483647) | (b & -2147483648));
                        Pa(e, +w());
                        i = J[(e + 8) >> 2];
                        g = J[(e + 12) >> 2];
                        c = J[(e + 4) >> 2];
                        b = J[e >> 2];
                        break Q;
                      }
                      if (
                        !(
                          ((k >>> 0 > 9) & ((j | 0) >= 0)) |
                          ((j | 0) > 0) |
                          (((i | 0) != (k | 0)) | ((g | 0) != (j | 0))) |
                          ((b >>> I) | 0 ? I >>> 0 <= 30 : 0)
                        )
                      ) {
                        Ja((e + 48) | 0, y);
                        fb((e + 32) | 0, b);
                        pa(
                          (e + 16) | 0,
                          J[(e + 48) >> 2],
                          J[(e + 52) >> 2],
                          J[(e + 56) >> 2],
                          J[(e + 60) >> 2],
                          J[(e + 32) >> 2],
                          J[(e + 36) >> 2],
                          J[(e + 40) >> 2],
                          J[(e + 44) >> 2],
                        );
                        i = J[(e + 24) >> 2];
                        g = J[(e + 28) >> 2];
                        c = J[(e + 20) >> 2];
                        b = J[(e + 16) >> 2];
                        break Q;
                      }
                      if (
                        (((t >>> 1) >>> 0 < i >>> 0) & ((g | 0) >= 0)) |
                        ((g | 0) > 0)
                      ) {
                        J[3876] = 68;
                        Ja((e + 96) | 0, y);
                        pa(
                          (e + 80) | 0,
                          J[(e + 96) >> 2],
                          J[(e + 100) >> 2],
                          J[(e + 104) >> 2],
                          J[(e + 108) >> 2],
                          -1,
                          -1,
                          -1,
                          2147418111,
                        );
                        pa(
                          (e - -64) | 0,
                          J[(e + 80) >> 2],
                          J[(e + 84) >> 2],
                          J[(e + 88) >> 2],
                          J[(e + 92) >> 2],
                          -1,
                          -1,
                          -1,
                          2147418111,
                        );
                        i = J[(e + 72) >> 2];
                        g = J[(e + 76) >> 2];
                        c = J[(e + 68) >> 2];
                        b = J[(e + 64) >> 2];
                        break Q;
                      }
                      b = (L - 226) | 0;
                      c = i >>> 0 < b >>> 0;
                      b = b >> 31;
                      if ((c & ((g | 0) <= (b | 0))) | ((b | 0) > (g | 0))) {
                        J[3876] = 68;
                        Ja((e + 144) | 0, y);
                        pa(
                          (e + 128) | 0,
                          J[(e + 144) >> 2],
                          J[(e + 148) >> 2],
                          J[(e + 152) >> 2],
                          J[(e + 156) >> 2],
                          0,
                          0,
                          0,
                          65536,
                        );
                        pa(
                          (e + 112) | 0,
                          J[(e + 128) >> 2],
                          J[(e + 132) >> 2],
                          J[(e + 136) >> 2],
                          J[(e + 140) >> 2],
                          0,
                          0,
                          0,
                          65536,
                        );
                        i = J[(e + 120) >> 2];
                        g = J[(e + 124) >> 2];
                        c = J[(e + 116) >> 2];
                        b = J[(e + 112) >> 2];
                        break Q;
                      }
                      if (p) {
                        if ((p | 0) <= 8) {
                          b = (((e + 784) | 0) + (l << 2)) | 0;
                          h = J[b >> 2];
                          while (1) {
                            h = P(h, 10);
                            p = (p + 1) | 0;
                            if ((p | 0) != 9) {
                              continue;
                            }
                            break;
                          }
                          J[b >> 2] = h;
                        }
                        l = (l + 1) | 0;
                      }
                      p = i;
                      Y: {
                        if (
                          ((i >>> 0 > 17) & ((g | 0) >= 0)) |
                          ((g | 0) > 0) |
                          ((A | 0) >= 9) |
                          ((i | 0) < (A | 0))
                        ) {
                          break Y;
                        }
                        if (!g & ((i | 0) == 9)) {
                          Ja((e + 192) | 0, y);
                          fb((e + 176) | 0, J[(e + 784) >> 2]);
                          pa(
                            (e + 160) | 0,
                            J[(e + 192) >> 2],
                            J[(e + 196) >> 2],
                            J[(e + 200) >> 2],
                            J[(e + 204) >> 2],
                            J[(e + 176) >> 2],
                            J[(e + 180) >> 2],
                            J[(e + 184) >> 2],
                            J[(e + 188) >> 2],
                          );
                          i = J[(e + 168) >> 2];
                          g = J[(e + 172) >> 2];
                          c = J[(e + 164) >> 2];
                          b = J[(e + 160) >> 2];
                          break Q;
                        }
                        if ((((g | 0) <= 0) & (i >>> 0 <= 8)) | ((g | 0) < 0)) {
                          Ja((e + 272) | 0, y);
                          fb((e + 256) | 0, J[(e + 784) >> 2]);
                          pa(
                            (e + 240) | 0,
                            J[(e + 272) >> 2],
                            J[(e + 276) >> 2],
                            J[(e + 280) >> 2],
                            J[(e + 284) >> 2],
                            J[(e + 256) >> 2],
                            J[(e + 260) >> 2],
                            J[(e + 264) >> 2],
                            J[(e + 268) >> 2],
                          );
                          Ja((e + 224) | 0, J[(((8 - p) << 2) + 3264) >> 2]);
                          Md(
                            (e + 208) | 0,
                            J[(e + 240) >> 2],
                            J[(e + 244) >> 2],
                            J[(e + 248) >> 2],
                            J[(e + 252) >> 2],
                            J[(e + 224) >> 2],
                            J[(e + 228) >> 2],
                            J[(e + 232) >> 2],
                            J[(e + 236) >> 2],
                          );
                          i = J[(e + 216) >> 2];
                          g = J[(e + 220) >> 2];
                          c = J[(e + 212) >> 2];
                          b = J[(e + 208) >> 2];
                          break Q;
                        }
                        c = (((P(p, -3) + I) | 0) + 27) | 0;
                        b = J[(e + 784) >> 2];
                        if ((b >>> c) | 0 ? (c | 0) <= 30 : 0) {
                          break Y;
                        }
                        Ja((e + 352) | 0, y);
                        fb((e + 336) | 0, b);
                        pa(
                          (e + 320) | 0,
                          J[(e + 352) >> 2],
                          J[(e + 356) >> 2],
                          J[(e + 360) >> 2],
                          J[(e + 364) >> 2],
                          J[(e + 336) >> 2],
                          J[(e + 340) >> 2],
                          J[(e + 344) >> 2],
                          J[(e + 348) >> 2],
                        );
                        Ja((e + 304) | 0, J[((p << 2) + 3224) >> 2]);
                        pa(
                          (e + 288) | 0,
                          J[(e + 320) >> 2],
                          J[(e + 324) >> 2],
                          J[(e + 328) >> 2],
                          J[(e + 332) >> 2],
                          J[(e + 304) >> 2],
                          J[(e + 308) >> 2],
                          J[(e + 312) >> 2],
                          J[(e + 316) >> 2],
                        );
                        i = J[(e + 296) >> 2];
                        g = J[(e + 300) >> 2];
                        c = J[(e + 292) >> 2];
                        b = J[(e + 288) >> 2];
                        break Q;
                      }
                      while (1) {
                        b = l;
                        l = (b - 1) | 0;
                        v = (((e + 784) | 0) + (b << 2)) | 0;
                        if (!J[(v - 4) >> 2]) {
                          continue;
                        }
                        break;
                      }
                      A = 0;
                      c = (p | 0) % 9 | 0;
                      Z: {
                        if (!c) {
                          c = 0;
                          break Z;
                        }
                        l = (g | 0) < 0 ? (c + 9) | 0 : c;
                        _: {
                          if (!b) {
                            c = 0;
                            b = 0;
                            break _;
                          }
                          m = J[(((0 - l) << 2) + 3296) >> 2];
                          j = (1e9 / (m | 0)) | 0;
                          d = 0;
                          h = 0;
                          c = 0;
                          while (1) {
                            k = (((e + 784) | 0) + (h << 2)) | 0;
                            g = J[k >> 2];
                            i = ((g >>> 0) / (m >>> 0)) | 0;
                            d = (d + i) | 0;
                            J[k >> 2] = d;
                            d = !d & ((c | 0) == (h | 0));
                            c = d ? (c + 1) & 2047 : c;
                            p = d ? (p - 9) | 0 : p;
                            d = P(j, (g - P(i, m)) | 0);
                            h = (h + 1) | 0;
                            if ((h | 0) != (b | 0)) {
                              continue;
                            }
                            break;
                          }
                          if (!d) {
                            break _;
                          }
                          J[v >> 2] = d;
                          b = (b + 1) | 0;
                        }
                        p = (((p - l) | 0) + 9) | 0;
                      }
                      while (1) {
                        m = (((e + 784) | 0) + (c << 2)) | 0;
                        v = (p | 0) < 36;
                        $: {
                          while (1) {
                            if (
                              !v &
                              (((p | 0) != 36) | (M[m >> 2] >= 10384593))
                            ) {
                              break $;
                            }
                            l = (b + 2047) | 0;
                            d = 0;
                            while (1) {
                              k = b;
                              N = l & 2047;
                              h = (((e + 784) | 0) + (N << 2)) | 0;
                              i = J[h >> 2];
                              b = (i >>> 3) | 0;
                              j = (b + 1) | 0;
                              g = b;
                              b = i << 29;
                              i = (d + b) | 0;
                              g = i >>> 0 < b >>> 0 ? j : g;
                              if (!g & (i >>> 0 < 1000000001)) {
                                d = 0;
                              } else {
                                b = i;
                                l = 0;
                                O = 0;
                                aa: {
                                  if (!g) {
                                    ea = 0;
                                    d = ((b >>> 0) / 1e9) | 0;
                                    break aa;
                                  }
                                  n = (35 - S(g)) | 0;
                                  j = (0 - n) | 0;
                                  d = n & 63;
                                  t = d & 31;
                                  if (d >>> 0 >= 32) {
                                    o = 0;
                                    B = (g >>> t) | 0;
                                  } else {
                                    o = (g >>> t) | 0;
                                    B =
                                      ((((1 << t) - 1) & g) << (32 - t)) |
                                      (i >>> t);
                                  }
                                  d = j & 63;
                                  j = d & 31;
                                  if (d >>> 0 >= 32) {
                                    R = i << j;
                                    t = 0;
                                  } else {
                                    R =
                                      (((1 << j) - 1) & (i >>> (32 - j))) |
                                      (g << j);
                                    t = i << j;
                                  }
                                  if (n) {
                                    while (1) {
                                      i = (o << 1) | (B >>> 31);
                                      l = (B << 1) | (R >>> 31);
                                      j =
                                        (0 -
                                          ((i + (l >>> 0 > 999999999)) | 0)) >>
                                        31;
                                      d = j & 1e9;
                                      B = (l - d) | 0;
                                      o = (i - (d >>> 0 > l >>> 0)) | 0;
                                      R = (R << 1) | (t >>> 31);
                                      t = O | (t << 1);
                                      l = j & 1;
                                      O = l;
                                      n = (n - 1) | 0;
                                      if (n) {
                                        continue;
                                      }
                                      break;
                                    }
                                  }
                                  ea = (R << 1) | (t >>> 31);
                                  d = l | (t << 1);
                                }
                                j = Pg(d, ea, 1e9, 0);
                                i = (b - j) | 0;
                                g = (g - ((ea + (b >>> 0 < j >>> 0)) | 0)) | 0;
                              }
                              J[h >> 2] = i;
                              b = (c | 0) == (N | 0) ? k : g | i ? k : N;
                              i = (k - 1) & 2047;
                              b = (i | 0) != (N | 0) ? k : b;
                              l = (N - 1) | 0;
                              if ((c | 0) != (N | 0)) {
                                continue;
                              }
                              break;
                            }
                            A = (A - 29) | 0;
                            b = k;
                            if (!d) {
                              continue;
                            }
                            break;
                          }
                          c = (c - 1) & 2047;
                          if ((c | 0) == (b | 0)) {
                            g = (e + 784) | 0;
                            b = (g + (((b + 2046) & 2047) << 2)) | 0;
                            J[b >> 2] = J[b >> 2] | J[(g + (i << 2)) >> 2];
                            b = i;
                          }
                          p = (p + 9) | 0;
                          J[(((e + 784) | 0) + (c << 2)) >> 2] = d;
                          continue;
                        }
                        break;
                      }
                      ba: {
                        ca: while (1) {
                          i = (b + 1) & 2047;
                          l = (((e + 784) | 0) + (((b - 1) & 2047) << 2)) | 0;
                          while (1) {
                            t = (p | 0) > 45 ? 9 : 1;
                            da: {
                              while (1) {
                                d = c;
                                h = 0;
                                ea: {
                                  while (1) {
                                    fa: {
                                      c = (d + h) & 2047;
                                      if ((c | 0) == (b | 0)) {
                                        break fa;
                                      }
                                      g = J[(((e + 784) | 0) + (c << 2)) >> 2];
                                      c = J[((h << 2) + 3248) >> 2];
                                      if (g >>> 0 < c >>> 0) {
                                        break fa;
                                      }
                                      if (c >>> 0 < g >>> 0) {
                                        break ea;
                                      }
                                      h = (h + 1) | 0;
                                      if ((h | 0) != 4) {
                                        continue;
                                      }
                                    }
                                    break;
                                  }
                                  if ((p | 0) != 36) {
                                    break ea;
                                  }
                                  i = 0;
                                  g = 0;
                                  h = 0;
                                  k = 0;
                                  j = 0;
                                  while (1) {
                                    c = (d + h) & 2047;
                                    if ((c | 0) == (b | 0)) {
                                      b = (b + 1) & 2047;
                                      J[((((b << 2) + e) | 0) + 780) >> 2] = 0;
                                    }
                                    fb(
                                      (e + 768) | 0,
                                      J[(((e + 784) | 0) + (c << 2)) >> 2],
                                    );
                                    pa(
                                      (e + 752) | 0,
                                      i,
                                      g,
                                      k,
                                      j,
                                      0,
                                      0,
                                      1342177280,
                                      1075633366,
                                    );
                                    Ea(
                                      (e + 736) | 0,
                                      J[(e + 752) >> 2],
                                      J[(e + 756) >> 2],
                                      J[(e + 760) >> 2],
                                      J[(e + 764) >> 2],
                                      J[(e + 768) >> 2],
                                      J[(e + 772) >> 2],
                                      J[(e + 776) >> 2],
                                      J[(e + 780) >> 2],
                                    );
                                    k = J[(e + 744) >> 2];
                                    j = J[(e + 748) >> 2];
                                    i = J[(e + 736) >> 2];
                                    g = J[(e + 740) >> 2];
                                    h = (h + 1) | 0;
                                    if ((h | 0) != 4) {
                                      continue;
                                    }
                                    break;
                                  }
                                  Ja((e + 720) | 0, y);
                                  pa(
                                    (e + 704) | 0,
                                    i,
                                    g,
                                    k,
                                    j,
                                    J[(e + 720) >> 2],
                                    J[(e + 724) >> 2],
                                    J[(e + 728) >> 2],
                                    J[(e + 732) >> 2],
                                  );
                                  i = 0;
                                  g = 0;
                                  k = J[(e + 712) >> 2];
                                  j = J[(e + 716) >> 2];
                                  n = J[(e + 704) >> 2];
                                  o = J[(e + 708) >> 2];
                                  h = (A + 113) | 0;
                                  m = (h - L) | 0;
                                  v = (m | 0) < (I | 0);
                                  l = v ? ((m | 0) > 0 ? m : 0) : I;
                                  if (l >>> 0 <= 112) {
                                    break da;
                                  }
                                  break ba;
                                }
                                A = (t + A) | 0;
                                c = b;
                                if ((b | 0) == (d | 0)) {
                                  continue;
                                }
                                break;
                              }
                              m = (1e9 >>> t) | 0;
                              v = (-1 << t) ^ -1;
                              h = 0;
                              c = d;
                              while (1) {
                                j = (e + 784) | 0;
                                g = (j + (d << 2)) | 0;
                                k = J[g >> 2];
                                h = (h + ((k >>> t) | 0)) | 0;
                                J[g >> 2] = h;
                                g = !h & ((c | 0) == (d | 0));
                                c = g ? (c + 1) & 2047 : c;
                                p = g ? (p - 9) | 0 : p;
                                h = P(m, k & v);
                                d = (d + 1) & 2047;
                                if ((d | 0) != (b | 0)) {
                                  continue;
                                }
                                break;
                              }
                              if (!h) {
                                continue;
                              }
                              if ((c | 0) != (i | 0)) {
                                J[(j + (b << 2)) >> 2] = h;
                                b = i;
                                continue ca;
                              }
                              J[l >> 2] = J[l >> 2] | 1;
                              continue;
                            }
                            break;
                          }
                          break;
                        }
                        Pa((e + 656) | 0, ac((225 - l) | 0));
                        Od(
                          (e + 688) | 0,
                          J[(e + 656) >> 2],
                          J[(e + 660) >> 2],
                          J[(e + 664) >> 2],
                          J[(e + 668) >> 2],
                          j,
                        );
                        E = J[(e + 696) >> 2];
                        G = J[(e + 700) >> 2];
                        C = J[(e + 688) >> 2];
                        D = J[(e + 692) >> 2];
                        Pa((e + 640) | 0, ac((113 - l) | 0));
                        Ld(
                          (e + 672) | 0,
                          n,
                          o,
                          k,
                          j,
                          J[(e + 640) >> 2],
                          J[(e + 644) >> 2],
                          J[(e + 648) >> 2],
                          J[(e + 652) >> 2],
                        );
                        i = J[(e + 672) >> 2];
                        g = J[(e + 676) >> 2];
                        r = J[(e + 680) >> 2];
                        z = J[(e + 684) >> 2];
                        $b((e + 624) | 0, n, o, k, j, i, g, r, z);
                        Ea(
                          (e + 608) | 0,
                          C,
                          D,
                          E,
                          G,
                          J[(e + 624) >> 2],
                          J[(e + 628) >> 2],
                          J[(e + 632) >> 2],
                          J[(e + 636) >> 2],
                        );
                        k = J[(e + 616) >> 2];
                        j = J[(e + 620) >> 2];
                        n = J[(e + 608) >> 2];
                        o = J[(e + 612) >> 2];
                      }
                      c = (d + 4) & 2047;
                      ga: {
                        if ((c | 0) == (b | 0)) {
                          break ga;
                        }
                        c = J[(((e + 784) | 0) + (c << 2)) >> 2];
                        ha: {
                          if (c >>> 0 <= 499999999) {
                            if (!c & (((d + 5) & 2047) == (b | 0))) {
                              break ha;
                            }
                            Pa((e + 496) | 0, +(y | 0) * 0.25);
                            Ea(
                              (e + 480) | 0,
                              i,
                              g,
                              r,
                              z,
                              J[(e + 496) >> 2],
                              J[(e + 500) >> 2],
                              J[(e + 504) >> 2],
                              J[(e + 508) >> 2],
                            );
                            r = J[(e + 488) >> 2];
                            z = J[(e + 492) >> 2];
                            i = J[(e + 480) >> 2];
                            g = J[(e + 484) >> 2];
                            break ha;
                          }
                          if ((c | 0) != 5e8) {
                            Pa((e + 592) | 0, +(y | 0) * 0.75);
                            Ea(
                              (e + 576) | 0,
                              i,
                              g,
                              r,
                              z,
                              J[(e + 592) >> 2],
                              J[(e + 596) >> 2],
                              J[(e + 600) >> 2],
                              J[(e + 604) >> 2],
                            );
                            r = J[(e + 584) >> 2];
                            z = J[(e + 588) >> 2];
                            i = J[(e + 576) >> 2];
                            g = J[(e + 580) >> 2];
                            break ha;
                          }
                          T = +(y | 0);
                          if (((d + 5) & 2047) == (b | 0)) {
                            Pa((e + 528) | 0, T * 0.5);
                            Ea(
                              (e + 512) | 0,
                              i,
                              g,
                              r,
                              z,
                              J[(e + 528) >> 2],
                              J[(e + 532) >> 2],
                              J[(e + 536) >> 2],
                              J[(e + 540) >> 2],
                            );
                            r = J[(e + 520) >> 2];
                            z = J[(e + 524) >> 2];
                            i = J[(e + 512) >> 2];
                            g = J[(e + 516) >> 2];
                            break ha;
                          }
                          Pa((e + 560) | 0, T * 0.75);
                          Ea(
                            (e + 544) | 0,
                            i,
                            g,
                            r,
                            z,
                            J[(e + 560) >> 2],
                            J[(e + 564) >> 2],
                            J[(e + 568) >> 2],
                            J[(e + 572) >> 2],
                          );
                          r = J[(e + 552) >> 2];
                          z = J[(e + 556) >> 2];
                          i = J[(e + 544) >> 2];
                          g = J[(e + 548) >> 2];
                        }
                        if (l >>> 0 > 111) {
                          break ga;
                        }
                        Ld((e + 464) | 0, i, g, r, z, 0, 0, 0, 1073676288);
                        if (
                          Za(
                            J[(e + 464) >> 2],
                            J[(e + 468) >> 2],
                            J[(e + 472) >> 2],
                            J[(e + 476) >> 2],
                            0,
                            0,
                            0,
                            0,
                          )
                        ) {
                          break ga;
                        }
                        Ea((e + 448) | 0, i, g, r, z, 0, 0, 0, 1073676288);
                        r = J[(e + 456) >> 2];
                        z = J[(e + 460) >> 2];
                        i = J[(e + 448) >> 2];
                        g = J[(e + 452) >> 2];
                      }
                      Ea((e + 432) | 0, n, o, k, j, i, g, r, z);
                      $b(
                        (e + 416) | 0,
                        J[(e + 432) >> 2],
                        J[(e + 436) >> 2],
                        J[(e + 440) >> 2],
                        J[(e + 444) >> 2],
                        C,
                        D,
                        E,
                        G,
                      );
                      k = J[(e + 424) >> 2];
                      j = J[(e + 428) >> 2];
                      n = J[(e + 416) >> 2];
                      o = J[(e + 420) >> 2];
                      ia: {
                        if (((f - 2) | 0) >= (h & 2147483647)) {
                          break ia;
                        }
                        J[(e + 408) >> 2] = k;
                        J[(e + 412) >> 2] = j & 2147483647;
                        J[(e + 400) >> 2] = n;
                        J[(e + 404) >> 2] = o;
                        pa((e + 384) | 0, n, o, k, j, 0, 0, 0, 1073610752);
                        c = bc(
                          J[(e + 400) >> 2],
                          J[(e + 404) >> 2],
                          J[(e + 408) >> 2],
                          J[(e + 412) >> 2],
                          1081081856,
                        );
                        d = (c | 0) >= 0;
                        k = d ? J[(e + 392) >> 2] : k;
                        j = d ? J[(e + 396) >> 2] : j;
                        n = d ? J[(e + 384) >> 2] : n;
                        o = d ? J[(e + 388) >> 2] : o;
                        b = Za(i, g, r, z, 0, 0, 0, 0);
                        A = (d + A) | 0;
                        if (((A + 110) | 0) <= (f | 0)) {
                          if (
                            !(
                              v &
                              (((l | 0) != (m | 0)) | ((c | 0) < 0)) &
                              ((b | 0) != 0)
                            )
                          ) {
                            break ia;
                          }
                        }
                        J[3876] = 68;
                      }
                      Nd((e + 368) | 0, n, o, k, j, A);
                      i = J[(e + 376) >> 2];
                      g = J[(e + 380) >> 2];
                      c = J[(e + 372) >> 2];
                      b = J[(e + 368) >> 2];
                    }
                    J[(q + 40) >> 2] = i;
                    J[(q + 44) >> 2] = g;
                    J[(q + 32) >> 2] = b;
                    J[(q + 36) >> 2] = c;
                    da = (e + 8976) | 0;
                    i = J[(q + 40) >> 2];
                    g = J[(q + 44) >> 2];
                    k = J[(q + 32) >> 2];
                    j = J[(q + 36) >> 2];
                    break a;
                  }
                  break a;
                }
                g = 0;
              }
              J[a >> 2] = k;
              J[(a + 4) >> 2] = j;
              J[(a + 8) >> 2] = i;
              J[(a + 12) >> 2] = g;
              da = (q + 48) | 0;
            }
            function xa(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0;
              d = (da - 128) | 0;
              da = d;
              a: {
                b: {
                  if (b) {
                    i = J[a >> 2];
                    c: {
                      if (!i) {
                        break c;
                      }
                      h = J[(a + 4) >> 2];
                      if ((h | 0) == (i | 0)) {
                        break c;
                      }
                      j = i;
                      i = J[(a + 16) >> 2];
                      if ((j | 0) == (i | 0)) {
                        break c;
                      }
                      f = h;
                      if (!f) {
                        break c;
                      }
                      h = J[(a + 8) >> 2];
                      if ((h | 0) == (f | 0)) {
                        break c;
                      }
                      j = J[(a + 20) >> 2];
                      if (!h | ((j | 0) == (f | 0))) {
                        break c;
                      }
                      f = J[(a + 12) >> 2];
                      if ((f | 0) == (h | 0)) {
                        break c;
                      }
                      k = J[(a + 24) >> 2];
                      if (!f | ((k | 0) == (h | 0))) {
                        break c;
                      }
                      h = J[(a + 28) >> 2];
                      if (!i | ((i | 0) == (j | 0)) | ((f | 0) == (h | 0))) {
                        break c;
                      }
                      f = i;
                      i = J[(a + 32) >> 2];
                      if (!j | ((f | 0) == (i | 0)) | ((j | 0) == (k | 0))) {
                        break c;
                      }
                      f = j;
                      j = J[(a + 36) >> 2];
                      if (!k | ((f | 0) == (j | 0)) | ((h | 0) == (k | 0))) {
                        break c;
                      }
                      f = J[(a + 40) >> 2];
                      if (!h | ((f | 0) == (k | 0))) {
                        break c;
                      }
                      k = h;
                      h = J[(a + 44) >> 2];
                      if (!i | ((k | 0) == (h | 0)) | ((i | 0) == (j | 0))) {
                        break c;
                      }
                      k = i;
                      i = J[(a + 48) >> 2];
                      if (!j | ((k | 0) == (i | 0)) | ((f | 0) == (j | 0))) {
                        break c;
                      }
                      k = j;
                      j = J[(a + 52) >> 2];
                      if (!f | ((k | 0) == (j | 0)) | ((f | 0) == (h | 0))) {
                        break c;
                      }
                      k = f;
                      f = J[(a + 56) >> 2];
                      if (!h | ((k | 0) == (f | 0))) {
                        break c;
                      }
                      k = h;
                      h = J[(a + 60) >> 2];
                      if ((k | 0) == (h | 0)) {
                        break c;
                      }
                      d: {
                        if (
                          !i |
                          ((i | 0) == (j | 0)) |
                          (!j | ((f | 0) == (j | 0)))
                        ) {
                          break d;
                        }
                        if (!f | ((f | 0) == (h | 0))) {
                          break d;
                        }
                        l = 1;
                        if (h) {
                          break c;
                        }
                      }
                      l = 0;
                    }
                    if (!l) {
                      break b;
                    }
                  }
                  e = gc(a);
                  break a;
                }
                e: {
                  if (!c) {
                    i = J[a >> 2];
                    c = J[(a + 4) >> 2];
                    h =
                      (!J[(a + 60) >> 2] +
                        ((!J[(a + 56) >> 2] +
                          ((!J[(a + 52) >> 2] +
                            ((!J[(a + 48) >> 2] +
                              ((!J[(a + 44) >> 2] +
                                ((!J[(a + 40) >> 2] +
                                  ((!J[(a + 36) >> 2] +
                                    ((!J[(a + 32) >> 2] +
                                      ((!J[(a + 28) >> 2] +
                                        ((!J[(a + 24) >> 2] +
                                          ((!J[(a + 20) >> 2] +
                                            ((!J[(a + 16) >> 2] +
                                              ((!J[(a + 12) >> 2] +
                                                ((!J[(a + 8) >> 2] +
                                                  ((!i + !c) | 0)) |
                                                  0)) |
                                                0)) |
                                              0)) |
                                            0)) |
                                          0)) |
                                        0)) |
                                      0)) |
                                    0)) |
                                  0)) |
                                0)) |
                              0)) |
                            0)) |
                          0)) |
                      0;
                    if (h) {
                      break e;
                    }
                    e = gc(a);
                    break a;
                  }
                  c = J[(a + 4) >> 2];
                  J[d >> 2] = J[a >> 2];
                  J[(d + 4) >> 2] = c;
                  c = J[(a + 12) >> 2];
                  J[(d + 8) >> 2] = J[(a + 8) >> 2];
                  J[(d + 12) >> 2] = c;
                  c = J[(a + 20) >> 2];
                  J[(d + 16) >> 2] = J[(a + 16) >> 2];
                  J[(d + 20) >> 2] = c;
                  c = J[(a + 28) >> 2];
                  J[(d + 24) >> 2] = J[(a + 24) >> 2];
                  J[(d + 28) >> 2] = c;
                  c = J[(a + 36) >> 2];
                  J[(d + 32) >> 2] = J[(a + 32) >> 2];
                  J[(d + 36) >> 2] = c;
                  c = J[(a + 44) >> 2];
                  J[(d + 40) >> 2] = J[(a + 40) >> 2];
                  J[(d + 44) >> 2] = c;
                  c = J[(a + 52) >> 2];
                  J[(d + 48) >> 2] = J[(a + 48) >> 2];
                  J[(d + 52) >> 2] = c;
                  c = J[(a + 60) >> 2];
                  J[(d + 56) >> 2] = J[(a + 56) >> 2];
                  J[(d + 60) >> 2] = c;
                  Ya((d - -64) | 0, d, 0);
                  c = (b - 1) | 0;
                  if (
                    (J[(d + 64) >> 2] ^ J[a >> 2]) |
                    (J[(d + 72) >> 2] ^ J[(a + 8) >> 2]) |
                    ((J[(d + 80) >> 2] ^ J[(a + 16) >> 2]) |
                      (J[(d + 88) >> 2] ^ J[(a + 24) >> 2])) |
                    ((J[(d + 96) >> 2] ^ J[(a + 32) >> 2]) |
                      (J[(d + 104) >> 2] ^ J[(a + 40) >> 2]) |
                      ((J[(d + 112) >> 2] ^ J[(a + 48) >> 2]) |
                        (J[(d + 120) >> 2] ^ J[(a + 56) >> 2]))) |
                    ((J[(d + 68) >> 2] ^ J[(a + 4) >> 2]) |
                      (J[(d + 76) >> 2] ^ J[(a + 12) >> 2]) |
                      ((J[(d + 84) >> 2] ^ J[(a + 20) >> 2]) |
                        (J[(d + 92) >> 2] ^ J[(a + 28) >> 2])) |
                      ((J[(d + 100) >> 2] ^ J[(a + 36) >> 2]) |
                        (J[(d + 108) >> 2] ^ J[(a + 44) >> 2]) |
                        ((J[(d + 116) >> 2] ^ J[(a + 52) >> 2]) |
                          (J[(d + 124) >> 2] ^ J[(a + 60) >> 2]))))
                  ) {
                    e = xa((d - -64) | 0, c, 0);
                    e = e > -1e9 ? e : -1e9;
                  } else {
                    e = -1e9;
                  }
                  b = J[(a + 4) >> 2];
                  J[d >> 2] = J[a >> 2];
                  J[(d + 4) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 8) >> 2] = J[(a + 8) >> 2];
                  J[(d + 12) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 16) >> 2] = J[(a + 16) >> 2];
                  J[(d + 20) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 24) >> 2] = J[(a + 24) >> 2];
                  J[(d + 28) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 32) >> 2] = J[(a + 32) >> 2];
                  J[(d + 36) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 40) >> 2] = J[(a + 40) >> 2];
                  J[(d + 44) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 48) >> 2] = J[(a + 48) >> 2];
                  J[(d + 52) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 56) >> 2] = J[(a + 56) >> 2];
                  J[(d + 60) >> 2] = b;
                  b = (d - -64) | 0;
                  Ya(b, d, 1);
                  if (
                    (J[(d + 64) >> 2] ^ J[a >> 2]) |
                    (J[(d + 72) >> 2] ^ J[(a + 8) >> 2]) |
                    ((J[(d + 80) >> 2] ^ J[(a + 16) >> 2]) |
                      (J[(d + 88) >> 2] ^ J[(a + 24) >> 2])) |
                    ((J[(d + 96) >> 2] ^ J[(a + 32) >> 2]) |
                      (J[(d + 104) >> 2] ^ J[(a + 40) >> 2]) |
                      ((J[(d + 112) >> 2] ^ J[(a + 48) >> 2]) |
                        (J[(d + 120) >> 2] ^ J[(a + 56) >> 2]))) |
                    ((J[(d + 68) >> 2] ^ J[(a + 4) >> 2]) |
                      (J[(d + 76) >> 2] ^ J[(a + 12) >> 2]) |
                      ((J[(d + 84) >> 2] ^ J[(a + 20) >> 2]) |
                        (J[(d + 92) >> 2] ^ J[(a + 28) >> 2])) |
                      ((J[(d + 100) >> 2] ^ J[(a + 36) >> 2]) |
                        (J[(d + 108) >> 2] ^ J[(a + 44) >> 2]) |
                        ((J[(d + 116) >> 2] ^ J[(a + 52) >> 2]) |
                          (J[(d + 124) >> 2] ^ J[(a + 60) >> 2]))))
                  ) {
                    g = xa(b, c, 0);
                    e = e < g ? g : e;
                  }
                  b = J[(a + 4) >> 2];
                  J[d >> 2] = J[a >> 2];
                  J[(d + 4) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 8) >> 2] = J[(a + 8) >> 2];
                  J[(d + 12) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 16) >> 2] = J[(a + 16) >> 2];
                  J[(d + 20) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 24) >> 2] = J[(a + 24) >> 2];
                  J[(d + 28) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 32) >> 2] = J[(a + 32) >> 2];
                  J[(d + 36) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 40) >> 2] = J[(a + 40) >> 2];
                  J[(d + 44) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 48) >> 2] = J[(a + 48) >> 2];
                  J[(d + 52) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 56) >> 2] = J[(a + 56) >> 2];
                  J[(d + 60) >> 2] = b;
                  b = (d - -64) | 0;
                  Ya(b, d, 2);
                  if (
                    (J[(d + 64) >> 2] ^ J[a >> 2]) |
                    (J[(d + 72) >> 2] ^ J[(a + 8) >> 2]) |
                    ((J[(d + 80) >> 2] ^ J[(a + 16) >> 2]) |
                      (J[(d + 88) >> 2] ^ J[(a + 24) >> 2])) |
                    ((J[(d + 96) >> 2] ^ J[(a + 32) >> 2]) |
                      (J[(d + 104) >> 2] ^ J[(a + 40) >> 2]) |
                      ((J[(d + 112) >> 2] ^ J[(a + 48) >> 2]) |
                        (J[(d + 120) >> 2] ^ J[(a + 56) >> 2]))) |
                    ((J[(d + 68) >> 2] ^ J[(a + 4) >> 2]) |
                      (J[(d + 76) >> 2] ^ J[(a + 12) >> 2]) |
                      ((J[(d + 84) >> 2] ^ J[(a + 20) >> 2]) |
                        (J[(d + 92) >> 2] ^ J[(a + 28) >> 2])) |
                      ((J[(d + 100) >> 2] ^ J[(a + 36) >> 2]) |
                        (J[(d + 108) >> 2] ^ J[(a + 44) >> 2]) |
                        ((J[(d + 116) >> 2] ^ J[(a + 52) >> 2]) |
                          (J[(d + 124) >> 2] ^ J[(a + 60) >> 2]))))
                  ) {
                    g = xa(b, c, 0);
                    e = e < g ? g : e;
                  }
                  b = J[(a + 4) >> 2];
                  J[d >> 2] = J[a >> 2];
                  J[(d + 4) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 8) >> 2] = J[(a + 8) >> 2];
                  J[(d + 12) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 16) >> 2] = J[(a + 16) >> 2];
                  J[(d + 20) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 24) >> 2] = J[(a + 24) >> 2];
                  J[(d + 28) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 32) >> 2] = J[(a + 32) >> 2];
                  J[(d + 36) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 40) >> 2] = J[(a + 40) >> 2];
                  J[(d + 44) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 48) >> 2] = J[(a + 48) >> 2];
                  J[(d + 52) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 56) >> 2] = J[(a + 56) >> 2];
                  J[(d + 60) >> 2] = b;
                  b = (d - -64) | 0;
                  Ya(b, d, 3);
                  if (
                    !(
                      (J[(d + 64) >> 2] ^ J[a >> 2]) |
                      (J[(d + 72) >> 2] ^ J[(a + 8) >> 2]) |
                      ((J[(d + 80) >> 2] ^ J[(a + 16) >> 2]) |
                        (J[(d + 88) >> 2] ^ J[(a + 24) >> 2])) |
                      ((J[(d + 96) >> 2] ^ J[(a + 32) >> 2]) |
                        (J[(d + 104) >> 2] ^ J[(a + 40) >> 2]) |
                        ((J[(d + 112) >> 2] ^ J[(a + 48) >> 2]) |
                          (J[(d + 120) >> 2] ^ J[(a + 56) >> 2]))) |
                      ((J[(d + 68) >> 2] ^ J[(a + 4) >> 2]) |
                        (J[(d + 76) >> 2] ^ J[(a + 12) >> 2]) |
                        ((J[(d + 84) >> 2] ^ J[(a + 20) >> 2]) |
                          (J[(d + 92) >> 2] ^ J[(a + 28) >> 2])) |
                        ((J[(d + 100) >> 2] ^ J[(a + 36) >> 2]) |
                          (J[(d + 108) >> 2] ^ J[(a + 44) >> 2]) |
                          ((J[(d + 116) >> 2] ^ J[(a + 52) >> 2]) |
                            (J[(d + 124) >> 2] ^ J[(a + 60) >> 2]))))
                    )
                  ) {
                    break a;
                  }
                  g = xa(b, c, 0);
                  e = e < g ? g : e;
                  break a;
                }
                f = (b - 1) | 0;
                g = 1 / +(h >>> 0);
                if (!i) {
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  J[(d + 64) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + 0;
                  c = J[(a + 4) >> 2];
                }
                if (!c) {
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  J[(d + 68) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 8) >> 2]) {
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 72) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 12) >> 2]) {
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 76) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 16) >> 2]) {
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 80) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 20) >> 2]) {
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 84) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 24) >> 2]) {
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 88) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 28) >> 2]) {
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 92) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 32) >> 2]) {
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 96) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 36) >> 2]) {
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 100) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 40) >> 2]) {
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 104) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 44) >> 2]) {
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 108) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 48) >> 2]) {
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 112) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 52) >> 2]) {
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 116) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (!J[(a + 56) >> 2]) {
                  b = J[(a + 60) >> 2];
                  J[(d + 120) >> 2] = J[(a + 56) >> 2];
                  J[(d + 124) >> 2] = b;
                  b = J[(a + 52) >> 2];
                  J[(d + 112) >> 2] = J[(a + 48) >> 2];
                  J[(d + 116) >> 2] = b;
                  b = J[(a + 44) >> 2];
                  J[(d + 104) >> 2] = J[(a + 40) >> 2];
                  J[(d + 108) >> 2] = b;
                  b = J[(a + 36) >> 2];
                  J[(d + 96) >> 2] = J[(a + 32) >> 2];
                  J[(d + 100) >> 2] = b;
                  b = J[(a + 28) >> 2];
                  J[(d + 88) >> 2] = J[(a + 24) >> 2];
                  J[(d + 92) >> 2] = b;
                  b = J[(a + 20) >> 2];
                  J[(d + 80) >> 2] = J[(a + 16) >> 2];
                  J[(d + 84) >> 2] = b;
                  b = J[(a + 12) >> 2];
                  J[(d + 72) >> 2] = J[(a + 8) >> 2];
                  J[(d + 76) >> 2] = b;
                  b = J[(a + 4) >> 2];
                  J[(d + 64) >> 2] = J[a >> 2];
                  J[(d + 68) >> 2] = b;
                  J[(d + 120) >> 2] = 2;
                  e = g * xa((d - -64) | 0, f, 1) + e;
                }
                if (J[(a + 60) >> 2]) {
                  break a;
                }
                J[(d + 120) >> 2] = J[(a + 56) >> 2];
                b = J[(a + 52) >> 2];
                J[(d + 112) >> 2] = J[(a + 48) >> 2];
                J[(d + 116) >> 2] = b;
                b = J[(a + 44) >> 2];
                J[(d + 104) >> 2] = J[(a + 40) >> 2];
                J[(d + 108) >> 2] = b;
                b = J[(a + 36) >> 2];
                J[(d + 96) >> 2] = J[(a + 32) >> 2];
                J[(d + 100) >> 2] = b;
                b = J[(a + 28) >> 2];
                J[(d + 88) >> 2] = J[(a + 24) >> 2];
                J[(d + 92) >> 2] = b;
                b = J[(a + 20) >> 2];
                J[(d + 80) >> 2] = J[(a + 16) >> 2];
                J[(d + 84) >> 2] = b;
                b = J[(a + 12) >> 2];
                J[(d + 72) >> 2] = J[(a + 8) >> 2];
                J[(d + 76) >> 2] = b;
                b = J[(a + 4) >> 2];
                J[(d + 64) >> 2] = J[a >> 2];
                J[(d + 68) >> 2] = b;
                J[(d + 124) >> 2] = 2;
                e = g * xa((d - -64) | 0, f, 1) + e;
              }
              da = (d + 128) | 0;
              return e;
            }
            function rd(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0,
                u = 0,
                v = 0,
                w = 0,
                x = 0,
                y = 0,
                z = 0;
              y = (da - 16) | 0;
              da = y;
              J[y >> 2] = J[c >> 2];
              t = (da - 16) | 0;
              da = t;
              J[(t + 12) >> 2] = b;
              J[(t + 8) >> 2] = y;
              z = $a((t + 4) | 0, (t + 12) | 0);
              v = J[(t + 8) >> 2];
              d = (da - 144) | 0;
              da = d;
              D(d, 0, 144);
              J[(d + 76) >> 2] = -1;
              J[(d + 44) >> 2] = a;
              J[(d + 32) >> 2] = 48;
              J[(d + 84) >> 2] = a;
              e = 1353;
              h = (da - 304) | 0;
              da = h;
              a: {
                b: {
                  if (!J[(d + 4) >> 2]) {
                    md(d);
                    if (!J[(d + 4) >> 2]) {
                      break b;
                    }
                  }
                  b = K[1353];
                  if (!b) {
                    break a;
                  }
                  c: {
                    d: {
                      while (1) {
                        e: {
                          a = b & 255;
                          f: {
                            if (((a | 0) == 32) | ((a - 9) >>> 0 < 5)) {
                              while (1) {
                                b = e;
                                e = (e + 1) | 0;
                                a = K[(b + 1) | 0];
                                if (((a | 0) == 32) | ((a - 9) >>> 0 < 5)) {
                                  continue;
                                }
                                break;
                              }
                              Na(d, 0, 0);
                              while (1) {
                                a = J[(d + 4) >> 2];
                                g: {
                                  if ((a | 0) != J[(d + 104) >> 2]) {
                                    J[(d + 4) >> 2] = a + 1;
                                    a = K[a | 0];
                                    break g;
                                  }
                                  a = ma(d);
                                }
                                if (((a | 0) == 32) | ((a - 9) >>> 0 < 5)) {
                                  continue;
                                }
                                break;
                              }
                              e = J[(d + 4) >> 2];
                              a = J[(d + 116) >> 2];
                              if ((a | 0) > 0) {
                                a = 1;
                              } else {
                                a = (a | 0) >= 0;
                              }
                              if (a) {
                                e = (e - 1) | 0;
                                J[(d + 4) >> 2] = e;
                              }
                              a = (e - J[(d + 44) >> 2]) | 0;
                              c = a;
                              f = a >> 31;
                              a = (s + J[(d + 124) >> 2]) | 0;
                              g = (a + 1) | 0;
                              e = a;
                              a = (l + J[(d + 120) >> 2]) | 0;
                              f = (f + (a >>> 0 < l >>> 0 ? g : e)) | 0;
                              l = (a + c) | 0;
                              s = l >>> 0 < a >>> 0 ? (f + 1) | 0 : f;
                              break f;
                            }
                            h: {
                              i: {
                                j: {
                                  if ((a | 0) == 37) {
                                    a = K[(e + 1) | 0];
                                    if ((a | 0) == 42) {
                                      break j;
                                    }
                                    if ((a | 0) != 37) {
                                      break i;
                                    }
                                  }
                                  Na(d, 0, 0);
                                  k: {
                                    if (K[e | 0] == 37) {
                                      while (1) {
                                        a = J[(d + 4) >> 2];
                                        l: {
                                          if ((a | 0) != J[(d + 104) >> 2]) {
                                            J[(d + 4) >> 2] = a + 1;
                                            b = K[a | 0];
                                            break l;
                                          }
                                          b = ma(d);
                                        }
                                        if (
                                          ((b | 0) == 32) |
                                          ((b - 9) >>> 0 < 5)
                                        ) {
                                          continue;
                                        }
                                        break;
                                      }
                                      e = (e + 1) | 0;
                                      break k;
                                    }
                                    a = J[(d + 4) >> 2];
                                    if ((a | 0) != J[(d + 104) >> 2]) {
                                      J[(d + 4) >> 2] = a + 1;
                                      b = K[a | 0];
                                      break k;
                                    }
                                    b = ma(d);
                                  }
                                  if (K[e | 0] != (b | 0)) {
                                    a = J[(d + 116) >> 2];
                                    if ((a | 0) > 0) {
                                      a = 1;
                                    } else {
                                      a = (a | 0) >= 0;
                                    }
                                    if (a) {
                                      J[(d + 4) >> 2] = J[(d + 4) >> 2] - 1;
                                    }
                                    if (u | ((b | 0) >= 0)) {
                                      break a;
                                    }
                                    break b;
                                  }
                                  a = (J[(d + 4) >> 2] - J[(d + 44) >> 2]) | 0;
                                  b = a;
                                  f = a >> 31;
                                  a = (s + J[(d + 124) >> 2]) | 0;
                                  g = (a + 1) | 0;
                                  c = a;
                                  a = (l + J[(d + 120) >> 2]) | 0;
                                  c = (f + (a >>> 0 < l >>> 0 ? g : c)) | 0;
                                  l = (a + b) | 0;
                                  s = l >>> 0 < a >>> 0 ? (c + 1) | 0 : c;
                                  b = e;
                                  break f;
                                }
                                k = 0;
                                b = (e + 2) | 0;
                                break h;
                              }
                              a = (a - 48) | 0;
                              if (!((K[(e + 2) | 0] != 36) | (a >>> 0 > 9))) {
                                b = (da - 16) | 0;
                                J[(b + 12) >> 2] = v;
                                a =
                                  a >>> 0 > 1
                                    ? ((((a << 2) + v) | 0) - 4) | 0
                                    : v;
                                J[(b + 8) >> 2] = a + 4;
                                k = J[a >> 2];
                                b = (e + 3) | 0;
                                break h;
                              }
                              k = J[v >> 2];
                              v = (v + 4) | 0;
                              b = (e + 1) | 0;
                            }
                            r = 0;
                            c = 0;
                            e = K[b | 0];
                            if (((e - 48) & 255) >>> 0 <= 9) {
                              while (1) {
                                c = (((P(c, 10) + (e & 255)) | 0) - 48) | 0;
                                e = K[(b + 1) | 0];
                                b = (b + 1) | 0;
                                if (((e - 48) & 255) >>> 0 < 10) {
                                  continue;
                                }
                                break;
                              }
                            }
                            if ((e & 255) == 109) {
                              n = 0;
                              r = (k | 0) != 0;
                              e = K[(b + 1) | 0];
                              o = 0;
                              b = (b + 1) | 0;
                            }
                            f = b;
                            b = (f + 1) | 0;
                            a = 3;
                            m: {
                              n: {
                                switch (((e & 255) - 65) | 0) {
                                  case 39:
                                    a = K[(f + 1) | 0] == 104;
                                    b = a ? (f + 2) | 0 : b;
                                    a = a ? -2 : -1;
                                    break m;
                                  case 43:
                                    a = K[(f + 1) | 0] == 108;
                                    b = a ? (f + 2) | 0 : b;
                                    a = a ? 3 : 1;
                                    break m;
                                  case 51:
                                  case 57:
                                    a = 1;
                                    break m;
                                  case 11:
                                    a = 2;
                                    break m;
                                  case 0:
                                  case 2:
                                  case 4:
                                  case 5:
                                  case 6:
                                  case 18:
                                  case 23:
                                  case 26:
                                  case 32:
                                  case 34:
                                  case 35:
                                  case 36:
                                  case 37:
                                  case 38:
                                  case 40:
                                  case 45:
                                  case 46:
                                  case 47:
                                  case 50:
                                  case 52:
                                  case 55:
                                    break n;
                                  case 41:
                                    break m;
                                  default:
                                    break d;
                                }
                              }
                              a = 0;
                              b = f;
                            }
                            e = a;
                            a = K[b | 0];
                            f = (a & 47) == 3;
                            w = f ? 1 : e;
                            q = f ? a | 32 : a;
                            o: {
                              if ((q | 0) == 91) {
                                break o;
                              }
                              p: {
                                if ((q | 0) != 110) {
                                  if ((q | 0) != 99) {
                                    break p;
                                  }
                                  c = (c | 0) <= 1 ? 1 : c;
                                  break o;
                                }
                                Hd(k, w, l, s);
                                break f;
                              }
                              Na(d, 0, 0);
                              while (1) {
                                a = J[(d + 4) >> 2];
                                q: {
                                  if ((a | 0) != J[(d + 104) >> 2]) {
                                    J[(d + 4) >> 2] = a + 1;
                                    a = K[a | 0];
                                    break q;
                                  }
                                  a = ma(d);
                                }
                                if (((a | 0) == 32) | ((a - 9) >>> 0 < 5)) {
                                  continue;
                                }
                                break;
                              }
                              e = J[(d + 4) >> 2];
                              a = J[(d + 116) >> 2];
                              if ((a | 0) > 0) {
                                a = 1;
                              } else {
                                a = (a | 0) >= 0;
                              }
                              if (a) {
                                e = (e - 1) | 0;
                                J[(d + 4) >> 2] = e;
                              }
                              a = (e - J[(d + 44) >> 2]) | 0;
                              f = a;
                              g = a >> 31;
                              a = (s + J[(d + 124) >> 2]) | 0;
                              j = (a + 1) | 0;
                              e = a;
                              a = (l + J[(d + 120) >> 2]) | 0;
                              e = (g + (a >>> 0 < l >>> 0 ? j : e)) | 0;
                              l = (a + f) | 0;
                              s = l >>> 0 < a >>> 0 ? (e + 1) | 0 : e;
                            }
                            j = c;
                            m = c >> 31;
                            Na(d, c, m);
                            a = J[(d + 4) >> 2];
                            r: {
                              if ((a | 0) != J[(d + 104) >> 2]) {
                                J[(d + 4) >> 2] = a + 1;
                                break r;
                              }
                              if ((ma(d) | 0) < 0) {
                                break d;
                              }
                            }
                            a = J[(d + 116) >> 2];
                            if ((a | 0) > 0) {
                              a = 1;
                            } else {
                              a = (a | 0) >= 0;
                            }
                            if (a) {
                              J[(d + 4) >> 2] = J[(d + 4) >> 2] - 1;
                            }
                            e = 16;
                            s: {
                              t: {
                                u: {
                                  v: {
                                    w: {
                                      x: {
                                        y: {
                                          switch ((q - 88) | 0) {
                                            default:
                                              a = (q - 65) | 0;
                                              if (
                                                (a >>> 0 > 6) |
                                                !((1 << a) & 113)
                                              ) {
                                                break s;
                                              }
                                            case 9:
                                            case 13:
                                            case 14:
                                            case 15:
                                              Kd((h + 8) | 0, d, w, 0);
                                              a =
                                                (J[(d + 4) >> 2] -
                                                  J[(d + 44) >> 2]) |
                                                0;
                                              if (
                                                (J[(d + 120) >> 2] ==
                                                  ((0 - a) | 0)) &
                                                (J[(d + 124) >> 2] ==
                                                  ((0 -
                                                    (((a >> 31) +
                                                      ((a | 0) != 0)) |
                                                      0)) |
                                                    0))
                                              ) {
                                                break c;
                                              }
                                              if (!k) {
                                                break s;
                                              }
                                              a = J[(h + 16) >> 2];
                                              c = J[(h + 20) >> 2];
                                              f = J[(h + 8) >> 2];
                                              e = J[(h + 12) >> 2];
                                              switch (w | 0) {
                                                case 0:
                                                  break w;
                                                case 1:
                                                  break v;
                                                case 2:
                                                  break u;
                                                default:
                                                  break s;
                                              }
                                            case 3:
                                            case 11:
                                            case 27:
                                              if ((q | 16) == 115) {
                                                Fd((h + 32) | 0, -1);
                                                H[(h + 32) | 0] = 0;
                                                if ((q | 0) != 115) {
                                                  break t;
                                                }
                                                H[(h + 65) | 0] = 0;
                                                H[(h + 46) | 0] = 0;
                                                I[(h + 42) >> 1] = 0;
                                                I[(h + 44) >> 1] = 0;
                                                break t;
                                              }
                                              a = K[(b + 1) | 0];
                                              f = (a | 0) == 94;
                                              Fd((h + 32) | 0, f);
                                              H[(h + 32) | 0] = 0;
                                              e = f ? (b + 2) | 0 : (b + 1) | 0;
                                              z: {
                                                A: {
                                                  B: {
                                                    b =
                                                      K[((f ? 2 : 1) + b) | 0];
                                                    if ((b | 0) != 45) {
                                                      if ((b | 0) == 93) {
                                                        break B;
                                                      }
                                                      i = (a | 0) != 94;
                                                      b = e;
                                                      break z;
                                                    }
                                                    i = (a | 0) != 94;
                                                    H[(h + 78) | 0] = i;
                                                    break A;
                                                  }
                                                  i = (a | 0) != 94;
                                                  H[(h + 126) | 0] = i;
                                                }
                                                b = (e + 1) | 0;
                                              }
                                              while (1) {
                                                a = K[b | 0];
                                                C: {
                                                  if ((a | 0) != 45) {
                                                    if (!a) {
                                                      break d;
                                                    }
                                                    if ((a | 0) == 93) {
                                                      break t;
                                                    }
                                                    break C;
                                                  }
                                                  a = 45;
                                                  f = K[(b + 1) | 0];
                                                  if (!f | ((f | 0) == 93)) {
                                                    break C;
                                                  }
                                                  g = (b + 1) | 0;
                                                  e = K[(b - 1) | 0];
                                                  D: {
                                                    if (f >>> 0 <= e >>> 0) {
                                                      a = f;
                                                      break D;
                                                    }
                                                    while (1) {
                                                      e = (e + 1) | 0;
                                                      H[
                                                        (e + ((h + 32) | 0)) | 0
                                                      ] = i;
                                                      a = K[g | 0];
                                                      if (e >>> 0 < a >>> 0) {
                                                        continue;
                                                      }
                                                      break;
                                                    }
                                                  }
                                                  b = g;
                                                }
                                                H[
                                                  (((((h + 32) | 0) + a) | 0) +
                                                    1) |
                                                    0
                                                ] = i;
                                                b = (b + 1) | 0;
                                                continue;
                                              }
                                            case 23:
                                              e = 8;
                                              break x;
                                            case 12:
                                            case 29:
                                              e = 10;
                                              break x;
                                            case 0:
                                            case 24:
                                            case 32:
                                              break x;
                                            case 1:
                                            case 2:
                                            case 4:
                                            case 5:
                                            case 6:
                                            case 7:
                                            case 8:
                                            case 10:
                                            case 16:
                                            case 18:
                                            case 19:
                                            case 20:
                                            case 21:
                                            case 22:
                                            case 25:
                                            case 26:
                                            case 28:
                                            case 30:
                                            case 31:
                                              break s;
                                            case 17:
                                              break y;
                                          }
                                        }
                                        e = 0;
                                      }
                                      f = 0;
                                      j = 0;
                                      c = 0;
                                      g = 0;
                                      i = 0;
                                      x = (da - 16) | 0;
                                      da = x;
                                      E: {
                                        if (
                                          !(((e | 0) != 1) & (e >>> 0 <= 36))
                                        ) {
                                          J[3876] = 28;
                                          break E;
                                        }
                                        while (1) {
                                          a = J[(d + 4) >> 2];
                                          F: {
                                            if ((a | 0) != J[(d + 104) >> 2]) {
                                              J[(d + 4) >> 2] = a + 1;
                                              a = K[a | 0];
                                              break F;
                                            }
                                            a = ma(d);
                                          }
                                          if (
                                            ((a | 0) == 32) |
                                            ((a - 9) >>> 0 < 5)
                                          ) {
                                            continue;
                                          }
                                          break;
                                        }
                                        G: {
                                          H: {
                                            switch ((a - 43) | 0) {
                                              case 0:
                                              case 2:
                                                break H;
                                              default:
                                                break G;
                                            }
                                          }
                                          i = (a | 0) == 45 ? -1 : 0;
                                          a = J[(d + 4) >> 2];
                                          if ((a | 0) != J[(d + 104) >> 2]) {
                                            J[(d + 4) >> 2] = a + 1;
                                            a = K[a | 0];
                                            break G;
                                          }
                                          a = ma(d);
                                        }
                                        I: {
                                          J: {
                                            K: {
                                              L: {
                                                if (
                                                  !(
                                                    (((e | 0) != 0) &
                                                      ((e | 0) != 16)) |
                                                    ((a | 0) != 48)
                                                  )
                                                ) {
                                                  a = J[(d + 4) >> 2];
                                                  M: {
                                                    if (
                                                      (a | 0) !=
                                                      J[(d + 104) >> 2]
                                                    ) {
                                                      J[(d + 4) >> 2] = a + 1;
                                                      a = K[a | 0];
                                                      break M;
                                                    }
                                                    a = ma(d);
                                                  }
                                                  if ((a & -33) == 88) {
                                                    e = 16;
                                                    a = J[(d + 4) >> 2];
                                                    N: {
                                                      if (
                                                        (a | 0) !=
                                                        J[(d + 104) >> 2]
                                                      ) {
                                                        J[(d + 4) >> 2] = a + 1;
                                                        a = K[a | 0];
                                                        break N;
                                                      }
                                                      a = ma(d);
                                                    }
                                                    if (
                                                      K[(a + 3329) | 0] < 16
                                                    ) {
                                                      break K;
                                                    }
                                                    a = J[(d + 116) >> 2];
                                                    if ((a | 0) > 0) {
                                                      a = 1;
                                                    } else {
                                                      a = (a | 0) >= 0;
                                                    }
                                                    if (a) {
                                                      J[(d + 4) >> 2] =
                                                        J[(d + 4) >> 2] - 1;
                                                    }
                                                    Na(d, 0, 0);
                                                    break E;
                                                  }
                                                  if (e) {
                                                    break L;
                                                  }
                                                  e = 8;
                                                  break K;
                                                }
                                                e = e ? e : 10;
                                                if (
                                                  e >>> 0 >
                                                  K[(a + 3329) | 0]
                                                ) {
                                                  break L;
                                                }
                                                a = J[(d + 116) >> 2];
                                                if ((a | 0) > 0) {
                                                  a = 1;
                                                } else {
                                                  a = (a | 0) >= 0;
                                                }
                                                if (a) {
                                                  J[(d + 4) >> 2] =
                                                    J[(d + 4) >> 2] - 1;
                                                }
                                                Na(d, 0, 0);
                                                J[3876] = 28;
                                                break E;
                                              }
                                              if ((e | 0) != 10) {
                                                break K;
                                              }
                                              c = (a - 48) | 0;
                                              if (c >>> 0 <= 9) {
                                                a = 0;
                                                while (1) {
                                                  a = (P(a, 10) + c) | 0;
                                                  e = a >>> 0 < 429496729;
                                                  c = J[(d + 4) >> 2];
                                                  O: {
                                                    if (
                                                      (c | 0) !=
                                                      J[(d + 104) >> 2]
                                                    ) {
                                                      J[(d + 4) >> 2] = c + 1;
                                                      c = K[c | 0];
                                                      break O;
                                                    }
                                                    c = ma(d);
                                                  }
                                                  c = (c - 48) | 0;
                                                  if (e & (c >>> 0 <= 9)) {
                                                    continue;
                                                  }
                                                  break;
                                                }
                                                f = a;
                                              }
                                              if (c >>> 0 > 9) {
                                                break I;
                                              }
                                              e = Pg(f, 0, 10, 0);
                                              g = ea;
                                              while (1) {
                                                P: {
                                                  f = (c + e) | 0;
                                                  j =
                                                    f >>> 0 < c >>> 0
                                                      ? (g + 1) | 0
                                                      : g;
                                                  e =
                                                    (((j | 0) == 429496729) &
                                                      (f >>> 0 < 2576980378)) |
                                                    (j >>> 0 < 429496729);
                                                  a = J[(d + 4) >> 2];
                                                  Q: {
                                                    if (
                                                      (a | 0) !=
                                                      J[(d + 104) >> 2]
                                                    ) {
                                                      J[(d + 4) >> 2] = a + 1;
                                                      a = K[a | 0];
                                                      break Q;
                                                    }
                                                    a = ma(d);
                                                  }
                                                  c = (a - 48) | 0;
                                                  if (!(e & (c >>> 0 <= 9))) {
                                                    if (c >>> 0 <= 9) {
                                                      break P;
                                                    }
                                                    break I;
                                                  }
                                                  e = Pg(f, j, 10, 0);
                                                  g = ea;
                                                  if (
                                                    (((g | 0) == -1) &
                                                      ((c ^ -1) >>> 0 >=
                                                        e >>> 0)) |
                                                    ((g | 0) != -1)
                                                  ) {
                                                    continue;
                                                  }
                                                }
                                                break;
                                              }
                                              e = 10;
                                              break J;
                                            }
                                            R: {
                                              S: {
                                                if ((e - 1) & e) {
                                                  g = K[(a + 3329) | 0];
                                                  if (g >>> 0 < e >>> 0) {
                                                    break S;
                                                  }
                                                  break R;
                                                }
                                                c = K[(a + 3329) | 0];
                                                if (e >>> 0 <= c >>> 0) {
                                                  break R;
                                                }
                                                m =
                                                  H[
                                                    (((P(e, 23) >>> 5) & 7) +
                                                      3585) |
                                                      0
                                                  ];
                                                while (1) {
                                                  f = g << m;
                                                  g = f | c;
                                                  a = J[(d + 4) >> 2];
                                                  T: {
                                                    if (
                                                      (a | 0) !=
                                                      J[(d + 104) >> 2]
                                                    ) {
                                                      J[(d + 4) >> 2] = a + 1;
                                                      a = K[a | 0];
                                                      break T;
                                                    }
                                                    a = ma(d);
                                                  }
                                                  c = K[(a + 3329) | 0];
                                                  p = e >>> 0 <= c >>> 0;
                                                  if (
                                                    !p &
                                                    (f >>> 0 < 134217728)
                                                  ) {
                                                    continue;
                                                  }
                                                  break;
                                                }
                                                f = g;
                                                if (p) {
                                                  break J;
                                                }
                                                p = m & 31;
                                                if ((m & 63) >>> 0 >= 32) {
                                                  g = 0;
                                                  p = (-1 >>> p) | 0;
                                                } else {
                                                  g = (-1 >>> p) | 0;
                                                  p =
                                                    g |
                                                    (((1 << p) - 1) <<
                                                      (32 - p));
                                                }
                                                if (!g & (f >>> 0 > p >>> 0)) {
                                                  break J;
                                                }
                                                while (1) {
                                                  a = m & 31;
                                                  if ((m & 63) >>> 0 >= 32) {
                                                    j = f << a;
                                                    a = 0;
                                                  } else {
                                                    j =
                                                      (((1 << a) - 1) &
                                                        (f >>> (32 - a))) |
                                                      (j << a);
                                                    a = f << a;
                                                  }
                                                  f = a | (c & 255);
                                                  a = J[(d + 4) >> 2];
                                                  U: {
                                                    if (
                                                      (a | 0) !=
                                                      J[(d + 104) >> 2]
                                                    ) {
                                                      J[(d + 4) >> 2] = a + 1;
                                                      a = K[a | 0];
                                                      break U;
                                                    }
                                                    a = ma(d);
                                                  }
                                                  c = K[(a + 3329) | 0];
                                                  if (e >>> 0 <= c >>> 0) {
                                                    break J;
                                                  }
                                                  if (
                                                    (((g | 0) == (j | 0)) &
                                                      (f >>> 0 <= p >>> 0)) |
                                                    (g >>> 0 > j >>> 0)
                                                  ) {
                                                    continue;
                                                  }
                                                  break;
                                                }
                                                break J;
                                              }
                                              while (1) {
                                                c = (P(c, e) + g) | 0;
                                                a = J[(d + 4) >> 2];
                                                V: {
                                                  if (
                                                    (a | 0) !=
                                                    J[(d + 104) >> 2]
                                                  ) {
                                                    J[(d + 4) >> 2] = a + 1;
                                                    a = K[a | 0];
                                                    break V;
                                                  }
                                                  a = ma(d);
                                                }
                                                g = K[(a + 3329) | 0];
                                                m = e >>> 0 <= g >>> 0;
                                                if (
                                                  !m &
                                                  (c >>> 0 < 119304647)
                                                ) {
                                                  continue;
                                                }
                                                break;
                                              }
                                              f = c;
                                              if (m) {
                                                break J;
                                              }
                                              while (1) {
                                                c = Pg(f, j, e, 0);
                                                m = ea;
                                                g = g & 255;
                                                if (
                                                  ((m | 0) == -1) &
                                                  ((g ^ -1) >>> 0 < c >>> 0)
                                                ) {
                                                  break J;
                                                }
                                                f = (c + g) | 0;
                                                j =
                                                  f >>> 0 < g >>> 0
                                                    ? (m + 1) | 0
                                                    : m;
                                                a = J[(d + 4) >> 2];
                                                W: {
                                                  if (
                                                    (a | 0) !=
                                                    J[(d + 104) >> 2]
                                                  ) {
                                                    J[(d + 4) >> 2] = a + 1;
                                                    a = K[a | 0];
                                                    break W;
                                                  }
                                                  a = ma(d);
                                                }
                                                g = K[(a + 3329) | 0];
                                                if (e >>> 0 <= g >>> 0) {
                                                  break J;
                                                }
                                                ya(x, e, 0, 0, 0, f, j, 0, 0);
                                                if (
                                                  !(
                                                    J[(x + 8) >> 2] |
                                                    J[(x + 12) >> 2]
                                                  )
                                                ) {
                                                  continue;
                                                }
                                                break;
                                              }
                                            }
                                          }
                                          if (K[(a + 3329) | 0] >= e >>> 0) {
                                            break I;
                                          }
                                          while (1) {
                                            a = J[(d + 4) >> 2];
                                            X: {
                                              if (
                                                (a | 0) !=
                                                J[(d + 104) >> 2]
                                              ) {
                                                J[(d + 4) >> 2] = a + 1;
                                                a = K[a | 0];
                                                break X;
                                              }
                                              a = ma(d);
                                            }
                                            if (K[(a + 3329) | 0] < e >>> 0) {
                                              continue;
                                            }
                                            break;
                                          }
                                          J[3876] = 68;
                                          i = 0;
                                          f = -1;
                                          j = -1;
                                        }
                                        a = J[(d + 116) >> 2];
                                        if ((a | 0) > 0) {
                                          a = 1;
                                        } else {
                                          a = (a | 0) >= 0;
                                        }
                                        if (a) {
                                          J[(d + 4) >> 2] = J[(d + 4) >> 2] - 1;
                                        }
                                        Y: {
                                          if ((f & j) != -1) {
                                            break Y;
                                          }
                                        }
                                        a = f ^ i;
                                        f = (a - i) | 0;
                                        c = i >> 31;
                                        j =
                                          ((c ^ j) -
                                            (((a >>> 0 < i >>> 0) + c) | 0)) |
                                          0;
                                      }
                                      da = (x + 16) | 0;
                                      a =
                                        (J[(d + 4) >> 2] - J[(d + 44) >> 2]) |
                                        0;
                                      if (
                                        (J[(d + 120) >> 2] == ((0 - a) | 0)) &
                                        (J[(d + 124) >> 2] ==
                                          ((0 -
                                            (((a >> 31) + ((a | 0) != 0)) |
                                              0)) |
                                            0))
                                      ) {
                                        break c;
                                      }
                                      if (!(!k | ((q | 0) != 112))) {
                                        J[k >> 2] = f;
                                        break s;
                                      }
                                      Hd(k, w, f, j);
                                      break s;
                                    }
                                    N[k >> 2] = Id(f, e, a, c);
                                    break s;
                                  }
                                  O[k >> 3] = _b(f, e, a, c);
                                  break s;
                                }
                                J[k >> 2] = f;
                                J[(k + 4) >> 2] = e;
                                J[(k + 8) >> 2] = a;
                                J[(k + 12) >> 2] = c;
                                break s;
                              }
                              g = (q | 0) != 99;
                              i = g ? 31 : (c + 1) | 0;
                              Z: {
                                if ((w | 0) == 1) {
                                  c = k;
                                  if (r) {
                                    c = La(i << 2);
                                    if (!c) {
                                      break e;
                                    }
                                  }
                                  J[(h + 296) >> 2] = 0;
                                  J[(h + 300) >> 2] = 0;
                                  e = 0;
                                  _: {
                                    $: {
                                      while (1) {
                                        a = c;
                                        while (1) {
                                          c = J[(d + 4) >> 2];
                                          aa: {
                                            if ((c | 0) != J[(d + 104) >> 2]) {
                                              J[(d + 4) >> 2] = c + 1;
                                              c = K[c | 0];
                                              break aa;
                                            }
                                            c = ma(d);
                                          }
                                          if (!K[(((c + h) | 0) + 33) | 0]) {
                                            break $;
                                          }
                                          H[(h + 27) | 0] = c;
                                          c = Db(
                                            (h + 28) | 0,
                                            (h + 27) | 0,
                                            1,
                                            (h + 296) | 0,
                                          );
                                          if ((c | 0) == -2) {
                                            continue;
                                          }
                                          if ((c | 0) == -1) {
                                            n = 0;
                                            break _;
                                          }
                                          if (a) {
                                            J[((e << 2) + a) >> 2] =
                                              J[(h + 28) >> 2];
                                            e = (e + 1) | 0;
                                          }
                                          if (!r | ((e | 0) != (i | 0))) {
                                            continue;
                                          }
                                          break;
                                        }
                                        i = (i << 1) | 1;
                                        c = Cd(a, i << 2);
                                        if (c) {
                                          continue;
                                        }
                                        break;
                                      }
                                      n = 0;
                                      o = a;
                                      r = 1;
                                      break d;
                                    }
                                    n = 0;
                                    o = a;
                                    if (
                                      !((h + 296) | 0 ? J[(h + 296) >> 2] : 0)
                                    ) {
                                      break Z;
                                    }
                                  }
                                  o = a;
                                  break d;
                                }
                                if (r) {
                                  e = 0;
                                  c = La(i);
                                  if (!c) {
                                    break e;
                                  }
                                  while (1) {
                                    a = c;
                                    while (1) {
                                      c = J[(d + 4) >> 2];
                                      ba: {
                                        if ((c | 0) != J[(d + 104) >> 2]) {
                                          J[(d + 4) >> 2] = c + 1;
                                          c = K[c | 0];
                                          break ba;
                                        }
                                        c = ma(d);
                                      }
                                      if (!K[(((c + h) | 0) + 33) | 0]) {
                                        n = a;
                                        o = 0;
                                        break Z;
                                      }
                                      H[(a + e) | 0] = c;
                                      e = (e + 1) | 0;
                                      if ((i | 0) != (e | 0)) {
                                        continue;
                                      }
                                      break;
                                    }
                                    i = (i << 1) | 1;
                                    c = Cd(a, i);
                                    if (c) {
                                      continue;
                                    }
                                    break;
                                  }
                                  o = 0;
                                  n = a;
                                  r = 1;
                                  break d;
                                }
                                e = 0;
                                if (k) {
                                  while (1) {
                                    a = J[(d + 4) >> 2];
                                    ca: {
                                      if ((a | 0) != J[(d + 104) >> 2]) {
                                        J[(d + 4) >> 2] = a + 1;
                                        a = K[a | 0];
                                        break ca;
                                      }
                                      a = ma(d);
                                    }
                                    if (K[(((a + h) | 0) + 33) | 0]) {
                                      H[(e + k) | 0] = a;
                                      e = (e + 1) | 0;
                                      continue;
                                    } else {
                                      a = k;
                                      n = a;
                                      o = 0;
                                      break Z;
                                    }
                                  }
                                }
                                while (1) {
                                  a = J[(d + 4) >> 2];
                                  da: {
                                    if ((a | 0) != J[(d + 104) >> 2]) {
                                      J[(d + 4) >> 2] = a + 1;
                                      a = K[a | 0];
                                      break da;
                                    }
                                    a = ma(d);
                                  }
                                  if (K[(((a + h) | 0) + 33) | 0]) {
                                    continue;
                                  }
                                  break;
                                }
                                a = 0;
                                n = 0;
                                o = 0;
                              }
                              c = J[(d + 4) >> 2];
                              f = J[(d + 116) >> 2];
                              if ((f | 0) > 0) {
                                f = 1;
                              } else {
                                f = (f | 0) >= 0;
                              }
                              if (f) {
                                c = (c - 1) | 0;
                                J[(d + 4) >> 2] = c;
                              }
                              c = (c - J[(d + 44) >> 2]) | 0;
                              f = (c + J[(d + 120) >> 2]) | 0;
                              i = (J[(d + 124) >> 2] + (c >> 31)) | 0;
                              c = c >>> 0 > f >>> 0 ? (i + 1) | 0 : i;
                              if (
                                !(f | c) |
                                !(
                                  g |
                                  (((f | 0) == (j | 0)) & ((c | 0) == (m | 0)))
                                )
                              ) {
                                break c;
                              }
                              if (r) {
                                J[k >> 2] = a;
                              }
                              if ((q | 0) == 99) {
                                break s;
                              }
                              if (o) {
                                J[((e << 2) + o) >> 2] = 0;
                              }
                              if (!n) {
                                n = 0;
                                break s;
                              }
                              H[(e + n) | 0] = 0;
                            }
                            a = (J[(d + 4) >> 2] - J[(d + 44) >> 2]) | 0;
                            c = a;
                            f = a >> 31;
                            a = (s + J[(d + 124) >> 2]) | 0;
                            g = (a + 1) | 0;
                            e = a;
                            a = (l + J[(d + 120) >> 2]) | 0;
                            f = (f + (a >>> 0 < l >>> 0 ? g : e)) | 0;
                            l = (a + c) | 0;
                            s = l >>> 0 < a >>> 0 ? (f + 1) | 0 : f;
                            u = (((k | 0) != 0) + u) | 0;
                          }
                          e = (b + 1) | 0;
                          b = K[(b + 1) | 0];
                          if (b) {
                            continue;
                          }
                          break a;
                        }
                        break;
                      }
                      r = 1;
                      n = 0;
                      o = 0;
                    }
                    u = u ? u : -1;
                  }
                  if (!r) {
                    break a;
                  }
                  la(n);
                  la(o);
                  break a;
                }
                u = -1;
              }
              da = (h + 304) | 0;
              da = (d + 144) | 0;
              b = u;
              a = J[z >> 2];
              if (a) {
                J[4039] = (a | 0) == -1 ? 16036 : a;
              }
              da = (t + 16) | 0;
              da = (y + 16) | 0;
              return b;
            }
            function La(a) {
              var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0;
              k = (da - 16) | 0;
              da = k;
              a: {
                b: {
                  c: {
                    d: {
                      e: {
                        f: {
                          g: {
                            h: {
                              i: {
                                j: {
                                  if (a >>> 0 <= 244) {
                                    f = J[3877];
                                    g = a >>> 0 < 11 ? 16 : (a + 11) & 504;
                                    a = (g >>> 3) | 0;
                                    b = (f >>> a) | 0;
                                    if (b & 3) {
                                      e = (a + ((b ^ -1) & 1)) | 0;
                                      b = e << 3;
                                      a = (b + 15548) | 0;
                                      c = J[(b + 15556) >> 2];
                                      d = J[(c + 8) >> 2];
                                      k: {
                                        if ((a | 0) == (d | 0)) {
                                          J[3877] = Qg(e) & f;
                                          break k;
                                        }
                                        J[(d + 12) >> 2] = a;
                                        J[(a + 8) >> 2] = d;
                                      }
                                      a = (c + 8) | 0;
                                      J[(c + 4) >> 2] = b | 3;
                                      b = (b + c) | 0;
                                      J[(b + 4) >> 2] = J[(b + 4) >> 2] | 1;
                                      break a;
                                    }
                                    i = J[3879];
                                    if (i >>> 0 >= g >>> 0) {
                                      break j;
                                    }
                                    if (b) {
                                      c = 2 << a;
                                      e = Og(((0 - c) | c) & (b << a));
                                      a = e << 3;
                                      b = (a + 15548) | 0;
                                      c = J[(a + 15556) >> 2];
                                      d = J[(c + 8) >> 2];
                                      l: {
                                        if ((b | 0) == (d | 0)) {
                                          f = Qg(e) & f;
                                          J[3877] = f;
                                          break l;
                                        }
                                        J[(d + 12) >> 2] = b;
                                        J[(b + 8) >> 2] = d;
                                      }
                                      J[(c + 4) >> 2] = g | 3;
                                      h = (c + g) | 0;
                                      e = (a - g) | 0;
                                      J[(h + 4) >> 2] = e | 1;
                                      J[(a + c) >> 2] = e;
                                      if (i) {
                                        a = ((i & -8) + 15548) | 0;
                                        d = J[3882];
                                        b = 1 << (i >>> 3);
                                        m: {
                                          if (!(b & f)) {
                                            J[3877] = b | f;
                                            b = a;
                                            break m;
                                          }
                                          b = J[(a + 8) >> 2];
                                        }
                                        J[(a + 8) >> 2] = d;
                                        J[(b + 12) >> 2] = d;
                                        J[(d + 12) >> 2] = a;
                                        J[(d + 8) >> 2] = b;
                                      }
                                      a = (c + 8) | 0;
                                      J[3882] = h;
                                      J[3879] = e;
                                      break a;
                                    }
                                    l = J[3878];
                                    if (!l) {
                                      break j;
                                    }
                                    c = J[((Og(l) << 2) + 15812) >> 2];
                                    e = ((J[(c + 4) >> 2] & -8) - g) | 0;
                                    b = c;
                                    while (1) {
                                      n: {
                                        a = J[(b + 16) >> 2];
                                        if (!a) {
                                          a = J[(b + 20) >> 2];
                                          if (!a) {
                                            break n;
                                          }
                                        }
                                        d = ((J[(a + 4) >> 2] & -8) - g) | 0;
                                        b = d >>> 0 < e >>> 0;
                                        e = b ? d : e;
                                        c = b ? a : c;
                                        b = a;
                                        continue;
                                      }
                                      break;
                                    }
                                    j = J[(c + 24) >> 2];
                                    a = J[(c + 12) >> 2];
                                    if ((c | 0) != (a | 0)) {
                                      b = J[(c + 8) >> 2];
                                      J[(b + 12) >> 2] = a;
                                      J[(a + 8) >> 2] = b;
                                      break b;
                                    }
                                    b = J[(c + 20) >> 2];
                                    if (b) {
                                      d = (c + 20) | 0;
                                    } else {
                                      b = J[(c + 16) >> 2];
                                      if (!b) {
                                        break i;
                                      }
                                      d = (c + 16) | 0;
                                    }
                                    while (1) {
                                      h = d;
                                      a = b;
                                      d = (a + 20) | 0;
                                      b = J[(a + 20) >> 2];
                                      if (b) {
                                        continue;
                                      }
                                      d = (a + 16) | 0;
                                      b = J[(a + 16) >> 2];
                                      if (b) {
                                        continue;
                                      }
                                      break;
                                    }
                                    J[h >> 2] = 0;
                                    break b;
                                  }
                                  g = -1;
                                  if (a >>> 0 > 4294967231) {
                                    break j;
                                  }
                                  b = (a + 11) | 0;
                                  g = b & -8;
                                  h = J[3878];
                                  if (!h) {
                                    break j;
                                  }
                                  i = 31;
                                  e = (0 - g) | 0;
                                  if (a >>> 0 <= 16777204) {
                                    a = S((b >>> 8) | 0);
                                    i =
                                      (((((g >>> (38 - a)) & 1) - (a << 1)) |
                                        0) +
                                        62) |
                                      0;
                                  }
                                  b = J[((i << 2) + 15812) >> 2];
                                  o: {
                                    p: {
                                      q: {
                                        if (!b) {
                                          a = 0;
                                          break q;
                                        }
                                        a = 0;
                                        c =
                                          g <<
                                          ((i | 0) != 31
                                            ? (25 - ((i >>> 1) | 0)) | 0
                                            : 0);
                                        while (1) {
                                          r: {
                                            f =
                                              ((J[(b + 4) >> 2] & -8) - g) | 0;
                                            if (f >>> 0 >= e >>> 0) {
                                              break r;
                                            }
                                            d = b;
                                            e = f;
                                            if (e) {
                                              break r;
                                            }
                                            e = 0;
                                            a = b;
                                            break p;
                                          }
                                          f = J[(b + 20) >> 2];
                                          b =
                                            J[
                                              (((((c >>> 29) & 4) + b) | 0) +
                                                16) >>
                                                2
                                            ];
                                          a = f
                                            ? (f | 0) == (b | 0)
                                              ? a
                                              : f
                                            : a;
                                          c = c << 1;
                                          if (b) {
                                            continue;
                                          }
                                          break;
                                        }
                                      }
                                      if (!(a | d)) {
                                        d = 0;
                                        a = 2 << i;
                                        a = ((0 - a) | a) & h;
                                        if (!a) {
                                          break j;
                                        }
                                        a = J[((Og(a) << 2) + 15812) >> 2];
                                      }
                                      if (!a) {
                                        break o;
                                      }
                                    }
                                    while (1) {
                                      c = ((J[(a + 4) >> 2] & -8) - g) | 0;
                                      b = c >>> 0 < e >>> 0;
                                      e = b ? c : e;
                                      d = b ? a : d;
                                      b = J[(a + 16) >> 2];
                                      if (b) {
                                        a = b;
                                      } else {
                                        a = J[(a + 20) >> 2];
                                      }
                                      if (a) {
                                        continue;
                                      }
                                      break;
                                    }
                                  }
                                  if (!d | ((J[3879] - g) >>> 0 <= e >>> 0)) {
                                    break j;
                                  }
                                  i = J[(d + 24) >> 2];
                                  a = J[(d + 12) >> 2];
                                  if ((d | 0) != (a | 0)) {
                                    b = J[(d + 8) >> 2];
                                    J[(b + 12) >> 2] = a;
                                    J[(a + 8) >> 2] = b;
                                    break c;
                                  }
                                  b = J[(d + 20) >> 2];
                                  if (b) {
                                    c = (d + 20) | 0;
                                  } else {
                                    b = J[(d + 16) >> 2];
                                    if (!b) {
                                      break h;
                                    }
                                    c = (d + 16) | 0;
                                  }
                                  while (1) {
                                    f = c;
                                    a = b;
                                    c = (a + 20) | 0;
                                    b = J[(a + 20) >> 2];
                                    if (b) {
                                      continue;
                                    }
                                    c = (a + 16) | 0;
                                    b = J[(a + 16) >> 2];
                                    if (b) {
                                      continue;
                                    }
                                    break;
                                  }
                                  J[f >> 2] = 0;
                                  break c;
                                }
                                d = J[3879];
                                if (d >>> 0 >= g >>> 0) {
                                  a = J[3882];
                                  b = (d - g) | 0;
                                  s: {
                                    if (b >>> 0 >= 16) {
                                      c = (a + g) | 0;
                                      J[(c + 4) >> 2] = b | 1;
                                      J[(a + d) >> 2] = b;
                                      J[(a + 4) >> 2] = g | 3;
                                      break s;
                                    }
                                    J[(a + 4) >> 2] = d | 3;
                                    b = (a + d) | 0;
                                    J[(b + 4) >> 2] = J[(b + 4) >> 2] | 1;
                                    c = 0;
                                    b = 0;
                                  }
                                  J[3879] = b;
                                  J[3882] = c;
                                  a = (a + 8) | 0;
                                  break a;
                                }
                                c = J[3880];
                                if (c >>> 0 > g >>> 0) {
                                  b = (c - g) | 0;
                                  J[3880] = b;
                                  a = J[3883];
                                  c = (a + g) | 0;
                                  J[3883] = c;
                                  J[(c + 4) >> 2] = b | 1;
                                  J[(a + 4) >> 2] = g | 3;
                                  a = (a + 8) | 0;
                                  break a;
                                }
                                a = 0;
                                e = (g + 47) | 0;
                                if (J[3995]) {
                                  b = J[3997];
                                } else {
                                  J[3998] = -1;
                                  J[3999] = -1;
                                  J[3996] = 4096;
                                  J[3997] = 4096;
                                  J[3995] = ((k + 12) & -16) ^ 1431655768;
                                  J[4e3] = 0;
                                  J[3988] = 0;
                                  b = 4096;
                                }
                                f = (e + b) | 0;
                                h = (0 - b) | 0;
                                b = f & h;
                                if (b >>> 0 <= g >>> 0) {
                                  break a;
                                }
                                i = J[3987];
                                if (i) {
                                  j = J[3985];
                                  d = (j + b) | 0;
                                  if (
                                    (d >>> 0 <= j >>> 0) |
                                    (d >>> 0 > i >>> 0)
                                  ) {
                                    break a;
                                  }
                                }
                                t: {
                                  if (!(K[15952] & 4)) {
                                    u: {
                                      v: {
                                        w: {
                                          x: {
                                            d = J[3883];
                                            if (d) {
                                              a = 15956;
                                              while (1) {
                                                i = J[a >> 2];
                                                if (
                                                  (i >>> 0 <= d >>> 0) &
                                                  (d >>> 0 <
                                                    (i + J[(a + 4) >> 2]) >>> 0)
                                                ) {
                                                  break x;
                                                }
                                                a = J[(a + 8) >> 2];
                                                if (a) {
                                                  continue;
                                                }
                                                break;
                                              }
                                            }
                                            c = gb(0);
                                            if ((c | 0) == -1) {
                                              break u;
                                            }
                                            f = b;
                                            a = J[3996];
                                            d = (a - 1) | 0;
                                            if (d & c) {
                                              f =
                                                (((b - c) | 0) +
                                                  ((c + d) & (0 - a))) |
                                                0;
                                            }
                                            if (f >>> 0 <= g >>> 0) {
                                              break u;
                                            }
                                            d = J[3987];
                                            if (d) {
                                              h = J[3985];
                                              a = (h + f) | 0;
                                              if (
                                                (a >>> 0 <= h >>> 0) |
                                                (a >>> 0 > d >>> 0)
                                              ) {
                                                break u;
                                              }
                                            }
                                            a = gb(f);
                                            if ((c | 0) != (a | 0)) {
                                              break w;
                                            }
                                            break t;
                                          }
                                          f = h & (f - c);
                                          c = gb(f);
                                          if (
                                            (c | 0) ==
                                            ((J[a >> 2] + J[(a + 4) >> 2]) | 0)
                                          ) {
                                            break v;
                                          }
                                          a = c;
                                        }
                                        if ((a | 0) == -1) {
                                          break u;
                                        }
                                        if ((g + 48) >>> 0 <= f >>> 0) {
                                          c = a;
                                          break t;
                                        }
                                        c = J[3997];
                                        c = (c + ((e - f) | 0)) & (0 - c);
                                        if ((gb(c) | 0) == -1) {
                                          break u;
                                        }
                                        f = (c + f) | 0;
                                        c = a;
                                        break t;
                                      }
                                      if ((c | 0) != -1) {
                                        break t;
                                      }
                                    }
                                    J[3988] = J[3988] | 4;
                                  }
                                  c = gb(b);
                                  a = gb(0);
                                  if (
                                    ((c | 0) == -1) |
                                    ((a | 0) == -1) |
                                    (a >>> 0 <= c >>> 0)
                                  ) {
                                    break e;
                                  }
                                  f = (a - c) | 0;
                                  if (f >>> 0 <= (g + 40) >>> 0) {
                                    break e;
                                  }
                                }
                                a = (J[3985] + f) | 0;
                                J[3985] = a;
                                if (a >>> 0 > M[3986]) {
                                  J[3986] = a;
                                }
                                y: {
                                  e = J[3883];
                                  if (e) {
                                    a = 15956;
                                    while (1) {
                                      b = J[a >> 2];
                                      d = J[(a + 4) >> 2];
                                      if (((b + d) | 0) == (c | 0)) {
                                        break y;
                                      }
                                      a = J[(a + 8) >> 2];
                                      if (a) {
                                        continue;
                                      }
                                      break;
                                    }
                                    break g;
                                  }
                                  a = J[3881];
                                  if (!(a >>> 0 <= c >>> 0 ? a : 0)) {
                                    J[3881] = c;
                                  }
                                  a = 0;
                                  J[3990] = f;
                                  J[3989] = c;
                                  J[3885] = -1;
                                  J[3886] = J[3995];
                                  J[3992] = 0;
                                  while (1) {
                                    b = a << 3;
                                    d = (b + 15548) | 0;
                                    J[(b + 15556) >> 2] = d;
                                    J[(b + 15560) >> 2] = d;
                                    a = (a + 1) | 0;
                                    if ((a | 0) != 32) {
                                      continue;
                                    }
                                    break;
                                  }
                                  a = (f - 40) | 0;
                                  b = (-8 - c) & 7;
                                  d = (a - b) | 0;
                                  J[3880] = d;
                                  b = (b + c) | 0;
                                  J[3883] = b;
                                  J[(b + 4) >> 2] = d | 1;
                                  J[(((a + c) | 0) + 4) >> 2] = 40;
                                  J[3884] = J[3999];
                                  break f;
                                }
                                if (
                                  (J[(a + 12) >> 2] & 8) |
                                  ((c >>> 0 <= e >>> 0) | (b >>> 0 > e >>> 0))
                                ) {
                                  break g;
                                }
                                J[(a + 4) >> 2] = d + f;
                                a = (-8 - e) & 7;
                                b = (a + e) | 0;
                                J[3883] = b;
                                c = (J[3880] + f) | 0;
                                a = (c - a) | 0;
                                J[3880] = a;
                                J[(b + 4) >> 2] = a | 1;
                                J[(((c + e) | 0) + 4) >> 2] = 40;
                                J[3884] = J[3999];
                                break f;
                              }
                              a = 0;
                              break b;
                            }
                            a = 0;
                            break c;
                          }
                          if (M[3881] > c >>> 0) {
                            J[3881] = c;
                          }
                          d = (c + f) | 0;
                          a = 15956;
                          z: {
                            while (1) {
                              b = J[a >> 2];
                              if ((b | 0) != (d | 0)) {
                                a = J[(a + 8) >> 2];
                                if (a) {
                                  continue;
                                }
                                break z;
                              }
                              break;
                            }
                            if (!(K[(a + 12) | 0] & 8)) {
                              break d;
                            }
                          }
                          a = 15956;
                          while (1) {
                            A: {
                              b = J[a >> 2];
                              if (b >>> 0 <= e >>> 0) {
                                d = (b + J[(a + 4) >> 2]) | 0;
                                if (d >>> 0 > e >>> 0) {
                                  break A;
                                }
                              }
                              a = J[(a + 8) >> 2];
                              continue;
                            }
                            break;
                          }
                          a = (f - 40) | 0;
                          b = (-8 - c) & 7;
                          h = (a - b) | 0;
                          J[3880] = h;
                          b = (b + c) | 0;
                          J[3883] = b;
                          J[(b + 4) >> 2] = h | 1;
                          J[(((a + c) | 0) + 4) >> 2] = 40;
                          J[3884] = J[3999];
                          a = (((d + ((39 - d) & 7)) | 0) - 47) | 0;
                          b = a >>> 0 < (e + 16) >>> 0 ? e : a;
                          J[(b + 4) >> 2] = 27;
                          a = J[3992];
                          J[(b + 16) >> 2] = J[3991];
                          J[(b + 20) >> 2] = a;
                          a = J[3990];
                          J[(b + 8) >> 2] = J[3989];
                          J[(b + 12) >> 2] = a;
                          J[3991] = b + 8;
                          J[3990] = f;
                          J[3989] = c;
                          J[3992] = 0;
                          a = (b + 24) | 0;
                          while (1) {
                            J[(a + 4) >> 2] = 7;
                            c = (a + 8) | 0;
                            a = (a + 4) | 0;
                            if (c >>> 0 < d >>> 0) {
                              continue;
                            }
                            break;
                          }
                          if ((b | 0) == (e | 0)) {
                            break f;
                          }
                          J[(b + 4) >> 2] = J[(b + 4) >> 2] & -2;
                          c = (b - e) | 0;
                          J[(e + 4) >> 2] = c | 1;
                          J[b >> 2] = c;
                          B: {
                            if (c >>> 0 <= 255) {
                              a = ((c & 248) + 15548) | 0;
                              b = J[3877];
                              c = 1 << (c >>> 3);
                              C: {
                                if (!(b & c)) {
                                  J[3877] = b | c;
                                  b = a;
                                  break C;
                                }
                                b = J[(a + 8) >> 2];
                              }
                              J[(a + 8) >> 2] = e;
                              J[(b + 12) >> 2] = e;
                              d = 8;
                              c = 12;
                              break B;
                            }
                            a = 31;
                            if (c >>> 0 <= 16777215) {
                              a = S((c >>> 8) | 0);
                              a =
                                (((((c >>> (38 - a)) & 1) - (a << 1)) | 0) +
                                  62) |
                                0;
                            }
                            J[(e + 28) >> 2] = a;
                            J[(e + 16) >> 2] = 0;
                            J[(e + 20) >> 2] = 0;
                            b = ((a << 2) + 15812) | 0;
                            D: {
                              d = J[3878];
                              f = 1 << a;
                              E: {
                                if (!(d & f)) {
                                  J[3878] = d | f;
                                  J[b >> 2] = e;
                                  break E;
                                }
                                a =
                                  c <<
                                  ((a | 0) != 31
                                    ? (25 - ((a >>> 1) | 0)) | 0
                                    : 0);
                                d = J[b >> 2];
                                while (1) {
                                  b = d;
                                  if ((c | 0) == (J[(b + 4) >> 2] & -8)) {
                                    break D;
                                  }
                                  d = (a >>> 29) | 0;
                                  a = a << 1;
                                  f = ((d & 4) + b) | 0;
                                  d = J[(f + 16) >> 2];
                                  if (d) {
                                    continue;
                                  }
                                  break;
                                }
                                J[(f + 16) >> 2] = e;
                              }
                              J[(e + 24) >> 2] = b;
                              b = e;
                              a = b;
                              d = 12;
                              c = 8;
                              break B;
                            }
                            a = J[(b + 8) >> 2];
                            J[(a + 12) >> 2] = e;
                            J[(b + 8) >> 2] = e;
                            J[(e + 8) >> 2] = a;
                            a = 0;
                            d = 12;
                            c = 24;
                          }
                          J[(e + d) >> 2] = b;
                          J[(c + e) >> 2] = a;
                        }
                        a = J[3880];
                        if (a >>> 0 <= g >>> 0) {
                          break e;
                        }
                        b = (a - g) | 0;
                        J[3880] = b;
                        a = J[3883];
                        c = (a + g) | 0;
                        J[3883] = c;
                        J[(c + 4) >> 2] = b | 1;
                        J[(a + 4) >> 2] = g | 3;
                        a = (a + 8) | 0;
                        break a;
                      }
                      J[3876] = 48;
                      a = 0;
                      break a;
                    }
                    J[a >> 2] = c;
                    J[(a + 4) >> 2] = J[(a + 4) >> 2] + f;
                    i = (((-8 - c) & 7) + c) | 0;
                    J[(i + 4) >> 2] = g | 3;
                    f = (b + ((-8 - b) & 7)) | 0;
                    e = (g + i) | 0;
                    h = (f - e) | 0;
                    F: {
                      if (J[3883] == (f | 0)) {
                        J[3883] = e;
                        a = (J[3880] + h) | 0;
                        J[3880] = a;
                        J[(e + 4) >> 2] = a | 1;
                        break F;
                      }
                      if (J[3882] == (f | 0)) {
                        J[3882] = e;
                        a = (J[3879] + h) | 0;
                        J[3879] = a;
                        J[(e + 4) >> 2] = a | 1;
                        J[(a + e) >> 2] = a;
                        break F;
                      }
                      a = J[(f + 4) >> 2];
                      if ((a & 3) == 1) {
                        j = a & -8;
                        c = J[(f + 12) >> 2];
                        G: {
                          if (a >>> 0 <= 255) {
                            b = J[(f + 8) >> 2];
                            if ((b | 0) == (c | 0)) {
                              J[3877] = J[3877] & Qg((a >>> 3) | 0);
                              break G;
                            }
                            J[(b + 12) >> 2] = c;
                            J[(c + 8) >> 2] = b;
                            break G;
                          }
                          g = J[(f + 24) >> 2];
                          H: {
                            if ((c | 0) != (f | 0)) {
                              a = J[(f + 8) >> 2];
                              J[(a + 12) >> 2] = c;
                              J[(c + 8) >> 2] = a;
                              break H;
                            }
                            I: {
                              a = J[(f + 20) >> 2];
                              if (a) {
                                b = (f + 20) | 0;
                              } else {
                                a = J[(f + 16) >> 2];
                                if (!a) {
                                  break I;
                                }
                                b = (f + 16) | 0;
                              }
                              while (1) {
                                d = b;
                                c = a;
                                b = (a + 20) | 0;
                                a = J[(a + 20) >> 2];
                                if (a) {
                                  continue;
                                }
                                b = (c + 16) | 0;
                                a = J[(c + 16) >> 2];
                                if (a) {
                                  continue;
                                }
                                break;
                              }
                              J[d >> 2] = 0;
                              break H;
                            }
                            c = 0;
                          }
                          if (!g) {
                            break G;
                          }
                          a = J[(f + 28) >> 2];
                          b = a << 2;
                          J: {
                            if (J[(b + 15812) >> 2] == (f | 0)) {
                              J[(b + 15812) >> 2] = c;
                              if (c) {
                                break J;
                              }
                              J[3878] = J[3878] & Qg(a);
                              break G;
                            }
                            K: {
                              if (J[(g + 16) >> 2] == (f | 0)) {
                                J[(g + 16) >> 2] = c;
                                break K;
                              }
                              J[(g + 20) >> 2] = c;
                            }
                            if (!c) {
                              break G;
                            }
                          }
                          J[(c + 24) >> 2] = g;
                          a = J[(f + 16) >> 2];
                          if (a) {
                            J[(c + 16) >> 2] = a;
                            J[(a + 24) >> 2] = c;
                          }
                          a = J[(f + 20) >> 2];
                          if (!a) {
                            break G;
                          }
                          J[(c + 20) >> 2] = a;
                          J[(a + 24) >> 2] = c;
                        }
                        h = (h + j) | 0;
                        f = (f + j) | 0;
                        a = J[(f + 4) >> 2];
                      }
                      J[(f + 4) >> 2] = a & -2;
                      J[(e + 4) >> 2] = h | 1;
                      J[(e + h) >> 2] = h;
                      if (h >>> 0 <= 255) {
                        a = ((h & 248) + 15548) | 0;
                        b = J[3877];
                        c = 1 << (h >>> 3);
                        L: {
                          if (!(b & c)) {
                            J[3877] = b | c;
                            b = a;
                            break L;
                          }
                          b = J[(a + 8) >> 2];
                        }
                        J[(a + 8) >> 2] = e;
                        J[(b + 12) >> 2] = e;
                        J[(e + 12) >> 2] = a;
                        J[(e + 8) >> 2] = b;
                        break F;
                      }
                      c = 31;
                      if (h >>> 0 <= 16777215) {
                        a = S((h >>> 8) | 0);
                        c =
                          (((((h >>> (38 - a)) & 1) - (a << 1)) | 0) + 62) | 0;
                      }
                      J[(e + 28) >> 2] = c;
                      J[(e + 16) >> 2] = 0;
                      J[(e + 20) >> 2] = 0;
                      a = ((c << 2) + 15812) | 0;
                      M: {
                        b = J[3878];
                        d = 1 << c;
                        N: {
                          if (!(b & d)) {
                            J[3878] = b | d;
                            J[a >> 2] = e;
                            break N;
                          }
                          c =
                            h <<
                            ((c | 0) != 31 ? (25 - ((c >>> 1) | 0)) | 0 : 0);
                          b = J[a >> 2];
                          while (1) {
                            a = b;
                            if ((J[(a + 4) >> 2] & -8) == (h | 0)) {
                              break M;
                            }
                            b = (c >>> 29) | 0;
                            c = c << 1;
                            d = ((b & 4) + a) | 0;
                            b = J[(d + 16) >> 2];
                            if (b) {
                              continue;
                            }
                            break;
                          }
                          J[(d + 16) >> 2] = e;
                        }
                        J[(e + 24) >> 2] = a;
                        J[(e + 12) >> 2] = e;
                        J[(e + 8) >> 2] = e;
                        break F;
                      }
                      b = J[(a + 8) >> 2];
                      J[(b + 12) >> 2] = e;
                      J[(a + 8) >> 2] = e;
                      J[(e + 24) >> 2] = 0;
                      J[(e + 12) >> 2] = a;
                      J[(e + 8) >> 2] = b;
                    }
                    a = (i + 8) | 0;
                    break a;
                  }
                  O: {
                    if (!i) {
                      break O;
                    }
                    b = J[(d + 28) >> 2];
                    c = b << 2;
                    P: {
                      if (J[(c + 15812) >> 2] == (d | 0)) {
                        J[(c + 15812) >> 2] = a;
                        if (a) {
                          break P;
                        }
                        h = Qg(b) & h;
                        J[3878] = h;
                        break O;
                      }
                      Q: {
                        if (J[(i + 16) >> 2] == (d | 0)) {
                          J[(i + 16) >> 2] = a;
                          break Q;
                        }
                        J[(i + 20) >> 2] = a;
                      }
                      if (!a) {
                        break O;
                      }
                    }
                    J[(a + 24) >> 2] = i;
                    b = J[(d + 16) >> 2];
                    if (b) {
                      J[(a + 16) >> 2] = b;
                      J[(b + 24) >> 2] = a;
                    }
                    b = J[(d + 20) >> 2];
                    if (!b) {
                      break O;
                    }
                    J[(a + 20) >> 2] = b;
                    J[(b + 24) >> 2] = a;
                  }
                  R: {
                    if (e >>> 0 <= 15) {
                      a = (e + g) | 0;
                      J[(d + 4) >> 2] = a | 3;
                      a = (a + d) | 0;
                      J[(a + 4) >> 2] = J[(a + 4) >> 2] | 1;
                      break R;
                    }
                    J[(d + 4) >> 2] = g | 3;
                    f = (d + g) | 0;
                    J[(f + 4) >> 2] = e | 1;
                    J[(e + f) >> 2] = e;
                    if (e >>> 0 <= 255) {
                      a = ((e & 248) + 15548) | 0;
                      b = J[3877];
                      c = 1 << (e >>> 3);
                      S: {
                        if (!(b & c)) {
                          J[3877] = b | c;
                          b = a;
                          break S;
                        }
                        b = J[(a + 8) >> 2];
                      }
                      J[(a + 8) >> 2] = f;
                      J[(b + 12) >> 2] = f;
                      J[(f + 12) >> 2] = a;
                      J[(f + 8) >> 2] = b;
                      break R;
                    }
                    a = 31;
                    if (e >>> 0 <= 16777215) {
                      a = S((e >>> 8) | 0);
                      a = (((((e >>> (38 - a)) & 1) - (a << 1)) | 0) + 62) | 0;
                    }
                    J[(f + 28) >> 2] = a;
                    J[(f + 16) >> 2] = 0;
                    J[(f + 20) >> 2] = 0;
                    b = ((a << 2) + 15812) | 0;
                    T: {
                      c = 1 << a;
                      U: {
                        if (!(c & h)) {
                          J[3878] = c | h;
                          J[b >> 2] = f;
                          J[(f + 24) >> 2] = b;
                          break U;
                        }
                        a =
                          e << ((a | 0) != 31 ? (25 - ((a >>> 1) | 0)) | 0 : 0);
                        b = J[b >> 2];
                        while (1) {
                          c = b;
                          if ((J[(b + 4) >> 2] & -8) == (e | 0)) {
                            break T;
                          }
                          h = (a >>> 29) | 0;
                          a = a << 1;
                          h = (b + (h & 4)) | 0;
                          b = J[(h + 16) >> 2];
                          if (b) {
                            continue;
                          }
                          break;
                        }
                        J[(h + 16) >> 2] = f;
                        J[(f + 24) >> 2] = c;
                      }
                      J[(f + 12) >> 2] = f;
                      J[(f + 8) >> 2] = f;
                      break R;
                    }
                    a = J[(c + 8) >> 2];
                    J[(a + 12) >> 2] = f;
                    J[(c + 8) >> 2] = f;
                    J[(f + 24) >> 2] = 0;
                    J[(f + 12) >> 2] = c;
                    J[(f + 8) >> 2] = a;
                  }
                  a = (d + 8) | 0;
                  break a;
                }
                V: {
                  if (!j) {
                    break V;
                  }
                  b = J[(c + 28) >> 2];
                  d = b << 2;
                  W: {
                    if (J[(d + 15812) >> 2] == (c | 0)) {
                      J[(d + 15812) >> 2] = a;
                      if (a) {
                        break W;
                      }
                      J[3878] = Qg(b) & l;
                      break V;
                    }
                    X: {
                      if (J[(j + 16) >> 2] == (c | 0)) {
                        J[(j + 16) >> 2] = a;
                        break X;
                      }
                      J[(j + 20) >> 2] = a;
                    }
                    if (!a) {
                      break V;
                    }
                  }
                  J[(a + 24) >> 2] = j;
                  b = J[(c + 16) >> 2];
                  if (b) {
                    J[(a + 16) >> 2] = b;
                    J[(b + 24) >> 2] = a;
                  }
                  b = J[(c + 20) >> 2];
                  if (!b) {
                    break V;
                  }
                  J[(a + 20) >> 2] = b;
                  J[(b + 24) >> 2] = a;
                }
                Y: {
                  if (e >>> 0 <= 15) {
                    a = (e + g) | 0;
                    J[(c + 4) >> 2] = a | 3;
                    a = (a + c) | 0;
                    J[(a + 4) >> 2] = J[(a + 4) >> 2] | 1;
                    break Y;
                  }
                  J[(c + 4) >> 2] = g | 3;
                  h = (c + g) | 0;
                  J[(h + 4) >> 2] = e | 1;
                  J[(e + h) >> 2] = e;
                  if (i) {
                    a = ((i & -8) + 15548) | 0;
                    d = J[3882];
                    b = 1 << (i >>> 3);
                    Z: {
                      if (!(b & f)) {
                        J[3877] = b | f;
                        b = a;
                        break Z;
                      }
                      b = J[(a + 8) >> 2];
                    }
                    J[(a + 8) >> 2] = d;
                    J[(b + 12) >> 2] = d;
                    J[(d + 12) >> 2] = a;
                    J[(d + 8) >> 2] = b;
                  }
                  J[3882] = h;
                  J[3879] = e;
                }
                a = (c + 8) | 0;
              }
              da = (k + 16) | 0;
              return a;
            }
            function Md(a, b, c, d, e, f, g, h, i) {
              var j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0,
                u = 0,
                v = 0,
                w = 0,
                x = 0,
                y = 0,
                z = 0,
                A = 0,
                B = 0,
                C = 0,
                D = 0,
                E = 0,
                F = 0,
                G = 0,
                H = 0,
                I = 0,
                K = 0,
                L = 0,
                N = 0,
                O = 0,
                P = 0,
                Q = 0;
              k = (da - 336) | 0;
              da = k;
              j = h;
              n = i & 65535;
              p = e & 65535;
              o = d;
              t = (e ^ i) & -2147483648;
              q = (i >>> 16) & 32767;
              r = (e >>> 16) & 32767;
              a: {
                b: {
                  if (
                    ((q - 32767) >>> 0 > 4294934529) &
                    ((r - 32767) >>> 0 >= 4294934530)
                  ) {
                    break b;
                  }
                  l = e & 2147483647;
                  if (
                    !(!d & ((l | 0) == 2147418112)
                      ? !(b | c)
                      : l >>> 0 < 2147418112)
                  ) {
                    v = d;
                    t = e | 32768;
                    break a;
                  }
                  e = i & 2147483647;
                  if (
                    !(!h & ((e | 0) == 2147418112)
                      ? !(f | g)
                      : e >>> 0 < 2147418112)
                  ) {
                    v = h;
                    t = i | 32768;
                    b = f;
                    c = g;
                    break a;
                  }
                  if (!(b | d | ((l ^ 2147418112) | c))) {
                    if (!(f | h | ((e ^ 2147418112) | g))) {
                      b = 0;
                      c = 0;
                      t = 2147450880;
                      break a;
                    }
                    t = t | 2147418112;
                    b = 0;
                    c = 0;
                    break a;
                  }
                  if (!(f | h | ((e ^ 2147418112) | g))) {
                    b = 0;
                    c = 0;
                    break a;
                  }
                  if (!(b | d | (c | l))) {
                    b = !(f | h | (e | g));
                    v = b ? 0 : v;
                    t = b ? 2147450880 : t;
                    b = 0;
                    c = 0;
                    break a;
                  }
                  if (!(f | h | (e | g))) {
                    t = t | 2147418112;
                    b = 0;
                    c = 0;
                    break a;
                  }
                  if (((l | 0) == 65535) | (l >>> 0 < 65535)) {
                    d = !(o | p);
                    i = S(d ? c : p);
                    d =
                      (((i | 0) == 32 ? (S(d ? b : o) + 32) | 0 : i) +
                        (d ? 64 : 0)) |
                      0;
                    za((k + 320) | 0, b, c, o, p, (d - 15) | 0);
                    w = (16 - d) | 0;
                    o = J[(k + 328) >> 2];
                    p = J[(k + 332) >> 2];
                    c = J[(k + 324) >> 2];
                    b = J[(k + 320) >> 2];
                  }
                  if (e >>> 0 > 65535) {
                    break b;
                  }
                  d = !(j | n);
                  h = S(d ? g : n);
                  d =
                    (((h | 0) == 32 ? (S(d ? f : j) + 32) | 0 : h) +
                      (d ? 64 : 0)) |
                    0;
                  za((k + 304) | 0, f, g, j, n, (d - 15) | 0);
                  w = (((d + w) | 0) - 16) | 0;
                  j = J[(k + 312) >> 2];
                  n = J[(k + 316) >> 2];
                  f = J[(k + 304) >> 2];
                  g = J[(k + 308) >> 2];
                }
                d = n | 65536;
                B = d;
                C = j;
                e = j;
                d = (d << 15) | (e >>> 17);
                h = (e << 15) | (g >>> 17);
                j = (0 - h) | 0;
                i = d;
                e = d;
                d = (1963258675 - ((d + ((h | 0) != 0)) | 0)) | 0;
                ya((k + 288) | 0, h, e, 0, 0, j, d, 0, 0);
                e = J[(k + 296) >> 2];
                ya(
                  (k + 272) | 0,
                  (0 - e) | 0,
                  (0 - ((J[(k + 300) >> 2] + ((e | 0) != 0)) | 0)) | 0,
                  0,
                  0,
                  j,
                  d,
                  0,
                  0,
                );
                e = J[(k + 280) >> 2];
                j = (e << 1) | (J[(k + 276) >> 2] >>> 31);
                d = (J[(k + 284) >> 2] << 1) | (e >>> 31);
                ya((k + 256) | 0, j, d, 0, 0, h, i, 0, 0);
                e = J[(k + 264) >> 2];
                ya(
                  (k + 240) | 0,
                  j,
                  d,
                  0,
                  0,
                  (0 - e) | 0,
                  (0 - ((J[(k + 268) >> 2] + ((e | 0) != 0)) | 0)) | 0,
                  0,
                  0,
                );
                d = J[(k + 248) >> 2];
                j = (d << 1) | (J[(k + 244) >> 2] >>> 31);
                d = (J[(k + 252) >> 2] << 1) | (d >>> 31);
                ya((k + 224) | 0, j, d, 0, 0, h, i, 0, 0);
                e = J[(k + 232) >> 2];
                ya(
                  (k + 208) | 0,
                  j,
                  d,
                  0,
                  0,
                  (0 - e) | 0,
                  (0 - ((J[(k + 236) >> 2] + ((e | 0) != 0)) | 0)) | 0,
                  0,
                  0,
                );
                e = J[(k + 216) >> 2];
                j = (e << 1) | (J[(k + 212) >> 2] >>> 31);
                d = (J[(k + 220) >> 2] << 1) | (e >>> 31);
                ya((k + 192) | 0, j, d, 0, 0, h, i, 0, 0);
                e = J[(k + 200) >> 2];
                ya(
                  (k + 176) | 0,
                  j,
                  d,
                  0,
                  0,
                  (0 - e) | 0,
                  (0 - ((J[(k + 204) >> 2] + ((e | 0) != 0)) | 0)) | 0,
                  0,
                  0,
                );
                d = J[(k + 184) >> 2];
                e = h;
                j = i;
                l = (d << 1) | (J[(k + 180) >> 2] >>> 31);
                h = (l - 1) | 0;
                i = (((J[(k + 188) >> 2] << 1) | (d >>> 31)) - !l) | 0;
                ya((k + 160) | 0, e, j, 0, 0, h, i, 0, 0);
                ya(
                  (k + 144) | 0,
                  f << 15,
                  (g << 15) | (f >>> 17),
                  0,
                  0,
                  h,
                  i,
                  0,
                  0,
                );
                u = (k + 112) | 0;
                D = J[(k + 168) >> 2];
                e = J[(k + 172) >> 2];
                l = J[(k + 160) >> 2];
                j = J[(k + 152) >> 2];
                n = (l + j) | 0;
                m = J[(k + 164) >> 2];
                d = (m + J[(k + 156) >> 2]) | 0;
                d = j >>> 0 > n >>> 0 ? (d + 1) | 0 : d;
                j = d;
                d =
                  (((m | 0) == (d | 0)) & (l >>> 0 > n >>> 0)) |
                  (d >>> 0 < m >>> 0);
                m = (d + D) | 0;
                d = d >>> 0 > m >>> 0 ? (e + 1) | 0 : e;
                l = (!j & (n >>> 0 > 1)) | ((j | 0) != 0);
                e = (l + m) | 0;
                d = l >>> 0 > e >>> 0 ? (d + 1) | 0 : d;
                ya(
                  u,
                  h,
                  i,
                  0,
                  0,
                  (0 - e) | 0,
                  (0 - ((((e | 0) != 0) + d) | 0)) | 0,
                  0,
                  0,
                );
                ya(
                  (k + 128) | 0,
                  (1 - n) | 0,
                  (0 - (((n >>> 0 > 1) + j) | 0)) | 0,
                  0,
                  0,
                  h,
                  i,
                  0,
                  0,
                );
                K = (((r - q) | 0) + w) | 0;
                w = (K + 16383) | 0;
                h = J[(k + 116) >> 2];
                z = h;
                e = J[(k + 112) >> 2];
                d = (h << 1) | (e >>> 31);
                l = e << 1;
                s = d;
                e = d;
                i = J[(k + 140) >> 2];
                u = i;
                h = J[(k + 136) >> 2];
                d = (i << 1) | (h >>> 31);
                i = (h << 1) | (J[(k + 132) >> 2] >>> 31);
                j = (i + l) | 0;
                e = (d + e) | 0;
                e = i >>> 0 > j >>> 0 ? (e + 1) | 0 : e;
                h = e;
                d = (e - (j >>> 0 < 13927)) | 0;
                r = d;
                i = 0;
                d = p | 65536;
                L = d;
                N = o;
                e = o;
                d = (d << 1) | (e >>> 31);
                P = e << 1;
                Q = d;
                E = d;
                d = Pg(r, i, d, 0);
                e = ea;
                x = d;
                y = e;
                H = b << 1;
                e = (c << 1) | (b >>> 31);
                q = e;
                d = 0;
                D = d;
                m = d;
                n = (j - 13927) | 0;
                A =
                  (((h | 0) == (r | 0)) & (n >>> 0 < j >>> 0)) |
                  (h >>> 0 > r >>> 0);
                j =
                  (((h | 0) == (s | 0)) & (j >>> 0 < l >>> 0)) |
                  (h >>> 0 < s >>> 0);
                d = J[(k + 120) >> 2];
                e = (J[(k + 124) >> 2] << 1) | (d >>> 31);
                l = (u >>> 31) | 0;
                h = (l + ((d << 1) | (z >>> 31))) | 0;
                d = e;
                d = h >>> 0 < l >>> 0 ? (d + 1) | 0 : d;
                e = (h + j) | 0;
                d = e >>> 0 < h >>> 0 ? (d + 1) | 0 : d;
                h = e;
                e = (e + A) | 0;
                i = h >>> 0 > e >>> 0 ? (d + 1) | 0 : d;
                h = (e - 1) | 0;
                A = (i - !e) | 0;
                s = 0;
                i = Pg(q, m, A, s);
                d = (i + x) | 0;
                e = (ea + y) | 0;
                e = d >>> 0 < i >>> 0 ? (e + 1) | 0 : e;
                u =
                  (((y | 0) == (e | 0)) & (d >>> 0 < x >>> 0)) |
                  (e >>> 0 < y >>> 0);
                l = d;
                j = d;
                i = e;
                d = 0;
                z = h;
                O = (c >>> 31) | 0;
                x = O | (o << 1);
                y = 0;
                h = Pg(h, d, x, y);
                e = (h + j) | 0;
                d = (ea + i) | 0;
                p = e;
                d = e >>> 0 < h >>> 0 ? (d + 1) | 0 : d;
                j = d;
                d =
                  (((d | 0) == (i | 0)) & (e >>> 0 < l >>> 0)) |
                  (d >>> 0 < i >>> 0);
                i = 0;
                e = d;
                d = (d + u) | 0;
                i = e >>> 0 > d >>> 0 ? 1 : i;
                h = Pg(E, m, A, s);
                e = (h + d) | 0;
                d = (ea + i) | 0;
                u = e;
                o = e >>> 0 < h >>> 0 ? (d + 1) | 0 : d;
                d = Pg(E, m, z, y);
                l = ea;
                e = d;
                h = Pg(x, y, A, s);
                i = (d + h) | 0;
                d = (ea + l) | 0;
                d = h >>> 0 > i >>> 0 ? (d + 1) | 0 : d;
                h = d;
                d =
                  (((l | 0) == (d | 0)) & (e >>> 0 > i >>> 0)) |
                  (d >>> 0 < l >>> 0);
                l = (u + h) | 0;
                e = (d + o) | 0;
                o = l >>> 0 < h >>> 0 ? (e + 1) | 0 : e;
                e = i;
                h = 0;
                i = (h + p) | 0;
                d = (e + j) | 0;
                e = i;
                d = e >>> 0 < h >>> 0 ? (d + 1) | 0 : d;
                h = d;
                i =
                  (((j | 0) == (d | 0)) & (e >>> 0 < p >>> 0)) |
                  (d >>> 0 < j >>> 0);
                d = o;
                j = i;
                i = (i + l) | 0;
                d = j >>> 0 > i >>> 0 ? (d + 1) | 0 : d;
                l = i;
                i = d;
                p = e;
                u = n;
                d = Pg(n, 0, x, y);
                o = ea;
                j = d;
                n = Pg(r, m, q, m);
                e = (d + n) | 0;
                d = (ea + o) | 0;
                d = e >>> 0 < n >>> 0 ? (d + 1) | 0 : d;
                F =
                  (((o | 0) == (d | 0)) & (e >>> 0 < j >>> 0)) |
                  (d >>> 0 < o >>> 0);
                j = d;
                G = H & -2;
                o = Pg(z, y, G, 0);
                n = (o + e) | 0;
                d = (ea + d) | 0;
                d = n >>> 0 < o >>> 0 ? (d + 1) | 0 : d;
                o = d;
                d =
                  (((d | 0) == (j | 0)) & (e >>> 0 > n >>> 0)) |
                  (d >>> 0 < j >>> 0);
                e = 0;
                j = d;
                d = (d + F) | 0;
                e = ((j >>> 0 > d >>> 0 ? 1 : e) + h) | 0;
                j = d;
                d = (d + p) | 0;
                e = j >>> 0 > d >>> 0 ? (e + 1) | 0 : e;
                j = e;
                I = p;
                p = d;
                e =
                  (((e | 0) == (h | 0)) & (I >>> 0 > d >>> 0)) |
                  (e >>> 0 < h >>> 0);
                d = i;
                h = e;
                e = (e + l) | 0;
                d = h >>> 0 > e >>> 0 ? (d + 1) | 0 : d;
                I = e;
                l = d;
                d = Pg(E, m, u, v);
                F = ea;
                E = d;
                h = Pg(G, v, A, s);
                e = (d + h) | 0;
                d = (ea + F) | 0;
                d = e >>> 0 < h >>> 0 ? (d + 1) | 0 : d;
                s = e;
                i = Pg(r, m, x, y);
                h = (e + i) | 0;
                m = d;
                e = (d + ea) | 0;
                e = h >>> 0 < i >>> 0 ? (e + 1) | 0 : e;
                x = h;
                d = Pg(q, D, z, y);
                h = (h + d) | 0;
                i = (ea + e) | 0;
                i = d >>> 0 > h >>> 0 ? (i + 1) | 0 : i;
                A = i;
                z = 0;
                i =
                  (((e | 0) == (i | 0)) & (h >>> 0 < x >>> 0)) |
                  (e >>> 0 > i >>> 0);
                d =
                  (((e | 0) == (m | 0)) & (s >>> 0 > x >>> 0)) |
                  (e >>> 0 < m >>> 0);
                m =
                  (d +
                    ((((m | 0) == (F | 0)) & (s >>> 0 < E >>> 0)) |
                      (m >>> 0 < F >>> 0))) |
                  0;
                e = (i + m) | 0;
                d = ((e | z) + j) | 0;
                m = A;
                s = (m + p) | 0;
                e = s;
                d = m >>> 0 > e >>> 0 ? (d + 1) | 0 : d;
                m = d;
                j =
                  (((j | 0) == (d | 0)) & (p >>> 0 > e >>> 0)) |
                  (d >>> 0 < j >>> 0);
                d = l;
                i = j;
                j = (j + I) | 0;
                d = i >>> 0 > j >>> 0 ? (d + 1) | 0 : d;
                x = j;
                l = d;
                z = e;
                s = m;
                d = Pg(r, D, G, v);
                r = ea;
                m = d;
                e = Pg(q, D, u, v);
                j = (d + e) | 0;
                d = (ea + r) | 0;
                d = e >>> 0 > j >>> 0 ? (d + 1) | 0 : d;
                p = d;
                d = 0;
                e =
                  (((p | 0) == (r | 0)) & (j >>> 0 < m >>> 0)) |
                  (p >>> 0 < r >>> 0);
                m = (p + n) | 0;
                d = ((d | e) + o) | 0;
                d = m >>> 0 < p >>> 0 ? (d + 1) | 0 : d;
                n =
                  (((o | 0) == (d | 0)) & (n >>> 0 > m >>> 0)) |
                  (d >>> 0 < o >>> 0);
                e = d;
                d = h;
                o = 0;
                h = (o + m) | 0;
                i = (d + e) | 0;
                d = 0;
                i = h >>> 0 < o >>> 0 ? (i + 1) | 0 : i;
                o = i;
                e =
                  (((i | 0) == (e | 0)) & (h >>> 0 < m >>> 0)) |
                  (e >>> 0 > i >>> 0);
                i = e;
                e = (e + n) | 0;
                d = ((i >>> 0 > e >>> 0 ? 1 : d) + s) | 0;
                i = l;
                m = e;
                e = (e + z) | 0;
                d = m >>> 0 > e >>> 0 ? (d + 1) | 0 : d;
                n =
                  (((d | 0) == (s | 0)) & (e >>> 0 < z >>> 0)) |
                  (d >>> 0 < s >>> 0);
                m = n;
                n = (n + x) | 0;
                i = m >>> 0 > n >>> 0 ? (i + 1) | 0 : i;
                r = n;
                m = e;
                n = e;
                l = d;
                e = j;
                p = 0;
                u = Pg(G, v, u, v);
                j = (p + u) | 0;
                d = e;
                e = (d + ea) | 0;
                e = j >>> 0 < u >>> 0 ? (e + 1) | 0 : e;
                d =
                  ((((d | 0) == (e | 0)) & (j >>> 0 < p >>> 0)) |
                    (d >>> 0 > e >>> 0)) ^
                  -1;
                e =
                  ((o | 0) == -1) &
                  (d >>> 0 < h >>> 0) &
                  (((d | 0) != (h | 0)) | ((o | 0) != -1));
                d = l;
                n = (e + n) | 0;
                d = n >>> 0 < e >>> 0 ? (d + 1) | 0 : d;
                h = d;
                e =
                  (((l | 0) == (d | 0)) & (n >>> 0 < m >>> 0)) |
                  (d >>> 0 < l >>> 0);
                d = i;
                j = (e + r) | 0;
                d = j >>> 0 < e >>> 0 ? (d + 1) | 0 : d;
                e = d;
                c: {
                  if (((d | 0) == 131071) | (d >>> 0 < 131071)) {
                    N = P | O;
                    L = y | Q;
                    r = (k + 80) | 0;
                    o = n;
                    l = d >>> 0 < 65536;
                    i = l;
                    if ((i & 63) >>> 0 >= 32) {
                      d = n << i;
                      o = 0;
                    } else {
                      d = (((1 << i) - 1) & (o >>> (32 - i))) | (h << i);
                      o = o << i;
                    }
                    p = d;
                    m = j;
                    i = l & 31;
                    p = d;
                    if ((l & 63) >>> 0 >= 32) {
                      e = j << i;
                      c = 0;
                    } else {
                      e = (((1 << i) - 1) & (m >>> (32 - i))) | (e << i);
                      c = m << i;
                    }
                    i = (h >>> 1) | 0;
                    n = ((h & 1) << 31) | (n >>> 1);
                    j = l ^ 63;
                    h = j & 31;
                    if ((j & 63) >>> 0 >= 32) {
                      d = 0;
                      h = (i >>> h) | 0;
                    } else {
                      d = (i >>> h) | 0;
                      h = ((((1 << h) - 1) & i) << (32 - h)) | (n >>> h);
                    }
                    h = c | h;
                    i = d | e;
                    ya(r, o, p, h, i, f, g, C, B);
                    w = ((l ? (K + 16382) | 0 : w) - 1) | 0;
                    e = J[(k + 84) >> 2];
                    m = e;
                    d = b << 17;
                    n = 0;
                    l = J[(k + 88) >> 2];
                    b = (n - l) | 0;
                    c = J[(k + 80) >> 2];
                    e = (e | c) != 0;
                    j = (b - e) | 0;
                    n =
                      (((d - ((J[(k + 92) >> 2] + (l >>> 0 > n >>> 0)) | 0)) |
                        0) -
                        (b >>> 0 < e >>> 0)) |
                      0;
                    l = (0 - ((((c | 0) != 0) + m) | 0)) | 0;
                    m = (0 - c) | 0;
                    break c;
                  }
                  o = ((h & 1) << 31) | (n >>> 1);
                  d = (j << 31) | (h >>> 1);
                  p = d;
                  h = ((e & 1) << 31) | (j >>> 1);
                  i = (e >>> 1) | 0;
                  ya((k + 96) | 0, o, d, h, i, f, g, C, B);
                  j = J[(k + 100) >> 2];
                  r = j;
                  q = 0;
                  m = J[(k + 104) >> 2];
                  n = (q - m) | 0;
                  e = J[(k + 96) >> 2];
                  l = (j | e) != 0;
                  j = (n - l) | 0;
                  n =
                    ((((b << 16) -
                      ((J[(k + 108) >> 2] + (m >>> 0 > q >>> 0)) | 0)) |
                      0) -
                      (l >>> 0 > n >>> 0)) |
                    0;
                  H = b;
                  q = c;
                  l = (0 - ((((e | 0) != 0) + r) | 0)) | 0;
                  m = (0 - e) | 0;
                }
                if ((w | 0) >= 32767) {
                  t = t | 2147418112;
                  b = 0;
                  c = 0;
                  break a;
                }
                d: {
                  if ((w | 0) > 0) {
                    b = (j << 1) | (l >>> 31);
                    c = (n << 1) | (j >>> 31);
                    j = h;
                    n = (i & 65535) | (w << 16);
                    h = m << 1;
                    e = (l << 1) | (m >>> 31);
                    break d;
                  }
                  if ((w | 0) <= -113) {
                    b = 0;
                    c = 0;
                    break a;
                  }
                  _a((k - -64) | 0, o, p, h, i, (1 - w) | 0);
                  za((k + 48) | 0, H, q, N, L, (w + 112) | 0);
                  o = J[(k + 64) >> 2];
                  p = J[(k + 68) >> 2];
                  j = J[(k + 72) >> 2];
                  n = J[(k + 76) >> 2];
                  ya((k + 32) | 0, f, g, C, B, o, p, j, n);
                  b = J[(k + 40) >> 2];
                  c = J[(k + 56) >> 2];
                  h = J[(k + 36) >> 2];
                  q = (b << 1) | (h >>> 31);
                  i = (c - q) | 0;
                  q =
                    (J[(k + 60) >> 2] -
                      ((((J[(k + 44) >> 2] << 1) | (b >>> 31)) +
                        (c >>> 0 < q >>> 0)) |
                        0)) |
                    0;
                  c = J[(k + 52) >> 2];
                  m = c;
                  b = J[(k + 32) >> 2];
                  e = (h << 1) | (b >>> 31);
                  l = b << 1;
                  d = J[(k + 48) >> 2];
                  c =
                    (((m | 0) == (e | 0)) & (l >>> 0 > d >>> 0)) |
                    (m >>> 0 < e >>> 0);
                  b = (i - c) | 0;
                  c = (q - (c >>> 0 > i >>> 0)) | 0;
                  h = (d - l) | 0;
                  e = (m - (((d >>> 0 < l >>> 0) + e) | 0)) | 0;
                }
                ya((k + 16) | 0, f, g, C, B, 3, 0, 0, 0);
                ya(k, f, g, C, B, 5, 0, 0, 0);
                d = n;
                i = p;
                n = f;
                l = 0;
                e = (e + l) | 0;
                f = g;
                g = h;
                q = o & 1;
                h = (h + q) | 0;
                e = g >>> 0 > h >>> 0 ? (e + 1) | 0 : e;
                g = e;
                n =
                  (((f | 0) == (e | 0)) & (h >>> 0 > n >>> 0)) |
                  (e >>> 0 > f >>> 0);
                f =
                  (((e | 0) == (l | 0)) & (h >>> 0 < q >>> 0)) |
                  (e >>> 0 < l >>> 0);
                e = c;
                c = f;
                f = (b + f) | 0;
                e = c >>> 0 > f >>> 0 ? (e + 1) | 0 : e;
                b = (B | 0) == (e | 0);
                b =
                  b & ((f | 0) == (C | 0))
                    ? n
                    : (b & (f >>> 0 > C >>> 0)) | (e >>> 0 > B >>> 0);
                c = b;
                b = (b + o) | 0;
                i = c >>> 0 > b >>> 0 ? (i + 1) | 0 : i;
                c =
                  (((p | 0) == (i | 0)) & (b >>> 0 < o >>> 0)) |
                  (i >>> 0 < p >>> 0);
                m = c;
                c = (c + j) | 0;
                d = m >>> 0 > c >>> 0 ? (d + 1) | 0 : d;
                o = c;
                c = d;
                m = d >>> 0 < 2147418112;
                d = J[(k + 20) >> 2];
                l =
                  (((d | 0) == (g | 0)) & (M[(k + 16) >> 2] < h >>> 0)) |
                  (d >>> 0 < g >>> 0);
                d = J[(k + 28) >> 2];
                j = J[(k + 24) >> 2];
                j =
                  m &
                  (((f | 0) == (j | 0)) & ((d | 0) == (e | 0))
                    ? l
                    : (((d | 0) == (e | 0)) & (j >>> 0 < f >>> 0)) |
                      (d >>> 0 < e >>> 0));
                d = i;
                m = j;
                j = (b + j) | 0;
                d = m >>> 0 > j >>> 0 ? (d + 1) | 0 : d;
                b =
                  (((i | 0) == (d | 0)) & (b >>> 0 > j >>> 0)) |
                  (d >>> 0 < i >>> 0);
                i = c;
                c = b;
                b = (b + o) | 0;
                i = c >>> 0 > b >>> 0 ? (i + 1) | 0 : i;
                o = b;
                c = J[(k + 4) >> 2];
                g =
                  (((c | 0) == (g | 0)) & (M[k >> 2] < h >>> 0)) |
                  (c >>> 0 < g >>> 0);
                c = J[(k + 12) >> 2];
                b = J[(k + 8) >> 2];
                b =
                  (i >>> 0 < 2147418112) &
                  (((b | 0) == (f | 0)) & ((c | 0) == (e | 0))
                    ? g
                    : (((c | 0) == (e | 0)) & (b >>> 0 < f >>> 0)) |
                      (c >>> 0 < e >>> 0));
                c = b;
                b = (b + j) | 0;
                e = c >>> 0 > b >>> 0 ? (d + 1) | 0 : d;
                c = e;
                e =
                  (((d | 0) == (e | 0)) & (b >>> 0 < j >>> 0)) |
                  (d >>> 0 > e >>> 0);
                d = i;
                f = e;
                e = (e + o) | 0;
                d = f >>> 0 > e >>> 0 ? (d + 1) | 0 : d;
                v = e | v;
                t = d | t;
              }
              J[a >> 2] = b;
              J[(a + 4) >> 2] = c;
              J[(a + 8) >> 2] = v;
              J[(a + 12) >> 2] = t;
              da = (k + 336) | 0;
            }
            function be(a) {
              a = a | 0;
              var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
              c = (da - 224) | 0;
              da = c;
              if (!K[15500]) {
                J[3872] = 0;
                J[3873] = 0;
                J[3874] = 0;
                H[15500] = 1;
              }
              J[(c + 216) >> 2] = 0;
              J[(c + 220) >> 2] = 0;
              J[(c + 208) >> 2] = 0;
              J[(c + 212) >> 2] = 0;
              J[(c + 200) >> 2] = 0;
              J[(c + 204) >> 2] = 0;
              J[(c + 192) >> 2] = 0;
              J[(c + 196) >> 2] = 0;
              J[(c + 184) >> 2] = 0;
              J[(c + 188) >> 2] = 0;
              J[(c + 176) >> 2] = 0;
              J[(c + 180) >> 2] = 0;
              J[(c + 168) >> 2] = 0;
              J[(c + 172) >> 2] = 0;
              J[(c + 160) >> 2] = 0;
              J[(c + 164) >> 2] = 0;
              b = hb(a);
              if (b >>> 0 < 2147483640) {
                a: {
                  b: {
                    if (b >>> 0 >= 11) {
                      f = b | 7;
                      e = Oa((f + 1) | 0);
                      J[(c + 8) >> 2] = f - 2147483647;
                      J[c >> 2] = e;
                      J[(c + 4) >> 2] = b;
                      break b;
                    }
                    H[(c + 11) | 0] = b;
                    e = c;
                    if (!b) {
                      break a;
                    }
                  }
                  if (!b) {
                    break a;
                  }
                  y(e, a, b);
                }
                H[(b + e) | 0] = 0;
                J[(c + 76) >> 2] = 2612;
                J[(c + 104) >> 2] = 0;
                J[(c + 20) >> 2] = 2592;
                a = J[657];
                J[(c + 12) >> 2] = a;
                b = J[(a - 12) >> 2];
                e = (c + 12) | 0;
                a = e;
                J[(b + a) >> 2] = J[658];
                J[(c + 16) >> 2] = 0;
                a = (a + J[(J[(c + 12) >> 2] - 12) >> 2]) | 0;
                J[(a + 20) >> 2] = 0;
                b = (c + 24) | 0;
                J[(a + 24) >> 2] = b;
                J[(a + 12) >> 2] = 0;
                J[(a + 4) >> 2] = 4098;
                J[(a + 8) >> 2] = 6;
                J[(a + 16) >> 2] = !b;
                D((a + 32) | 0, 0, 40);
                Oc((a + 28) | 0);
                H[(a + 80) | 0] = 0;
                J[(a + 72) >> 2] = 0;
                J[(a + 76) >> 2] = -1;
                a = J[659];
                J[(c + 20) >> 2] = a;
                J[(J[(a - 12) >> 2] + ((c + 20) | 0)) >> 2] = J[660];
                a = J[656];
                J[(c + 12) >> 2] = a;
                J[(e + J[(a - 12) >> 2]) >> 2] = J[661];
                J[(c + 76) >> 2] = 2612;
                J[(c + 12) >> 2] = 2572;
                J[(c + 24) >> 2] = 1756;
                J[(c + 20) >> 2] = 2592;
                i = Oc((c + 28) | 0);
                J[(c + 48) >> 2] = 0;
                J[(c + 52) >> 2] = 0;
                J[(c + 40) >> 2] = 0;
                J[(c + 44) >> 2] = 0;
                J[(c + 32) >> 2] = 0;
                J[(c + 36) >> 2] = 0;
                J[(c + 56) >> 2] = 0;
                J[(c + 60) >> 2] = 0;
                J[(c + 24) >> 2] = 2004;
                J[(c + 64) >> 2] = 0;
                J[(c + 68) >> 2] = 0;
                J[(c + 72) >> 2] = 24;
                a = (b + 32) | 0;
                c: {
                  if ((a | 0) == (c | 0)) {
                    break c;
                  }
                  if (!((K[(a + 11) | 0] >>> 7) | 0)) {
                    if (!((K[(c + 11) | 0] >>> 7) | 0)) {
                      J[(a + 8) >> 2] = J[(c + 8) >> 2];
                      e = J[(c + 4) >> 2];
                      J[a >> 2] = J[c >> 2];
                      J[(a + 4) >> 2] = e;
                      break c;
                    }
                    e = a;
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      a = J[c >> 2];
                    } else {
                      a = c;
                    }
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      f = J[(c + 4) >> 2];
                    } else {
                      f = K[(c + 11) | 0] & 127;
                    }
                    mc(e, a, f);
                    break c;
                  }
                  e = a;
                  if ((K[(c + 11) | 0] >>> 7) | 0) {
                    a = J[c >> 2];
                  } else {
                    a = c;
                  }
                  if ((K[(c + 11) | 0] >>> 7) | 0) {
                    f = J[(c + 4) >> 2];
                  } else {
                    f = K[(c + 11) | 0] & 127;
                  }
                  nc(e, a, f);
                }
                J[(b + 44) >> 2] = 0;
                a = (b + 32) | 0;
                d: {
                  if ((K[(a + 11) | 0] >>> 7) | 0) {
                    e = J[a >> 2];
                    break d;
                  }
                  e = a;
                }
                f = e;
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  e = J[(a + 4) >> 2];
                } else {
                  e = K[(a + 11) | 0] & 127;
                }
                d = J[(b + 48) >> 2];
                if (d & 8) {
                  d = (e + f) | 0;
                  J[(b + 44) >> 2] = d;
                  J[(b + 16) >> 2] = d;
                  J[(b + 12) >> 2] = f;
                  J[(b + 8) >> 2] = f;
                  d = J[(b + 48) >> 2];
                }
                e: {
                  if (!(d & 16)) {
                    break e;
                  }
                  J[(b + 44) >> 2] = e + f;
                  ka(
                    a,
                    (K[(a + 11) | 0] >>> 7) | 0
                      ? ((J[(a + 8) >> 2] & 2147483647) - 1) | 0
                      : 10,
                  );
                  if ((K[(a + 11) | 0] >>> 7) | 0) {
                    a = J[(a + 4) >> 2];
                  } else {
                    a = K[(a + 11) | 0] & 127;
                  }
                  J[(b + 28) >> 2] = a + f;
                  J[(b + 20) >> 2] = f;
                  J[(b + 24) >> 2] = f;
                  if (!(K[(b + 48) | 0] & 3)) {
                    break e;
                  }
                  while (1) {
                    if ((e | 0) < 0) {
                      J[(b + 24) >> 2] = J[(b + 24) >> 2] + 2147483647;
                      e = (e - 2147483647) | 0;
                      continue;
                    }
                    break;
                  }
                  if (!e) {
                    break e;
                  }
                  J[(b + 24) >> 2] = J[(b + 24) >> 2] + e;
                }
                if (H[(c + 11) | 0] < 0) {
                  la(J[c >> 2]);
                }
                a = (c + 12) | 0;
                b = (c + 160) | 0;
                Aa(a, b);
                Aa(a, b | 4);
                Aa(a, (c + 168) | 0);
                Aa(a, (c + 172) | 0);
                Aa(a, (c + 176) | 0);
                Aa(a, (c + 180) | 0);
                Aa(a, (c + 184) | 0);
                Aa(a, (c + 188) | 0);
                Aa(a, (c + 192) | 0);
                Aa(a, (c + 196) | 0);
                Aa(a, (c + 200) | 0);
                Aa(a, (c + 204) | 0);
                Aa(a, (c + 208) | 0);
                Aa(a, (c + 212) | 0);
                Aa(a, (c + 216) | 0);
                Aa(a, (c + 220) | 0);
                f =
                  (!J[(c + 220) >> 2] +
                    ((!J[(c + 216) >> 2] +
                      ((!J[(c + 212) >> 2] +
                        ((!J[(c + 208) >> 2] +
                          ((!J[(c + 204) >> 2] +
                            ((!J[(c + 200) >> 2] +
                              ((!J[(c + 196) >> 2] +
                                ((!J[(c + 192) >> 2] +
                                  ((!J[(c + 188) >> 2] +
                                    ((!J[(c + 184) >> 2] +
                                      ((!J[(c + 180) >> 2] +
                                        ((!J[(c + 176) >> 2] +
                                          ((!J[(c + 172) >> 2] +
                                            ((!J[(c + 168) >> 2] +
                                              ((!J[(c + 164) >> 2] +
                                                !J[(c + 160) >> 2]) |
                                                0)) |
                                              0)) |
                                            0)) |
                                          0)) |
                                        0)) |
                                      0)) |
                                    0)) |
                                  0)) |
                                0)) |
                              0)) |
                            0)) |
                          0)) |
                        0)) |
                      0)) |
                  0;
                a = (da - 128) | 0;
                da = a;
                e = J[(b + 4) >> 2];
                J[a >> 2] = J[b >> 2];
                J[(a + 4) >> 2] = e;
                e = J[(b + 12) >> 2];
                J[(a + 8) >> 2] = J[(b + 8) >> 2];
                J[(a + 12) >> 2] = e;
                e = J[(b + 20) >> 2];
                J[(a + 16) >> 2] = J[(b + 16) >> 2];
                J[(a + 20) >> 2] = e;
                e = J[(b + 28) >> 2];
                J[(a + 24) >> 2] = J[(b + 24) >> 2];
                J[(a + 28) >> 2] = e;
                e = J[(b + 36) >> 2];
                J[(a + 32) >> 2] = J[(b + 32) >> 2];
                J[(a + 36) >> 2] = e;
                e = J[(b + 44) >> 2];
                J[(a + 40) >> 2] = J[(b + 40) >> 2];
                J[(a + 44) >> 2] = e;
                e = J[(b + 52) >> 2];
                J[(a + 48) >> 2] = J[(b + 48) >> 2];
                J[(a + 52) >> 2] = e;
                e = J[(b + 60) >> 2];
                J[(a + 56) >> 2] = J[(b + 56) >> 2];
                J[(a + 60) >> 2] = e;
                Ya((a - -64) | 0, a, 0);
                e = -1;
                f = ((f >>> 0 > 7 ? 4 : f >>> 0 > 3 ? 5 : 6) - 1) | 0;
                f: {
                  if (
                    !(
                      (J[(a + 64) >> 2] ^ J[b >> 2]) |
                      (J[(a + 72) >> 2] ^ J[(b + 8) >> 2]) |
                      ((J[(a + 80) >> 2] ^ J[(b + 16) >> 2]) |
                        (J[(a + 88) >> 2] ^ J[(b + 24) >> 2])) |
                      ((J[(a + 96) >> 2] ^ J[(b + 32) >> 2]) |
                        (J[(a + 104) >> 2] ^ J[(b + 40) >> 2]) |
                        ((J[(a + 112) >> 2] ^ J[(b + 48) >> 2]) |
                          (J[(a + 120) >> 2] ^ J[(b + 56) >> 2]))) |
                      ((J[(a + 68) >> 2] ^ J[(b + 4) >> 2]) |
                        (J[(a + 76) >> 2] ^ J[(b + 12) >> 2]) |
                        ((J[(a + 84) >> 2] ^ J[(b + 20) >> 2]) |
                          (J[(a + 92) >> 2] ^ J[(b + 28) >> 2])) |
                        ((J[(a + 100) >> 2] ^ J[(b + 36) >> 2]) |
                          (J[(a + 108) >> 2] ^ J[(b + 44) >> 2]) |
                          ((J[(a + 116) >> 2] ^ J[(b + 52) >> 2]) |
                            (J[(a + 124) >> 2] ^ J[(b + 60) >> 2]))))
                    )
                  ) {
                    g = -1e9;
                    break f;
                  }
                  g = xa((a - -64) | 0, f, 0);
                  e = g > -1e9;
                  g = e ? g : -1e9;
                  e = e ? 0 : -1;
                }
                d = J[(b + 4) >> 2];
                J[a >> 2] = J[b >> 2];
                J[(a + 4) >> 2] = d;
                d = J[(b + 12) >> 2];
                J[(a + 8) >> 2] = J[(b + 8) >> 2];
                J[(a + 12) >> 2] = d;
                d = J[(b + 20) >> 2];
                J[(a + 16) >> 2] = J[(b + 16) >> 2];
                J[(a + 20) >> 2] = d;
                d = J[(b + 28) >> 2];
                J[(a + 24) >> 2] = J[(b + 24) >> 2];
                J[(a + 28) >> 2] = d;
                d = J[(b + 36) >> 2];
                J[(a + 32) >> 2] = J[(b + 32) >> 2];
                J[(a + 36) >> 2] = d;
                d = J[(b + 44) >> 2];
                J[(a + 40) >> 2] = J[(b + 40) >> 2];
                J[(a + 44) >> 2] = d;
                d = J[(b + 52) >> 2];
                J[(a + 48) >> 2] = J[(b + 48) >> 2];
                J[(a + 52) >> 2] = d;
                d = J[(b + 60) >> 2];
                J[(a + 56) >> 2] = J[(b + 56) >> 2];
                J[(a + 60) >> 2] = d;
                d = (a - -64) | 0;
                Ya(d, a, 1);
                if (
                  (J[(a + 64) >> 2] ^ J[b >> 2]) |
                  (J[(a + 72) >> 2] ^ J[(b + 8) >> 2]) |
                  ((J[(a + 80) >> 2] ^ J[(b + 16) >> 2]) |
                    (J[(a + 88) >> 2] ^ J[(b + 24) >> 2])) |
                  ((J[(a + 96) >> 2] ^ J[(b + 32) >> 2]) |
                    (J[(a + 104) >> 2] ^ J[(b + 40) >> 2]) |
                    ((J[(a + 112) >> 2] ^ J[(b + 48) >> 2]) |
                      (J[(a + 120) >> 2] ^ J[(b + 56) >> 2]))) |
                  ((J[(a + 68) >> 2] ^ J[(b + 4) >> 2]) |
                    (J[(a + 76) >> 2] ^ J[(b + 12) >> 2]) |
                    ((J[(a + 84) >> 2] ^ J[(b + 20) >> 2]) |
                      (J[(a + 92) >> 2] ^ J[(b + 28) >> 2])) |
                    ((J[(a + 100) >> 2] ^ J[(b + 36) >> 2]) |
                      (J[(a + 108) >> 2] ^ J[(b + 44) >> 2]) |
                      ((J[(a + 116) >> 2] ^ J[(b + 52) >> 2]) |
                        (J[(a + 124) >> 2] ^ J[(b + 60) >> 2]))))
                ) {
                  h = xa(d, f, 0);
                  d = h > g;
                  g = d ? h : g;
                  e = d ? 1 : e;
                }
                d = J[(b + 4) >> 2];
                J[a >> 2] = J[b >> 2];
                J[(a + 4) >> 2] = d;
                d = J[(b + 12) >> 2];
                J[(a + 8) >> 2] = J[(b + 8) >> 2];
                J[(a + 12) >> 2] = d;
                d = J[(b + 20) >> 2];
                J[(a + 16) >> 2] = J[(b + 16) >> 2];
                J[(a + 20) >> 2] = d;
                d = J[(b + 28) >> 2];
                J[(a + 24) >> 2] = J[(b + 24) >> 2];
                J[(a + 28) >> 2] = d;
                d = J[(b + 36) >> 2];
                J[(a + 32) >> 2] = J[(b + 32) >> 2];
                J[(a + 36) >> 2] = d;
                d = J[(b + 44) >> 2];
                J[(a + 40) >> 2] = J[(b + 40) >> 2];
                J[(a + 44) >> 2] = d;
                d = J[(b + 52) >> 2];
                J[(a + 48) >> 2] = J[(b + 48) >> 2];
                J[(a + 52) >> 2] = d;
                d = J[(b + 60) >> 2];
                J[(a + 56) >> 2] = J[(b + 56) >> 2];
                J[(a + 60) >> 2] = d;
                d = (a - -64) | 0;
                Ya(d, a, 2);
                if (
                  (J[(a + 64) >> 2] ^ J[b >> 2]) |
                  (J[(a + 72) >> 2] ^ J[(b + 8) >> 2]) |
                  ((J[(a + 80) >> 2] ^ J[(b + 16) >> 2]) |
                    (J[(a + 88) >> 2] ^ J[(b + 24) >> 2])) |
                  ((J[(a + 96) >> 2] ^ J[(b + 32) >> 2]) |
                    (J[(a + 104) >> 2] ^ J[(b + 40) >> 2]) |
                    ((J[(a + 112) >> 2] ^ J[(b + 48) >> 2]) |
                      (J[(a + 120) >> 2] ^ J[(b + 56) >> 2]))) |
                  ((J[(a + 68) >> 2] ^ J[(b + 4) >> 2]) |
                    (J[(a + 76) >> 2] ^ J[(b + 12) >> 2]) |
                    ((J[(a + 84) >> 2] ^ J[(b + 20) >> 2]) |
                      (J[(a + 92) >> 2] ^ J[(b + 28) >> 2])) |
                    ((J[(a + 100) >> 2] ^ J[(b + 36) >> 2]) |
                      (J[(a + 108) >> 2] ^ J[(b + 44) >> 2]) |
                      ((J[(a + 116) >> 2] ^ J[(b + 52) >> 2]) |
                        (J[(a + 124) >> 2] ^ J[(b + 60) >> 2]))))
                ) {
                  h = xa(d, f, 0);
                  d = h > g;
                  g = d ? h : g;
                  e = d ? 2 : e;
                }
                d = J[(b + 4) >> 2];
                J[a >> 2] = J[b >> 2];
                J[(a + 4) >> 2] = d;
                d = J[(b + 12) >> 2];
                J[(a + 8) >> 2] = J[(b + 8) >> 2];
                J[(a + 12) >> 2] = d;
                d = J[(b + 20) >> 2];
                J[(a + 16) >> 2] = J[(b + 16) >> 2];
                J[(a + 20) >> 2] = d;
                d = J[(b + 28) >> 2];
                J[(a + 24) >> 2] = J[(b + 24) >> 2];
                J[(a + 28) >> 2] = d;
                d = J[(b + 36) >> 2];
                J[(a + 32) >> 2] = J[(b + 32) >> 2];
                J[(a + 36) >> 2] = d;
                d = J[(b + 44) >> 2];
                J[(a + 40) >> 2] = J[(b + 40) >> 2];
                J[(a + 44) >> 2] = d;
                d = J[(b + 52) >> 2];
                J[(a + 48) >> 2] = J[(b + 48) >> 2];
                J[(a + 52) >> 2] = d;
                d = J[(b + 60) >> 2];
                J[(a + 56) >> 2] = J[(b + 56) >> 2];
                J[(a + 60) >> 2] = d;
                d = (a - -64) | 0;
                Ya(d, a, 3);
                if (
                  (J[(a + 64) >> 2] ^ J[b >> 2]) |
                  (J[(a + 72) >> 2] ^ J[(b + 8) >> 2]) |
                  ((J[(a + 80) >> 2] ^ J[(b + 16) >> 2]) |
                    (J[(a + 88) >> 2] ^ J[(b + 24) >> 2])) |
                  ((J[(a + 96) >> 2] ^ J[(b + 32) >> 2]) |
                    (J[(a + 104) >> 2] ^ J[(b + 40) >> 2]) |
                    ((J[(a + 112) >> 2] ^ J[(b + 48) >> 2]) |
                      (J[(a + 120) >> 2] ^ J[(b + 56) >> 2]))) |
                  ((J[(a + 68) >> 2] ^ J[(b + 4) >> 2]) |
                    (J[(a + 76) >> 2] ^ J[(b + 12) >> 2]) |
                    ((J[(a + 84) >> 2] ^ J[(b + 20) >> 2]) |
                      (J[(a + 92) >> 2] ^ J[(b + 28) >> 2])) |
                    ((J[(a + 100) >> 2] ^ J[(b + 36) >> 2]) |
                      (J[(a + 108) >> 2] ^ J[(b + 44) >> 2]) |
                      ((J[(a + 116) >> 2] ^ J[(b + 52) >> 2]) |
                        (J[(a + 124) >> 2] ^ J[(b + 60) >> 2]))))
                ) {
                  e = xa(d, f, 0) > g ? 3 : e;
                }
                da = (a + 128) | 0;
                a = (P(e, 12) + 15440) | 0;
                g: {
                  if ((a | 0) == 15488) {
                    break g;
                  }
                  e = H[(a + 11) | 0];
                  if (H[15499] >= 0) {
                    if ((e | 0) >= 0) {
                      J[3874] = J[(a + 8) >> 2];
                      e = J[(a + 4) >> 2];
                      J[3872] = J[a >> 2];
                      J[3873] = e;
                      break g;
                    }
                    mc(15488, J[a >> 2], J[(a + 4) >> 2]);
                    break g;
                  }
                  b = (e | 0) < 0;
                  nc(15488, b ? J[a >> 2] : a, b ? J[(a + 4) >> 2] : e);
                }
                a = J[655];
                J[(c + 12) >> 2] = a;
                J[(J[(a - 12) >> 2] + ((c + 12) | 0)) >> 2] = J[663];
                J[(c + 24) >> 2] = 2004;
                J[(c + 20) >> 2] = J[664];
                a = J[3872];
                e = H[15499];
                if (H[(c + 67) | 0] < 0) {
                  la(J[(c + 56) >> 2]);
                }
                J[(c + 24) >> 2] = 1756;
                wa(i);
                mb((c + 76) | 0);
                da = (c + 224) | 0;
                return ((e | 0) >= 0 ? 15488 : a) | 0;
              }
              fc(1439);
              C();
            }
            function pa(a, b, c, d, e, f, g, h, i) {
              var j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0,
                u = 0,
                v = 0,
                w = 0,
                x = 0,
                y = 0,
                z = 0,
                A = 0,
                B = 0,
                C = 0;
              l = (da - 96) | 0;
              da = l;
              n = i & 65535;
              q = (e ^ i) & -2147483648;
              k = e & 65535;
              u = k;
              w = (i >>> 16) & 32767;
              p = (e >>> 16) & 32767;
              a: {
                b: {
                  if (
                    ((w - 32767) >>> 0 > 4294934529) &
                    ((p - 32767) >>> 0 >= 4294934530)
                  ) {
                    break b;
                  }
                  m = e & 2147483647;
                  r = m;
                  j = d;
                  if (
                    !(!j & ((m | 0) == 2147418112)
                      ? !(b | c)
                      : m >>> 0 < 2147418112)
                  ) {
                    o = j;
                    q = e | 32768;
                    break a;
                  }
                  m = i & 2147483647;
                  e = h;
                  if (
                    !(!e & ((m | 0) == 2147418112)
                      ? !(f | g)
                      : m >>> 0 < 2147418112)
                  ) {
                    o = e;
                    q = i | 32768;
                    b = f;
                    c = g;
                    break a;
                  }
                  if (!(b | j | ((r ^ 2147418112) | c))) {
                    if (!(e | f | (g | m))) {
                      q = 2147450880;
                      b = 0;
                      c = 0;
                      break a;
                    }
                    q = q | 2147418112;
                    b = 0;
                    c = 0;
                    break a;
                  }
                  if (!(e | f | ((m ^ 2147418112) | g))) {
                    e = b | j;
                    d = c | r;
                    b = 0;
                    c = 0;
                    if (!(d | e)) {
                      q = 2147450880;
                      break a;
                    }
                    q = q | 2147418112;
                    break a;
                  }
                  if (!(b | j | (c | r))) {
                    b = 0;
                    c = 0;
                    break a;
                  }
                  if (!(e | f | (g | m))) {
                    b = 0;
                    c = 0;
                    break a;
                  }
                  if (((r | 0) == 65535) | (r >>> 0 < 65535)) {
                    j = !(d | k);
                    i = S(j ? c : k);
                    j =
                      (((i | 0) == 32 ? (S(j ? b : d) + 32) | 0 : i) +
                        (j ? 64 : 0)) |
                      0;
                    za((l + 80) | 0, b, c, d, k, (j - 15) | 0);
                    s = (16 - j) | 0;
                    d = J[(l + 88) >> 2];
                    u = J[(l + 92) >> 2];
                    c = J[(l + 84) >> 2];
                    b = J[(l + 80) >> 2];
                  }
                  if (m >>> 0 > 65535) {
                    break b;
                  }
                  i = !(h | n);
                  e = S(i ? g : n);
                  i =
                    (((e | 0) == 32 ? (S(i ? f : h) + 32) | 0 : e) +
                      (i ? 64 : 0)) |
                    0;
                  za((l - -64) | 0, f, g, h, n, (i - 15) | 0);
                  s = (((s - i) | 0) + 16) | 0;
                  h = J[(l + 72) >> 2];
                  n = J[(l + 76) >> 2];
                  f = J[(l + 64) >> 2];
                  g = J[(l + 68) >> 2];
                }
                s = (((((p + w) | 0) + s) | 0) - 16383) | 0;
                p = h << 15;
                k = 0;
                x = (n << 15) | (h >>> 17) | -2147483648;
                B = c;
                h = Pg(x, k, c, 0);
                c = ea;
                m = f << 15;
                y = (g << 15) | (f >>> 17);
                r = 0;
                v = u | 65536;
                n = t;
                i = Pg(y, r, v, n);
                e = (i + h) | 0;
                f = (ea + c) | 0;
                f = e >>> 0 < i >>> 0 ? (f + 1) | 0 : f;
                h =
                  (((c | 0) == (f | 0)) & (e >>> 0 < h >>> 0)) |
                  (c >>> 0 > f >>> 0);
                z = p | (g >>> 17);
                p = d;
                d = Pg(z, 0, d, 0);
                c = (d + e) | 0;
                j = (ea + f) | 0;
                j = c >>> 0 < d >>> 0 ? (j + 1) | 0 : j;
                d =
                  (((f | 0) == (j | 0)) & (c >>> 0 < e >>> 0)) |
                  (f >>> 0 > j >>> 0);
                e = d;
                d = (d + h) | 0;
                k = e >>> 0 > d >>> 0 ? 1 : k;
                e = d;
                d = Pg(x, r, v, n);
                e = (e + d) | 0;
                i = (ea + k) | 0;
                i = d >>> 0 > e >>> 0 ? (i + 1) | 0 : i;
                u = e;
                f = c;
                h = j;
                A = m & -32768;
                c = Pg(A, 0, p, o);
                k = ea;
                e = Pg(B, r, y, r);
                g = (e + c) | 0;
                j = (ea + k) | 0;
                j = e >>> 0 > g >>> 0 ? (j + 1) | 0 : j;
                m =
                  (((k | 0) == (j | 0)) & (c >>> 0 > g >>> 0)) |
                  (j >>> 0 < k >>> 0);
                e = j;
                c = g;
                w = b;
                b = Pg(z, o, b, 0);
                g = (c + b) | 0;
                j = (ea + j) | 0;
                k = 0;
                j = b >>> 0 > g >>> 0 ? (j + 1) | 0 : j;
                t = j;
                b =
                  (((j | 0) == (e | 0)) & (c >>> 0 > g >>> 0)) |
                  (e >>> 0 > j >>> 0);
                c = b;
                b = (b + m) | 0;
                j = ((c >>> 0 > b >>> 0 ? 1 : k) + h) | 0;
                e = (b + f) | 0;
                j = e >>> 0 < b >>> 0 ? (j + 1) | 0 : j;
                d = j;
                b =
                  (((j | 0) == (h | 0)) & (e >>> 0 < f >>> 0)) |
                  (h >>> 0 > j >>> 0);
                j = i;
                c = b;
                b = (b + u) | 0;
                j = c >>> 0 > b >>> 0 ? (j + 1) | 0 : j;
                k = b;
                h = j;
                f = Pg(z, o, v, n);
                j = ea;
                c = Pg(x, r, p, o);
                b = (c + f) | 0;
                i = (ea + j) | 0;
                i = b >>> 0 < c >>> 0 ? (i + 1) | 0 : i;
                c = i;
                j =
                  (((((j | 0) == (c | 0)) & (b >>> 0 < f >>> 0)) |
                    (c >>> 0 < j >>> 0)) +
                    h) |
                  0;
                f = c;
                k = (f + k) | 0;
                m = k;
                i = f >>> 0 > k >>> 0 ? (j + 1) | 0 : j;
                k = e;
                j = b;
                b = 0;
                e = (b + e) | 0;
                f = (d + j) | 0;
                f = b >>> 0 > e >>> 0 ? (f + 1) | 0 : f;
                h = f;
                b =
                  (((f | 0) == (d | 0)) & (e >>> 0 < k >>> 0)) |
                  (d >>> 0 > f >>> 0);
                c = b;
                b = (b + m) | 0;
                i = c >>> 0 > b >>> 0 ? (i + 1) | 0 : i;
                C = b;
                n = Pg(v, n, A, o);
                v = ea;
                b = Pg(y, r, p, o);
                m = (b + n) | 0;
                j = (ea + v) | 0;
                j = b >>> 0 > m >>> 0 ? (j + 1) | 0 : j;
                b = Pg(w, o, x, r);
                p = (b + m) | 0;
                c = j;
                f = (j + ea) | 0;
                f = b >>> 0 > p >>> 0 ? (f + 1) | 0 : f;
                d = Pg(z, o, B, r);
                b = (d + p) | 0;
                k = (ea + f) | 0;
                k = b >>> 0 < d >>> 0 ? (k + 1) | 0 : k;
                d = 0;
                u =
                  (((f | 0) == (k | 0)) & (b >>> 0 < p >>> 0)) |
                  (f >>> 0 > k >>> 0);
                n =
                  (((j | 0) == (v | 0)) & (m >>> 0 < n >>> 0)) |
                  (j >>> 0 < v >>> 0);
                c =
                  (((c | 0) == (f | 0)) & (m >>> 0 > p >>> 0)) |
                  (c >>> 0 > f >>> 0);
                c = (c + n) | 0;
                f = (c + u) | 0;
                j = ((d | f) + h) | 0;
                c = (k + e) | 0;
                d = c;
                j = c >>> 0 < k >>> 0 ? (j + 1) | 0 : j;
                p = j;
                c =
                  (((h | 0) == (j | 0)) & (c >>> 0 < e >>> 0)) |
                  (h >>> 0 > j >>> 0);
                j = i;
                e = c;
                c = (c + C) | 0;
                j = e >>> 0 > c >>> 0 ? (j + 1) | 0 : j;
                u = c;
                c = j;
                n = Pg(B, r, A, o);
                m = ea;
                e = Pg(w, o, y, r);
                f = (e + n) | 0;
                i = (ea + m) | 0;
                h = 0;
                i = e >>> 0 > f >>> 0 ? (i + 1) | 0 : i;
                e = i;
                j =
                  (((m | 0) == (e | 0)) & (f >>> 0 < n >>> 0)) |
                  (e >>> 0 < m >>> 0);
                i = (e + g) | 0;
                j = ((h | j) + t) | 0;
                j = i >>> 0 < e >>> 0 ? (j + 1) | 0 : j;
                t =
                  (((t | 0) == (j | 0)) & (g >>> 0 > i >>> 0)) |
                  (j >>> 0 < t >>> 0);
                g = j;
                j = b;
                b = 0;
                h = (b + i) | 0;
                k = (g + j) | 0;
                k = b >>> 0 > h >>> 0 ? (k + 1) | 0 : k;
                n = k;
                b =
                  (((g | 0) == (k | 0)) & (h >>> 0 < i >>> 0)) |
                  (k >>> 0 < g >>> 0);
                i = 0;
                e = b;
                b = (b + t) | 0;
                j = ((e >>> 0 > b >>> 0 ? 1 : i) + p) | 0;
                g = (b + d) | 0;
                j = g >>> 0 < b >>> 0 ? (j + 1) | 0 : j;
                t = j;
                b =
                  (((p | 0) == (j | 0)) & (d >>> 0 > g >>> 0)) |
                  (j >>> 0 < p >>> 0);
                d = b;
                b = (b + u) | 0;
                k = d >>> 0 > b >>> 0 ? (c + 1) | 0 : c;
                p = b;
                i = j;
                d = n;
                e = 0;
                c = Pg(w, o, A, o);
                b = (e + c) | 0;
                j = (ea + f) | 0;
                j = b >>> 0 < c >>> 0 ? (j + 1) | 0 : j;
                c = j;
                e =
                  (((f | 0) == (j | 0)) & (b >>> 0 < e >>> 0)) |
                  (f >>> 0 > j >>> 0);
                j = d;
                d = (e + h) | 0;
                j = d >>> 0 < e >>> 0 ? (j + 1) | 0 : j;
                e = j;
                f =
                  (((n | 0) == (j | 0)) & (d >>> 0 < h >>> 0)) |
                  (j >>> 0 < n >>> 0);
                h = (f + g) | 0;
                i = f >>> 0 > h >>> 0 ? (i + 1) | 0 : i;
                j = k;
                f =
                  (((i | 0) == (t | 0)) & (g >>> 0 > h >>> 0)) |
                  (i >>> 0 < t >>> 0);
                g = f;
                f = (f + p) | 0;
                j = g >>> 0 > f >>> 0 ? (j + 1) | 0 : j;
                g = j;
                c: {
                  if (j & 65536) {
                    s = (s + 1) | 0;
                    break c;
                  }
                  t = (c >>> 31) | 0;
                  k = (g << 1) | (f >>> 31);
                  f = (f << 1) | (i >>> 31);
                  g = k;
                  k = (i << 1) | (h >>> 31);
                  h = (h << 1) | (e >>> 31);
                  j = 0;
                  i = j | k;
                  k = (c << 1) | (b >>> 31);
                  b = b << 1;
                  c = k;
                  k = j;
                  j = (e << 1) | (d >>> 31);
                  d = (d << 1) | t;
                  e = j | k;
                }
                if ((s | 0) >= 32767) {
                  q = q | 2147418112;
                  b = 0;
                  c = 0;
                  break a;
                }
                d: {
                  if ((s | 0) <= 0) {
                    k = (1 - s) | 0;
                    if (k >>> 0 <= 127) {
                      j = (s + 127) | 0;
                      za((l + 48) | 0, b, c, d, e, j);
                      za((l + 32) | 0, h, i, f, g, j);
                      _a((l + 16) | 0, b, c, d, e, k);
                      _a(l, h, i, f, g, k);
                      b =
                        J[(l + 32) >> 2] |
                        J[(l + 16) >> 2] |
                        ((J[(l + 48) >> 2] |
                          J[(l + 56) >> 2] |
                          (J[(l + 52) >> 2] | J[(l + 60) >> 2])) !=
                          0);
                      c = J[(l + 36) >> 2] | J[(l + 20) >> 2];
                      d = J[(l + 40) >> 2] | J[(l + 24) >> 2];
                      e = J[(l + 44) >> 2] | J[(l + 28) >> 2];
                      h = J[l >> 2];
                      i = J[(l + 4) >> 2];
                      g = J[(l + 8) >> 2];
                      f = J[(l + 12) >> 2];
                      break d;
                    }
                    b = 0;
                    c = 0;
                    break a;
                  }
                  j = g & 65535;
                  g = f;
                  f = (s << 16) | j;
                }
                o = g | o;
                q = f | q;
                if (
                  !(!d & ((e | 0) == -2147483648)
                    ? !(b | c)
                    : ((e | 0) > 0) | ((e | 0) >= 0))
                ) {
                  j = i;
                  b = (h + 1) | 0;
                  j = b ? j : (j + 1) | 0;
                  i = q;
                  c = j;
                  d = !(j | b);
                  o = (d + o) | 0;
                  q = d >>> 0 > o >>> 0 ? (i + 1) | 0 : i;
                  break a;
                }
                if (b | d | ((e ^ -2147483648) | c)) {
                  b = h;
                  c = i;
                  break a;
                }
                f = q;
                b = h & 1;
                c = b;
                b = (b + h) | 0;
                k = c >>> 0 > b >>> 0 ? (i + 1) | 0 : i;
                c = k;
                d =
                  (((i | 0) == (c | 0)) & (b >>> 0 < h >>> 0)) |
                  (i >>> 0 > c >>> 0);
                o = (d + o) | 0;
                q = d >>> 0 > o >>> 0 ? (f + 1) | 0 : f;
              }
              J[a >> 2] = b;
              J[(a + 4) >> 2] = c;
              J[(a + 8) >> 2] = o;
              J[(a + 12) >> 2] = q;
              da = (l + 96) | 0;
            }
            function Tf(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0,
                u = 0,
                v = 0,
                w = 0,
                x = 0,
                y = 0,
                z = 0,
                A = 0,
                B = 0;
              a = (da - 176) | 0;
              da = a;
              i = (a + 172) | 0;
              m = J[(d + 28) >> 2];
              J[i >> 2] = m;
              if ((m | 0) != 16608) {
                J[(m + 4) >> 2] = J[(m + 4) >> 2] + 1;
              }
              q = sa(i, 16792);
              i = (K[(f + 11) | 0] >>> 7) | 0;
              if (i ? J[(f + 4) >> 2] : K[(f + 11) | 0] & 127) {
                h =
                  K[(i ? J[f >> 2] : f) | 0] ==
                  (fa[J[(J[q >> 2] + 28) >> 2]](q, 45) & 255);
              }
              l = (a + 152) | 0;
              J[(l + 8) >> 2] = 0;
              J[l >> 2] = 0;
              J[(l + 4) >> 2] = 0;
              n = (a + 140) | 0;
              J[(n + 8) >> 2] = 0;
              J[n >> 2] = 0;
              J[(n + 4) >> 2] = 0;
              j = (a + 128) | 0;
              J[(j + 8) >> 2] = 0;
              J[j >> 2] = 0;
              J[(j + 4) >> 2] = 0;
              g = (a + 172) | 0;
              p = (a + 168) | 0;
              s = (a + 167) | 0;
              m = (a + 166) | 0;
              i = (a + 124) | 0;
              r = (da - 16) | 0;
              da = r;
              a: {
                if (c) {
                  k = sa(g, 16528);
                  break a;
                }
                k = sa(g, 16520);
              }
              b: {
                if (h) {
                  g = (r + 4) | 0;
                  fa[J[(J[k >> 2] + 44) >> 2]](g, k);
                  c = J[(r + 4) >> 2];
                  H[p | 0] = c;
                  H[(p + 1) | 0] = c >>> 8;
                  H[(p + 2) | 0] = c >>> 16;
                  H[(p + 3) | 0] = c >>> 24;
                  fa[J[(J[k >> 2] + 32) >> 2]](g, k);
                  break b;
                }
                g = (r + 4) | 0;
                fa[J[(J[k >> 2] + 40) >> 2]](g, k);
                c = J[(r + 4) >> 2];
                H[p | 0] = c;
                H[(p + 1) | 0] = c >>> 8;
                H[(p + 2) | 0] = c >>> 16;
                H[(p + 3) | 0] = c >>> 24;
                fa[J[(J[k >> 2] + 28) >> 2]](g, k);
              }
              sb(j, g);
              ja(g);
              H[s | 0] = fa[J[(J[k >> 2] + 12) >> 2]](k);
              H[m | 0] = fa[J[(J[k >> 2] + 16) >> 2]](k);
              c = (r + 4) | 0;
              fa[J[(J[k >> 2] + 20) >> 2]](c, k);
              sb(l, c);
              ja(c);
              fa[J[(J[k >> 2] + 24) >> 2]](c, k);
              sb(n, c);
              ja(c);
              J[i >> 2] = fa[J[(J[k >> 2] + 36) >> 2]](k);
              da = (r + 16) | 0;
              J[(a + 16) >> 2] = 52;
              J[(a + 8) >> 2] = 0;
              J[(a + 12) >> 2] = J[(a + 16) >> 2];
              c = (a + 16) | 0;
              c: {
                m =
                  (K[(f + 11) | 0] >>> 7) | 0
                    ? J[(f + 4) >> 2]
                    : K[(f + 11) | 0] & 127;
                d: {
                  if ((m | 0) > J[(a + 124) >> 2]) {
                    i = J[(a + 124) >> 2];
                    i =
                      (((i +
                        ((((((m - i) << 1) +
                          ((K[(j + 11) | 0] >>> 7) | 0
                            ? J[(j + 4) >> 2]
                            : K[(j + 11) | 0] & 127)) |
                          0) +
                          ((K[(n + 11) | 0] >>> 7) | 0
                            ? J[(n + 4) >> 2]
                            : K[(n + 11) | 0] & 127)) |
                          0)) |
                        0) +
                        1) |
                      0;
                    break d;
                  }
                  i =
                    (((J[(a + 124) >> 2] +
                      ((((K[(j + 11) | 0] >>> 7) | 0
                        ? J[(j + 4) >> 2]
                        : K[(j + 11) | 0] & 127) +
                        ((K[(n + 11) | 0] >>> 7) | 0
                          ? J[(n + 4) >> 2]
                          : K[(n + 11) | 0] & 127)) |
                        0)) |
                      0) +
                      2) |
                    0;
                }
                if (i >>> 0 < 101) {
                  break c;
                }
                c = La(i);
                i = J[(a + 8) >> 2];
                J[(a + 8) >> 2] = c;
                if (i) {
                  fa[J[(a + 12) >> 2]](i);
                }
                c = J[(a + 8) >> 2];
                if (c) {
                  break c;
                }
                Ta();
                C();
              }
              w = (a + 4) | 0;
              y = J[(d + 4) >> 2];
              m = (K[(f + 11) | 0] >>> 7) | 0;
              i = m ? J[f >> 2] : f;
              t = i;
              z = ((m ? J[(f + 4) >> 2] : K[(f + 11) | 0] & 127) + i) | 0;
              s = h;
              A = (a + 168) | 0;
              B = H[(a + 167) | 0];
              k = H[(a + 166) | 0];
              m = J[(a + 124) >> 2];
              v = (da - 16) | 0;
              da = v;
              J[a >> 2] = c;
              p = y & 512;
              while (1) {
                if ((x | 0) == 4) {
                  if (
                    ((K[(j + 11) | 0] >>> 7) | 0
                      ? J[(j + 4) >> 2]
                      : K[(j + 11) | 0] & 127) >>>
                      0 >
                    1
                  ) {
                    J[(v + 12) >> 2] = yb(j);
                    J[a >> 2] = Wc(Zc((v + 12) | 0, 1), nd(j), J[a >> 2]);
                  }
                  f = y & 176;
                  if ((f | 0) != 16) {
                    J[w >> 2] = (f | 0) == 32 ? J[a >> 2] : c;
                  }
                  da = (v + 16) | 0;
                } else {
                  e: {
                    f: {
                      switch (K[(x + A) | 0]) {
                        case 0:
                          J[w >> 2] = J[a >> 2];
                          break e;
                        case 1:
                          J[w >> 2] = J[a >> 2];
                          h = fa[J[(J[q >> 2] + 28) >> 2]](q, 32) | 0;
                          f = J[a >> 2];
                          J[a >> 2] = f + 1;
                          H[f | 0] = h;
                          break e;
                        case 3:
                          f = (K[(j + 11) | 0] >>> 7) | 0;
                          if (!(f ? J[(j + 4) >> 2] : K[(j + 11) | 0] & 127)) {
                            break e;
                          }
                          h = K[(f ? J[j >> 2] : j) | 0];
                          f = J[a >> 2];
                          J[a >> 2] = f + 1;
                          H[f | 0] = h;
                          break e;
                        case 2:
                          if (
                            !p |
                            !((K[(n + 11) | 0] >>> 7) | 0
                              ? J[(n + 4) >> 2]
                              : K[(n + 11) | 0] & 127)
                          ) {
                            break e;
                          }
                          J[a >> 2] = Wc(yb(n), nd(n), J[a >> 2]);
                          break e;
                        case 4:
                          break f;
                        default:
                          break e;
                      }
                    }
                    i = J[a >> 2];
                    t = (s + t) | 0;
                    o = t;
                    while (1) {
                      g: {
                        if (o >>> 0 >= z >>> 0) {
                          break g;
                        }
                        f = H[o | 0];
                        if (f >>> 0 < 128) {
                          f = (J[(J[(q + 8) >> 2] + (f << 2)) >> 2] & 64) != 0;
                        } else {
                          f = 0;
                        }
                        if (!f) {
                          break g;
                        }
                        o = (o + 1) | 0;
                        continue;
                      }
                      break;
                    }
                    f = m;
                    if ((f | 0) > 0) {
                      while (1) {
                        if (!(!f | (o >>> 0 <= t >>> 0))) {
                          f = (f - 1) | 0;
                          o = (o - 1) | 0;
                          g = K[o | 0];
                          h = J[a >> 2];
                          J[a >> 2] = h + 1;
                          H[h | 0] = g;
                          continue;
                        }
                        break;
                      }
                      if (f) {
                        h = fa[J[(J[q >> 2] + 28) >> 2]](q, 48) | 0;
                      } else {
                        h = 0;
                      }
                      while (1) {
                        g = J[a >> 2];
                        J[a >> 2] = g + 1;
                        if ((f | 0) > 0) {
                          H[g | 0] = h;
                          f = (f - 1) | 0;
                          continue;
                        }
                        break;
                      }
                      H[g | 0] = B;
                    }
                    h: {
                      if ((o | 0) == (t | 0)) {
                        h = fa[J[(J[q >> 2] + 28) >> 2]](q, 48) | 0;
                        f = J[a >> 2];
                        J[a >> 2] = f + 1;
                        H[f | 0] = h;
                        break h;
                      }
                      f = (K[(l + 11) | 0] >>> 7) | 0;
                      h = (f ? J[(l + 4) >> 2] : K[(l + 11) | 0] & 127)
                        ? H[(f ? J[l >> 2] : l) | 0]
                        : -1;
                      f = 0;
                      u = 0;
                      while (1) {
                        if ((o | 0) == (t | 0)) {
                          break h;
                        }
                        i: {
                          if ((f | 0) != (h | 0)) {
                            g = f;
                            break i;
                          }
                          h = J[a >> 2];
                          J[a >> 2] = h + 1;
                          H[h | 0] = k;
                          g = 0;
                          u = (u + 1) | 0;
                          if (
                            u >>> 0 >=
                            ((K[(l + 11) | 0] >>> 7) | 0
                              ? J[(l + 4) >> 2]
                              : K[(l + 11) | 0] & 127) >>>
                              0
                          ) {
                            h = f;
                            break i;
                          }
                          if (
                            K[
                              (((K[(l + 11) | 0] >>> 7) | 0 ? J[l >> 2] : l) +
                                u) |
                                0
                            ] == 127
                          ) {
                            h = -1;
                            break i;
                          }
                          h =
                            H[
                              (((K[(l + 11) | 0] >>> 7) | 0 ? J[l >> 2] : l) +
                                u) |
                                0
                            ];
                        }
                        o = (o - 1) | 0;
                        r = K[o | 0];
                        f = J[a >> 2];
                        J[a >> 2] = f + 1;
                        H[f | 0] = r;
                        f = (g + 1) | 0;
                        continue;
                      }
                    }
                    f = J[a >> 2];
                    g = (da - 16) | 0;
                    da = g;
                    J[(g + 12) >> 2] = i;
                    j: {
                      if ((f | 0) == (i | 0)) {
                        break j;
                      }
                      while (1) {
                        f = (f - 1) | 0;
                        J[(g + 8) >> 2] = f;
                        if (f >>> 0 <= i >>> 0) {
                          break j;
                        }
                        f = J[(g + 12) >> 2];
                        h = K[f | 0];
                        i = f;
                        f = J[(g + 8) >> 2];
                        H[i | 0] = K[f | 0];
                        H[f | 0] = h;
                        i = (J[(g + 12) >> 2] + 1) | 0;
                        J[(g + 12) >> 2] = i;
                        f = J[(g + 8) >> 2];
                        continue;
                      }
                    }
                    da = (g + 16) | 0;
                  }
                  x = (x + 1) | 0;
                  continue;
                }
                break;
              }
              g = J[(a + 4) >> 2];
              s = J[a >> 2];
              f = e;
              e = 0;
              m = (da - 16) | 0;
              da = m;
              k: {
                if (!b) {
                  break k;
                }
                i = J[(d + 12) >> 2];
                h = (g - c) | 0;
                if ((h | 0) > 0) {
                  if ((fa[J[(J[b >> 2] + 48) >> 2]](b, c, h) | 0) != (h | 0)) {
                    break k;
                  }
                }
                c = (s - c) | 0;
                if ((c | 0) < (i | 0)) {
                  h = (i - c) | 0;
                  f = ld((m + 4) | 0, h, f);
                  l: {
                    if ((K[(f + 11) | 0] >>> 7) | 0) {
                      c = J[f >> 2];
                      break l;
                    }
                    c = f;
                  }
                  c = fa[J[(J[b >> 2] + 48) >> 2]](b, c, h) | 0;
                  ja(f);
                  if ((c | 0) != (h | 0)) {
                    break k;
                  }
                }
                c = (s - g) | 0;
                if ((c | 0) > 0) {
                  if ((fa[J[(J[b >> 2] + 48) >> 2]](b, g, c) | 0) != (c | 0)) {
                    break k;
                  }
                }
                J[(d + 12) >> 2] = 0;
                e = b;
              }
              da = (m + 16) | 0;
              b = J[(a + 8) >> 2];
              J[(a + 8) >> 2] = 0;
              if (b) {
                fa[J[(a + 12) >> 2]](b);
              }
              ja(j);
              ja(n);
              ja(l);
              wa((a + 172) | 0);
              da = (a + 176) | 0;
              return e | 0;
            }
            function Yf(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              var i = 0,
                j = 0;
              h = (da - 48) | 0;
              da = h;
              J[(h + 44) >> 2] = b;
              J[e >> 2] = 0;
              i = J[(d + 28) >> 2];
              J[h >> 2] = i;
              if ((i | 0) != 16608) {
                J[(i + 4) >> 2] = J[(i + 4) >> 2] + 1;
              }
              i = sa(h, 16784);
              wa(h);
              a: {
                b: {
                  c: {
                    d: {
                      switch ((g - 65) | 0) {
                        case 0:
                        case 32:
                          dd(a, (f + 24) | 0, (h + 44) | 0, c, e, i);
                          break b;
                        case 1:
                        case 33:
                        case 39:
                          cd(a, (f + 16) | 0, (h + 44) | 0, c, e, i);
                          break b;
                        case 34:
                          b =
                            fa[J[(J[(a + 8) >> 2] + 12) >> 2]]((a + 8) | 0) | 0;
                          g = a;
                          j = J[(h + 44) >> 2];
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            a = J[b >> 2];
                          } else {
                            a = b;
                          }
                          i = a;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            a = J[b >> 2];
                          } else {
                            a = b;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            b = J[(b + 4) >> 2];
                          } else {
                            b = K[(b + 11) | 0] & 127;
                          }
                          J[(h + 44) >> 2] = Ua(
                            g,
                            j,
                            c,
                            d,
                            e,
                            f,
                            i,
                            (a + (b << 2)) | 0,
                          );
                          break b;
                        case 35:
                        case 36:
                          a = Qa((h + 44) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          e: {
                            if (!(((a - 1) >>> 0 > 30) | (b & 4))) {
                              J[(f + 12) >> 2] = a;
                              break e;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 3:
                          g = J[1939];
                          J[(h + 24) >> 2] = J[1938];
                          J[(h + 28) >> 2] = g;
                          g = J[1937];
                          J[(h + 16) >> 2] = J[1936];
                          J[(h + 20) >> 2] = g;
                          g = J[1935];
                          J[(h + 8) >> 2] = J[1934];
                          J[(h + 12) >> 2] = g;
                          g = J[1933];
                          J[h >> 2] = J[1932];
                          J[(h + 4) >> 2] = g;
                          J[(h + 44) >> 2] = Ua(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 32) | 0,
                          );
                          break b;
                        case 5:
                          g = J[1947];
                          J[(h + 24) >> 2] = J[1946];
                          J[(h + 28) >> 2] = g;
                          g = J[1945];
                          J[(h + 16) >> 2] = J[1944];
                          J[(h + 20) >> 2] = g;
                          g = J[1943];
                          J[(h + 8) >> 2] = J[1942];
                          J[(h + 12) >> 2] = g;
                          g = J[1941];
                          J[h >> 2] = J[1940];
                          J[(h + 4) >> 2] = g;
                          J[(h + 44) >> 2] = Ua(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 32) | 0,
                          );
                          break b;
                        case 7:
                          a = Qa((h + 44) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          f: {
                            if (!(((a | 0) > 23) | (b & 4))) {
                              J[(f + 8) >> 2] = a;
                              break f;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 8:
                          a = Qa((h + 44) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          g: {
                            if (!(((a - 1) >>> 0 > 11) | (b & 4))) {
                              J[(f + 8) >> 2] = a;
                              break g;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 41:
                          a = Qa((h + 44) | 0, c, e, i, 3);
                          b = J[e >> 2];
                          h: {
                            if (!(((a | 0) > 365) | (b & 4))) {
                              J[(f + 28) >> 2] = a;
                              break h;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 44:
                          b = (Qa((h + 44) | 0, c, e, i, 2) - 1) | 0;
                          a = J[e >> 2];
                          i: {
                            if (!((b >>> 0 > 11) | (a & 4))) {
                              J[(f + 16) >> 2] = b;
                              break i;
                            }
                            J[e >> 2] = a | 4;
                          }
                          break b;
                        case 12:
                          a = Qa((h + 44) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          j: {
                            if (!(((a | 0) > 59) | (b & 4))) {
                              J[(f + 4) >> 2] = a;
                              break j;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 45:
                        case 51:
                          a = (h + 44) | 0;
                          b = (da - 16) | 0;
                          da = b;
                          J[(b + 12) >> 2] = c;
                          while (1) {
                            k: {
                              if (ua(a, (b + 12) | 0)) {
                                break k;
                              }
                              c = J[a >> 2];
                              d = J[(c + 12) >> 2];
                              l: {
                                if ((d | 0) == J[(c + 16) >> 2]) {
                                  c = fa[J[(J[c >> 2] + 36) >> 2]](c) | 0;
                                  break l;
                                }
                                c = J[d >> 2];
                              }
                              if (
                                !(fa[J[(J[i >> 2] + 12) >> 2]](i, 1, c) | 0)
                              ) {
                                break k;
                              }
                              Ga(a);
                              continue;
                            }
                            break;
                          }
                          if (ua(a, (b + 12) | 0)) {
                            J[e >> 2] = J[e >> 2] | 2;
                          }
                          da = (b + 16) | 0;
                          break b;
                        case 47:
                          g = (h + 44) | 0;
                          b =
                            fa[J[(J[(a + 8) >> 2] + 8) >> 2]]((a + 8) | 0) | 0;
                          m: {
                            if ((K[(b + 11) | 0] >>> 7) | 0) {
                              a = J[(b + 4) >> 2];
                              break m;
                            }
                            a = K[(b + 11) | 0] & 127;
                          }
                          if ((K[(b + 23) | 0] >>> 7) | 0) {
                            d = J[(b + 16) >> 2];
                          } else {
                            d = K[(b + 23) | 0] & 127;
                          }
                          n: {
                            if ((a | 0) == ((0 - d) | 0)) {
                              J[e >> 2] = J[e >> 2] | 4;
                              break n;
                            }
                            c = zb(g, c, b, (b + 24) | 0, i, e, 0);
                            a = J[(f + 8) >> 2];
                            if (!(((c | 0) != (b | 0)) | ((a | 0) != 12))) {
                              J[(f + 8) >> 2] = 0;
                              break n;
                            }
                            if (!((((c - b) | 0) != 12) | ((a | 0) > 11))) {
                              J[(f + 8) >> 2] = a + 12;
                            }
                          }
                          break b;
                        case 49:
                          y(h, 7792, 44);
                          J[(h + 44) >> 2] = Ua(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 44) | 0,
                          );
                          break b;
                        case 17:
                          J[(h + 16) >> 2] = J[1964];
                          g = J[1963];
                          J[(h + 8) >> 2] = J[1962];
                          J[(h + 12) >> 2] = g;
                          g = J[1961];
                          J[h >> 2] = J[1960];
                          J[(h + 4) >> 2] = g;
                          J[(h + 44) >> 2] = Ua(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 20) | 0,
                          );
                          break b;
                        case 18:
                          a = Qa((h + 44) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          o: {
                            if (!(((a | 0) > 60) | (b & 4))) {
                              J[f >> 2] = a;
                              break o;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 19:
                          g = J[1975];
                          J[(h + 24) >> 2] = J[1974];
                          J[(h + 28) >> 2] = g;
                          g = J[1973];
                          J[(h + 16) >> 2] = J[1972];
                          J[(h + 20) >> 2] = g;
                          g = J[1971];
                          J[(h + 8) >> 2] = J[1970];
                          J[(h + 12) >> 2] = g;
                          g = J[1969];
                          J[h >> 2] = J[1968];
                          J[(h + 4) >> 2] = g;
                          J[(h + 44) >> 2] = Ua(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 32) | 0,
                          );
                          break b;
                        case 54:
                          a = Qa((h + 44) | 0, c, e, i, 1);
                          b = J[e >> 2];
                          p: {
                            if (!(((a | 0) > 6) | (b & 4))) {
                              J[(f + 24) >> 2] = a;
                              break p;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 55:
                          a =
                            fa[J[(J[a >> 2] + 20) >> 2]](a, b, c, d, e, f) | 0;
                          break a;
                        case 23:
                          b =
                            fa[J[(J[(a + 8) >> 2] + 24) >> 2]]((a + 8) | 0) | 0;
                          g = a;
                          j = J[(h + 44) >> 2];
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            a = J[b >> 2];
                          } else {
                            a = b;
                          }
                          i = a;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            a = J[b >> 2];
                          } else {
                            a = b;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            b = J[(b + 4) >> 2];
                          } else {
                            b = K[(b + 11) | 0] & 127;
                          }
                          J[(h + 44) >> 2] = Ua(
                            g,
                            j,
                            c,
                            d,
                            e,
                            f,
                            i,
                            (a + (b << 2)) | 0,
                          );
                          break b;
                        case 56:
                          bd((f + 20) | 0, (h + 44) | 0, c, e, i);
                          break b;
                        case 24:
                          a = Qa((h + 44) | 0, c, e, i, 4);
                          if (!(K[e | 0] & 4)) {
                            J[(f + 20) >> 2] = a - 1900;
                          }
                          break b;
                        default:
                          if ((g | 0) == 37) {
                            break c;
                          }
                          break;
                        case 2:
                        case 4:
                        case 6:
                        case 9:
                        case 10:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 20:
                        case 21:
                        case 22:
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                        case 37:
                        case 38:
                        case 40:
                        case 42:
                        case 43:
                        case 46:
                        case 48:
                        case 50:
                        case 52:
                        case 53:
                          break d;
                      }
                    }
                    J[e >> 2] = J[e >> 2] | 4;
                    break b;
                  }
                  a = (da - 16) | 0;
                  da = a;
                  J[(a + 12) >> 2] = c;
                  c = (h + 44) | 0;
                  f = (a + 12) | 0;
                  b = 6;
                  q: {
                    r: {
                      if (ua(c, f)) {
                        break r;
                      }
                      b = J[c >> 2];
                      d = J[(b + 12) >> 2];
                      s: {
                        if ((d | 0) == J[(b + 16) >> 2]) {
                          d = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                          break s;
                        }
                        d = J[d >> 2];
                      }
                      b = 4;
                      if ((fa[J[(J[i >> 2] + 52) >> 2]](i, d, 0) | 0) != 37) {
                        break r;
                      }
                      if (!ua(Ga(c), f)) {
                        break q;
                      }
                      b = 2;
                    }
                    J[e >> 2] = b | J[e >> 2];
                  }
                  da = (a + 16) | 0;
                }
                a = J[(h + 44) >> 2];
              }
              da = (h + 48) | 0;
              return a | 0;
            }
            function Rf(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0,
                u = 0,
                v = 0,
                w = 0,
                x = 0,
                y = 0,
                z = 0,
                A = 0,
                B = 0,
                D = 0;
              a = (da - 480) | 0;
              da = a;
              i = (a + 476) | 0;
              l = J[(d + 28) >> 2];
              J[i >> 2] = l;
              if ((l | 0) != 16608) {
                J[(l + 4) >> 2] = J[(l + 4) >> 2] + 1;
              }
              o = sa(i, 16784);
              g = (K[(f + 11) | 0] >>> 7) | 0;
              if (g ? J[(f + 4) >> 2] : K[(f + 11) | 0] & 127) {
                h =
                  J[(g ? J[f >> 2] : f) >> 2] ==
                  (fa[J[(J[o >> 2] + 44) >> 2]](o, 45) | 0);
              }
              m = (a + 452) | 0;
              J[(m + 8) >> 2] = 0;
              J[m >> 2] = 0;
              J[(m + 4) >> 2] = 0;
              l = (a + 440) | 0;
              J[(l + 8) >> 2] = 0;
              J[l >> 2] = 0;
              J[(l + 4) >> 2] = 0;
              i = (a + 428) | 0;
              J[(i + 8) >> 2] = 0;
              J[i >> 2] = 0;
              J[(i + 4) >> 2] = 0;
              k = (a + 476) | 0;
              g = (a + 472) | 0;
              q = (a + 468) | 0;
              r = (a + 464) | 0;
              p = (a + 424) | 0;
              n = (da - 16) | 0;
              da = n;
              a: {
                if (c) {
                  c = sa(k, 16544);
                  break a;
                }
                c = sa(k, 16536);
              }
              b: {
                if (h) {
                  k = (n + 4) | 0;
                  fa[J[(J[c >> 2] + 44) >> 2]](k, c);
                  j = J[(n + 4) >> 2];
                  H[g | 0] = j;
                  H[(g + 1) | 0] = j >>> 8;
                  H[(g + 2) | 0] = j >>> 16;
                  H[(g + 3) | 0] = j >>> 24;
                  fa[J[(J[c >> 2] + 32) >> 2]](k, c);
                  break b;
                }
                k = (n + 4) | 0;
                fa[J[(J[c >> 2] + 40) >> 2]](k, c);
                j = J[(n + 4) >> 2];
                H[g | 0] = j;
                H[(g + 1) | 0] = j >>> 8;
                H[(g + 2) | 0] = j >>> 16;
                H[(g + 3) | 0] = j >>> 24;
                fa[J[(J[c >> 2] + 28) >> 2]](k, c);
              }
              Yc(i, k);
              ja(k);
              J[q >> 2] = fa[J[(J[c >> 2] + 12) >> 2]](c);
              J[r >> 2] = fa[J[(J[c >> 2] + 16) >> 2]](c);
              g = (n + 4) | 0;
              fa[J[(J[c >> 2] + 20) >> 2]](g, c);
              sb(m, g);
              ja(g);
              fa[J[(J[c >> 2] + 24) >> 2]](g, c);
              Yc(l, g);
              ja(g);
              J[p >> 2] = fa[J[(J[c >> 2] + 36) >> 2]](c);
              da = (n + 16) | 0;
              J[(a + 16) >> 2] = 52;
              J[(a + 8) >> 2] = 0;
              J[(a + 12) >> 2] = J[(a + 16) >> 2];
              c = (a + 16) | 0;
              c: {
                k =
                  (K[(f + 11) | 0] >>> 7) | 0
                    ? J[(f + 4) >> 2]
                    : K[(f + 11) | 0] & 127;
                d: {
                  if ((k | 0) > J[(a + 424) >> 2]) {
                    g = J[(a + 424) >> 2];
                    g =
                      (((g +
                        ((((((k - g) << 1) +
                          ((K[(i + 11) | 0] >>> 7) | 0
                            ? J[(i + 4) >> 2]
                            : K[(i + 11) | 0] & 127)) |
                          0) +
                          ((K[(l + 11) | 0] >>> 7) | 0
                            ? J[(l + 4) >> 2]
                            : K[(l + 11) | 0] & 127)) |
                          0)) |
                        0) +
                        1) |
                      0;
                    break d;
                  }
                  g =
                    (((J[(a + 424) >> 2] +
                      ((((K[(i + 11) | 0] >>> 7) | 0
                        ? J[(i + 4) >> 2]
                        : K[(i + 11) | 0] & 127) +
                        ((K[(l + 11) | 0] >>> 7) | 0
                          ? J[(l + 4) >> 2]
                          : K[(l + 11) | 0] & 127)) |
                        0)) |
                      0) +
                      2) |
                    0;
                }
                if (g >>> 0 < 101) {
                  break c;
                }
                g = La(g << 2);
                c = J[(a + 8) >> 2];
                J[(a + 8) >> 2] = g;
                if (c) {
                  fa[J[(a + 12) >> 2]](c);
                }
                c = J[(a + 8) >> 2];
                if (c) {
                  break c;
                }
                Ta();
                C();
              }
              t = (a + 4) | 0;
              u = J[(d + 4) >> 2];
              g = (K[(f + 11) | 0] >>> 7) | 0;
              k = g ? J[f >> 2] : f;
              q = k;
              w =
                (k + ((g ? J[(f + 4) >> 2] : K[(f + 11) | 0] & 127) << 2)) | 0;
              x = (a + 472) | 0;
              y = J[(a + 468) >> 2];
              z = J[(a + 464) >> 2];
              n = J[(a + 424) >> 2];
              r = 0;
              s = (da - 16) | 0;
              da = s;
              k = c;
              J[a >> 2] = c;
              A = h ? 4 : 0;
              B = u & 512;
              while (1) {
                if ((r | 0) == 4) {
                  if (
                    ((K[(i + 11) | 0] >>> 7) | 0
                      ? J[(i + 4) >> 2]
                      : K[(i + 11) | 0] & 127) >>>
                      0 >
                    1
                  ) {
                    J[(s + 12) >> 2] = yb(i);
                    J[a >> 2] = Vc(Xc((s + 12) | 0, 1), kd(i), J[a >> 2]);
                  }
                  f = u & 176;
                  if ((f | 0) != 16) {
                    J[t >> 2] = (f | 0) == 32 ? J[a >> 2] : k;
                  }
                  da = (s + 16) | 0;
                } else {
                  e: {
                    f: {
                      switch (K[(r + x) | 0]) {
                        case 0:
                          J[t >> 2] = J[a >> 2];
                          break e;
                        case 1:
                          J[t >> 2] = J[a >> 2];
                          f = fa[J[(J[o >> 2] + 44) >> 2]](o, 32) | 0;
                          h = J[a >> 2];
                          J[a >> 2] = h + 4;
                          J[h >> 2] = f;
                          break e;
                        case 3:
                          f = (K[(i + 11) | 0] >>> 7) | 0;
                          if (!(f ? J[(i + 4) >> 2] : K[(i + 11) | 0] & 127)) {
                            break e;
                          }
                          f = J[(f ? J[i >> 2] : i) >> 2];
                          h = J[a >> 2];
                          J[a >> 2] = h + 4;
                          J[h >> 2] = f;
                          break e;
                        case 2:
                          if (
                            !B |
                            !((K[(l + 11) | 0] >>> 7) | 0
                              ? J[(l + 4) >> 2]
                              : K[(l + 11) | 0] & 127)
                          ) {
                            break e;
                          }
                          J[a >> 2] = Vc(yb(l), kd(l), J[a >> 2]);
                          break e;
                        case 4:
                          break f;
                        default:
                          break e;
                      }
                    }
                    D = J[a >> 2];
                    q = (q + A) | 0;
                    j = q;
                    while (1) {
                      g: {
                        if (j >>> 0 >= w >>> 0) {
                          break g;
                        }
                        if (
                          !(fa[J[(J[o >> 2] + 12) >> 2]](o, 64, J[j >> 2]) | 0)
                        ) {
                          break g;
                        }
                        j = (j + 4) | 0;
                        continue;
                      }
                      break;
                    }
                    if ((n | 0) > 0) {
                      f = J[a >> 2];
                      h = n;
                      while (1) {
                        if (!(!h | (j >>> 0 <= q >>> 0))) {
                          h = (h - 1) | 0;
                          j = (j - 4) | 0;
                          p = J[j >> 2];
                          g = (f + 4) | 0;
                          J[a >> 2] = g;
                          J[f >> 2] = p;
                          f = g;
                          continue;
                        }
                        break;
                      }
                      if (h) {
                        p = fa[J[(J[o >> 2] + 44) >> 2]](o, 48) | 0;
                      } else {
                        p = 0;
                      }
                      f = J[a >> 2];
                      while (1) {
                        if ((h | 0) > 0) {
                          g = (f + 4) | 0;
                          J[a >> 2] = g;
                          J[f >> 2] = p;
                          h = (h - 1) | 0;
                          f = g;
                          continue;
                        }
                        break;
                      }
                      f = J[a >> 2];
                      J[a >> 2] = f + 4;
                      J[f >> 2] = y;
                    }
                    h: {
                      if ((j | 0) == (q | 0)) {
                        f = fa[J[(J[o >> 2] + 44) >> 2]](o, 48) | 0;
                        h = J[a >> 2];
                        J[a >> 2] = h + 4;
                        J[h >> 2] = f;
                        break h;
                      }
                      f = (K[(m + 11) | 0] >>> 7) | 0;
                      g = (f ? J[(m + 4) >> 2] : K[(m + 11) | 0] & 127)
                        ? H[(f ? J[m >> 2] : m) | 0]
                        : -1;
                      h = 0;
                      p = 0;
                      while (1) {
                        if ((j | 0) == (q | 0)) {
                          break h;
                        }
                        i: {
                          if ((g | 0) != (h | 0)) {
                            f = h;
                            break i;
                          }
                          f = J[a >> 2];
                          J[a >> 2] = f + 4;
                          J[f >> 2] = z;
                          f = 0;
                          p = (p + 1) | 0;
                          if (
                            p >>> 0 >=
                            ((K[(m + 11) | 0] >>> 7) | 0
                              ? J[(m + 4) >> 2]
                              : K[(m + 11) | 0] & 127) >>>
                              0
                          ) {
                            g = h;
                            break i;
                          }
                          if (
                            K[
                              (((K[(m + 11) | 0] >>> 7) | 0 ? J[m >> 2] : m) +
                                p) |
                                0
                            ] == 127
                          ) {
                            g = -1;
                            break i;
                          }
                          g =
                            H[
                              (((K[(m + 11) | 0] >>> 7) | 0 ? J[m >> 2] : m) +
                                p) |
                                0
                            ];
                        }
                        j = (j - 4) | 0;
                        h = J[j >> 2];
                        v = J[a >> 2];
                        J[a >> 2] = v + 4;
                        J[v >> 2] = h;
                        h = (f + 1) | 0;
                        continue;
                      }
                    }
                    id(D, J[a >> 2]);
                  }
                  r = (r + 1) | 0;
                  continue;
                }
                break;
              }
              h = J[(a + 4) >> 2];
              g = J[a >> 2];
              f = e;
              e = 0;
              o = (da - 16) | 0;
              da = o;
              j: {
                if (!b) {
                  break j;
                }
                n = J[(d + 12) >> 2];
                k = (h - c) >> 2;
                if ((k | 0) > 0) {
                  if ((fa[J[(J[b >> 2] + 48) >> 2]](b, c, k) | 0) != (k | 0)) {
                    break j;
                  }
                }
                c = (g - c) >> 2;
                if ((c | 0) < (n | 0)) {
                  n = (n - c) | 0;
                  c = jd((o + 4) | 0, n, f);
                  k: {
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      f = J[c >> 2];
                      break k;
                    }
                    f = c;
                  }
                  f = fa[J[(J[b >> 2] + 48) >> 2]](b, f, n) | 0;
                  ja(c);
                  if ((f | 0) != (n | 0)) {
                    break j;
                  }
                }
                c = (g - h) >> 2;
                if ((c | 0) > 0) {
                  if ((fa[J[(J[b >> 2] + 48) >> 2]](b, h, c) | 0) != (c | 0)) {
                    break j;
                  }
                }
                J[(d + 12) >> 2] = 0;
                e = b;
              }
              da = (o + 16) | 0;
              c = e;
              b = J[(a + 8) >> 2];
              J[(a + 8) >> 2] = 0;
              if (b) {
                fa[J[(a + 12) >> 2]](b);
              }
              ja(i);
              ja(l);
              ja(m);
              wa((a + 476) | 0);
              da = (a + 480) | 0;
              return c | 0;
            }
            function cg(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              var i = 0,
                j = 0;
              h = (da - 16) | 0;
              da = h;
              J[(h + 12) >> 2] = b;
              J[e >> 2] = 0;
              i = J[(d + 28) >> 2];
              J[h >> 2] = i;
              if ((i | 0) != 16608) {
                J[(i + 4) >> 2] = J[(i + 4) >> 2] + 1;
              }
              i = sa(h, 16792);
              wa(h);
              a: {
                b: {
                  c: {
                    d: {
                      switch ((g - 65) | 0) {
                        case 0:
                        case 32:
                          gd(a, (f + 24) | 0, (h + 12) | 0, c, e, i);
                          break b;
                        case 1:
                        case 33:
                        case 39:
                          fd(a, (f + 16) | 0, (h + 12) | 0, c, e, i);
                          break b;
                        case 34:
                          b =
                            fa[J[(J[(a + 8) >> 2] + 12) >> 2]]((a + 8) | 0) | 0;
                          g = a;
                          j = J[(h + 12) >> 2];
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            a = J[b >> 2];
                          } else {
                            a = b;
                          }
                          i = a;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            a = J[b >> 2];
                          } else {
                            a = b;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            b = J[(b + 4) >> 2];
                          } else {
                            b = K[(b + 11) | 0] & 127;
                          }
                          J[(h + 12) >> 2] = Va(
                            g,
                            j,
                            c,
                            d,
                            e,
                            f,
                            i,
                            (a + b) | 0,
                          );
                          break b;
                        case 35:
                        case 36:
                          a = Ra((h + 12) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          e: {
                            if (!(((a - 1) >>> 0 > 30) | (b & 4))) {
                              J[(f + 12) >> 2] = a;
                              break e;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 3:
                          J[h >> 2] = 623865125;
                          J[(h + 4) >> 2] = 2032480100;
                          J[(h + 12) >> 2] = Va(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 8) | 0,
                          );
                          break b;
                        case 5:
                          J[h >> 2] = 623728933;
                          J[(h + 4) >> 2] = 1680158061;
                          J[(h + 12) >> 2] = Va(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 8) | 0,
                          );
                          break b;
                        case 7:
                          a = Ra((h + 12) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          f: {
                            if (!(((a | 0) > 23) | (b & 4))) {
                              J[(f + 8) >> 2] = a;
                              break f;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 8:
                          a = Ra((h + 12) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          g: {
                            if (!(((a - 1) >>> 0 > 11) | (b & 4))) {
                              J[(f + 8) >> 2] = a;
                              break g;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 41:
                          a = Ra((h + 12) | 0, c, e, i, 3);
                          b = J[e >> 2];
                          h: {
                            if (!(((a | 0) > 365) | (b & 4))) {
                              J[(f + 28) >> 2] = a;
                              break h;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 44:
                          b = (Ra((h + 12) | 0, c, e, i, 2) - 1) | 0;
                          a = J[e >> 2];
                          i: {
                            if (!((b >>> 0 > 11) | (a & 4))) {
                              J[(f + 16) >> 2] = b;
                              break i;
                            }
                            J[e >> 2] = a | 4;
                          }
                          break b;
                        case 12:
                          a = Ra((h + 12) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          j: {
                            if (!(((a | 0) > 59) | (b & 4))) {
                              J[(f + 4) >> 2] = a;
                              break j;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 45:
                        case 51:
                          a = (h + 12) | 0;
                          b = (da - 16) | 0;
                          da = b;
                          J[(b + 12) >> 2] = c;
                          while (1) {
                            k: {
                              if (qa(a, (b + 12) | 0)) {
                                break k;
                              }
                              c = J[a >> 2];
                              d = J[(c + 12) >> 2];
                              l: {
                                if ((d | 0) == J[(c + 16) >> 2]) {
                                  c = fa[J[(J[c >> 2] + 36) >> 2]](c) | 0;
                                  break l;
                                }
                                c = H[d | 0];
                              }
                              c = (c << 24) >> 24;
                              if (c >>> 0 < 128) {
                                c = J[(J[(i + 8) >> 2] + (c << 2)) >> 2] & 1;
                              } else {
                                c = 0;
                              }
                              if (!c) {
                                break k;
                              }
                              Ba(a);
                              continue;
                            }
                            break;
                          }
                          if (qa(a, (b + 12) | 0)) {
                            J[e >> 2] = J[e >> 2] | 2;
                          }
                          da = (b + 16) | 0;
                          break b;
                        case 47:
                          g = (h + 12) | 0;
                          b =
                            fa[J[(J[(a + 8) >> 2] + 8) >> 2]]((a + 8) | 0) | 0;
                          m: {
                            if ((K[(b + 11) | 0] >>> 7) | 0) {
                              a = J[(b + 4) >> 2];
                              break m;
                            }
                            a = K[(b + 11) | 0] & 127;
                          }
                          if ((K[(b + 23) | 0] >>> 7) | 0) {
                            d = J[(b + 16) >> 2];
                          } else {
                            d = K[(b + 23) | 0] & 127;
                          }
                          n: {
                            if ((a | 0) == ((0 - d) | 0)) {
                              J[e >> 2] = J[e >> 2] | 4;
                              break n;
                            }
                            c = Ab(g, c, b, (b + 24) | 0, i, e, 0);
                            a = J[(f + 8) >> 2];
                            if (!(((c | 0) != (b | 0)) | ((a | 0) != 12))) {
                              J[(f + 8) >> 2] = 0;
                              break n;
                            }
                            if (!((((c - b) | 0) != 12) | ((a | 0) > 11))) {
                              J[(f + 8) >> 2] = a + 12;
                            }
                          }
                          break b;
                        case 49:
                          g =
                            K[7704] |
                            (K[7705] << 8) |
                            ((K[7706] << 16) | (K[7707] << 24));
                          H[(h + 7) | 0] = g;
                          H[(h + 8) | 0] = g >>> 8;
                          H[(h + 9) | 0] = g >>> 16;
                          H[(h + 10) | 0] = g >>> 24;
                          g =
                            K[7701] |
                            (K[7702] << 8) |
                            ((K[7703] << 16) | (K[7704] << 24));
                          J[h >> 2] =
                            K[7697] |
                            (K[7698] << 8) |
                            ((K[7699] << 16) | (K[7700] << 24));
                          J[(h + 4) >> 2] = g;
                          J[(h + 12) >> 2] = Va(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 11) | 0,
                          );
                          break b;
                        case 17:
                          H[(h + 4) | 0] = K[7712];
                          J[h >> 2] =
                            K[7708] |
                            (K[7709] << 8) |
                            ((K[7710] << 16) | (K[7711] << 24));
                          J[(h + 12) >> 2] = Va(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 5) | 0,
                          );
                          break b;
                        case 18:
                          a = Ra((h + 12) | 0, c, e, i, 2);
                          b = J[e >> 2];
                          o: {
                            if (!(((a | 0) > 60) | (b & 4))) {
                              J[f >> 2] = a;
                              break o;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 19:
                          J[h >> 2] = 624576549;
                          J[(h + 4) >> 2] = 1394948685;
                          J[(h + 12) >> 2] = Va(
                            a,
                            b,
                            c,
                            d,
                            e,
                            f,
                            h,
                            (h + 8) | 0,
                          );
                          break b;
                        case 54:
                          a = Ra((h + 12) | 0, c, e, i, 1);
                          b = J[e >> 2];
                          p: {
                            if (!(((a | 0) > 6) | (b & 4))) {
                              J[(f + 24) >> 2] = a;
                              break p;
                            }
                            J[e >> 2] = b | 4;
                          }
                          break b;
                        case 55:
                          a =
                            fa[J[(J[a >> 2] + 20) >> 2]](a, b, c, d, e, f) | 0;
                          break a;
                        case 23:
                          b =
                            fa[J[(J[(a + 8) >> 2] + 24) >> 2]]((a + 8) | 0) | 0;
                          g = a;
                          j = J[(h + 12) >> 2];
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            a = J[b >> 2];
                          } else {
                            a = b;
                          }
                          i = a;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            a = J[b >> 2];
                          } else {
                            a = b;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            b = J[(b + 4) >> 2];
                          } else {
                            b = K[(b + 11) | 0] & 127;
                          }
                          J[(h + 12) >> 2] = Va(
                            g,
                            j,
                            c,
                            d,
                            e,
                            f,
                            i,
                            (a + b) | 0,
                          );
                          break b;
                        case 56:
                          ed((f + 20) | 0, (h + 12) | 0, c, e, i);
                          break b;
                        case 24:
                          a = Ra((h + 12) | 0, c, e, i, 4);
                          if (!(K[e | 0] & 4)) {
                            J[(f + 20) >> 2] = a - 1900;
                          }
                          break b;
                        default:
                          if ((g | 0) == 37) {
                            break c;
                          }
                          break;
                        case 2:
                        case 4:
                        case 6:
                        case 9:
                        case 10:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 20:
                        case 21:
                        case 22:
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                        case 37:
                        case 38:
                        case 40:
                        case 42:
                        case 43:
                        case 46:
                        case 48:
                        case 50:
                        case 52:
                        case 53:
                          break d;
                      }
                    }
                    J[e >> 2] = J[e >> 2] | 4;
                    break b;
                  }
                  a = (da - 16) | 0;
                  da = a;
                  J[(a + 12) >> 2] = c;
                  c = (h + 12) | 0;
                  f = (a + 12) | 0;
                  b = 6;
                  q: {
                    r: {
                      if (qa(c, f)) {
                        break r;
                      }
                      b = J[c >> 2];
                      d = J[(b + 12) >> 2];
                      s: {
                        if ((d | 0) == J[(b + 16) >> 2]) {
                          d = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                          break s;
                        }
                        d = H[d | 0];
                      }
                      b = 4;
                      if (
                        (fa[J[(J[i >> 2] + 36) >> 2]](i, (d << 24) >> 24, 0) |
                          0) !=
                        37
                      ) {
                        break r;
                      }
                      if (!qa(Ba(c), f)) {
                        break q;
                      }
                      b = 2;
                    }
                    J[e >> 2] = b | J[e >> 2];
                  }
                  da = (a + 16) | 0;
                }
                a = J[(h + 12) >> 2];
              }
              da = (h + 16) | 0;
              return a | 0;
            }
            function pf(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              var i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0,
                u = 0,
                v = 0,
                w = 0,
                x = 0,
                y = 0,
                z = 0,
                A = 0;
              w = (da - 16) | 0;
              da = w;
              q = c;
              while (1) {
                a: {
                  if ((d | 0) == (q | 0)) {
                    q = d;
                    break a;
                  }
                  if (!K[q | 0]) {
                    break a;
                  }
                  q = (q + 1) | 0;
                  continue;
                }
                break;
              }
              J[h >> 2] = f;
              J[e >> 2] = c;
              b: while (1) {
                c: {
                  d: {
                    e: {
                      if (((c | 0) == (d | 0)) | ((f | 0) == (g | 0))) {
                        break e;
                      }
                      o = J[(b + 4) >> 2];
                      J[(w + 8) >> 2] = J[b >> 2];
                      J[(w + 12) >> 2] = o;
                      x = (da - 16) | 0;
                      da = x;
                      J[(x + 12) >> 2] = J[(a + 8) >> 2];
                      A = $a((x + 8) | 0, (x + 12) | 0);
                      u = (q - c) | 0;
                      r = 0;
                      t = (da - 1040) | 0;
                      da = t;
                      o = J[e >> 2];
                      J[(t + 12) >> 2] = o;
                      v = f ? f : (t + 16) | 0;
                      s = f ? (g - f) >> 2 : 256;
                      f: {
                        g: {
                          h: {
                            if (!(!o | !s)) {
                              while (1) {
                                l = (u >>> 2) | 0;
                                if (!((u >>> 0 > 131) | (l >>> 0 >= s >>> 0))) {
                                  l = o;
                                  break g;
                                }
                                n = v;
                                l = l >>> 0 < s >>> 0 ? l : s;
                                k = 0;
                                j = 0;
                                y = (t + 12) | 0;
                                i = J[y >> 2];
                                i: {
                                  j: {
                                    k: {
                                      l: {
                                        m: {
                                          n: {
                                            o: {
                                              p: {
                                                q: {
                                                  r: {
                                                    s: {
                                                      t: {
                                                        u: {
                                                          if (!b) {
                                                            break u;
                                                          }
                                                          k = J[b >> 2];
                                                          if (!k) {
                                                            break u;
                                                          }
                                                          if (!n) {
                                                            m = l;
                                                            break s;
                                                          }
                                                          J[b >> 2] = 0;
                                                          m = l;
                                                          break t;
                                                        }
                                                        v: {
                                                          if (
                                                            !J[J[4039] >> 2]
                                                          ) {
                                                            if (!n) {
                                                              break v;
                                                            }
                                                            if (!l) {
                                                              break j;
                                                            }
                                                            k = l;
                                                            while (1) {
                                                              m = H[i | 0];
                                                              if (m) {
                                                                J[n >> 2] =
                                                                  m & 57343;
                                                                n = (n + 4) | 0;
                                                                i = (i + 1) | 0;
                                                                k = (k - 1) | 0;
                                                                if (k) {
                                                                  continue;
                                                                }
                                                                break j;
                                                              }
                                                              break;
                                                            }
                                                            J[n >> 2] = 0;
                                                            J[y >> 2] = 0;
                                                            l = (l - k) | 0;
                                                            break i;
                                                          }
                                                          m = l;
                                                          if (!n) {
                                                            break r;
                                                          }
                                                          break p;
                                                        }
                                                        l = hb(i);
                                                        break i;
                                                      }
                                                      j = 1;
                                                      break p;
                                                    }
                                                    j = 0;
                                                    break q;
                                                  }
                                                  j = 1;
                                                }
                                                while (1) {
                                                  if (!j) {
                                                    j = (K[i | 0] >>> 3) | 0;
                                                    if (
                                                      ((j - 16) |
                                                        (j + (k >> 26))) >>>
                                                        0 >
                                                      7
                                                    ) {
                                                      break o;
                                                    }
                                                    j = (i + 1) | 0;
                                                    w: {
                                                      if (!(k & 33554432)) {
                                                        break w;
                                                      }
                                                      if (H[j | 0] >= -64) {
                                                        i = (i - 1) | 0;
                                                        break m;
                                                      }
                                                      j = (i + 2) | 0;
                                                      if (!(k & 524288)) {
                                                        break w;
                                                      }
                                                      if (H[j | 0] >= -64) {
                                                        i = (i - 1) | 0;
                                                        break m;
                                                      }
                                                      j = (i + 3) | 0;
                                                    }
                                                    i = j;
                                                    m = (m - 1) | 0;
                                                    j = 1;
                                                    continue;
                                                  }
                                                  while (1) {
                                                    k = H[i | 0];
                                                    x: {
                                                      if (
                                                        (i & 3) |
                                                        ((k | 0) <= 0)
                                                      ) {
                                                        break x;
                                                      }
                                                      k = J[i >> 2];
                                                      if (
                                                        (k | (k - 16843009)) &
                                                        -2139062144
                                                      ) {
                                                        break x;
                                                      }
                                                      while (1) {
                                                        m = (m - 4) | 0;
                                                        k = J[(i + 4) >> 2];
                                                        i = (i + 4) | 0;
                                                        if (
                                                          !(
                                                            ((k - 16843009) |
                                                              k) &
                                                            -2139062144
                                                          )
                                                        ) {
                                                          continue;
                                                        }
                                                        break;
                                                      }
                                                    }
                                                    if ((k << 24) >> 24 > 0) {
                                                      m = (m - 1) | 0;
                                                      i = (i + 1) | 0;
                                                      continue;
                                                    }
                                                    break;
                                                  }
                                                  j = ((k & 255) - 194) | 0;
                                                  if (j >>> 0 > 50) {
                                                    break n;
                                                  }
                                                  i = (i + 1) | 0;
                                                  k = J[((j << 2) + 3040) >> 2];
                                                  j = 0;
                                                  continue;
                                                }
                                              }
                                              while (1) {
                                                if (!j) {
                                                  if (!m) {
                                                    break j;
                                                  }
                                                  while (1) {
                                                    y: {
                                                      j = K[i | 0];
                                                      k = (j << 24) >> 24;
                                                      if ((k | 0) <= 0) {
                                                        break y;
                                                      }
                                                      if (
                                                        !(
                                                          (i & 3) |
                                                          (m >>> 0 < 5)
                                                        )
                                                      ) {
                                                        z: {
                                                          while (1) {
                                                            k = J[i >> 2];
                                                            if (
                                                              (k |
                                                                (k -
                                                                  16843009)) &
                                                              -2139062144
                                                            ) {
                                                              break z;
                                                            }
                                                            J[n >> 2] = k & 255;
                                                            J[(n + 4) >> 2] =
                                                              K[(i + 1) | 0];
                                                            J[(n + 8) >> 2] =
                                                              K[(i + 2) | 0];
                                                            J[(n + 12) >> 2] =
                                                              K[(i + 3) | 0];
                                                            n = (n + 16) | 0;
                                                            i = (i + 4) | 0;
                                                            m = (m - 4) | 0;
                                                            if (m >>> 0 > 4) {
                                                              continue;
                                                            }
                                                            break;
                                                          }
                                                          k = K[i | 0];
                                                        }
                                                        j = k & 255;
                                                        if (
                                                          (k << 24) >> 24 <=
                                                          0
                                                        ) {
                                                          break y;
                                                        }
                                                      }
                                                      J[n >> 2] = j;
                                                      n = (n + 4) | 0;
                                                      i = (i + 1) | 0;
                                                      m = (m - 1) | 0;
                                                      if (m) {
                                                        continue;
                                                      }
                                                      break j;
                                                    }
                                                    break;
                                                  }
                                                  j = (j - 194) | 0;
                                                  if (j >>> 0 > 50) {
                                                    break n;
                                                  }
                                                  i = (i + 1) | 0;
                                                  k = J[((j << 2) + 3040) >> 2];
                                                  j = 1;
                                                  continue;
                                                }
                                                j = K[i | 0];
                                                p = (j >>> 3) | 0;
                                                if (
                                                  ((p - 16) |
                                                    (p + (k >> 26))) >>>
                                                    0 >
                                                  7
                                                ) {
                                                  break o;
                                                }
                                                A: {
                                                  B: {
                                                    p = (i + 1) | 0;
                                                    j = (j - 128) | (k << 6);
                                                    C: {
                                                      if ((j | 0) >= 0) {
                                                        break C;
                                                      }
                                                      p = (K[p | 0] - 128) | 0;
                                                      if (p >>> 0 > 63) {
                                                        break B;
                                                      }
                                                      z = j << 6;
                                                      j = p | z;
                                                      p = (i + 2) | 0;
                                                      if ((z | 0) >= 0) {
                                                        break C;
                                                      }
                                                      p = (K[p | 0] - 128) | 0;
                                                      if (p >>> 0 > 63) {
                                                        break B;
                                                      }
                                                      j = p | (j << 6);
                                                      p = (i + 3) | 0;
                                                    }
                                                    i = p;
                                                    J[n >> 2] = j;
                                                    m = (m - 1) | 0;
                                                    n = (n + 4) | 0;
                                                    break A;
                                                  }
                                                  J[3876] = 25;
                                                  i = (i - 1) | 0;
                                                  break l;
                                                }
                                                j = 0;
                                                continue;
                                              }
                                            }
                                            i = (i - 1) | 0;
                                            if (k) {
                                              break m;
                                            }
                                            k = K[i | 0];
                                          }
                                          if (k & 255) {
                                            break m;
                                          }
                                          if (n) {
                                            J[n >> 2] = 0;
                                            J[y >> 2] = 0;
                                          }
                                          l = (l - m) | 0;
                                          break i;
                                        }
                                        J[3876] = 25;
                                        if (!n) {
                                          break k;
                                        }
                                      }
                                      J[y >> 2] = i;
                                    }
                                    l = -1;
                                    break i;
                                  }
                                  J[y >> 2] = i;
                                }
                                m = l;
                                l = J[(t + 12) >> 2];
                                if ((m | 0) == -1) {
                                  s = 0;
                                  r = -1;
                                  break h;
                                }
                                k = ((t + 16) | 0) != (v | 0) ? m : 0;
                                s = (s - k) | 0;
                                v = ((k << 2) + v) | 0;
                                u = l ? (((o + u) | 0) - l) | 0 : 0;
                                r = (m + r) | 0;
                                if (!l) {
                                  break h;
                                }
                                o = l;
                                if (s) {
                                  continue;
                                }
                                break;
                              }
                              break h;
                            }
                            l = o;
                          }
                          if (!l) {
                            break f;
                          }
                        }
                        if (!s | !u) {
                          break f;
                        }
                        o = r;
                        while (1) {
                          D: {
                            r = Db(v, l, u, b);
                            E: {
                              if ((r + 2) >>> 0 <= 2) {
                                F: {
                                  switch ((r + 1) | 0) {
                                    case 1:
                                      J[(t + 12) >> 2] = 0;
                                      break E;
                                    case 0:
                                      break f;
                                    default:
                                      break F;
                                  }
                                }
                                J[b >> 2] = 0;
                                break E;
                              }
                              l = (J[(t + 12) >> 2] + r) | 0;
                              J[(t + 12) >> 2] = l;
                              o = (o + 1) | 0;
                              s = (s - 1) | 0;
                              if (s) {
                                break D;
                              }
                            }
                            r = o;
                            break f;
                          }
                          v = (v + 4) | 0;
                          u = (u - r) | 0;
                          r = o;
                          if (u) {
                            continue;
                          }
                          break;
                        }
                      }
                      if (f) {
                        J[e >> 2] = J[(t + 12) >> 2];
                      }
                      da = (t + 1040) | 0;
                      o = J[A >> 2];
                      if (o) {
                        J[4039] = (o | 0) == -1 ? 16036 : o;
                      }
                      da = (x + 16) | 0;
                      G: {
                        H: {
                          I: {
                            J: {
                              if ((r | 0) == -1) {
                                while (1) {
                                  J[h >> 2] = f;
                                  if (J[e >> 2] == (c | 0)) {
                                    break e;
                                  }
                                  g = 1;
                                  K: {
                                    L: {
                                      M: {
                                        b = Hc(
                                          f,
                                          c,
                                          (q - c) | 0,
                                          (w + 8) | 0,
                                          J[(a + 8) >> 2],
                                        );
                                        switch ((b + 2) | 0) {
                                          case 0:
                                            break H;
                                          case 1:
                                            break M;
                                          case 2:
                                            break K;
                                          default:
                                            break L;
                                        }
                                      }
                                      J[e >> 2] = c;
                                      break J;
                                    }
                                    g = b;
                                  }
                                  c = (c + g) | 0;
                                  f = (J[h >> 2] + 4) | 0;
                                  continue;
                                }
                              }
                              f = (J[h >> 2] + (r << 2)) | 0;
                              J[h >> 2] = f;
                              if ((f | 0) == (g | 0)) {
                                break G;
                              }
                              c = J[e >> 2];
                              if ((d | 0) == (q | 0)) {
                                break c;
                              }
                              if (!Hc(f, c, 1, b, J[(a + 8) >> 2])) {
                                break I;
                              }
                            }
                            a = 2;
                            break d;
                          }
                          f = (J[h >> 2] + 4) | 0;
                          J[h >> 2] = f;
                          c = (J[e >> 2] + 1) | 0;
                          J[e >> 2] = c;
                          q = c;
                          while (1) {
                            if ((d | 0) == (q | 0)) {
                              break c;
                            }
                            if (!K[q | 0]) {
                              continue b;
                            }
                            q = (q + 1) | 0;
                            continue;
                          }
                        }
                        J[e >> 2] = c;
                        a = 1;
                        break d;
                      }
                      c = J[e >> 2];
                    }
                    a = (c | 0) != (d | 0);
                  }
                  da = (w + 16) | 0;
                  return a | 0;
                }
                q = d;
                continue;
              }
            }
            function gc(a) {
              var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0,
                u = 0,
                v = 0,
                w = 0,
                x = 0,
                y = 0,
                z = 0,
                A = 0,
                B = 0,
                C = 0,
                D = 0,
                E = 0,
                F = 0,
                G = 0,
                H = 0,
                I = 0,
                K = 0;
              u = O[1907];
              v = O[1906];
              w = O[1908];
              g = J[(a + 8) >> 2];
              x = O[1909];
              h = J[(a + 12) >> 2];
              y = O[1910];
              i = J[(a + 16) >> 2];
              z = O[1911];
              j = J[(a + 20) >> 2];
              A = O[1912];
              k = J[(a + 24) >> 2];
              B = O[1913];
              l = J[(a + 28) >> 2];
              C = O[1914];
              m = J[(a + 32) >> 2];
              D = O[1915];
              n = J[(a + 36) >> 2];
              E = O[1916];
              o = J[(a + 40) >> 2];
              F = O[1917];
              p = J[(a + 44) >> 2];
              G = O[1918];
              q = J[(a + 48) >> 2];
              H = O[1919];
              r = J[(a + 52) >> 2];
              I = O[1920];
              s = J[(a + 56) >> 2];
              K = O[1921];
              t = J[(a + 60) >> 2];
              e = J[a >> 2];
              f = J[(a + 4) >> 2];
              if (!(!e | !f)) {
                c = (e - f) | 0;
                b = c >> 31;
                d = 0 - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 4) >> 2];
              a: {
                if (!b) {
                  break a;
                }
                c = J[(a + 8) >> 2];
                if (!c) {
                  break a;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 8) >> 2];
              b: {
                if (!b) {
                  break b;
                }
                c = J[(a + 12) >> 2];
                if (!c) {
                  break b;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 16) >> 2];
              c: {
                if (!b) {
                  break c;
                }
                c = J[(a + 20) >> 2];
                if (!c) {
                  break c;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 20) >> 2];
              d: {
                if (!b) {
                  break d;
                }
                c = J[(a + 24) >> 2];
                if (!c) {
                  break d;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 24) >> 2];
              e: {
                if (!b) {
                  break e;
                }
                c = J[(a + 28) >> 2];
                if (!c) {
                  break e;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 32) >> 2];
              f: {
                if (!b) {
                  break f;
                }
                c = J[(a + 36) >> 2];
                if (!c) {
                  break f;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 36) >> 2];
              g: {
                if (!b) {
                  break g;
                }
                c = J[(a + 40) >> 2];
                if (!c) {
                  break g;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 40) >> 2];
              h: {
                if (!b) {
                  break h;
                }
                c = J[(a + 44) >> 2];
                if (!c) {
                  break h;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 48) >> 2];
              i: {
                if (!b) {
                  break i;
                }
                c = J[(a + 52) >> 2];
                if (!c) {
                  break i;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 52) >> 2];
              j: {
                if (!b) {
                  break j;
                }
                c = J[(a + 56) >> 2];
                if (!c) {
                  break j;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 56) >> 2];
              k: {
                if (!b) {
                  break k;
                }
                c = J[(a + 60) >> 2];
                if (!c) {
                  break k;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[a >> 2];
              l: {
                m: {
                  if (b) {
                    c = J[(a + 16) >> 2];
                    if (!c) {
                      break m;
                    }
                    c = (b - c) | 0;
                    b = c >> 31;
                    d = d - +(((b ^ c) - b) >>> 0);
                  }
                  b = J[(a + 16) >> 2];
                  if (!b) {
                    break m;
                  }
                  c = J[(a + 32) >> 2];
                  if (!c) {
                    break l;
                  }
                  c = (b - c) | 0;
                  b = c >> 31;
                  d = d - +(((b ^ c) - b) >>> 0);
                }
                b = J[(a + 32) >> 2];
                if (!b) {
                  break l;
                }
                c = J[(a + 48) >> 2];
                if (!c) {
                  break l;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 4) >> 2];
              n: {
                if (!b) {
                  break n;
                }
                c = J[(a + 20) >> 2];
                if (!c) {
                  break n;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 20) >> 2];
              o: {
                if (!b) {
                  break o;
                }
                c = J[(a + 36) >> 2];
                if (!c) {
                  break o;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 36) >> 2];
              p: {
                if (!b) {
                  break p;
                }
                c = J[(a + 52) >> 2];
                if (!c) {
                  break p;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 8) >> 2];
              q: {
                if (!b) {
                  break q;
                }
                c = J[(a + 24) >> 2];
                if (!c) {
                  break q;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 24) >> 2];
              r: {
                if (!b) {
                  break r;
                }
                c = J[(a + 40) >> 2];
                if (!c) {
                  break r;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 40) >> 2];
              s: {
                if (!b) {
                  break s;
                }
                c = J[(a + 56) >> 2];
                if (!c) {
                  break s;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 12) >> 2];
              t: {
                if (!b) {
                  break t;
                }
                c = J[(a + 28) >> 2];
                if (!c) {
                  break t;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 28) >> 2];
              u: {
                if (!b) {
                  break u;
                }
                c = J[(a + 44) >> 2];
                if (!c) {
                  break u;
                }
                c = (b - c) | 0;
                b = c >> 31;
                d = d - +(((b ^ c) - b) >>> 0);
              }
              b = J[(a + 44) >> 2];
              v: {
                if (!b) {
                  break v;
                }
                a = J[(a + 60) >> 2];
                if (!a) {
                  break v;
                }
                b = (b - a) | 0;
                a = b >> 31;
                d = d - +(((a ^ b) - a) >>> 0);
              }
              return (
                d * O[1923] +
                ((K * +(t | 0) +
                  (I * +(s | 0) +
                    (H * +(r | 0) +
                      (G * +(q | 0) +
                        (F * +(p | 0) +
                          (E * +(o | 0) +
                            (D * +(n | 0) +
                              (C * +(m | 0) +
                                (B * +(l | 0) +
                                  (A * +(k | 0) +
                                    (z * +(j | 0) +
                                      (y * +(i | 0) +
                                        (x * +(h | 0) +
                                          (w * +(g | 0) +
                                            (u * +(f | 0) +
                                              (v * +(e | 0) +
                                                0)))))))))))))))) *
                  O[1924] +
                  O[1922] *
                    +(
                      (!t +
                        ((!s +
                          ((!r +
                            ((!q +
                              ((!p +
                                ((!o +
                                  ((!n +
                                    ((!m +
                                      ((!l +
                                        ((!k +
                                          ((!j +
                                            ((!i +
                                              ((!h +
                                                ((!g + ((!e + !f) | 0)) | 0)) |
                                                0)) |
                                              0)) |
                                            0)) |
                                          0)) |
                                        0)) |
                                      0)) |
                                    0)) |
                                  0)) |
                                0)) |
                              0)) |
                            0)) |
                          0)) >>>
                      0
                    ))
              );
            }
            function Oc(a) {
              var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0;
              if (!K[16776]) {
                d = (da - 16) | 0;
                da = d;
                if (!K[16768]) {
                  e = (da - 16) | 0;
                  da = e;
                  J[(e + 12) >> 2] = 1;
                  J[4153] = J[(e + 12) >> 2] - 1;
                  J[4152] = 14592;
                  J[4152] = 9392;
                  J[4152] = 7912;
                  b = (da - 16) | 0;
                  da = b;
                  J[4156] = 0;
                  J[4154] = 0;
                  J[4155] = 0;
                  H[16748] = 0;
                  J[(b + 8) >> 2] = 16616;
                  H[(b + 15) | 0] = 0;
                  c = (da - 16) | 0;
                  da = c;
                  if (sc() >>> 0 < 30) {
                    Fa();
                    C();
                  }
                  rc((c + 8) | 0, 30);
                  f = J[(c + 8) >> 2];
                  J[4155] = f;
                  J[4154] = f;
                  J[4156] = (J[(c + 12) >> 2] << 2) + f;
                  da = (c + 16) | 0;
                  Rc(30);
                  H[(b + 15) | 0] = 1;
                  da = (b + 16) | 0;
                  ib(16752, 1643);
                  Sc(16616);
                  J[4508] = 0;
                  J[4507] = 14592;
                  J[4507] = 9392;
                  J[4507] = 10504;
                  va(18028, ra(16440));
                  J[4510] = 0;
                  J[4509] = 14592;
                  J[4509] = 9392;
                  J[4509] = 10536;
                  va(18036, ra(16448));
                  J[4512] = 0;
                  J[4511] = 14592;
                  J[4511] = 9392;
                  H[18056] = 0;
                  J[4513] = 0;
                  J[4511] = 7932;
                  J[4513] = 7984;
                  va(18044, ra(16792));
                  J[4516] = 0;
                  J[4515] = 14592;
                  J[4515] = 9392;
                  J[4515] = 9448;
                  va(18060, ra(16784));
                  J[4518] = 0;
                  J[4517] = 14592;
                  J[4517] = 9392;
                  J[4517] = 9600;
                  va(18068, ra(16800));
                  J[4520] = 0;
                  J[4519] = 14592;
                  J[4519] = 9392;
                  J[4519] = 9016;
                  J[4521] = Ha();
                  va(18076, ra(16808));
                  J[4523] = 0;
                  J[4522] = 14592;
                  J[4522] = 9392;
                  J[4522] = 9748;
                  va(18088, ra(16816));
                  J[4525] = 0;
                  J[4524] = 14592;
                  J[4524] = 9392;
                  J[4524] = 9980;
                  va(18096, ra(16832));
                  J[4527] = 0;
                  J[4526] = 14592;
                  J[4526] = 9392;
                  J[4526] = 9864;
                  va(18104, ra(16824));
                  J[4529] = 0;
                  J[4528] = 14592;
                  J[4528] = 9392;
                  J[4528] = 10096;
                  va(18112, ra(16840));
                  J[4531] = 0;
                  J[4530] = 14592;
                  J[4530] = 9392;
                  I[9064] = 11310;
                  J[4530] = 9064;
                  J[4535] = 0;
                  J[4533] = 0;
                  J[4534] = 0;
                  va(18120, ra(16848));
                  J[4537] = 0;
                  J[4536] = 14592;
                  J[4536] = 9392;
                  J[4538] = 46;
                  J[4539] = 44;
                  J[4536] = 9104;
                  J[4542] = 0;
                  J[4540] = 0;
                  J[4541] = 0;
                  va(18144, ra(16856));
                  J[4544] = 0;
                  J[4543] = 14592;
                  J[4543] = 9392;
                  J[4543] = 10568;
                  va(18172, ra(16456));
                  J[4546] = 0;
                  J[4545] = 14592;
                  J[4545] = 9392;
                  J[4545] = 10816;
                  va(18180, ra(16464));
                  J[4548] = 0;
                  J[4547] = 14592;
                  J[4547] = 9392;
                  J[4547] = 11028;
                  va(18188, ra(16472));
                  J[4550] = 0;
                  J[4549] = 14592;
                  J[4549] = 9392;
                  J[4549] = 11264;
                  va(18196, ra(16480));
                  J[4552] = 0;
                  J[4551] = 14592;
                  J[4551] = 9392;
                  J[4551] = 12260;
                  va(18204, ra(16520));
                  J[4554] = 0;
                  J[4553] = 14592;
                  J[4553] = 9392;
                  J[4553] = 12408;
                  va(18212, ra(16528));
                  J[4556] = 0;
                  J[4555] = 14592;
                  J[4555] = 9392;
                  J[4555] = 12524;
                  va(18220, ra(16536));
                  J[4558] = 0;
                  J[4557] = 14592;
                  J[4557] = 9392;
                  J[4557] = 12640;
                  va(18228, ra(16544));
                  J[4560] = 0;
                  J[4559] = 14592;
                  J[4559] = 9392;
                  J[4559] = 12756;
                  va(18236, ra(16552));
                  J[4562] = 0;
                  J[4561] = 14592;
                  J[4561] = 9392;
                  J[4561] = 12924;
                  va(18244, ra(16560));
                  J[4564] = 0;
                  J[4563] = 14592;
                  J[4563] = 9392;
                  J[4563] = 13092;
                  va(18252, ra(16568));
                  J[4566] = 0;
                  J[4565] = 14592;
                  J[4565] = 9392;
                  J[4565] = 13260;
                  va(18260, ra(16576));
                  J[4568] = 0;
                  J[4567] = 14592;
                  J[4567] = 9392;
                  J[4569] = 14520;
                  J[4567] = 11464;
                  J[4569] = 11512;
                  va(18268, ra(16488));
                  J[4571] = 0;
                  J[4570] = 14592;
                  J[4570] = 9392;
                  J[4572] = 14556;
                  J[4570] = 11732;
                  J[4572] = 11780;
                  va(18280, ra(16496));
                  J[4574] = 0;
                  J[4573] = 14592;
                  J[4573] = 9392;
                  J[4575] = Ha();
                  J[4573] = 11972;
                  va(18292, ra(16504));
                  J[4577] = 0;
                  J[4576] = 14592;
                  J[4576] = 9392;
                  J[4578] = Ha();
                  J[4576] = 12132;
                  va(18304, ra(16512));
                  J[4580] = 0;
                  J[4579] = 14592;
                  J[4579] = 9392;
                  J[4579] = 13428;
                  va(18316, ra(16584));
                  J[4582] = 0;
                  J[4581] = 14592;
                  J[4581] = 9392;
                  J[4581] = 13548;
                  va(18324, ra(16592));
                  da = (e + 16) | 0;
                  J[(d + 8) >> 2] = 16608;
                  J[4191] = J[(d + 8) >> 2];
                  H[16768] = 1;
                }
                da = (d + 16) | 0;
                b = J[4191];
                J[4193] = b;
                if ((b | 0) != 16608) {
                  J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
                }
                H[16776] = 1;
              }
              b = J[4193];
              J[a >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              return a;
            }
            function Ea(a, b, c, d, e, f, g, h, i) {
              var j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0;
              k = (da - 112) | 0;
              da = k;
              j = i & 2147483647;
              a: {
                b: {
                  n = e & 2147483647;
                  l = 2147418112;
                  m = !(b | c);
                  if (!(d | n ? (n - l) >>> 0 < 2147549184 : m)) {
                    r = (j - l) | 0;
                    if (
                      !h & ((r | 0) == -2147418112)
                        ? f | g
                        : (((r | 0) == -2147418112) & ((h | 0) != 0)) |
                          (r >>> 0 > 2147549184)
                    ) {
                      break b;
                    }
                  }
                  if (
                    !(!d & ((n | 0) == 2147418112) ? m : n >>> 0 < 2147418112)
                  ) {
                    h = d;
                    i = e | 32768;
                    f = b;
                    g = c;
                    break a;
                  }
                  if (
                    !(!h & ((j | 0) == 2147418112)
                      ? !(f | g)
                      : j >>> 0 < 2147418112)
                  ) {
                    i = i | 32768;
                    break a;
                  }
                  if (!(b | d | ((n ^ 2147418112) | c))) {
                    l = d;
                    d = !(
                      (b ^ f) |
                      (d ^ h) |
                      ((c ^ g) | (e ^ i ^ -2147483648))
                    );
                    h = d ? 0 : l;
                    i = d ? 2147450880 : e;
                    f = d ? 0 : b;
                    g = d ? 0 : c;
                    break a;
                  }
                  l = f | h;
                  if (!(l | ((j ^ 2147418112) | g))) {
                    break a;
                  }
                  if (!(b | d | (c | n))) {
                    if (g | j | l) {
                      break a;
                    }
                    f = b & f;
                    g = c & g;
                    h = d & h;
                    i = e & i;
                    break a;
                  }
                  if (f | h | (g | j)) {
                    break b;
                  }
                  f = b;
                  g = c;
                  h = d;
                  i = e;
                  break a;
                }
                l = (j | 0) == (n | 0);
                p =
                  l & ((d | 0) == (h | 0))
                    ? (((c | 0) == (g | 0)) & (b >>> 0 < f >>> 0)) |
                      (c >>> 0 < g >>> 0)
                    : (l & (d >>> 0 < h >>> 0)) | (j >>> 0 > n >>> 0);
                m = p;
                n = m ? f : b;
                r = m ? g : c;
                l = m ? i : e;
                s = l;
                m = m ? h : d;
                q = l & 65535;
                j = p ? d : h;
                l = p ? e : i;
                h = l;
                l = (h >>> 16) & 32767;
                o = (s >>> 16) & 32767;
                if (!o) {
                  o = !(m | q);
                  d = S(o ? r : q);
                  o =
                    (((d | 0) == 32 ? (S(o ? n : m) + 32) | 0 : d) +
                      (o ? 64 : 0)) |
                    0;
                  za((k + 96) | 0, n, r, m, q, (o - 15) | 0);
                  m = J[(k + 104) >> 2];
                  q = J[(k + 108) >> 2];
                  r = J[(k + 100) >> 2];
                  o = (16 - o) | 0;
                  n = J[(k + 96) >> 2];
                }
                f = p ? b : f;
                g = p ? c : g;
                b = j;
                c = h & 65535;
                if (!l) {
                  j = !(b | c);
                  p = S(j ? g : c);
                  j =
                    (((p | 0) == 32 ? (S(j ? f : b) + 32) | 0 : p) +
                      (j ? 64 : 0)) |
                    0;
                  za((k + 80) | 0, f, g, b, c, (j - 15) | 0);
                  l = (16 - j) | 0;
                  f = J[(k + 80) >> 2];
                  g = J[(k + 84) >> 2];
                  b = J[(k + 88) >> 2];
                  c = J[(k + 92) >> 2];
                }
                d = c << 3;
                c = b;
                b = d | (b >>> 29);
                j = c << 3;
                c = b;
                b = (g >>> 29) | j;
                c = c | 524288;
                j = (q << 3) | (m >>> 29);
                q = (m << 3) | (r >>> 29);
                p = j;
                h = e ^ i;
                j = (g << 3) | (f >>> 29);
                d = f << 3;
                c: {
                  if ((l | 0) == (o | 0)) {
                    break c;
                  }
                  e = (o - l) | 0;
                  if (e >>> 0 > 127) {
                    b = 0;
                    c = 0;
                    j = 0;
                    d = 1;
                    break c;
                  }
                  za((k - -64) | 0, d, j, b, c, (128 - e) | 0);
                  _a((k + 48) | 0, d, j, b, c, e);
                  b = J[(k + 56) >> 2];
                  c = J[(k + 60) >> 2];
                  j = J[(k + 52) >> 2];
                  d =
                    J[(k + 48) >> 2] |
                    ((J[(k + 64) >> 2] |
                      J[(k + 72) >> 2] |
                      (J[(k + 68) >> 2] | J[(k + 76) >> 2])) !=
                      0);
                }
                m = d;
                l = j;
                p = p | 524288;
                j = (r << 3) | (n >>> 29);
                n = n << 3;
                d: {
                  if ((h | 0) < 0) {
                    f = 0;
                    g = 0;
                    h = 0;
                    i = 0;
                    if (!((n ^ m) | (b ^ q) | ((j ^ l) | (c ^ p)))) {
                      break a;
                    }
                    d = (n - m) | 0;
                    e = (j - (((n >>> 0 < m >>> 0) + l) | 0)) | 0;
                    f = (q - b) | 0;
                    g =
                      (((j | 0) == (l | 0)) & (n >>> 0 < m >>> 0)) |
                      (j >>> 0 < l >>> 0);
                    h = (f - g) | 0;
                    b =
                      (((p - (((b >>> 0 > q >>> 0) + c) | 0)) | 0) -
                        (f >>> 0 < g >>> 0)) |
                      0;
                    i = b;
                    if (b >>> 0 > 524287) {
                      break d;
                    }
                    c = !(b | h);
                    g = S(c ? e : b);
                    c =
                      (((g | 0) == 32 ? (S(c ? d : h) + 32) | 0 : g) +
                        (c ? 64 : 0)) |
                      0;
                    b = (c - 12) | 0;
                    za((k + 32) | 0, d, e, h, i, b);
                    o = (o - b) | 0;
                    h = J[(k + 40) >> 2];
                    i = J[(k + 44) >> 2];
                    d = J[(k + 32) >> 2];
                    e = J[(k + 36) >> 2];
                    break d;
                  }
                  e = (j + l) | 0;
                  d = (n + m) | 0;
                  e = d >>> 0 < n >>> 0 ? (e + 1) | 0 : e;
                  f =
                    (((l | 0) == (e | 0)) & (d >>> 0 < m >>> 0)) |
                    (e >>> 0 < l >>> 0);
                  j = (c + p) | 0;
                  b = (b + q) | 0;
                  j = b >>> 0 < q >>> 0 ? (j + 1) | 0 : j;
                  h = (b + f) | 0;
                  i = h >>> 0 < b >>> 0 ? (j + 1) | 0 : j;
                  if (!(i & 1048576)) {
                    break d;
                  }
                  d = (m & 1) | (((e & 1) << 31) | (d >>> 1));
                  e = (h << 31) | (e >>> 1);
                  o = (o + 1) | 0;
                  h = ((i & 1) << 31) | (h >>> 1);
                  i = (i >>> 1) | 0;
                }
                f = 0;
                b = s & -2147483648;
                g = b;
                if ((o | 0) >= 32767) {
                  h = f;
                  i = b | 2147418112;
                  g = 0;
                  break a;
                }
                l = 0;
                e: {
                  if ((o | 0) > 0) {
                    l = o;
                    break e;
                  }
                  za((k + 16) | 0, d, e, h, i, (o + 127) | 0);
                  _a(k, d, e, h, i, (1 - o) | 0);
                  d =
                    J[k >> 2] |
                    ((J[(k + 16) >> 2] |
                      J[(k + 24) >> 2] |
                      (J[(k + 20) >> 2] | J[(k + 28) >> 2])) !=
                      0);
                  e = J[(k + 4) >> 2];
                  h = J[(k + 8) >> 2];
                  i = J[(k + 12) >> 2];
                }
                c = ((e & 7) << 29) | (d >>> 3);
                e = (h << 29) | (e >>> 3);
                f = f | (((i & 7) << 29) | (h >>> 3));
                b = g | (((i >>> 3) & 65535) | (l << 16));
                f: {
                  g: {
                    j = d & 7;
                    if ((j | 0) != 4) {
                      h = f;
                      d = e;
                      f = j >>> 0 > 4;
                      e = f;
                      f = (c + f) | 0;
                      g = e >>> 0 > f >>> 0 ? (d + 1) | 0 : d;
                      c =
                        (((d | 0) == (g | 0)) & (c >>> 0 > f >>> 0)) |
                        (d >>> 0 > g >>> 0);
                      h = (c + h) | 0;
                      i = c >>> 0 > h >>> 0 ? (b + 1) | 0 : b;
                      break g;
                    }
                    h = f;
                    d = b;
                    b = e;
                    f = c & 1;
                    e = f;
                    f = (c + f) | 0;
                    g = e >>> 0 > f >>> 0 ? (b + 1) | 0 : b;
                    b =
                      (((g | 0) == (b | 0)) & (c >>> 0 > f >>> 0)) |
                      (b >>> 0 > g >>> 0);
                    h = (b + h) | 0;
                    i = h >>> 0 < b >>> 0 ? (d + 1) | 0 : d;
                    break f;
                  }
                  if (!j) {
                    break a;
                  }
                }
              }
              J[a >> 2] = f;
              J[(a + 4) >> 2] = g;
              J[(a + 8) >> 2] = h;
              J[(a + 12) >> 2] = i;
              da = (k + 112) | 0;
            }
            function la(a) {
              a = a | 0;
              var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
              a: {
                if (!a) {
                  break a;
                }
                d = (a - 8) | 0;
                b = J[(a - 4) >> 2];
                a = b & -8;
                f = (d + a) | 0;
                b: {
                  if (b & 1) {
                    break b;
                  }
                  if (!(b & 2)) {
                    break a;
                  }
                  b = J[d >> 2];
                  d = (d - b) | 0;
                  if (d >>> 0 < M[3881]) {
                    break a;
                  }
                  a = (a + b) | 0;
                  c: {
                    d: {
                      e: {
                        if (J[3882] != (d | 0)) {
                          c = J[(d + 12) >> 2];
                          if (b >>> 0 <= 255) {
                            e = J[(d + 8) >> 2];
                            if ((e | 0) != (c | 0)) {
                              break e;
                            }
                            J[3877] = J[3877] & Qg((b >>> 3) | 0);
                            break b;
                          }
                          h = J[(d + 24) >> 2];
                          if ((c | 0) != (d | 0)) {
                            b = J[(d + 8) >> 2];
                            J[(b + 12) >> 2] = c;
                            J[(c + 8) >> 2] = b;
                            break c;
                          }
                          e = J[(d + 20) >> 2];
                          if (e) {
                            b = (d + 20) | 0;
                          } else {
                            e = J[(d + 16) >> 2];
                            if (!e) {
                              break d;
                            }
                            b = (d + 16) | 0;
                          }
                          while (1) {
                            g = b;
                            c = e;
                            b = (c + 20) | 0;
                            e = J[(c + 20) >> 2];
                            if (e) {
                              continue;
                            }
                            b = (c + 16) | 0;
                            e = J[(c + 16) >> 2];
                            if (e) {
                              continue;
                            }
                            break;
                          }
                          J[g >> 2] = 0;
                          break c;
                        }
                        b = J[(f + 4) >> 2];
                        if ((b & 3) != 3) {
                          break b;
                        }
                        J[3879] = a;
                        J[(f + 4) >> 2] = b & -2;
                        J[(d + 4) >> 2] = a | 1;
                        J[f >> 2] = a;
                        return;
                      }
                      J[(e + 12) >> 2] = c;
                      J[(c + 8) >> 2] = e;
                      break b;
                    }
                    c = 0;
                  }
                  if (!h) {
                    break b;
                  }
                  b = J[(d + 28) >> 2];
                  e = b << 2;
                  f: {
                    if (J[(e + 15812) >> 2] == (d | 0)) {
                      J[(e + 15812) >> 2] = c;
                      if (c) {
                        break f;
                      }
                      J[3878] = J[3878] & Qg(b);
                      break b;
                    }
                    g: {
                      if (J[(h + 16) >> 2] == (d | 0)) {
                        J[(h + 16) >> 2] = c;
                        break g;
                      }
                      J[(h + 20) >> 2] = c;
                    }
                    if (!c) {
                      break b;
                    }
                  }
                  J[(c + 24) >> 2] = h;
                  b = J[(d + 16) >> 2];
                  if (b) {
                    J[(c + 16) >> 2] = b;
                    J[(b + 24) >> 2] = c;
                  }
                  b = J[(d + 20) >> 2];
                  if (!b) {
                    break b;
                  }
                  J[(c + 20) >> 2] = b;
                  J[(b + 24) >> 2] = c;
                }
                if (d >>> 0 >= f >>> 0) {
                  break a;
                }
                b = J[(f + 4) >> 2];
                if (!(b & 1)) {
                  break a;
                }
                h: {
                  i: {
                    j: {
                      k: {
                        if (!(b & 2)) {
                          if (J[3883] == (f | 0)) {
                            J[3883] = d;
                            a = (J[3880] + a) | 0;
                            J[3880] = a;
                            J[(d + 4) >> 2] = a | 1;
                            if (J[3882] != (d | 0)) {
                              break a;
                            }
                            J[3879] = 0;
                            J[3882] = 0;
                            return;
                          }
                          i = J[3882];
                          if ((i | 0) == (f | 0)) {
                            J[3882] = d;
                            a = (J[3879] + a) | 0;
                            J[3879] = a;
                            J[(d + 4) >> 2] = a | 1;
                            J[(a + d) >> 2] = a;
                            return;
                          }
                          a = ((b & -8) + a) | 0;
                          c = J[(f + 12) >> 2];
                          if (b >>> 0 <= 255) {
                            e = J[(f + 8) >> 2];
                            if ((e | 0) == (c | 0)) {
                              J[3877] = J[3877] & Qg((b >>> 3) | 0);
                              break i;
                            }
                            J[(e + 12) >> 2] = c;
                            J[(c + 8) >> 2] = e;
                            break i;
                          }
                          h = J[(f + 24) >> 2];
                          if ((c | 0) != (f | 0)) {
                            b = J[(f + 8) >> 2];
                            J[(b + 12) >> 2] = c;
                            J[(c + 8) >> 2] = b;
                            break j;
                          }
                          e = J[(f + 20) >> 2];
                          if (e) {
                            b = (f + 20) | 0;
                          } else {
                            e = J[(f + 16) >> 2];
                            if (!e) {
                              break k;
                            }
                            b = (f + 16) | 0;
                          }
                          while (1) {
                            g = b;
                            c = e;
                            b = (c + 20) | 0;
                            e = J[(c + 20) >> 2];
                            if (e) {
                              continue;
                            }
                            b = (c + 16) | 0;
                            e = J[(c + 16) >> 2];
                            if (e) {
                              continue;
                            }
                            break;
                          }
                          J[g >> 2] = 0;
                          break j;
                        }
                        J[(f + 4) >> 2] = b & -2;
                        J[(d + 4) >> 2] = a | 1;
                        J[(a + d) >> 2] = a;
                        break h;
                      }
                      c = 0;
                    }
                    if (!h) {
                      break i;
                    }
                    b = J[(f + 28) >> 2];
                    e = b << 2;
                    l: {
                      if (J[(e + 15812) >> 2] == (f | 0)) {
                        J[(e + 15812) >> 2] = c;
                        if (c) {
                          break l;
                        }
                        J[3878] = J[3878] & Qg(b);
                        break i;
                      }
                      m: {
                        if (J[(h + 16) >> 2] == (f | 0)) {
                          J[(h + 16) >> 2] = c;
                          break m;
                        }
                        J[(h + 20) >> 2] = c;
                      }
                      if (!c) {
                        break i;
                      }
                    }
                    J[(c + 24) >> 2] = h;
                    b = J[(f + 16) >> 2];
                    if (b) {
                      J[(c + 16) >> 2] = b;
                      J[(b + 24) >> 2] = c;
                    }
                    b = J[(f + 20) >> 2];
                    if (!b) {
                      break i;
                    }
                    J[(c + 20) >> 2] = b;
                    J[(b + 24) >> 2] = c;
                  }
                  J[(d + 4) >> 2] = a | 1;
                  J[(a + d) >> 2] = a;
                  if ((d | 0) != (i | 0)) {
                    break h;
                  }
                  J[3879] = a;
                  return;
                }
                if (a >>> 0 <= 255) {
                  b = ((a & 248) + 15548) | 0;
                  e = J[3877];
                  a = 1 << (a >>> 3);
                  n: {
                    if (!(e & a)) {
                      J[3877] = a | e;
                      a = b;
                      break n;
                    }
                    a = J[(b + 8) >> 2];
                  }
                  J[(b + 8) >> 2] = d;
                  J[(a + 12) >> 2] = d;
                  J[(d + 12) >> 2] = b;
                  J[(d + 8) >> 2] = a;
                  return;
                }
                c = 31;
                if (a >>> 0 <= 16777215) {
                  b = S((a >>> 8) | 0);
                  c = (((((a >>> (38 - b)) & 1) - (b << 1)) | 0) + 62) | 0;
                }
                J[(d + 28) >> 2] = c;
                J[(d + 16) >> 2] = 0;
                J[(d + 20) >> 2] = 0;
                b = ((c << 2) + 15812) | 0;
                o: {
                  p: {
                    e = J[3878];
                    g = 1 << c;
                    q: {
                      if (!(e & g)) {
                        J[3878] = e | g;
                        J[b >> 2] = d;
                        c = 24;
                        break q;
                      }
                      c = a << ((c | 0) != 31 ? (25 - ((c >>> 1) | 0)) | 0 : 0);
                      b = J[b >> 2];
                      while (1) {
                        e = b;
                        if ((J[(b + 4) >> 2] & -8) == (a | 0)) {
                          break p;
                        }
                        b = (c >>> 29) | 0;
                        c = c << 1;
                        g = ((b & 4) + e) | 0;
                        b = J[(g + 16) >> 2];
                        if (b) {
                          continue;
                        }
                        break;
                      }
                      J[(g + 16) >> 2] = d;
                      b = e;
                      c = 24;
                    }
                    e = d;
                    g = d;
                    a = 8;
                    break o;
                  }
                  b = J[(e + 8) >> 2];
                  J[(b + 12) >> 2] = d;
                  J[(e + 8) >> 2] = d;
                  c = 8;
                  g = 0;
                  a = 24;
                }
                J[(c + d) >> 2] = b;
                J[(d + 12) >> 2] = e;
                J[(a + d) >> 2] = g;
                a = (J[3885] - 1) | 0;
                J[3885] = a ? a : -1;
              }
            }
            function Ya(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;
              a: {
                b: {
                  switch (c | 0) {
                    case 0:
                      Ca(b, 0);
                      Ca(b, 1);
                      Ca(b, 2);
                      Ca(b, 3);
                      break a;
                    case 1:
                      c = J[(b + 12) >> 2];
                      J[(b + 12) >> 2] = J[b >> 2];
                      J[b >> 2] = c;
                      c = J[(b + 16) >> 2];
                      J[(b + 16) >> 2] = J[(b + 28) >> 2];
                      J[(b + 28) >> 2] = c;
                      c = J[(b + 44) >> 2];
                      J[(b + 44) >> 2] = J[(b + 32) >> 2];
                      J[(b + 32) >> 2] = c;
                      J[(b + 4) >> 2] = Rg(J[(b + 4) >> 2], J[(b + 8) >> 2]);
                      J[(b + 8) >> 2] = ea;
                      J[(b + 20) >> 2] = Rg(J[(b + 20) >> 2], J[(b + 24) >> 2]);
                      J[(b + 24) >> 2] = ea;
                      J[(b + 36) >> 2] = Rg(J[(b + 36) >> 2], J[(b + 40) >> 2]);
                      J[(b + 40) >> 2] = ea;
                      c = J[(b + 60) >> 2];
                      J[(b + 60) >> 2] = J[(b + 48) >> 2];
                      J[(b + 48) >> 2] = c;
                      J[(b + 52) >> 2] = Rg(J[(b + 52) >> 2], J[(b + 56) >> 2]);
                      J[(b + 56) >> 2] = ea;
                      Ca(b, 0);
                      Ca(b, 1);
                      Ca(b, 2);
                      Ca(b, 3);
                      c = J[(b + 12) >> 2];
                      J[(b + 12) >> 2] = J[b >> 2];
                      J[b >> 2] = c;
                      c = J[(b + 16) >> 2];
                      J[(b + 16) >> 2] = J[(b + 28) >> 2];
                      J[(b + 28) >> 2] = c;
                      c = J[(b + 32) >> 2];
                      J[(b + 32) >> 2] = J[(b + 44) >> 2];
                      J[(b + 44) >> 2] = c;
                      J[(b + 4) >> 2] = Rg(J[(b + 4) >> 2], J[(b + 8) >> 2]);
                      J[(b + 8) >> 2] = ea;
                      J[(b + 20) >> 2] = Rg(J[(b + 20) >> 2], J[(b + 24) >> 2]);
                      J[(b + 24) >> 2] = ea;
                      J[(b + 36) >> 2] = Rg(J[(b + 36) >> 2], J[(b + 40) >> 2]);
                      J[(b + 40) >> 2] = ea;
                      c = J[(b + 60) >> 2];
                      J[(b + 60) >> 2] = J[(b + 48) >> 2];
                      J[(b + 48) >> 2] = c;
                      J[(b + 52) >> 2] = Rg(J[(b + 52) >> 2], J[(b + 56) >> 2]);
                      J[(b + 56) >> 2] = ea;
                      break a;
                    case 2:
                      c = J[(b + 16) >> 2];
                      J[(b + 16) >> 2] = J[(b + 4) >> 2];
                      J[(b + 4) >> 2] = c;
                      c = J[(b + 8) >> 2];
                      J[(b + 8) >> 2] = J[(b + 32) >> 2];
                      J[(b + 32) >> 2] = c;
                      c = J[(b + 12) >> 2];
                      J[(b + 12) >> 2] = J[(b + 48) >> 2];
                      J[(b + 48) >> 2] = c;
                      c = J[(b + 24) >> 2];
                      J[(b + 24) >> 2] = J[(b + 36) >> 2];
                      J[(b + 36) >> 2] = c;
                      c = J[(b + 28) >> 2];
                      J[(b + 28) >> 2] = J[(b + 52) >> 2];
                      J[(b + 52) >> 2] = c;
                      c = J[(b + 56) >> 2];
                      J[(b + 56) >> 2] = J[(b + 44) >> 2];
                      J[(b + 44) >> 2] = c;
                      Ca(b, 0);
                      Ca(b, 1);
                      Ca(b, 2);
                      Ca(b, 3);
                      c = J[(b + 16) >> 2];
                      J[(b + 16) >> 2] = J[(b + 4) >> 2];
                      J[(b + 4) >> 2] = c;
                      c = J[(b + 8) >> 2];
                      J[(b + 8) >> 2] = J[(b + 32) >> 2];
                      J[(b + 32) >> 2] = c;
                      c = J[(b + 12) >> 2];
                      J[(b + 12) >> 2] = J[(b + 48) >> 2];
                      J[(b + 48) >> 2] = c;
                      c = J[(b + 24) >> 2];
                      J[(b + 24) >> 2] = J[(b + 36) >> 2];
                      J[(b + 36) >> 2] = c;
                      c = J[(b + 28) >> 2];
                      J[(b + 28) >> 2] = J[(b + 52) >> 2];
                      J[(b + 52) >> 2] = c;
                      c = J[(b + 56) >> 2];
                      J[(b + 56) >> 2] = J[(b + 44) >> 2];
                      J[(b + 44) >> 2] = c;
                      break a;
                    case 3:
                      break b;
                    default:
                      break a;
                  }
                }
                c = J[(b + 12) >> 2];
                J[(b + 12) >> 2] = J[b >> 2];
                J[b >> 2] = J[(b + 48) >> 2];
                f = J[(b + 28) >> 2];
                J[(b + 28) >> 2] = J[(b + 4) >> 2];
                e = J[(b + 16) >> 2];
                J[(b + 16) >> 2] = J[(b + 52) >> 2];
                d = J[(b + 8) >> 2];
                J[(b + 8) >> 2] = e;
                J[(b + 4) >> 2] = J[(b + 32) >> 2];
                e = J[(b + 44) >> 2];
                g = J[(b + 24) >> 2];
                h = J[(b + 36) >> 2];
                i = J[(b + 56) >> 2];
                j = J[(b + 20) >> 2];
                J[(b + 44) >> 2] = d;
                J[(b + 32) >> 2] = i;
                J[(b + 24) >> 2] = j;
                J[(b + 20) >> 2] = h;
                d = J[(b + 40) >> 2];
                J[(b + 40) >> 2] = g;
                J[(b + 36) >> 2] = d;
                d = J[(b + 60) >> 2];
                J[(b + 60) >> 2] = c;
                J[(b + 48) >> 2] = d;
                J[(b + 56) >> 2] = f;
                J[(b + 52) >> 2] = e;
                Ca(b, 0);
                Ca(b, 1);
                Ca(b, 2);
                Ca(b, 3);
                c = J[b >> 2];
                J[b >> 2] = J[(b + 12) >> 2];
                f = J[(b + 20) >> 2];
                J[(b + 20) >> 2] = J[(b + 24) >> 2];
                e = J[(b + 40) >> 2];
                J[(b + 40) >> 2] = J[(b + 36) >> 2];
                d = J[(b + 60) >> 2];
                J[(b + 60) >> 2] = J[(b + 48) >> 2];
                g = J[(b + 52) >> 2];
                h = J[(b + 32) >> 2];
                i = J[(b + 56) >> 2];
                j = J[(b + 16) >> 2];
                k = J[(b + 44) >> 2];
                l = J[(b + 4) >> 2];
                m = J[(b + 28) >> 2];
                J[(b + 16) >> 2] = J[(b + 8) >> 2];
                J[(b + 4) >> 2] = m;
                J[(b + 32) >> 2] = l;
                J[(b + 8) >> 2] = k;
                J[(b + 48) >> 2] = c;
                J[(b + 12) >> 2] = d;
                J[(b + 36) >> 2] = f;
                J[(b + 24) >> 2] = e;
                J[(b + 52) >> 2] = j;
                J[(b + 28) >> 2] = i;
                J[(b + 56) >> 2] = h;
                J[(b + 44) >> 2] = g;
              }
              c = J[(b + 60) >> 2];
              J[(a + 56) >> 2] = J[(b + 56) >> 2];
              J[(a + 60) >> 2] = c;
              c = J[(b + 52) >> 2];
              J[(a + 48) >> 2] = J[(b + 48) >> 2];
              J[(a + 52) >> 2] = c;
              c = J[(b + 44) >> 2];
              J[(a + 40) >> 2] = J[(b + 40) >> 2];
              J[(a + 44) >> 2] = c;
              c = J[(b + 36) >> 2];
              J[(a + 32) >> 2] = J[(b + 32) >> 2];
              J[(a + 36) >> 2] = c;
              c = J[(b + 28) >> 2];
              J[(a + 24) >> 2] = J[(b + 24) >> 2];
              J[(a + 28) >> 2] = c;
              c = J[(b + 20) >> 2];
              J[(a + 16) >> 2] = J[(b + 16) >> 2];
              J[(a + 20) >> 2] = c;
              c = J[(b + 12) >> 2];
              J[(a + 8) >> 2] = J[(b + 8) >> 2];
              J[(a + 12) >> 2] = c;
              c = J[(b + 4) >> 2];
              J[a >> 2] = J[b >> 2];
              J[(a + 4) >> 2] = c;
            }
            function Ad(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
              f = (a + b) | 0;
              c = J[(a + 4) >> 2];
              a: {
                b: {
                  if (c & 1) {
                    break b;
                  }
                  if (!(c & 2)) {
                    break a;
                  }
                  c = J[a >> 2];
                  b = (c + b) | 0;
                  c: {
                    d: {
                      e: {
                        a = (a - c) | 0;
                        if ((a | 0) != J[3882]) {
                          d = J[(a + 12) >> 2];
                          if (c >>> 0 <= 255) {
                            e = J[(a + 8) >> 2];
                            if ((e | 0) != (d | 0)) {
                              break e;
                            }
                            J[3877] = J[3877] & Qg((c >>> 3) | 0);
                            break b;
                          }
                          g = J[(a + 24) >> 2];
                          if ((a | 0) != (d | 0)) {
                            c = J[(a + 8) >> 2];
                            J[(c + 12) >> 2] = d;
                            J[(d + 8) >> 2] = c;
                            break c;
                          }
                          e = J[(a + 20) >> 2];
                          if (e) {
                            c = (a + 20) | 0;
                          } else {
                            e = J[(a + 16) >> 2];
                            if (!e) {
                              break d;
                            }
                            c = (a + 16) | 0;
                          }
                          while (1) {
                            h = c;
                            d = e;
                            c = (d + 20) | 0;
                            e = J[(d + 20) >> 2];
                            if (e) {
                              continue;
                            }
                            c = (d + 16) | 0;
                            e = J[(d + 16) >> 2];
                            if (e) {
                              continue;
                            }
                            break;
                          }
                          J[h >> 2] = 0;
                          break c;
                        }
                        c = J[(f + 4) >> 2];
                        if ((c & 3) != 3) {
                          break b;
                        }
                        J[3879] = b;
                        J[(f + 4) >> 2] = c & -2;
                        J[(a + 4) >> 2] = b | 1;
                        J[f >> 2] = b;
                        return;
                      }
                      J[(e + 12) >> 2] = d;
                      J[(d + 8) >> 2] = e;
                      break b;
                    }
                    d = 0;
                  }
                  if (!g) {
                    break b;
                  }
                  c = J[(a + 28) >> 2];
                  e = c << 2;
                  f: {
                    if (J[(e + 15812) >> 2] == (a | 0)) {
                      J[(e + 15812) >> 2] = d;
                      if (d) {
                        break f;
                      }
                      J[3878] = J[3878] & Qg(c);
                      break b;
                    }
                    g: {
                      if (J[(g + 16) >> 2] == (a | 0)) {
                        J[(g + 16) >> 2] = d;
                        break g;
                      }
                      J[(g + 20) >> 2] = d;
                    }
                    if (!d) {
                      break b;
                    }
                  }
                  J[(d + 24) >> 2] = g;
                  c = J[(a + 16) >> 2];
                  if (c) {
                    J[(d + 16) >> 2] = c;
                    J[(c + 24) >> 2] = d;
                  }
                  c = J[(a + 20) >> 2];
                  if (!c) {
                    break b;
                  }
                  J[(d + 20) >> 2] = c;
                  J[(c + 24) >> 2] = d;
                }
                h: {
                  i: {
                    j: {
                      k: {
                        c = J[(f + 4) >> 2];
                        if (!(c & 2)) {
                          if (J[3883] == (f | 0)) {
                            J[3883] = a;
                            b = (J[3880] + b) | 0;
                            J[3880] = b;
                            J[(a + 4) >> 2] = b | 1;
                            if (J[3882] != (a | 0)) {
                              break a;
                            }
                            J[3879] = 0;
                            J[3882] = 0;
                            return;
                          }
                          i = J[3882];
                          if ((i | 0) == (f | 0)) {
                            J[3882] = a;
                            b = (J[3879] + b) | 0;
                            J[3879] = b;
                            J[(a + 4) >> 2] = b | 1;
                            J[(a + b) >> 2] = b;
                            return;
                          }
                          b = ((c & -8) + b) | 0;
                          d = J[(f + 12) >> 2];
                          if (c >>> 0 <= 255) {
                            e = J[(f + 8) >> 2];
                            if ((e | 0) == (d | 0)) {
                              J[3877] = J[3877] & Qg((c >>> 3) | 0);
                              break i;
                            }
                            J[(e + 12) >> 2] = d;
                            J[(d + 8) >> 2] = e;
                            break i;
                          }
                          g = J[(f + 24) >> 2];
                          if ((d | 0) != (f | 0)) {
                            c = J[(f + 8) >> 2];
                            J[(c + 12) >> 2] = d;
                            J[(d + 8) >> 2] = c;
                            break j;
                          }
                          e = J[(f + 20) >> 2];
                          if (e) {
                            c = (f + 20) | 0;
                          } else {
                            e = J[(f + 16) >> 2];
                            if (!e) {
                              break k;
                            }
                            c = (f + 16) | 0;
                          }
                          while (1) {
                            h = c;
                            d = e;
                            c = (d + 20) | 0;
                            e = J[(d + 20) >> 2];
                            if (e) {
                              continue;
                            }
                            c = (d + 16) | 0;
                            e = J[(d + 16) >> 2];
                            if (e) {
                              continue;
                            }
                            break;
                          }
                          J[h >> 2] = 0;
                          break j;
                        }
                        J[(f + 4) >> 2] = c & -2;
                        J[(a + 4) >> 2] = b | 1;
                        J[(a + b) >> 2] = b;
                        break h;
                      }
                      d = 0;
                    }
                    if (!g) {
                      break i;
                    }
                    c = J[(f + 28) >> 2];
                    e = c << 2;
                    l: {
                      if (J[(e + 15812) >> 2] == (f | 0)) {
                        J[(e + 15812) >> 2] = d;
                        if (d) {
                          break l;
                        }
                        J[3878] = J[3878] & Qg(c);
                        break i;
                      }
                      m: {
                        if (J[(g + 16) >> 2] == (f | 0)) {
                          J[(g + 16) >> 2] = d;
                          break m;
                        }
                        J[(g + 20) >> 2] = d;
                      }
                      if (!d) {
                        break i;
                      }
                    }
                    J[(d + 24) >> 2] = g;
                    c = J[(f + 16) >> 2];
                    if (c) {
                      J[(d + 16) >> 2] = c;
                      J[(c + 24) >> 2] = d;
                    }
                    c = J[(f + 20) >> 2];
                    if (!c) {
                      break i;
                    }
                    J[(d + 20) >> 2] = c;
                    J[(c + 24) >> 2] = d;
                  }
                  J[(a + 4) >> 2] = b | 1;
                  J[(a + b) >> 2] = b;
                  if ((a | 0) != (i | 0)) {
                    break h;
                  }
                  J[3879] = b;
                  return;
                }
                if (b >>> 0 <= 255) {
                  c = ((b & 248) + 15548) | 0;
                  d = J[3877];
                  b = 1 << (b >>> 3);
                  n: {
                    if (!(d & b)) {
                      J[3877] = b | d;
                      b = c;
                      break n;
                    }
                    b = J[(c + 8) >> 2];
                  }
                  J[(c + 8) >> 2] = a;
                  J[(b + 12) >> 2] = a;
                  J[(a + 12) >> 2] = c;
                  J[(a + 8) >> 2] = b;
                  return;
                }
                d = 31;
                if (b >>> 0 <= 16777215) {
                  c = S((b >>> 8) | 0);
                  d = (((((b >>> (38 - c)) & 1) - (c << 1)) | 0) + 62) | 0;
                }
                J[(a + 28) >> 2] = d;
                J[(a + 16) >> 2] = 0;
                J[(a + 20) >> 2] = 0;
                c = ((d << 2) + 15812) | 0;
                o: {
                  e = J[3878];
                  h = 1 << d;
                  p: {
                    if (!(e & h)) {
                      J[3878] = e | h;
                      J[c >> 2] = a;
                      J[(a + 24) >> 2] = c;
                      break p;
                    }
                    d = b << ((d | 0) != 31 ? (25 - ((d >>> 1) | 0)) | 0 : 0);
                    c = J[c >> 2];
                    while (1) {
                      e = c;
                      if ((J[(c + 4) >> 2] & -8) == (b | 0)) {
                        break o;
                      }
                      c = (d >>> 29) | 0;
                      d = d << 1;
                      h = (e + (c & 4)) | 0;
                      c = J[(h + 16) >> 2];
                      if (c) {
                        continue;
                      }
                      break;
                    }
                    J[(h + 16) >> 2] = a;
                    J[(a + 24) >> 2] = e;
                  }
                  J[(a + 12) >> 2] = a;
                  J[(a + 8) >> 2] = a;
                  return;
                }
                b = J[(e + 8) >> 2];
                J[(b + 12) >> 2] = a;
                J[(e + 8) >> 2] = a;
                J[(a + 24) >> 2] = 0;
                J[(a + 12) >> 2] = e;
                J[(a + 8) >> 2] = b;
              }
            }
            function Ca(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0;
              j = ((b << 4) + a) | 0;
              b = J[j >> 2];
              a: {
                if (!b) {
                  a = 0;
                  b = 0;
                  break a;
                }
                a = Oa(4);
                J[a >> 2] = b;
                b = (a + 4) | 0;
              }
              b: {
                c: {
                  d: {
                    g = J[(j + 4) >> 2];
                    e: {
                      if (!g) {
                        c = a;
                        e = b;
                        break e;
                      }
                      b = (b - a) | 0;
                      f = b >> 2;
                      c = (f + 1) | 0;
                      if (c >>> 0 > 1073741823) {
                        break d;
                      }
                      e = (b >>> 1) | 0;
                      d =
                        b >>> 0 >= 2147483644
                          ? 1073741823
                          : c >>> 0 < e >>> 0
                            ? e
                            : c;
                      if (d) {
                        if (d >>> 0 > 1073741823) {
                          break b;
                        }
                        e = Oa(d << 2);
                      } else {
                        e = 0;
                      }
                      h = (e + b) | 0;
                      J[h >> 2] = g;
                      c = (h - (f << 2)) | 0;
                      if (b) {
                        y(c, a, b);
                      }
                      b = (h + 4) | 0;
                      e = (e + (d << 2)) | 0;
                      if (!a) {
                        break e;
                      }
                      la(a);
                    }
                    h = J[(j + 8) >> 2];
                    f: {
                      if (h) {
                        if (b >>> 0 >= e >>> 0) {
                          b = (b - c) | 0;
                          f = b >> 2;
                          a = (f + 1) | 0;
                          if (a >>> 0 > 1073741823) {
                            break d;
                          }
                          e = (e - c) | 0;
                          d = e >> 1;
                          d =
                            e >>> 0 >= 2147483644
                              ? 1073741823
                              : a >>> 0 < d >>> 0
                                ? d
                                : a;
                          if (d) {
                            if (d >>> 0 > 1073741823) {
                              break b;
                            }
                            e = Oa(d << 2);
                          } else {
                            e = 0;
                          }
                          g = (e + b) | 0;
                          J[g >> 2] = h;
                          a = (g - (f << 2)) | 0;
                          if (b) {
                            y(a, c, b);
                          }
                          b = (g + 4) | 0;
                          e = (e + (d << 2)) | 0;
                          if (!c) {
                            break f;
                          }
                          la(c);
                          break f;
                        }
                        J[b >> 2] = h;
                        b = (b + 4) | 0;
                      }
                      a = c;
                    }
                    c = J[(j + 12) >> 2];
                    g: {
                      if (c) {
                        if (b >>> 0 >= e >>> 0) {
                          b = (b - a) | 0;
                          h = b >> 2;
                          d = (h + 1) | 0;
                          if (d >>> 0 > 1073741823) {
                            break d;
                          }
                          e = (e - a) | 0;
                          g = e >> 1;
                          e =
                            e >>> 0 >= 2147483644
                              ? 1073741823
                              : d >>> 0 < g >>> 0
                                ? g
                                : d;
                          if (e) {
                            if (e >>> 0 > 1073741823) {
                              break b;
                            }
                            e = Oa(e << 2);
                          } else {
                            e = 0;
                          }
                          d = (e + b) | 0;
                          J[d >> 2] = c;
                          e = (d - (h << 2)) | 0;
                          if (b) {
                            y(e, a, b);
                          }
                          b = (d + 4) | 0;
                          if (!a) {
                            break g;
                          }
                          la(a);
                          break g;
                        }
                        J[b >> 2] = c;
                        b = (b + 4) | 0;
                      }
                      e = a;
                    }
                    d = 0;
                    h = (b - e) >> 2;
                    if ((h | 0) <= 0) {
                      c = 0;
                      b = 0;
                      a = 0;
                      break c;
                    }
                    a = 0;
                    b = 0;
                    c = 0;
                    while (1) {
                      h: {
                        i: {
                          g = (d + 1) | 0;
                          if (g >>> 0 >= h >>> 0) {
                            break i;
                          }
                          f = J[((d << 2) + e) >> 2];
                          if ((f | 0) != J[((g << 2) + e) >> 2]) {
                            break i;
                          }
                          g = f << 1;
                          if (b >>> 0 < c >>> 0) {
                            J[b >> 2] = g;
                            b = (b + 4) | 0;
                            d = (d + 2) | 0;
                            break h;
                          }
                          b = (b - a) | 0;
                          k = b >> 2;
                          f = (k + 1) | 0;
                          if (f >>> 0 >= 1073741824) {
                            break d;
                          }
                          c = (c - a) | 0;
                          i = c >> 1;
                          f =
                            c >>> 0 >= 2147483644
                              ? 1073741823
                              : f >>> 0 < i >>> 0
                                ? i
                                : f;
                          if (f) {
                            if (f >>> 0 >= 1073741824) {
                              break b;
                            }
                            c = Oa(f << 2);
                          } else {
                            c = 0;
                          }
                          i = (c + b) | 0;
                          J[i >> 2] = g;
                          g = (i - (k << 2)) | 0;
                          if (b) {
                            y(g, a, b);
                          }
                          b = (i + 4) | 0;
                          c = (c + (f << 2)) | 0;
                          if (a) {
                            la(a);
                          }
                          a = g;
                          d = (d + 2) | 0;
                          break h;
                        }
                        d = ((d << 2) + e) | 0;
                        j: {
                          if (b >>> 0 < c >>> 0) {
                            J[b >> 2] = J[d >> 2];
                            b = (b + 4) | 0;
                            break j;
                          }
                          b = (b - a) | 0;
                          k = b >> 2;
                          f = (k + 1) | 0;
                          if (f >>> 0 >= 1073741824) {
                            break d;
                          }
                          c = (c - a) | 0;
                          i = c >> 1;
                          f =
                            c >>> 0 >= 2147483644
                              ? 1073741823
                              : f >>> 0 < i >>> 0
                                ? i
                                : f;
                          if (f) {
                            if (f >>> 0 >= 1073741824) {
                              break b;
                            }
                            c = Oa(f << 2);
                          } else {
                            c = 0;
                          }
                          i = (c + b) | 0;
                          J[i >> 2] = J[d >> 2];
                          d = (i - (k << 2)) | 0;
                          if (b) {
                            y(d, a, b);
                          }
                          b = (i + 4) | 0;
                          c = (c + (f << 2)) | 0;
                          if (a) {
                            la(a);
                          }
                          a = d;
                        }
                        d = g;
                      }
                      if ((h | 0) > (d | 0)) {
                        continue;
                      }
                      break;
                    }
                    break c;
                  }
                  fc(1197);
                  C();
                }
                d = (b - a) | 0;
                h = d >> 2;
                if (h >>> 0 < 4) {
                  while (1) {
                    k: {
                      if (b >>> 0 < c >>> 0) {
                        J[b >> 2] = 0;
                        b = (b + 4) | 0;
                        break k;
                      }
                      b = (c - a) | 0;
                      c = b >> 1;
                      g = (h + 1) | 0;
                      b =
                        b >>> 0 >= 2147483644
                          ? 1073741823
                          : c >>> 0 > g >>> 0
                            ? c
                            : g;
                      if (b >>> 0 >= 1073741824) {
                        break b;
                      }
                      c = b << 2;
                      g = Oa(c);
                      b = (g + d) | 0;
                      J[b >> 2] = 0;
                      h = (b - (h << 2)) | 0;
                      if (d) {
                        y(h, a, d);
                      }
                      c = (c + g) | 0;
                      b = (b + 4) | 0;
                      if (a) {
                        la(a);
                      }
                      a = h;
                    }
                    d = (b - a) | 0;
                    h = d >> 2;
                    if (h >>> 0 < 4) {
                      continue;
                    }
                    break;
                  }
                }
                J[j >> 2] = J[a >> 2];
                J[(j + 4) >> 2] = J[(a + 4) >> 2];
                J[(j + 8) >> 2] = J[(a + 8) >> 2];
                J[(j + 12) >> 2] = J[(a + 12) >> 2];
                la(a);
                if (e) {
                  la(e);
                }
                return;
              }
              a = lc(4);
              J[a >> 2] = 15008;
              J[a >> 2] = 14968;
              J[a >> 2] = 14988;
              _(a | 0, 15072, 2);
              C();
            }
            function Ld(a, b, c, d, e, f, g, h, i) {
              var j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0;
              j = (da - 128) | 0;
              da = j;
              a: {
                b: {
                  c: {
                    if (!Za(f, g, h, i, 0, 0, 0, 0)) {
                      break c;
                    }
                    k = i & 65535;
                    m = (i >>> 16) & 32767;
                    d: {
                      e: {
                        if ((m | 0) != 32767) {
                          n = 4;
                          if (m) {
                            break e;
                          }
                          n = f | h | (g | k) ? 3 : 2;
                          break d;
                        }
                        n = !(f | h | (g | k));
                      }
                    }
                    if (!n) {
                      break c;
                    }
                    s = (e >>> 16) | 0;
                    p = s & 32767;
                    if ((p | 0) != 32767) {
                      break b;
                    }
                  }
                  pa((j + 16) | 0, b, c, d, e, f, g, h, i);
                  b = J[(j + 16) >> 2];
                  d = J[(j + 20) >> 2];
                  e = J[(j + 24) >> 2];
                  c = J[(j + 28) >> 2];
                  Md(j, b, d, e, c, b, d, e, c);
                  d = J[(j + 8) >> 2];
                  e = J[(j + 12) >> 2];
                  h = J[j >> 2];
                  i = J[(j + 4) >> 2];
                  break a;
                }
                o = d;
                n = e & 2147483647;
                k = n;
                m = h;
                l = i & 2147483647;
                if ((Za(b, c, o, k, f, g, h, l) | 0) <= 0) {
                  if (Za(b, c, o, k, f, g, h, l)) {
                    h = b;
                    i = c;
                    break a;
                  }
                  pa((j + 112) | 0, b, c, d, e, 0, 0, 0, 0);
                  d = J[(j + 120) >> 2];
                  e = J[(j + 124) >> 2];
                  h = J[(j + 112) >> 2];
                  i = J[(j + 116) >> 2];
                  break a;
                }
                q = (i >>> 16) & 32767;
                if (p) {
                  i = c;
                  h = b;
                } else {
                  pa((j + 96) | 0, b, c, o, n, 0, 0, 0, 1081540608);
                  o = J[(j + 104) >> 2];
                  h = J[(j + 108) >> 2];
                  n = h;
                  p = (((h >>> 16) | 0) - 120) | 0;
                  i = J[(j + 100) >> 2];
                  h = J[(j + 96) >> 2];
                }
                if (!q) {
                  pa((j + 80) | 0, f, g, m, l, 0, 0, 0, 1081540608);
                  m = J[(j + 88) >> 2];
                  f = J[(j + 92) >> 2];
                  l = f;
                  q = (((f >>> 16) | 0) - 120) | 0;
                  g = J[(j + 84) >> 2];
                  f = J[(j + 80) >> 2];
                }
                r = m;
                t = (l & 65535) | 65536;
                n = (n & 65535) | 65536;
                if ((p | 0) > (q | 0)) {
                  while (1) {
                    l = (o - r) | 0;
                    k =
                      (((g | 0) == (i | 0)) & (f >>> 0 > h >>> 0)) |
                      (g >>> 0 > i >>> 0);
                    m = (l - k) | 0;
                    k =
                      (((n - (((o >>> 0 < r >>> 0) + t) | 0)) | 0) -
                        (k >>> 0 > l >>> 0)) |
                      0;
                    f: {
                      if (((k | 0) >= 0) | ((k | 0) > 0)) {
                        o = h;
                        h = (h - f) | 0;
                        i = (i - (((f >>> 0 > o >>> 0) + g) | 0)) | 0;
                        if (!(h | m | (i | k))) {
                          pa((j + 32) | 0, b, c, d, e, 0, 0, 0, 0);
                          d = J[(j + 40) >> 2];
                          e = J[(j + 44) >> 2];
                          h = J[(j + 32) >> 2];
                          i = J[(j + 36) >> 2];
                          break a;
                        }
                        k = (k << 1) | (m >>> 31);
                        o = (m << 1) | (i >>> 31);
                        break f;
                      }
                      k = (n << 1) | (o >>> 31);
                      o = (o << 1) | (i >>> 31);
                    }
                    n = k;
                    k = (i << 1) | (h >>> 31);
                    h = h << 1;
                    i = k;
                    p = (p - 1) | 0;
                    if ((q | 0) < (p | 0)) {
                      continue;
                    }
                    break;
                  }
                  p = q;
                }
                l = (o - r) | 0;
                k =
                  (((g | 0) == (i | 0)) & (f >>> 0 > h >>> 0)) |
                  (g >>> 0 > i >>> 0);
                m = (l - k) | 0;
                k =
                  (((n - (((o >>> 0 < r >>> 0) + t) | 0)) | 0) -
                    (k >>> 0 > l >>> 0)) |
                  0;
                l = k;
                g: {
                  if ((k | 0) < 0) {
                    m = o;
                    l = n;
                    break g;
                  }
                  o = h;
                  h = (h - f) | 0;
                  i = (i - (((f >>> 0 > o >>> 0) + g) | 0)) | 0;
                  if (h | m | (i | l)) {
                    break g;
                  }
                  pa((j + 48) | 0, b, c, d, e, 0, 0, 0, 0);
                  d = J[(j + 56) >> 2];
                  e = J[(j + 60) >> 2];
                  h = J[(j + 48) >> 2];
                  i = J[(j + 52) >> 2];
                  break a;
                }
                if (((l | 0) == 65535) | (l >>> 0 < 65535)) {
                  while (1) {
                    b = (i >>> 31) | 0;
                    p = (p - 1) | 0;
                    n = (i << 1) | (h >>> 31);
                    h = h << 1;
                    i = n;
                    c = b;
                    b = (l << 1) | (m >>> 31);
                    m = c | (m << 1);
                    l = b;
                    if (b >>> 0 < 65536) {
                      continue;
                    }
                    break;
                  }
                }
                b = s & 32768;
                if ((p | 0) <= 0) {
                  pa(
                    (j - -64) | 0,
                    h,
                    i,
                    m,
                    (l & 65535) | ((b | (p + 120)) << 16),
                    0,
                    0,
                    0,
                    1065811968,
                  );
                  d = J[(j + 72) >> 2];
                  e = J[(j + 76) >> 2];
                  h = J[(j + 64) >> 2];
                  i = J[(j + 68) >> 2];
                  break a;
                }
                d = m;
                e = (l & 65535) | ((b | p) << 16);
              }
              J[a >> 2] = h;
              J[(a + 4) >> 2] = i;
              J[(a + 8) >> 2] = d;
              J[(a + 12) >> 2] = e;
              da = (j + 128) | 0;
            }
            function Cd(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;
              if (!a) {
                return La(b);
              }
              if (b >>> 0 >= 4294967232) {
                J[3876] = 48;
                return 0;
              }
              g = b >>> 0 < 11 ? 16 : (b + 11) & -8;
              i = (a - 8) | 0;
              j = J[(i + 4) >> 2];
              e = j & -8;
              a: {
                if (!(j & 3)) {
                  if (g >>> 0 < 256) {
                    break a;
                  }
                  if (e >>> 0 >= (g + 4) >>> 0) {
                    c = i;
                    if ((e - g) >>> 0 <= (J[3997] << 1) >>> 0) {
                      break a;
                    }
                  }
                  c = 0;
                  break a;
                }
                h = (e + i) | 0;
                b: {
                  if (e >>> 0 >= g >>> 0) {
                    d = (e - g) | 0;
                    if (d >>> 0 < 16) {
                      break b;
                    }
                    J[(i + 4) >> 2] = (j & 1) | g | 2;
                    c = (g + i) | 0;
                    J[(c + 4) >> 2] = d | 3;
                    J[(h + 4) >> 2] = J[(h + 4) >> 2] | 1;
                    Ad(c, d);
                    break b;
                  }
                  if (J[3883] == (h | 0)) {
                    e = (e + J[3880]) | 0;
                    if (e >>> 0 <= g >>> 0) {
                      break a;
                    }
                    J[(i + 4) >> 2] = (j & 1) | g | 2;
                    d = (g + i) | 0;
                    c = (e - g) | 0;
                    J[(d + 4) >> 2] = c | 1;
                    J[3880] = c;
                    J[3883] = d;
                    break b;
                  }
                  if (J[3882] == (h | 0)) {
                    e = (e + J[3879]) | 0;
                    if (e >>> 0 < g >>> 0) {
                      break a;
                    }
                    c = (e - g) | 0;
                    c: {
                      if (c >>> 0 >= 16) {
                        J[(i + 4) >> 2] = (j & 1) | g | 2;
                        d = (g + i) | 0;
                        J[(d + 4) >> 2] = c | 1;
                        e = (e + i) | 0;
                        J[e >> 2] = c;
                        J[(e + 4) >> 2] = J[(e + 4) >> 2] & -2;
                        break c;
                      }
                      J[(i + 4) >> 2] = e | (j & 1) | 2;
                      c = (e + i) | 0;
                      J[(c + 4) >> 2] = J[(c + 4) >> 2] | 1;
                      c = 0;
                    }
                    J[3882] = d;
                    J[3879] = c;
                    break b;
                  }
                  d = J[(h + 4) >> 2];
                  if (d & 2) {
                    break a;
                  }
                  k = (e + (d & -8)) | 0;
                  if (k >>> 0 < g >>> 0) {
                    break a;
                  }
                  m = (k - g) | 0;
                  f = J[(h + 12) >> 2];
                  d: {
                    if (d >>> 0 <= 255) {
                      c = J[(h + 8) >> 2];
                      if ((c | 0) == (f | 0)) {
                        J[3877] = J[3877] & Qg((d >>> 3) | 0);
                        break d;
                      }
                      J[(c + 12) >> 2] = f;
                      J[(f + 8) >> 2] = c;
                      break d;
                    }
                    l = J[(h + 24) >> 2];
                    e: {
                      if ((f | 0) != (h | 0)) {
                        c = J[(h + 8) >> 2];
                        J[(c + 12) >> 2] = f;
                        J[(f + 8) >> 2] = c;
                        break e;
                      }
                      f: {
                        c = J[(h + 20) >> 2];
                        if (c) {
                          d = (h + 20) | 0;
                        } else {
                          c = J[(h + 16) >> 2];
                          if (!c) {
                            break f;
                          }
                          d = (h + 16) | 0;
                        }
                        while (1) {
                          e = d;
                          f = c;
                          d = (c + 20) | 0;
                          c = J[(c + 20) >> 2];
                          if (c) {
                            continue;
                          }
                          d = (f + 16) | 0;
                          c = J[(f + 16) >> 2];
                          if (c) {
                            continue;
                          }
                          break;
                        }
                        J[e >> 2] = 0;
                        break e;
                      }
                      f = 0;
                    }
                    if (!l) {
                      break d;
                    }
                    d = J[(h + 28) >> 2];
                    c = d << 2;
                    g: {
                      if (J[(c + 15812) >> 2] == (h | 0)) {
                        J[(c + 15812) >> 2] = f;
                        if (f) {
                          break g;
                        }
                        J[3878] = J[3878] & Qg(d);
                        break d;
                      }
                      h: {
                        if (J[(l + 16) >> 2] == (h | 0)) {
                          J[(l + 16) >> 2] = f;
                          break h;
                        }
                        J[(l + 20) >> 2] = f;
                      }
                      if (!f) {
                        break d;
                      }
                    }
                    J[(f + 24) >> 2] = l;
                    c = J[(h + 16) >> 2];
                    if (c) {
                      J[(f + 16) >> 2] = c;
                      J[(c + 24) >> 2] = f;
                    }
                    c = J[(h + 20) >> 2];
                    if (!c) {
                      break d;
                    }
                    J[(f + 20) >> 2] = c;
                    J[(c + 24) >> 2] = f;
                  }
                  if (m >>> 0 <= 15) {
                    J[(i + 4) >> 2] = (j & 1) | k | 2;
                    c = (i + k) | 0;
                    J[(c + 4) >> 2] = J[(c + 4) >> 2] | 1;
                    break b;
                  }
                  J[(i + 4) >> 2] = (j & 1) | g | 2;
                  d = (g + i) | 0;
                  J[(d + 4) >> 2] = m | 3;
                  c = (i + k) | 0;
                  J[(c + 4) >> 2] = J[(c + 4) >> 2] | 1;
                  Ad(d, m);
                }
                c = i;
              }
              if (c) {
                return (c + 8) | 0;
              }
              d = La(b);
              if (!d) {
                return 0;
              }
              c = J[(a - 4) >> 2];
              c = ((c & 3 ? -4 : -8) + (c & -8)) | 0;
              eb(d, a, b >>> 0 > c >>> 0 ? c : b);
              la(a);
              return d;
            }
            function wg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 272) | 0;
              da = a;
              J[(a + 264) >> 2] = c;
              J[(a + 268) >> 2] = b;
              Xb((a + 208) | 0, d, (a + 224) | 0, (a + 223) | 0, (a + 222) | 0);
              b = (a + 196) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 192) >> 2] = c;
              J[(a + 28) >> 2] = a + 32;
              J[(a + 24) >> 2] = 0;
              H[(a + 23) | 0] = 1;
              H[(a + 22) | 0] = 69;
              d = 0;
              while (1) {
                a: {
                  b: {
                    c: {
                      d: {
                        if (qa((a + 268) | 0, (a + 264) | 0)) {
                          break d;
                        }
                        h = J[(a + 192) >> 2];
                        if ((K[(b + 11) | 0] >>> 7) | 0) {
                          g = J[(b + 4) >> 2];
                        } else {
                          g = K[(b + 11) | 0] & 127;
                        }
                        if ((h | 0) == ((g + c) | 0)) {
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[(b + 4) >> 2];
                          } else {
                            c = K[(b + 11) | 0] & 127;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            g = J[(b + 4) >> 2];
                          } else {
                            g = K[(b + 11) | 0] & 127;
                          }
                          ka(b, g << 1);
                          ka(
                            b,
                            (K[(b + 11) | 0] >>> 7) | 0
                              ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                              : 10,
                          );
                          g = c;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[b >> 2];
                          } else {
                            c = b;
                          }
                          J[(a + 192) >> 2] = g + c;
                        }
                        g = J[(a + 268) >> 2];
                        h = J[(g + 12) >> 2];
                        e: {
                          if ((h | 0) == J[(g + 16) >> 2]) {
                            g = fa[J[(J[g >> 2] + 36) >> 2]](g) | 0;
                            break e;
                          }
                          g = H[h | 0];
                        }
                        if (
                          Wb(
                            (g << 24) >> 24,
                            (a + 23) | 0,
                            (a + 22) | 0,
                            c,
                            (a + 192) | 0,
                            H[(a + 223) | 0],
                            H[(a + 222) | 0],
                            (a + 208) | 0,
                            (a + 32) | 0,
                            (a + 28) | 0,
                            (a + 24) | 0,
                            (a + 224) | 0,
                          )
                        ) {
                          break d;
                        }
                        if (d) {
                          break c;
                        }
                        d = 0;
                        h = (J[(a + 192) >> 2] - c) | 0;
                        if ((h | 0) <= 0) {
                          break b;
                        }
                        f: {
                          g: {
                            g = K[c | 0];
                            i = (g - 43) | 0;
                            switch (i | 0) {
                              case 0:
                              case 2:
                                break f;
                              default:
                                break g;
                            }
                          }
                          if ((g | 0) == 46) {
                            break c;
                          }
                          d = 1;
                          if (((g - 48) & 255) >>> 0 < 10) {
                            break b;
                          }
                          break d;
                        }
                        if ((h | 0) == 1) {
                          break b;
                        }
                        h: {
                          switch (i | 0) {
                            case 0:
                            case 2:
                              break h;
                            default:
                              break b;
                          }
                        }
                        g = K[(c + 1) | 0];
                        if ((g | 0) == 46) {
                          break c;
                        }
                        d = 1;
                        if (((g - 48) & 255) >>> 0 <= 9) {
                          break b;
                        }
                      }
                      if ((K[(a + 219) | 0] >>> 7) | 0) {
                        d = J[(a + 212) >> 2];
                      } else {
                        d = K[(a + 219) | 0] & 127;
                      }
                      i: {
                        if (!d | !(H[(a + 23) | 0] & 1)) {
                          break i;
                        }
                        d = J[(a + 28) >> 2];
                        if (((d - ((a + 32) | 0)) | 0) > 159) {
                          break i;
                        }
                        J[(a + 28) >> 2] = d + 4;
                        J[d >> 2] = J[(a + 24) >> 2];
                      }
                      sd(a, c, J[(a + 192) >> 2], e);
                      c = J[a >> 2];
                      d = J[(a + 4) >> 2];
                      g = J[(a + 12) >> 2];
                      J[(f + 8) >> 2] = J[(a + 8) >> 2];
                      J[(f + 12) >> 2] = g;
                      J[f >> 2] = c;
                      J[(f + 4) >> 2] = d;
                      Da((a + 208) | 0, (a + 32) | 0, J[(a + 28) >> 2], e);
                      if (qa((a + 268) | 0, (a + 264) | 0)) {
                        J[e >> 2] = J[e >> 2] | 2;
                      }
                      c = J[(a + 268) >> 2];
                      ja(b);
                      ja((a + 208) | 0);
                      da = (a + 272) | 0;
                      break a;
                    }
                    d = 1;
                  }
                  Ba((a + 268) | 0);
                  continue;
                }
                break;
              }
              return c | 0;
            }
            function ng(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 368) | 0;
              da = a;
              J[(a + 360) >> 2] = c;
              J[(a + 364) >> 2] = b;
              Tb((a + 220) | 0, d, (a + 240) | 0, (a + 236) | 0, (a + 232) | 0);
              b = (a + 208) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 204) >> 2] = c;
              J[(a + 28) >> 2] = a + 32;
              J[(a + 24) >> 2] = 0;
              H[(a + 23) | 0] = 1;
              H[(a + 22) | 0] = 69;
              d = 0;
              while (1) {
                a: {
                  b: {
                    c: {
                      d: {
                        if (ua((a + 364) | 0, (a + 360) | 0)) {
                          break d;
                        }
                        h = J[(a + 204) >> 2];
                        if ((K[(b + 11) | 0] >>> 7) | 0) {
                          g = J[(b + 4) >> 2];
                        } else {
                          g = K[(b + 11) | 0] & 127;
                        }
                        if ((h | 0) == ((g + c) | 0)) {
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[(b + 4) >> 2];
                          } else {
                            c = K[(b + 11) | 0] & 127;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            g = J[(b + 4) >> 2];
                          } else {
                            g = K[(b + 11) | 0] & 127;
                          }
                          ka(b, g << 1);
                          ka(
                            b,
                            (K[(b + 11) | 0] >>> 7) | 0
                              ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                              : 10,
                          );
                          g = c;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[b >> 2];
                          } else {
                            c = b;
                          }
                          J[(a + 204) >> 2] = g + c;
                        }
                        g = J[(a + 364) >> 2];
                        h = J[(g + 12) >> 2];
                        e: {
                          if ((h | 0) == J[(g + 16) >> 2]) {
                            g = fa[J[(J[g >> 2] + 36) >> 2]](g) | 0;
                            break e;
                          }
                          g = J[h >> 2];
                        }
                        if (
                          Sb(
                            g,
                            (a + 23) | 0,
                            (a + 22) | 0,
                            c,
                            (a + 204) | 0,
                            J[(a + 236) >> 2],
                            J[(a + 232) >> 2],
                            (a + 220) | 0,
                            (a + 32) | 0,
                            (a + 28) | 0,
                            (a + 24) | 0,
                            (a + 240) | 0,
                          )
                        ) {
                          break d;
                        }
                        if (d) {
                          break c;
                        }
                        d = 0;
                        h = (J[(a + 204) >> 2] - c) | 0;
                        if ((h | 0) <= 0) {
                          break b;
                        }
                        f: {
                          g: {
                            g = K[c | 0];
                            i = (g - 43) | 0;
                            switch (i | 0) {
                              case 0:
                              case 2:
                                break f;
                              default:
                                break g;
                            }
                          }
                          if ((g | 0) == 46) {
                            break c;
                          }
                          d = 1;
                          if (((g - 48) & 255) >>> 0 < 10) {
                            break b;
                          }
                          break d;
                        }
                        if ((h | 0) == 1) {
                          break b;
                        }
                        h: {
                          switch (i | 0) {
                            case 0:
                            case 2:
                              break h;
                            default:
                              break b;
                          }
                        }
                        g = K[(c + 1) | 0];
                        if ((g | 0) == 46) {
                          break c;
                        }
                        d = 1;
                        if (((g - 48) & 255) >>> 0 <= 9) {
                          break b;
                        }
                      }
                      if ((K[(a + 231) | 0] >>> 7) | 0) {
                        d = J[(a + 224) >> 2];
                      } else {
                        d = K[(a + 231) | 0] & 127;
                      }
                      i: {
                        if (!d | !(H[(a + 23) | 0] & 1)) {
                          break i;
                        }
                        d = J[(a + 28) >> 2];
                        if (((d - ((a + 32) | 0)) | 0) > 159) {
                          break i;
                        }
                        J[(a + 28) >> 2] = d + 4;
                        J[d >> 2] = J[(a + 24) >> 2];
                      }
                      sd(a, c, J[(a + 204) >> 2], e);
                      c = J[a >> 2];
                      d = J[(a + 4) >> 2];
                      g = J[(a + 12) >> 2];
                      J[(f + 8) >> 2] = J[(a + 8) >> 2];
                      J[(f + 12) >> 2] = g;
                      J[f >> 2] = c;
                      J[(f + 4) >> 2] = d;
                      Da((a + 220) | 0, (a + 32) | 0, J[(a + 28) >> 2], e);
                      if (ua((a + 364) | 0, (a + 360) | 0)) {
                        J[e >> 2] = J[e >> 2] | 2;
                      }
                      c = J[(a + 364) >> 2];
                      ja(b);
                      ja((a + 220) | 0);
                      da = (a + 368) | 0;
                      break a;
                    }
                    d = 1;
                  }
                  Ga((a + 364) | 0);
                  continue;
                }
                break;
              }
              return c | 0;
            }
            function yg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 256) | 0;
              da = a;
              J[(a + 248) >> 2] = c;
              J[(a + 252) >> 2] = b;
              Xb((a + 192) | 0, d, (a + 208) | 0, (a + 207) | 0, (a + 206) | 0);
              b = (a + 180) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 176) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              H[(a + 7) | 0] = 1;
              H[(a + 6) | 0] = 69;
              d = 0;
              while (1) {
                a: {
                  b: {
                    c: {
                      d: {
                        if (qa((a + 252) | 0, (a + 248) | 0)) {
                          break d;
                        }
                        h = J[(a + 176) >> 2];
                        if ((K[(b + 11) | 0] >>> 7) | 0) {
                          g = J[(b + 4) >> 2];
                        } else {
                          g = K[(b + 11) | 0] & 127;
                        }
                        if ((h | 0) == ((g + c) | 0)) {
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[(b + 4) >> 2];
                          } else {
                            c = K[(b + 11) | 0] & 127;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            g = J[(b + 4) >> 2];
                          } else {
                            g = K[(b + 11) | 0] & 127;
                          }
                          ka(b, g << 1);
                          ka(
                            b,
                            (K[(b + 11) | 0] >>> 7) | 0
                              ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                              : 10,
                          );
                          g = c;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[b >> 2];
                          } else {
                            c = b;
                          }
                          J[(a + 176) >> 2] = g + c;
                        }
                        g = J[(a + 252) >> 2];
                        h = J[(g + 12) >> 2];
                        e: {
                          if ((h | 0) == J[(g + 16) >> 2]) {
                            g = fa[J[(J[g >> 2] + 36) >> 2]](g) | 0;
                            break e;
                          }
                          g = H[h | 0];
                        }
                        if (
                          Wb(
                            (g << 24) >> 24,
                            (a + 7) | 0,
                            (a + 6) | 0,
                            c,
                            (a + 176) | 0,
                            H[(a + 207) | 0],
                            H[(a + 206) | 0],
                            (a + 192) | 0,
                            (a + 16) | 0,
                            (a + 12) | 0,
                            (a + 8) | 0,
                            (a + 208) | 0,
                          )
                        ) {
                          break d;
                        }
                        if (d) {
                          break c;
                        }
                        d = 0;
                        h = (J[(a + 176) >> 2] - c) | 0;
                        if ((h | 0) <= 0) {
                          break b;
                        }
                        f: {
                          g: {
                            g = K[c | 0];
                            i = (g - 43) | 0;
                            switch (i | 0) {
                              case 0:
                              case 2:
                                break f;
                              default:
                                break g;
                            }
                          }
                          if ((g | 0) == 46) {
                            break c;
                          }
                          d = 1;
                          if (((g - 48) & 255) >>> 0 < 10) {
                            break b;
                          }
                          break d;
                        }
                        if ((h | 0) == 1) {
                          break b;
                        }
                        h: {
                          switch (i | 0) {
                            case 0:
                            case 2:
                              break h;
                            default:
                              break b;
                          }
                        }
                        g = K[(c + 1) | 0];
                        if ((g | 0) == 46) {
                          break c;
                        }
                        d = 1;
                        if (((g - 48) & 255) >>> 0 <= 9) {
                          break b;
                        }
                      }
                      if ((K[(a + 203) | 0] >>> 7) | 0) {
                        d = J[(a + 196) >> 2];
                      } else {
                        d = K[(a + 203) | 0] & 127;
                      }
                      i: {
                        if (!d | !(H[(a + 7) | 0] & 1)) {
                          break i;
                        }
                        d = J[(a + 12) >> 2];
                        if (((d - ((a + 16) | 0)) | 0) > 159) {
                          break i;
                        }
                        J[(a + 12) >> 2] = d + 4;
                        J[d >> 2] = J[(a + 8) >> 2];
                      }
                      N[f >> 2] = ud(c, J[(a + 176) >> 2], e);
                      Da((a + 192) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
                      if (qa((a + 252) | 0, (a + 248) | 0)) {
                        J[e >> 2] = J[e >> 2] | 2;
                      }
                      c = J[(a + 252) >> 2];
                      ja(b);
                      ja((a + 192) | 0);
                      da = (a + 256) | 0;
                      break a;
                    }
                    d = 1;
                  }
                  Ba((a + 252) | 0);
                  continue;
                }
                break;
              }
              return c | 0;
            }
            function xg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 256) | 0;
              da = a;
              J[(a + 248) >> 2] = c;
              J[(a + 252) >> 2] = b;
              Xb((a + 192) | 0, d, (a + 208) | 0, (a + 207) | 0, (a + 206) | 0);
              b = (a + 180) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 176) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              H[(a + 7) | 0] = 1;
              H[(a + 6) | 0] = 69;
              d = 0;
              while (1) {
                a: {
                  b: {
                    c: {
                      d: {
                        if (qa((a + 252) | 0, (a + 248) | 0)) {
                          break d;
                        }
                        h = J[(a + 176) >> 2];
                        if ((K[(b + 11) | 0] >>> 7) | 0) {
                          g = J[(b + 4) >> 2];
                        } else {
                          g = K[(b + 11) | 0] & 127;
                        }
                        if ((h | 0) == ((g + c) | 0)) {
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[(b + 4) >> 2];
                          } else {
                            c = K[(b + 11) | 0] & 127;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            g = J[(b + 4) >> 2];
                          } else {
                            g = K[(b + 11) | 0] & 127;
                          }
                          ka(b, g << 1);
                          ka(
                            b,
                            (K[(b + 11) | 0] >>> 7) | 0
                              ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                              : 10,
                          );
                          g = c;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[b >> 2];
                          } else {
                            c = b;
                          }
                          J[(a + 176) >> 2] = g + c;
                        }
                        g = J[(a + 252) >> 2];
                        h = J[(g + 12) >> 2];
                        e: {
                          if ((h | 0) == J[(g + 16) >> 2]) {
                            g = fa[J[(J[g >> 2] + 36) >> 2]](g) | 0;
                            break e;
                          }
                          g = H[h | 0];
                        }
                        if (
                          Wb(
                            (g << 24) >> 24,
                            (a + 7) | 0,
                            (a + 6) | 0,
                            c,
                            (a + 176) | 0,
                            H[(a + 207) | 0],
                            H[(a + 206) | 0],
                            (a + 192) | 0,
                            (a + 16) | 0,
                            (a + 12) | 0,
                            (a + 8) | 0,
                            (a + 208) | 0,
                          )
                        ) {
                          break d;
                        }
                        if (d) {
                          break c;
                        }
                        d = 0;
                        h = (J[(a + 176) >> 2] - c) | 0;
                        if ((h | 0) <= 0) {
                          break b;
                        }
                        f: {
                          g: {
                            g = K[c | 0];
                            i = (g - 43) | 0;
                            switch (i | 0) {
                              case 0:
                              case 2:
                                break f;
                              default:
                                break g;
                            }
                          }
                          if ((g | 0) == 46) {
                            break c;
                          }
                          d = 1;
                          if (((g - 48) & 255) >>> 0 < 10) {
                            break b;
                          }
                          break d;
                        }
                        if ((h | 0) == 1) {
                          break b;
                        }
                        h: {
                          switch (i | 0) {
                            case 0:
                            case 2:
                              break h;
                            default:
                              break b;
                          }
                        }
                        g = K[(c + 1) | 0];
                        if ((g | 0) == 46) {
                          break c;
                        }
                        d = 1;
                        if (((g - 48) & 255) >>> 0 <= 9) {
                          break b;
                        }
                      }
                      if ((K[(a + 203) | 0] >>> 7) | 0) {
                        d = J[(a + 196) >> 2];
                      } else {
                        d = K[(a + 203) | 0] & 127;
                      }
                      i: {
                        if (!d | !(H[(a + 7) | 0] & 1)) {
                          break i;
                        }
                        d = J[(a + 12) >> 2];
                        if (((d - ((a + 16) | 0)) | 0) > 159) {
                          break i;
                        }
                        J[(a + 12) >> 2] = d + 4;
                        J[d >> 2] = J[(a + 8) >> 2];
                      }
                      O[f >> 3] = td(c, J[(a + 176) >> 2], e);
                      Da((a + 192) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
                      if (qa((a + 252) | 0, (a + 248) | 0)) {
                        J[e >> 2] = J[e >> 2] | 2;
                      }
                      c = J[(a + 252) >> 2];
                      ja(b);
                      ja((a + 192) | 0);
                      da = (a + 256) | 0;
                      break a;
                    }
                    d = 1;
                  }
                  Ba((a + 252) | 0);
                  continue;
                }
                break;
              }
              return c | 0;
            }
            function pg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 352) | 0;
              da = a;
              J[(a + 344) >> 2] = c;
              J[(a + 348) >> 2] = b;
              Tb((a + 204) | 0, d, (a + 224) | 0, (a + 220) | 0, (a + 216) | 0);
              b = (a + 192) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 188) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              H[(a + 7) | 0] = 1;
              H[(a + 6) | 0] = 69;
              d = 0;
              while (1) {
                a: {
                  b: {
                    c: {
                      d: {
                        if (ua((a + 348) | 0, (a + 344) | 0)) {
                          break d;
                        }
                        h = J[(a + 188) >> 2];
                        if ((K[(b + 11) | 0] >>> 7) | 0) {
                          g = J[(b + 4) >> 2];
                        } else {
                          g = K[(b + 11) | 0] & 127;
                        }
                        if ((h | 0) == ((g + c) | 0)) {
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[(b + 4) >> 2];
                          } else {
                            c = K[(b + 11) | 0] & 127;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            g = J[(b + 4) >> 2];
                          } else {
                            g = K[(b + 11) | 0] & 127;
                          }
                          ka(b, g << 1);
                          ka(
                            b,
                            (K[(b + 11) | 0] >>> 7) | 0
                              ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                              : 10,
                          );
                          g = c;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[b >> 2];
                          } else {
                            c = b;
                          }
                          J[(a + 188) >> 2] = g + c;
                        }
                        g = J[(a + 348) >> 2];
                        h = J[(g + 12) >> 2];
                        e: {
                          if ((h | 0) == J[(g + 16) >> 2]) {
                            g = fa[J[(J[g >> 2] + 36) >> 2]](g) | 0;
                            break e;
                          }
                          g = J[h >> 2];
                        }
                        if (
                          Sb(
                            g,
                            (a + 7) | 0,
                            (a + 6) | 0,
                            c,
                            (a + 188) | 0,
                            J[(a + 220) >> 2],
                            J[(a + 216) >> 2],
                            (a + 204) | 0,
                            (a + 16) | 0,
                            (a + 12) | 0,
                            (a + 8) | 0,
                            (a + 224) | 0,
                          )
                        ) {
                          break d;
                        }
                        if (d) {
                          break c;
                        }
                        d = 0;
                        h = (J[(a + 188) >> 2] - c) | 0;
                        if ((h | 0) <= 0) {
                          break b;
                        }
                        f: {
                          g: {
                            g = K[c | 0];
                            i = (g - 43) | 0;
                            switch (i | 0) {
                              case 0:
                              case 2:
                                break f;
                              default:
                                break g;
                            }
                          }
                          if ((g | 0) == 46) {
                            break c;
                          }
                          d = 1;
                          if (((g - 48) & 255) >>> 0 < 10) {
                            break b;
                          }
                          break d;
                        }
                        if ((h | 0) == 1) {
                          break b;
                        }
                        h: {
                          switch (i | 0) {
                            case 0:
                            case 2:
                              break h;
                            default:
                              break b;
                          }
                        }
                        g = K[(c + 1) | 0];
                        if ((g | 0) == 46) {
                          break c;
                        }
                        d = 1;
                        if (((g - 48) & 255) >>> 0 <= 9) {
                          break b;
                        }
                      }
                      if ((K[(a + 215) | 0] >>> 7) | 0) {
                        d = J[(a + 208) >> 2];
                      } else {
                        d = K[(a + 215) | 0] & 127;
                      }
                      i: {
                        if (!d | !(H[(a + 7) | 0] & 1)) {
                          break i;
                        }
                        d = J[(a + 12) >> 2];
                        if (((d - ((a + 16) | 0)) | 0) > 159) {
                          break i;
                        }
                        J[(a + 12) >> 2] = d + 4;
                        J[d >> 2] = J[(a + 8) >> 2];
                      }
                      N[f >> 2] = ud(c, J[(a + 188) >> 2], e);
                      Da((a + 204) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
                      if (ua((a + 348) | 0, (a + 344) | 0)) {
                        J[e >> 2] = J[e >> 2] | 2;
                      }
                      c = J[(a + 348) >> 2];
                      ja(b);
                      ja((a + 204) | 0);
                      da = (a + 352) | 0;
                      break a;
                    }
                    d = 1;
                  }
                  Ga((a + 348) | 0);
                  continue;
                }
                break;
              }
              return c | 0;
            }
            function og(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 352) | 0;
              da = a;
              J[(a + 344) >> 2] = c;
              J[(a + 348) >> 2] = b;
              Tb((a + 204) | 0, d, (a + 224) | 0, (a + 220) | 0, (a + 216) | 0);
              b = (a + 192) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 188) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              H[(a + 7) | 0] = 1;
              H[(a + 6) | 0] = 69;
              d = 0;
              while (1) {
                a: {
                  b: {
                    c: {
                      d: {
                        if (ua((a + 348) | 0, (a + 344) | 0)) {
                          break d;
                        }
                        h = J[(a + 188) >> 2];
                        if ((K[(b + 11) | 0] >>> 7) | 0) {
                          g = J[(b + 4) >> 2];
                        } else {
                          g = K[(b + 11) | 0] & 127;
                        }
                        if ((h | 0) == ((g + c) | 0)) {
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[(b + 4) >> 2];
                          } else {
                            c = K[(b + 11) | 0] & 127;
                          }
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            g = J[(b + 4) >> 2];
                          } else {
                            g = K[(b + 11) | 0] & 127;
                          }
                          ka(b, g << 1);
                          ka(
                            b,
                            (K[(b + 11) | 0] >>> 7) | 0
                              ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                              : 10,
                          );
                          g = c;
                          if ((K[(b + 11) | 0] >>> 7) | 0) {
                            c = J[b >> 2];
                          } else {
                            c = b;
                          }
                          J[(a + 188) >> 2] = g + c;
                        }
                        g = J[(a + 348) >> 2];
                        h = J[(g + 12) >> 2];
                        e: {
                          if ((h | 0) == J[(g + 16) >> 2]) {
                            g = fa[J[(J[g >> 2] + 36) >> 2]](g) | 0;
                            break e;
                          }
                          g = J[h >> 2];
                        }
                        if (
                          Sb(
                            g,
                            (a + 7) | 0,
                            (a + 6) | 0,
                            c,
                            (a + 188) | 0,
                            J[(a + 220) >> 2],
                            J[(a + 216) >> 2],
                            (a + 204) | 0,
                            (a + 16) | 0,
                            (a + 12) | 0,
                            (a + 8) | 0,
                            (a + 224) | 0,
                          )
                        ) {
                          break d;
                        }
                        if (d) {
                          break c;
                        }
                        d = 0;
                        h = (J[(a + 188) >> 2] - c) | 0;
                        if ((h | 0) <= 0) {
                          break b;
                        }
                        f: {
                          g: {
                            g = K[c | 0];
                            i = (g - 43) | 0;
                            switch (i | 0) {
                              case 0:
                              case 2:
                                break f;
                              default:
                                break g;
                            }
                          }
                          if ((g | 0) == 46) {
                            break c;
                          }
                          d = 1;
                          if (((g - 48) & 255) >>> 0 < 10) {
                            break b;
                          }
                          break d;
                        }
                        if ((h | 0) == 1) {
                          break b;
                        }
                        h: {
                          switch (i | 0) {
                            case 0:
                            case 2:
                              break h;
                            default:
                              break b;
                          }
                        }
                        g = K[(c + 1) | 0];
                        if ((g | 0) == 46) {
                          break c;
                        }
                        d = 1;
                        if (((g - 48) & 255) >>> 0 <= 9) {
                          break b;
                        }
                      }
                      if ((K[(a + 215) | 0] >>> 7) | 0) {
                        d = J[(a + 208) >> 2];
                      } else {
                        d = K[(a + 215) | 0] & 127;
                      }
                      i: {
                        if (!d | !(H[(a + 7) | 0] & 1)) {
                          break i;
                        }
                        d = J[(a + 12) >> 2];
                        if (((d - ((a + 16) | 0)) | 0) > 159) {
                          break i;
                        }
                        J[(a + 12) >> 2] = d + 4;
                        J[d >> 2] = J[(a + 8) >> 2];
                      }
                      O[f >> 3] = td(c, J[(a + 188) >> 2], e);
                      Da((a + 204) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
                      if (ua((a + 348) | 0, (a + 344) | 0)) {
                        J[e >> 2] = J[e >> 2] | 2;
                      }
                      c = J[(a + 348) >> 2];
                      ja(b);
                      ja((a + 204) | 0);
                      da = (a + 352) | 0;
                      break a;
                    }
                    d = 1;
                  }
                  Ga((a + 348) | 0);
                  continue;
                }
                break;
              }
              return c | 0;
            }
            function va(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
              g = (da - 16) | 0;
              da = g;
              J[(a + 4) >> 2] = J[(a + 4) >> 2] + 1;
              J[(g + 12) >> 2] = a;
              a = (J[4155] - J[4154]) >> 2;
              if (a >>> 0 <= b >>> 0) {
                a: {
                  c = (b + 1) | 0;
                  if (a >>> 0 < c >>> 0) {
                    i = (da - 32) | 0;
                    da = i;
                    f = (c - a) | 0;
                    b: {
                      if (f >>> 0 <= ((J[4156] - J[4155]) >> 2) >>> 0) {
                        Rc(f);
                        break b;
                      }
                      a = (i + 12) | 0;
                      d = (da - 16) | 0;
                      da = d;
                      e = (f + ((J[4155] - J[4154]) >> 2)) | 0;
                      J[(d + 12) >> 2] = e;
                      c: {
                        c = sc();
                        if (e >>> 0 <= c >>> 0) {
                          e = (J[4156] - J[4154]) >> 2;
                          if (e >>> 0 < (c >>> 1) >>> 0) {
                            J[(d + 8) >> 2] = e << 1;
                            c = (da - 16) | 0;
                            da = c;
                            da = (c + 16) | 0;
                            c = (d + 12) | 0;
                            e = (d + 8) | 0;
                            c = J[(M[e >> 2] < M[c >> 2] ? c : e) >> 2];
                          }
                          da = (d + 16) | 0;
                          break c;
                        }
                        Fa();
                        C();
                      }
                      e = (J[4155] - J[4154]) >> 2;
                      d = (da - 16) | 0;
                      da = d;
                      J[(a + 16) >> 2] = 16628;
                      J[(a + 12) >> 2] = 0;
                      if (c) {
                        rc((d + 8) | 0, c);
                        h = J[(d + 8) >> 2];
                        c = J[(d + 12) >> 2];
                      } else {
                        c = 0;
                      }
                      J[a >> 2] = h;
                      e = ((e << 2) + h) | 0;
                      J[(a + 8) >> 2] = e;
                      J[(a + 12) >> 2] = (c << 2) + h;
                      J[(a + 4) >> 2] = e;
                      da = (d + 16) | 0;
                      h = (da - 16) | 0;
                      da = h;
                      c = J[(a + 8) >> 2];
                      d = (h + 4) | 0;
                      J[(d + 8) >> 2] = a + 8;
                      J[d >> 2] = c;
                      J[(d + 4) >> 2] = c + (f << 2);
                      c = J[d >> 2];
                      while (1) {
                        if (J[(d + 4) >> 2] != (c | 0)) {
                          J[c >> 2] = 0;
                          c = (J[d >> 2] + 4) | 0;
                          J[d >> 2] = c;
                          continue;
                        }
                        break;
                      }
                      J[J[(d + 8) >> 2] >> 2] = J[d >> 2];
                      da = (h + 16) | 0;
                      c = J[4154];
                      f = J[4155];
                      d = (J[(a + 4) >> 2] + ((c - f) | 0)) | 0;
                      f = (f - c) | 0;
                      if (f) {
                        y(d, c, f);
                      }
                      J[(a + 4) >> 2] = d;
                      J[4155] = J[4154];
                      c = J[4154];
                      J[4154] = J[(a + 4) >> 2];
                      J[(a + 4) >> 2] = c;
                      c = J[4155];
                      J[4155] = J[(a + 8) >> 2];
                      J[(a + 8) >> 2] = c;
                      c = J[4156];
                      J[4156] = J[(a + 12) >> 2];
                      J[(a + 12) >> 2] = c;
                      J[a >> 2] = J[(a + 4) >> 2];
                      c = J[(a + 4) >> 2];
                      while (1) {
                        d = J[(a + 8) >> 2];
                        if ((d | 0) != (c | 0)) {
                          J[(a + 8) >> 2] = d - 4;
                          continue;
                        }
                        break;
                      }
                      c = J[a >> 2];
                      if (c) {
                        qc(J[(a + 16) >> 2], c);
                      }
                    }
                    da = (i + 32) | 0;
                    break a;
                  }
                  if (a >>> 0 > c >>> 0) {
                    Qc(16616, (J[4154] + (c << 2)) | 0);
                  }
                }
              }
              a = J[(J[4154] + (b << 2)) >> 2];
              if (a) {
                c = (J[(a + 4) >> 2] - 1) | 0;
                J[(a + 4) >> 2] = c;
                if ((c | 0) == -1) {
                  fa[J[(J[a >> 2] + 8) >> 2]](a);
                }
              }
              a = J[(g + 12) >> 2];
              J[(g + 12) >> 2] = 0;
              J[(J[4154] + (b << 2)) >> 2] = a;
              a = J[(g + 12) >> 2];
              J[(g + 12) >> 2] = 0;
              if (a) {
                b = (J[(a + 4) >> 2] - 1) | 0;
                J[(a + 4) >> 2] = b;
                if ((b | 0) == -1) {
                  fa[J[(J[a >> 2] + 8) >> 2]](a);
                }
              }
              da = (g + 16) | 0;
            }
            function rf(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              var i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0;
              n = (da - 16) | 0;
              da = n;
              i = c;
              while (1) {
                a: {
                  if ((d | 0) == (i | 0)) {
                    i = d;
                    break a;
                  }
                  if (!J[i >> 2]) {
                    break a;
                  }
                  i = (i + 4) | 0;
                  continue;
                }
                break;
              }
              J[h >> 2] = f;
              J[e >> 2] = c;
              b: {
                while (1) {
                  c: {
                    d: {
                      if (!(((c | 0) == (d | 0)) | ((f | 0) == (g | 0)))) {
                        j = J[(b + 4) >> 2];
                        J[(n + 8) >> 2] = J[b >> 2];
                        J[(n + 12) >> 2] = j;
                        s = 1;
                        j = f;
                        k = (g - j) | 0;
                        o = 0;
                        p = (da - 16) | 0;
                        da = p;
                        J[(p + 12) >> 2] = J[(a + 8) >> 2];
                        t = $a((p + 8) | 0, (p + 12) | 0);
                        q = (da - 16) | 0;
                        da = q;
                        l = J[e >> 2];
                        r = (i - c) >> 2;
                        e: {
                          if (!l | !r) {
                            break e;
                          }
                          k = j ? k : 0;
                          while (1) {
                            m = cc(k >>> 0 < 4 ? (q + 12) | 0 : j, J[l >> 2]);
                            if ((m | 0) == -1) {
                              o = -1;
                              break e;
                            }
                            if (j) {
                              if (k >>> 0 <= 3) {
                                if (k >>> 0 < m >>> 0) {
                                  break e;
                                }
                                eb(j, (q + 12) | 0, m);
                              }
                              k = (k - m) | 0;
                              j = (j + m) | 0;
                            } else {
                              j = 0;
                            }
                            if (!J[l >> 2]) {
                              l = 0;
                              break e;
                            }
                            o = (o + m) | 0;
                            l = (l + 4) | 0;
                            r = (r - 1) | 0;
                            if (r) {
                              continue;
                            }
                            break;
                          }
                        }
                        if (j) {
                          J[e >> 2] = l;
                        }
                        da = (q + 16) | 0;
                        j = J[t >> 2];
                        if (j) {
                          J[4039] = (j | 0) == -1 ? 16036 : j;
                        }
                        da = (p + 16) | 0;
                        f: {
                          g: {
                            h: {
                              switch ((o + 1) | 0) {
                                case 0:
                                  J[h >> 2] = f;
                                  while (1) {
                                    if (J[e >> 2] == (c | 0)) {
                                      break g;
                                    }
                                    b = Ic(f, J[c >> 2], J[(a + 8) >> 2]);
                                    if ((b | 0) == -1) {
                                      break g;
                                    }
                                    f = (b + J[h >> 2]) | 0;
                                    J[h >> 2] = f;
                                    c = (c + 4) | 0;
                                    continue;
                                  }
                                case 1:
                                  break b;
                                default:
                                  break h;
                              }
                            }
                            f = (J[h >> 2] + o) | 0;
                            J[h >> 2] = f;
                            if ((f | 0) == (g | 0)) {
                              break f;
                            }
                            if ((d | 0) == (i | 0)) {
                              c = J[e >> 2];
                              i = d;
                              continue;
                            }
                            c = (n + 4) | 0;
                            i = Ic(c, 0, J[(a + 8) >> 2]);
                            if ((i | 0) == -1) {
                              break c;
                            }
                            if ((g - J[h >> 2]) >>> 0 < i >>> 0) {
                              break b;
                            }
                            while (1) {
                              if (i) {
                                f = K[c | 0];
                                j = J[h >> 2];
                                J[h >> 2] = j + 1;
                                H[j | 0] = f;
                                i = (i - 1) | 0;
                                c = (c + 1) | 0;
                                continue;
                              }
                              break;
                            }
                            c = (J[e >> 2] + 4) | 0;
                            J[e >> 2] = c;
                            i = c;
                            while (1) {
                              if ((d | 0) == (i | 0)) {
                                i = d;
                                break d;
                              }
                              if (!J[i >> 2]) {
                                break d;
                              }
                              i = (i + 4) | 0;
                              continue;
                            }
                          }
                          J[e >> 2] = c;
                          break c;
                        }
                        c = J[e >> 2];
                      }
                      s = (c | 0) != (d | 0);
                      break b;
                    }
                    f = J[h >> 2];
                    continue;
                  }
                  break;
                }
                s = 2;
              }
              da = (n + 16) | 0;
              return s | 0;
            }
            function Ab(a, b, c, d, e, f, g) {
              var h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0;
              i = (da - 128) | 0;
              da = i;
              J[(i + 124) >> 2] = b;
              J[(i + 16) >> 2] = 52;
              J[(i + 8) >> 2] = 0;
              k = (i + 16) | 0;
              J[(i + 12) >> 2] = J[k >> 2];
              a: {
                b: {
                  c: {
                    m = (((d - c) | 0) / 12) | 0;
                    if (m >>> 0 >= 101) {
                      k = La(m);
                      if (!k) {
                        break c;
                      }
                      b = J[(i + 8) >> 2];
                      J[(i + 8) >> 2] = k;
                      if (b) {
                        fa[J[(i + 12) >> 2]](b);
                      }
                    }
                    h = k;
                    b = c;
                    while (1)
                      if ((b | 0) == (d | 0)) {
                        d: while (1) {
                          b = (i + 124) | 0;
                          if (((r = qa(a, b)), (s = 1), (t = m), t ? r : s)) {
                            if (qa(a, b)) {
                              J[f >> 2] = J[f >> 2] | 2;
                            }
                            while (1) {
                              if ((c | 0) == (d | 0)) {
                                break b;
                              }
                              if (K[k | 0] == 2) {
                                break a;
                              }
                              k = (k + 1) | 0;
                              c = (c + 12) | 0;
                              continue;
                            }
                          }
                          b = J[a >> 2];
                          h = J[(b + 12) >> 2];
                          e: {
                            if ((h | 0) == J[(b + 16) >> 2]) {
                              b = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                              break e;
                            }
                            b = H[h | 0];
                          }
                          o = (b << 24) >> 24;
                          if (!g) {
                            o = fa[J[(J[e >> 2] + 12) >> 2]](e, o) | 0;
                          }
                          j = (p + 1) | 0;
                          q = 0;
                          h = k;
                          b = c;
                          while (1)
                            if ((b | 0) == (d | 0)) {
                              p = j;
                              if (!q) {
                                continue d;
                              }
                              Ba(a);
                              h = k;
                              b = c;
                              if ((m + n) >>> 0 < 2) {
                                continue d;
                              }
                              while (1) {
                                if ((b | 0) == (d | 0)) {
                                  continue d;
                                }
                                if ((K[(b + 11) | 0] >>> 7) | 0) {
                                  j = J[(b + 4) >> 2];
                                } else {
                                  j = K[(b + 11) | 0] & 127;
                                }
                                if (!(((j | 0) == (p | 0)) | (K[h | 0] != 2))) {
                                  H[h | 0] = 0;
                                  n = (n - 1) | 0;
                                }
                                h = (h + 1) | 0;
                                b = (b + 12) | 0;
                                continue;
                              }
                            } else {
                              f: {
                                if (K[h | 0] != 1) {
                                  break f;
                                }
                                if ((K[(b + 11) | 0] >>> 7) | 0) {
                                  l = J[b >> 2];
                                } else {
                                  l = b;
                                }
                                l = H[(l + p) | 0];
                                if (!g) {
                                  l = fa[J[(J[e >> 2] + 12) >> 2]](e, l) | 0;
                                }
                                g: {
                                  if ((o | 0) == (l | 0)) {
                                    q = 1;
                                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                                      l = J[(b + 4) >> 2];
                                    } else {
                                      l = K[(b + 11) | 0] & 127;
                                    }
                                    if ((l | 0) != (j | 0)) {
                                      break f;
                                    }
                                    H[h | 0] = 2;
                                    n = (n + 1) | 0;
                                    break g;
                                  }
                                  H[h | 0] = 0;
                                }
                                m = (m - 1) | 0;
                              }
                              h = (h + 1) | 0;
                              b = (b + 12) | 0;
                              continue;
                            }
                        }
                      } else {
                        if ((K[(b + 11) | 0] >>> 7) | 0) {
                          j = J[(b + 4) >> 2];
                        } else {
                          j = K[(b + 11) | 0] & 127;
                        }
                        j = !j;
                        H[h | 0] = j ? 2 : 1;
                        h = (h + 1) | 0;
                        b = (b + 12) | 0;
                        n = (n + j) | 0;
                        m = (m - j) | 0;
                        continue;
                      }
                  }
                  Ta();
                  C();
                }
                J[f >> 2] = J[f >> 2] | 4;
              }
              a = J[(i + 8) >> 2];
              J[(i + 8) >> 2] = 0;
              if (a) {
                fa[J[(i + 12) >> 2]](a);
              }
              da = (i + 128) | 0;
              return c;
            }
            function zb(a, b, c, d, e, f, g) {
              var h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = 0;
              i = (da - 128) | 0;
              da = i;
              J[(i + 124) >> 2] = b;
              J[(i + 16) >> 2] = 52;
              J[(i + 8) >> 2] = 0;
              k = (i + 16) | 0;
              J[(i + 12) >> 2] = J[k >> 2];
              a: {
                b: {
                  c: {
                    m = (((d - c) | 0) / 12) | 0;
                    if (m >>> 0 >= 101) {
                      k = La(m);
                      if (!k) {
                        break c;
                      }
                      b = J[(i + 8) >> 2];
                      J[(i + 8) >> 2] = k;
                      if (b) {
                        fa[J[(i + 12) >> 2]](b);
                      }
                    }
                    h = k;
                    b = c;
                    while (1)
                      if ((b | 0) == (d | 0)) {
                        d: while (1) {
                          b = (i + 124) | 0;
                          if (((r = ua(a, b)), (s = 1), (t = m), t ? r : s)) {
                            if (ua(a, b)) {
                              J[f >> 2] = J[f >> 2] | 2;
                            }
                            while (1) {
                              if ((c | 0) == (d | 0)) {
                                break b;
                              }
                              if (K[k | 0] == 2) {
                                break a;
                              }
                              k = (k + 1) | 0;
                              c = (c + 12) | 0;
                              continue;
                            }
                          }
                          b = J[a >> 2];
                          h = J[(b + 12) >> 2];
                          e: {
                            if ((h | 0) == J[(b + 16) >> 2]) {
                              j = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                              break e;
                            }
                            j = J[h >> 2];
                          }
                          if (!g) {
                            j = fa[J[(J[e >> 2] + 28) >> 2]](e, j) | 0;
                          }
                          p = (o + 1) | 0;
                          q = 0;
                          h = k;
                          b = c;
                          while (1)
                            if ((b | 0) == (d | 0)) {
                              o = p;
                              if (!q) {
                                continue d;
                              }
                              Ga(a);
                              h = k;
                              b = c;
                              if ((m + n) >>> 0 < 2) {
                                continue d;
                              }
                              while (1) {
                                if ((b | 0) == (d | 0)) {
                                  continue d;
                                }
                                if ((K[(b + 11) | 0] >>> 7) | 0) {
                                  j = J[(b + 4) >> 2];
                                } else {
                                  j = K[(b + 11) | 0] & 127;
                                }
                                if (!(((j | 0) == (o | 0)) | (K[h | 0] != 2))) {
                                  H[h | 0] = 0;
                                  n = (n - 1) | 0;
                                }
                                h = (h + 1) | 0;
                                b = (b + 12) | 0;
                                continue;
                              }
                            } else {
                              f: {
                                if (K[h | 0] != 1) {
                                  break f;
                                }
                                if ((K[(b + 11) | 0] >>> 7) | 0) {
                                  l = J[b >> 2];
                                } else {
                                  l = b;
                                }
                                l = J[(l + (o << 2)) >> 2];
                                if (!g) {
                                  l = fa[J[(J[e >> 2] + 28) >> 2]](e, l) | 0;
                                }
                                g: {
                                  if ((j | 0) == (l | 0)) {
                                    q = 1;
                                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                                      l = J[(b + 4) >> 2];
                                    } else {
                                      l = K[(b + 11) | 0] & 127;
                                    }
                                    if ((l | 0) != (p | 0)) {
                                      break f;
                                    }
                                    H[h | 0] = 2;
                                    n = (n + 1) | 0;
                                    break g;
                                  }
                                  H[h | 0] = 0;
                                }
                                m = (m - 1) | 0;
                              }
                              h = (h + 1) | 0;
                              b = (b + 12) | 0;
                              continue;
                            }
                        }
                      } else {
                        if ((K[(b + 11) | 0] >>> 7) | 0) {
                          j = J[(b + 4) >> 2];
                        } else {
                          j = K[(b + 11) | 0] & 127;
                        }
                        j = !j;
                        H[h | 0] = j ? 2 : 1;
                        h = (h + 1) | 0;
                        b = (b + 12) | 0;
                        n = (j + n) | 0;
                        m = (m - j) | 0;
                        continue;
                      }
                  }
                  Ta();
                  C();
                }
                J[f >> 2] = J[f >> 2] | 4;
              }
              a = J[(i + 8) >> 2];
              J[(i + 8) >> 2] = 0;
              if (a) {
                fa[J[(i + 12) >> 2]](a);
              }
              da = (i + 128) | 0;
              return c;
            }
            function Ec(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              var i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = c;
              J[(a + 8) >> 2] = f;
              a: {
                if (((d - c) | 0) < 3) {
                  break a;
                }
              }
              b: {
                c: {
                  d: {
                    while (1) {
                      if (!((c >>> 0 >= d >>> 0) | (f >>> 0 >= g >>> 0))) {
                        b = 2;
                        m = c;
                        j = K[c | 0];
                        e: {
                          if ((j << 24) >> 24 >= 0) {
                            I[f >> 1] = j;
                            b = 1;
                            break e;
                          }
                          if (j >>> 0 < 194) {
                            break c;
                          }
                          if (j >>> 0 <= 223) {
                            i = 1;
                            if (((d - c) | 0) < 2) {
                              break b;
                            }
                            i = K[(c + 1) | 0];
                            if ((i & 192) != 128) {
                              break d;
                            }
                            I[f >> 1] = (i & 63) | ((j << 6) & 1984);
                            b = 2;
                            break e;
                          }
                          if (j >>> 0 <= 239) {
                            b = 1;
                            k = (d - c) | 0;
                            if ((k | 0) < 2) {
                              break d;
                            }
                            i = H[(c + 1) | 0];
                            f: {
                              g: {
                                if ((j | 0) != 237) {
                                  if ((j | 0) != 224) {
                                    break g;
                                  }
                                  if ((i & -32) != -96) {
                                    break c;
                                  }
                                  break f;
                                }
                                if ((i | 0) >= -96) {
                                  break c;
                                }
                                break f;
                              }
                              if ((i | 0) > -65) {
                                break c;
                              }
                            }
                            if ((k | 0) == 2) {
                              break d;
                            }
                            b = K[(c + 2) | 0];
                            if ((b & 192) != 128) {
                              break c;
                            }
                            I[f >> 1] =
                              (b & 63) | (((i & 63) << 6) | (j << 12));
                            b = 3;
                            break e;
                          }
                          if (j >>> 0 > 244) {
                            break c;
                          }
                          b = 1;
                          k = (d - c) | 0;
                          if ((k | 0) < 2) {
                            break d;
                          }
                          l = K[(c + 1) | 0];
                          i = (l << 24) >> 24;
                          h: {
                            i: {
                              switch ((j - 240) | 0) {
                                case 0:
                                  if (((i + 112) & 255) >>> 0 >= 48) {
                                    break c;
                                  }
                                  break h;
                                case 4:
                                  if ((i | 0) >= -112) {
                                    break c;
                                  }
                                  break h;
                                default:
                                  break i;
                              }
                            }
                            if ((i | 0) > -65) {
                              break c;
                            }
                          }
                          if ((k | 0) == 2) {
                            break d;
                          }
                          i = K[(c + 2) | 0];
                          if ((i & 192) != 128) {
                            break c;
                          }
                          if ((k | 0) == 3) {
                            break d;
                          }
                          k = K[(c + 3) | 0];
                          if ((k & 192) != 128) {
                            break c;
                          }
                          if (((g - f) | 0) < 3) {
                            break d;
                          }
                          b = 2;
                          k = k & 63;
                          c = i << 6;
                          j = j & 7;
                          if (
                            (k |
                              ((c & 4032) |
                                (((l << 12) & 258048) | (j << 18)))) >>>
                              0 >
                            1114111
                          ) {
                            break d;
                          }
                          I[(f + 2) >> 1] = k | (c & 960) | 56320;
                          b = l << 2;
                          I[f >> 1] =
                            ((((i >>> 4) & 3) |
                              ((b & 192) | (j << 8) | (b & 60))) +
                              16320) |
                            55296;
                          f = (f + 2) | 0;
                          b = 4;
                        }
                        c = (m + b) | 0;
                        J[(a + 12) >> 2] = c;
                        f = (f + 2) | 0;
                        J[(a + 8) >> 2] = f;
                        continue;
                      }
                      break;
                    }
                    b = c >>> 0 < d >>> 0;
                  }
                  i = b;
                  break b;
                }
                i = 2;
              }
              J[e >> 2] = J[(a + 12) >> 2];
              J[h >> 2] = J[(a + 8) >> 2];
              da = (a + 16) | 0;
              return i | 0;
            }
            function Va(a, b, c, d, e, f, g, h) {
              var i = 0,
                j = 0,
                k = 0;
              i = (da - 16) | 0;
              da = i;
              J[(i + 8) >> 2] = c;
              J[(i + 12) >> 2] = b;
              c = (i + 4) | 0;
              b = J[(d + 28) >> 2];
              J[c >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              j = sa(c, 16792);
              wa(c);
              J[e >> 2] = 0;
              b = 0;
              a: {
                while (1) {
                  if (b | ((g | 0) == (h | 0))) {
                    break a;
                  }
                  b: {
                    if (qa((i + 12) | 0, (i + 8) | 0)) {
                      break b;
                    }
                    c: {
                      if (
                        (fa[J[(J[j >> 2] + 36) >> 2]](j, H[g | 0], 0) | 0) ==
                        37
                      ) {
                        if (((g + 1) | 0) == (h | 0)) {
                          break b;
                        }
                        c = 0;
                        d: {
                          e: {
                            b =
                              fa[J[(J[j >> 2] + 36) >> 2]](
                                j,
                                H[(g + 1) | 0],
                                0,
                              ) | 0;
                            if ((b | 0) == 69) {
                              break e;
                            }
                            k = 1;
                            if ((b & 255) == 48) {
                              break e;
                            }
                            break d;
                          }
                          if (((g + 2) | 0) == (h | 0)) {
                            break b;
                          }
                          k = 2;
                          c = b;
                          b =
                            fa[J[(J[j >> 2] + 36) >> 2]](j, H[(g + 2) | 0], 0) |
                            0;
                        }
                        J[(i + 12) >> 2] = fa[J[(J[a >> 2] + 36) >> 2]](
                          a,
                          J[(i + 12) >> 2],
                          J[(i + 8) >> 2],
                          d,
                          e,
                          f,
                          b,
                          c,
                        );
                        g = (((g + k) | 0) + 1) | 0;
                        break c;
                      }
                      b = H[g | 0];
                      if (b >>> 0 < 128) {
                        b = J[(J[(j + 8) >> 2] + (b << 2)) >> 2] & 1;
                      } else {
                        b = 0;
                      }
                      if (b) {
                        while (1) {
                          g = (g + 1) | 0;
                          if ((h | 0) != (g | 0)) {
                            b = H[g | 0];
                            if (b >>> 0 < 128) {
                              b = J[(J[(j + 8) >> 2] + (b << 2)) >> 2] & 1;
                            } else {
                              b = 0;
                            }
                            if (b) {
                              continue;
                            }
                          }
                          break;
                        }
                        while (1) {
                          c = (i + 12) | 0;
                          if (qa(c, (i + 8) | 0)) {
                            break c;
                          }
                          b = J[c >> 2];
                          k = J[(b + 12) >> 2];
                          f: {
                            if ((k | 0) == J[(b + 16) >> 2]) {
                              b = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                              break f;
                            }
                            b = H[k | 0];
                          }
                          b = (b << 24) >> 24;
                          if (b >>> 0 < 128) {
                            b = J[(J[(j + 8) >> 2] + (b << 2)) >> 2] & 1;
                          } else {
                            b = 0;
                          }
                          if (!b) {
                            break c;
                          }
                          Ba(c);
                          continue;
                        }
                      }
                      k = (i + 12) | 0;
                      b = J[k >> 2];
                      c = J[(b + 12) >> 2];
                      g: {
                        if ((c | 0) == J[(b + 16) >> 2]) {
                          b = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                          break g;
                        }
                        b = H[c | 0];
                      }
                      if (
                        (fa[J[(J[j >> 2] + 12) >> 2]](j, (b << 24) >> 24) |
                          0) ==
                        (fa[J[(J[j >> 2] + 12) >> 2]](j, H[g | 0]) | 0)
                      ) {
                        g = (g + 1) | 0;
                        Ba(k);
                        break c;
                      }
                      J[e >> 2] = 4;
                    }
                    b = J[e >> 2];
                    continue;
                  }
                  break;
                }
                J[e >> 2] = 4;
              }
              if (qa((i + 12) | 0, (i + 8) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              da = (i + 16) | 0;
              return J[(i + 12) >> 2];
            }
            function ye(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
              g = (da - 80) | 0;
              da = g;
              a: {
                f = 1;
                b: {
                  if (Ka(a, b, 0)) {
                    break b;
                  }
                  f = 0;
                  if (!b) {
                    break b;
                  }
                  h = (da - 16) | 0;
                  da = h;
                  f = J[b >> 2];
                  e = J[(f - 8) >> 2];
                  J[(h + 12) >> 2] = e;
                  J[(h + 4) >> 2] = b + e;
                  J[(h + 8) >> 2] = J[(f - 4) >> 2];
                  f = J[(h + 8) >> 2];
                  e = Ka(f, 14688, 0);
                  i = J[(h + 4) >> 2];
                  c: {
                    if (e) {
                      b = (da + -64) | 0;
                      da = b;
                      da = (b - -64) | 0;
                      d = J[(h + 12) >> 2] ? 0 : i;
                      break c;
                    }
                    e = (da + -64) | 0;
                    da = e;
                    if ((b | 0) >= (i | 0)) {
                      J[(e + 20) >> 2] = 0;
                      J[(e + 24) >> 2] = 0;
                      J[(e + 16) >> 2] = 0;
                      J[(e + 12) >> 2] = 14688;
                      J[(e + 4) >> 2] = f;
                      J[(e + 28) >> 2] = 0;
                      J[(e + 32) >> 2] = 0;
                      J[(e + 36) >> 2] = 0;
                      J[(e + 40) >> 2] = 0;
                      J[(e + 44) >> 2] = 0;
                      J[(e + 48) >> 2] = 0;
                      J[(e + 60) >> 2] = 0;
                      J[(e + 52) >> 2] = 1;
                      J[(e + 56) >> 2] = 16777216;
                      J[(e + 8) >> 2] = b;
                      fa[J[(J[f >> 2] + 20) >> 2]](f, (e + 4) | 0, i, i, 1, 0);
                      d = J[(e + 28) >> 2] ? b : 0;
                    }
                    da = (e - -64) | 0;
                    if (d) {
                      break c;
                    }
                    d = (da + -64) | 0;
                    da = d;
                    J[(d + 16) >> 2] = 0;
                    J[(d + 12) >> 2] = 14640;
                    J[(d + 8) >> 2] = b;
                    J[(d + 4) >> 2] = 14688;
                    b = 0;
                    D((d + 20) | 0, 0, 39);
                    J[(d + 60) >> 2] = 0;
                    H[(d + 59) | 0] = 1;
                    fa[J[(J[f >> 2] + 24) >> 2]](f, (d + 4) | 0, i, 1, 0);
                    d: {
                      e: {
                        switch (J[(d + 40) >> 2]) {
                          case 0:
                            b =
                              J[(d + 44) >> 2] == 1
                                ? J[(d + 32) >> 2] == 1
                                  ? J[(d + 36) >> 2] == 1
                                    ? J[(d + 24) >> 2]
                                    : 0
                                  : 0
                                : 0;
                            break d;
                          case 1:
                            break e;
                          default:
                            break d;
                        }
                      }
                      if (J[(d + 28) >> 2] != 1) {
                        if (
                          J[(d + 44) >> 2] |
                          (J[(d + 32) >> 2] != 1) |
                          (J[(d + 36) >> 2] != 1)
                        ) {
                          break d;
                        }
                      }
                      b = J[(d + 20) >> 2];
                    }
                    da = (d - -64) | 0;
                    d = b;
                  }
                  da = (h + 16) | 0;
                  f = 0;
                  if (!d) {
                    break b;
                  }
                  b = J[c >> 2];
                  if (!b) {
                    break a;
                  }
                  D((g + 24) | 0, 0, 56);
                  H[(g + 75) | 0] = 1;
                  J[(g + 32) >> 2] = -1;
                  J[(g + 28) >> 2] = a;
                  J[(g + 20) >> 2] = d;
                  J[(g + 68) >> 2] = 1;
                  fa[J[(J[d >> 2] + 28) >> 2]](d, (g + 20) | 0, b, 1);
                  a = J[(g + 44) >> 2];
                  if ((a | 0) == 1) {
                    J[c >> 2] = J[(g + 36) >> 2];
                  }
                  f = (a | 0) == 1;
                }
                da = (g + 80) | 0;
                return f | 0;
              }
              J[(g + 8) >> 2] = 1645;
              J[(g + 4) >> 2] = 487;
              J[g >> 2] = 1276;
              Ta();
              C();
            }
            function Cc(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              var i = 0,
                j = 0,
                k = 0,
                l = 0;
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = c;
              J[(a + 8) >> 2] = f;
              a: {
                if (((d - c) | 0) < 3) {
                  break a;
                }
              }
              b: {
                c: {
                  while (1) {
                    if (!((c >>> 0 >= d >>> 0) | (f >>> 0 >= g >>> 0))) {
                      i = H[c | 0];
                      b = i & 255;
                      d: {
                        if ((i | 0) >= 0) {
                          if (b >>> 0 > 1114111) {
                            break c;
                          }
                          i = 1;
                          break d;
                        }
                        if (i >>> 0 < 4294967234) {
                          break c;
                        }
                        if (i >>> 0 <= 4294967263) {
                          i = 1;
                          if (((d - c) | 0) < 2) {
                            break b;
                          }
                          i = 2;
                          j = K[(c + 1) | 0];
                          if ((j & 192) != 128) {
                            break b;
                          }
                          b = (j & 63) | ((b << 6) & 1984);
                          i = 2;
                          break d;
                        }
                        if (i >>> 0 <= 4294967279) {
                          i = 1;
                          k = (d - c) | 0;
                          if ((k | 0) < 2) {
                            break b;
                          }
                          j = H[(c + 1) | 0];
                          e: {
                            f: {
                              if ((b | 0) != 237) {
                                if ((b | 0) != 224) {
                                  break f;
                                }
                                if ((j & -32) == -96) {
                                  break e;
                                }
                                break c;
                              }
                              if ((j | 0) < -96) {
                                break e;
                              }
                              break c;
                            }
                            if ((j | 0) > -65) {
                              break c;
                            }
                          }
                          if ((k | 0) == 2) {
                            break b;
                          }
                          i = K[(c + 2) | 0];
                          if ((i & 192) != 128) {
                            break c;
                          }
                          b =
                            (i & 63) | (((b << 12) & 61440) | ((j & 63) << 6));
                          i = 3;
                          break d;
                        }
                        if (i >>> 0 > 4294967284) {
                          break c;
                        }
                        i = 1;
                        k = (d - c) | 0;
                        if ((k | 0) < 2) {
                          break b;
                        }
                        j = H[(c + 1) | 0];
                        g: {
                          h: {
                            switch ((b - 240) | 0) {
                              case 0:
                                if (((j + 112) & 255) >>> 0 >= 48) {
                                  break c;
                                }
                                break g;
                              case 4:
                                if ((j | 0) >= -112) {
                                  break c;
                                }
                                break g;
                              default:
                                break h;
                            }
                          }
                          if ((j | 0) > -65) {
                            break c;
                          }
                        }
                        if ((k | 0) == 2) {
                          break b;
                        }
                        l = K[(c + 2) | 0];
                        if ((l & 192) != 128) {
                          break c;
                        }
                        if ((k | 0) == 3) {
                          break b;
                        }
                        k = K[(c + 3) | 0];
                        if ((k & 192) != 128) {
                          break c;
                        }
                        i = 2;
                        b =
                          (k & 63) |
                          (((l << 6) & 4032) |
                            (((b << 18) & 1835008) | ((j & 63) << 12)));
                        if (b >>> 0 > 1114111) {
                          break b;
                        }
                        i = 4;
                      }
                      J[f >> 2] = b;
                      c = (c + i) | 0;
                      J[(a + 12) >> 2] = c;
                      f = (f + 4) | 0;
                      J[(a + 8) >> 2] = f;
                      continue;
                    }
                    break;
                  }
                  i = c >>> 0 < d >>> 0;
                  break b;
                }
                i = 2;
              }
              J[e >> 2] = J[(a + 12) >> 2];
              J[h >> 2] = J[(a + 8) >> 2];
              da = (a + 16) | 0;
              return i | 0;
            }
            function Fc(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              var i = 0,
                j = 0;
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = c;
              J[(a + 8) >> 2] = f;
              a: {
                b: {
                  while (1) {
                    if (c >>> 0 >= d >>> 0) {
                      f = 0;
                      break a;
                    }
                    f = 2;
                    c: {
                      b = L[c >> 1];
                      d: {
                        if (b >>> 0 <= 127) {
                          f = 1;
                          c = J[(a + 8) >> 2];
                          if (((g - c) | 0) <= 0) {
                            break a;
                          }
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = b;
                          break d;
                        }
                        if (b >>> 0 <= 2047) {
                          c = J[(a + 8) >> 2];
                          if (((g - c) | 0) < 2) {
                            break b;
                          }
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = (b >>> 6) | 192;
                          c = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = (b & 63) | 128;
                          break d;
                        }
                        if (b >>> 0 <= 55295) {
                          c = J[(a + 8) >> 2];
                          if (((g - c) | 0) < 3) {
                            break b;
                          }
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = (b >>> 12) | 224;
                          c = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = ((b >>> 6) & 63) | 128;
                          c = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = (b & 63) | 128;
                          break d;
                        }
                        if (b >>> 0 <= 56319) {
                          f = 1;
                          if (((d - c) | 0) < 3) {
                            break a;
                          }
                          i = L[(c + 2) >> 1];
                          if ((i & 64512) != 56320) {
                            break c;
                          }
                          j = J[(a + 8) >> 2];
                          if (((g - j) | 0) < 4) {
                            break a;
                          }
                          f = b & 960;
                          if (
                            ((i & 1023) | (((b << 10) & 64512) | (f << 10))) >>>
                              0 >
                            1048575
                          ) {
                            break c;
                          }
                          J[(a + 12) >> 2] = c + 2;
                          J[(a + 8) >> 2] = j + 1;
                          c = (((f >>> 6) | 0) + 1) | 0;
                          H[j | 0] = (c >>> 2) | 240;
                          f = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = f + 1;
                          H[f | 0] = ((c << 4) & 48) | ((b >>> 2) & 15) | 128;
                          c = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = ((i >>> 6) & 15) | ((b << 4) & 48) | 128;
                          b = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = b + 1;
                          H[b | 0] = (i & 63) | 128;
                          break d;
                        }
                        if (b >>> 0 < 57344) {
                          break a;
                        }
                        c = J[(a + 8) >> 2];
                        if (((g - c) | 0) < 3) {
                          break b;
                        }
                        J[(a + 8) >> 2] = c + 1;
                        H[c | 0] = (b >>> 12) | 224;
                        c = J[(a + 8) >> 2];
                        J[(a + 8) >> 2] = c + 1;
                        H[c | 0] = (b >>> 6) & 191;
                        c = J[(a + 8) >> 2];
                        J[(a + 8) >> 2] = c + 1;
                        H[c | 0] = (b & 63) | 128;
                      }
                      c = (J[(a + 12) >> 2] + 2) | 0;
                      J[(a + 12) >> 2] = c;
                      continue;
                    }
                    break;
                  }
                  f = 2;
                  break a;
                }
                f = 1;
              }
              J[e >> 2] = J[(a + 12) >> 2];
              J[h >> 2] = J[(a + 8) >> 2];
              da = (a + 16) | 0;
              return f | 0;
            }
            function Jd(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0;
              a: {
                b: {
                  c: {
                    d: {
                      e: {
                        c = J[(a + 4) >> 2];
                        f: {
                          if ((c | 0) != J[(a + 104) >> 2]) {
                            J[(a + 4) >> 2] = c + 1;
                            c = K[c | 0];
                            break f;
                          }
                          c = ma(a);
                        }
                        switch ((c - 43) | 0) {
                          case 0:
                          case 2:
                            break e;
                          default:
                            break d;
                        }
                      }
                      g = (c | 0) == 45;
                      b = !b;
                      c = J[(a + 4) >> 2];
                      g: {
                        if ((c | 0) != J[(a + 104) >> 2]) {
                          J[(a + 4) >> 2] = c + 1;
                          c = K[c | 0];
                          break g;
                        }
                        c = ma(a);
                      }
                      d = (c - 58) | 0;
                      if (b | (d >>> 0 > 4294967285)) {
                        break c;
                      }
                      if (J[(a + 116) >> 2] < 0) {
                        break b;
                      }
                      J[(a + 4) >> 2] = J[(a + 4) >> 2] - 1;
                      break b;
                    }
                    d = (c - 58) | 0;
                  }
                  if (d >>> 0 < 4294967286) {
                    break b;
                  }
                  h: {
                    if ((c - 48) >>> 0 >= 10) {
                      break h;
                    }
                    while (1) {
                      e = (((P(e, 10) + c) | 0) - 48) | 0;
                      f = (e | 0) < 214748364;
                      c = J[(a + 4) >> 2];
                      i: {
                        if ((c | 0) != J[(a + 104) >> 2]) {
                          J[(a + 4) >> 2] = c + 1;
                          c = K[c | 0];
                          break i;
                        }
                        c = ma(a);
                      }
                      b = (c - 48) | 0;
                      if (f & (b >>> 0 <= 9)) {
                        continue;
                      }
                      break;
                    }
                    f = e >> 31;
                    if (b >>> 0 >= 10) {
                      break h;
                    }
                    while (1) {
                      b = c;
                      c = Pg(e, f, 10, 0);
                      d = (b + c) | 0;
                      b = ea;
                      e = (d - 48) | 0;
                      d =
                        ((c >>> 0 > d >>> 0 ? (b + 1) | 0 : b) -
                          (d >>> 0 < 48)) |
                        0;
                      f = d;
                      d =
                        ((e >>> 0 < 2061584302) & ((d | 0) <= 21474836)) |
                        ((d | 0) < 21474836);
                      c = J[(a + 4) >> 2];
                      j: {
                        if ((c | 0) != J[(a + 104) >> 2]) {
                          J[(a + 4) >> 2] = c + 1;
                          c = K[c | 0];
                          break j;
                        }
                        c = ma(a);
                      }
                      b = (c - 48) | 0;
                      if (d & (b >>> 0 <= 9)) {
                        continue;
                      }
                      break;
                    }
                    if (b >>> 0 >= 10) {
                      break h;
                    }
                    while (1) {
                      b = J[(a + 4) >> 2];
                      k: {
                        if ((b | 0) != J[(a + 104) >> 2]) {
                          J[(a + 4) >> 2] = b + 1;
                          b = K[b | 0];
                          break k;
                        }
                        b = ma(a);
                      }
                      if ((b - 48) >>> 0 < 10) {
                        continue;
                      }
                      break;
                    }
                  }
                  b = J[(a + 116) >> 2];
                  if ((b | 0) > 0) {
                    b = 1;
                  } else {
                    b = (b | 0) >= 0;
                  }
                  if (b) {
                    J[(a + 4) >> 2] = J[(a + 4) >> 2] - 1;
                  }
                  a = e;
                  e = g ? (0 - a) | 0 : a;
                  f = g ? (0 - ((((a | 0) != 0) + f) | 0)) | 0 : f;
                  break a;
                }
                f = -2147483648;
                if (J[(a + 116) >> 2] < 0) {
                  break a;
                }
                J[(a + 4) >> 2] = J[(a + 4) >> 2] - 1;
                ea = -2147483648;
                return 0;
              }
              ea = f;
              return e;
            }
            function Ua(a, b, c, d, e, f, g, h) {
              var i = 0,
                j = 0,
                k = 0;
              i = (da - 16) | 0;
              da = i;
              J[(i + 8) >> 2] = c;
              J[(i + 12) >> 2] = b;
              c = (i + 4) | 0;
              b = J[(d + 28) >> 2];
              J[c >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              j = sa(c, 16784);
              wa(c);
              J[e >> 2] = 0;
              b = 0;
              a: {
                while (1) {
                  if (b | ((g | 0) == (h | 0))) {
                    break a;
                  }
                  b: {
                    if (ua((i + 12) | 0, (i + 8) | 0)) {
                      break b;
                    }
                    c: {
                      if (
                        (fa[J[(J[j >> 2] + 52) >> 2]](j, J[g >> 2], 0) | 0) ==
                        37
                      ) {
                        if (((g + 4) | 0) == (h | 0)) {
                          break b;
                        }
                        c = 0;
                        d: {
                          e: {
                            b =
                              fa[J[(J[j >> 2] + 52) >> 2]](
                                j,
                                J[(g + 4) >> 2],
                                0,
                              ) | 0;
                            if ((b | 0) == 69) {
                              break e;
                            }
                            k = 4;
                            if ((b & 255) == 48) {
                              break e;
                            }
                            break d;
                          }
                          if (((g + 8) | 0) == (h | 0)) {
                            break b;
                          }
                          k = 8;
                          c = b;
                          b =
                            fa[J[(J[j >> 2] + 52) >> 2]](
                              j,
                              J[(g + 8) >> 2],
                              0,
                            ) | 0;
                        }
                        J[(i + 12) >> 2] = fa[J[(J[a >> 2] + 36) >> 2]](
                          a,
                          J[(i + 12) >> 2],
                          J[(i + 8) >> 2],
                          d,
                          e,
                          f,
                          b,
                          c,
                        );
                        g = (((g + k) | 0) + 4) | 0;
                        break c;
                      }
                      if (fa[J[(J[j >> 2] + 12) >> 2]](j, 1, J[g >> 2]) | 0) {
                        while (1) {
                          g = (g + 4) | 0;
                          if ((h | 0) != (g | 0)) {
                            if (
                              fa[J[(J[j >> 2] + 12) >> 2]](j, 1, J[g >> 2]) | 0
                            ) {
                              continue;
                            }
                          }
                          break;
                        }
                        while (1) {
                          c = (i + 12) | 0;
                          if (ua(c, (i + 8) | 0)) {
                            break c;
                          }
                          b = J[c >> 2];
                          k = J[(b + 12) >> 2];
                          f: {
                            if ((k | 0) == J[(b + 16) >> 2]) {
                              b = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                              break f;
                            }
                            b = J[k >> 2];
                          }
                          if (!(fa[J[(J[j >> 2] + 12) >> 2]](j, 1, b) | 0)) {
                            break c;
                          }
                          Ga(c);
                          continue;
                        }
                      }
                      k = (i + 12) | 0;
                      b = J[k >> 2];
                      c = J[(b + 12) >> 2];
                      g: {
                        if ((c | 0) == J[(b + 16) >> 2]) {
                          b = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                          break g;
                        }
                        b = J[c >> 2];
                      }
                      if (
                        (fa[J[(J[j >> 2] + 28) >> 2]](j, b) | 0) ==
                        (fa[J[(J[j >> 2] + 28) >> 2]](j, J[g >> 2]) | 0)
                      ) {
                        g = (g + 4) | 0;
                        Ga(k);
                        break c;
                      }
                      J[e >> 2] = 4;
                    }
                    b = J[e >> 2];
                    continue;
                  }
                  break;
                }
                J[e >> 2] = 4;
              }
              if (ua((i + 12) | 0, (i + 8) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              da = (i + 16) | 0;
              return J[(i + 12) >> 2];
            }
            function vg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 256) | 0;
              da = a;
              J[(a + 248) >> 2] = c;
              J[(a + 252) >> 2] = b;
              h = (a + 196) | 0;
              J[(h + 8) >> 2] = 0;
              J[h >> 2] = 0;
              J[(h + 4) >> 2] = 0;
              g = (a + 16) | 0;
              b = J[(d + 28) >> 2];
              J[g >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(g, 16792);
              fa[J[(J[b >> 2] + 32) >> 2]](b, 7664, 7690, (a + 208) | 0) | 0;
              wa(g);
              c = (a + 184) | 0;
              J[(c + 8) >> 2] = 0;
              J[c >> 2] = 0;
              J[(c + 4) >> 2] = 0;
              ka(
                c,
                (K[(c + 11) | 0] >>> 7) | 0
                  ? ((J[(c + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(c + 11) | 0] >>> 7) | 0) {
                b = J[c >> 2];
              } else {
                b = c;
              }
              J[(a + 180) >> 2] = b;
              J[(a + 12) >> 2] = g;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (qa((a + 252) | 0, (a + 248) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(c + 11) | 0] >>> 7) | 0) {
                    d = J[(c + 4) >> 2];
                  } else {
                    d = K[(c + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + b) | 0)) {
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      b = J[(c + 4) >> 2];
                    } else {
                      b = K[(c + 11) | 0] & 127;
                    }
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      d = J[(c + 4) >> 2];
                    } else {
                      d = K[(c + 11) | 0] & 127;
                    }
                    ka(c, d << 1);
                    ka(
                      c,
                      (K[(c + 11) | 0] >>> 7) | 0
                        ? ((J[(c + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = b;
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      b = J[c >> 2];
                    } else {
                      b = c;
                    }
                    J[(a + 180) >> 2] = d + b;
                  }
                  g = (a + 252) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = H[i | 0];
                  }
                  if (
                    db(
                      (d << 24) >> 24,
                      16,
                      b,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      0,
                      h,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      (a + 208) | 0,
                    )
                  ) {
                    break a;
                  }
                  Ba(g);
                  continue;
                }
                break;
              }
              ka(c, (J[(a + 180) >> 2] - b) | 0);
              if ((K[(c + 11) | 0] >>> 7) | 0) {
                b = J[c >> 2];
              } else {
                b = c;
              }
              d = Ha();
              J[(a + 4) >> 2] = f;
              if ((rd(b, d, (a + 4) | 0) | 0) != 1) {
                J[e >> 2] = 4;
              }
              if (qa((a + 252) | 0, (a + 248) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              b = J[(a + 252) >> 2];
              ja(c);
              ja(h);
              da = (a + 256) | 0;
              return b | 0;
            }
            function sg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0;
              a = (da - 336) | 0;
              da = a;
              J[(a + 328) >> 2] = c;
              J[(a + 332) >> 2] = b;
              h = Sa(d);
              j = ob(d, (a + 208) | 0);
              nb((a + 196) | 0, d, (a + 324) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (ua((a + 332) | 0, (a + 328) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 332) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = J[i >> 2];
                  }
                  if (
                    cb(
                      d,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      J[(a + 324) >> 2],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      j,
                    )
                  ) {
                    break a;
                  }
                  Ga(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              J[f >> 2] = zd(c, J[(a + 180) >> 2], e, h);
              J[(f + 4) >> 2] = ea;
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (ua((a + 332) | 0, (a + 328) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 332) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 336) | 0;
              return c | 0;
            }
            function qg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0;
              a = (da - 336) | 0;
              da = a;
              J[(a + 328) >> 2] = c;
              J[(a + 332) >> 2] = b;
              h = Sa(d);
              j = ob(d, (a + 208) | 0);
              nb((a + 196) | 0, d, (a + 324) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (ua((a + 332) | 0, (a + 328) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 332) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = J[i >> 2];
                  }
                  if (
                    cb(
                      d,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      J[(a + 324) >> 2],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      j,
                    )
                  ) {
                    break a;
                  }
                  Ga(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              J[f >> 2] = vd(c, J[(a + 180) >> 2], e, h);
              J[(f + 4) >> 2] = ea;
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (ua((a + 332) | 0, (a + 328) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 332) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 336) | 0;
              return c | 0;
            }
            function mg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 320) | 0;
              da = a;
              J[(a + 312) >> 2] = c;
              J[(a + 316) >> 2] = b;
              h = (a + 196) | 0;
              J[(h + 8) >> 2] = 0;
              J[h >> 2] = 0;
              J[(h + 4) >> 2] = 0;
              g = (a + 16) | 0;
              b = J[(d + 28) >> 2];
              J[g >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(g, 16784);
              fa[J[(J[b >> 2] + 48) >> 2]](b, 7664, 7690, (a + 208) | 0) | 0;
              wa(g);
              c = (a + 184) | 0;
              J[(c + 8) >> 2] = 0;
              J[c >> 2] = 0;
              J[(c + 4) >> 2] = 0;
              ka(
                c,
                (K[(c + 11) | 0] >>> 7) | 0
                  ? ((J[(c + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(c + 11) | 0] >>> 7) | 0) {
                b = J[c >> 2];
              } else {
                b = c;
              }
              J[(a + 180) >> 2] = b;
              J[(a + 12) >> 2] = g;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (ua((a + 316) | 0, (a + 312) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(c + 11) | 0] >>> 7) | 0) {
                    d = J[(c + 4) >> 2];
                  } else {
                    d = K[(c + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + b) | 0)) {
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      b = J[(c + 4) >> 2];
                    } else {
                      b = K[(c + 11) | 0] & 127;
                    }
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      d = J[(c + 4) >> 2];
                    } else {
                      d = K[(c + 11) | 0] & 127;
                    }
                    ka(c, d << 1);
                    ka(
                      c,
                      (K[(c + 11) | 0] >>> 7) | 0
                        ? ((J[(c + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = b;
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      b = J[c >> 2];
                    } else {
                      b = c;
                    }
                    J[(a + 180) >> 2] = d + b;
                  }
                  g = (a + 316) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = J[i >> 2];
                  }
                  if (
                    cb(
                      d,
                      16,
                      b,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      0,
                      h,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      (a + 208) | 0,
                    )
                  ) {
                    break a;
                  }
                  Ga(g);
                  continue;
                }
                break;
              }
              ka(c, (J[(a + 180) >> 2] - b) | 0);
              if ((K[(c + 11) | 0] >>> 7) | 0) {
                b = J[c >> 2];
              } else {
                b = c;
              }
              d = Ha();
              J[(a + 4) >> 2] = f;
              if ((rd(b, d, (a + 4) | 0) | 0) != 1) {
                J[e >> 2] = 4;
              }
              if (ua((a + 316) | 0, (a + 312) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              b = J[(a + 316) >> 2];
              ja(c);
              ja(h);
              da = (a + 320) | 0;
              return b | 0;
            }
            function zg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 256) | 0;
              da = a;
              J[(a + 248) >> 2] = c;
              J[(a + 252) >> 2] = b;
              h = Sa(d);
              pb((a + 196) | 0, d, (a + 247) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (qa((a + 252) | 0, (a + 248) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 252) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = H[i | 0];
                  }
                  if (
                    db(
                      (d << 24) >> 24,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      H[(a + 247) | 0],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      7664,
                    )
                  ) {
                    break a;
                  }
                  Ba(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              J[f >> 2] = vd(c, J[(a + 180) >> 2], e, h);
              J[(f + 4) >> 2] = ea;
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (qa((a + 252) | 0, (a + 248) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 252) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 256) | 0;
              return c | 0;
            }
            function Bg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 256) | 0;
              da = a;
              J[(a + 248) >> 2] = c;
              J[(a + 252) >> 2] = b;
              h = Sa(d);
              pb((a + 196) | 0, d, (a + 247) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (qa((a + 252) | 0, (a + 248) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 252) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = H[i | 0];
                  }
                  if (
                    db(
                      (d << 24) >> 24,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      H[(a + 247) | 0],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      7664,
                    )
                  ) {
                    break a;
                  }
                  Ba(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              J[f >> 2] = zd(c, J[(a + 180) >> 2], e, h);
              J[(f + 4) >> 2] = ea;
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (qa((a + 252) | 0, (a + 248) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 252) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 256) | 0;
              return c | 0;
            }
            function tg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0;
              a = (da - 336) | 0;
              da = a;
              J[(a + 328) >> 2] = c;
              J[(a + 332) >> 2] = b;
              h = Sa(d);
              j = ob(d, (a + 208) | 0);
              nb((a + 196) | 0, d, (a + 324) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (ua((a + 332) | 0, (a + 328) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 332) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = J[i >> 2];
                  }
                  if (
                    cb(
                      d,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      J[(a + 324) >> 2],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      j,
                    )
                  ) {
                    break a;
                  }
                  Ga(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              J[f >> 2] = Bd(c, J[(a + 180) >> 2], e, h);
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (ua((a + 332) | 0, (a + 328) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 332) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 336) | 0;
              return c | 0;
            }
            function rg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0;
              a = (da - 336) | 0;
              da = a;
              J[(a + 328) >> 2] = c;
              J[(a + 332) >> 2] = b;
              h = Sa(d);
              j = ob(d, (a + 208) | 0);
              nb((a + 196) | 0, d, (a + 324) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (ua((a + 332) | 0, (a + 328) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 332) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = J[i >> 2];
                  }
                  if (
                    cb(
                      d,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      J[(a + 324) >> 2],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      j,
                    )
                  ) {
                    break a;
                  }
                  Ga(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              I[f >> 1] = yd(c, J[(a + 180) >> 2], e, h);
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (ua((a + 332) | 0, (a + 328) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 332) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 336) | 0;
              return c | 0;
            }
            function pd(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0;
              a = (da - 336) | 0;
              da = a;
              J[(a + 328) >> 2] = c;
              J[(a + 332) >> 2] = b;
              h = Sa(d);
              j = ob(d, (a + 208) | 0);
              nb((a + 196) | 0, d, (a + 324) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (ua((a + 332) | 0, (a + 328) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 332) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = J[i >> 2];
                  }
                  if (
                    cb(
                      d,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      J[(a + 324) >> 2],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      j,
                    )
                  ) {
                    break a;
                  }
                  Ga(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              J[f >> 2] = wd(c, J[(a + 180) >> 2], e, h);
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (ua((a + 332) | 0, (a + 328) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 332) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 336) | 0;
              return c | 0;
            }
            function Yd(a, b) {
              a = a | 0;
              b = b | 0;
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;
              g = (da - 16) | 0;
              da = g;
              a: {
                if ((b | 0) != -1) {
                  k = J[(a + 12) >> 2];
                  l = J[(a + 8) >> 2];
                  h = J[(a + 24) >> 2];
                  if ((h | 0) == J[(a + 28) >> 2]) {
                    d = -1;
                    if (!(K[(a + 48) | 0] & 16)) {
                      break a;
                    }
                    i = J[(a + 20) >> 2];
                    m = J[(a + 44) >> 2];
                    e = (da - 16) | 0;
                    da = e;
                    H[(e + 15) | 0] = 0;
                    b: {
                      c: {
                        c = (a + 32) | 0;
                        d = K[(c + 11) | 0];
                        j = (d >>> 7) | 0;
                        d: {
                          if (!j) {
                            f = d & 127;
                            d = 10;
                            break d;
                          }
                          f = J[(c + 4) >> 2];
                          d = ((J[(c + 8) >> 2] & 2147483647) - 1) | 0;
                        }
                        if ((d | 0) == (f | 0)) {
                          _c(c, d, 1, d, d);
                          e: {
                            if ((K[(c + 11) | 0] >>> 7) | 0) {
                              break e;
                            }
                          }
                          break c;
                        }
                        f: {
                          if ((K[(c + 11) | 0] >>> 7) | 0) {
                            break f;
                          }
                        }
                        if (j) {
                          break c;
                        }
                        d = c;
                        H[(c + 11) | 0] = (f + 1) & 127;
                        break b;
                      }
                      d = J[c >> 2];
                      J[(c + 4) >> 2] = f + 1;
                    }
                    d = (d + f) | 0;
                    H[d | 0] = K[(e + 15) | 0];
                    H[(e + 14) | 0] = 0;
                    H[(d + 1) | 0] = K[(e + 14) | 0];
                    da = (e + 16) | 0;
                    ka(
                      c,
                      (K[(c + 11) | 0] >>> 7) | 0
                        ? ((J[(c + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = (K[(c + 11) | 0] >>> 7) | 0 ? J[c >> 2] : c;
                    J[(a + 28) >> 2] =
                      d +
                      ((K[(c + 11) | 0] >>> 7) | 0
                        ? J[(c + 4) >> 2]
                        : K[(c + 11) | 0] & 127);
                    J[(a + 20) >> 2] = d;
                    J[(a + 24) >> 2] = d;
                    J[(a + 24) >> 2] = J[(a + 24) >> 2] + ((h - i) | 0);
                    J[(a + 44) >> 2] = J[(a + 20) >> 2] + ((m - i) | 0);
                  }
                  J[(g + 12) >> 2] = J[(a + 24) >> 2] + 1;
                  c = (da - 16) | 0;
                  da = c;
                  da = (c + 16) | 0;
                  c = (a + 44) | 0;
                  d = (g + 12) | 0;
                  J[(a + 44) >> 2] = J[(M[d >> 2] < M[c >> 2] ? c : d) >> 2];
                  if (K[(a + 48) | 0] & 8) {
                    c = (a + 32) | 0;
                    if ((K[(c + 11) | 0] >>> 7) | 0) {
                      c = J[c >> 2];
                    }
                    J[(a + 16) >> 2] = J[(a + 44) >> 2];
                    J[(a + 12) >> 2] = c + ((k - l) | 0);
                    J[(a + 8) >> 2] = c;
                  }
                  b = (b << 24) >> 24;
                  c = J[(a + 24) >> 2];
                  g: {
                    if ((c | 0) == J[(a + 28) >> 2]) {
                      d = fa[J[(J[a >> 2] + 52) >> 2]](a, b & 255) | 0;
                      break g;
                    }
                    J[(a + 24) >> 2] = c + 1;
                    H[c | 0] = b;
                    d = b & 255;
                  }
                  break a;
                }
                d = (b | 0) != -1 ? b : 0;
              }
              a = d;
              da = (g + 16) | 0;
              return a | 0;
            }
            function xd(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 256) | 0;
              da = a;
              J[(a + 248) >> 2] = c;
              J[(a + 252) >> 2] = b;
              h = Sa(d);
              pb((a + 196) | 0, d, (a + 247) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (qa((a + 252) | 0, (a + 248) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 252) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = H[i | 0];
                  }
                  if (
                    db(
                      (d << 24) >> 24,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      H[(a + 247) | 0],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      7664,
                    )
                  ) {
                    break a;
                  }
                  Ba(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              J[f >> 2] = wd(c, J[(a + 180) >> 2], e, h);
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (qa((a + 252) | 0, (a + 248) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 252) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 256) | 0;
              return c | 0;
            }
            function Cg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 256) | 0;
              da = a;
              J[(a + 248) >> 2] = c;
              J[(a + 252) >> 2] = b;
              h = Sa(d);
              pb((a + 196) | 0, d, (a + 247) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (qa((a + 252) | 0, (a + 248) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 252) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = H[i | 0];
                  }
                  if (
                    db(
                      (d << 24) >> 24,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      H[(a + 247) | 0],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      7664,
                    )
                  ) {
                    break a;
                  }
                  Ba(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              J[f >> 2] = Bd(c, J[(a + 180) >> 2], e, h);
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (qa((a + 252) | 0, (a + 248) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 252) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 256) | 0;
              return c | 0;
            }
            function Ag(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              a = (da - 256) | 0;
              da = a;
              J[(a + 248) >> 2] = c;
              J[(a + 252) >> 2] = b;
              h = Sa(d);
              pb((a + 196) | 0, d, (a + 247) | 0);
              b = (a + 184) | 0;
              J[(b + 8) >> 2] = 0;
              J[b >> 2] = 0;
              J[(b + 4) >> 2] = 0;
              ka(
                b,
                (K[(b + 11) | 0] >>> 7) | 0
                  ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                  : 10,
              );
              if ((K[(b + 11) | 0] >>> 7) | 0) {
                c = J[b >> 2];
              } else {
                c = b;
              }
              J[(a + 180) >> 2] = c;
              J[(a + 12) >> 2] = a + 16;
              J[(a + 8) >> 2] = 0;
              while (1) {
                a: {
                  if (qa((a + 252) | 0, (a + 248) | 0)) {
                    break a;
                  }
                  g = J[(a + 180) >> 2];
                  if ((K[(b + 11) | 0] >>> 7) | 0) {
                    d = J[(b + 4) >> 2];
                  } else {
                    d = K[(b + 11) | 0] & 127;
                  }
                  if ((g | 0) == ((d + c) | 0)) {
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[(b + 4) >> 2];
                    } else {
                      c = K[(b + 11) | 0] & 127;
                    }
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      d = J[(b + 4) >> 2];
                    } else {
                      d = K[(b + 11) | 0] & 127;
                    }
                    ka(b, d << 1);
                    ka(
                      b,
                      (K[(b + 11) | 0] >>> 7) | 0
                        ? ((J[(b + 8) >> 2] & 2147483647) - 1) | 0
                        : 10,
                    );
                    d = c;
                    if ((K[(b + 11) | 0] >>> 7) | 0) {
                      c = J[b >> 2];
                    } else {
                      c = b;
                    }
                    J[(a + 180) >> 2] = d + c;
                  }
                  g = (a + 252) | 0;
                  d = J[g >> 2];
                  i = J[(d + 12) >> 2];
                  b: {
                    if ((i | 0) == J[(d + 16) >> 2]) {
                      d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                      break b;
                    }
                    d = H[i | 0];
                  }
                  if (
                    db(
                      (d << 24) >> 24,
                      h,
                      c,
                      (a + 180) | 0,
                      (a + 8) | 0,
                      H[(a + 247) | 0],
                      (a + 196) | 0,
                      (a + 16) | 0,
                      (a + 12) | 0,
                      7664,
                    )
                  ) {
                    break a;
                  }
                  Ba(g);
                  continue;
                }
                break;
              }
              if ((K[(a + 207) | 0] >>> 7) | 0) {
                d = J[(a + 200) >> 2];
              } else {
                d = K[(a + 207) | 0] & 127;
              }
              c: {
                if (!d) {
                  break c;
                }
                d = J[(a + 12) >> 2];
                if (((d - ((a + 16) | 0)) | 0) > 159) {
                  break c;
                }
                J[(a + 12) >> 2] = d + 4;
                J[d >> 2] = J[(a + 8) >> 2];
              }
              I[f >> 1] = yd(c, J[(a + 180) >> 2], e, h);
              Da((a + 196) | 0, (a + 16) | 0, J[(a + 12) >> 2], e);
              if (qa((a + 252) | 0, (a + 248) | 0)) {
                J[e >> 2] = J[e >> 2] | 2;
              }
              c = J[(a + 252) >> 2];
              ja(b);
              ja((a + 196) | 0);
              da = (a + 256) | 0;
              return c | 0;
            }
            function ue(a, b, c, d, e) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              var f = 0,
                g = 0,
                h = 0;
              if (Ka(a, J[(b + 8) >> 2], e)) {
                if (!((J[(b + 28) >> 2] == 1) | (J[(b + 4) >> 2] != (c | 0)))) {
                  J[(b + 28) >> 2] = d;
                }
                return;
              }
              a: {
                b: {
                  if (Ka(a, J[b >> 2], e)) {
                    if (
                      !(
                        (J[(b + 16) >> 2] != (c | 0)) &
                        (J[(b + 20) >> 2] != (c | 0))
                      )
                    ) {
                      if ((d | 0) != 1) {
                        break a;
                      }
                      J[(b + 32) >> 2] = 1;
                      return;
                    }
                    J[(b + 32) >> 2] = d;
                    if (J[(b + 44) >> 2] == 4) {
                      break b;
                    }
                    f = (a + 16) | 0;
                    g = (f + (J[(a + 12) >> 2] << 3)) | 0;
                    d = 0;
                    while (1) {
                      c: {
                        d: {
                          e: {
                            f: {
                              if (f >>> 0 >= g >>> 0) {
                                break f;
                              }
                              I[(b + 52) >> 1] = 0;
                              Jb(f, b, c, c, 1, e);
                              if (K[(b + 54) | 0]) {
                                break f;
                              }
                              if (K[(b + 53) | 0] != 1) {
                                break c;
                              }
                              if (K[(b + 52) | 0] == 1) {
                                if (J[(b + 24) >> 2] == 1) {
                                  break d;
                                }
                                d = 1;
                                h = 1;
                                if (!(K[(a + 8) | 0] & 2)) {
                                  break d;
                                }
                                break c;
                              }
                              d = 1;
                              if (H[(a + 8) | 0] & 1) {
                                break c;
                              }
                              a = 3;
                              break e;
                            }
                            a = d ? 3 : 4;
                          }
                          J[(b + 44) >> 2] = a;
                          if (h) {
                            break a;
                          }
                          break b;
                        }
                        J[(b + 44) >> 2] = 3;
                        break a;
                      }
                      f = (f + 8) | 0;
                      continue;
                    }
                  }
                  f = J[(a + 12) >> 2];
                  g = (a + 16) | 0;
                  ub(g, b, c, d, e);
                  if (f >>> 0 < 2) {
                    break a;
                  }
                  g = (g + (f << 3)) | 0;
                  f = (a + 24) | 0;
                  a = J[(a + 8) >> 2];
                  if (!(!(a & 2) & (J[(b + 36) >> 2] != 1))) {
                    while (1) {
                      if (K[(b + 54) | 0]) {
                        break a;
                      }
                      ub(f, b, c, d, e);
                      f = (f + 8) | 0;
                      if (g >>> 0 > f >>> 0) {
                        continue;
                      }
                      break;
                    }
                    break a;
                  }
                  if (!(a & 1)) {
                    while (1) {
                      if (K[(b + 54) | 0] | (J[(b + 36) >> 2] == 1)) {
                        break a;
                      }
                      ub(f, b, c, d, e);
                      f = (f + 8) | 0;
                      if (g >>> 0 > f >>> 0) {
                        continue;
                      }
                      break a;
                    }
                  }
                  while (1) {
                    if (
                      K[(b + 54) | 0] |
                      ((J[(b + 36) >> 2] == 1) & (J[(b + 24) >> 2] == 1))
                    ) {
                      break a;
                    }
                    ub(f, b, c, d, e);
                    f = (f + 8) | 0;
                    if (g >>> 0 > f >>> 0) {
                      continue;
                    }
                    break;
                  }
                  break a;
                }
                J[(b + 20) >> 2] = c;
                J[(b + 40) >> 2] = J[(b + 40) >> 2] + 1;
                if ((J[(b + 36) >> 2] != 1) | (J[(b + 24) >> 2] != 2)) {
                  break a;
                }
                H[(b + 54) | 0] = 1;
              }
            }
            function qb(a, b, c, d, e) {
              var f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0;
              l = (da - 16) | 0;
              da = l;
              a: {
                b: {
                  c: {
                    if ((c | 0) <= 36) {
                      g = K[a | 0];
                      if (g) {
                        break c;
                      }
                      f = a;
                      break b;
                    }
                    J[3876] = 28;
                    d = 0;
                    e = 0;
                    break a;
                  }
                  f = a;
                  d: {
                    while (1) {
                      h = (g << 24) >> 24;
                      if (!(((h | 0) == 32) | ((h - 9) >>> 0 < 5))) {
                        break d;
                      }
                      g = K[(f + 1) | 0];
                      f = (f + 1) | 0;
                      if (g) {
                        continue;
                      }
                      break;
                    }
                    break b;
                  }
                  e: {
                    h = g & 255;
                    switch ((h - 43) | 0) {
                      case 0:
                      case 2:
                        break e;
                      default:
                        break b;
                    }
                  }
                  j = (h | 0) == 45 ? -1 : 0;
                  f = (f + 1) | 0;
                }
                f: {
                  if (!(((c | 16) != 16) | (K[f | 0] != 48))) {
                    n = 1;
                    if ((K[(f + 1) | 0] & 223) == 88) {
                      f = (f + 2) | 0;
                      m = 16;
                      break f;
                    }
                    f = (f + 1) | 0;
                    m = c ? c : 8;
                    break f;
                  }
                  m = c ? c : 10;
                }
                c = 0;
                while (1) {
                  g: {
                    h = K[f | 0];
                    g = (h - 48) | 0;
                    h: {
                      if ((g & 255) >>> 0 < 10) {
                        break h;
                      }
                      if (((h - 97) & 255) >>> 0 <= 25) {
                        g = (h - 87) | 0;
                        break h;
                      }
                      if (((h - 65) & 255) >>> 0 > 25) {
                        break g;
                      }
                      g = (h - 55) | 0;
                    }
                    g = g & 255;
                    if ((g | 0) >= (m | 0)) {
                      break g;
                    }
                    ya(l, m, 0, 0, 0, k, i, 0, 0);
                    h = 1;
                    i: {
                      if (J[(l + 8) >> 2] | J[(l + 12) >> 2]) {
                        break i;
                      }
                      o = Pg(k, i, m, 0);
                      p = ea;
                      if (((p | 0) == -1) & ((g ^ -1) >>> 0 < o >>> 0)) {
                        break i;
                      }
                      i = p;
                      k = (g + o) | 0;
                      i = k >>> 0 < g >>> 0 ? (i + 1) | 0 : i;
                      n = 1;
                      h = c;
                    }
                    f = (f + 1) | 0;
                    c = h;
                    continue;
                  }
                  break;
                }
                if (b) {
                  J[b >> 2] = n ? f : a;
                }
                j: {
                  k: {
                    if (c) {
                      J[3876] = 68;
                      a = d & 1;
                      j = a ? 0 : j;
                      k = d;
                      i = e;
                      break k;
                    }
                    if (
                      (((e | 0) == (i | 0)) & (d >>> 0 > k >>> 0)) |
                      (e >>> 0 > i >>> 0)
                    ) {
                      break j;
                    }
                    a = d & 1;
                  }
                  if (!(a | j)) {
                    J[3876] = 68;
                    a = d;
                    d = (a - 1) | 0;
                    e = (e - !a) | 0;
                    break a;
                  }
                  if (
                    (((e | 0) == (i | 0)) & (d >>> 0 >= k >>> 0)) |
                    (e >>> 0 > i >>> 0)
                  ) {
                    break j;
                  }
                  J[3876] = 68;
                  break a;
                }
                a = j ^ k;
                d = (a - j) | 0;
                b = j >> 31;
                e = ((b ^ i) - (((a >>> 0 < j >>> 0) + b) | 0)) | 0;
              }
              da = (l + 16) | 0;
              ea = e;
              return d;
            }
            function Sb(a, b, c, d, e, f, g, h, i, j, k, l) {
              var m = 0;
              m = (da - 16) | 0;
              da = m;
              J[(m + 12) >> 2] = a;
              a: {
                b: {
                  if ((a | 0) == (f | 0)) {
                    if (K[b | 0] != 1) {
                      break b;
                    }
                    a = 0;
                    H[b | 0] = 0;
                    b = J[e >> 2];
                    J[e >> 2] = b + 1;
                    H[b | 0] = 46;
                    if ((K[(h + 11) | 0] >>> 7) | 0) {
                      b = J[(h + 4) >> 2];
                    } else {
                      b = K[(h + 11) | 0] & 127;
                    }
                    if (!b) {
                      break a;
                    }
                    b = J[j >> 2];
                    if (((b - i) | 0) > 159) {
                      break a;
                    }
                    c = J[k >> 2];
                    J[j >> 2] = b + 4;
                    J[b >> 2] = c;
                    break a;
                  }
                  c: {
                    if ((K[(h + 11) | 0] >>> 7) | 0) {
                      f = J[(h + 4) >> 2];
                    } else {
                      f = K[(h + 11) | 0] & 127;
                    }
                    if (!(!f | ((a | 0) != (g | 0)))) {
                      if (K[b | 0] != 1) {
                        break b;
                      }
                      a = J[j >> 2];
                      if (((a - i) | 0) > 159) {
                        break c;
                      }
                      b = J[k >> 2];
                      J[j >> 2] = a + 4;
                      J[a >> 2] = b;
                      a = 0;
                      J[k >> 2] = 0;
                      break a;
                    }
                    a = (od(l, (l + 112) | 0, (m + 12) | 0) - l) | 0;
                    g = a >> 2;
                    if ((g | 0) > 27) {
                      break b;
                    }
                    f = H[(g + 7664) | 0];
                    d: {
                      e: {
                        a = a & -5;
                        if ((a | 0) != 88) {
                          if ((a | 0) != 96) {
                            break e;
                          }
                          b = J[e >> 2];
                          if ((b | 0) != (d | 0)) {
                            a = -1;
                            d = H[(b - 1) | 0];
                            c = H[c | 0];
                            if (
                              (((d - 97) >>> 0 < 26 ? d & 95 : d) | 0) !=
                              (((c - 97) >>> 0 < 26 ? c & 95 : c) | 0)
                            ) {
                              break a;
                            }
                          }
                          J[e >> 2] = b + 1;
                          H[b | 0] = f;
                          break c;
                        }
                        H[c | 0] = 80;
                        break d;
                      }
                      a = (f - 97) >>> 0 < 26 ? f & 95 : f;
                      if ((a | 0) != H[c | 0]) {
                        break d;
                      }
                      H[c | 0] = (a - 65) >>> 0 < 26 ? a | 32 : a;
                      if (K[b | 0] != 1) {
                        break d;
                      }
                      H[b | 0] = 0;
                      if ((K[(h + 11) | 0] >>> 7) | 0) {
                        a = J[(h + 4) >> 2];
                      } else {
                        a = K[(h + 11) | 0] & 127;
                      }
                      if (!a) {
                        break d;
                      }
                      a = J[j >> 2];
                      if (((a - i) | 0) > 159) {
                        break d;
                      }
                      b = J[k >> 2];
                      J[j >> 2] = a + 4;
                      J[a >> 2] = b;
                    }
                    a = J[e >> 2];
                    J[e >> 2] = a + 1;
                    H[a | 0] = f;
                    a = 0;
                    if ((g | 0) > 21) {
                      break a;
                    }
                    J[k >> 2] = J[k >> 2] + 1;
                    break a;
                  }
                  a = 0;
                  break a;
                }
                a = -1;
              }
              da = (m + 16) | 0;
              return a;
            }
            function Wb(a, b, c, d, e, f, g, h, i, j, k, l) {
              var m = 0;
              m = (da - 16) | 0;
              da = m;
              H[(m + 15) | 0] = a;
              a: {
                b: {
                  if ((a | 0) == (f | 0)) {
                    if (K[b | 0] != 1) {
                      break b;
                    }
                    a = 0;
                    H[b | 0] = 0;
                    b = J[e >> 2];
                    J[e >> 2] = b + 1;
                    H[b | 0] = 46;
                    if ((K[(h + 11) | 0] >>> 7) | 0) {
                      b = J[(h + 4) >> 2];
                    } else {
                      b = K[(h + 11) | 0] & 127;
                    }
                    if (!b) {
                      break a;
                    }
                    b = J[j >> 2];
                    if (((b - i) | 0) > 159) {
                      break a;
                    }
                    c = J[k >> 2];
                    J[j >> 2] = b + 4;
                    J[b >> 2] = c;
                    break a;
                  }
                  c: {
                    if ((K[(h + 11) | 0] >>> 7) | 0) {
                      f = J[(h + 4) >> 2];
                    } else {
                      f = K[(h + 11) | 0] & 127;
                    }
                    if (!(!f | ((a | 0) != (g | 0)))) {
                      if (K[b | 0] != 1) {
                        break b;
                      }
                      a = J[j >> 2];
                      if (((a - i) | 0) > 159) {
                        break c;
                      }
                      b = J[k >> 2];
                      J[j >> 2] = a + 4;
                      J[a >> 2] = b;
                      a = 0;
                      J[k >> 2] = 0;
                      break a;
                    }
                    g = (qd(l, (l + 28) | 0, (m + 15) | 0) - l) | 0;
                    if ((g | 0) > 27) {
                      break b;
                    }
                    f = H[(g + 7664) | 0];
                    d: {
                      e: {
                        switch (((g & -2) - 22) | 0) {
                          case 2:
                            b = J[e >> 2];
                            if ((b | 0) != (d | 0)) {
                              a = -1;
                              d = H[(b - 1) | 0];
                              c = H[c | 0];
                              if (
                                (((d - 97) >>> 0 < 26 ? d & 95 : d) | 0) !=
                                (((c - 97) >>> 0 < 26 ? c & 95 : c) | 0)
                              ) {
                                break a;
                              }
                            }
                            J[e >> 2] = b + 1;
                            H[b | 0] = f;
                            break c;
                          case 0:
                            H[c | 0] = 80;
                            break d;
                          default:
                            break e;
                        }
                      }
                      a = (f - 97) >>> 0 < 26 ? f & 95 : f;
                      if ((a | 0) != H[c | 0]) {
                        break d;
                      }
                      H[c | 0] = (a - 65) >>> 0 < 26 ? a | 32 : a;
                      if (K[b | 0] != 1) {
                        break d;
                      }
                      H[b | 0] = 0;
                      if ((K[(h + 11) | 0] >>> 7) | 0) {
                        a = J[(h + 4) >> 2];
                      } else {
                        a = K[(h + 11) | 0] & 127;
                      }
                      if (!a) {
                        break d;
                      }
                      a = J[j >> 2];
                      if (((a - i) | 0) > 159) {
                        break d;
                      }
                      b = J[k >> 2];
                      J[j >> 2] = a + 4;
                      J[a >> 2] = b;
                    }
                    a = J[e >> 2];
                    J[e >> 2] = a + 1;
                    H[a | 0] = f;
                    a = 0;
                    if ((g | 0) > 21) {
                      break a;
                    }
                    J[k >> 2] = J[k >> 2] + 1;
                    break a;
                  }
                  a = 0;
                  break a;
                }
                a = -1;
              }
              da = (m + 16) | 0;
              return a;
            }
            function _b(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0;
              g = (da - 32) | 0;
              da = g;
              e = d & 65535;
              f = (d >>> 16) & 32767;
              j = f;
              a: {
                if ((f - 15361) >>> 0 <= 2045) {
                  e = (e << 4) | (c >>> 28);
                  c = c << 4;
                  f = e;
                  e = (b >>> 28) | c;
                  c = f;
                  f = (j - 15360) | 0;
                  b = b & 268435455;
                  b: {
                    if (
                      (((b | 0) == 134217728) & ((a | 0) != 0)) |
                      (b >>> 0 > 134217728)
                    ) {
                      e = (e + 1) | 0;
                      c = e ? c : (c + 1) | 0;
                      break b;
                    }
                    if (a | ((b | 0) != 134217728)) {
                      break b;
                    }
                    a = e;
                    e = (e + (e & 1)) | 0;
                    c = a >>> 0 > e >>> 0 ? (c + 1) | 0 : c;
                  }
                  h = c >>> 0 > 1048575;
                  a = h ? 0 : e;
                  b = h ? 0 : c;
                  e = 0;
                  c = (f + h) | 0;
                  f = c >>> 0 < f >>> 0 ? 1 : e;
                  break a;
                }
                if (
                  !(!(a | c | (b | e)) | (((f | 0) != 32767) | ((h | 0) != 0)))
                ) {
                  a = c;
                  c = (e << 4) | (c >>> 28);
                  a = (a << 4) | (b >>> 28);
                  b = c | 524288;
                  c = 2047;
                  f = 0;
                  break a;
                }
                if (j >>> 0 > 17406) {
                  a = 0;
                  b = 0;
                  c = 2047;
                  f = 0;
                  break a;
                }
                i = !(f | h);
                f = i ? 15360 : 15361;
                h = (f - j) | 0;
                if ((h | 0) > 112) {
                  a = 0;
                  b = 0;
                  c = 0;
                  f = 0;
                  break a;
                }
                e = i ? e : e | 65536;
                i = 0;
                if ((f | 0) != (j | 0)) {
                  za((g + 16) | 0, a, b, c, e, (128 - h) | 0);
                  i =
                    (J[(g + 16) >> 2] |
                      J[(g + 24) >> 2] |
                      (J[(g + 20) >> 2] | J[(g + 28) >> 2])) !=
                    0;
                }
                _a(g, a, b, c, e, h);
                a = J[(g + 8) >> 2];
                h = a << 4;
                b = (J[(g + 12) >> 2] << 4) | (a >>> 28);
                a = J[(g + 4) >> 2];
                f = a;
                a = (a >>> 28) | h;
                f = f & 268435455;
                c = J[g >> 2] | i;
                c: {
                  if (
                    (((f | 0) == 134217728) & ((c | 0) != 0)) |
                    (f >>> 0 > 134217728)
                  ) {
                    a = (a + 1) | 0;
                    b = a ? b : (b + 1) | 0;
                    break c;
                  }
                  if (c | ((f | 0) != 134217728)) {
                    break c;
                  }
                  e = b;
                  b = a;
                  a = (a + (a & 1)) | 0;
                  b = b >>> 0 > a >>> 0 ? (e + 1) | 0 : e;
                }
                c = b >>> 0 > 1048575;
                b = c ? b ^ 1048576 : b;
                f = 0;
              }
              da = (g + 32) | 0;
              u(0, a | 0);
              u(1, b | ((d & -2147483648) | (c << 20)));
              return +w();
            }
            function eb(a, b, c) {
              var d = 0,
                e = 0;
              if (c >>> 0 >= 512) {
                if (c) {
                  y(a, b, c);
                }
                return;
              }
              d = (a + c) | 0;
              a: {
                if (!((a ^ b) & 3)) {
                  b: {
                    if (!(a & 3)) {
                      c = a;
                      break b;
                    }
                    if (!c) {
                      c = a;
                      break b;
                    }
                    c = a;
                    while (1) {
                      H[c | 0] = K[b | 0];
                      b = (b + 1) | 0;
                      c = (c + 1) | 0;
                      if (!(c & 3)) {
                        break b;
                      }
                      if (c >>> 0 < d >>> 0) {
                        continue;
                      }
                      break;
                    }
                  }
                  a = d & -4;
                  c: {
                    if (d >>> 0 < 64) {
                      break c;
                    }
                    e = (a + -64) | 0;
                    if (e >>> 0 < c >>> 0) {
                      break c;
                    }
                    while (1) {
                      J[c >> 2] = J[b >> 2];
                      J[(c + 4) >> 2] = J[(b + 4) >> 2];
                      J[(c + 8) >> 2] = J[(b + 8) >> 2];
                      J[(c + 12) >> 2] = J[(b + 12) >> 2];
                      J[(c + 16) >> 2] = J[(b + 16) >> 2];
                      J[(c + 20) >> 2] = J[(b + 20) >> 2];
                      J[(c + 24) >> 2] = J[(b + 24) >> 2];
                      J[(c + 28) >> 2] = J[(b + 28) >> 2];
                      J[(c + 32) >> 2] = J[(b + 32) >> 2];
                      J[(c + 36) >> 2] = J[(b + 36) >> 2];
                      J[(c + 40) >> 2] = J[(b + 40) >> 2];
                      J[(c + 44) >> 2] = J[(b + 44) >> 2];
                      J[(c + 48) >> 2] = J[(b + 48) >> 2];
                      J[(c + 52) >> 2] = J[(b + 52) >> 2];
                      J[(c + 56) >> 2] = J[(b + 56) >> 2];
                      J[(c + 60) >> 2] = J[(b + 60) >> 2];
                      b = (b - -64) | 0;
                      c = (c - -64) | 0;
                      if (e >>> 0 >= c >>> 0) {
                        continue;
                      }
                      break;
                    }
                  }
                  if (a >>> 0 <= c >>> 0) {
                    break a;
                  }
                  while (1) {
                    J[c >> 2] = J[b >> 2];
                    b = (b + 4) | 0;
                    c = (c + 4) | 0;
                    if (a >>> 0 > c >>> 0) {
                      continue;
                    }
                    break;
                  }
                  break a;
                }
                if (d >>> 0 < 4) {
                  c = a;
                  break a;
                }
                if (c >>> 0 < 4) {
                  c = a;
                  break a;
                }
                e = (d - 4) | 0;
                c = a;
                while (1) {
                  H[c | 0] = K[b | 0];
                  H[(c + 1) | 0] = K[(b + 1) | 0];
                  H[(c + 2) | 0] = K[(b + 2) | 0];
                  H[(c + 3) | 0] = K[(b + 3) | 0];
                  b = (b + 4) | 0;
                  c = (c + 4) | 0;
                  if (e >>> 0 >= c >>> 0) {
                    continue;
                  }
                  break;
                }
              }
              if (c >>> 0 < d >>> 0) {
                while (1) {
                  H[c | 0] = K[b | 0];
                  b = (b + 1) | 0;
                  c = (c + 1) | 0;
                  if ((d | 0) != (c | 0)) {
                    continue;
                  }
                  break;
                }
              }
            }
            function Aa(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
              e = (da - 32) | 0;
              da = e;
              J[(e + 28) >> 2] = 0;
              f = (da - 16) | 0;
              da = f;
              H[(e + 27) | 0] = 0;
              c = (J[(J[a >> 2] - 12) >> 2] + a) | 0;
              a: {
                if (!J[(c + 16) >> 2]) {
                  c = J[(c + 72) >> 2];
                  if (c) {
                    yc(c);
                  }
                  c = (J[(J[a >> 2] - 12) >> 2] + a) | 0;
                  b: {
                    if (!(J[(c + 4) >> 2] & 4096)) {
                      break b;
                    }
                    d = (f + 12) | 0;
                    c = J[(c + 28) >> 2];
                    J[d >> 2] = c;
                    if ((c | 0) != 16608) {
                      J[(c + 4) >> 2] = J[(c + 4) >> 2] + 1;
                    }
                    i = sa(d, 16792);
                    wa(d);
                    c = (f + 8) | 0;
                    J[c >> 2] =
                      J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 24) >> 2];
                    g = (f + 4) | 0;
                    J[g >> 2] = 0;
                    while (1) {
                      c: {
                        if (qa(c, g)) {
                          break c;
                        }
                        d = J[c >> 2];
                        h = J[(d + 12) >> 2];
                        d: {
                          if ((h | 0) == J[(d + 16) >> 2]) {
                            d = fa[J[(J[d >> 2] + 36) >> 2]](d) | 0;
                            break d;
                          }
                          d = H[h | 0];
                        }
                        d = (d << 24) >> 24;
                        if (d >>> 0 < 128) {
                          d = J[(J[(i + 8) >> 2] + (d << 2)) >> 2] & 1;
                        } else {
                          d = 0;
                        }
                        if (!d) {
                          break c;
                        }
                        Ba(c);
                        continue;
                      }
                      break;
                    }
                    if (!qa(c, g)) {
                      break b;
                    }
                    jb((J[(J[a >> 2] - 12) >> 2] + a) | 0, 6);
                  }
                  H[(e + 27) | 0] =
                    !J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 16) >> 2];
                  break a;
                }
                jb(c, 4);
              }
              da = (f + 16) | 0;
              if (K[(e + 27) | 0]) {
                c = (e + 16) | 0;
                f = J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 28) >> 2];
                J[c >> 2] = f;
                if ((f | 0) != 16608) {
                  J[(f + 4) >> 2] = J[(f + 4) >> 2] + 1;
                }
                f = sa(c, 16456);
                J[(e + 12) >> 2] =
                  J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 24) >> 2];
                J[(e + 8) >> 2] = 0;
                fa[J[(J[f >> 2] + 16) >> 2]](
                  f,
                  J[(e + 12) >> 2],
                  J[(e + 8) >> 2],
                  (J[(J[a >> 2] - 12) >> 2] + a) | 0,
                  (e + 28) | 0,
                  (e + 20) | 0,
                ) | 0;
                wa(c);
                J[b >> 2] = J[(e + 20) >> 2];
                jb((J[(J[a >> 2] - 12) >> 2] + a) | 0, J[(e + 28) >> 2]);
              }
              da = (e + 32) | 0;
            }
            function na(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
              a: {
                f = pc(b);
                e = (K[(a + 11) | 0] >>> 7) | 0;
                g = e ? ((J[(a + 8) >> 2] & 2147483647) - 1) | 0 : 1;
                if (g >>> 0 >= f >>> 0) {
                  g = e ? J[a >> 2] : a;
                  b: {
                    if (!f) {
                      break b;
                    }
                    c = f << 2;
                    if (!c) {
                      break b;
                    }
                    y(g, b, c);
                  }
                  b = (da - 16) | 0;
                  da = b;
                  c: {
                    if ((K[(a + 11) | 0] >>> 7) | 0) {
                      break c;
                    }
                  }
                  d: {
                    if ((K[(a + 11) | 0] >>> 7) | 0) {
                      J[(a + 4) >> 2] = f;
                      break d;
                    }
                    H[(a + 11) | 0] = f & 127;
                  }
                  J[(b + 12) >> 2] = 0;
                  J[(g + (f << 2)) >> 2] = J[(b + 12) >> 2];
                  da = (b + 16) | 0;
                  break a;
                }
                d = (da - 32) | 0;
                da = d;
                e = 1073741815;
                e: {
                  c = (f - g) | 0;
                  if (c >>> 0 <= ((g ^ -1) + 1073741815) >>> 0) {
                    i = (K[(a + 11) | 0] >>> 7) | 0 ? J[a >> 2] : a;
                    if (g >>> 0 < 536870899) {
                      J[(d + 28) >> 2] = g << 1;
                      J[(d + 16) >> 2] = c + g;
                      c = (da - 16) | 0;
                      da = c;
                      da = (c + 16) | 0;
                      e = (d + 28) | 0;
                      c = (d + 16) | 0;
                      c = J[(M[c >> 2] < M[e >> 2] ? e : c) >> 2];
                      if (c >>> 0 >= 2) {
                        c = (c + 2) & -2;
                        e = (c - 1) | 0;
                        c = (e | 0) == 2 ? c : e;
                      } else {
                        c = 1;
                      }
                      e = (c + 1) | 0;
                    }
                    J[(d + 24) >> 2] = a;
                    J[(d + 28) >> 2] = J[(d + 24) >> 2];
                    kb((d + 16) | 0, e);
                    h = J[(d + 16) >> 2];
                    if (f) {
                      f: {
                        if (!f) {
                          break f;
                        }
                        c = f << 2;
                        if (!c) {
                          break f;
                        }
                        y(h, b, c);
                      }
                    }
                    e = 0;
                    if ((g | 0) != 1) {
                      la(i);
                    }
                    J[a >> 2] = h;
                    J[(a + 8) >> 2] = J[(d + 20) >> 2] | -2147483648;
                    b = a;
                    a = (e + f) | 0;
                    J[(b + 4) >> 2] = a;
                    J[(d + 12) >> 2] = 0;
                    J[(h + (a << 2)) >> 2] = J[(d + 12) >> 2];
                    g: {
                      if ((K[(J[(d + 28) >> 2] + 11) | 0] >>> 7) | 0) {
                        break g;
                      }
                    }
                    da = (d + 32) | 0;
                    break e;
                  }
                  Fa();
                  C();
                }
              }
            }
            function Dc(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = c;
              J[(a + 8) >> 2] = f;
              a: {
                b: {
                  while (1) {
                    c: {
                      if (c >>> 0 >= d >>> 0) {
                        f = 0;
                        break c;
                      }
                      f = 2;
                      b = J[c >> 2];
                      if ((b >>> 0 > 1114111) | ((b & -2048) == 55296)) {
                        break c;
                      }
                      d: {
                        if (b >>> 0 <= 127) {
                          f = 1;
                          c = J[(a + 8) >> 2];
                          if (((g - c) | 0) <= 0) {
                            break c;
                          }
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = b;
                          break d;
                        }
                        if (b >>> 0 <= 2047) {
                          c = J[(a + 8) >> 2];
                          if (((g - c) | 0) < 2) {
                            break b;
                          }
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = (b >>> 6) | 192;
                          c = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = (b & 63) | 128;
                          break d;
                        }
                        c = J[(a + 8) >> 2];
                        f = (g - c) | 0;
                        if (b >>> 0 <= 65535) {
                          if ((f | 0) < 3) {
                            break b;
                          }
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = (b >>> 12) | 224;
                          c = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = ((b >>> 6) & 63) | 128;
                          c = J[(a + 8) >> 2];
                          J[(a + 8) >> 2] = c + 1;
                          H[c | 0] = (b & 63) | 128;
                          break d;
                        }
                        if ((f | 0) < 4) {
                          break b;
                        }
                        J[(a + 8) >> 2] = c + 1;
                        H[c | 0] = (b >>> 18) | 240;
                        c = J[(a + 8) >> 2];
                        J[(a + 8) >> 2] = c + 1;
                        H[c | 0] = ((b >>> 12) & 63) | 128;
                        c = J[(a + 8) >> 2];
                        J[(a + 8) >> 2] = c + 1;
                        H[c | 0] = ((b >>> 6) & 63) | 128;
                        c = J[(a + 8) >> 2];
                        J[(a + 8) >> 2] = c + 1;
                        H[c | 0] = (b & 63) | 128;
                      }
                      c = (J[(a + 12) >> 2] + 4) | 0;
                      J[(a + 12) >> 2] = c;
                      continue;
                    }
                    break;
                  }
                  break a;
                }
                f = 1;
              }
              J[e >> 2] = J[(a + 12) >> 2];
              J[h >> 2] = J[(a + 8) >> 2];
              da = (a + 16) | 0;
              return f | 0;
            }
            function sd(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0;
              i = (da - 32) | 0;
              da = i;
              a: {
                b: {
                  c: {
                    if ((b | 0) != (c | 0)) {
                      k = J[3876];
                      J[3876] = 0;
                      h = (da - 16) | 0;
                      da = h;
                      Ha();
                      f = (da - 16) | 0;
                      da = f;
                      e = (da - 16) | 0;
                      da = e;
                      g = (da - 16) | 0;
                      da = g;
                      Yb(g, b, (i + 28) | 0, 2);
                      l = J[g >> 2];
                      j = J[(g + 4) >> 2];
                      b = J[(g + 12) >> 2];
                      J[(e + 8) >> 2] = J[(g + 8) >> 2];
                      J[(e + 12) >> 2] = b;
                      J[e >> 2] = l;
                      J[(e + 4) >> 2] = j;
                      da = (g + 16) | 0;
                      j = J[e >> 2];
                      g = J[(e + 4) >> 2];
                      b = J[(e + 12) >> 2];
                      J[(f + 8) >> 2] = J[(e + 8) >> 2];
                      J[(f + 12) >> 2] = b;
                      J[f >> 2] = j;
                      J[(f + 4) >> 2] = g;
                      da = (e + 16) | 0;
                      g = J[f >> 2];
                      e = J[(f + 4) >> 2];
                      b = J[(f + 12) >> 2];
                      J[(h + 8) >> 2] = J[(f + 8) >> 2];
                      J[(h + 12) >> 2] = b;
                      J[h >> 2] = g;
                      J[(h + 4) >> 2] = e;
                      da = (f + 16) | 0;
                      f = J[h >> 2];
                      e = J[(h + 4) >> 2];
                      b = J[(h + 12) >> 2];
                      J[(i + 16) >> 2] = J[(h + 8) >> 2];
                      J[(i + 20) >> 2] = b;
                      J[(i + 8) >> 2] = f;
                      J[(i + 12) >> 2] = e;
                      da = (h + 16) | 0;
                      f = J[(i + 16) >> 2];
                      h = J[(i + 20) >> 2];
                      e = J[(i + 8) >> 2];
                      b = J[(i + 12) >> 2];
                      g = b;
                      j = J[3876];
                      if (!j) {
                        break c;
                      }
                      if (J[(i + 28) >> 2] != (c | 0)) {
                        break b;
                      }
                      m = e;
                      n = g;
                      o = f;
                      p = h;
                      if ((j | 0) != 68) {
                        break a;
                      }
                      break b;
                    }
                    J[d >> 2] = 4;
                    break a;
                  }
                  J[3876] = k;
                  if (J[(i + 28) >> 2] == (c | 0)) {
                    break a;
                  }
                }
                J[d >> 2] = 4;
                e = m;
                g = n;
                f = o;
                h = p;
              }
              J[a >> 2] = e;
              J[(a + 4) >> 2] = g;
              J[(a + 8) >> 2] = f;
              J[(a + 12) >> 2] = h;
              da = (i + 32) | 0;
            }
            function Id(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0;
              f = (da - 32) | 0;
              da = f;
              g = d & 65535;
              h = (d >>> 16) & 32767;
              j = h;
              a: {
                if ((h - 16257) >>> 0 <= 253) {
                  e = ((g & 33554431) << 7) | (c >>> 25);
                  g = 0;
                  c = c & 33554431;
                  b: {
                    if (
                      !(!g & ((c | 0) == 16777216)
                        ? !(a | b)
                        : 1 & (c >>> 0 < 16777216))
                    ) {
                      e = (e + 1) | 0;
                      break b;
                    }
                    if ((c ^ 16777216) | a | (b | g)) {
                      break b;
                    }
                    e = ((e & 1) + e) | 0;
                  }
                  a = e >>> 0 > 8388607;
                  e = a ? 0 : e;
                  a = (j + (a ? -16255 : -16256)) | 0;
                  break a;
                }
                if (!(!(a | c | (b | g)) | (i | ((h | 0) != 32767)))) {
                  e = ((g & 33554431) << 7) | (c >>> 25) | 4194304;
                  a = 255;
                  break a;
                }
                if (j >>> 0 > 16510) {
                  a = 255;
                  break a;
                }
                i = !(i | h);
                h = i ? 16256 : 16257;
                e = (h - j) | 0;
                if ((e | 0) > 112) {
                  e = 0;
                  a = 0;
                  break a;
                }
                g = i ? g : g | 65536;
                i = 0;
                if ((h | 0) != (j | 0)) {
                  za((f + 16) | 0, a, b, c, g, (128 - e) | 0);
                  i =
                    (J[(f + 16) >> 2] |
                      J[(f + 24) >> 2] |
                      (J[(f + 20) >> 2] | J[(f + 28) >> 2])) !=
                    0;
                }
                _a(f, a, b, c, g, e);
                a = J[(f + 8) >> 2];
                e = ((J[(f + 12) >> 2] & 33554431) << 7) | (a >>> 25);
                h = a & 33554431;
                a = i | J[f >> 2];
                c = J[(f + 4) >> 2];
                b = 0;
                c: {
                  if (
                    !(!b & ((h | 0) == 16777216)
                      ? !(a | c)
                      : 1 & (h >>> 0 < 16777216))
                  ) {
                    e = (e + 1) | 0;
                    break c;
                  }
                  if ((h ^ 16777216) | a | (b | c)) {
                    break c;
                  }
                  e = ((e & 1) + e) | 0;
                }
                a = e >>> 0 > 8388607;
                e = a ? e ^ 8388608 : e;
              }
              da = (f + 32) | 0;
              return (u(2, (d & -2147483648) | (a << 23) | e), E());
            }
            function Zb(a) {
              var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
              b = a;
              a: {
                if (b & 3) {
                  while (1) {
                    c = K[b | 0];
                    if (!c | ((c | 0) == 61)) {
                      break a;
                    }
                    b = (b + 1) | 0;
                    if (b & 3) {
                      continue;
                    }
                    break;
                  }
                }
                b: {
                  c: {
                    d = J[b >> 2];
                    if (((d | (16843008 - d)) & -2139062144) != -2139062144) {
                      break c;
                    }
                    while (1) {
                      c = d ^ 1027423549;
                      if ((((16843008 - c) | c) & -2139062144) != -2139062144) {
                        break c;
                      }
                      d = J[(b + 4) >> 2];
                      c = (b + 4) | 0;
                      b = c;
                      if ((((16843008 - d) | d) & -2139062144) == -2139062144) {
                        continue;
                      }
                      break;
                    }
                    break b;
                  }
                  c = b;
                }
                while (1) {
                  b = c;
                  d = K[b | 0];
                  if (!d) {
                    break a;
                  }
                  c = (b + 1) | 0;
                  if ((d | 0) != 61) {
                    continue;
                  }
                  break;
                }
              }
              if ((a | 0) == (b | 0)) {
                return 0;
              }
              g = (b - a) | 0;
              d: {
                if (K[(g + a) | 0]) {
                  break d;
                }
                f = J[4049];
                if (!f) {
                  break d;
                }
                b = J[f >> 2];
                if (!b) {
                  break d;
                }
                while (1) {
                  e: {
                    c = a;
                    d = g;
                    e = 0;
                    f: {
                      if (!d) {
                        break f;
                      }
                      e = K[c | 0];
                      if (e) {
                        g: {
                          while (1) {
                            h = K[b | 0];
                            if (((h | 0) != (e | 0)) | !h) {
                              break g;
                            }
                            d = (d - 1) | 0;
                            if (!d) {
                              break g;
                            }
                            b = (b + 1) | 0;
                            e = K[(c + 1) | 0];
                            c = (c + 1) | 0;
                            if (e) {
                              continue;
                            }
                            break;
                          }
                          e = 0;
                        }
                        c = e;
                      } else {
                        c = 0;
                      }
                      e = (c - K[b | 0]) | 0;
                    }
                    if (!e) {
                      c = (g + J[f >> 2]) | 0;
                      if (K[c | 0] == 61) {
                        break e;
                      }
                    }
                    b = J[(f + 4) >> 2];
                    f = (f + 4) | 0;
                    if (b) {
                      continue;
                    }
                    break d;
                  }
                  break;
                }
                i = (c + 1) | 0;
              }
              return i;
            }
            function ma(a) {
              var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0;
              b = J[(a + 112) >> 2];
              d = J[(a + 116) >> 2];
              g = (b | d) != 0;
              h = b;
              c = J[(a + 4) >> 2];
              f = J[(a + 44) >> 2];
              b = (c - f) | 0;
              i = b;
              e = (b + J[(a + 120) >> 2]) | 0;
              b = (J[(a + 124) >> 2] + (b >> 31)) | 0;
              a: {
                b = e >>> 0 < i >>> 0 ? (b + 1) | 0 : b;
                if (
                  !(
                    ((((b | 0) >= (d | 0)) & (e >>> 0 >= h >>> 0)) |
                      ((b | 0) > (d | 0))) &
                    g
                  )
                ) {
                  d = (da - 16) | 0;
                  da = d;
                  c = -1;
                  b: {
                    if (md(a)) {
                      break b;
                    }
                    if ((fa[J[(a + 32) >> 2]](a, (d + 15) | 0, 1) | 0) != 1) {
                      break b;
                    }
                    c = K[(d + 15) | 0];
                  }
                  da = (d + 16) | 0;
                  d = c;
                  if ((c | 0) >= 0) {
                    break a;
                  }
                  f = J[(a + 44) >> 2];
                  c = J[(a + 4) >> 2];
                }
                J[(a + 112) >> 2] = -1;
                J[(a + 116) >> 2] = -1;
                J[(a + 104) >> 2] = c;
                d = (f - c) | 0;
                c = (d + e) | 0;
                b = ((d >> 31) + b) | 0;
                J[(a + 120) >> 2] = c;
                J[(a + 124) >> 2] = c >>> 0 < d >>> 0 ? (b + 1) | 0 : b;
                return -1;
              }
              c = (e + 1) | 0;
              b = c ? b : (b + 1) | 0;
              h = J[(a + 4) >> 2];
              f = J[(a + 8) >> 2];
              e = J[(a + 116) >> 2];
              i = e;
              g = J[(a + 112) >> 2];
              c: {
                if (!(e | g)) {
                  break c;
                }
                e = (g - c) | 0;
                g = (i - ((b + (c >>> 0 > g >>> 0)) | 0)) | 0;
                j = (f - h) | 0;
                i = j >> 31;
                if (
                  (((g | 0) >= (i | 0)) & (e >>> 0 >= j >>> 0)) |
                  ((g | 0) > (i | 0))
                ) {
                  break c;
                }
                f = (e + h) | 0;
              }
              J[(a + 104) >> 2] = f;
              e = J[(a + 44) >> 2];
              f = (e - h) | 0;
              c = (f + c) | 0;
              b = ((f >> 31) + b) | 0;
              J[(a + 120) >> 2] = c;
              J[(a + 124) >> 2] = c >>> 0 < f >>> 0 ? (b + 1) | 0 : b;
              if (e >>> 0 >= h >>> 0) {
                H[(h - 1) | 0] = d;
              }
              return d;
            }
            function Xd(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;
              i = J[(b + 24) >> 2];
              if (i >>> 0 > M[(b + 44) >> 2]) {
                J[(b + 44) >> 2] = i;
              }
              i = -1;
              m = -1;
              j = f & 24;
              a: {
                if (!j | (((e | 0) == 1) & ((j | 0) == 24))) {
                  break a;
                }
                j = J[(b + 44) >> 2];
                if (j) {
                  g = (b + 32) | 0;
                  if ((K[(g + 11) | 0] >>> 7) | 0) {
                    g = J[g >> 2];
                  }
                  g = (j - g) | 0;
                  k = g >> 31;
                }
                b: {
                  c: {
                    switch (e | 0) {
                      case 1:
                        if (f & 8) {
                          h = (J[(b + 12) >> 2] - J[(b + 8) >> 2]) | 0;
                          l = h >> 31;
                          break b;
                        }
                        h = (J[(b + 24) >> 2] - J[(b + 20) >> 2]) | 0;
                        l = h >> 31;
                        break b;
                      case 0:
                        break b;
                      case 2:
                        break c;
                      default:
                        break a;
                    }
                  }
                  h = g;
                  l = k;
                }
                d = (d + l) | 0;
                c = (c + h) | 0;
                d = h >>> 0 > c >>> 0 ? (d + 1) | 0 : d;
                if (
                  ((d | 0) < 0) |
                  (((c >>> 0 > g >>> 0) & ((d | 0) >= (k | 0))) |
                    ((d | 0) > (k | 0)))
                ) {
                  break a;
                }
                e = f & 8;
                d: {
                  if (!(c | d)) {
                    break d;
                  }
                  if (J[(b + 12) >> 2] ? 0 : e) {
                    break a;
                  }
                  if (!(f & 16)) {
                    break d;
                  }
                  if (!J[(b + 24) >> 2]) {
                    break a;
                  }
                }
                if (e) {
                  e = J[(b + 8) >> 2];
                  J[(b + 16) >> 2] = J[(b + 44) >> 2];
                  J[(b + 12) >> 2] = c + e;
                  J[(b + 8) >> 2] = e;
                }
                if (f & 16) {
                  e = J[(b + 20) >> 2];
                  J[(b + 28) >> 2] = J[(b + 28) >> 2];
                  J[(b + 20) >> 2] = e;
                  J[(b + 24) >> 2] = e;
                  J[(b + 24) >> 2] = c + J[(b + 24) >> 2];
                }
                i = c;
                m = d;
              }
              J[(a + 8) >> 2] = i;
              J[(a + 12) >> 2] = m;
              J[a >> 2] = 0;
              J[(a + 4) >> 2] = 0;
            }
            function db(a, b, c, d, e, f, g, h, i, j) {
              var k = 0,
                l = 0,
                m = 0;
              k = (da - 16) | 0;
              da = k;
              H[(k + 15) | 0] = a;
              a: {
                b: {
                  c: {
                    l = J[d >> 2];
                    if ((l | 0) != (c | 0)) {
                      break c;
                    }
                    m = a & 255;
                    if ((m | 0) == K[(j + 24) | 0]) {
                      a = 43;
                    } else {
                      if (K[(j + 25) | 0] != (m | 0)) {
                        break c;
                      }
                      a = 45;
                    }
                    J[d >> 2] = l + 1;
                    H[l | 0] = a;
                    break b;
                  }
                  if ((K[(g + 11) | 0] >>> 7) | 0) {
                    g = J[(g + 4) >> 2];
                  } else {
                    g = K[(g + 11) | 0] & 127;
                  }
                  if (!(!g | ((a | 0) != (f | 0)))) {
                    a = 0;
                    b = J[i >> 2];
                    if (((b - h) | 0) > 159) {
                      break a;
                    }
                    a = J[e >> 2];
                    J[i >> 2] = b + 4;
                    J[b >> 2] = a;
                    break b;
                  }
                  a = -1;
                  f = (qd(j, (j + 26) | 0, (k + 15) | 0) - j) | 0;
                  if ((f | 0) > 23) {
                    break a;
                  }
                  d: {
                    e: {
                      switch ((b - 8) | 0) {
                        case 0:
                        case 2:
                          if ((b | 0) > (f | 0)) {
                            break d;
                          }
                          break a;
                        case 1:
                          break d;
                        default:
                          break e;
                      }
                    }
                    if (((b | 0) != 16) | ((f | 0) < 22)) {
                      break d;
                    }
                    b = J[d >> 2];
                    if (
                      ((b | 0) == (c | 0)) |
                      (((b - c) | 0) > 2) |
                      (K[(b - 1) | 0] != 48)
                    ) {
                      break a;
                    }
                    a = 0;
                    J[e >> 2] = 0;
                    J[d >> 2] = b + 1;
                    H[b | 0] = K[(f + 7664) | 0];
                    break a;
                  }
                  a = J[d >> 2];
                  J[d >> 2] = a + 1;
                  H[a | 0] = K[(f + 7664) | 0];
                  J[e >> 2] = J[e >> 2] + 1;
                  a = 0;
                  break a;
                }
                a = 0;
                J[e >> 2] = 0;
              }
              da = (k + 16) | 0;
              return a;
            }
            function cb(a, b, c, d, e, f, g, h, i, j) {
              var k = 0,
                l = 0;
              k = (da - 16) | 0;
              da = k;
              J[(k + 12) >> 2] = a;
              a: {
                b: {
                  c: {
                    l = J[d >> 2];
                    if ((l | 0) != (c | 0)) {
                      break c;
                    }
                    if (J[(j + 96) >> 2] == (a | 0)) {
                      a = 43;
                    } else {
                      if (J[(j + 100) >> 2] != (a | 0)) {
                        break c;
                      }
                      a = 45;
                    }
                    J[d >> 2] = l + 1;
                    H[l | 0] = a;
                    break b;
                  }
                  if ((K[(g + 11) | 0] >>> 7) | 0) {
                    g = J[(g + 4) >> 2];
                  } else {
                    g = K[(g + 11) | 0] & 127;
                  }
                  if (!(!g | ((a | 0) != (f | 0)))) {
                    a = 0;
                    b = J[i >> 2];
                    if (((b - h) | 0) > 159) {
                      break a;
                    }
                    a = J[e >> 2];
                    J[i >> 2] = b + 4;
                    J[b >> 2] = a;
                    break b;
                  }
                  a = -1;
                  f = (od(j, (j + 104) | 0, (k + 12) | 0) - j) >> 2;
                  if ((f | 0) > 23) {
                    break a;
                  }
                  d: {
                    e: {
                      switch ((b - 8) | 0) {
                        case 0:
                        case 2:
                          if ((b | 0) > (f | 0)) {
                            break d;
                          }
                          break a;
                        case 1:
                          break d;
                        default:
                          break e;
                      }
                    }
                    if (((b | 0) != 16) | ((f | 0) < 22)) {
                      break d;
                    }
                    b = J[d >> 2];
                    if (
                      ((b | 0) == (c | 0)) |
                      (((b - c) | 0) > 2) |
                      (K[(b - 1) | 0] != 48)
                    ) {
                      break a;
                    }
                    a = 0;
                    J[e >> 2] = 0;
                    J[d >> 2] = b + 1;
                    H[b | 0] = K[(f + 7664) | 0];
                    break a;
                  }
                  a = J[d >> 2];
                  J[d >> 2] = a + 1;
                  H[a | 0] = K[(f + 7664) | 0];
                  J[e >> 2] = J[e >> 2] + 1;
                  a = 0;
                  break a;
                }
                a = 0;
                J[e >> 2] = 0;
              }
              da = (k + 16) | 0;
              return a;
            }
            function Nd(a, b, c, d, e, f) {
              var g = 0;
              g = (da - 80) | 0;
              da = g;
              a: {
                if ((f | 0) >= 16384) {
                  pa((g + 32) | 0, b, c, d, e, 0, 0, 0, 2147352576);
                  d = J[(g + 40) >> 2];
                  e = J[(g + 44) >> 2];
                  b = J[(g + 32) >> 2];
                  c = J[(g + 36) >> 2];
                  if (f >>> 0 < 32767) {
                    f = (f - 16383) | 0;
                    break a;
                  }
                  pa((g + 16) | 0, b, c, d, e, 0, 0, 0, 2147352576);
                  f = ((f >>> 0 >= 49149 ? 49149 : f) - 32766) | 0;
                  d = J[(g + 24) >> 2];
                  e = J[(g + 28) >> 2];
                  b = J[(g + 16) >> 2];
                  c = J[(g + 20) >> 2];
                  break a;
                }
                if ((f | 0) > -16383) {
                  break a;
                }
                pa((g - -64) | 0, b, c, d, e, 0, 0, 0, 7471104);
                d = J[(g + 72) >> 2];
                e = J[(g + 76) >> 2];
                b = J[(g + 64) >> 2];
                c = J[(g + 68) >> 2];
                if (f >>> 0 > 4294934644) {
                  f = (f + 16269) | 0;
                  break a;
                }
                pa((g + 48) | 0, b, c, d, e, 0, 0, 0, 7471104);
                f = ((f >>> 0 <= 4294918376 ? -48920 : f) + 32538) | 0;
                d = J[(g + 56) >> 2];
                e = J[(g + 60) >> 2];
                b = J[(g + 48) >> 2];
                c = J[(g + 52) >> 2];
              }
              pa(g, b, c, d, e, 0, 0, 0, (f + 16383) << 16);
              b = J[(g + 12) >> 2];
              J[(a + 8) >> 2] = J[(g + 8) >> 2];
              J[(a + 12) >> 2] = b;
              b = J[(g + 4) >> 2];
              J[a >> 2] = J[g >> 2];
              J[(a + 4) >> 2] = b;
              da = (g + 80) | 0;
            }
            function Ra(a, b, c, d, e) {
              var f = 0,
                g = 0,
                h = 0,
                i = 0;
              i = (da - 16) | 0;
              da = i;
              J[(i + 12) >> 2] = b;
              b = 0;
              h = 6;
              a: {
                b: {
                  if (qa(a, (i + 12) | 0)) {
                    break b;
                  }
                  f = J[a >> 2];
                  g = J[(f + 12) >> 2];
                  c: {
                    if ((g | 0) == J[(f + 16) >> 2]) {
                      f = fa[J[(J[f >> 2] + 36) >> 2]](f) | 0;
                      break c;
                    }
                    f = H[g | 0];
                  }
                  g = (f << 24) >> 24;
                  if (g >>> 0 < 128) {
                    f = (J[(J[(d + 8) >> 2] + (g << 2)) >> 2] & 64) != 0;
                  } else {
                    f = 0;
                  }
                  h = 4;
                  if (!f) {
                    break b;
                  }
                  b = fa[J[(J[d >> 2] + 36) >> 2]](d, g, 0) | 0;
                  while (1) {
                    d: {
                      Ba(a);
                      b = (b - 48) | 0;
                      if (qa(a, (i + 12) | 0) | ((e | 0) < 2)) {
                        break d;
                      }
                      f = J[a >> 2];
                      g = J[(f + 12) >> 2];
                      e: {
                        if ((g | 0) == J[(f + 16) >> 2]) {
                          f = fa[J[(J[f >> 2] + 36) >> 2]](f) | 0;
                          break e;
                        }
                        f = H[g | 0];
                      }
                      f = (f << 24) >> 24;
                      if (f >>> 0 < 128) {
                        h = (J[(J[(d + 8) >> 2] + (f << 2)) >> 2] & 64) != 0;
                      } else {
                        h = 0;
                      }
                      if (!h) {
                        break a;
                      }
                      e = (e - 1) | 0;
                      b =
                        ((fa[J[(J[d >> 2] + 36) >> 2]](d, f, 0) | 0) +
                          P(b, 10)) |
                        0;
                      continue;
                    }
                    break;
                  }
                  if (!qa(a, (i + 12) | 0)) {
                    break a;
                  }
                  h = 2;
                }
                J[c >> 2] = h | J[c >> 2];
              }
              da = (i + 16) | 0;
              return b;
            }
            function Ed(a, b) {
              var c = 0,
                d = 0,
                e = 0;
              a: {
                if (K[b | 0]) {
                  break a;
                }
                b = Zb(1621);
                if (K[b | 0] ? b : 0) {
                  break a;
                }
                b = Zb((P(a, 12) + 4080) | 0);
                if (K[b | 0] ? b : 0) {
                  break a;
                }
                b = Zb(1634);
                if (K[b | 0] ? b : 0) {
                  break a;
                }
                b = 1692;
              }
              b: {
                while (1) {
                  d = K[(b + c) | 0];
                  if (!(!d | ((d | 0) == 47))) {
                    d = 23;
                    c = (c + 1) | 0;
                    if ((c | 0) != 23) {
                      continue;
                    }
                    break b;
                  }
                  break;
                }
                d = c;
              }
              e = 1692;
              c: {
                d: {
                  c = K[b | 0];
                  e: {
                    f: {
                      if (!(K[(b + d) | 0] | ((c | 0) == 46))) {
                        e = b;
                        if ((c | 0) != 67) {
                          break f;
                        }
                      }
                      if (!K[(e + 1) | 0]) {
                        break e;
                      }
                    }
                    if (!Cb(e, 1692)) {
                      break e;
                    }
                    if (Cb(e, 1590)) {
                      break d;
                    }
                  }
                  if (!a) {
                    c = 2948;
                    if (K[(e + 1) | 0] == 46) {
                      break c;
                    }
                  }
                  return 0;
                }
                c = J[4051];
                if (c) {
                  while (1) {
                    if (!Cb(e, (c + 8) | 0)) {
                      break c;
                    }
                    c = J[(c + 32) >> 2];
                    if (c) {
                      continue;
                    }
                    break;
                  }
                }
                c = La(36);
                if (c) {
                  b = J[738];
                  J[c >> 2] = J[737];
                  J[(c + 4) >> 2] = b;
                  b = (c + 8) | 0;
                  eb(b, e, d);
                  H[(b + d) | 0] = 0;
                  J[(c + 32) >> 2] = J[4051];
                  J[4051] = c;
                }
                c = a | c ? c : 2948;
              }
              return c;
            }
            function Ha() {
              var a = 0,
                b = 0,
                c = 0,
                d = 0;
              if (K[16604]) {
                return J[4150];
              }
              c = (da - 32) | 0;
              da = c;
              a: {
                b: {
                  while (1) {
                    b = (c + 8) | 0;
                    d = Ed(a, (1 << a) & 2147483647 ? 1643 : 1746);
                    J[(b + (a << 2)) >> 2] = d;
                    if ((d | 0) == -1) {
                      break b;
                    }
                    a = (a + 1) | 0;
                    if ((a | 0) != 6) {
                      continue;
                    }
                    break;
                  }
                  a = 2984;
                  if (!Bb(b, 2984)) {
                    break a;
                  }
                  a = 3008;
                  if (!Bb(b, 3008)) {
                    break a;
                  }
                  a = 0;
                  if (!K[16256]) {
                    while (1) {
                      J[((a << 2) + 16208) >> 2] = Ed(a, 1746);
                      a = (a + 1) | 0;
                      if ((a | 0) != 6) {
                        continue;
                      }
                      break;
                    }
                    H[16256] = 1;
                    J[4058] = J[4052];
                  }
                  a = 16208;
                  b = (c + 8) | 0;
                  if (!Bb(b, 16208)) {
                    break a;
                  }
                  a = 16232;
                  if (!Bb(b, 16232)) {
                    break a;
                  }
                  a = La(24);
                  if (!a) {
                    break b;
                  }
                  b = J[(c + 28) >> 2];
                  J[(a + 16) >> 2] = J[(c + 24) >> 2];
                  J[(a + 20) >> 2] = b;
                  b = J[(c + 20) >> 2];
                  J[(a + 8) >> 2] = J[(c + 16) >> 2];
                  J[(a + 12) >> 2] = b;
                  b = J[(c + 12) >> 2];
                  J[a >> 2] = J[(c + 8) >> 2];
                  J[(a + 4) >> 2] = b;
                  break a;
                }
                a = 0;
              }
              da = (c + 32) | 0;
              H[16604] = 1;
              J[4150] = a;
              return a;
            }
            function _c(a, b, c, d, e) {
              var f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0;
              h = (da - 16) | 0;
              da = h;
              J[(h + 8) >> 2] = a;
              J[(h + 12) >> 2] = J[(h + 8) >> 2];
              g = (da - 16) | 0;
              da = g;
              a: {
                if ((2147483639 - b) >>> 0 >= c >>> 0) {
                  if ((K[(a + 11) | 0] >>> 7) | 0) {
                    f = J[a >> 2];
                  } else {
                    f = a;
                  }
                  j = f;
                  f = (g + 4) | 0;
                  if (b >>> 0 < 1073741811) {
                    J[(g + 12) >> 2] = b << 1;
                    J[(g + 4) >> 2] = b + c;
                    c = (da - 16) | 0;
                    da = c;
                    da = (c + 16) | 0;
                    c = (g + 12) | 0;
                    c = J[(M[f >> 2] < M[c >> 2] ? c : f) >> 2];
                    if (c >>> 0 >= 11) {
                      i = (c + 8) & -8;
                      c = (i - 1) | 0;
                      c = (c | 0) == 11 ? i : c;
                    } else {
                      c = 10;
                    }
                    c = (c + 1) | 0;
                  } else {
                    c = 2147483639;
                  }
                  ab(f, c);
                  c = J[(g + 4) >> 2];
                  if (e) {
                    f = !e;
                    if (!(f | f)) {
                      y(c, j, e);
                    }
                  }
                  if ((d | 0) != (e | 0)) {
                    f = (c + e) | 0;
                    i = (e + j) | 0;
                    e = (d - e) | 0;
                    k = !e;
                    if (!(k | k)) {
                      y(f, i, e);
                    }
                  }
                  if ((b | 0) != 10) {
                    la(j);
                  }
                  J[a >> 2] = c;
                  J[(a + 8) >> 2] = J[(g + 8) >> 2] | -2147483648;
                  da = (g + 16) | 0;
                  break a;
                }
                Fa();
                C();
              }
              J[(a + 4) >> 2] = d;
              b: {
                if ((K[(J[(h + 12) >> 2] + 11) | 0] >>> 7) | 0) {
                  break b;
                }
              }
              da = (h + 16) | 0;
            }
            function Mb(a, b, c, d, e, f, g) {
              var h = 0,
                i = 0,
                j = 0;
              h = (da - 32) | 0;
              da = h;
              i = 2147483639;
              if (((b ^ -1) + 2147483639) >>> 0 >= c >>> 0) {
                j = (K[(a + 11) | 0] >>> 7) | 0 ? J[a >> 2] : a;
                if (b >>> 0 < 1073741811) {
                  J[(h + 28) >> 2] = b << 1;
                  J[(h + 16) >> 2] = b + c;
                  c = (da - 16) | 0;
                  da = c;
                  da = (c + 16) | 0;
                  c = (h + 28) | 0;
                  i = (h + 16) | 0;
                  c = J[(M[i >> 2] < M[c >> 2] ? c : i) >> 2];
                  if (c >>> 0 >= 11) {
                    i = (c + 8) & -8;
                    c = (i - 1) | 0;
                    c = (c | 0) == 11 ? i : c;
                  } else {
                    c = 10;
                  }
                  i = (c + 1) | 0;
                }
                J[(h + 24) >> 2] = a;
                J[(h + 28) >> 2] = J[(h + 24) >> 2];
                ab((h + 16) | 0, i);
                c = J[(h + 16) >> 2];
                if (f) {
                  i = !f;
                  if (!(i | i)) {
                    y(c, g, f);
                  }
                }
                g = (d - e) | 0;
                if ((d | 0) != (e | 0)) {
                  d = !g;
                  if (!(d | d)) {
                    y((c + f) | 0, (e + j) | 0, g);
                  }
                }
                if ((b | 0) != 10) {
                  la(j);
                }
                J[a >> 2] = c;
                J[(a + 8) >> 2] = J[(h + 20) >> 2] | -2147483648;
                b = a;
                a = (f + g) | 0;
                J[(b + 4) >> 2] = a;
                H[(h + 15) | 0] = 0;
                H[(a + c) | 0] = K[(h + 15) | 0];
                a: {
                  if ((K[(J[(h + 28) >> 2] + 11) | 0] >>> 7) | 0) {
                    break a;
                  }
                }
                da = (h + 32) | 0;
                return;
              }
              Fa();
              C();
            }
            function ug(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0;
              g = (da - 32) | 0;
              da = g;
              J[(g + 28) >> 2] = b;
              a: {
                if (!(J[(d + 4) >> 2] & 1)) {
                  J[g >> 2] = -1;
                  b = fa[J[(J[a >> 2] + 16) >> 2]](a, b, c, d, e, g) | 0;
                  b: {
                    switch (J[g >> 2]) {
                      case 0:
                        H[f | 0] = 0;
                        break a;
                      case 1:
                        H[f | 0] = 1;
                        break a;
                      default:
                        break b;
                    }
                  }
                  H[f | 0] = 1;
                  J[e >> 2] = 4;
                  break a;
                }
                a = J[(d + 28) >> 2];
                J[g >> 2] = a;
                if ((a | 0) != 16608) {
                  J[(a + 4) >> 2] = J[(a + 4) >> 2] + 1;
                }
                b = sa(g, 16784);
                wa(g);
                a = J[(d + 28) >> 2];
                J[g >> 2] = a;
                if ((a | 0) != 16608) {
                  J[(a + 4) >> 2] = J[(a + 4) >> 2] + 1;
                }
                a = sa(g, 16856);
                wa(g);
                fa[J[(J[a >> 2] + 24) >> 2]](g, a);
                fa[J[(J[a >> 2] + 28) >> 2]](g | 12, a);
                d = (g + 24) | 0;
                H[f | 0] = (zb((g + 28) | 0, c, g, d, b, e, 1) | 0) == (g | 0);
                b = J[(g + 28) >> 2];
                while (1) {
                  d = ja((d - 12) | 0);
                  if ((g | 0) != (d | 0)) {
                    continue;
                  }
                  break;
                }
              }
              da = (g + 32) | 0;
              return b | 0;
            }
            function Dg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0;
              g = (da - 32) | 0;
              da = g;
              J[(g + 28) >> 2] = b;
              a: {
                if (!(J[(d + 4) >> 2] & 1)) {
                  J[g >> 2] = -1;
                  b = fa[J[(J[a >> 2] + 16) >> 2]](a, b, c, d, e, g) | 0;
                  b: {
                    switch (J[g >> 2]) {
                      case 0:
                        H[f | 0] = 0;
                        break a;
                      case 1:
                        H[f | 0] = 1;
                        break a;
                      default:
                        break b;
                    }
                  }
                  H[f | 0] = 1;
                  J[e >> 2] = 4;
                  break a;
                }
                a = J[(d + 28) >> 2];
                J[g >> 2] = a;
                if ((a | 0) != 16608) {
                  J[(a + 4) >> 2] = J[(a + 4) >> 2] + 1;
                }
                b = sa(g, 16792);
                wa(g);
                a = J[(d + 28) >> 2];
                J[g >> 2] = a;
                if ((a | 0) != 16608) {
                  J[(a + 4) >> 2] = J[(a + 4) >> 2] + 1;
                }
                a = sa(g, 16848);
                wa(g);
                fa[J[(J[a >> 2] + 24) >> 2]](g, a);
                fa[J[(J[a >> 2] + 28) >> 2]](g | 12, a);
                d = (g + 24) | 0;
                H[f | 0] = (Ab((g + 28) | 0, c, g, d, b, e, 1) | 0) == (g | 0);
                b = J[(g + 28) >> 2];
                while (1) {
                  d = ja((d - 12) | 0);
                  if ((g | 0) != (d | 0)) {
                    continue;
                  }
                  break;
                }
              }
              da = (g + 32) | 0;
              return b | 0;
            }
            function Fd(a, b) {
              var c = 0,
                d = 0,
                e = 0;
              a: {
                H[a | 0] = b;
                c = (a + 257) | 0;
                H[(c - 1) | 0] = b;
                H[(a + 2) | 0] = b;
                H[(a + 1) | 0] = b;
                H[(c - 3) | 0] = b;
                H[(c - 2) | 0] = b;
                H[(a + 3) | 0] = b;
                H[(c - 4) | 0] = b;
                d = (0 - a) & 3;
                c = (d + a) | 0;
                a = P(b & 255, 16843009);
                J[c >> 2] = a;
                d = (257 - d) & -4;
                b = (d + c) | 0;
                J[(b - 4) >> 2] = a;
                if (d >>> 0 < 9) {
                  break a;
                }
                J[(c + 8) >> 2] = a;
                J[(c + 4) >> 2] = a;
                J[(b - 8) >> 2] = a;
                J[(b - 12) >> 2] = a;
                if (d >>> 0 < 25) {
                  break a;
                }
                J[(c + 24) >> 2] = a;
                J[(c + 20) >> 2] = a;
                J[(c + 16) >> 2] = a;
                J[(c + 12) >> 2] = a;
                J[(b - 16) >> 2] = a;
                J[(b - 20) >> 2] = a;
                J[(b - 24) >> 2] = a;
                J[(b - 28) >> 2] = a;
                b = (c & 4) | 24;
                e = (d - b) | 0;
                if (e >>> 0 < 32) {
                  break a;
                }
                a = Pg(a, 0, 1, 1);
                d = ea;
                b = (b + c) | 0;
                while (1) {
                  J[(b + 24) >> 2] = a;
                  J[(b + 28) >> 2] = d;
                  J[(b + 16) >> 2] = a;
                  J[(b + 20) >> 2] = d;
                  J[(b + 8) >> 2] = a;
                  J[(b + 12) >> 2] = d;
                  J[b >> 2] = a;
                  J[(b + 4) >> 2] = d;
                  b = (b + 32) | 0;
                  e = (e - 32) | 0;
                  if (e >>> 0 > 31) {
                    continue;
                  }
                  break;
                }
              }
            }
            function Qa(a, b, c, d, e) {
              var f = 0,
                g = 0,
                h = 0;
              h = (da - 16) | 0;
              da = h;
              J[(h + 12) >> 2] = b;
              b = 0;
              f = 6;
              a: {
                b: {
                  if (ua(a, (h + 12) | 0)) {
                    break b;
                  }
                  f = J[a >> 2];
                  g = J[(f + 12) >> 2];
                  c: {
                    if ((g | 0) == J[(f + 16) >> 2]) {
                      g = fa[J[(J[f >> 2] + 36) >> 2]](f) | 0;
                      break c;
                    }
                    g = J[g >> 2];
                  }
                  f = 4;
                  if (!(fa[J[(J[d >> 2] + 12) >> 2]](d, 64, g) | 0)) {
                    break b;
                  }
                  b = fa[J[(J[d >> 2] + 52) >> 2]](d, g, 0) | 0;
                  while (1) {
                    d: {
                      Ga(a);
                      b = (b - 48) | 0;
                      if (ua(a, (h + 12) | 0) | ((e | 0) < 2)) {
                        break d;
                      }
                      f = J[a >> 2];
                      g = J[(f + 12) >> 2];
                      e: {
                        if ((g | 0) == J[(f + 16) >> 2]) {
                          f = fa[J[(J[f >> 2] + 36) >> 2]](f) | 0;
                          break e;
                        }
                        f = J[g >> 2];
                      }
                      if (!(fa[J[(J[d >> 2] + 12) >> 2]](d, 64, f) | 0)) {
                        break a;
                      }
                      e = (e - 1) | 0;
                      b =
                        ((fa[J[(J[d >> 2] + 52) >> 2]](d, f, 0) | 0) +
                          P(b, 10)) |
                        0;
                      continue;
                    }
                    break;
                  }
                  if (!ua(a, (h + 12) | 0)) {
                    break a;
                  }
                  f = 2;
                }
                J[c >> 2] = f | J[c >> 2];
              }
              da = (h + 16) | 0;
              return b;
            }
            function Za(a, b, c, d, e, f, g, h) {
              var i = 0,
                j = 0,
                k = 0,
                l = 0;
              k = 1;
              i = d & 2147483647;
              j = i;
              l = (i | 0) == 2147418112;
              a: {
                if (
                  l & !c ? a | b : (l & ((c | 0) != 0)) | (i >>> 0 > 2147418112)
                ) {
                  break a;
                }
                i = h & 2147483647;
                if (
                  !g & ((i | 0) == 2147418112)
                    ? e | f
                    : (((i | 0) == 2147418112) & ((g | 0) != 0)) |
                      (i >>> 0 > 2147418112)
                ) {
                  break a;
                }
                if (!(a | e | (c | g) | (b | f | (i | j)))) {
                  return 0;
                }
                i = d & h;
                if ((i | 0) > 0) {
                  j = 1;
                } else {
                  j = (i | 0) >= 0;
                }
                if (j) {
                  if (
                    ((c | 0) == (g | 0)) & ((d | 0) == (h | 0))
                      ? (((b | 0) == (f | 0)) & (a >>> 0 < e >>> 0)) |
                        (b >>> 0 < f >>> 0)
                      : ((c >>> 0 < g >>> 0) & ((d | 0) <= (h | 0))) |
                        ((d | 0) < (h | 0))
                  ) {
                    return -1;
                  }
                  return ((a ^ e) | (c ^ g) | ((b ^ f) | (d ^ h))) != 0;
                }
                if (
                  ((c | 0) == (g | 0)) & ((d | 0) == (h | 0))
                    ? (((b | 0) == (f | 0)) & (a >>> 0 > e >>> 0)) |
                      (b >>> 0 > f >>> 0)
                    : ((c >>> 0 > g >>> 0) & ((d | 0) >= (h | 0))) |
                      ((d | 0) > (h | 0))
                ) {
                  return -1;
                }
                k = ((a ^ e) | (c ^ g) | ((b ^ f) | (d ^ h))) != 0;
              }
              return k;
            }
            function Db(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0;
              g = d ? d : 16192;
              d = J[g >> 2];
              a: {
                b: {
                  c: {
                    if (!b) {
                      if (d) {
                        break c;
                      }
                      return 0;
                    }
                    e = -2;
                    if (!c) {
                      break b;
                    }
                    d: {
                      if (d) {
                        e = c;
                        break d;
                      }
                      d = K[b | 0];
                      f = (d << 24) >> 24;
                      if ((f | 0) >= 0) {
                        if (a) {
                          J[a >> 2] = d;
                        }
                        return (f | 0) != 0;
                      }
                      if (!J[J[4039] >> 2]) {
                        e = 1;
                        if (!a) {
                          break b;
                        }
                        J[a >> 2] = f & 57343;
                        return 1;
                      }
                      d = (d - 194) | 0;
                      if (d >>> 0 > 50) {
                        break c;
                      }
                      d = J[((d << 2) + 3040) >> 2];
                      e = (c - 1) | 0;
                      if (!e) {
                        break a;
                      }
                      b = (b + 1) | 0;
                    }
                    f = K[b | 0];
                    h = (f >>> 3) | 0;
                    if (((h - 16) | ((d >> 26) + h)) >>> 0 > 7) {
                      break c;
                    }
                    while (1) {
                      e = (e - 1) | 0;
                      d = ((f & 255) - 128) | (d << 6);
                      if ((d | 0) >= 0) {
                        J[g >> 2] = 0;
                        if (a) {
                          J[a >> 2] = d;
                        }
                        return (c - e) | 0;
                      }
                      if (!e) {
                        break a;
                      }
                      b = (b + 1) | 0;
                      f = H[b | 0];
                      if ((f | 0) < -64) {
                        continue;
                      }
                      break;
                    }
                  }
                  J[g >> 2] = 0;
                  J[3876] = 25;
                  e = -1;
                }
                return e;
              }
              J[g >> 2] = d;
              return -2;
            }
            function re(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0;
              if (Ka(a, J[(b + 8) >> 2], f)) {
                Kb(b, c, d, e);
                return;
              }
              h = K[(b + 53) | 0];
              g = J[(a + 12) >> 2];
              H[(b + 53) | 0] = 0;
              i = K[(b + 52) | 0];
              H[(b + 52) | 0] = 0;
              j = (a + 16) | 0;
              Jb(j, b, c, d, e, f);
              k = K[(b + 52) | 0];
              i = i | k;
              l = K[(b + 53) | 0];
              h = h | l;
              a: {
                if (g >>> 0 < 2) {
                  break a;
                }
                j = (j + (g << 3)) | 0;
                g = (a + 24) | 0;
                while (1) {
                  if (K[(b + 54) | 0]) {
                    break a;
                  }
                  b: {
                    if (k & 1) {
                      if (J[(b + 24) >> 2] == 1) {
                        break a;
                      }
                      if (K[(a + 8) | 0] & 2) {
                        break b;
                      }
                      break a;
                    }
                    if (!(l & 1)) {
                      break b;
                    }
                    if (!(H[(a + 8) | 0] & 1)) {
                      break a;
                    }
                  }
                  I[(b + 52) >> 1] = 0;
                  Jb(g, b, c, d, e, f);
                  l = K[(b + 53) | 0];
                  h = (l | h) & 1;
                  k = K[(b + 52) | 0];
                  i = (k | i) & 1;
                  g = (g + 8) | 0;
                  if (j >>> 0 > g >>> 0) {
                    continue;
                  }
                  break;
                }
              }
              H[(b + 53) | 0] = h & 1;
              H[(b + 52) | 0] = i & 1;
            }
            function te(a, b, c, d, e) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              if (Ka(a, J[(b + 8) >> 2], e)) {
                if (!((J[(b + 28) >> 2] == 1) | (J[(b + 4) >> 2] != (c | 0)))) {
                  J[(b + 28) >> 2] = d;
                }
                return;
              }
              a: {
                if (Ka(a, J[b >> 2], e)) {
                  if (
                    !(
                      (J[(b + 16) >> 2] != (c | 0)) &
                      (J[(b + 20) >> 2] != (c | 0))
                    )
                  ) {
                    if ((d | 0) != 1) {
                      break a;
                    }
                    J[(b + 32) >> 2] = 1;
                    return;
                  }
                  J[(b + 32) >> 2] = d;
                  b: {
                    if (J[(b + 44) >> 2] == 4) {
                      break b;
                    }
                    I[(b + 52) >> 1] = 0;
                    a = J[(a + 8) >> 2];
                    fa[J[(J[a >> 2] + 20) >> 2]](a, b, c, c, 1, e);
                    if (K[(b + 53) | 0] == 1) {
                      J[(b + 44) >> 2] = 3;
                      if (!K[(b + 52) | 0]) {
                        break b;
                      }
                      break a;
                    }
                    J[(b + 44) >> 2] = 4;
                  }
                  J[(b + 20) >> 2] = c;
                  J[(b + 40) >> 2] = J[(b + 40) >> 2] + 1;
                  if ((J[(b + 36) >> 2] != 1) | (J[(b + 24) >> 2] != 2)) {
                    break a;
                  }
                  H[(b + 54) | 0] = 1;
                  return;
                }
                a = J[(a + 8) >> 2];
                fa[J[(J[a >> 2] + 24) >> 2]](a, b, c, d, e);
              }
            }
            function yc(a) {
              var b = 0,
                c = 0;
              b = (da - 16) | 0;
              da = b;
              if (J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 24) >> 2]) {
                J[(b + 12) >> 2] = a;
                H[(b + 8) | 0] = 0;
                if (!J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 16) >> 2]) {
                  c = J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 72) >> 2];
                  if (c) {
                    yc(c);
                  }
                  H[(b + 8) | 0] = 1;
                }
                a: {
                  if (!K[(b + 8) | 0]) {
                    break a;
                  }
                  c = J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 24) >> 2];
                  if ((fa[J[(J[c >> 2] + 24) >> 2]](c) | 0) != -1) {
                    break a;
                  }
                  jb((J[(J[a >> 2] - 12) >> 2] + a) | 0, 1);
                }
                a = J[(b + 12) >> 2];
                c = !J[(((J[(J[a >> 2] - 12) >> 2] + a) | 0) + 24) >> 2];
                a = (a + J[(J[a >> 2] - 12) >> 2]) | 0;
                b: {
                  if (c | J[(a + 16) >> 2] | !(J[(a + 4) >> 2] & 8192)) {
                    break b;
                  }
                  a = J[(a + 24) >> 2];
                  if ((fa[J[(J[a >> 2] + 24) >> 2]](a) | 0) != -1) {
                    break b;
                  }
                  a = J[(b + 12) >> 2];
                  jb((J[(J[a >> 2] - 12) >> 2] + a) | 0, 1);
                }
              }
              da = (b + 16) | 0;
            }
            function Qf(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0;
              e = (da - 16) | 0;
              da = e;
              while (1) {
                a: {
                  if ((c | 0) <= (g | 0)) {
                    break a;
                  }
                  d = J[(a + 12) >> 2];
                  h = J[(a + 16) >> 2];
                  b: {
                    if (d >>> 0 < h >>> 0) {
                      J[(e + 12) >> 2] = 2147483647;
                      J[(e + 8) >> 2] = h - d;
                      J[(e + 4) >> 2] = c - g;
                      d = (da - 16) | 0;
                      da = d;
                      da = (d + 16) | 0;
                      d = (da - 16) | 0;
                      da = d;
                      da = (d + 16) | 0;
                      h = J[(a + 12) >> 2];
                      d = (e + 4) | 0;
                      f = (e + 8) | 0;
                      d = J[d >> 2] < J[f >> 2] ? d : f;
                      f = (e + 12) | 0;
                      d = J[(J[d >> 2] < J[f >> 2] ? d : f) >> 2];
                      f = !d;
                      if (!(f | f)) {
                        y(b, h, d);
                      }
                      J[(a + 12) >> 2] = J[(a + 12) >> 2] + d;
                      break b;
                    }
                    d = fa[J[(J[a >> 2] + 40) >> 2]](a) | 0;
                    if ((d | 0) == -1) {
                      break a;
                    }
                    H[b | 0] = (d << 24) >> 24;
                    d = 1;
                  }
                  b = (b + d) | 0;
                  g = (d + g) | 0;
                  continue;
                }
                break;
              }
              da = (e + 16) | 0;
              return g | 0;
            }
            function Vc(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0;
              f = (da - 16) | 0;
              da = f;
              d = (da - 32) | 0;
              da = d;
              tc((d + 24) | 0, a, b);
              h = J[(d + 24) >> 2];
              b = (da - 16) | 0;
              da = b;
              e = J[(d + 28) >> 2];
              J[(b + 12) >> 2] = e;
              e = (e - h) | 0;
              g = e >> 2;
              a: {
                if (!g) {
                  break a;
                }
                g = g << 2;
                if (!g) {
                  break a;
                }
                y(c, h, g);
              }
              J[(b + 8) >> 2] = c + e;
              J[(d + 16) >> 2] = J[(b + 12) >> 2];
              J[(d + 20) >> 2] = J[(b + 8) >> 2];
              da = (b + 16) | 0;
              h = J[(d + 16) >> 2];
              b = (da - 16) | 0;
              da = b;
              J[(b + 12) >> 2] = a;
              a = (da - 16) | 0;
              da = a;
              e = (b + 12) | 0;
              J[(a + 12) >> 2] = J[e >> 2];
              da = (a + 16) | 0;
              a = Xc(e, (h - J[(a + 12) >> 2]) >> 2);
              da = (b + 16) | 0;
              J[(d + 12) >> 2] = a;
              J[(d + 8) >> 2] = ((J[(d + 20) >> 2] - c) | 0) + c;
              J[(f + 8) >> 2] = J[(d + 12) >> 2];
              J[(f + 12) >> 2] = J[(d + 8) >> 2];
              da = (d + 32) | 0;
              da = (f + 16) | 0;
              return J[(f + 12) >> 2];
            }
            function Ng() {
              var a = 0,
                b = 0,
                c = 0;
              a = (da - 16) | 0;
              da = a;
              a: {
                if (aa((a + 12) | 0, (a + 8) | 0) | 0) {
                  break a;
                }
                b = La(((J[(a + 12) >> 2] << 2) + 4) | 0);
                J[4049] = b;
                if (!b) {
                  break a;
                }
                b = La(J[(a + 8) >> 2]);
                if (b) {
                  c = J[4049];
                  J[(c + (J[(a + 12) >> 2] << 2)) >> 2] = 0;
                  if (!($(c | 0, b | 0) | 0)) {
                    break a;
                  }
                }
                J[4049] = 0;
              }
              da = (a + 16) | 0;
              H[15463] = 5;
              J[3860] = 1952867660;
              H[15451] = 4;
              H[15475] = 2;
              H[15487] = 4;
              I[7732] = 28757;
              J[3869] = 1853321028;
              J[3863] =
                K[1169] | (K[1170] << 8) | ((K[1171] << 16) | (K[1172] << 24));
              H[15456] = K[1173];
              H[15444] = 0;
              H[15457] = 0;
              H[15466] = 0;
              H[15480] = 0;
              J[4039] = 16036;
              J[4029] = 65536;
              J[4028] = 83872;
              J[4021] = 42;
              J[4030] = J[3851];
            }
            function Of(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0;
              a: {
                if (!((K[(f + 11) | 0] >>> 7) | 0)) {
                  J[(a + 8) >> 2] = J[(f + 8) >> 2];
                  b = J[(f + 4) >> 2];
                  J[a >> 2] = J[f >> 2];
                  J[(a + 4) >> 2] = b;
                  break a;
                }
                e = J[f >> 2];
                d = (da - 16) | 0;
                da = d;
                b: {
                  c: {
                    c = J[(f + 4) >> 2];
                    d: {
                      if (c >>> 0 < 2) {
                        b = a;
                        H[(a + 11) | 0] = c & 127;
                        break d;
                      }
                      if (c >>> 0 > 1073741815) {
                        break c;
                      }
                      g = (d + 8) | 0;
                      if (c >>> 0 >= 2) {
                        f = (c + 2) & -2;
                        b = (f - 1) | 0;
                        b = (b | 0) == 2 ? f : b;
                      } else {
                        b = 1;
                      }
                      kb(g, (b + 1) | 0);
                      b = J[(d + 8) >> 2];
                      J[a >> 2] = b;
                      J[(a + 8) >> 2] = J[(d + 12) >> 2] | -2147483648;
                      J[(a + 4) >> 2] = c;
                    }
                    a = (c + 1) | 0;
                    e: {
                      if (!a) {
                        break e;
                      }
                      a = a << 2;
                      if (!a) {
                        break e;
                      }
                      y(b, e, a);
                    }
                    da = (d + 16) | 0;
                    break b;
                  }
                  Fa();
                  C();
                }
              }
            }
            function Pa(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0;
              g = (da - 16) | 0;
              da = g;
              x(+b);
              c = s(1) | 0;
              e = s(0) | 0;
              j = c;
              f = c & 1048575;
              d = e;
              c = (c >>> 20) & 2047;
              e = 0;
              a: {
                if (c | e) {
                  if (((c | 0) != 2047) | e) {
                    h = ((f & 15) << 28) | (d >>> 4);
                    i = (f >>> 4) | 0;
                    c = (c + 15360) | 0;
                    e = d << 28;
                    d = 0;
                    break a;
                  }
                  h = ((f & 15) << 28) | (d >>> 4);
                  i = (f >>> 4) | 0;
                  c = 32767;
                  e = d << 28;
                  d = 0;
                  break a;
                }
                if (!(f | d)) {
                  c = 0;
                  d = 0;
                  break a;
                }
                e = f;
                f = S(f);
                c = (f | 0) == 32 ? (S(d) + 32) | 0 : f;
                za(g, d, e, 0, 0, (c + 49) | 0);
                h = J[(g + 8) >> 2];
                i = J[(g + 12) >> 2] ^ 65536;
                c = (15372 - c) | 0;
                e = J[(g + 4) >> 2];
                d = J[g >> 2];
              }
              J[a >> 2] = d;
              J[(a + 4) >> 2] = e;
              J[(a + 8) >> 2] = h;
              J[(a + 12) >> 2] = i | ((j & -2147483648) | (c << 16));
              da = (g + 16) | 0;
            }
            function _a(a, b, c, d, e, f) {
              var g = 0,
                h = 0,
                i = 0,
                j = 0;
              a: {
                if (f & 64) {
                  c = (f + -64) | 0;
                  b = c & 31;
                  if ((c & 63) >>> 0 >= 32) {
                    c = 0;
                    b = (e >>> b) | 0;
                  } else {
                    c = (e >>> b) | 0;
                    b = ((((1 << b) - 1) & e) << (32 - b)) | (d >>> b);
                  }
                  d = 0;
                  e = 0;
                  break a;
                }
                if (!f) {
                  break a;
                }
                i = d;
                h = (64 - f) | 0;
                g = h & 31;
                if ((h & 63) >>> 0 >= 32) {
                  h = d << g;
                  j = 0;
                } else {
                  h = (((1 << g) - 1) & (i >>> (32 - g))) | (e << g);
                  j = i << g;
                }
                i = b;
                b = f & 31;
                if ((f & 63) >>> 0 >= 32) {
                  g = 0;
                  b = (c >>> b) | 0;
                } else {
                  g = (c >>> b) | 0;
                  b = ((((1 << b) - 1) & c) << (32 - b)) | (i >>> b);
                }
                b = j | b;
                c = g | h;
                g = d;
                d = f & 31;
                if ((f & 63) >>> 0 >= 32) {
                  h = 0;
                  d = (e >>> d) | 0;
                } else {
                  h = (e >>> d) | 0;
                  d = ((((1 << d) - 1) & e) << (32 - d)) | (g >>> d);
                }
                e = h;
              }
              J[a >> 2] = b;
              J[(a + 4) >> 2] = c;
              J[(a + 8) >> 2] = d;
              J[(a + 12) >> 2] = e;
            }
            function We(a) {
              a = a | 0;
              if (K[16892]) {
                return J[4222];
              }
              if (!K[17952]) {
                H[17952] = 1;
              }
              na(17664, 13968);
              na(17676, 14e3);
              na(17688, 14036);
              na(17700, 14060);
              na(17712, 14084);
              na(17724, 14100);
              na(17736, 14120);
              na(17748, 14140);
              na(17760, 14168);
              na(17772, 14208);
              na(17784, 14240);
              na(17796, 14276);
              na(17808, 14312);
              na(17820, 14328);
              na(17832, 14344);
              na(17844, 14360);
              na(17856, 14084);
              na(17868, 14376);
              na(17880, 14392);
              na(17892, 14408);
              na(17904, 14424);
              na(17916, 14440);
              na(17928, 14456);
              na(17940, 14472);
              H[16892] = 1;
              J[4222] = 17664;
              return 17664;
            }
            function Wc(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0;
              f = (da - 16) | 0;
              da = f;
              d = (da - 32) | 0;
              da = d;
              tc((d + 24) | 0, a, b);
              g = J[(d + 24) >> 2];
              b = (da - 16) | 0;
              da = b;
              e = J[(d + 28) >> 2];
              J[(b + 12) >> 2] = e;
              e = (e - g) | 0;
              h = !e;
              if (!(h | h)) {
                y(c, g, e);
              }
              J[(b + 8) >> 2] = c + e;
              J[(d + 16) >> 2] = J[(b + 12) >> 2];
              J[(d + 20) >> 2] = J[(b + 8) >> 2];
              da = (b + 16) | 0;
              g = J[(d + 16) >> 2];
              b = (da - 16) | 0;
              da = b;
              J[(b + 12) >> 2] = a;
              a = (da - 16) | 0;
              da = a;
              e = (b + 12) | 0;
              J[(a + 12) >> 2] = J[e >> 2];
              da = (a + 16) | 0;
              a = Zc(e, (g - J[(a + 12) >> 2]) | 0);
              da = (b + 16) | 0;
              J[(d + 12) >> 2] = a;
              J[(d + 8) >> 2] = ((J[(d + 20) >> 2] - c) | 0) + c;
              J[(f + 8) >> 2] = J[(d + 12) >> 2];
              J[(f + 12) >> 2] = J[(d + 8) >> 2];
              da = (d + 32) | 0;
              da = (f + 16) | 0;
              return J[(f + 12) >> 2];
            }
            function za(a, b, c, d, e, f) {
              var g = 0,
                h = 0,
                i = 0;
              a: {
                if (f & 64) {
                  e = (f + -64) | 0;
                  f = b;
                  d = e & 31;
                  if ((e & 63) >>> 0 >= 32) {
                    e = f << d;
                    d = 0;
                  } else {
                    e = (((1 << d) - 1) & (f >>> (32 - d))) | (c << d);
                    d = f << d;
                  }
                  b = 0;
                  c = 0;
                  break a;
                }
                if (!f) {
                  break a;
                }
                h = d;
                g = f & 31;
                if ((f & 63) >>> 0 >= 32) {
                  i = d << g;
                  h = 0;
                } else {
                  i = (((1 << g) - 1) & (h >>> (32 - g))) | (e << g);
                  h = h << g;
                }
                g = b;
                e = (64 - f) | 0;
                d = e & 31;
                if ((e & 63) >>> 0 >= 32) {
                  e = 0;
                  d = (c >>> d) | 0;
                } else {
                  e = (c >>> d) | 0;
                  d = ((((1 << d) - 1) & c) << (32 - d)) | (g >>> d);
                }
                d = h | d;
                e = e | i;
                h = b;
                g = f & 31;
                if ((f & 63) >>> 0 >= 32) {
                  i = b << g;
                  b = 0;
                } else {
                  i = (((1 << g) - 1) & (h >>> (32 - g))) | (c << g);
                  b = h << g;
                }
                c = i;
              }
              J[a >> 2] = b;
              J[(a + 4) >> 2] = c;
              J[(a + 8) >> 2] = d;
              J[(a + 12) >> 2] = e;
            }
            function ka(a, b) {
              var c = 0,
                d = 0,
                e = 0;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                c = J[(a + 4) >> 2];
              } else {
                c = K[(a + 11) | 0] & 127;
              }
              if (c >>> 0 < b >>> 0) {
                e = (da - 16) | 0;
                da = e;
                d = (b - c) | 0;
                if (d) {
                  c =
                    (K[(a + 11) | 0] >>> 7) | 0
                      ? ((J[(a + 8) >> 2] & 2147483647) - 1) | 0
                      : 10;
                  if ((K[(a + 11) | 0] >>> 7) | 0) {
                    b = J[(a + 4) >> 2];
                  } else {
                    b = K[(a + 11) | 0] & 127;
                  }
                  if ((c - b) >>> 0 < d >>> 0) {
                    _c(a, c, (b + ((d - c) | 0)) | 0, b, b);
                  }
                  if ((K[(a + 11) | 0] >>> 7) | 0) {
                    c = J[a >> 2];
                  } else {
                    c = a;
                  }
                  oc((c + b) | 0, d, 0);
                  b = (b + d) | 0;
                  a: {
                    if ((K[(a + 11) | 0] >>> 7) | 0) {
                      J[(a + 4) >> 2] = b;
                      break a;
                    }
                    H[(a + 11) | 0] = b & 127;
                  }
                  H[(e + 15) | 0] = 0;
                  H[(b + c) | 0] = K[(e + 15) | 0];
                }
                da = (e + 16) | 0;
                return;
              }
              c = a;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                a = J[a >> 2];
              }
              vc(c, a, b);
            }
            function Gd(a, b, c) {
              var d = 0,
                e = 0;
              d = (c | 0) != 0;
              a: {
                b: {
                  c: {
                    if (!(a & 3) | !c) {
                      break c;
                    }
                    e = b & 255;
                    while (1) {
                      if ((e | 0) == K[a | 0]) {
                        break b;
                      }
                      c = (c - 1) | 0;
                      d = (c | 0) != 0;
                      a = (a + 1) | 0;
                      if (!(a & 3)) {
                        break c;
                      }
                      if (c) {
                        continue;
                      }
                      break;
                    }
                  }
                  if (!d) {
                    break a;
                  }
                  d = b & 255;
                  if (!(((d | 0) == K[a | 0]) | (c >>> 0 < 4))) {
                    d = P(d, 16843009);
                    while (1) {
                      e = d ^ J[a >> 2];
                      if ((((16843008 - e) | e) & -2139062144) != -2139062144) {
                        break b;
                      }
                      a = (a + 4) | 0;
                      c = (c - 4) | 0;
                      if (c >>> 0 > 3) {
                        continue;
                      }
                      break;
                    }
                  }
                  if (!c) {
                    break a;
                  }
                }
                b = b & 255;
                while (1) {
                  if ((b | 0) == K[a | 0]) {
                    return a;
                  }
                  a = (a + 1) | 0;
                  c = (c - 1) | 0;
                  if (c) {
                    continue;
                  }
                  break;
                }
              }
              return 0;
            }
            function Ye(a) {
              a = a | 0;
              if (K[16884]) {
                return J[4220];
              }
              if (!K[17648]) {
                H[17648] = 1;
              }
              oa(17360, 1042);
              oa(17372, 1033);
              oa(17384, 1429);
              oa(17396, 1398);
              oa(17408, 1112);
              oa(17420, 1481);
              oa(17432, 1050);
              oa(17444, 1162);
              oa(17456, 1237);
              oa(17468, 1220);
              oa(17480, 1228);
              oa(17492, 1247);
              oa(17504, 1387);
              oa(17516, 1565);
              oa(17528, 1272);
              oa(17540, 1193);
              oa(17552, 1112);
              oa(17564, 1360);
              oa(17576, 1391);
              oa(17588, 1435);
              oa(17600, 1340);
              oa(17612, 1175);
              oa(17624, 1154);
              oa(17636, 1561);
              H[16884] = 1;
              J[4220] = 17360;
              return 17360;
            }
            function vd(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                b: {
                  c: {
                    if ((a | 0) != (b | 0)) {
                      d: {
                        e: {
                          f = K[a | 0];
                          if ((f | 0) != 45) {
                            break e;
                          }
                          a = (a + 1) | 0;
                          if ((b | 0) != (a | 0)) {
                            break e;
                          }
                          break d;
                        }
                        h = J[3876];
                        J[3876] = 0;
                        Ha();
                        a = qb(a, (e + 12) | 0, d, -1, -1);
                        d = ea;
                        g = J[3876];
                        f: {
                          if (g) {
                            if (J[(e + 12) >> 2] != (b | 0)) {
                              break f;
                            }
                            if ((g | 0) == 68) {
                              break c;
                            }
                            break b;
                          }
                          J[3876] = h;
                          if (J[(e + 12) >> 2] == (b | 0)) {
                            break b;
                          }
                        }
                      }
                    }
                    J[c >> 2] = 4;
                    a = 0;
                    b = 0;
                    break a;
                  }
                  J[c >> 2] = 4;
                  a = -1;
                  b = -1;
                  break a;
                }
                b = a;
                c = (f | 0) == 45;
                a = c ? (0 - b) | 0 : b;
                b = c ? (0 - ((d + ((b | 0) != 0)) | 0)) | 0 : d;
              }
              da = (e + 16) | 0;
              ea = b;
              return a;
            }
            function Bd(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                b: {
                  c: {
                    if ((a | 0) != (b | 0)) {
                      g = J[3876];
                      J[3876] = 0;
                      Ha();
                      d = qb(a, (e + 12) | 0, d, 0, -2147483648);
                      a = ea;
                      f = J[3876];
                      d: {
                        if (f) {
                          if (J[(e + 12) >> 2] != (b | 0)) {
                            break d;
                          }
                          if ((f | 0) == 68) {
                            break b;
                          }
                          break c;
                        }
                        J[3876] = g;
                        if (J[(e + 12) >> 2] == (b | 0)) {
                          break c;
                        }
                      }
                    }
                    J[c >> 2] = 4;
                    b = 0;
                    break a;
                  }
                  if (
                    (((a | 0) < 0) & (d >>> 0 < 2147483648)) |
                    ((a | 0) < -1) |
                    (((d >>> 0 > 2147483647) & ((a | 0) >= 0)) | ((a | 0) > 0))
                  ) {
                    break b;
                  }
                  b = d;
                  break a;
                }
                J[c >> 2] = 4;
                b = 2147483647;
                if ((!!d & ((a | 0) >= 0)) | ((a | 0) > 0)) {
                  break a;
                }
                b = -2147483648;
              }
              da = (e + 16) | 0;
              return b;
            }
            function yd(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                b: {
                  c: {
                    d: {
                      if ((a | 0) != (b | 0)) {
                        e: {
                          f: {
                            f = K[a | 0];
                            if ((f | 0) != 45) {
                              break f;
                            }
                            a = (a + 1) | 0;
                            if ((b | 0) != (a | 0)) {
                              break f;
                            }
                            break e;
                          }
                          h = J[3876];
                          J[3876] = 0;
                          Ha();
                          a = qb(a, (e + 12) | 0, d, -1, -1);
                          d = ea;
                          g = J[3876];
                          g: {
                            if (g) {
                              if (J[(e + 12) >> 2] != (b | 0)) {
                                break g;
                              }
                              if ((g | 0) == 68) {
                                break c;
                              }
                              break d;
                            }
                            J[3876] = h;
                            if (J[(e + 12) >> 2] == (b | 0)) {
                              break d;
                            }
                          }
                        }
                      }
                      J[c >> 2] = 4;
                      a = 0;
                      break a;
                    }
                    if (!d & (a >>> 0 <= 65535)) {
                      break b;
                    }
                  }
                  J[c >> 2] = 4;
                  a = 65535;
                  break a;
                }
                a = (f | 0) == 45 ? (0 - a) | 0 : a;
              }
              da = (e + 16) | 0;
              return a & 65535;
            }
            function Pb(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0;
              if (!((K[(b + 11) | 0] >>> 7) | 0)) {
                J[(a + 8) >> 2] = J[(b + 8) >> 2];
                c = J[(b + 4) >> 2];
                J[a >> 2] = J[b >> 2];
                J[(a + 4) >> 2] = c;
                return;
              }
              f = J[b >> 2];
              d = (da - 16) | 0;
              da = d;
              a: {
                b: {
                  c = J[(b + 4) >> 2];
                  c: {
                    if (c >>> 0 < 11) {
                      b = a;
                      H[(b + 11) | 0] = c & 127;
                      break c;
                    }
                    if (c >>> 0 > 2147483639) {
                      break b;
                    }
                    g = (d + 8) | 0;
                    if (c >>> 0 >= 11) {
                      e = (c + 8) & -8;
                      b = (e - 1) | 0;
                      b = (b | 0) == 11 ? e : b;
                    } else {
                      b = 10;
                    }
                    ab(g, (b + 1) | 0);
                    b = J[(d + 8) >> 2];
                    J[a >> 2] = b;
                    J[(a + 8) >> 2] = J[(d + 12) >> 2] | -2147483648;
                    J[(a + 4) >> 2] = c;
                  }
                  a = (c + 1) | 0;
                  c = !a;
                  if (!(c | c)) {
                    y(b, f, a);
                  }
                  da = (d + 16) | 0;
                  break a;
                }
                Fa();
                C();
              }
            }
            function jd(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                if (b >>> 0 <= 1073741815) {
                  b: {
                    if (b >>> 0 < 2) {
                      H[(a + 11) | 0] = b & 127;
                      d = a;
                      break b;
                    }
                    g = (e + 8) | 0;
                    if (b >>> 0 >= 2) {
                      f = (b + 2) & -2;
                      d = (f - 1) | 0;
                      d = (d | 0) == 2 ? f : d;
                    } else {
                      d = 1;
                    }
                    kb(g, (d + 1) | 0);
                    d = J[(e + 8) >> 2];
                    J[a >> 2] = d;
                    J[(a + 8) >> 2] = J[(e + 12) >> 2] | -2147483648;
                    J[(a + 4) >> 2] = b;
                  }
                  f = (da - 16) | 0;
                  da = f;
                  J[(f + 12) >> 2] = c;
                  g = d;
                  c = b;
                  while (1) {
                    if (c) {
                      J[g >> 2] = J[(f + 12) >> 2];
                      c = (c - 1) | 0;
                      g = (g + 4) | 0;
                      continue;
                    }
                    break;
                  }
                  da = (f + 16) | 0;
                  J[(e + 4) >> 2] = 0;
                  J[((b << 2) + d) >> 2] = J[(e + 4) >> 2];
                  da = (e + 16) | 0;
                  break a;
                }
                Fa();
                C();
              }
              return a;
            }
            function qf(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0;
              e = (da - 16) | 0;
              da = e;
              while (1) {
                a: {
                  if ((c | 0) <= (f | 0)) {
                    break a;
                  }
                  d = J[(a + 24) >> 2];
                  h = J[(a + 28) >> 2];
                  if (d >>> 0 >= h >>> 0) {
                    if ((fa[J[(J[a >> 2] + 52) >> 2]](a, K[b | 0]) | 0) == -1) {
                      break a;
                    }
                    f = (f + 1) | 0;
                    b = (b + 1) | 0;
                  } else {
                    J[(e + 12) >> 2] = h - d;
                    J[(e + 8) >> 2] = c - f;
                    d = (da - 16) | 0;
                    da = d;
                    da = (d + 16) | 0;
                    h = J[(a + 24) >> 2];
                    d = (e + 8) | 0;
                    g = (e + 12) | 0;
                    d = J[(J[d >> 2] < J[g >> 2] ? d : g) >> 2];
                    g = !d;
                    if (!(g | g)) {
                      y(h, b, d);
                    }
                    J[(a + 24) >> 2] = d + J[(a + 24) >> 2];
                    f = (d + f) | 0;
                    b = (b + d) | 0;
                  }
                  continue;
                }
                break;
              }
              da = (e + 16) | 0;
              return f | 0;
            }
            function cc(a, b) {
              a: {
                if (a) {
                  if (b >>> 0 <= 127) {
                    break a;
                  }
                  b: {
                    if (!J[J[4039] >> 2]) {
                      if ((b & -128) == 57216) {
                        break a;
                      }
                      break b;
                    }
                    if (b >>> 0 <= 2047) {
                      H[(a + 1) | 0] = (b & 63) | 128;
                      H[a | 0] = (b >>> 6) | 192;
                      return 2;
                    }
                    if (!(((b & -8192) != 57344) & (b >>> 0 >= 55296))) {
                      H[(a + 2) | 0] = (b & 63) | 128;
                      H[a | 0] = (b >>> 12) | 224;
                      H[(a + 1) | 0] = ((b >>> 6) & 63) | 128;
                      return 3;
                    }
                    if ((b - 65536) >>> 0 <= 1048575) {
                      H[(a + 3) | 0] = (b & 63) | 128;
                      H[a | 0] = (b >>> 18) | 240;
                      H[(a + 2) | 0] = ((b >>> 6) & 63) | 128;
                      H[(a + 1) | 0] = ((b >>> 12) & 63) | 128;
                      return 4;
                    }
                  }
                  J[3876] = 25;
                  a = -1;
                } else {
                  a = 1;
                }
                return a;
              }
              H[a | 0] = b;
              return 1;
            }
            function wd(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                b: {
                  c: {
                    d: {
                      if ((a | 0) != (b | 0)) {
                        e: {
                          f: {
                            f = K[a | 0];
                            if ((f | 0) != 45) {
                              break f;
                            }
                            a = (a + 1) | 0;
                            if ((b | 0) != (a | 0)) {
                              break f;
                            }
                            break e;
                          }
                          h = J[3876];
                          J[3876] = 0;
                          Ha();
                          a = qb(a, (e + 12) | 0, d, -1, -1);
                          d = ea;
                          g = J[3876];
                          g: {
                            if (g) {
                              if (J[(e + 12) >> 2] != (b | 0)) {
                                break g;
                              }
                              if ((g | 0) == 68) {
                                break c;
                              }
                              break d;
                            }
                            J[3876] = h;
                            if (J[(e + 12) >> 2] == (b | 0)) {
                              break d;
                            }
                          }
                        }
                      }
                      J[c >> 2] = 4;
                      a = 0;
                      break a;
                    }
                    if (!d) {
                      break b;
                    }
                  }
                  J[c >> 2] = 4;
                  a = -1;
                  break a;
                }
                a = (f | 0) == 45 ? (0 - a) | 0 : a;
              }
              da = (e + 16) | 0;
              return a;
            }
            function Da(a, b, c, d) {
              var e = 0,
                f = 0;
              a: {
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  e = J[(a + 4) >> 2];
                } else {
                  e = K[(a + 11) | 0] & 127;
                }
                if (!e | (((c - b) | 0) < 5)) {
                  break a;
                }
                id(b, c);
                f = (c - 4) | 0;
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  e = J[(a + 4) >> 2];
                } else {
                  e = K[(a + 11) | 0] & 127;
                }
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  a = J[a >> 2];
                }
                c = a;
                a = (e + a) | 0;
                b: {
                  while (1) {
                    c: {
                      e = H[c | 0];
                      if (b >>> 0 >= f >>> 0) {
                        break c;
                      }
                      if (
                        !(((e | 0) <= 0) | ((e | 0) >= 127)) &
                        ((e | 0) != J[b >> 2])
                      ) {
                        break b;
                      }
                      b = (b + 4) | 0;
                      c = ((((a - c) | 0) > 1) + c) | 0;
                      continue;
                    }
                    break;
                  }
                  if (
                    ((e | 0) <= 0) |
                    ((e | 0) >= 127) |
                    (H[c | 0] >>> 0 > (J[f >> 2] - 1) >>> 0)
                  ) {
                    break a;
                  }
                }
                J[d >> 2] = 4;
              }
            }
            function bc(a, b, c, d, e) {
              var f = 0,
                g = 0,
                h = 0;
              h = -1;
              g = d & 2147483647;
              f = (g | 0) == 2147418112;
              a: {
                if (
                  f & !c ? a | b : (f & ((c | 0) != 0)) | (g >>> 0 > 2147418112)
                ) {
                  break a;
                }
                f = e & 2147483647;
                if ((f >>> 0 > 2147418112) & ((f | 0) != 2147418112)) {
                  break a;
                }
                if (!(a | c | (f | g | b))) {
                  return 0;
                }
                f = d & e;
                if ((f | 0) > 0) {
                  f = 1;
                } else {
                  f = (f | 0) >= 0;
                }
                if (f) {
                  if (
                    (((c | 0) != 0) | ((d | 0) != (e | 0))) &
                    ((d | 0) < (e | 0))
                  ) {
                    break a;
                  }
                  return (a | c | ((d ^ e) | b)) != 0;
                }
                if (
                  !c & ((d | 0) == (e | 0))
                    ? a | b
                    : (((c | 0) != 0) & ((d | 0) >= (e | 0))) |
                      ((d | 0) > (e | 0))
                ) {
                  break a;
                }
                h = (a | c | ((d ^ e) | b)) != 0;
              }
              return h;
            }
            function ya(a, b, c, d, e, f, g, h, i) {
              var j = 0,
                k = 0,
                l = 0,
                m = 0;
              i = Pg(b, c, h, i);
              h = ea;
              e = Pg(d, e, f, g);
              i = (e + i) | 0;
              d = (ea + h) | 0;
              h = e >>> 0 > i >>> 0 ? (d + 1) | 0 : d;
              j = g;
              e = 0;
              k = c;
              d = 0;
              c = Pg(g, e, c, d);
              g = (c + i) | 0;
              i = (ea + h) | 0;
              l = g;
              c = c >>> 0 > g >>> 0 ? (i + 1) | 0 : i;
              g = Pg(f, 0, b, 0);
              h = ea;
              i = 0;
              d = Pg(f, i, k, d);
              h = (h + d) | 0;
              f = (ea + i) | 0;
              f = d >>> 0 > h >>> 0 ? (f + 1) | 0 : f;
              i = (f + l) | 0;
              d = c;
              f = f >>> 0 > i >>> 0 ? (d + 1) | 0 : d;
              b = (Pg(b, m, j, e) + h) | 0;
              e = ea;
              e = b >>> 0 < h >>> 0 ? (e + 1) | 0 : e;
              h = (e + i) | 0;
              i = f;
              J[(a + 8) >> 2] = h;
              J[(a + 12) >> 2] = e >>> 0 > h >>> 0 ? (i + 1) | 0 : i;
              J[a >> 2] = g;
              J[(a + 4) >> 2] = b;
            }
            function Fg(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              var e = 0,
                f = 0,
                g = 0,
                h = 0;
              a: {
                e = (da - 16) | 0;
                da = e;
                f = (d - c) >> 2;
                if (f >>> 0 <= 1073741815) {
                  b: {
                    if (f >>> 0 < 2) {
                      H[(a + 11) | 0] = f & 127;
                      b = a;
                      break b;
                    }
                    h = (e + 8) | 0;
                    if (f >>> 0 >= 2) {
                      g = (f + 2) & -2;
                      b = (g - 1) | 0;
                      b = (b | 0) == 2 ? g : b;
                    } else {
                      b = 1;
                    }
                    kb(h, (b + 1) | 0);
                    b = J[(e + 8) >> 2];
                    J[a >> 2] = b;
                    J[(a + 8) >> 2] = J[(e + 12) >> 2] | -2147483648;
                    J[(a + 4) >> 2] = f;
                  }
                  a = (d - c) | 0;
                  d = a >> 2;
                  c: {
                    if (!d) {
                      break c;
                    }
                    d = d << 2;
                    if (!d) {
                      break c;
                    }
                    y(b, c, d);
                  }
                  J[(e + 4) >> 2] = 0;
                  J[(a + b) >> 2] = J[(e + 4) >> 2];
                  da = (e + 16) | 0;
                  break a;
                }
                Fa();
                C();
              }
            }
            function Zd(a, b) {
              a = a | 0;
              b = b | 0;
              var c = 0,
                d = 0;
              c = J[(a + 24) >> 2];
              if (c >>> 0 > M[(a + 44) >> 2]) {
                J[(a + 44) >> 2] = c;
              }
              a: {
                c = J[(a + 8) >> 2];
                d = J[(a + 12) >> 2];
                if (c >>> 0 >= d >>> 0) {
                  break a;
                }
                if ((b | 0) == -1) {
                  J[(a + 16) >> 2] = J[(a + 44) >> 2];
                  J[(a + 12) >> 2] = d - 1;
                  J[(a + 8) >> 2] = c;
                  return ((b | 0) != -1 ? b : 0) | 0;
                }
                d = (J[(a + 12) >> 2] - 1) | 0;
                if (!(K[(a + 48) | 0] & 16) & (K[d | 0] != (b & 255))) {
                  break a;
                }
                c = J[(a + 8) >> 2];
                J[(a + 16) >> 2] = J[(a + 44) >> 2];
                J[(a + 12) >> 2] = d;
                J[(a + 8) >> 2] = c;
                H[J[(a + 12) >> 2]] = (b << 24) >> 24;
                return b | 0;
              }
              return -1;
            }
            function Hg(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              var e = 0,
                f = 0,
                g = 0,
                h = 0;
              a: {
                e = (da - 16) | 0;
                da = e;
                f = (d - c) | 0;
                if (f >>> 0 <= 2147483639) {
                  b: {
                    if (f >>> 0 < 11) {
                      H[(a + 11) | 0] = f & 127;
                      b = a;
                      break b;
                    }
                    h = (e + 8) | 0;
                    if (f >>> 0 >= 11) {
                      g = (f + 8) & -8;
                      b = (g - 1) | 0;
                      b = (b | 0) == 11 ? g : b;
                    } else {
                      b = 10;
                    }
                    ab(h, (b + 1) | 0);
                    b = J[(e + 8) >> 2];
                    J[a >> 2] = b;
                    J[(a + 8) >> 2] = J[(e + 12) >> 2] | -2147483648;
                    J[(a + 4) >> 2] = f;
                  }
                  a = (d - c) | 0;
                  d = !a;
                  if (!(d | d)) {
                    y(b, c, a);
                  }
                  H[(e + 7) | 0] = 0;
                  H[(a + b) | 0] = K[(e + 7) | 0];
                  da = (e + 16) | 0;
                  break a;
                }
                Fa();
                C();
              }
            }
            function bb(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0;
              a: {
                d = pc(b);
                e = (da - 16) | 0;
                da = e;
                if (d >>> 0 <= 1073741815) {
                  b: {
                    if (d >>> 0 < 2) {
                      H[(a + 11) | 0] = d & 127;
                      c = a;
                      break b;
                    }
                    g = (e + 8) | 0;
                    if (d >>> 0 >= 2) {
                      f = (d + 2) & -2;
                      c = (f - 1) | 0;
                      c = (c | 0) == 2 ? f : c;
                    } else {
                      c = 1;
                    }
                    kb(g, (c + 1) | 0);
                    c = J[(e + 8) >> 2];
                    J[a >> 2] = c;
                    J[(a + 8) >> 2] = J[(e + 12) >> 2] | -2147483648;
                    J[(a + 4) >> 2] = d;
                  }
                  c: {
                    if (!d) {
                      break c;
                    }
                    a = d << 2;
                    if (!a) {
                      break c;
                    }
                    y(c, b, a);
                  }
                  J[(e + 4) >> 2] = 0;
                  J[((d << 2) + c) >> 2] = J[(e + 4) >> 2];
                  da = (e + 16) | 0;
                  break a;
                }
                Fa();
                C();
              }
            }
            function zd(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                b: {
                  if ((a | 0) != (b | 0)) {
                    g = J[3876];
                    J[3876] = 0;
                    Ha();
                    a = qb(a, (e + 12) | 0, d, 0, -2147483648);
                    d = ea;
                    f = J[3876];
                    c: {
                      if (f) {
                        if (J[(e + 12) >> 2] != (b | 0)) {
                          break c;
                        }
                        if ((f | 0) == 68) {
                          break b;
                        }
                        break a;
                      }
                      J[3876] = g;
                      if (J[(e + 12) >> 2] == (b | 0)) {
                        break a;
                      }
                    }
                  }
                  J[c >> 2] = 4;
                  a = 0;
                  d = 0;
                  break a;
                }
                J[c >> 2] = 4;
                if ((!!a & ((d | 0) >= 0)) | ((d | 0) > 0)) {
                  a = -1;
                  d = 2147483647;
                  break a;
                }
                a = 0;
                d = -2147483648;
              }
              da = (e + 16) | 0;
              ea = d;
              return a;
            }
            function ud(a, b, c) {
              var d = 0,
                e = 0,
                f = Q(0),
                g = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                b: {
                  c: {
                    if ((a | 0) != (b | 0)) {
                      g = J[3876];
                      J[3876] = 0;
                      Ha();
                      d = (da - 16) | 0;
                      da = d;
                      Yb(d, a, (e + 12) | 0, 0);
                      f = Id(
                        J[d >> 2],
                        J[(d + 4) >> 2],
                        J[(d + 8) >> 2],
                        J[(d + 12) >> 2],
                      );
                      da = (d + 16) | 0;
                      d: {
                        a = J[3876];
                        if (a) {
                          if (J[(e + 12) >> 2] == (b | 0)) {
                            break d;
                          }
                          break c;
                        }
                        J[3876] = g;
                        if (J[(e + 12) >> 2] != (b | 0)) {
                          break c;
                        }
                        break a;
                      }
                      if ((a | 0) != 68) {
                        break a;
                      }
                      break b;
                    }
                    J[c >> 2] = 4;
                    break a;
                  }
                  f = Q(0);
                }
                J[c >> 2] = 4;
              }
              da = (e + 16) | 0;
              return f;
            }
            function td(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                b: {
                  c: {
                    if ((a | 0) != (b | 0)) {
                      g = J[3876];
                      J[3876] = 0;
                      Ha();
                      d = (da - 16) | 0;
                      da = d;
                      Yb(d, a, (e + 12) | 0, 1);
                      f = _b(
                        J[d >> 2],
                        J[(d + 4) >> 2],
                        J[(d + 8) >> 2],
                        J[(d + 12) >> 2],
                      );
                      da = (d + 16) | 0;
                      d: {
                        a = J[3876];
                        if (a) {
                          if (J[(e + 12) >> 2] == (b | 0)) {
                            break d;
                          }
                          break c;
                        }
                        J[3876] = g;
                        if (J[(e + 12) >> 2] != (b | 0)) {
                          break c;
                        }
                        break a;
                      }
                      if ((a | 0) != 68) {
                        break a;
                      }
                      break b;
                    }
                    J[c >> 2] = 4;
                    break a;
                  }
                  f = 0;
                }
                J[c >> 2] = 4;
              }
              da = (e + 16) | 0;
              return f;
            }
            function se(a, b, c, d, e) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              if (Ka(a, J[(b + 8) >> 2], e)) {
                if (!((J[(b + 28) >> 2] == 1) | (J[(b + 4) >> 2] != (c | 0)))) {
                  J[(b + 28) >> 2] = d;
                }
                return;
              }
              a: {
                if (!Ka(a, J[b >> 2], e)) {
                  break a;
                }
                if (
                  !(
                    (J[(b + 16) >> 2] != (c | 0)) &
                    (J[(b + 20) >> 2] != (c | 0))
                  )
                ) {
                  if ((d | 0) != 1) {
                    break a;
                  }
                  J[(b + 32) >> 2] = 1;
                  return;
                }
                J[(b + 20) >> 2] = c;
                J[(b + 32) >> 2] = d;
                J[(b + 40) >> 2] = J[(b + 40) >> 2] + 1;
                if (!((J[(b + 36) >> 2] != 1) | (J[(b + 24) >> 2] != 2))) {
                  H[(b + 54) | 0] = 1;
                }
                J[(b + 44) >> 2] = 4;
              }
            }
            function ib(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0;
              a: {
                d = hb(b);
                e = (da - 16) | 0;
                da = e;
                if (d >>> 0 <= 2147483639) {
                  b: {
                    if (d >>> 0 < 11) {
                      H[(a + 11) | 0] = d & 127;
                      c = a;
                      break b;
                    }
                    g = (e + 8) | 0;
                    if (d >>> 0 >= 11) {
                      f = (d + 8) & -8;
                      c = (f - 1) | 0;
                      c = (c | 0) == 11 ? f : c;
                    } else {
                      c = 10;
                    }
                    ab(g, (c + 1) | 0);
                    c = J[(e + 8) >> 2];
                    J[a >> 2] = c;
                    J[(a + 8) >> 2] = J[(e + 12) >> 2] | -2147483648;
                    J[(a + 4) >> 2] = d;
                  }
                  a = !d;
                  if (!(a | a)) {
                    y(c, b, d);
                  }
                  H[(e + 7) | 0] = 0;
                  H[(d + c) | 0] = K[(e + 7) | 0];
                  da = (e + 16) | 0;
                  break a;
                }
                Fa();
                C();
              }
            }
            function Ig(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0;
              e = J[(a + 84) >> 2];
              f = J[e >> 2];
              d = J[(e + 4) >> 2];
              h = J[(a + 28) >> 2];
              g = (J[(a + 20) >> 2] - h) | 0;
              g = d >>> 0 < g >>> 0 ? d : g;
              if (g) {
                eb(f, h, g);
                f = (g + J[e >> 2]) | 0;
                J[e >> 2] = f;
                d = (J[(e + 4) >> 2] - g) | 0;
                J[(e + 4) >> 2] = d;
              }
              d = c >>> 0 > d >>> 0 ? d : c;
              if (d) {
                eb(f, b, d);
                f = (d + J[e >> 2]) | 0;
                J[e >> 2] = f;
                J[(e + 4) >> 2] = J[(e + 4) >> 2] - d;
              }
              H[f | 0] = 0;
              b = J[(a + 44) >> 2];
              J[(a + 28) >> 2] = b;
              J[(a + 20) >> 2] = b;
              return c | 0;
            }
            function Pc(a) {
              a = a | 0;
              var b = 0,
                c = 0,
                d = 0,
                e = 0;
              J[a >> 2] = 7912;
              d = (a + 8) | 0;
              while (1) {
                b = J[d >> 2];
                if (((J[(d + 4) >> 2] - b) >> 2) >>> 0 > c >>> 0) {
                  b = J[(b + (c << 2)) >> 2];
                  if (b) {
                    e = (J[(b + 4) >> 2] - 1) | 0;
                    J[(b + 4) >> 2] = e;
                    if ((e | 0) == -1) {
                      fa[J[(J[b >> 2] + 8) >> 2]](b);
                    }
                  }
                  c = (c + 1) | 0;
                  continue;
                }
                break;
              }
              ja((a + 144) | 0);
              c = (da - 16) | 0;
              da = c;
              b = (c + 12) | 0;
              J[b >> 2] = d;
              d = J[b >> 2];
              if (J[d >> 2]) {
                Sc(d);
                b = J[b >> 2];
                qc((b + 12) | 0, J[b >> 2]);
              }
              da = (c + 16) | 0;
              return a | 0;
            }
            function Kb(a, b, c, d) {
              H[(a + 53) | 0] = 1;
              a: {
                if (J[(a + 4) >> 2] != (c | 0)) {
                  break a;
                }
                H[(a + 52) | 0] = 1;
                c = J[(a + 16) >> 2];
                b: {
                  if (!c) {
                    J[(a + 36) >> 2] = 1;
                    J[(a + 24) >> 2] = d;
                    J[(a + 16) >> 2] = b;
                    if ((d | 0) != 1) {
                      break a;
                    }
                    if (J[(a + 48) >> 2] == 1) {
                      break b;
                    }
                    break a;
                  }
                  if ((b | 0) == (c | 0)) {
                    c = J[(a + 24) >> 2];
                    if ((c | 0) == 2) {
                      J[(a + 24) >> 2] = d;
                      c = d;
                    }
                    if (J[(a + 48) >> 2] != 1) {
                      break a;
                    }
                    if ((c | 0) == 1) {
                      break b;
                    }
                    break a;
                  }
                  J[(a + 36) >> 2] = J[(a + 36) >> 2] + 1;
                }
                H[(a + 54) | 0] = 1;
              }
            }
            function ld(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0;
              e = (da - 16) | 0;
              da = e;
              a: {
                if (b >>> 0 <= 2147483639) {
                  b: {
                    if (b >>> 0 < 11) {
                      H[(a + 11) | 0] = b & 127;
                      d = a;
                      break b;
                    }
                    g = (e + 8) | 0;
                    if (b >>> 0 >= 11) {
                      f = (b + 8) & -8;
                      d = (f - 1) | 0;
                      d = (d | 0) == 11 ? f : d;
                    } else {
                      d = 10;
                    }
                    ab(g, (d + 1) | 0);
                    d = J[(e + 8) >> 2];
                    J[a >> 2] = d;
                    J[(a + 8) >> 2] = J[(e + 12) >> 2] | -2147483648;
                    J[(a + 4) >> 2] = b;
                  }
                  oc(d, b, c);
                  H[(e + 7) | 0] = 0;
                  H[(b + d) | 0] = K[(e + 7) | 0];
                  da = (e + 16) | 0;
                  break a;
                }
                Fa();
                C();
              }
              return a;
            }
            function _e(a) {
              a = a | 0;
              if (K[16876]) {
                return J[4218];
              }
              if (!K[17352]) {
                H[17352] = 1;
              }
              na(17184, 13628);
              na(17196, 13656);
              na(17208, 13684);
              na(17220, 13716);
              na(17232, 13756);
              na(17244, 13792);
              na(17256, 13820);
              na(17268, 13856);
              na(17280, 13872);
              na(17292, 13888);
              na(17304, 13904);
              na(17316, 13920);
              na(17328, 13936);
              na(17340, 13952);
              H[16876] = 1;
              J[4218] = 17184;
              return 17184;
            }
            function af(a) {
              a = a | 0;
              if (K[16868]) {
                return J[4216];
              }
              if (!K[17176]) {
                H[17176] = 1;
              }
              oa(17008, 1091);
              oa(17020, 1098);
              oa(17032, 1064);
              oa(17044, 1072);
              oa(17056, 1055);
              oa(17068, 1105);
              oa(17080, 1082);
              oa(17092, 1356);
              oa(17104, 1379);
              oa(17116, 1471);
              oa(17128, 1533);
              oa(17140, 1158);
              oa(17152, 1404);
              oa(17164, 1179);
              H[16868] = 1;
              J[4216] = 17008;
              return 17008;
            }
            function ac(a) {
              var b = 0;
              b = 1;
              a: {
                if ((a | 0) >= 1024) {
                  b = 898846567431158e293;
                  if (a >>> 0 < 2047) {
                    a = (a - 1023) | 0;
                    break a;
                  }
                  b = Infinity;
                  a = ((a >>> 0 >= 3069 ? 3069 : a) - 2046) | 0;
                  break a;
                }
                if ((a | 0) > -1023) {
                  break a;
                }
                b = 2004168360008973e-307;
                if (a >>> 0 > 4294965304) {
                  a = (a + 969) | 0;
                  break a;
                }
                b = 0;
                a = ((a >>> 0 <= 4294964336 ? -2960 : a) + 1938) | 0;
              }
              u(0, 0);
              u(1, (a + 1023) << 20);
              return b * +w();
            }
            function Ja(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0;
              d = (da - 16) | 0;
              da = d;
              a: {
                if (!b) {
                  b = 0;
                  break a;
                }
                c = b >> 31;
                e = ((c ^ b) - c) | 0;
                c = S(e);
                za(d, e, 0, 0, 0, (c + 81) | 0);
                e = (0 + J[(d + 8) >> 2]) | 0;
                c = ((J[(d + 12) >> 2] ^ 65536) + ((16414 - c) << 16)) | 0;
                c = e >>> 0 < f >>> 0 ? (c + 1) | 0 : c;
                b = (b | 0) < 0;
                e = 0 | e;
                f = (b ? -2147483648 : 0) | c;
                c = J[(d + 4) >> 2];
                b = J[d >> 2];
              }
              J[a >> 2] = b;
              J[(a + 4) >> 2] = c;
              J[(a + 8) >> 2] = e;
              J[(a + 12) >> 2] = f;
              da = (d + 16) | 0;
            }
            function hb(a) {
              var b = 0,
                c = 0,
                d = 0;
              a: {
                b: {
                  b = a;
                  if (!(b & 3)) {
                    break b;
                  }
                  if (!K[b | 0]) {
                    return 0;
                  }
                  while (1) {
                    b = (b + 1) | 0;
                    if (!(b & 3)) {
                      break b;
                    }
                    if (K[b | 0]) {
                      continue;
                    }
                    break;
                  }
                  break a;
                }
                while (1) {
                  c = b;
                  b = (b + 4) | 0;
                  d = J[c >> 2];
                  if (((d | (16843008 - d)) & -2139062144) == -2139062144) {
                    continue;
                  }
                  break;
                }
                while (1) {
                  b = c;
                  c = (b + 1) | 0;
                  if (K[b | 0]) {
                    continue;
                  }
                  break;
                }
              }
              return (b - a) | 0;
            }
            function bg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0;
              g = (da - 32) | 0;
              da = g;
              h = J[1975];
              J[(g + 24) >> 2] = J[1974];
              J[(g + 28) >> 2] = h;
              h = J[1973];
              J[(g + 16) >> 2] = J[1972];
              J[(g + 20) >> 2] = h;
              h = J[1971];
              J[(g + 8) >> 2] = J[1970];
              J[(g + 12) >> 2] = h;
              h = J[1969];
              J[g >> 2] = J[1968];
              J[(g + 4) >> 2] = h;
              h = a;
              a = (g + 32) | 0;
              b = Ua(h, b, c, d, e, f, g, a);
              da = a;
              return b | 0;
            }
            function ag(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              g = a;
              h = b;
              a = fa[J[(J[(a + 8) >> 2] + 20) >> 2]]((a + 8) | 0) | 0;
              a: {
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  b = J[a >> 2];
                  break a;
                }
                b = a;
              }
              i = b;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                b = J[a >> 2];
              } else {
                b = a;
              }
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                a = J[(a + 4) >> 2];
              } else {
                a = K[(a + 11) | 0] & 127;
              }
              return Ua(g, h, c, d, e, f, i, (b + (a << 2)) | 0) | 0;
            }
            function hg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0,
                i = 0;
              g = a;
              h = b;
              a = fa[J[(J[(a + 8) >> 2] + 20) >> 2]]((a + 8) | 0) | 0;
              a: {
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  b = J[a >> 2];
                  break a;
                }
                b = a;
              }
              i = b;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                b = J[a >> 2];
              } else {
                b = a;
              }
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                a = J[(a + 4) >> 2];
              } else {
                a = K[(a + 11) | 0] & 127;
              }
              return Va(g, h, c, d, e, f, i, (b + a) | 0) | 0;
            }
            function Tb(a, b, c, d, e) {
              var f = 0,
                g = 0;
              g = (da - 16) | 0;
              da = g;
              f = (g + 12) | 0;
              b = J[(b + 28) >> 2];
              J[f >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(f, 16784);
              fa[J[(J[b >> 2] + 48) >> 2]](b, 7664, 7692, c) | 0;
              b = sa(f, 16856);
              J[d >> 2] = fa[J[(J[b >> 2] + 12) >> 2]](b);
              J[e >> 2] = fa[J[(J[b >> 2] + 16) >> 2]](b);
              fa[J[(J[b >> 2] + 20) >> 2]](a, b);
              wa(f);
              da = (g + 16) | 0;
            }
            function Yb(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0;
              e = (da - 160) | 0;
              da = e;
              J[(e + 60) >> 2] = b;
              J[(e + 20) >> 2] = b;
              J[(e + 24) >> 2] = -1;
              f = (e + 16) | 0;
              Na(f, 0, 0);
              Kd(e, f, d, 1);
              d = J[(e + 8) >> 2];
              g = J[(e + 12) >> 2];
              f = J[e >> 2];
              h = J[(e + 4) >> 2];
              if (c) {
                J[c >> 2] =
                  J[(e + 136) >> 2] +
                  ((((J[(e + 20) >> 2] - J[(e + 60) >> 2]) | 0) + b) | 0);
              }
              J[(a + 8) >> 2] = d;
              J[(a + 12) >> 2] = g;
              J[a >> 2] = f;
              J[(a + 4) >> 2] = h;
              da = (e + 160) | 0;
            }
            function Xb(a, b, c, d, e) {
              var f = 0,
                g = 0;
              g = (da - 16) | 0;
              da = g;
              f = (g + 12) | 0;
              b = J[(b + 28) >> 2];
              J[f >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(f, 16792);
              fa[J[(J[b >> 2] + 32) >> 2]](b, 7664, 7692, c) | 0;
              b = sa(f, 16848);
              H[d | 0] = fa[J[(J[b >> 2] + 12) >> 2]](b);
              H[e | 0] = fa[J[(J[b >> 2] + 16) >> 2]](b);
              fa[J[(J[b >> 2] + 20) >> 2]](a, b);
              wa(f);
              da = (g + 16) | 0;
            }
            function Bb(a, b) {
              var c = 0,
                d = 0,
                e = 0;
              c = 24;
              a: {
                b: {
                  if ((a | b) & 3) {
                    break b;
                  }
                  while (1) {
                    if (J[a >> 2] != J[b >> 2]) {
                      break b;
                    }
                    b = (b + 4) | 0;
                    a = (a + 4) | 0;
                    c = (c - 4) | 0;
                    if (c >>> 0 > 3) {
                      continue;
                    }
                    break;
                  }
                  if (!c) {
                    break a;
                  }
                }
                while (1) {
                  d = K[a | 0];
                  e = K[b | 0];
                  if ((d | 0) == (e | 0)) {
                    b = (b + 1) | 0;
                    a = (a + 1) | 0;
                    c = (c - 1) | 0;
                    if (c) {
                      continue;
                    }
                    break a;
                  }
                  break;
                }
                return (d - e) | 0;
              }
              return 0;
            }
            function _d(a) {
              a = a | 0;
              var b = 0,
                c = 0,
                d = 0;
              b = J[(a + 24) >> 2];
              if (b >>> 0 > M[(a + 44) >> 2]) {
                J[(a + 44) >> 2] = b;
              }
              a: {
                if (!(K[(a + 48) | 0] & 8)) {
                  break a;
                }
                b = J[(a + 44) >> 2];
                if (b >>> 0 > M[(a + 16) >> 2]) {
                  c = J[(a + 8) >> 2];
                  d = J[(a + 12) >> 2];
                  J[(a + 16) >> 2] = b;
                  J[(a + 12) >> 2] = d;
                  J[(a + 8) >> 2] = c;
                }
                b = J[(a + 16) >> 2];
                a = J[(a + 12) >> 2];
                if (b >>> 0 <= a >>> 0) {
                  break a;
                }
                return K[a | 0];
              }
              return -1;
            }
            function oa(a, b) {
              var c = 0,
                d = 0,
                e = 0;
              a: {
                d = hb(b);
                c =
                  (K[(a + 11) | 0] >>> 7) | 0
                    ? ((J[(a + 8) >> 2] & 2147483647) - 1) | 0
                    : 10;
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  e = J[(a + 4) >> 2];
                } else {
                  e = K[(a + 11) | 0] & 127;
                }
                if (d >>> 0 <= c >>> 0) {
                  if ((K[(a + 11) | 0] >>> 7) | 0) {
                    c = J[a >> 2];
                  } else {
                    c = a;
                  }
                  e = !d;
                  if (!(e | e)) {
                    y(c, b, d);
                  }
                  vc(a, c, d);
                  break a;
                }
                Mb(a, c, (d - c) | 0, e, e, d, b);
              }
            }
            function id(a, b) {
              var c = 0,
                d = 0;
              c = (da - 16) | 0;
              da = c;
              J[(c + 12) >> 2] = a;
              a: {
                if ((a | 0) == (b | 0)) {
                  break a;
                }
                while (1) {
                  b = (b - 4) | 0;
                  J[(c + 8) >> 2] = b;
                  if (a >>> 0 >= b >>> 0) {
                    break a;
                  }
                  a = J[(c + 12) >> 2];
                  b = J[a >> 2];
                  d = a;
                  a = J[(c + 8) >> 2];
                  J[d >> 2] = J[a >> 2];
                  J[a >> 2] = b;
                  a = (J[(c + 12) >> 2] + 4) | 0;
                  J[(c + 12) >> 2] = a;
                  b = J[(c + 8) >> 2];
                  continue;
                }
              }
              da = (c + 16) | 0;
            }
            function fb(a, b) {
              var c = 0,
                d = 0,
                e = 0,
                f = 0;
              c = (da - 16) | 0;
              da = c;
              a: {
                if (!b) {
                  b = 0;
                  break a;
                }
                d = b;
                b = S(b);
                za(c, d, 0, 0, 0, (112 - (b ^ 31)) | 0);
                d = (0 + J[(c + 8) >> 2]) | 0;
                b = ((J[(c + 12) >> 2] ^ 65536) + ((16414 - b) << 16)) | 0;
                f = e >>> 0 > d >>> 0 ? (b + 1) | 0 : b;
                e = J[(c + 4) >> 2];
                b = J[c >> 2];
              }
              J[a >> 2] = b;
              J[(a + 4) >> 2] = e;
              J[(a + 8) >> 2] = d;
              J[(a + 12) >> 2] = f;
              da = (c + 16) | 0;
            }
            function ve(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              var e = 0,
                f = 0;
              if (Ka(a, J[(b + 8) >> 2], 0)) {
                Lb(b, c, d);
                return;
              }
              e = J[(a + 12) >> 2];
              f = (a + 16) | 0;
              kc(f, b, c, d);
              a: {
                if (e >>> 0 < 2) {
                  break a;
                }
                e = ((e << 3) + f) | 0;
                a = (a + 24) | 0;
                while (1) {
                  kc(a, b, c, d);
                  if (K[(b + 54) | 0]) {
                    break a;
                  }
                  a = (a + 8) | 0;
                  if (e >>> 0 > a >>> 0) {
                    continue;
                  }
                  break;
                }
              }
            }
            function ra(a) {
              var b = 0,
                c = 0,
                d = 0,
                e = 0;
              c = (da - 16) | 0;
              da = c;
              J[(c + 12) >> 2] = a;
              d = (da - 16) | 0;
              da = d;
              if (J[a >> 2] != -1) {
                b = (d + 12) | 0;
                J[b >> 2] = c + 12;
                e = (d + 8) | 0;
                J[e >> 2] = b;
                while (1) {
                  b = J[a >> 2];
                  if ((b | 0) == 1) {
                    continue;
                  }
                  break;
                }
                if (!b) {
                  J[a >> 2] = 1;
                  Nc(e);
                  J[a >> 2] = -1;
                }
              }
              da = (d + 16) | 0;
              da = (c + 16) | 0;
              return (J[(a + 4) >> 2] - 1) | 0;
            }
            function md(a) {
              var b = 0,
                c = 0;
              b = J[(a + 72) >> 2];
              J[(a + 72) >> 2] = (b - 1) | b;
              if (J[(a + 20) >> 2] != J[(a + 28) >> 2]) {
                fa[J[(a + 36) >> 2]](a, 0, 0) | 0;
              }
              J[(a + 28) >> 2] = 0;
              J[(a + 16) >> 2] = 0;
              J[(a + 20) >> 2] = 0;
              b = J[a >> 2];
              if (b & 4) {
                J[a >> 2] = b | 32;
                return -1;
              }
              c = (J[(a + 44) >> 2] + J[(a + 48) >> 2]) | 0;
              J[(a + 8) >> 2] = c;
              J[(a + 4) >> 2] = c;
              return (b << 27) >> 31;
            }
            function Na(a, b, c) {
              var d = 0,
                e = 0,
                f = 0,
                g = 0;
              J[(a + 112) >> 2] = b;
              J[(a + 116) >> 2] = c;
              f = J[(a + 4) >> 2];
              d = (J[(a + 44) >> 2] - f) | 0;
              J[(a + 120) >> 2] = d;
              J[(a + 124) >> 2] = d >> 31;
              d = J[(a + 8) >> 2];
              a: {
                if (!(b | c)) {
                  break a;
                }
                e = (d - f) | 0;
                g = b >>> 0 >= e >>> 0;
                e = e >> 31;
                if ((g & ((e | 0) <= (c | 0))) | ((c | 0) > (e | 0))) {
                  break a;
                }
                d = (b + f) | 0;
              }
              J[(a + 104) >> 2] = d;
            }
            function Lb(a, b, c) {
              var d = 0;
              d = J[(a + 36) >> 2];
              if (!d) {
                J[(a + 24) >> 2] = c;
                J[(a + 16) >> 2] = b;
                J[(a + 36) >> 2] = 1;
                J[(a + 20) >> 2] = J[(a + 56) >> 2];
                return;
              }
              a: {
                if (
                  !(
                    (J[(a + 20) >> 2] != J[(a + 56) >> 2]) |
                    (J[(a + 16) >> 2] != (b | 0))
                  )
                ) {
                  if (J[(a + 24) >> 2] != 2) {
                    break a;
                  }
                  J[(a + 24) >> 2] = c;
                  return;
                }
                H[(a + 54) | 0] = 1;
                J[(a + 24) >> 2] = 2;
                J[(a + 36) >> 2] = d + 1;
              }
            }
            function Eb(a) {
              a = a | 0;
              var b = 0,
                c = 0;
              J[a >> 2] = 2892;
              if (J[(a + 28) >> 2]) {
                b = J[(a + 40) >> 2];
                while (1) {
                  if (b) {
                    b = (b - 1) | 0;
                    c = b << 2;
                    fa[J[(J[(a + 32) >> 2] + c) >> 2]](
                      0,
                      a,
                      J[(c + J[(a + 36) >> 2]) >> 2],
                    );
                    continue;
                  }
                  break;
                }
                wa((a + 28) | 0);
                la(J[(a + 32) >> 2]);
                la(J[(a + 36) >> 2]);
                la(J[(a + 48) >> 2]);
                la(J[(a + 60) >> 2]);
              }
              return a | 0;
            }
            function gg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0;
              g = (da - 16) | 0;
              da = g;
              J[(g + 12) >> 2] = b;
              h = (g + 8) | 0;
              b = J[(d + 28) >> 2];
              J[h >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(h, 16792);
              wa(h);
              gd(a, (f + 24) | 0, (g + 12) | 0, c, e, b);
              da = (g + 16) | 0;
              return J[(g + 12) >> 2];
            }
            function Rc(a) {
              var b = 0,
                c = 0,
                d = 0;
              d = (da - 16) | 0;
              da = d;
              b = (d + 4) | 0;
              J[b >> 2] = 16616;
              c = J[4155];
              J[(b + 4) >> 2] = c;
              J[(b + 8) >> 2] = c + (a << 2);
              a = J[(b + 4) >> 2];
              c = J[(b + 8) >> 2];
              while (1) {
                if ((a | 0) == (c | 0)) {
                  J[(J[b >> 2] + 4) >> 2] = J[(b + 4) >> 2];
                  da = (d + 16) | 0;
                } else {
                  J[a >> 2] = 0;
                  a = (a + 4) | 0;
                  J[(b + 4) >> 2] = a;
                  continue;
                }
                break;
              }
            }
            function fg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0;
              g = (da - 16) | 0;
              da = g;
              J[(g + 12) >> 2] = b;
              h = (g + 8) | 0;
              b = J[(d + 28) >> 2];
              J[h >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(h, 16792);
              wa(h);
              fd(a, (f + 16) | 0, (g + 12) | 0, c, e, b);
              da = (g + 16) | 0;
              return J[(g + 12) >> 2];
            }
            function _f(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0;
              g = (da - 16) | 0;
              da = g;
              J[(g + 12) >> 2] = b;
              h = (g + 8) | 0;
              b = J[(d + 28) >> 2];
              J[h >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(h, 16784);
              wa(h);
              cd(a, (f + 16) | 0, (g + 12) | 0, c, e, b);
              da = (g + 16) | 0;
              return J[(g + 12) >> 2];
            }
            function $f(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0;
              g = (da - 16) | 0;
              da = g;
              J[(g + 12) >> 2] = b;
              h = (g + 8) | 0;
              b = J[(d + 28) >> 2];
              J[h >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(h, 16784);
              wa(h);
              dd(a, (f + 24) | 0, (g + 12) | 0, c, e, b);
              da = (g + 16) | 0;
              return J[(g + 12) >> 2];
            }
            function kc(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0;
              f = J[(a + 4) >> 2];
              g = f & 1;
              a: {
                if (K[(b + 55) | 0] == 1) {
                  e = f >> 8;
                  if (!g) {
                    break a;
                  }
                  e = J[(J[c >> 2] + e) >> 2];
                  break a;
                }
                e = f >> 8;
                if (!g) {
                  break a;
                }
                J[(b + 56) >> 2] = J[(J[a >> 2] + 4) >> 2];
                f = J[(a + 4) >> 2];
                c = 0;
                e = 0;
              }
              a = J[a >> 2];
              fa[J[(J[a >> 2] + 28) >> 2]](a, b, (c + e) | 0, f & 2 ? d : 2);
            }
            function eg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0;
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = b;
              g = (a + 8) | 0;
              b = J[(d + 28) >> 2];
              J[g >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(g, 16792);
              wa(g);
              ed((f + 20) | 0, (a + 12) | 0, c, e, b);
              da = (a + 16) | 0;
              return J[(a + 12) >> 2];
            }
            function Zf(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0;
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = b;
              g = (a + 8) | 0;
              b = J[(d + 28) >> 2];
              J[g >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(g, 16784);
              wa(g);
              bd((f + 20) | 0, (a + 12) | 0, c, e, b);
              da = (a + 16) | 0;
              return J[(a + 12) >> 2];
            }
            function nc(a, b, c) {
              var d = 0,
                e = 0,
                f = 0;
              e = (da - 16) | 0;
              da = e;
              d = J[(a + 4) >> 2];
              f = J[(a + 8) >> 2] & 2147483647;
              a: {
                if (f >>> 0 > c >>> 0) {
                  d = J[a >> 2];
                  J[(a + 4) >> 2] = c;
                  a = !c;
                  if (!(a | a)) {
                    y(d, b, c);
                  }
                  H[(e + 15) | 0] = 0;
                  H[(c + d) | 0] = K[(e + 15) | 0];
                  break a;
                }
                Mb(a, (f - 1) | 0, (((c - f) | 0) + 1) | 0, d, d, c, b);
              }
              da = (e + 16) | 0;
            }
            function Yc(a, b) {
              var c = 0,
                d = 0;
              c = (da - 16) | 0;
              da = c;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                la(J[a >> 2]);
              }
              a: {
                if ((K[(b + 11) | 0] >>> 7) | 0) {
                  break a;
                }
              }
              J[(a + 8) >> 2] = J[(b + 8) >> 2];
              d = J[(b + 4) >> 2];
              J[a >> 2] = J[b >> 2];
              J[(a + 4) >> 2] = d;
              H[(b + 11) | 0] = 0;
              J[(c + 12) >> 2] = 0;
              J[b >> 2] = J[(c + 12) >> 2];
              da = (c + 16) | 0;
            }
            function sb(a, b) {
              var c = 0,
                d = 0;
              c = (da - 16) | 0;
              da = c;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                la(J[a >> 2]);
              }
              a: {
                if ((K[(b + 11) | 0] >>> 7) | 0) {
                  break a;
                }
              }
              J[(a + 8) >> 2] = J[(b + 8) >> 2];
              d = J[(b + 4) >> 2];
              J[a >> 2] = J[b >> 2];
              J[(a + 4) >> 2] = d;
              H[(b + 11) | 0] = 0;
              H[(c + 15) | 0] = 0;
              H[b | 0] = K[(c + 15) | 0];
              da = (c + 16) | 0;
            }
            function Pg(a, b, c, d) {
              var e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0;
              e = (c >>> 16) | 0;
              f = (a >>> 16) | 0;
              j = P(e, f);
              g = c & 65535;
              h = a & 65535;
              i = P(g, h);
              f = (((i >>> 16) | 0) + P(f, g)) | 0;
              e = ((f & 65535) + P(e, h)) | 0;
              ea =
                (((P(b, c) + j) | 0) + P(a, d) + (f >>> 16) + (e >>> 16)) | 0;
              return (i & 65535) | (e << 16);
            }
            function nb(a, b, c) {
              var d = 0,
                e = 0;
              d = (da - 16) | 0;
              da = d;
              e = (d + 12) | 0;
              b = J[(b + 28) >> 2];
              J[e >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(e, 16856);
              J[c >> 2] = fa[J[(J[b >> 2] + 16) >> 2]](b);
              fa[J[(J[b >> 2] + 20) >> 2]](a, b);
              wa(e);
              da = (d + 16) | 0;
            }
            function pb(a, b, c) {
              var d = 0,
                e = 0;
              d = (da - 16) | 0;
              da = d;
              e = (d + 12) | 0;
              b = J[(b + 28) >> 2];
              J[e >> 2] = b;
              if ((b | 0) != 16608) {
                J[(b + 4) >> 2] = J[(b + 4) >> 2] + 1;
              }
              b = sa(e, 16848);
              H[c | 0] = fa[J[(J[b >> 2] + 16) >> 2]](b);
              fa[J[(J[b >> 2] + 20) >> 2]](a, b);
              wa(e);
              da = (d + 16) | 0;
            }
            function gb(a) {
              var b = 0,
                c = 0,
                d = 0;
              c = J[3850];
              a = (a + 7) | 0;
              b = a >>> 0 < 7 ? 1 : b;
              d = a & -8;
              a = (d + c) | 0;
              a: {
                if (!(a >>> 0 < d >>> 0 ? (b + 1) | 0 : b)) {
                  if (a >>> 0 <= (ga() << 16) >>> 0) {
                    break a;
                  }
                  if (ca(a | 0) | 0) {
                    break a;
                  }
                }
                J[3876] = 48;
                return -1;
              }
              J[3850] = a;
              return c;
            }
            function fc(a) {
              var b = 0,
                c = 0,
                d = 0;
              d = lc(8);
              J[d >> 2] = 15008;
              J[d >> 2] = 15120;
              b = hb(a);
              c = Oa((b + 13) | 0);
              J[(c + 8) >> 2] = 0;
              J[(c + 4) >> 2] = b;
              J[c >> 2] = b;
              c = (c + 12) | 0;
              b = (b + 1) | 0;
              if (b) {
                y(c, a, b);
              }
              J[(d + 4) >> 2] = c;
              J[d >> 2] = 15168;
              _(d | 0, 15180, 3);
              C();
            }
            function od(a, b, c) {
              var d = 0,
                e = 0,
                f = 0;
              d = (da - 16) | 0;
              da = d;
              f = J[c >> 2];
              e = a;
              c = (b - a) >> 2;
              a: {
                if (c) {
                  while (1) {
                    if (J[a >> 2] == (f | 0)) {
                      break a;
                    }
                    a = (a + 4) | 0;
                    c = (c - 1) | 0;
                    if (c) {
                      continue;
                    }
                    break;
                  }
                }
                a = 0;
              }
              da = (d + 16) | 0;
              return ((((a ? a : b) - e) | 0) + e) | 0;
            }
            function mc(a, b, c) {
              var d = 0,
                e = 0;
              e = (da - 16) | 0;
              da = e;
              d = K[(a + 11) | 0] & 127;
              a: {
                if (c >>> 0 <= 10) {
                  H[(a + 11) | 0] = c & 127;
                  d = !c;
                  if (!(d | d)) {
                    y(a, b, c);
                  }
                  H[(e + 15) | 0] = 0;
                  H[(a + c) | 0] = K[(e + 15) | 0];
                  break a;
                }
                Mb(a, 10, (c - 10) | 0, d, d, c, b);
              }
              da = (e + 16) | 0;
            }
            function ob(a, b) {
              var c = 0,
                d = 0;
              c = (da - 16) | 0;
              da = c;
              d = (c + 12) | 0;
              a = J[(a + 28) >> 2];
              J[d >> 2] = a;
              if ((a | 0) != 16608) {
                J[(a + 4) >> 2] = J[(a + 4) >> 2] + 1;
              }
              a = sa(d, 16784);
              fa[J[(J[a >> 2] + 48) >> 2]](a, 7664, 7690, b) | 0;
              wa(d);
              da = (c + 16) | 0;
              return b;
            }
            function Hd(a, b, c, d) {
              a: {
                if (!a) {
                  break a;
                }
                b: {
                  switch ((b + 2) | 0) {
                    case 0:
                      H[a | 0] = c;
                      return;
                    case 1:
                      I[a >> 1] = c;
                      return;
                    case 2:
                    case 3:
                      J[a >> 2] = c;
                      return;
                    case 5:
                      break b;
                    default:
                      break a;
                  }
                }
                J[a >> 2] = c;
                J[(a + 4) >> 2] = d;
              }
            }
            function $b(a, b, c, d, e, f, g, h, i) {
              var j = 0;
              j = (da - 16) | 0;
              da = j;
              Ea(j, b, c, d, e, f, g, h, i ^ -2147483648);
              d = J[j >> 2];
              c = J[(j + 4) >> 2];
              b = J[(j + 12) >> 2];
              J[(a + 8) >> 2] = J[(j + 8) >> 2];
              J[(a + 12) >> 2] = b;
              J[a >> 2] = d;
              J[(a + 4) >> 2] = c;
              da = (j + 16) | 0;
            }
            function Lg(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              var d = 0,
                e = 0,
                f = 0;
              e = J[(a + 84) >> 2];
              d = (c + 256) | 0;
              f = Gd(e, 0, d);
              d = f ? (f - e) | 0 : d;
              c = c >>> 0 > d >>> 0 ? d : c;
              eb(b, e, c);
              b = (e + d) | 0;
              J[(a + 84) >> 2] = b;
              J[(a + 8) >> 2] = b;
              J[(a + 4) >> 2] = c + e;
              return c | 0;
            }
            function Cb(a, b) {
              var c = 0,
                d = 0;
              c = K[a | 0];
              d = K[b | 0];
              a: {
                if (!c | ((c | 0) != (d | 0))) {
                  break a;
                }
                while (1) {
                  d = K[(b + 1) | 0];
                  c = K[(a + 1) | 0];
                  if (!c) {
                    break a;
                  }
                  b = (b + 1) | 0;
                  a = (a + 1) | 0;
                  if ((c | 0) == (d | 0)) {
                    continue;
                  }
                  break;
                }
              }
              return (c - d) | 0;
            }
            function of(a) {
              a = a | 0;
              var b = 0,
                c = 0;
              b = (da - 16) | 0;
              da = b;
              J[(b + 12) >> 2] = J[(a + 8) >> 2];
              c = J[$a((b + 8) | 0, (b + 12) | 0) >> 2];
              if (c) {
                J[4039] = (c | 0) == -1 ? 16036 : c;
              }
              da = (b + 16) | 0;
              a = J[(a + 8) >> 2];
              if (!a) {
                return 1;
              }
              return ((Gc(a) | 0) == 1) | 0;
            }
            function ig(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              var g = 0,
                h = 0;
              g = (da - 16) | 0;
              da = g;
              J[(g + 8) >> 2] = 624576549;
              J[(g + 12) >> 2] = 1394948685;
              h = a;
              a = (g + 16) | 0;
              b = Va(h, b, c, d, e, f, (g + 8) | 0, a);
              da = a;
              return b | 0;
            }
            function kd(a) {
              var b = 0,
                c = 0;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                b = J[a >> 2];
              } else {
                b = a;
              }
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                c = J[(a + 4) >> 2];
              } else {
                c = K[(a + 11) | 0] & 127;
              }
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = (c << 2) + b;
              da = (a + 16) | 0;
              return J[(a + 12) >> 2];
            }
            function nd(a) {
              var b = 0,
                c = 0;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                b = J[a >> 2];
              } else {
                b = a;
              }
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                c = J[(a + 4) >> 2];
              } else {
                c = K[(a + 11) | 0] & 127;
              }
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = b + c;
              da = (a + 16) | 0;
              return J[(a + 12) >> 2];
            }
            function Jf(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  a = J[b >> 2];
                  if (a >>> 0 < 128) {
                    a = J[((a << 2) + 7984) >> 2];
                  } else {
                    a = 0;
                  }
                  J[d >> 2] = a;
                  d = (d + 4) | 0;
                  b = (b + 4) | 0;
                  continue;
                }
                break;
              }
              return b | 0;
            }
            function dc(a) {
              var b = 0,
                c = 0;
              b = J[a >> 2];
              if (b) {
                c = J[(b + 12) >> 2];
                a: {
                  if ((c | 0) == J[(b + 16) >> 2]) {
                    b = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                    break a;
                  }
                  b = J[c >> 2];
                }
                if ((b | 0) != -1) {
                  return !J[a >> 2];
                }
                J[a >> 2] = 0;
              }
              return 1;
            }
            function vc(a, b, c) {
              var d = 0;
              d = (da - 16) | 0;
              da = d;
              a: {
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  break a;
                }
              }
              b: {
                if ((K[(a + 11) | 0] >>> 7) | 0) {
                  J[(a + 4) >> 2] = c;
                  break b;
                }
                H[(a + 11) | 0] = c & 127;
              }
              H[(d + 15) | 0] = 0;
              H[(b + c) | 0] = K[(d + 15) | 0];
              da = (d + 16) | 0;
            }
            function ec(a) {
              var b = 0,
                c = 0;
              b = J[a >> 2];
              if (b) {
                c = J[(b + 12) >> 2];
                a: {
                  if ((c | 0) == J[(b + 16) >> 2]) {
                    b = fa[J[(J[b >> 2] + 36) >> 2]](b) | 0;
                    break a;
                  }
                  b = K[c | 0];
                }
                if ((b | 0) != -1) {
                  return !J[a >> 2];
                }
                J[a >> 2] = 0;
              }
              return 1;
            }
            function Ff(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  a = b;
                  a = b;
                  b = J[b >> 2];
                  if (b >>> 0 < 128) {
                    b = (J[1038] + (b << 2)) | 0;
                  } else {
                    b = a;
                  }
                  J[a >> 2] = J[b >> 2];
                  b = (a + 4) | 0;
                  continue;
                }
                break;
              }
              return b | 0;
            }
            function Cf(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  a = b;
                  a = b;
                  b = J[b >> 2];
                  if (b >>> 0 < 128) {
                    b = (J[1424] + (b << 2)) | 0;
                  } else {
                    b = a;
                  }
                  J[a >> 2] = J[b >> 2];
                  b = (a + 4) | 0;
                  continue;
                }
                break;
              }
              return b | 0;
            }
            function xf(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  a = H[b | 0];
                  a: {
                    if (a >>> 0 < 128) {
                      a = J[(J[1038] + (a << 2)) >> 2];
                      break a;
                    }
                    a = K[b | 0];
                  }
                  H[b | 0] = a;
                  b = (b + 1) | 0;
                  continue;
                }
                break;
              }
              return b | 0;
            }
            function vf(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  a = H[b | 0];
                  a: {
                    if (a >>> 0 < 128) {
                      a = J[(J[1424] + (a << 2)) >> 2];
                      break a;
                    }
                    a = K[b | 0];
                  }
                  H[b | 0] = a;
                  b = (b + 1) | 0;
                  continue;
                }
                break;
              }
              return b | 0;
            }
            function Hf(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              while (1) {
                a: {
                  if ((c | 0) == (d | 0)) {
                    break a;
                  }
                  a = J[c >> 2];
                  if ((a >>> 0 >= 128) | !(J[((a << 2) + 7984) >> 2] & b)) {
                    break a;
                  }
                  c = (c + 4) | 0;
                  continue;
                }
                break;
              }
              return c | 0;
            }
            function sc() {
              var a = 0,
                b = 0;
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = 1073741823;
              J[(a + 8) >> 2] = 2147483647;
              b = (da - 16) | 0;
              da = b;
              da = (b + 16) | 0;
              da = (a + 16) | 0;
              b = (a + 8) | 0;
              a = (a + 12) | 0;
              return J[(M[b >> 2] < M[a >> 2] ? b : a) >> 2];
            }
            function If(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              while (1) {
                a: {
                  if ((c | 0) == (d | 0)) {
                    break a;
                  }
                  a = J[c >> 2];
                  if (J[((a << 2) + 7984) >> 2] & b ? a >>> 0 < 128 : 0) {
                    break a;
                  }
                  c = (c + 4) | 0;
                  continue;
                }
                break;
              }
              return c | 0;
            }
            function sa(a, b) {
              var c = 0;
              a = J[a >> 2];
              b = ra(b);
              c = J[(a + 8) >> 2];
              if (b >>> 0 < ((J[(a + 12) >> 2] - c) >> 2) >>> 0) {
                c = J[((b << 2) + c) >> 2] != 0;
              } else {
                c = 0;
              }
              if (!c) {
                Ta();
                C();
              }
              return J[(J[(a + 8) >> 2] + (b << 2)) >> 2];
            }
            function Eg(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              var d = 0;
              a = 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  a = (J[b >> 2] + (a << 4)) | 0;
                  d = a & -268435456;
                  a = (d | (d >>> 24)) ^ a;
                  b = (b + 4) | 0;
                  continue;
                }
                break;
              }
              return a | 0;
            }
            function Gg(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              var d = 0;
              a = 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  a = (H[b | 0] + (a << 4)) | 0;
                  d = a & -268435456;
                  a = (d | (d >>> 24)) ^ a;
                  b = (b + 1) | 0;
                  continue;
                }
                break;
              }
              return a | 0;
            }
            function Gc(a) {
              var b = 0,
                c = 0;
              b = (da - 16) | 0;
              da = b;
              J[(b + 12) >> 2] = a;
              a = $a((b + 8) | 0, (b + 12) | 0);
              c = J[J[4039] >> 2] ? 4 : 1;
              a = J[a >> 2];
              if (a) {
                J[4039] = (a | 0) == -1 ? 16036 : a;
              }
              da = (b + 16) | 0;
              return c;
            }
            function Hc(a, b, c, d, e) {
              var f = 0;
              f = (da - 16) | 0;
              da = f;
              J[(f + 12) >> 2] = e;
              e = $a((f + 8) | 0, (f + 12) | 0);
              b = Db(a, b, c, d);
              a = J[e >> 2];
              if (a) {
                J[4039] = (a | 0) == -1 ? 16036 : a;
              }
              da = (f + 16) | 0;
              return b;
            }
            function qe(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              if (Ka(a, J[(b + 8) >> 2], f)) {
                Kb(b, c, d, e);
                return;
              }
              a = J[(a + 8) >> 2];
              fa[J[(J[a >> 2] + 20) >> 2]](a, b, c, d, e, f);
            }
            function Oa(a) {
              var b = 0,
                c = 0;
              c = a >>> 0 <= 1 ? 1 : a;
              while (1) {
                a: {
                  a = La(c);
                  if (a) {
                    break a;
                  }
                  b = J[4583];
                  if (!b) {
                    break a;
                  }
                  fa[b | 0]();
                  continue;
                }
                break;
              }
              if (!a) {
                Fa();
              }
              return a;
            }
            function Ic(a, b, c) {
              var d = 0;
              d = (da - 16) | 0;
              da = d;
              J[(d + 12) >> 2] = c;
              c = $a((d + 8) | 0, (d + 12) | 0);
              b = cc(a, b);
              a = J[c >> 2];
              if (a) {
                J[4039] = (a | 0) == -1 ? 16036 : a;
              }
              da = (d + 16) | 0;
              return b;
            }
            function Ue(a) {
              a = a | 0;
              if (K[16900]) {
                return J[4224];
              }
              if (!K[17992]) {
                H[17992] = 1;
              }
              oa(17968, 1612);
              oa(17980, 1609);
              H[16900] = 1;
              J[4224] = 17968;
              return 17968;
            }
            function rc(a, b) {
              var c = 0,
                d = 0;
              c = 16628;
              d = (da - 16) | 0;
              da = d;
              a: {
                if (!((H[16748] & 1) | (b >>> 0 > 30))) {
                  H[16748] = 1;
                  break a;
                }
                c = wc(b);
              }
              da = (d + 16) | 0;
              J[(a + 4) >> 2] = b;
              J[a >> 2] = c;
            }
            function Se(a) {
              a = a | 0;
              if (K[16908]) {
                return J[4226];
              }
              if (!K[18024]) {
                H[18024] = 1;
              }
              na(18e3, 14488);
              na(18012, 14500);
              H[16908] = 1;
              J[4226] = 18e3;
              return 18e3;
            }
            function Jb(a, b, c, d, e, f) {
              var g = 0,
                h = 0;
              g = J[(a + 4) >> 2];
              h = g >> 8;
              a = J[a >> 2];
              if (g & 1) {
                h = J[(J[d >> 2] + h) >> 2];
              }
              fa[J[(J[a >> 2] + 20) >> 2]](
                a,
                b,
                c,
                (d + h) | 0,
                g & 2 ? e : 2,
                f,
              );
            }
            function Ga(a) {
              var b = 0,
                c = 0;
              b = J[a >> 2];
              c = J[(b + 12) >> 2];
              a: {
                if ((c | 0) == J[(b + 16) >> 2]) {
                  fa[J[(J[b >> 2] + 40) >> 2]](b) | 0;
                  break a;
                }
                J[(b + 12) >> 2] = c + 4;
              }
              return a;
            }
            function Ba(a) {
              var b = 0,
                c = 0;
              b = J[a >> 2];
              c = J[(b + 12) >> 2];
              a: {
                if ((c | 0) == J[(b + 16) >> 2]) {
                  fa[J[(J[b >> 2] + 40) >> 2]](b) | 0;
                  break a;
                }
                J[(b + 12) >> 2] = c + 1;
              }
              return a;
            }
            function ub(a, b, c, d, e) {
              var f = 0,
                g = 0;
              f = J[(a + 4) >> 2];
              g = f >> 8;
              a = J[a >> 2];
              if (f & 1) {
                g = J[(J[c >> 2] + g) >> 2];
              }
              fa[J[(J[a >> 2] + 24) >> 2]](a, b, (c + g) | 0, f & 2 ? d : 2, e);
            }
            function Mg(a) {
              a = a | 0;
              if (H[15487] < 0) {
                la(J[3869]);
              }
              if (H[15475] < 0) {
                la(J[3866]);
              }
              if (H[15463] < 0) {
                la(J[3863]);
              }
              if (H[15451] < 0) {
                la(J[3860]);
              }
            }
            function fd(a, b, c, d, e, f) {
              a = fa[J[(J[(a + 8) >> 2] + 4) >> 2]]((a + 8) | 0) | 0;
              a = (Ab(c, d, a, (a + 288) | 0, f, e, 0) - a) | 0;
              if ((a | 0) <= 287) {
                J[b >> 2] = (((a | 0) / 12) | 0) % 12;
              }
            }
            function cd(a, b, c, d, e, f) {
              a = fa[J[(J[(a + 8) >> 2] + 4) >> 2]]((a + 8) | 0) | 0;
              a = (zb(c, d, a, (a + 288) | 0, f, e, 0) - a) | 0;
              if ((a | 0) <= 287) {
                J[b >> 2] = (((a | 0) / 12) | 0) % 12;
              }
            }
            function Bf(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  J[d >> 2] = H[b | 0];
                  d = (d + 4) | 0;
                  b = (b + 1) | 0;
                  continue;
                }
                break;
              }
              return b | 0;
            }
            function uf(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              while (1) {
                if ((b | 0) != (c | 0)) {
                  H[d | 0] = K[b | 0];
                  d = (d + 1) | 0;
                  b = (b + 1) | 0;
                  continue;
                }
                break;
              }
              return b | 0;
            }
            function oc(a, b, c) {
              var d = 0;
              d = (da - 16) | 0;
              da = d;
              H[(d + 15) | 0] = c;
              while (1) {
                if (b) {
                  H[a | 0] = K[(d + 15) | 0];
                  b = (b - 1) | 0;
                  a = (a + 1) | 0;
                  continue;
                }
                break;
              }
              da = (d + 16) | 0;
            }
            function we(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              if (Ka(a, J[(b + 8) >> 2], 0)) {
                Lb(b, c, d);
                return;
              }
              a = J[(a + 8) >> 2];
              fa[J[(J[a >> 2] + 28) >> 2]](a, b, c, d);
            }
            function uc(a) {
              var b = 0;
              b = (da - 16) | 0;
              da = b;
              J[(b + 12) >> 2] = a;
              a = (da - 16) | 0;
              da = a;
              J[(a + 12) >> 2] = J[(b + 12) >> 2];
              da = (a + 16) | 0;
              da = (b + 16) | 0;
              return J[(a + 12) >> 2];
            }
            function rb(a) {
              a = a | 0;
              var b = 0;
              b = J[655];
              J[a >> 2] = b;
              J[(J[(b - 12) >> 2] + a) >> 2] = J[663];
              J[(a + 8) >> 2] = J[664];
              Gb((a + 12) | 0);
              mb((a - -64) | 0);
              return a | 0;
            }
            function gd(a, b, c, d, e, f) {
              a = fa[J[J[(a + 8) >> 2] >> 2]]((a + 8) | 0) | 0;
              a = (Ab(c, d, a, (a + 168) | 0, f, e, 0) - a) | 0;
              if ((a | 0) <= 167) {
                J[b >> 2] = (((a | 0) / 12) | 0) % 7;
              }
            }
            function dd(a, b, c, d, e, f) {
              a = fa[J[J[(a + 8) >> 2] >> 2]]((a + 8) | 0) | 0;
              a = (zb(c, d, a, (a + 168) | 0, f, e, 0) - a) | 0;
              if ((a | 0) <= 167) {
                J[b >> 2] = (((a | 0) / 12) | 0) % 7;
              }
            }
            function tc(a, b, c) {
              var d = 0;
              d = (da - 16) | 0;
              da = d;
              J[(d + 12) >> 2] = uc(b);
              J[(d + 8) >> 2] = uc(c);
              J[a >> 2] = J[(d + 12) >> 2];
              J[(a + 4) >> 2] = J[(d + 8) >> 2];
              da = (d + 16) | 0;
            }
            function jc(a) {
              a = a | 0;
              var b = 0,
                c = 0;
              J[a >> 2] = 15120;
              b = (J[(a + 4) >> 2] - 12) | 0;
              c = (J[(b + 8) >> 2] - 1) | 0;
              J[(b + 8) >> 2] = c;
              if ((c | 0) < 0) {
                la(b);
              }
              return a | 0;
            }
            function Jg(a, b) {
              a = a | 0;
              b = b | 0;
              var c = 0;
              c = b;
              b = (J[b >> 2] + 7) & -8;
              J[c >> 2] = b + 16;
              O[a >> 3] = _b(
                J[b >> 2],
                J[(b + 4) >> 2],
                J[(b + 8) >> 2],
                J[(b + 12) >> 2],
              );
            }
            function Ef(a) {
              a = a | 0;
              var b = 0;
              if ((fa[J[(J[a >> 2] + 36) >> 2]](a) | 0) == -1) {
                return -1;
              }
              b = a;
              a = J[(a + 12) >> 2];
              J[(b + 12) >> 2] = a + 1;
              return K[a | 0];
            }
            function wa(a) {
              var b = 0;
              a = J[a >> 2];
              if ((a | 0) != 16608) {
                b = (J[(a + 4) >> 2] - 1) | 0;
                J[(a + 4) >> 2] = b;
                if ((b | 0) == -1) {
                  fa[J[(J[a >> 2] + 8) >> 2]](a);
                }
              }
            }
            function Od(a, b, c, d, e, f) {
              J[a >> 2] = b;
              J[(a + 4) >> 2] = c;
              J[(a + 8) >> 2] = d;
              J[(a + 12) >> 2] =
                (e & 65535) |
                ((((f >>> 16) & 32768) | ((e & 2147418112) >>> 16)) << 16);
            }
            function Xc(a, b) {
              var c = 0;
              c = (da - 16) | 0;
              da = c;
              J[(c + 12) >> 2] = J[a >> 2];
              J[(c + 12) >> 2] = J[(c + 12) >> 2] + (b << 2);
              da = (c + 16) | 0;
              return J[(c + 12) >> 2];
            }
            function Sa(a) {
              a: {
                a = J[(a + 4) >> 2] & 74;
                if (a) {
                  if ((a | 0) == 64) {
                    return 8;
                  }
                  if ((a | 0) != 8) {
                    break a;
                  }
                  return 16;
                }
                return 0;
              }
              return 10;
            }
            function $a(a, b) {
              var c = 0;
              c = J[4039];
              b = J[b >> 2];
              if (b) {
                J[4039] = (b | 0) == -1 ? 16036 : b;
              }
              J[a >> 2] = (c | 0) == 16036 ? -1 : c;
              return a;
            }
            function Zc(a, b) {
              var c = 0;
              c = (da - 16) | 0;
              da = c;
              J[(c + 12) >> 2] = J[a >> 2];
              J[(c + 12) >> 2] = J[(c + 12) >> 2] + b;
              da = (c + 16) | 0;
              return J[(c + 12) >> 2];
            }
            function Ka(a, b, c) {
              if (!c) {
                return J[(a + 4) >> 2] == J[(b + 4) >> 2];
              }
              if ((a | 0) == (b | 0)) {
                return 1;
              }
              return !Cb(J[(a + 4) >> 2], J[(b + 4) >> 2]);
            }
            function Wf(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              J[(a + 8) >> 2] = -1;
              J[(a + 12) >> 2] = -1;
              J[a >> 2] = 0;
              J[(a + 4) >> 2] = 0;
            }
            function yb(a) {
              var b = 0;
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                a = J[a >> 2];
              }
              b = (da - 16) | 0;
              da = b;
              J[(b + 12) >> 2] = a;
              da = (b + 16) | 0;
              return J[(b + 12) >> 2];
            }
            function ed(a, b, c, d, e) {
              b = Ra(b, c, d, e, 4);
              if (!(K[d | 0] & 4)) {
                J[a >> 2] =
                  ((b | 0) < 69
                    ? (b + 2e3) | 0
                    : b >>> 0 < 100
                      ? (b + 1900) | 0
                      : b) - 1900;
              }
            }
            function bd(a, b, c, d, e) {
              b = Qa(b, c, d, e, 4);
              if (!(K[d | 0] & 4)) {
                J[a >> 2] =
                  ((b | 0) < 69
                    ? (b + 2e3) | 0
                    : b >>> 0 < 100
                      ? (b + 1900) | 0
                      : b) - 1900;
              }
            }
            function Jc(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              J[e >> 2] = c;
              J[h >> 2] = f;
              return 3;
            }
            function Qc(a, b) {
              var c = 0;
              c = J[(a + 4) >> 2];
              while (1) {
                if ((b | 0) != (c | 0)) {
                  c = (c - 4) | 0;
                  continue;
                }
                break;
              }
              J[(a + 4) >> 2] = b;
            }
            function Kf(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              if (c >>> 0 < 128) {
                a = (J[((c << 2) + 7984) >> 2] & b) != 0;
              } else {
                a = 0;
              }
              return a | 0;
            }
            function qd(a, b, c) {
              var d = 0;
              d = (da - 16) | 0;
              da = d;
              c = Gd(a, H[c | 0], (b - a) | 0);
              da = (d + 16) | 0;
              return ((((c ? c : b) - a) | 0) + a) | 0;
            }
            function qc(a, b) {
              var c = 0;
              c = (da - 16) | 0;
              da = c;
              a: {
                if ((a | 0) == (b | 0)) {
                  H[(a + 120) | 0] = 0;
                  break a;
                }
                la(b);
              }
              da = (c + 16) | 0;
            }
            function pe(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              if (Ka(a, J[(b + 8) >> 2], f)) {
                Kb(b, c, d, e);
              }
            }
            function Ud(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              fa[J[(J[b >> 2] + 16) >> 2]](
                a,
                b,
                J[(c + 8) >> 2],
                J[(c + 12) >> 2],
                0,
                d,
              );
            }
            function Lc(a) {
              a = a | 0;
              var b = 0;
              J[a >> 2] = 7932;
              b = J[(a + 8) >> 2];
              if (!(!b | !(H[(a + 12) | 0] & 1))) {
                la(b);
              }
              return a | 0;
            }
            function Uf(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              J[(a + 8) >> 2] = -1;
              J[(a + 12) >> 2] = -1;
              J[a >> 2] = 0;
              J[(a + 4) >> 2] = 0;
            }
            function pc(a) {
              var b = 0,
                c = 0;
              c = a;
              while (1) {
                b = c;
                c = (b + 4) | 0;
                if (J[b >> 2]) {
                  continue;
                }
                break;
              }
              return (b - a) >> 2;
            }
            function yf(a, b) {
              a = a | 0;
              b = b | 0;
              if (b >>> 0 < 128) {
                b = J[(J[1038] + ((b & 255) << 2)) >> 2];
              }
              return (b << 24) >> 24;
            }
            function Sf(a, b, c, d, e, f, g, h, i) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              i = i | 0;
              C();
            }
            function Nc(a) {
              a = a | 0;
              var b = 0;
              a = J[J[J[a >> 2] >> 2] >> 2];
              b = (J[4195] + 1) | 0;
              J[4195] = b;
              J[(a + 4) >> 2] = b;
            }
            function jb(a, b) {
              b = !J[(a + 24) >> 2] | (J[(a + 16) >> 2] | b);
              J[(a + 16) >> 2] = b;
              if (b & J[(a + 20) >> 2]) {
                Ta();
                C();
              }
            }
            function Dd(a) {
              if (
                ((a | 0) != 0) &
                ((a | 0) != 2984) &
                ((a | 0) != 3008) &
                ((a | 0) != 16208) &
                ((a | 0) != 16232)
              ) {
                la(a);
              }
            }
            function Ze(a) {
              a = a | 0;
              a = 17352;
              while (1) {
                a = ja((a - 12) | 0);
                if ((a | 0) != 17184) {
                  continue;
                }
                break;
              }
            }
            function Xe(a) {
              a = a | 0;
              a = 17648;
              while (1) {
                a = ja((a - 12) | 0);
                if ((a | 0) != 17360) {
                  continue;
                }
                break;
              }
            }
            function Ve(a) {
              a = a | 0;
              a = 17952;
              while (1) {
                a = ja((a - 12) | 0);
                if ((a | 0) != 17664) {
                  continue;
                }
                break;
              }
            }
            function Te(a) {
              a = a | 0;
              a = 17992;
              while (1) {
                a = ja((a - 12) | 0);
                if ((a | 0) != 17968) {
                  continue;
                }
                break;
              }
            }
            function $e(a) {
              a = a | 0;
              a = 17176;
              while (1) {
                a = ja((a - 12) | 0);
                if ((a | 0) != 17008) {
                  continue;
                }
                break;
              }
            }
            function wf(a, b) {
              a = a | 0;
              b = b | 0;
              if (b >>> 0 < 128) {
                b = J[(J[1424] + (b << 2)) >> 2];
              }
              return (b << 24) >> 24;
            }
            function Tc(a) {
              a = a | 0;
              J[a >> 2] = 9016;
              if (J[(a + 8) >> 2] != (Ha() | 0)) {
                Dd(J[(a + 8) >> 2]);
              }
              return a | 0;
            }
            function Qe(a) {
              a = a | 0;
              a = 18024;
              while (1) {
                a = ja((a - 12) | 0);
                if ((a | 0) != 18e3) {
                  continue;
                }
                break;
              }
            }
            function jg(a, b, c, d, e, f, g, h) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              h = h | 0;
              C();
            }
            function xe(a, b, c, d) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              if (Ka(a, J[(b + 8) >> 2], 0)) {
                Lb(b, c, d);
              }
            }
            function Gf(a, b) {
              a = a | 0;
              b = b | 0;
              if (b >>> 0 < 128) {
                b = J[(J[1038] + (b << 2)) >> 2];
              }
              return b | 0;
            }
            function Df(a, b) {
              a = a | 0;
              b = b | 0;
              if (b >>> 0 < 128) {
                b = J[(J[1424] + (b << 2)) >> 2];
              }
              return b | 0;
            }
            function Qg(a) {
              var b = 0;
              b = a & 31;
              a = (0 - a) & 31;
              return (((-1 >>> b) & -2) << b) | (((-1 << a) & -2) >>> a);
            }
            function Ne(a) {
              a = a | 0;
              if (!K[16924]) {
                bb(16912, 9180);
                H[16924] = 1;
              }
              return 16912;
            }
            function Je(a) {
              a = a | 0;
              if (!K[16940]) {
                bb(16928, 9216);
                H[16940] = 1;
              }
              return 16928;
            }
            function He(a) {
              a = a | 0;
              if (!K[16956]) {
                ib(16944, 1569);
                H[16956] = 1;
              }
              return 16944;
            }
            function Fe(a) {
              a = a | 0;
              if (!K[16972]) {
                bb(16960, 9252);
                H[16972] = 1;
              }
              return 16960;
            }
            function De(a) {
              a = a | 0;
              if (!K[16988]) {
                ib(16976, 1344);
                H[16988] = 1;
              }
              return 16976;
            }
            function Be(a) {
              a = a | 0;
              if (!K[17004]) {
                bb(16992, 9336);
                H[17004] = 1;
              }
              return 16992;
            }
            function Vf(a, b, c, d, e, f, g) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              g = g | 0;
              C();
            }
            function Xa(a, b) {
              a = a | 0;
              b = b | 0;
              H[a | 0] = 2;
              H[(a + 1) | 0] = 3;
              H[(a + 2) | 0] = 0;
              H[(a + 3) | 0] = 4;
            }
            function Nb(a) {
              a = a | 0;
              if (J[(a + 8) >> 2] != (Ha() | 0)) {
                Dd(J[(a + 8) >> 2]);
              }
              return a | 0;
            }
            function Pf(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              Pb(a, f);
            }
            function Af(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              return ((b >>> 0 < 128 ? b : c) << 24) >> 24;
            }
            function lg(a, b, c, d, e, f) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              C();
            }
            function nf(a) {
              a = a | 0;
              a = J[(a + 8) >> 2];
              if (!a) {
                return 1;
              }
              return Gc(a) | 0;
            }
            function Kg(a, b, c, d, e, f) {
              a = a | 0;
              b = +b;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              f = f | 0;
              C();
            }
            function Ma(a, b) {
              a = a | 0;
              b = b | 0;
              J[(a + 8) >> 2] = 0;
              J[a >> 2] = 0;
              J[(a + 4) >> 2] = 0;
            }
            function wc(a) {
              if (a >>> 0 > 1073741823) {
                Ta();
                C();
              }
              return Oa(a << 2);
            }
            function tf(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              return (b >>> 0 < 128 ? b : c) | 0;
            }
            function Gb(a) {
              a = a | 0;
              J[a >> 2] = 2004;
              ja((a + 32) | 0);
              return Rb(a) | 0;
            }
            function Pe(a) {
              a = a | 0;
              if (!K[16909]) {
                H[16909] = 1;
              }
              return 15408;
            }
            function Le(a) {
              a = a | 0;
              if (!K[16925]) {
                H[16925] = 1;
              }
              return 15420;
            }
            function lb(a, b, c, d, e) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = e | 0;
              C();
            }
            function kg(a, b, c, d, e) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              d = d | 0;
              e = +e;
              C();
            }
            function ja(a) {
              if ((K[(a + 11) | 0] >>> 7) | 0) {
                la(J[a >> 2]);
              }
              return a;
            }
            function Bc(a) {
              a = a | 0;
              J[a >> 2] = 9064;
              ja((a + 12) | 0);
              return a | 0;
            }
            function Ac(a) {
              a = a | 0;
              J[a >> 2] = 9104;
              ja((a + 16) | 0);
              return a | 0;
            }
            function kb(a, b) {
              var c = 0;
              c = wc(b);
              J[(a + 4) >> 2] = b;
              J[a >> 2] = c;
            }
            function jf(a) {
              a = a | 0;
              return Ob((J[(J[a >> 2] - 12) >> 2] + a) | 0) | 0;
            }
            function he(a) {
              a = a | 0;
              return Ib((J[(J[a >> 2] - 12) >> 2] + a) | 0) | 0;
            }
            function ee(a) {
              a = a | 0;
              return tb((J[(J[a >> 2] - 12) >> 2] + a) | 0) | 0;
            }
            function ab(a, b) {
              var c = 0;
              c = Oa(b);
              J[(a + 4) >> 2] = b;
              J[a >> 2] = c;
            }
            function Rd(a) {
              a = a | 0;
              return rb((J[(J[a >> 2] - 12) >> 2] + a) | 0) | 0;
            }
            function Rb(a) {
              a = a | 0;
              J[a >> 2] = 1756;
              wa((a + 4) | 0);
              return a | 0;
            }
            function Og(a) {
              if (a) {
                return (31 - S((a - 1) ^ a)) | 0;
              }
              return 32;
            }
            function Wd(a) {
              a = a | 0;
              if (H[15499] < 0) {
                la(J[3872]);
              }
            }
            function je(a) {
              a = a | 0;
              a = (da - a) & -16;
              da = a;
              return a | 0;
            }
            function Xf(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              return a | 0;
            }
            function ge(a) {
              a = a | 0;
              hc((J[(J[a >> 2] - 12) >> 2] + a) | 0);
            }
            function ce(a) {
              a = a | 0;
              Hb((J[(J[a >> 2] - 12) >> 2] + a) | 0);
            }
            function Uc(a, b, c) {
              a = a | 0;
              b = b | 0;
              c = c | 0;
              return -1;
            }
            function Re(a) {
              a = a | 0;
              zc((J[(J[a >> 2] - 12) >> 2] + a) | 0);
            }
            function Qd(a) {
              a = a | 0;
              Fb((J[(J[a >> 2] - 12) >> 2] + a) | 0);
            }
            function Lf(a) {
              a = a | 0;
              fa[J[(J[a >> 2] + 4) >> 2]](a);
            }
            function tb(a) {
              a = a | 0;
              mb((a + 12) | 0);
              return a | 0;
            }
            function gf(a, b) {
              a = a | 0;
              b = b | 0;
              Pb(a, (b + 12) | 0);
            }
            function ff(a, b) {
              a = a | 0;
              b = b | 0;
              Pb(a, (b + 16) | 0);
            }
            function Ob(a) {
              a = a | 0;
              mb((a + 8) | 0);
              return a | 0;
            }
            function Ib(a) {
              a = a | 0;
              mb((a + 4) | 0);
              return a | 0;
            }
            function fe(a) {
              a = a | 0;
              return tb((a - 8) | 0) | 0;
            }
            function ef(a, b) {
              a = a | 0;
              b = b | 0;
              ib(a, 1466);
            }
            function df(a, b) {
              a = a | 0;
              b = b | 0;
              bb(a, 9136);
            }
            function cf(a, b) {
              a = a | 0;
              b = b | 0;
              ib(a, 1475);
            }
            function bf(a, b) {
              a = a | 0;
              b = b | 0;
              bb(a, 9156);
            }
            function ad(a, b) {
              a = a | 0;
              b = b | 0;
              ld(a, 1, 45);
            }
            function Td(a) {
              a = a | 0;
              return rb((a - 8) | 0) | 0;
            }
            function Mc(a, b) {
              a = a | 0;
              b = b | 0;
              return b | 0;
            }
            function $c(a, b) {
              a = a | 0;
              b = b | 0;
              jd(a, 1, 45);
            }
            function wb(a) {
              a = a | 0;
              return 2147483647;
            }
            function $d(a) {
              a = a | 0;
              return J[(a + 12) >> 2];
            }
            function ua(a, b) {
              return dc(a) ^ dc(b) ^ 1;
            }
            function qa(a, b) {
              return ec(a) ^ ec(b) ^ 1;
            }
            function le(a) {
              a = a | 0;
              return J[(a + 4) >> 2];
            }
            function lc(a) {
              return (La((a + 80) | 0) + 80) | 0;
            }
            function ae(a) {
              a = a | 0;
              return J[(a + 8) >> 2];
            }
            function Kc(a, b) {
              a = a | 0;
              b = b | 0;
              return -1;
            }
            function kf(a) {
              a = a | 0;
              return H[(a + 8) | 0];
            }
            function hf(a) {
              a = a | 0;
              return H[(a + 9) | 0];
            }
            function oe(a) {
              a = a | 0;
              return 1364;
            }
            function ne(a) {
              a = a | 0;
              return 1546;
            }
            function me(a) {
              a = a | 0;
              return 1408;
            }
            function ic(a) {
              a = a | 0;
              jc(a);
              la(a);
            }
            function dg(a) {
              a = a | 0;
              Rb(a);
              la(a);
            }
            function xb(a) {
              a = a | 0;
              return 127;
            }
            function Wa(a) {
              a = a | 0;
              return a | 0;
            }
            function Rg(a, b) {
              ea = a;
              return b;
            }
            function zf(a) {
              a = a | 0;
              la(Lc(a));
            }
            function zc(a) {
              a = a | 0;
              la(Ob(a));
            }
            function xc(a) {
              a = a | 0;
              la(Nb(a));
            }
            function sf(a) {
              a = a | 0;
              la(Tc(a));
            }
            function mf(a) {
              a = a | 0;
              la(Bc(a));
            }
            function lf(a) {
              a = a | 0;
              la(Ac(a));
            }
            function hc(a) {
              a = a | 0;
              la(Ib(a));
            }
            function de(a) {
              a = a | 0;
              Hb((a - 8) | 0);
            }
            function Vd(a) {
              a = a | 0;
              la(Gb(a));
            }
            function Sd(a) {
              a = a | 0;
              Fb((a - 8) | 0);
            }
            function Pd(a) {
              a = a | 0;
              la(Eb(a));
            }
            function Oe(a) {
              a = a | 0;
              ja(15408);
            }
            function Mf(a) {
              a = a | 0;
              la(Pc(a));
            }
            function Me(a) {
              a = a | 0;
              ja(16912);
            }
            function Ke(a) {
              a = a | 0;
              ja(15420);
            }
            function Ie(a) {
              a = a | 0;
              ja(16928);
            }
            function Hb(a) {
              a = a | 0;
              la(tb(a));
            }
            function Ge(a) {
              a = a | 0;
              ja(16944);
            }
            function Fb(a) {
              a = a | 0;
              la(rb(a));
            }
            function Ee(a) {
              a = a | 0;
              ja(16960);
            }
            function Ce(a) {
              a = a | 0;
              ja(16976);
            }
            function Ae(a) {
              a = a | 0;
              ja(16992);
            }
            function vb(a) {
              a = a | 0;
              return 4;
            }
            function hd(a) {
              a = a | 0;
              return 2;
            }
            function Ub(a) {
              a = a | 0;
              return 1;
            }
            function Nf(a) {
              a = a | 0;
              return -1;
            }
            function Ia(a) {
              a = a | 0;
              return 0;
            }
            function Sc(a) {
              Qc(a, J[a >> 2]);
            }
            function Qb(a, b) {
              a = a | 0;
              b = b | 0;
            }
            function ta(a) {
              a = a | 0;
              la(a);
            }
            function ke(a) {
              a = a | 0;
              da = a;
            }
            function ie() {
              return da | 0;
            }
            function ze(a) {
              a = a | 0;
              C();
            }
            function Ta() {
              ba();
              C();
            }
            function Fa() {
              Ta();
              C();
            }
            function mb(a) {
              Eb(a);
            }
            function Vb(a) {
              a = a | 0;
            }
            // EMSCRIPTEN_END_FUNCS
            a = K;
            m(n);
            var fa = [
              null,
              Wd,
              Wa,
              jc,
              Mg,
              Rb,
              dg,
              Qb,
              Xf,
              Wf,
              Uf,
              Ia,
              Ia,
              Qf,
              Nf,
              Ef,
              Kc,
              qf,
              Kc,
              Ob,
              zc,
              jf,
              Re,
              Ib,
              hc,
              he,
              ge,
              tb,
              Hb,
              fe,
              de,
              ee,
              ce,
              Gb,
              Vd,
              Xd,
              Ud,
              _d,
              Zd,
              Yd,
              rb,
              Fb,
              Td,
              Sd,
              Rd,
              Qd,
              Eb,
              Pd,
              Lg,
              Kg,
              Jg,
              Ig,
              la,
              Vb,
              Nc,
              $e,
              Ze,
              Xe,
              Ve,
              Te,
              Qe,
              Oe,
              Me,
              Ke,
              Ie,
              Ge,
              Ee,
              Ce,
              Ae,
              Pc,
              Mf,
              Lf,
              Lc,
              zf,
              yf,
              xf,
              wf,
              vf,
              Mc,
              uf,
              tf,
              lb,
              Tc,
              sf,
              rf,
              pf,
              lb,
              of,
              Ia,
              lb,
              nf,
              Bc,
              mf,
              kf,
              hf,
              gf,
              ef,
              cf,
              Ac,
              lf,
              ae,
              $d,
              ff,
              df,
              bf,
              Wa,
              ta,
              ta,
              Kf,
              Jf,
              If,
              Hf,
              Gf,
              Ff,
              Df,
              Cf,
              Mc,
              Bf,
              Af,
              lb,
              ta,
              Jc,
              Jc,
              lb,
              Ub,
              Ub,
              lb,
              Ub,
              ta,
              Fc,
              Ec,
              lb,
              Ia,
              Ia,
              lb,
              vb,
              ta,
              Fc,
              Ec,
              lb,
              Ia,
              Ia,
              lb,
              vb,
              ta,
              Dc,
              Cc,
              lb,
              Ia,
              Ia,
              lb,
              vb,
              ta,
              Dc,
              Cc,
              lb,
              Ia,
              Ia,
              lb,
              vb,
              Wa,
              ta,
              lb,
              Hg,
              Gg,
              Wa,
              ta,
              lb,
              Fg,
              Eg,
              ta,
              Dg,
              Cg,
              Bg,
              Ag,
              xd,
              xd,
              zg,
              yg,
              xg,
              wg,
              vg,
              ta,
              ug,
              tg,
              sg,
              rg,
              pd,
              pd,
              qg,
              pg,
              og,
              ng,
              mg,
              ta,
              lb,
              lb,
              lg,
              lb,
              lg,
              kg,
              jg,
              lb,
              ta,
              lb,
              lb,
              lg,
              lb,
              lg,
              kg,
              jg,
              lb,
              Wa,
              ta,
              hd,
              ig,
              hg,
              gg,
              fg,
              eg,
              cg,
              af,
              Ye,
              Ue,
              He,
              De,
              Pe,
              Le,
              Wa,
              ta,
              hd,
              bg,
              ag,
              $f,
              _f,
              Zf,
              Yf,
              _e,
              We,
              Se,
              Fe,
              Be,
              Ne,
              Je,
              Nb,
              xc,
              Vf,
              Nb,
              xc,
              Vf,
              ta,
              xb,
              xb,
              Ma,
              Ma,
              Ma,
              ad,
              Ia,
              Xa,
              Xa,
              ta,
              xb,
              xb,
              Ma,
              Ma,
              Ma,
              ad,
              Ia,
              Xa,
              Xa,
              ta,
              wb,
              wb,
              Ma,
              Ma,
              Ma,
              $c,
              Ia,
              Xa,
              Xa,
              ta,
              wb,
              wb,
              Ma,
              Ma,
              Ma,
              $c,
              Ia,
              Xa,
              Xa,
              ta,
              Vf,
              Vf,
              ta,
              Vf,
              Vf,
              ta,
              Sf,
              Tf,
              ta,
              Sf,
              Rf,
              ta,
              Uc,
              Pf,
              Qb,
              ta,
              Uc,
              Of,
              Qb,
              Wa,
              ze,
              Fa,
              Wa,
              ta,
              Vb,
              Vb,
              ye,
              pe,
              se,
              xe,
              ta,
              qe,
              te,
              we,
              ta,
              re,
              ue,
              ve,
              ta,
              ne,
              ta,
              me,
              ta,
              oe,
              ic,
              le,
              ic,
            ];
            function ga() {
              return (G.byteLength / 65536) | 0;
            }
            return {
              f: Object.create(Object.prototype, {
                grow: {},
                buffer: {
                  get: function () {
                    return G;
                  },
                },
              }),
              g: Ng,
              h: be,
              i: ke,
              j: je,
              k: ie,
            };
          }
          return ha(ia);
        })(
          // EMSCRIPTEN_END_ASM

          info,
        );
      },
      instantiate: function (binary, info) {
        return {
          then: function (ok) {
            var module = new WebAssembly.Module(binary);
            ok({ instance: new WebAssembly.Instance(module, info) });
          },
        };
      },
      RuntimeError: Error,
      isWasm2js: true,
    };
    if (WebAssembly.isWasm2js) {
      wasmBinary = [];
    }
    var ABORT = false;
    var readyPromiseResolve, readyPromiseReject;
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
    var runtimeInitialized = false;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      HEAP8 = new Int8Array(b);
      HEAP16 = new Int16Array(b);
      HEAPU8 = new Uint8Array(b);
      HEAPU16 = new Uint16Array(b);
      HEAP32 = new Int32Array(b);
      HEAPU32 = new Uint32Array(b);
      HEAPF32 = new Float32Array(b);
      HEAPF64 = new Float64Array(b);
    }
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(onPreRuns);
    }
    function initRuntime() {
      runtimeInitialized = true;
      wasmExports["g"]();
    }
    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(onPostRuns);
    }
    function abort(what) {
      Module["onAbort"]?.(what);
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject?.(e);
      throw e;
    }
    var wasmBinaryFile;
    function findWasmBinary(file) {}
    function getWasmBinary(file) {}
    async function instantiateArrayBuffer(binaryFile, imports) {
      try {
        var binary = await getWasmBinary(binaryFile);
        var instance = await WebAssembly.instantiate(binary, imports);
        return instance;
      } catch (reason) {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        abort(reason);
      }
    }
    async function instantiateAsync(binary, binaryFile, imports) {
      if (!binary) {
        try {
          var response = fetch(binaryFile, { credentials: "same-origin" });
          var instantiationResult = await WebAssembly.instantiateStreaming(
            response,
            imports,
          );
          return instantiationResult;
        } catch (reason) {
          err(`wasm streaming compile failed: ${reason}`);
          err("falling back to ArrayBuffer instantiation");
        }
      }
      return instantiateArrayBuffer(binaryFile, imports);
    }
    function getWasmImports() {
      var imports = { a: wasmImports };
      return imports;
    }
    async function createWasm() {
      function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        assignWasmExports(wasmExports);
        updateMemoryViews();
        return wasmExports;
      }
      function receiveInstantiationResult(result) {
        return receiveInstance(result["instance"]);
      }
      var info = getWasmImports();
      if (Module["instantiateWasm"]) {
        return new Promise((resolve, reject) => {
          Module["instantiateWasm"](info, (inst, mod) => {
            resolve(receiveInstance(inst, mod));
          });
        });
      }
      wasmBinaryFile ??= findWasmBinary();
      var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
      var exports = receiveInstantiationResult(result);
      return exports;
    }
    class ExitStatus {
      name = "ExitStatus";
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }
    var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    };
    var onPostRuns = [];
    var addOnPostRun = (cb) => onPostRuns.push(cb);
    var onPreRuns = [];
    var addOnPreRun = (cb) => onPreRuns.push(cb);
    var noExitRuntime = true;
    var stackRestore = (val) => __emscripten_stack_restore(val);
    var stackSave = () => _emscripten_stack_get_current();
    class ExceptionInfo {
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
      set_type(type) {
        HEAPU32[(this.ptr + 4) >> 2] = type;
      }
      get_type() {
        return HEAPU32[(this.ptr + 4) >> 2];
      }
      set_destructor(destructor) {
        HEAPU32[(this.ptr + 8) >> 2] = destructor;
      }
      get_destructor() {
        return HEAPU32[(this.ptr + 8) >> 2];
      }
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[this.ptr + 12] = caught;
      }
      get_caught() {
        return HEAP8[this.ptr + 12] != 0;
      }
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[this.ptr + 13] = rethrown;
      }
      get_rethrown() {
        return HEAP8[this.ptr + 13] != 0;
      }
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[(this.ptr + 16) >> 2] = adjustedPtr;
      }
      get_adjusted_ptr() {
        return HEAPU32[(this.ptr + 16) >> 2];
      }
    }
    var exceptionLast = 0;
    var uncaughtExceptionCount = 0;
    var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      throw exceptionLast;
    };
    var __abort_js = () => abort("");
    var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.codePointAt(i);
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | (u >> 6);
          heap[outIdx++] = 128 | (u & 63);
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | (u >> 12);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 240 | (u >> 18);
          heap[outIdx++] = 128 | ((u >> 12) & 63);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
          i++;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
    var stringToUTF8 = (str, outPtr, maxBytesToWrite) =>
      stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    var abortOnCannotGrowMemory = (requestedSize) => {
      abort("OOM");
    };
    var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };
    var ENV = {};
    var getExecutableName = () => thisProgram || "./this.program";
    var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        var lang =
          ((typeof navigator == "object" && navigator.language) || "C").replace(
            "-",
            "_",
          ) + ".UTF-8";
        var env = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: lang,
          _: getExecutableName(),
        };
        for (var x in ENV) {
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
    var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      var envp = 0;
      for (var string of getEnvStrings()) {
        var ptr = environ_buf + bufSize;
        HEAPU32[(__environ + envp) >> 2] = ptr;
        bufSize += stringToUTF8(string, ptr, Infinity) + 1;
        envp += 4;
      }
      return 0;
    };
    var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
    var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      for (var string of strings) {
        bufSize += lengthBytesUTF8(string) + 1;
      }
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0;
    };
    var getCFunc = (ident) => {
      var func = Module["_" + ident];
      return func;
    };
    var writeArrayToMemory = (array, buffer) => {
      HEAP8.set(array, buffer);
    };
    var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
    var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
    var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
    var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
      var maxIdx = idx + maxBytesToRead;
      if (ignoreNul) return maxIdx;
      while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
      return idx;
    };
    var UTF8ArrayToString = (
      heapOrArray,
      idx = 0,
      maxBytesToRead,
      ignoreNul,
    ) => {
      var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u0 =
            ((u0 & 7) << 18) |
            (u1 << 12) |
            (u2 << 6) |
            (heapOrArray[idx++] & 63);
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        }
      }
      return str;
    };
    var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) =>
      ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
    var ccall = (ident, returnType, argTypes, args, opts) => {
      var toC = {
        string: (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) {
            ret = stringToUTF8OnStack(str);
          }
          return ret;
        },
        array: (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        },
      };
      function convertReturnValue(ret) {
        if (returnType === "string") {
          return UTF8ToString(ret);
        }
        if (returnType === "boolean") return Boolean(ret);
        return ret;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func(...cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
      ret = onDone(ret);
      return ret;
    };
    var cwrap = (ident, returnType, argTypes, opts) => {
      var numericArgs =
        !argTypes ||
        argTypes.every((type) => type === "number" || type === "boolean");
      var numericRet = returnType !== "string";
      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
      }
      return (...args) => ccall(ident, returnType, argTypes, args, opts);
    };
    {
      if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
      if (Module["print"]) out = Module["print"];
      if (Module["printErr"]) err = Module["printErr"];
      if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
      if (Module["arguments"]) arguments_ = Module["arguments"];
      if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function")
          Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].shift()();
        }
      }
    }
    Module["ccall"] = ccall;
    Module["cwrap"] = cwrap;
    var _solve_move,
      __emscripten_stack_restore,
      __emscripten_stack_alloc,
      _emscripten_stack_get_current,
      dynCall_viijii,
      dynCall_iiiiij,
      dynCall_iiiiijj,
      dynCall_iiiiiijj,
      memory,
      __indirect_function_table,
      wasmMemory;
    function assignWasmExports(wasmExports) {
      _solve_move = Module["_solve_move"] = wasmExports["h"];
      __emscripten_stack_restore = wasmExports["i"];
      __emscripten_stack_alloc = wasmExports["j"];
      _emscripten_stack_get_current = wasmExports["k"];
      dynCall_viijii = wasmExports["dynCall_viijii"];
      dynCall_iiiiij = wasmExports["dynCall_iiiiij"];
      dynCall_iiiiijj = wasmExports["dynCall_iiiiijj"];
      dynCall_iiiiiijj = wasmExports["dynCall_iiiiiijj"];
      memory = wasmMemory = wasmExports["f"];
      __indirect_function_table = wasmExports["__indirect_function_table"];
    }
    var wasmImports = {
      a: ___cxa_throw,
      d: __abort_js,
      e: _emscripten_resize_heap,
      b: _environ_get,
      c: _environ_sizes_get,
    };
    function run() {
      preRun();
      function doRun() {
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        readyPromiseResolve?.(Module);
        Module["onRuntimeInitialized"]?.();
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(() => {
          setTimeout(() => Module["setStatus"](""), 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    var wasmExports;
    wasmExports = await createWasm();
    run();
    if (runtimeInitialized) {
      moduleRtn = Module;
    } else {
      moduleRtn = new Promise((resolve, reject) => {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });
    }
    return moduleRtn;
  };
})();
if (typeof exports === "object" && typeof module === "object") {
  module.exports = SolveBoard;
  module.exports.default = SolveBoard;
} else if (typeof define === "function" && define["amd"])
  define([], () => SolveBoard);

export async function solveBoard(input) {
  const mod = await SolveBoard();

  const result = mod.ccall("solve_move", "string", ["string"], [input]);
  return result;
}
