# Design pattern categories:
1. Creational: deal with object creation
  - Explicit (constructor) vs Implicit (DI, reflection)
  - - Builder
  - - Factory
  - - Prototype: partially construct object -> deep clone it -> customize result
  - - Singleton: good for DB repo, Object factory
2. Structural:
  - concern about structure of class members
  - a lot of them are wrappers around classes
  - stress the importance of good API design
3. Behavioral: deal with communication between objects
4. Concurrency: deal with multi-threaded paradigms
